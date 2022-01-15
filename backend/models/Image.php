<?php

namespace app\models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'id_img';
    protected  $table = "Images";

    protected $fillable = ["id_img", "id_post", "id_cmt", "imgUrl"];
}
