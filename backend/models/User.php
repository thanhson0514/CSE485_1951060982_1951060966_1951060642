<?php

namespace app\models;


use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public $timestamps = false;
    protected  $table = "User";

    protected $fillable =["id_user","id_post","username", "token", "email", "password"];

}