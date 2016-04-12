app.service("empleadoService", function ($http) { 
    
     this.getTotalPuntaje = function(empleado){
          var req = $http.get(uri+'/empleado/puntaje/'+empleado);
        return req;
    };
    
     this.getAll = function(){
          var req = $http.get(uri+'/api/empleado');
        return req;
    };
    
     this.getTop = function(){
          var req = $http.get(uri+'/api/empleados/puntajes');
        return req;
    };
     this.getNoTop = function(){
          var req = $http.get(uri+'/api/empleados/noTopPuntajes');
        return req;
    };
    
    
   this.getById = function(empleado){
          var req = $http.get(uri+'/api/empleado/'+empleado);
        return req;
    };
    
    
    this.getByArea = function(area){
         var req = $http.get(uri+'/api/empleado/area/'+area);
        return req;
    };
    
    this.getEntradaSalida = function(empleado,fecha){

        var req = $http.get(uri+'/api/empleado/entradaSalida/'+empleado+'/'+fecha);
       
        return req;
    };
    this.getTotalPuntaje = function(empleado){
          var req = $http.get(uri+'/api/empleado/puntaje/'+empleado);
        return req;
    };
    
    this.getPermisos = function(empleado){
        var req = $http.get(uri+'/api/empleado/permisos/'+empleado);
        return req;
    }
    
    this.getEsByMes = function (empleado,mes){
        var req = $http.get(uri+'/api/empleado/entradaSalida/'+empleado+'/mes/'+mes);
        return req;
    }
    
    this.getRetrasoDia = function(object){
        var req = $http.post(uri+'/api/empleado/retrasoDia',object);
        return req;
    }

    
});