<?php 
    include '../conexion.php';
    include '../funciones_generales.php';
    include '../correos/mail.php';
    error_reporting(0);

    $conexion = conectarse();
    date_default_timezone_set('America/Guayaquil');
    $fecha = date('Y-m-d H:i:s', time());
    $fecha_larga = date('His', time());
    $sql = "";
    $sql2 = "";	
    $sql3 = "";
    $sql4 = "";
    $id_session = sesion_activa();///datos session

    // modificar pagos
    $consulta = pg_query("SELECT * FROM detalle_pagos_venta WHERE id_detalles_pagos_venta = '$_POST[id]'");
    while ($row = pg_fetch_row($consulta)) {
        $id_pagos_venta = $row[1];
        $monto = $row[4];

        $consulta2 = pg_query("SELECT * FROM pagos_venta WHERE id_pagos_venta = '$id_pagos_venta'");
        while ($row = pg_fetch_row($consulta2)) {
            $saldo = $row[8];

            $cal = $row[8] - $monto;
            $format_numero = number_format($cal, 2, '.', '');
            if ($format_numero == '0.00') {
               pg_query("Update pagos_venta Set saldo='" . $format_numero . "', estado = 'Cancelado' where id_pagos_venta='" . $id_pagos_venta . "'");
               pg_query("Update detalle_pagos_venta Set estado ='Cancelado' where id_detalles_pagos_venta='" . $_POST['id'] . "'");
            } else {
                pg_query("Update pagos_venta Set saldo='" . $format_numero . "' where id_pagos_venta='" . $id_pagos_venta . "'");
                pg_query("Update detalle_pagos_venta Set estado ='Cancelado' where id_detalles_pagos_venta='" . $_POST['id'] . "'");
            }
        }
    }
    // fin

    $data = $_POST['id']; /// error al guardar

    echo $data;
?>