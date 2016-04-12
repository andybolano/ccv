<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;
use App\Http\Controllers\Controller;


use DB;
use App\Empleado;

class EmpleadoController extends Controller
{

    
     public function getNuevaEntrada($empleado){
        
         
         return "Entrada Notificada".$empleado."";
       
               
    }
    
    public function getRetrasoDia(Request $request){
        try {           
            $data = $request->all();
        
            $empleado = $data["empleado"];
            $fecha= $data["fecha"];
            
            $result = DB::select(DB::raw(
                        "Select * from entradassalidas 
                        WHERE Empleados_id = $empleado AND fecha = '$fecha'" 
              ));
     
         if(count($result)>0){
                return $result;
         }else{
             return 0;
         }
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Horario", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
    }
    
    
    public function getById($empleado){
        
         $result = DB::select(DB::raw(
                        "Select e.nombres,e.noDocumento,e.apellidos,e.id,cargos.nombre as cargo, areas.nombre as area  from empleados as e 
                        INNER JOIN cargos ON cargos.id = e.Cargos_id  
                        INNER JOIN areas ON areas.id = e.Areas_id
                        WHERE e.noDocumento = $empleado"
                    ));
         if(count($result)>0){
                return $result;
         }else{
             return 0;
         }
           
               
    }
    
     public function getByIdExterno($empleado){
        
         $result = DB::select(DB::raw(
                        "Select e.nombres,e.noDocumento,e.apellidos,e.id,cargos.nombre as cargo, areas.nombre as area  from empleados as e 
                        INNER JOIN cargos ON cargos.id = e.Cargos_id  
                        INNER JOIN areas ON areas.id = e.Areas_id
                        WHERE e.id = $empleado"
                    ));
         if(count($result)>0){
                return $result;
         }else{
             return 0;
         }
           
               
    }
    
     public function getPermisos($empleado){
        
         $result = DB::select(DB::raw(
                        "Select p.* , permisos.nombre as nombrePermiso from solicitudpermisos as p 
                        INNER JOIN empleados ON empleados.id = p.Empleados_id  
                          INNER JOIN permisos ON permisos.id = p.tipoPermisos_id 
                        WHERE empleados.id = $empleado"
                    ));
         if(count($result)>0){
                return $result;
         }else{
             return 0;
         }
           
               
    }
    public function getByArea($area_id){
        
         $result = DB::select(DB::raw(
                        "Select e.nombres,e.noDocumento,e.apellidos,e.id,cargos.nombre from empleados as e
                         INNER JOIN cargos ON cargos.id = e.Cargos_id  
                         INNER JOIN areas ON areas.id = e.Areas_id
                         WHERE e.Areas_id = $area_id"
                    ));
         
   
         if(count($result)>0){
                return $result;
         }else{
             return 0;
         }
           
               
    }
    
    public function getEntradaSalidaByEmpleado($idEmpleado){
        $result = DB::select(DB::raw(
               "SELECT * FROM entradassalidas WHERE Empleados_id = $idEmpleado" 
        ));
        
        return $result;
    }
    
    public function getEntradaSalidaByEmpleadofecha($idEmpleado,$fecha){
        $result = DB::select(DB::raw(
               "SELECT * FROM entradassalidas 
                INNER JOIN horarios ON entradassalidas.Horarios_id = horarios.id
                WHERE Empleados_id = $idEmpleado AND DATE(fecha)= '$fecha' "
        ));
        
        return $result;
    }
    
       public function getEntradaSalidaByMes($idEmpleado,$mes){
        $result = DB::select(DB::raw(
               "SELECT es.id, es.Empleados_id, es.fecha ,em.hora as hora_entrada_jor_man,em.Horarios_id as horario_em, sm.hora as hora_salida_jor_man,sm.Horarios_id as horario_sm, et.hora as hora_entrada_jor_tar, et.Horarios_id as horario_et, st.hora as hora_salida_jor_tar, st.Horarios_id as horario_st  FROM 
                ( SELECT * FROM entradassalidas  WHERE Empleados_id = $idEmpleado AND month(fecha) = $mes )es
                left join (SELECT Empleados_id, Horarios_id, hora, fecha  FROM entradassalidas  WHERE    Horarios_id='1' AND  Empleados_id = $idEmpleado)em On es.fecha  = em.fecha
                left join (select Empleados_id, Horarios_id, hora, fecha  from  entradassalidas  WHERE   Horarios_id='2' AND  Empleados_id = $idEmpleado)sm On es.fecha = sm.fecha
                left join (select Empleados_id, Horarios_id, hora,fecha  from  entradassalidas  WHERE   Horarios_id='3' AND  Empleados_id = $idEmpleado)et On es.fecha = et.fecha
                left join (select Empleados_id, Horarios_id, hora, fecha  from  entradassalidas  WHERE   Horarios_id='4' AND  Empleados_id = $idEmpleado)st On es.fecha = st.fecha 
              
                GROUP BY fecha"
      
        ));
        
        return $result;
    }
    
     public function getEntradaSalidaByMesGlobal($idEmpleado,$mes){
        $result = DB::select(DB::raw(
               "SELECT e.nombres,e.apellidos, e.noDocumento, es.id, es.Empleados_id, es.fecha ,em.hora as hora_entrada_jor_man,em.Horarios_id as horario_em,  et.hora as hora_entrada_jor_tar, et.Horarios_id as horario_et  FROM 
                ( SELECT * FROM entradassalidas  WHERE Empleados_id = $idEmpleado AND month(fecha) = $mes )es
                left join (SELECT Empleados_id, Horarios_id, hora, fecha  FROM entradassalidas  WHERE    Horarios_id='1' AND  Empleados_id = $idEmpleado)em On es.fecha  = em.fecha
                left join (select Empleados_id, Horarios_id, hora, fecha  from  entradassalidas  WHERE   Horarios_id='2' AND  Empleados_id = $idEmpleado)sm On es.fecha = sm.fecha
                left join (select Empleados_id, Horarios_id, hora,fecha  from  entradassalidas  WHERE   Horarios_id='3' AND  Empleados_id = $idEmpleado)et On es.fecha = et.fecha
                left join (select Empleados_id, Horarios_id, hora, fecha  from  entradassalidas  WHERE   Horarios_id='4' AND  Empleados_id = $idEmpleado)st On es.fecha = st.fecha 
                inner join empleados e on e.id = $idEmpleado
                GROUP BY fecha"
      
        ));
        
        return $result;
    }
 
    public function totalPuntaje($idEmpleado){
        $result = DB::select(DB::raw(
        "SELECT SUM(puntaje) as total FROM entradassalidas WHERE Empleados_id=$idEmpleado" 
        ));
        
        return $result;
    }
    
    public function topPuntaje(){
        $result = DB::select(DB::raw(
             "SELECT SUM(puntaje) as total, Empleados_id, empleados.nombres, empleados.apellidos, empleados.noDocumento FROM entradassalidas 
                INNER JOIN empleados ON empleados.id = Empleados_id 
                GROUP BY Empleados_id ORDER BY total DESC LIMIT 0,10"
              
        ));
        
        return $result;
    }
    
      public function noTopPuntaje(){
        $result = DB::select(DB::raw(
             "SELECT SUM(puntaje) as total, Empleados_id, empleados.nombres, empleados.apellidos, empleados.noDocumento FROM entradassalidas 
                INNER JOIN empleados ON empleados.id = Empleados_id 
                GROUP BY Empleados_id ORDER BY total ASC LIMIT 0,10"
              
        ));
        
        return $result;
    }
    
    
    
     public function index()
    {
        try {
             $result = DB::select(DB::raw(
                           "Select e.nombres,e.noDocumento,e.apellidos,e.id,cargos.nombre as cargo, areas.nombre as area  from empleados as e 
                        INNER JOIN cargos ON cargos.id = e.Cargos_id  
                        INNER JOIN areas ON areas.id = e.Areas_id ORDER BY e.nombres ASC"
                        
                    ));  
             
             return $result;
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
}


