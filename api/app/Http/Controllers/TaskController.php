<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Tasks::paginate(5);
        return response()->json($tasks);
    }

    public function show($id)
    {
        $task = Tasks::find($id);

        if(!$task) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        return response()->json($task);
    }

    public function store(Request $request)
    {
        $task= new Tasks();
        $task->fill($request->all());
        $task->save();

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Tasks::find($id);

        if(!$task) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        $task->fill($request->all());
        $task->save();

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Tasks::find($id);
        if(!$task) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }
        $task->delete();
    }
}
