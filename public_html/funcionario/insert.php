<?php

foreach ($_FILES as $key) {
   
    
    $id = $_POST['id'];
    
    $servername = "107.180.21.19";
    $username = "timeit";
    $password = "qaz123";
    $dbname = "timeit";
    
    $respuesta = array();
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
  
        $permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png");
        $limite_kb = 16384;

        if (in_array($key['type'], $permitidos) && $key['size'] <= $limite_kb * 1024) {

            // Archivo temporal
            $imagen_temporal = $key['tmp_name'];

            // Tipo de archivo
            $tipo = $key['type'];

            // Leemos el contenido del archivo temporal en binario.
            $data = file_get_contents($imagen_temporal);

            //Podríamos utilizar también la siguiente instrucción en lugar de las 3 anteriores.
            // $data=file_get_contents($imagen_temporal);
            // Escapamos los caracteres para que se puedan almacenar en la base de datos correctamente.
            $data = mysql_real_escape_string($data);
          
            
            $sql = "UPDATE empleados SET foto = '$data' WHERE id= '$id'";
            if ($conn->query($sql) === TRUE) {
                $respuesta = array('message' => "Foto Actualizada con exito");
             
            } else {
                $respuesta = array('message' => "Ocurrio un error al actualizar foto");
               
            }
        } else {
            $respuesta = array('message' => "Formato de archivo no permitido o excede el tamaño límite de $limite_kb Kbytes.");
        
        }
    
        $conn->close();
    echo '' . json_encode($respuesta) . '';
}


?>