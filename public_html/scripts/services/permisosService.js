app.service("permisosService", function ($http) {  
   this.getAll = function () {
        var req = $http.get(uri+'/api/permisos');
        return req;
    };
    this.post = function (object){
        console.log(object)
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
});

