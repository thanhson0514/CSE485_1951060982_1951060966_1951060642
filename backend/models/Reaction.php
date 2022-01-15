<?php

namespace app\models;


use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    public $timestamps = false;
    protected  $table = "Reaction";

    protected $fillable =["id_reaction","id_post","id_user","typeName"];

}