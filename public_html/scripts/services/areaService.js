app.service("areaService", function ($http) {  
  
    
    this.getAll = function () {
        var req = $http.get(uri+'/api/area/getAll');
        return req;
    };
    
     this.getJefe = function (area) {
        var req = $http.get(uri+'/api/area/getJefe/'+area);
        return req;
    };
    

    
    
});