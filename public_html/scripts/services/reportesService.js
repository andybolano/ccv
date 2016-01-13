app.service("reportesService", function ($http) {  
  
       this.getByArea = function (area,fecha){
        var req = $http.get(uri+'/api/area/'+area+'/empleados/'+fecha);
         return req;
    }
    

    

    
});