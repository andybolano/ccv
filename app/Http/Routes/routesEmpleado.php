<?php
 Route::resource("api/empleado","EmpleadoController");
 Route::get("api/empleado/{empleado}","EmpleadoController@getById");
 Route::get("api/empleado/area/{area}","EmpleadoController@getByArea");
 Route::get("api/empleado/entradaSalida/{idEmpleado}","EmpleadoController@getEntradaSalidaByEmpleado");
 Route::get("api/empleado/entradaSalida/{idEmpleado}/{fecha}","EmpleadoController@getEntradaSalidaByEmpleadofecha");
 Route::get("api/empleado/puntaje/{idEmpleado}","EmpleadoController@totalPuntaje");
 
 Route::get("api/empleado/permisos/{idEmpleado}","EmpleadoController@getPermisos");
 
 
 
 Route::get("api/empleado/id/{empleado}","EmpleadoController@getByIdExterno");
 Route::get("api/empleados/puntajes","EmpleadoController@topPuntaje");
Route::get("api/empleados/noTopPuntajes","EmpleadoController@noTopPuntaje");
 Route::get("api/empleado/nuevaEntrada/{empleado}","EmpleadoController@getNuevaEntrada");
 Route::get("api/empleado/entradaSalida/{idEmpleado}/mes/{mes}","EmpleadoController@getEntradaSalidaByMes");
  Route::get("api/empleado/entradaSalidaGlobal/{idEmpleado}/mes/{mes}","EmpleadoController@getEntradaSalidaByMesGlobal");
  
  Route::post("api/empleado/retrasoDia","EmpleadoController@getRetrasoDia");
  
  Route::get("api/empleado/procesos/{empleado}","EmpleadoController@getProcesoByEmpleado");
  
