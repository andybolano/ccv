<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});


include 'Routes/routesArea.php';
include 'Routes/routesEmpleado.php';
include 'Routes/routesHorario.php';
include 'Routes/routesUsuario.php';
include 'Routes/routesHorario.php';
include 'Routes/routesPermiso.php';
include 'Routes/routesAusencias.php';