<?php

namespace App\Services;

use GuzzleHttp\Client;

class FirebaseService
{
    protected $client;
    protected $projectId;
    protected $databaseUrl;
    protected $authToken;

    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->projectId = env('FIREBASE_PROJECT_ID');
        $this->databaseUrl = env('FIREBASE_DATABASE_URL');
        $this->authToken = env('FIREBASE_AUTH_TOKEN');
    }

    public function notify($task, $action)
    {
        # Código comentado para permitir usar a aplicação sem a integração com o Firebase (Atualização em tempo real das tarefas)
        # try {
        $taskData = [
            'action' => $action,
            'task_id' => $task->id
        ];

        $response = $this->client->post("{$this->databaseUrl}/tasks/{$task->user_id}.json?auth={$this->authToken}", [
            'json' => $taskData
        ]);

        # if ($response->getStatusCode() !== 200) {
        #   throw new \Exception('Erro ao salvar dados no Firebase');
        # }
        # } catch (\Exception $e) {
        #   throw new \Exception('Erro ao estabelecer comunicação com Firebase');
        # }
    }
}
