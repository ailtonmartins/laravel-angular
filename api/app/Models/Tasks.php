<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tasks extends Model
{
    use SoftDeletes;

    protected $fillable = ['titulo', 'status', 'descricao'];
    protected $dates = ['deleted_at'];
}
