<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Area;
use DB;


class AreaController extends Controller
{
     public function getAll(){
        return Area::select('id', 'codigo','nombre')
                ->orderBy('nombre', 'asc')
                ->get();
    }
    
    public function getJefe($area_id){
        
        $Area = Area::find($area_id);        
        $data = $Area->JefeArea;
          foreach ($data as $a) {
           $empleado = $a['Empleados_id'];
          }
        if(count($data)>0){  
           $result = DB::select(DB::raw(
                        "Select noDocumento,nombres,apellidos from empleados
                        WHERE  id = '$empleado'"
                    ));
           
            return $result;
        
            }else{
               return 0; 
            }
    }
    
    public function getEmpleadosByfecha($area_id,$fecha){
           $result = DB::select(DB::raw(
                " select e.id, e.noDocumento, e.nombres, e.apellidos,e.sexo, c.nombre as cargo, em.hora as hora_entrada_jor_man,em.Horarios_id as horario_em, sm.hora as hora_salida_jor_man,sm.Horarios_id as horario_sm, et.hora as hora_entrada_jor_tar, et.Horarios_id as horario_et, st.hora as hora_salida_jor_tar, st.Horarios_id as horario_st   from (                         
select e.id, e.noDocumento, e.nombres, e.apellidos, e.sexo, e.Cargos_id from empleados as e  WHERE  Areas_id =$area_id AND estado='Activo') e
left join (SELECT Empleados_id, Horarios_id, hora  FROM entradassalidas  WHERE  entradassalidas.fecha ='$fecha' and Horarios_id='1')em On e.id = em.Empleados_id
left join (select Empleados_id, Horarios_id, hora  from entradassalidas  WHERE  entradassalidas.fecha ='$fecha' and Horarios_id='2')sm On e.id = sm.Empleados_id
left join (select Empleados_id, Horarios_id, hora  from entradassalidas  WHERE  entradassalidas.fecha ='$fecha' and Horarios_id='3')et On e.id = et.Empleados_id
left join (select Empleados_id, Horarios_id, hora  from entradassalidas  WHERE  entradassalidas.fecha ='$fecha' and Horarios_id='4')st On e.id = st.Empleados_id
inner join (select nombre,id from cargos) c ON e.Cargos_id = c.id" 

                     ));
           
         
            return $result;
    }    
}

/*
 * 
 * 
 * select * from (                         
select Empleados_id,fecha, Horarios_id  as ejm, hora as hora_ejm  from entradassalidas  WHERE  entradassalidas.fecha ='2015-12-11' and Horarios_id='1') em 
left join (select Horarios_id  as sjm, hora as hora_sjm , Empleados_id,fecha from entradassalidas  WHERE  entradassalidas.fecha ='2015-12-11' and Horarios_id='2') sm
    On em.Empleados_id=sm.Empleados_id
left join (select Horarios_id  as sjm, hora as hora_sjm , Empleados_id,fecha from entradassalidas  WHERE  entradassalidas.fecha ='2015-12-11' and Horarios_id='3') et
    On em.Empleados_id=et.Empleados_id    
left join (select Horarios_id  as sjm, hora as hora_sjm , Empleados_id,fecha from entradassalidas  WHERE  entradassalidas.fecha ='2015-12-11' and Horarios_id='4') st
On em.Empleados_id=st.Empleados_id        
inner join (select * from empleados)e ON e.id=em.Empleados_id AND e.Areas_id = '3'
inner join (select * from cargos)c ON e.Cargos_id=c.id   
 */