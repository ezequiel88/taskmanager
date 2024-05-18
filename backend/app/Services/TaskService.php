<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    public function getAllTasks()
    {
        return Task::where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
    }

    public function getAllTasksPaginated($perPage = 10)
    {
        return Task::where('user_id', Auth::id())->orderBy('updated_at', 'desc')->paginate($perPage);
    }

    public function createTask(array $data)
    {
        $data['user_id'] = Auth::id();
        return Task::create($data);
    }

    public function updateTask($id, array $data)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->update($data);
        return $task;
    }

    public function deleteTask($id)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->delete();
        return $task;
    }
}
