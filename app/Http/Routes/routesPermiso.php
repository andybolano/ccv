<?php
Route::resource("api/permisos","PermisoController");
Route::get("api/permiso/getAll","PermisoController@getAll");
Route::put("api/permiso/update","PermisoController@updatePermiso");