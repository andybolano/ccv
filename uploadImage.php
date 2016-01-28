<?php
 try {

$target_path = "img/ausencia/";
$nombreImagen = basename($_FILES['file']['name']);
             
    $link = mysql_connect("107.180.21.19", "timeit", "qaz123") or die ("ERROR AL CONECTAR"); 
    $db_select = mysql_select_db("timeit")or die ("ERROR AL SELECCIONAR DB"); 
     
    $q = "SELECT MAX(id) AS id FROM ausencia"; 
    $result = mysql_query($q, $link) or die ("Error al consultar"); 
    
    
    while ($row = mysql_fetch_assoc($result)) { 
      $nombreImagen   = $row["id"]; 
    } 
               
    

      $nombreImagen = $nombreImagen.".jpg";

     
$target_path = $target_path . $nombreImagen;
 if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) { 
 echo "El archivo ". basename( $_FILES['file']['name']). " ha sido subido";
} else{
echo "Ha ocurrido un error";
}


} catch (Exception $exc) {
 echo 'Error de aplicacion: ' . $exc->getMessage();
 }
?>