<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAuthRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(LoginAuthRequest $request)
    {
        try {
            if (Auth::attempt($request->validated())) {
                $user = Auth::user();
                $token = $request->user()->createToken($user->email);

                return response()->json(['token' => $token->plainTextToken, 'user' => $user]);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }
    }

    // public function refreshToken(Request $request)
    // {
    //     try {
    //         $user = $request->user();
    //         $user->tokens()->delete();
    //         $token = $user->createToken($user->email);

    //         return response()->json(['token' => $token->plainTextToken]);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'Erro ao atualizar o token'], 500);
    //     }
    // }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        response()->json(['message' => 'Usuário desconectado'], 204);
    }
}
