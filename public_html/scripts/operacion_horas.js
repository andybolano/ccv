/*
 * 
 * DESARROLLADO POR
 * INGENIERO: ANDY YAIR BOLAÑO CASTILLA
 * EMAIL: andyyairb@gmail.com  
 * CEL:3106440539
 * 
 */

function padNmb(nStr, nLen){ 
var sRes = String(nStr); 
var sCeros = "0000000000"; 
return sCeros.substr(0, nLen - sRes.length) + sRes; 
} 

function secondsToTime(secs){ 
var hor = Math.floor(secs / 3600); 
var min = Math.floor((secs - (hor * 3600)) / 60); 
return padNmb(hor, 2) + ":" + padNmb(min, 2); 
} 

function substractTimes(t1,t2){ 

var secs1 = stringToSeconds(t1); 
var secs2 = stringToSeconds(t2);
var secsDif = secs1 - secs2; 

return secondsToTime(secsDif); 
}  

function stringToSeconds(tiempo){ 
var sep1 = tiempo.indexOf(":"); 
var sep2 = tiempo.lastIndexOf(":"); 

var hor = tiempo.substr(0, sep1); 
var min = tiempo.substr(sep1 + 1, sep2); 
return ((Number(min) * 60) + (Number(hor) * 3600)); 
}   


function prepararHora(hora){

    if(hora.length == 2){
        hora = "00:"+hora;
        return hora;
    }else if(hora.length == 1){
        hora = "00:0"+hora;
        return hora;
    }else{
    if(hora.length == 3){
    hora = "0"+hora;
    }

    var porcionHora = hora.substring(0,2);
    var porcionMinutos = hora.substring(2,4);
    hora = porcionHora+":"+porcionMinutos;
    return hora;
    }
}



function calcularTotalRetrasos(retrasos){
    var tiempo;
    var seg;
    var total = 0;
    for(i=0; i<retrasos.length; i++){
     seg = stringToSeconds(retrasos[i]); 
     total = seg +total;
    }
    return secondsToTime(total); 
}