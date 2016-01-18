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
               "SELECT es.id, es.fecha ,em.hora as hora_entrada_jor_man,em.Horarios_id as horario_em, sm.hora as hora_salida_jor_man,sm.Horarios_id as horario_sm, et.hora as hora_entrada_jor_tar, et.Horarios_id as horario_et, st.hora as hora_salida_jor_tar, st.Horarios_id as horario_st  FROM ( SELECT * FROM entradassalidas  WHERE Empleados_id = $idEmpleado AND month(fecha) = $mes )es
left join (SELECT Empleados_id, Horarios_id, hora, fecha  FROM entradassalidas  WHERE    Horarios_id='1')em On es.fecha  = em.fecha
left join (select Empleados_id, Horarios_id, hora, fecha  from  entradassalidas  WHERE   Horarios_id='2')sm On es.fecha = sm.fecha
left join (select Empleados_id, Horarios_id, hora,fecha  from  entradassalidas  WHERE   Horarios_id='3')et On es.fecha = et.fecha
left join (select Empleados_id, Horarios_id, hora, fecha  from  entradassalidas  WHERE   Horarios_id='4')st On es.fecha = st.fecha 
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


