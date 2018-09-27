<?php
date_default_timezone_set('America/Sao_Paulo');

Route::get('/', function () {
    return redirect('api');
});