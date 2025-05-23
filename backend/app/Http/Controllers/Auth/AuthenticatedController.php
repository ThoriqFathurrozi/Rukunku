<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $authenticatedToken = Auth::user()->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Authenticated successfully',
            "token" => $authenticatedToken
        ], 200);
    }

    public function destroy(Request $request): JsonResponse
    {
        $user = Auth::user();
        if ($user) {
            $user->tokens()->delete();
            return response()->json(['message' => 'Logged out successfully'], status: 200);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

}
