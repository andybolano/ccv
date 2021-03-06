app.service("permisosService", function ($http) {  
   this.getAll = function () {
        var req = $http.get(uri+'/api/permisos');
        return req;
    };
    this.post = function (object){
         var req = $http.post(uri+'/api/permisos',object);
        return req;
    }
    
    this.listadoPermisos = function (){
        var req = $http.get(uri+'/api/permiso/getAll');
        return req;
    }
    
    this.update = function(object){
        var req = $http.put(uri+'/api/permiso/update', object);
        return req;
    }
    
    this.getNuevasSolicitudes= function(){
        var req = $http.get(uri+'/api/permiso/nuevasSolicitudes');
        return req;
    }
    
    this.getSolicitudesByArea = function(area){
		var req = $http.get(uri+'/api/permisos/solicitudes/areas/'+area);
		return req;
	}


 this.updateFuncionario = function(object){
       var req = $http.post(uri+'/api/permiso/updateMovil',object);
        return req;
    };
    

    
    
    
});

