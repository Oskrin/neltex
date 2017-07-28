<?php
	if (isset($_POST['cargar_mes'])) {
		setlocale(LC_TIME, 'spanish');
		$mes = date("m"); // Mes actual
 		$nombre = strftime("%B",mktime(0, 0, 0, $mes, 1, 2000)); 
		// echo strtoupper($nombre);
		print '<option value="'.strtoupper($nombre).'">'.strtoupper($nombre).'</option>';	
	} 
	

	
	//return $nombre;

?>