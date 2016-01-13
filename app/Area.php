<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    
    protected $table = "areas";
    
    public $timestamps = false;
    
    public function jefeArea(){
        return $this->hasMany("App\JefeArea","Areas_id");
    }
 
}
