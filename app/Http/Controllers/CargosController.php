<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Cargos;

class CargosController extends Controller
{
    

    
    public function show($idCargo){       
        return Cargos::find($idCargo); 
    }
    
    public function getAll(){
        return Cargos::all();   
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return Cargos::orderBy('nombre')->get();   
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
  /*  public function store(Request $request)
    {
        try {           
            $data = $request->all();
        
            $cargo = new Cargos();
            $cargo->nombre = $data["nombre"];
            $cargo->sigla = $data["sigla"];
            $cargo->save();
            
     
     
            return JsonResponse::create(array('message' => "Cargo Guardado Correctamente", "request" => $cargo), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Cargo", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
    
    public function update(Request $request, $id)
    {
        try {
            
            $data = $request->all();
            
            $cargo = Cargos::find($id);

             $cargo->nombre = $data["nombre"];
            $cargo->sigla= $data["sigla"];
        
            
            $cargo->save();
            
        
            
        return JsonResponse::create(array('message' => "Cargo Modificado Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     
    public function destroy($id)
    {
        try {
            $cargo = Cargos::find($id);
            $cargo->delete();
            return JsonResponse::create(array('message' => "Cargo Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }*/
}
