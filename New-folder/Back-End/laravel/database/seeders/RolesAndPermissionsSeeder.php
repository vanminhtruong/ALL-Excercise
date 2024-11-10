<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Tạo các quyền
        $permissions = [
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'view_groups',
            'create_groups',
            'edit_groups',
            'delete_groups',
            'send_messages',
            'view_messages',
            'delete_messages',
        ];

        // Tạo các quyền
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission],
                [
                    'display_name' => ucwords(str_replace('_', ' ', $permission)),
                    'description' => 'Permission to ' . str_replace('_', ' ', $permission),
                ]
            );
        }

        // Tạo các vai trò
        $roles = [
            'admin' => [
                'display_name' => 'Administrator',
                'description' => 'Quản trị viên với toàn quyền',
                'permissions' => Permission::all()->pluck('permission_id')->toArray()
            ],
            'leader' => [
                'display_name' => 'Leader',
                'description' => 'Trưởng nhóm với quyền hạn cao',
                'permissions' => Permission::whereIn('name', [
                    'view_users',
                    'create_users',
                    'edit_users',
                    'view_groups',
                    'create_groups',
                    'edit_groups',
                    'send_messages',
                    'view_messages',
                    'delete_messages',
                ])->pluck('permission_id')->toArray()
            ],
            'user' => [
                'display_name' => 'User',
                'description' => 'Người dùng thông thường',
                'permissions' => Permission::whereIn('name', [
                    'send_messages',
                    'view_messages',
                    'create_groups',
                    'delete_groups',
                ])->pluck('permission_id')->toArray()
            ],
        ];

        foreach ($roles as $name => $roleData) {
            $role = Role::firstOrCreate(
                ['name' => $name],
                [
                    'display_name' => $roleData['display_name'],
                    'description' => $roleData['description']
                ]
            );

            // Gán quyền cho vai trò
            $role->permissions()->sync($roleData['permissions']);
        }
    }
}
