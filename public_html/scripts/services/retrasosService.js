app.service("retrasosService", function ($http) {  
  
    this.get= function (empleado, mes) {
     
        var req = $http.get(uri+'/api/empleado/entradaSalidaGlobal/'+empleado+'/mes/'+mes);
        return req;
    };
    
  


});


