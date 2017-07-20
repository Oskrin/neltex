<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
    $fecha = date('Y-m-d H:i:s', time()); 
    $fecha_larga = date('His', time()); 
	$sql = "";		
	$id_user = sesion_activa();	
	$id = unique($fecha_larga);		
	
	if($_POST['tipo'] == "g") {
		// $repetidos = repetidos_1($conexion,"identificacion",strtoupper($_POST["txt_2"]),"empleado","g","","","tipo_documento","$_POST[txt_1]");	
		// 	if( $repetidos == 'true') {
		// 		$data = 1; /// este dato ya existe;
		// 	} else {				
				$sql = "insert into empleado values ('$id','$_POST[txt_2]','$_POST[txt_3]','$_POST[txt_4]','$_POST[txt_5]','$_POST[txt_11]','$_POST[txt_12]','$_POST[txt_6]','$_POST[txt_13]','$_POST[txt_7]','0','$id_user','$fecha')";			
				$guardar = guardarSql($conexion,$sql);
				
				if( $guardar == 'true') {
					$data = 0; ////datos guardados
				} else {
					$data = 2; /// error al guardar
			}
		// }			
	} else {
		if($_POST['tipo'] == "m") {					
				$sql = "update empleado set identificacion='$_POST[txt_2]',nombres_completos='$_POST[txt_3]',telefono1='$_POST[txt_4]',telefono2='$_POST[txt_5]',ciudad='$_POST[txt_11]',direccion='$_POST[txt_12]',correo='$_POST[txt_6]',comentario='$_POST[txt_13]',sueldo='$_POST[txt_7]', id_usuario='$id_user' where id_empleado='$_POST[txt_0]'";
				$guardar = guardarSql($conexion,$sql);

				if( $guardar == 'true') {
					$data = 0; ////datos modificados
				} else {
					$data = 2; /// error al guardar
				}				
		}

	}

	echo $data;

	if (isset($_POST['guardar_pais'])) {
		$repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['txt_pais']), "pais", "g", "", "");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql = "insert into pais values ('$id','" . strtoupper($_POST['txt_pais']) . "')";
            $guardar = guardarSql($conexion, $sql);

            $data = "2";
        }

        echo $data;	
	}

	if (isset($_POST['guardar_provincia'])) {
		$repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['txt_provincia']), "provincia", "g", "", "");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql = "insert into provincia values ('$id','" . strtoupper($_POST['txt_provincia']) . "', '".$_POST['id']."')";
            $guardar = guardarSql($conexion, $sql);

            $data = "2";
        }

        echo $data;	
	}

	if (isset($_POST['guardar_ciudad'])) {
		$repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['txt_ciudad']), "ciudad", "g", "", "");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql = "insert into ciudad values ('$id','" . strtoupper($_POST['txt_ciudad']) . "', '".$_POST['id']."')";
            $guardar = guardarSql($conexion, $sql);

            $data = "2";
        }

        echo $data;	
	}
?>