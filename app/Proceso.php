<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Proceso extends Model
{
    protected $connection = 'sgc';
    protected $table = "procesos";
    public $timestamps = false;

}
