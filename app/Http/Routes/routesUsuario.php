<?php
Route::post('api/usuario/autenticar', 'UsuarioController@autenticar');     
Route::post('api/usuario/{cedula}/activarCuenta', 'UsuarioController@activarCuenta');  