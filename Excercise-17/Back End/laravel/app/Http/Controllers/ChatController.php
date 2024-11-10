<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Group;
use Illuminate\Routing\Controller;

class ChatController extends Controller
{
    /**
     * Gửi tin nhắn mới
     */
    public function sendMessage(Request $request)
    {
        // Bỏ qua phần xác thực tại backend

        $message = Message::create([
            'group_id' => $request->group_id, // Đảm bảo frontend gửi group_id
            'user_id' => $request->user()->user_id,
            'message_text' => $request->message_text,
            'message_type' => $request->message_type ?? 'text',
            'status' => 'sent',
        ]);

        // Có thể thêm logic broadcast ở đây nếu cần

        return response()->json([
            'message' => 'Tin nhắn đã được gửi thành công',
            'data' => $message,
        ], 201);
    }

    /**
     * Lấy danh sách các nhóm chat của người dùng
     */
    public function getGroupChats(Request $request)
    {
        $groups = $request->user()->groups()->with('messages')->get();

        return response()->json([
            'groups' => $groups,
        ]);
    }

    /**
     * Lấy các tin nhắn trong một nhóm cụ thể
     */
    public function getMessages($group_id)
    {
        $messages = Message::where('group_id', $group_id)
            ->with('user')
            ->get();

        return response()->json([
            'messages' => $messages,
        ]);
    }

    /**
     * Tạo nhóm chat mới
     */
    public function createGroup(Request $request)
    {
        $group = Group::create([
            'group_name' => $request->name,
            'description' => $request->description,
            'created_by' => $request->user()->user_id,
        ]);

        // Thêm người tạo vào nhóm với vai trò admin
        $request->user()->groups()->attach($group->group_id, ['role' => 'admin']);

        return response()->json([
            'message' => 'Nhóm được tạo thành công',
            'group' => $group,
        ], 201);
    }

    /**
     * Tham gia vào một nhóm chat
     */
    public function joinGroup(Request $request)
    {
        $group_id = $request->group_id;
        $user = $request->user();

        // Kiểm tra xem group_id có tồn tại không
        $group = Group::find($group_id);
        if (!$group) {
            return response()->json([
                'message' => 'Nhóm không tồn tại.',
            ], 404);
        }

        // Kiểm tra xem người dùng đã tham gia nhóm chưa
        if ($user->groups()->where('groups.group_id', $group_id)->exists()) {
            return response()->json([
                'message' => 'Bạn đã là thành viên của nhóm này.',
            ], 400);
        }

        // Tham gia nhóm với vai trò member
        $user->groups()->attach($group_id, ['role' => 'member']);

        return response()->json([
            'message' => 'Tham gia nhóm thành công',
        ]);
    }
}
