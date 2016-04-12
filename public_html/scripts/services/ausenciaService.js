app.service("ausenciaService", function ($http) {  
  
   
    this.post= function (data) {
        var req = $http.get(uri+'/api/ausencia',data);
        return req;
    };
    
    this.get= function () {
        var req = $http.get(uri+'/api/ausencia');
        return req;
    };
    
    this.getbyEmpleado= function (id) {
        var req = $http.get(uri+'/api/ausencia/empleado/'+id);
        return req;
    };
    
    this.post_web= function (formData) {
        var req = $http.post(uri+'/api/ausencia/web',formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
    };

});

