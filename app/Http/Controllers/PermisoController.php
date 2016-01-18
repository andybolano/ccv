<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use DB;
use App\Permiso;

class PermisoController extends Controller
{

     public function updatePermiso(Request $request)
    {
        try {
            
 
             $data = $request->all();
             $permiso = Permiso::find($data['id']);

             if($data['autoriza']=="empresa"){
                 
                    $permiso->vistoAutoriza = "1";
                    
                    if($permiso->vistoJefe == "1"){
                        $permiso->estado = "AUTORIZADO";
                    }
                    
             }else if($data['autoriza']=="jefe"){
                    $permiso->vistoJefe = "1"; 
                    
                    if($permiso->vistoAutoriza == "1"){
                        $permiso->estado = "AUTORIZADO";
                    }
             }
            
             $permiso->save();
            
        
            
        return JsonResponse::create(array('message' => "El permisos Ha sido autorizado", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }

    }
    
      public function store(Request $request)
      {
          
        try {                                 
          $data = $request->all();
          
          $estado = "";
           
          if($data["vistoAutoriza"] == false || $data["vistoJefe"] == false ){
                $estado = "ESPERANDO";
            }else if( ($data["vistoAutoriza"] == true) && ($data["vistoJefe"] == true) ){
                 $estado = "AUTORIZADO";
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
       
            $permiso->save();

            return JsonResponse::create(array('message' =>"Permiso enviado exitosamente"), 200);
            
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
                         INNER JOIN permisos as p ON p.id = s.TipoPermisos_id ORDER BY id DESC
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
    
 public function getNuevasSolicitudes(){
         try {
              $result = DB::select(DB::raw(
                        "Select s.*, e.nombres, e.apellidos, noDocumento, p.nombre as nombrePermiso from solicitudpermisos as s
                         INNER JOIN empleados as e ON e.id = s.Empleados_id  
                         INNER JOIN permisos as p ON p.id = s.TipoPermisos_id 
                         WHERE s.vistoAutoriza = 0
                         ORDER BY id DESC
                        " 
                    )); 
              return $result;
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    public function getNuevasSolicitudesByarea($area){
         try {
              $result = DB::select(DB::raw(
                        "SELECT e.nombres,e.apellidos,e.id as idEmpleado, e.noDocumento, s.*,s.id as idSolicitud, p.* FROM solicitudpermisos as s
                            INNER JOIN empleados as e ON e.id = s.Empleados_id
                            INNER JOIN areas as a ON a.id =  e.Areas_id
                            INNER JOIN permisos as p ON p.id = s.TipoPermisos_id
                            WHERE a.id = $area AND s.estado = 'ESPERANDO'
                        " 
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
