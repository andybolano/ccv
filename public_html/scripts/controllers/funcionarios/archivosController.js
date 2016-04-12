app.controller('archivosController', ['$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
       $rootScope.listaArchivos= {};
       $scope.listaArchivosExternos = {};
        $scope.Archivo = {};
        $scope.File = {};
        $scope.Historial = {};
        
          var archivos = new Array();
        var todo=new Array();
   
        
       // var archivos = new Array();
        //var todo=new Array();
        var list_archivo=new Array();
         var list_archivo_externo=new Array();
        var list_manualProceso=new Array();
        var list_manualCalidad=new Array();
        var list_archivo_maestro=new Array();
        $scope.nombre = "";
        $scope.nota = "";
        $scope.version = "";
        $scope.proceso = "";
        $scope.listadoManualProcesos ={};
        $scope.listadoManualCalidad ={};
            $scope.listaArchivos_maestro ={};
            $scope.anexos = {}
            $scope.manualCalidad= {};
             $scope.externo = {};
              $scope.listaArchivosExternos = {};
//obtener fecha de hoy
        cargarCargos_init();
        getAllSubprocesos();
        getAllprocesos();
        getAlldocumentos();
//obtener fecha de hoy

    $scope.cargarManualProcesos = function (){
   
            document.getElementById("loading").style.display = "block";
            var item = "";
            var nombreRes = "";
            var nombreApro = "";
            
            list_manualProceso.length=0;
            
     $http.get('http://localhost/sgc/public/api/manual/procesos').success(function(respuesta) {
                 var cargos = JSON.parse(localStorage.getItem("cargos"));
                for (i = 0; i < respuesta.length; i++) {
                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsable == cargos[y].id) {
                            nombreRes = cargos[y].nombre;
                            break;
                        }
                    }

                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsableAprobacion == cargos[y].id) {
                            nombreApro = cargos[y].nombre;
                            break;
                        }
                    }

                    item = {archivo: respuesta[i], nombreResponsable: nombreRes, nombreResponsableApro: nombreApro};
                 
                    list_manualProceso.push(item);

                    item = "";
                    
        

                }
             document.getElementById("loading").style.display = "none";
                $scope.listadoManualProcesos =list_manualProceso;
            });
    }


$scope.cargarManualCalidadDoc = function (){
     $http.get('http://localhost/sgc/public/api/manual/calidad/documento').success(function(respuesta) {
                $scope.manualCalidad = respuesta[0];
              
            }); 
    
}

$scope.cargarManualCalidadAnexos = function (){
     $http.get('http://localhost/sgc/public/api/anexos/'+2).success(function(respuesta) {
                $scope.anexos = respuesta;
            }); 
    
}
 $scope.cargarArchivosExternos = function() {
             document.getElementById("loading").style.display = "block";
           var item = "";
           var nombreRes = "";
           var nombreApro = "";
           list_archivo.length=0;
            $http.get('http://localhost/sgc/public/api/archivosExternos').success(function(respuesta) {
            
                var cargos = JSON.parse(localStorage.getItem("cargos"));
                for(i=0; i<respuesta.length; i++){
                            for(y=0; y<cargos.length; y++){
                                  if(respuesta[i].responsable == cargos[y].id){
                                      nombreRes = cargos[y].nombre;
                                      
                                      break;
                                  }
                              }
                              
               item = {archivo:respuesta[i],nombreResponsable:nombreRes}
               list_archivo.push(item);
              
                    item="";
                
                }
                
             
                document.getElementById("loading").style.display = "none";
             $scope.listaArchivosExternos = list_archivo;
        
            });
        } 
