app.controller('solicitudesController', ['$scope', '$http', function($scope, $http) {
   
 $scope.solicitudes = {};       
  var list_archivo=new Array();
  $scope.numHistoria = 0;
$scope.formatocambios = {};
     
     $scope.historiadocumentos = [];
      
       
      cargarCargos_init();
        getAllSubprocesos();
        getAllprocesos();
        getAlldocumentos();
        
             function getAllSubprocesos() {
            $http.get('http://www.appccvalledupar.co/sgc/public/api/subprocesos').success(function(respuesta) {
                localStorage.setItem("subprocesos", JSON.stringify(respuesta));
            });
        }

        function getAllprocesos() {
            $http.get('http://www.appccvalledupar.co/sgc/public/api/procesos').success(function(respuesta) {
                localStorage.setItem("procesos", JSON.stringify(respuesta));
            });
        }

        function getAlldocumentos() {
            $http.get('http://www.appccvalledupar.co/sgc/public/api/documentos').success(function(respuesta) {
                localStorage.setItem("documentos", JSON.stringify(respuesta));
            });
        }

        function cargarCargos_init() {
            $http.get('http://www.appccvalledupar.co/timeit/public/api/cargos').success(function(respuesta) {
                localStorage.setItem("cargos", JSON.stringify(respuesta));
            });
        }
        
       
            
    $scope.cargarAllSolicitides = function (){
      var item = "";
           var nombreRes = "";
           var nombreApro = "";
           list_archivo.length=0;
           
     $http.get('http://www.appccvalledupar.co/sgc/public/api/solicitudes').success(function(respuesta) {
          
         var cargos = JSON.parse(localStorage.getItem("cargos"));
                for(i=0; i<respuesta.length; i++){
                 if(respuesta[i].aprobacionresponsable == 1){
                            for(y=0; y<cargos.length; y++){
                                  if(respuesta[i].responsable == cargos[y].id){
                                      nombreRes = cargos[y].nombre;
                                      break;
                                  }
                              }
                            for(y=0; y<cargos.length; y++){          
                                if(respuesta[i].responsableAprobacion == cargos[y].id){ 
                                    nombreApro = cargos[y].nombre;
                                    break;
                                }
                            }
               item = {archivo:respuesta[i],nombreResponsable:nombreRes,nombreResponsableApro:nombreApro}

             list_archivo.push(item);
              
                    item="";
                
                } 
         }
             $scope.solicitudes = list_archivo;
                document.getElementById("loading").style.display="none";
            }); 
    };
    
   $scope.cargarSolicitides = function (){
       
    var usuario = JSON.parse(sessionStorage.getItem('session'));
    var id= usuario[0].noDocumento;
    
      var item = "";
           var nombreRes = "";
           var nombreApro = "";
           list_archivo.length=0;
           
     $http.get('http://www.appccvalledupar.co/sgc/public/api/solicitudes/byFuncionario/'+id).success(function(respuesta) {
          
         var cargos = JSON.parse(localStorage.getItem("cargos"));
                for(i=0; i<respuesta.length; i++){
                    
                 if(respuesta[i].id == null){
                     
                 }else{
                            for(y=0; y<cargos.length; y++){
                                  if(respuesta[i].responsable == cargos[y].id){
                                      nombreRes = cargos[y].nombre;
                                      break;
                                  }
                              }
                              
                            for(y=0; y<cargos.length; y++){          
                                if(respuesta[i].responsableAprobacion == cargos[y].id){ 
                                    nombreApro = cargos[y].nombre;
                                    break;
                                }
                            }
                            
                     
                
               item = {archivo:respuesta[i],nombreResponsable:nombreRes,nombreResponsableApro:nombreApro}

             list_archivo.push(item);
              
                    item="";
                
                }
                
             

             $scope.solicitudes = list_archivo;
                document.getElementById("loading").style.display="none";
            }
            });
        
    };
    
    
     $scope.modalNota = function(nota,nombre,version){
                $scope.nota=nota;
                $scope.nombre=nombre;
                $scope.version=version;
              
                 $('#nota').openModal();
            };
          $scope.modalRespuesta = function(nombre, idDocumento){
               $scope.idDocumentoActual = idDocumento;
                $scope.nombre=nombre;
                 $('#respuesta').openModal();
                 
                 $http.get('http://www.appccvalledupar.co/sgc/public/api/solicitudes/historia/'+idDocumento).success(function(respuesta) {
                           $scope.historiadocumentos = respuesta;
                 });
            };  
            
            $scope.enviarRespuesta = function(documento){
             if($('#mensaje').val() == ""  || $('#nombreEmisor').val() == ""){
                 Materialize.toast("Faltan campos por llenar","rounded", 3000);
             } else{  
                 var fecha = new Date();
                    var hoy =fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate()+1)
        
                var object = {
                    mensaje:$('#mensaje').val(),
                    documento:documento,
                    fecha:hoy,
                    nombre:$('#nombreEmisor').val(),
                    emite:'Comite de Calidad'
                }
                
               $http.post('http://www.appccvalledupar.co/sgc/public/api/solicitudes/respuesta',object).success(function(respuesta) {
                           $scope.rechazarDocumento(documento,2);
                 });
             }
            }
            
            
            $scope.rechazarDocumento = function(id,estado){
                 swal({title: "Este documento sera rechazado",   
                    text: "Esta realmente seguro que desean enviar este mensaje?",   
                    type: "warning",   showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, deseamos enviarlo!",   
                    cancelButtonText: "No, no lo enviaremos!",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){   
                    if (isConfirm) {
                 var object = {
                                idDocumento:id,
                                autoriza:"comite",
                                estado:estado
                            }
                          
                        $http.post('http://www.appccvalledupar.co/sgc/public/api/solicitudes/updateEstado',object).success(function(respuesta) {
                                      $('#mensaje').val('');
                                      $('#respuesta').closeModal();
                                    swal("Repuesta!", "Ha sido enviada con satisfacion.Y el documento ha sido rechazado", "success");
                                  $scope.cargarAllSolicitides();
                        });
                        
                        } else {     
                        swal("Cancelada", "Esta operacion ha sido cancelada", "error");   
                    } });
                        
            }
            $scope.modalFormatoCambios = function(descripcion, razones, afecta, necesidades, flujo, ajuste){
                 $scope.formatocambios.descripcion = descripcion;
                 $scope.formatocambios.razones = razones;
                 $scope.formatocambios.afecta = afecta;
                 $scope.formatocambios.necesidades = necesidades;
                 $scope.formatocambios.flujo = flujo;
                 $scope.formatocambios.ajuste = ajuste;
                 $('#formatocambios').openModal();
              
            };
            
            $scope.actualizarEstado = function(id,estado){
                
                swal({title: "ALTO!",   text: "Necesitas proporcionar clave de seguridad para realizar esta accion:",   type: "input",   showCancelButton: true,   closeOnConfirm: false,   animation: "slide-from-top",   inputPlaceholder: "Escribir contraseña" 
                }, function(inputValue){
                    if (inputValue === false) return false;
                    if (inputValue != "3edcft6") {    
                        swal.showInputError("Realmente tienes permisos para realizar esta acción?");     
                        return false   
                    }      
                   
                
                swal("Bien!", "Tu contraseña ha sido validada", "success"); 
                
                
                swal({title: "Este documento sera aprobado",   
                    text: "Esta realmente seguro que desean aprobar este documento?",   
                    type: "warning",   showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, deseamos aprobarlo!",   
                    cancelButtonText: "No, no lo aprobaremos!",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){   
                    if (isConfirm) {
                        
                        
                         var object = {
                                idDocumento:id,
                                autoriza:"comite",
                                estado:estado
                            };
                          
                        $http.post('http://www.appccvalledupar.co/sgc/public/api/solicitudes/updateEstado',object).success(function(respuesta) {
                                    swal("Aprobado!", "Este documento ahora se encuentra vigente.", "success");
                                  $scope.cargarAllSolicitides();
                            console.log(respuesta)
                        });
                        
                        
                    } else {     
                        swal("Cancelada", "Esta operacion ha sido cancelada", "error");   
                    } });
                
                 
                });
            }
            
            $scope.revisado = function(idDocumento,idMensaje){
               
                 $http.post('http://www.appccvalledupar.co/sgc/public/api/solicitudes/revisado/'+idMensaje).success(function(respuesta) {
                          
                     $http.get('http://www.appccvalledupar.co/sgc/public/api/solicitudes/historia/'+idDocumento).success(function(respuesta) {
                                    $scope.historiadocumentos = respuesta;
                            });   
                 });
            }
            
             $scope.modalEdit = function(item) {
            $scope.nombre = item.archivo.nombre;
            $('#edit').openModal();
            $('#proceso').html("");
            $('#subproceso').html("");
            var procesos = JSON.parse(localStorage.getItem("procesos"));

            for (i = 0; i < procesos.length; i++) {
                $('#proceso').append('<option value="' + procesos[i].id + '" selected="selected">' + procesos[i].nombre + '</option>');
            }


            var documentos = JSON.parse(localStorage.getItem("documentos"));

            for (i = 0; i < documentos.length; i++) {
                $('#documentos').append('<option value="' + documentos[i].id + '" selected="selected">' + documentos[i].nombre + '</option>');
            }

            document.getElementById("proceso").value = item.archivo.proceso;
            document.getElementById("documentos").value = item.archivo.tipoDocumento;

            $scope.cargarSubprocesosEdit(item.archivo.proceso);
            document.getElementById("fechaActualizacion").value = item.archivo.fecha;


            var cargos = JSON.parse(localStorage.getItem("cargos"));

            for (i = 0; i < cargos.length; i++) {
                $('#responsableDocumento').append('<option value="' + cargos[i].id + '" selected="selected">' + cargos[i].nombre + '</option>');
                $('#responsableAprobacion').append('<option value="' + cargos[i].id + '" selected="selected">' + cargos[i].nombre + '</option>');
            }

          
            document.getElementById("responsableDocumento").value = item.archivo.responsable;
            document.getElementById("responsableAprobacion").value = item.archivo.responsableAprobacion;
           
            document.getElementById("cambio").value = item.archivo.nota;
            document.getElementById("version").value = item.archivo.version;
            document.getElementById("idArchivo").value = item.archivo.idArch;
            document.getElementById("idDocumento").value = item.archivo.idDoc;
        }
        
        $scope.cargarSubprocesosEdit = function(proceso) {
            $('#subproceso').html("");
            var subprocesos = JSON.parse(localStorage.getItem("subprocesos"));

            for (i = 0; i < subprocesos.length; i++) {
                if (subprocesos[i].idProceso == proceso) {
                    $('#subproceso').append('<option value="' + subprocesos[i].id + '" selected="selected">' + subprocesos[i].nombre + '</option>');
                }
            }
        }
        
        $scope.visualizarOneEdit = function() {
 
         var file= document.getElementById('file_edit').files;
         var file;
         var item = "";
         $("#listaVersion_edit").html("");
          for (i = 0; i<file.length; i++)
            { 
                item = "<tr>"+
                        "<td>"+1+"</td>"+
                        "<td>"+file[i].name+"</td>"+
                        "<td>"+(file[i].size / (1024 * 1024)).toFixed(2) + "MG</td>"+
                        '<td><span class="bage" style="background-color:#fb8c00 ;font-size:14px">'+document.getElementById("version").value+'</span></td>'+
                        "</tr>";
            }    
            $("#listaVersion_edit").append(item);     
  }
  
    $scope.actualizarAchivos = function (){  
          
                 var formData=new FormData();
               if($scope.File.documento_edit == undefined){
                }else{
                    formData.append('documento',$scope.File.documento_edit);
                } 
                formData.append('proceso',$('#proceso').val());
                formData.append('tipoDocumento',$('#documentos').val());
                formData.append('subproceso',$('#subproceso').val());
                formData.append('fechaActualizacion', $('#fechaActualizacion').val());
                formData.append('version', $('#version').val());
                formData.append('responsableDocumento', $('#responsableDocumento').val());
                formData.append('responsableAprobacion', $('#responsableAprobacion').val());
              
                formData.append('cambio', $('#cambio').val());
                formData.append('idArchivo', $('#idArchivo').val());
                formData.append('idDocumento', $('#idDocumento').val());
                formData.append('id_funcionario', sessionStorage.id_usuario); 
          
                $http.post('http://www.appccvalledupar.co/sgc/public/api/archivos/update',formData,{transformRequest: angular.identity, 
                headers: {'Content-Type': undefined}}).success(function(respuesta) {
        
                        if(respuesta.request=="OK"){
                            $('#listaVersion_edit').html("");
                            $('#file_edit').val("");
                            swal("Buen trabajo!", ""+respuesta.message+"", "success");
                                $scope.direccionarProcesos(localStorage.procesoActual);
                        }else{
                   sweetAlert("Oops...", "Hemos detectado un problema!", "error"); 
                }
                });
            }
            
            $scope.eliminarSolicitud = function(id){
                
                  swal({title: "Esta solicitud sera eliminada",   
                    text: "Esta realmente seguro que desea eliminar esta solicitud?",   
                    type: "warning",   showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, deseo eliminarla!",   
                    cancelButtonText: "No, no deseo eliminarla!",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){   
                    if (isConfirm) {
                
                
                   $http.post('http://www.appccvalledupar.co/sgc/public/api/solicitudes/eliminar/'+id).success(function(respuesta) {
                                                  swal("Repuesta!", "La solicitud ha sido eliminada", "success");
                                                  $scope.cargarSolicitides();
                   });
                   
                    } else {     
                        swal("Cancelada", "Esta operacion ha sido cancelada", "error");   
                    } });
                   
            }
            
}]);


