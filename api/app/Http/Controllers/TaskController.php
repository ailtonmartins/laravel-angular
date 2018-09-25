<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    public function index()
    {
        $tasks = Tasks::get();
        return response()->json($tasks);
    }

    public function show($id)
    {
      
    }

    public function store(Request $request)
    {
    }

    public function update(Request $request, $id)
    {
        
    }

    public function destroy($id)
    {
       
    }
}
