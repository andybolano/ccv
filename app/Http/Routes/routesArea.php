<?php
 Route::get("api/area/getAll","AreaController@getAll");
 Route::get("api/area/{area_id}/empleados/{fecha}","AreaController@getEmpleadosByfecha");
 Route::get("api/area/getJefe/{area_id}","AreaController@getJefe");