$scope.cargarManualCalidad = function (){
         document.getElementById("loading").style.display = "block";
          $scope.cargarManualCalidadDoc();
          $scope.cargarManualCalidadAnexos();
          
            var item = "";
            var nombreRes = "";
            var nombreApro = "";
            
            list_manualCalidad.length=0;
            
     $http.get('http://localhost/sgc/public/api/manual/calidad').success(function(respuesta) {
    
                 var cargos = JSON.parse(localStorage.getItem("cargos"));
                for (i = 0; i < respuesta.length; i++) {
                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsable == cargos[y].id) {
                            nombreRes = cargos[y].nombre;
                            break;
                        }
                    }

                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsableAprobacion == cargos[y].id) {
                            nombreApro = cargos[y].nombre;
                            break;
                        }
                    }

                    item = {archivo: respuesta[i], nombreResponsable: nombreRes, nombreResponsableApro: nombreApro};
                 
                    list_manualCalidad.push(item);

                    item = "";
                    
        

                }
                   document.getElementById("loading").style.display = "none";
                $scope.listadoManualCalidad =list_manualCalidad;
            });
    }
    
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
            $http.get('http://localhost/sgc/public/api/documentos').success(function(respuesta) {
                localStorage.setItem("documentos", JSON.stringify(respuesta));
            });
        }

        function cargarCargos_init() {
            $http.get('http://localhost/camaradecomercio/public/api/cargos').success(function(respuesta) {
                localStorage.setItem("cargos", JSON.stringify(respuesta));
            });
        }

        $scope.miCargo = function() {
            var usuario = JSON.parse(sessionStorage.getItem("session"));
            return usuario[0].idCargo;
        }

        $scope.nuevaVersion = function(item) {

            $scope.nombre = item.archivo.nombre;
            $scope.version = item.archivo.version;
            $scope.idArchivo = item.archivo.idArchivo;
            $scope.idDocumentoActual = item.archivo.idDoc;
            $('#nuevaVersion').openModal();
            $scope.historialArchivos(item.archivo.idArchivo);
            $("#listaVersion").html("");
            $("#file").val("");
        }

        $scope.historialArchivos = function(idArchivo) {

            $http.get('http://localhost/sgc/public/api/archivos/' + idArchivo + '/historial').success(function(respuesta) {
                $scope.Historial = respuesta;
            });

        }
 $scope.modalNota = function(nota,nombre,version){
                $scope.nota=nota;
                $scope.nombre=nombre;
                $scope.version=version;
                 $('#nota').openModal();
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
          
                $http.post('http://localhost/sgc/public/api/archivos/update',formData,{transformRequest: angular.identity, 
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

      

        $scope.visualizarOne = function() {
            $("#listaVersion").html("");
            var file = document.getElementById('file').files;
            var file;
            var item = "";
            $("#listaVersion").html("");
            for (i = 0; i < file.length; i++)
            {
                item = "<tr>" +
                        "<td>" + 1 + "</td>" +
                        "<td>" + file[i].name + "</td>" +
                        "<td>" + (file[i].size / (1024 * 1024)).toFixed(2) + "MG</td>" +
                        '<td><span class="bage" style="background-color:#fb8c00 ;font-size:14px">' + (parseInt($scope.version) + (1)) + '</span></td>' +
                        '<td><input type="date" id="fechaActualizacion" style="width:90%"></td>' +
                        '<td style="text-align: center"><a href="javascript:;" id="cambiosFormatoBtn" title="PLANIFICACIÓN CAMBIOS QUE AFECTAN SISTEMA DE GESTIÓN DE CALIDAD" onclick="angular.element(this).scope().modalFormatoCambiosNuevaVersion('+i+');"><i class="material-icons">assignment</i></a></td>' +
                        "</tr>";
            }



            $("#listaVersion").append(item);
            document.getElementById('fechaActualizacion').value = new Date().toDateInputValue();


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

        $scope.guardarNuevaVersion = function() {
            var formData = new FormData();

            if($scope.File.cambios == undefined){
             Materialize.toast("Debe indicar los cambios realizados", '3000', 'rounded');
             
            
        }else{
            
             if($scope.File.documento == undefined){
                  Materialize.toast("No se ha cargado ningun archivo", '3000', 'rounded');
             }else{
                 
                 
               
                if($('#descripcionCambio').val() == "" || $('#razonesCambio').val() == ""
                    || $('#afectaCambio').val() == "" || $('#necesidadesCambio').val() == ""
                    || $('#flujoCambio').val() == ""
                    || $('#ajusteCambio').val() == "" ){
             
                        Materialize.toast("Es necesario digilenciar el formato de cambios",2000,"rounded");
                      
                    }else{
                        
            var formatoCambios = {
                   descripcion:$('#descripcionCambio').val(),
                    razones:$('#razonesCambio').val(),
                    afecta:$('#afectaCambio').val(),
                    necesidades:$('#necesidadesCambio').val(),
                    flujo:$('#flujoCambio').val(),
                    ajuste:$('#ajusteCambio').val(), 
                };
               
           
            formData.append('documento', $scope.File.documento);
            formData.append('formatoCambios', JSON.stringify(formatoCambios));
            formData.append('idArchivo', $scope.idArchivo);
            formData.append('cambios', $scope.File.cambios);
            formData.append('fecha', $("#fechaActualizacion").val());
            formData.append('version', (parseInt($scope.version) + (1)));
            formData.append('idDocumentoActual', $scope.idDocumentoActual);
            formData.append('id_funcionario', sessionStorage.id_usuario); 
            
            
            $http.post('http://localhost/sgc/public/api/archivos/nuevaVersion', formData, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).success(function(respuesta) {
                if (respuesta.request == "OK") {
                    swal("Buen Trabajo!", "" + respuesta.message + "", "success");
                    
                   $scope.direccionarProcesos(localStorage.procesoActual);
                } else {
                    sweetAlert("Oops...", "Hemos detectado un problema!", "error");
                }
            }); 
                 
             }
         }
           
        }

        }
        Date.prototype.toDateInputValue = (function() {
            var local = new Date(this);
            local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
            return local.toJSON().slice(0, 10);
        });
        
        
        $scope.verDocumento = function(url){
        $('#documento').html('<iframe id="descFrame" scrolling="auto" name="descFrame" src="'+url+'" width="100%" height="100%" frameborder="0"></iframe>');
    }
        
       $scope.cargarArchivos = function() {
          document.getElementById("loading").style.display="block";
            var item = "";
            var nombreRes = "";
            var nombreApro = "";
            
            list_archivo_maestro.length=0;
            
            $http.get('http://localhost/sgc/public/api/archivos').success(function(respuesta) {
            

                var cargos = JSON.parse(localStorage.getItem("cargos"));
                for (i = 0; i < respuesta.length; i++) {
                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsable == cargos[y].id) {
                            nombreRes = cargos[y].nombre;
                            break;
                        }
                    }

                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsableAprobacion == cargos[y].id) {
                            nombreApro = cargos[y].nombre;
                            break;
                        }
                    }

                    item = {archivo: respuesta[i], nombreResponsable: nombreRes, nombreResponsableApro: nombreApro}
                    list_archivo_maestro.push(item);

                    item = "";

                }
              document.getElementById("loading").style.display="none";
                $scope.listaArchivos_maestro = list_archivo_maestro;
            });
        };
    
       $scope.direccionarProcesos = function(id){
          
            localStorage.procesoActual = id;
            
            var item = "";
            var nombreRes = "";
            var nombreApro = "";
            
            list_archivo.length=0;
            $http.get('http://localhost/sgc/public/api/archivos/'+localStorage.procesoActual+'/proceso').success(function(respuesta) {
          
                var cargos = JSON.parse(localStorage.getItem("cargos"));
                for (i = 0; i < respuesta.length; i++) {
                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsable == cargos[y].id) {
                            nombreRes = cargos[y].nombre;
                            break;
                        }
                    }

                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsableAprobacion == cargos[y].id) {
                            nombreApro = cargos[y].nombre;
                            break;
                        }
                    }

                    item = {archivo: respuesta[i], nombreResponsable: nombreRes, nombreResponsableApro: nombreApro};
                 
                    list_archivo.push(item);

                    item = "";
                    
        

                }
             document.getElementById("loading").style.display="none";
                $rootScope.listaArchivos = list_archivo;
                
                
              
            });
        }
        
        $scope.getExternosByProceso = function (){
            
             var proceso = localStorage.procesoActual;
         
              var item = "";
            var nombreRes = "";
            var nombreApro = "";
            
            list_archivo_externo.length=0;
            $http.get('http://localhost/sgc/public/api/archivos/'+proceso+'/procesoExterno').success(function(respuesta) {

                 var cargos = JSON.parse(localStorage.getItem("cargos"));
                for (i = 0; i < respuesta.length; i++) {
                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsable == cargos[y].id) {
                            nombreRes = cargos[y].nombre;
                            break;
                        }
                    }

                    for (y = 0; y < cargos.length; y++) {
                        if (respuesta[i].responsableAprobacion == cargos[y].id) {
                            nombreApro = cargos[y].nombre;
                            break;
                        }
                    }

                    item = {archivo: respuesta[i], nombreResponsable: nombreRes, nombreResponsableApro: nombreApro};
                 
                    list_archivo_externo.push(item);

                    item = "";
                    
        

                }
           
                $scope.listaArchivosExternos = list_archivo_externo;
                
              
             
            });
        }
        
        $scope.visualizar = function() {  
         var files= document.getElementById('files').files;
         var file;
         var item = "";
         $("#lista").html("");
         for (i = 0; i<files.length; i++)
            {   
                file=files[i];
                archivos.push({'id':i,'file': file});
            }
            //cargando tabla
            for (i = 0; i<archivos.length; i++)
            {
                item = "<tr>" +
                        "<td>"+parseInt(i+1)+".</td>"+
                        '<td><input type="checkbox" id="externo'+i+'" onchange="angular.element(this).scope().validarExterno('+i+')" /><label for="externo'+i+'"></label></td>'+
                        "<td>" + archivos[i].file.name + "</td>" +
                        '<td>' +
                        '<select onchange="angular.element(this).scope().cargarSubprocesos(this.value,this.id)"  id="proceso' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>' +
                        '<td>' +
                        '<select  id="subproceso' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>' +
                        '<td>' +
                        '<select  id="documento' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>' +
                        "<td style='font-size:12px'>" + (archivos[i].file.size / (1024 * 1024)).toFixed(2) + " MG</td>" +
                        '<td>'+
                        '<input type="number"  value="1" disabled id="version'+ i +'" min="1" max="99"  required="required" title="Solo para documentos internos" onblur="validarPositivo(this.value,this.id)">'+
                        '</td>'+
                       '<td>'+
                        '<input type="date" id="fechaActualizacion'+ i +'" style="width:90%">'+
                        '</td>'+
                        '<td>'+
                         '<select  id="responsable' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>'+
                         '<td>'+
                         '<select  id="responsableAprobacion' + i + '" title="Solo para documentos internos" class="browser-default">' +
                        '</select>' +
                        '</td>'+
                        '<td><input type="text" id="ubicacion'+i+'" title="Solo para documentos externos" disabled style="background-color:#c3c3c3"></td>'+
                        '<td style="text-align:center">'+
                        '<a href="javascript:;" id="cambiosBtn'+i+'" onclick="angular.element(this).scope().modalCambios('+i+');"><i class="material-icons">message</i></a>'+
                        '<input type="hidden" id="cambios'+i+'" title="Solo para documentos internos" name="cambios'+i+'" value="Primera Emision">'+
                        '</td>'+
                        
                        '<td style="text-align:center">'+
                        
                        '<a href="javascript:;" id="cambiosFormatoBtn'+i+'" title="PLANIFICACIÓN CAMBIOS QUE AFECTAN SISTEMA DE GESTIÓN DE CALIDAD" onclick="angular.element(this).scope().modalFormatoCambios('+i+');"><i class="material-icons">assignment</i></a>'+
                        
                        '<input type="hidden" id="descripcionCambio'+i+'" name="descripcionCambio'+i+'" value="">'+
                        '<input type="hidden" id="razonesCambio'+i+'" name="razonesCambio'+i+'" value="">'+
                        '<input type="hidden" id="afectaCambio'+i+'" name="afectaCambio'+i+'" value="">'+
                        '<input type="hidden" id="necesidadesCambio'+i+'" name="necesidadesCambio'+i+'" value="">'+
                         '<input type="hidden" id="flujoCambio'+i+'" name="flujoCambio'+i+'" value="">'+
                          '<input type="hidden" id="ajusteCambio'+i+'" name="ajusteCambio'+i+'" value="">'+
                         
                        '</td>'+
                        
                        //'<td><p><input type="checkbox" id="externo'+i+'" /><label for="externo'+i+'"></label></p></td>'+
                        "</tr>";
                $("#lista").append(item);
                document.getElementById('fechaActualizacion'+ i ).value = new Date().toDateInputValue();
            }
           cargarProcesos();         
        }
        function cargarProcesos() {
            $http.get('http://localhost/sgc/public/api/procesos').success(function(respuesta) {
                var o = "";
                var option="";
                for (x = 0; x <archivos.length; x++)
                { 
                    document.getElementById("proceso" + x).innerHTML="";
                    var o = document.getElementById("proceso" + x);
                    for (i = 0; i < respuesta.length; i++) {
                        option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        o.add(option);
                    }
                }
                $scope.cargarSubprocesos(1, 0);
                cargarDocumentos();
                cargarCargos();
            });
        }     
        
         function cargarDocumentos() {
            $http.get('http://localhost/sgc/public/api/documentos').success(function(respuesta) {    
                var o = "";
                for (x = 0; x < archivos.length; x++)
                {
                    var o = document.getElementById("documento" + x);
                    for (i = 0; i < respuesta.length; i++) {
                        var option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        o.add(option);
                    }
                }
            });
        }
        
        function cargarCargos() {
            $http.get('http://www.appccvalledupar.co/timeit/public/api/cargos').success(function(respuesta) {
                var o = "";
                for (x = 0; x <archivos.length; x++)
                {               
                    document.getElementById("responsable" + x).innerHTML="";
                    document.getElementById("responsableAprobacion" + x).innerHTML="";
                    var o = document.getElementById("responsable" + x);
                    var p = document.getElementById("responsableAprobacion" + x);
                    for (i = 0; i < respuesta.length; i++) {
                        var option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        o.add(option);
                    }
                      for (i = 0; i < respuesta.length; i++) {
                          if(respuesta[i].id == 68 || respuesta[i].id == 9){
                        var option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        
                        p.add(option);
                        }
                    }
                }
            });
        }
        $scope.cargarSubprocesos = function(proceso, idSelect) {
            $http.get('http://localhost/sgc/public/api/subprocesos/proceso/' + proceso).success(function(respuesta) {
                if (respuesta == 0) {
                    if (idSelect != 0) {
                        idSelect = idSelect.replace(/\D/g, '');
                    }
                    Materialize.toast("No hay sub procesos para este proceso", '3000', 'rounded');
                    document.getElementById("subproceso" + idSelect).innerHTML = "";
                } else {
                    if (isNaN(idSelect) == false) {
                        document.getElementById("subproceso" + idSelect).innerHTML = "";                  
                        var o = "";
                        for (x = 0; x < archivos.length; x++)
                        {
                            var o = document.getElementById("subproceso" + x);
                            for (i = 0; i < respuesta.length; i++) {
                                var option = document.createElement("option");
                                option.text = respuesta[i].nombre;
                                option.value = respuesta[i].id;
                                o.add(option);
                            }
                        }
                    } else {
                        idSelect = idSelect.replace(/\D/g, '');
                        document.getElementById("subproceso" + idSelect).innerHTML = "";
                        var o = document.getElementById("subproceso" + idSelect);
                        for (i = 0; i < respuesta.length; i++)
                        {
                            var option = document.createElement("option");
                            option.text = respuesta[i].nombre;
                            option.value = respuesta[i].id;
                            o.add(option);
                        }
                    }
                }
            });
        }
        
          $scope.validarExterno= function(id) {
                if( $('#externo'+id).prop('checked') ) {
                    $('#version'+id).attr('disabled','disabled');
                     $('#version'+id).css('background-color','#c3c3c3');
                     $('#responsableAprobacion'+id).attr('disabled','disabled');
                     $('#responsableAprobacion'+id).css('background-color','#c3c3c3');
                     $('#cambiosBtn'+id).css('color','#fff');
                      $('#ubicacion'+id).css('background-color','#FFF');
                     $('#ubicacion'+id).removeAttr('disabled');
                }else{
                    $('#version'+id).removeAttr('disabled');
                     $('#version'+id).css('background-color','#FFFFFF');
                     $('#responsableAprobacion'+id).removeAttr('disabled');
                     $('#responsableAprobacion'+id).css('background-color','#FFFFFF');
                     $('#cambiosBtn'+id).css('color','#039BE5');
                     $('#ubicacion'+id).css('background-color','#c3c3c3');
                     $('#ubicacion'+id).attr('disabled','disabled');
                }
            }
            
            
   $scope.modalCambios = function(id){
       
       document.getElementById("nombreArchivo").innerHTML = archivos[id].file.name;
       document.getElementById("idCambio").value=id;
       document.getElementById("cambiosRealizados").value= document.getElementById("cambios"+id).value;
      $('#cambios').openModal();
    }
    
    $scope.modalFormatoCambiosNuevaVersion = function(id){
      $('#cambiosFormato').openModal();
    }
    
    $scope.modalFormatoCambios = function(id){
       
      document.getElementById("nombreArchivoFormato").innerHTML = archivos[id].file.name;
      document.getElementById("idCambioFormato").value=id;
      
      document.getElementById("descripcionCambio").value= document.getElementById("descripcionCambio"+id).value;
      document.getElementById("razonesCambio").value= document.getElementById("razonesCambio"+id).value;
      document.getElementById("afectaCambio").value= document.getElementById("afectaCambio"+id).value;
      document.getElementById("necesidadesCambio").value= document.getElementById("necesidadesCambio"+id).value;
      document.getElementById("flujoCambio").value= document.getElementById("flujoCambio"+id).value;
      document.getElementById("ajusteCambio").value= document.getElementById("ajusteCambio"+id).value;
      
      $('#cambiosFormato').openModal();
    }
    
    
    $scope.cargarTodo = function(){
        
        
        var proceso = "";
        var subproceso = "";
        var documento = "";
        var version="";
        var fechaActualizacion ="";
        var externo = "";
        var responsable="";
        var responsableAprobacion="";
        var cambio="";
        var formatoCambios="";
        var file;
        var ubicacion;
        var sapo = false;
        if(archivos.length==0){
            Materialize.toast("No existen Archivos para subir",1000,"rounded");
        }else{
            document.getElementById('subirArchivos').disabled=true;
             document.getElementById('loading').style.display="block";
             
             
      
           for(i=0; i < archivos.length; i++){
               
               if( document.getElementById("externo"+i).checked == false){
           
             if($("#version"+i).val().length < 1) {
                 Materialize.toast("Debe incluir la version del archivo "+parseInt(i+1),3000,"rounded");
                 document.getElementById('subirArchivos').disabled=false;
             document.getElementById('loading').style.display="none";
                sapo = true;
                return false;
             }
              if($("#cambios"+i).val().length < 1) {
                Materialize.toast("Debe registrar los cambio relizados a los archivos "+parseInt(i+1),3000,"rounded");
                 document.getElementById('subirArchivos').disabled=false;
             document.getElementById('loading').style.display="none";
                sapo = true;
                return false;
             }
                }else{
                    document.getElementById("responsableAprobacion"+i).value = 0;
                   if($("#ubicacion"+i).val().length < 1) {
                Materialize.toast("Debe registrar la ubucacion del archivo:  "+parseInt(i+1),3000,"rounded");
                 document.getElementById('subirArchivos').disabled=false;
             document.getElementById('loading').style.display="none";
                sapo = true;
                return false;
             } 
                }
                
                if($('input[id="descripcionCambio'+i+'"]').val() == "" || $('input[id="razonesCambio'+i+'"]').val() == ""
                    || $('input[id="afectaCambio'+i+'"]').val() == "" || $('input[id="necesidadesCambio'+i+'"]').val() == ""
                    || $('input[id="flujoCambio'+i+'"]').val() == ""
                    || $('input[id="ajusteCambio'+i+'"]').val() == "" ){
                 document.getElementById('subirArchivos').disabled=false;
             document.getElementById('loading').style.display="none";
                        Materialize.toast("Es necesario digilenciar el formato de cambios",2000,"rounded");
                        sapo = true;
                        return false;
                    }
           }
   
       
  
        if(sapo == false){    
	for(i=0; i < archivos.length; i++){
		file=archivos[i].file;
                proceso = document.getElementById("proceso"+i).value;
                subproceso = document.getElementById("subproceso"+i).value;
                documento = document.getElementById("documento"+i).value;
                version = document.getElementById("version"+i).value;
                fechaActualizacion = document.getElementById("fechaActualizacion"+i).value;
                externo = document.getElementById("externo"+i).checked;
                responsable = document.getElementById("responsable"+i).value;
                cambio = document.getElementById("cambios"+i).value;
                
                formatoCambios = {
                   descripcion:$('input[id="descripcionCambio'+i+'"]').val(),
                    razones:$('input[id="razonesCambio'+i+'"]').val(),
                    afecta:$('input[id="afectaCambio'+i+'"]').val(),
                    necesidades:$('input[id="necesidadesCambio'+i+'"]').val(),
                    flujo:$('input[id="flujoCambio'+i+'"]').val(),
                    ajuste:$('input[id="ajusteCambio'+i+'"]').val(), 
                };
               
               
                
                ubicacion = document.getElementById("ubicacion"+i).value;
                responsableAprobacion = document.getElementById("responsableAprobacion"+i).value;
                  
                 
                  
                todo.push({'id':i,'file': file,"proceso":proceso,"subproceso":subproceso,"documento":documento,"version":version,"fechaActualizacion":fechaActualizacion,"externo":externo,"responsable":responsable,"responsableAprobacion":responsableAprobacion,"ubicacion":ubicacion,"cambio":cambio,"formatoCambios":JSON.stringify(formatoCambios)});
                   
               }
               
              
         
        envios();
         }else{
             Materialize.toast("Por favor Digilenciar Campos",1000,"rounded");  
         }
    
         
            }
        
        
    }
    
    function envios(){
    var process;
    var subprocess;
    var documento;
    var version;
    var fechaActualizacion;
    var externo;
    var responsable;
    var responsableAprobacion;
    var cambio;
    var ubicacion;
    var formatoCambios;
    
	if(window.FormData){
        var formdata = new FormData();
    }
    if (todo.length > 0){// va siminuyendo la cantidad de datos     
        process = (todo[0].proceso);
        subprocess = (todo[0].subproceso);
        documento = (todo[0].documento);
        version = (todo[0].version);
        fechaActualizacion =(todo[0].fechaActualizacion);
        externo =(todo[0].externo);
        responsable =(todo[0].responsable);
        responsableAprobacion =(todo[0].responsableAprobacion);
        cambio =(todo[0].cambio);
        ubicacion =(todo[0].ubicacion); 
        formatoCambios =(todo[0].formatoCambios); 
  
console.log(formatoCambios);
  
       var proceso = todo.shift(), f=proceso.file;
       formdata.append('file',f);
       formdata.append('proceso',process);
       formdata.append('subproceso',subprocess);
       formdata.append('documento',documento);
       formdata.append('version',version);
       formdata.append('fechaActualizacion',fechaActualizacion);
       formdata.append('externo',externo);
       formdata.append('responsable',responsable);
       formdata.append('responsableAprobacion',responsableAprobacion);
       formdata.append('cambio',cambio);
       formdata.append('ubicacion',ubicacion);
       formdata.append('formatoCambios',formatoCambios);
       formdata.append('id_usuario',sessionStorage.id_usuario);
     
   envioDatos(formdata);
   
    }else{
        document.getElementById('subirArchivos').disabled=false;
        document.getElementById('loading').style.display="none";
    swal("Buen Trabajo!", "Archivos Subidos correctamente!", "success")    
    $("#lista").html("");
         archivos.length=0;
    document.getElementById('files').value="";
    }
}
function envioDatos(ar){
   $.ajax({
    url: "upload.php",
    type: "POST",
    dataType: "html",
    data:ar,
    cache: false,
    contentType: false,
    processData: false
})
    .done(function(res){
        var  respuesta  = eval("(" + res + ")");    
if(respuesta[0].respuesta=="KO"){
    $("#lista").html("");
    document.getElementById('files').value="";
    todo.length=0;
document.getElementById('subirArchivos').disabled=false;
 document.getElementById('loading').style.display="none";
     swal("Oops algo anda mal!", "Hubo un problema al subir el archivo \n\
    "+respuesta[0].nombre, "error");
         archivos.length=0;
}else if(respuesta[0].respuesta=="OK"){
    Materialize.toast("Subido Correctamente: "+respuesta[0].nombre,'3000','rounded');
    envios();
}
    });
}
        
      
    }]);



