<?php
 Route::resource("api/ausencia","AusenciaController");
  Route::post("api/ausencia/web","AusenciaController@NuevaAusencia");
  Route::get("api/ausencia/empleado/{id}","AusenciaController@ByEmpleado");