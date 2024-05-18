<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Services\TaskService;
use App\Services\FirebaseService;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskController extends Controller
{
    protected $taskService;
    protected $firebaseService;

    public function __construct(TaskService $taskService, FirebaseService $firebaseService)
    {
        $this->taskService = $taskService;
        $this->firebaseService = $firebaseService;
    }

    public function index(Request $request)
    {
        try {
            //TODO: caso implementar paginacao no front setar o tamanho da paginacao padrao
            $tasks = $this->taskService->getAllTasksPaginated($request->query('per_page', 100));
            return response()->json($tasks);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao listar tarefas.'], 500);
        }
    }

    public function store(StoreTaskRequest $request)
    {
        try {
            $task = $this->taskService->createTask($request->validated());

            $this->firebaseService->notify($task, 'created');
            return response()->json($task, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        try {
            $task = $this->taskService->updateTask($id, $request->validated());

            $this->firebaseService->notify($task, 'updated');
            return response()->json($task);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Tarefa não encontrada.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar tarefa.'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $task = $this->taskService->deleteTask($id);

            $this->firebaseService->notify($task, 'deleted');
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Tarefa não encontrada.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao excluir tarefa.'], 500);
        }
    }
}
