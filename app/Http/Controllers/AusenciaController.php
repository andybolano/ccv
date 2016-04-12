<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use DB;
use App\Ausencia;

class AusenciaController extends Controller
{
    

    
    public function show($idAusencia){       
        return Ausencia::find($idAusencia); 
    }
    
    public function getAll(){
         $result = DB::select(DB::raw(
                        "Select a.*, e.nombres, e.apellidos, e.noDocumento from ausencia as a
                         INNER JOIN empleados as e ON e.id = a.idEmpleado  
                        " 
                    )); 
              return $result;
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
                        "Select a.*, e.nombres, e.apellidos, e.noDocumento from ausencia as a
                         INNER JOIN empleados as e ON e.id = a.idEmpleado   
                        " 
                    )); 
              return $result;  
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
     public function ByEmpleado($empleado)
    {
        try {
            
              $result = DB::select(DB::raw(
                        "Select *  from ausencia WHERE idEmpleado = $empleado ORDER BY id DESC"
                    ));
         if(count($result)>0){
                return $result;
         }else{
             return 0;
         }
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
    public function store(Request $request)
    {
        try {           
            $data = $request->all();
        
            $ausencia = new Ausencia();
            $ausencia->titulo = $data["titulo"];
            $ausencia->descripcion = $data["descripcion"];
            $ausencia->idEmpleado = $data["idEmpleado"];
            $ausencia->estado = "0";
            $ausencia->save();
            
            $ausencia->ruta = "http://".$_SERVER['HTTP_HOST'].'/timeit/img/ausencia/'.$ausencia->id.".jpg";
            $ausencia->save();
            
            
            return JsonResponse::create(array('message' => "Ausencia Enviada Correctamente", "id" => $ausencia->id), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar la ausencia", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
    }
    
    public function NuevaAusencia(Request $request)
    {
        try {           
            $data = $request->all();
        
            $ausencia = new Ausencia();
            $ausencia->titulo = $data["titulo"];
            $ausencia->descripcion = $data["descripcion"];
            $ausencia->idEmpleado = $data["idEmpleado"];
            $ausencia->estado = "0";
            $ausencia->save();
            
            $ausencia->ruta = "http://".$_SERVER['HTTP_HOST'].'/camaradecomercio/img/ausencia/'.$ausencia->id.".jpg";
            $ausencia->save();
            
                 if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/ausencia", $ausencia->id.".jpg");
            }
            
            
            return JsonResponse::create(array('message' => "Enviada Correctamente", "id" => $ausencia->id), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar la ausencia", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
    }

    
  
    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        try {
            
            $data = $request->all();
            
            $ausencia = Ausencia::find($id);

            $ausencia->titulo = $data["titulo"];
            
            $ausencia->save();
            
        
            
        return JsonResponse::create(array('message' => "Ausencia Modificada Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la ausencia", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        try {
            $ausencia = Ausencia::find($id);
            $ausencia->delete();
            return JsonResponse::create(array('message' => "Ausencia Eliminada Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la ausencia", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
