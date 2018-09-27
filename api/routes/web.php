<?php
date_default_timezone_set('America/Sao_Paulo');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

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