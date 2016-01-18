<?php
Route::resource("api/permisos","PermisoController");
Route::get("api/permiso/getAll","PermisoController@getAll");
Route::get("api/permiso/nuevasSolicitudes","PermisoController@getNuevasSolicitudes");
Route::get("api/permisos/solicitudes/areas/{area}","PermisoController@getNuevasSolicitudesByarea");
Route::put("api/permiso/update","PermisoController@updatePermiso");