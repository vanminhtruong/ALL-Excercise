<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Đăng ký người dùng mới
     */
    public function register(Request $request)
    {
        // Bỏ qua phần xác thực tại backend

        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'Email đã được sử dụng.',
                'errors' => [
                    'email' => ['Email này đã được đăng ký.']
                ]
            ], 422);
        }

        // Kiểm tra username đã tồn tại 
        if (User::where('username', $request->username)->exists()) {
            return response()->json([
                'message' => 'Tên người dùng đã tồn tại.',
                'errors' => [
                    'username' => ['Tên người dùng này đã được sử dụng.']
                ]
            ], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Lấy role 'user' từ database
        $userRole = Role::where('name', 'user')->first();

        // Gán role 'user' cho người dùng mới
        if ($userRole) {
            $user->roles()->attach($userRole->role_id);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng ký thành công',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * Đăng nhập người dùng
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Thông tin đăng nhập không chính xác.',
            ], 401);
        }

        // Xóa tất cả token cũ
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        // Load roles and permissions
        $user->load('roles.permissions');

        // Gather permissions from roles
        $permissions = $user->roles->flatMap(function ($role) {
            return $role->permissions->pluck('name');
        })->unique()->values();

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'username' => $user->username,
                'roles' => $user->roles->pluck('name'),
                'permissions' => $permissions,
            ],
        ]);
    }


    /**
     * Đăng xuất người dùng
     */
    public function logout(Request $request)
    {
        // Xóa token hiện tại
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Đăng xuất thành công',
        ]);
    }
}
