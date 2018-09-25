<?php
Route::group(array('prefix' => 'api'), function()
{

  Route::get('/', function () {
      return response()->json(['message' => 'TASK API', 'status' => 'Connected']);;
  });

  Route::resource('task', 'TaskController');
});

Route::get('/', function () {
    return redirect('api');
});