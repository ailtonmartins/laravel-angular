<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = ['titulo', 'status', 'descricao'];
    protected $dates = ['deleted_at'];
}
