<?php
	ini_set('memory_limit', '2048M');
	include_once('phpexcel/PHPExcel-1.7.7/Classes/PHPExcel/IOFactory.php');

	$extension = explode(".", $_FILES["archivo_excel"]["name"]);

	$extension = end($extension);
	$type = $_FILES["archivo_excel"]["type"];
	$tmp_name = $_FILES["archivo_excel"]["tmp_name"];
	$size = $_FILES["archivo_excel"]["size"];
	$nombre = basename($_FILES["archivo_excel"]["name"], "." . $extension);

	$nombreTemp = $nombre . '.' . $extension;
	// if(move_uploaded_file($_FILES["archivo_excel"]["tmp_name"], "temp/" . $nombreTemp)) {
	// 	$data = 1;
	// } else {
	// 	$data = 0;
	// }
	// if($data == 1) {	
		//cargamos el archivo_excel que deseamos leer
		$objPHPExcel = PHPExcel_IOFactory::load('temp/'.$nombreTemp);
		$objHoja = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
		$cont = 0;
		foreach ($objHoja as $iIndice=>$objCelda) {
			if($cont >= 3) {
				// $lista[] = $objCelda['A'];
				// $lista[] = $objCelda['B'];
				// $lista[] = $objCelda['C'];
				// $lista[] = $objCelda['D'];
				// $lista[] = $objCelda['E'];
				$lista[] = $objCelda['F'];
				// $lista[] = $objCelda['G'];
				// $lista[] = $objCelda['H'];
				// $lista[] = $objCelda['I'];
				// $lista[] = $objCelda['J'];
				// $lista[] = $objCelda['K'];
				// $lista[] = $objCelda['L'];
                // $lista[] = $objCelda['M'];
                // $lista[] = $objCelda['N'];
                // $lista[] = $objCelda['O'];
                // $lista[] = $objCelda['P'];
                // $lista[] = $objCelda['Q'];
                // $lista[] = $objCelda['R'];
                // $lista[] = $objCelda['S'];
                // $lista[] = $objCelda['T'];
                // $lista[] = $objCelda['U'];
                // $lista[] = $objCelda['V'];
                // $lista[] = $objCelda['W'];
			}
			$cont++;
		}	
	// }
	echo $lista = json_encode($lista);
?>