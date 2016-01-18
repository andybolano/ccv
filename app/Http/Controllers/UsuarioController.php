<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use App\Usuario;

class UsuarioController extends Controller
{
    
    
     public function autenticar(Request $request){
        try {                                 
          $data = $request->all();
             $usuario = $data['username'];
             $clave = $data['pass'];
              $user = DB::select(DB::raw(
                        "Select u.*, e.nombres, e.apellidos, e.noDocumento from usuarios as u
                            INNER JOIN empleados as e ON e.id = u.Empleados_id
                         WHERE u.correo =  '".$usuario."'  AND u.clave = '".$clave."' AND u.rol= 'ADMIN' "
                    ));      
           if (empty($user)){
                return JsonResponse::create(array('message' => "KO", "request" =>json_encode('Datos Incorrectos')), 200);
            }else{     
                 return JsonResponse::create(array('message' =>"OK", "request" =>json_encode($user)), 200);
              
            }
        
      
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se puedo autenticar el usuario", "request" =>json_encode($data)), 401);
        }
    }
    public function autenticarMovil(Request $request){
        try {
            $id=0;
          $data = $request->all();
             $usuario = $data['username'];
             $clave = $data['pass'];
              $user = DB::select(DB::raw(
                        "Select e.nombres,e.noDocumento,e.apellidos,e.id,cargos.nombre as cargo, areas.id as idArea, areas.nombre as area  from empleados as e 
                        INNER JOIN cargos ON cargos.id = e.Cargos_id  
                        INNER JOIN areas ON areas.id = e.Areas_id
                        INNER JOIN usuarios as u ON u.Empleados_id = e.id
                        WHERE u.correo =  '".$usuario."'  AND u.clave = '".$clave."'"
                    ));
              
              foreach ($user as $u) {
                $id =  $u->id;
              }
              
              $jefe = DB::select(DB::raw(
                      "SELECT * FROM jefes WHERE Empleados_id= $id"
               ));
              if (empty($jefe)){
                  $jefe = false;
              }else{
                  $jefe = true;
              }
           if (empty($user)){
                return JsonResponse::create(array('message' => "KO", "request" =>json_encode('Datos Incorrectos')), 200);
            }else{     
                 return JsonResponse::create(array('message' =>"OK", "request" =>json_encode($user), "jefeArea" => $jefe), 200);
              
            }
        
      
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se puedo autenticar el usuario", "request" =>json_encode($data)), 401);
        }
    }
    public function activarCuenta($cedula){
        try {                                 

            
              $user = DB::select(DB::raw(
                        "Select e.nombres,e.apellidos,e.noDocumento,e.id from empleados as e WHERE noDocumento = $cedula AND estado ='Activo'"
                    ));  
         
           if (empty($user)){
                return JsonResponse::create(array('message' => "KO", "request" =>json_encode($cedula)), 200);
            }else{ 
                foreach ($user as $u) {
                 $id = $u->id;
                 $usu = DB::select(DB::raw(
                        "Select * from usuarios WHERE Empleados_id = $id"
                    )); 
                  if(empty($usu)){
                        $usuario = new Usuario();
                        $usuario->correo = $u->noDocumento;
                        $usuario->clave = $u->noDocumento;
                        $usuario->Empleados_id = $u->id;
                        $usuario->rol = "FUNCIONARIO";
                        $usuario->estado = "ACTIVO";
                        $usuario->save();
                        return JsonResponse::create(array('message' =>"OK", "request" =>json_encode($user)), 200);
                   }else{
                        return JsonResponse::create(array('message' =>"EXISTE", "request" =>json_encode($user)), 200);
                   }
                }
                
            } 
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo encontrar el usuario", "request" =>json_encode($cedula)), 401);
        }
    }
}