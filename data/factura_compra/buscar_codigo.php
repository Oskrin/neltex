<?php
    session_start();
    include '../conexion.php';
    conectarse();
    $texto = $_GET['term'];
    
    $consulta = pg_query("SELECT * FROM productos P, porcentaje_iva I WHERE P.id_porcentaje_iva = I.id_iva AND P.estado = 'Si' AND P.codigo like '%$texto%'");

    while ($row = pg_fetch_row($consulta)) {
        $data[] = array(
            'id_productos' => $row[0],
            'value' => $row[1],
            'codigo_barras' => $row[2],
            'producto' => $row[3],
            'precio' => $row[4],
            'descuento' => $row[27],
            'stock' => $row[10],
            'iva_producto' => $row[30],
            'inventar' => $row[15],
            'incluye' => $row[26]
        );
    }

    echo $data = json_encode($data);
?>
