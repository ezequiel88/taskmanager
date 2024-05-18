<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        // ...
    ];

    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    public function register()
    {
        $this->renderable(function (ValidationException $e, $request) {
            return response()->json([
                'message' => 'Os dados fornecidos são inválidos.',
                'errors' => $e->errors(),
            ], 422);
        });

        $this->renderable(function (ModelNotFoundException $e, $request) {
            return response()->json([
                'message' => 'Recurso não encontrado.',
            ], 404);
        });

        $this->renderable(function (AuthorizationException $e, $request) {
            return response()->json([
                'message' => 'Você não tem permissão para executar esta ação.',
            ], 403);
        });

        $this->renderable(function (AuthenticationException $e, $request) {
            return response()->json([
                'message' => 'Não autenticado.',
            ], 401);
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            return response()->json([
                'message' => 'Página não encontrada.',
            ], 404);
        });

        $this->renderable(function (MethodNotAllowedHttpException $e, $request) {
            return response()->json([
                'message' => 'Método não permitido.',
            ], 405);
        });

        $this->renderable(function (AccessDeniedHttpException $e, $request) {
            return response()->json([
                'message' => 'Acesso negado.',
            ], 403);
        });

        $this->renderable(function (HttpException $e, $request) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getStatusCode());
        });

        $this->renderable(function (Throwable $e, $request) {
            return response()->json([
                'message' => 'Erro interno do servidor.',
            ], 500);
        });
    }
}
