<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use App\Usuario;
use App\Buzon;
class UsuarioController extends Controller
{
    
    
   
    public function autenticar(Request $request){
        try {
            $id=0;
          $data = $request->all();
             $usuario = $data['username'];
             $clave = $data['pass'];
              $user = DB::select(DB::raw(
                        "Select e.nombres,e.noDocumento,e.apellidos,e.id,cargos.nombre as cargo, cargos.id as idCargo, areas.id as idArea, areas.nombre as area, u.rol as rol   from empleados as e 
                        INNER JOIN cargos ON cargos.id = e.Cargos_id  
                        INNER JOIN areas ON areas.id = e.Areas_id
                        INNER JOIN usuarios as u ON u.Empleados_id = e.id
                        WHERE u.correo =  '".$usuario."'  AND u.clave = '".$clave."' AND u.estado = 'ACTIVO' "
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
    
    
      public function getUsuario($id){       
        $usu = DB::select(DB::raw(
                        "Select correo,id from usuarios WHERE Empleados_id = $id"
                    )); 
        return $usu;
    }
    
     public function postUsuario(Request $request){ 
       $data = $request->all();
       $id = $data['id'];
       $user = $data['usuario'];
       $clave = $data['clave'];
       
       DB::table('usuarios')
            ->where('Empleados_id', $id)
            ->update(array('correo' => $user,'clave' => $clave));
       

       return JsonResponse::create(array('message' =>"OK"), 200);
    }
    
     public function postBuzon(Request $request){ 
       $data = $request->all();
      
       $buzon = new Buzon();
       $buzon->mensaje = $data['mensaje'];
       $buzon->funcionario = $data['id'];
       $buzon->save();
        
       return JsonResponse::create(array('message' =>"OK", "request" =>"Mensaje enviado con exito"), 200);
    }
    
     
    
}