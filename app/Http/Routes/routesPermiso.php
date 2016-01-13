<?php
Route::resource("api/permisos","PermisoController");
Route::get("api/permiso/getAll","PermisoController@getAll");
Route::post("api/permiso/nuevo","PermisoController@nuevaSolicitud");