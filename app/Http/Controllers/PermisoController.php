<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use DB;
use App\Permiso;

class PermisoController extends Controller
{

    
      public function nuevaSolicitud(Request $request)
      {
          
        try {                                 
          $data = $request->all();
          
          $estado = "";
           
          if($data["vistoAutoriza"] == "false" || $data["vistoJefe"] == "false" ){
                $estado = "ESPERANDO";
            }else if($data["vistoAutoriza"]== "true" || $data["vistoJefe"] == "true" ){
                 $estado = "AUTORIZADO";
                }else{
                $estado = "ESPERANDO";
                }
             $permiso = new Permiso();
           $permiso->estado = $estado;
            $permiso->fechaSalida = $data["fechaSalida"];
            $permiso->fechaEntrada = $data["fechaEntrada"];
            $permiso->horaSalida = $data["horaSalida"];
            $permiso->horaEntrada = $data["horaEntrada"];
            $permiso->TipoPermisos_id = $data["motivoPermiso"];
            $permiso->Empleados_id = $data["funcionario"];
            $permiso->otroMotivo = $data["otroMotivo"];
            $permiso->remuneracion = $data["remuneracion"];
            $permiso->vistoAutoriza = $data["vistoAutoriza"];
            $permiso->vistoJefe = $data["vistoJefe"];
       
            //$permiso->save();

            return JsonResponse::create(array('message' =>$data), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Permiso", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
    }
    
    
     public function show($permiso){       
        return Permiso::find($permiso); 
    }
    
   public function getAll(){
         try {
              $result = DB::select(DB::raw(
                        "Select s.*, e.nombres, e.apellidos, noDocumento, p.nombre as nombrePermiso from solicitudpermisos as s
                         INNER JOIN empleados as e ON e.id = s.Empleados_id  
                         INNER JOIN permisos as p ON p.id = s.TipoPermisos_id
                        " 
                    )); 
              return $result;
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
              $result = DB::select(DB::raw(
                        "Select * from permisos"
                    )); 
              return $result;
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    

   
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    /*public function store(Request $request)
    {
        try {           
            $data = $request->all();
        
            $permiso = new Permiso();
            if($data["procedencia"]=="movil"){
                $permiso->estado = "ESPERANDO";
            }else{
                $permiso->estado = "AUTORIZADO";
            }
     
            $permiso->fechaSalida = $data["fechaSalida"];
            $permiso->fechaEntrada = $data["fechaEntrada"];
            $permiso->horaSalida = $data["horaSalida"];
            $permiso->horaEntrada = $data["horaEntrada"];
            $permiso->TipoPermisos_id = $data["motivoPermiso"];
            $permiso->Empleados_id = $data["funcionario"];
            $permiso->otroMotivo = $data["otroMotivo"];
            $permiso->remuneracion = $data["remuneracion"];
            $permiso->vistoAutoriza = $data["vistoAutoriza"];
            $permiso->vistoJefe = $data["vistoJefe"];
            $permiso->save();

            return JsonResponse::create(array('message' => "Permiso Registrado Correctamente"), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Permiso", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
    }*/

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     *//*
    public function update(Request $request, $id)
    {
        try {
            
            $data = $request->all();
            
            $horario = Horario::find($id);

             $horario->nombre = $data["nombre"];
            $horario->horallegada = $data["horaEntrada"];
            $horario->horasalida = $data["horaSalida"];
            
            $horario->save();
            
        
            
        return JsonResponse::create(array('message' => "Horario Modificada Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     *//*
    public function destroy($id)
    {
        try {
            $horario = Horario::find($id);
            $horario->delete();
            return JsonResponse::create(array('message' => "Horario Eliminada Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }*/
}
