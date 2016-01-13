<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Horario;

class HorarioController extends Controller
{
    

    
    public function show($idHorario){       
        return Horario::find($idHorario); 
    }
    
    public function getAll(){
        return Horario::all();;   
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return Horario::all();   
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
        
            $horario = new Horario();
            $horario->nombre = $data["nombre"];
            $horario->horallegada = $data["horaEntrada"];
            $horario->horasalida = $data["horaSalida"];
            $horario->save();
            
     
     
            return JsonResponse::create(array('message' => "Horario Guardada Correctamente", "request" => $horario), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Horario", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
     */
    public function destroy($id)
    {
        try {
            $horario = Horario::find($id);
            $horario->delete();
            return JsonResponse::create(array('message' => "Horario Eliminada Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
