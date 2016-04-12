<?php
Route::post('api/usuario/autenticar', 'UsuarioController@autenticar');     
Route::post('api/usuario/{cedula}/activarCuenta', 'UsuarioController@activarCuenta');  
Route::get('api/usuario/get/{cedula}', 'UsuarioController@getUsuario');
Route::post('api/usuario/post', 'UsuarioController@postUsuario'); 
Route::post('api/usuario/buzon', 'UsuarioController@postBuzon'); 
