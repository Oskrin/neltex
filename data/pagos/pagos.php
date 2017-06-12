<?php 
//inclucion de librerias
include '../conexion.php';
include '../funciones_generales.php';
include '../correos/mail.php';
error_reporting(0);

// include '../correos/prueba.php';
$conexion = conectarse();
date_default_timezone_set('America/Guayaquil');
$fecha = date('Y-m-d H:i:s', time());
$fecha_larga = date('His', time());
$sql = "";
$sql2 = "";	
$sql3 = "";
$sql4 = "";
$id_session = sesion_activa();///datos session

// guardar pagos
pg_query("insert into tabla_pagos values('$id1','".$_POST['txt_0']."', '".$_POST['fecha_actual']."','".$_POST['hora_actual']."','".$_POST['txt_7']."','".$_POST['observaciones']."','Activo','$fecha')");
// fin

// registrar libro diario
$id_libro  = unique($fecha_larga);

// $sql_libro = "insert into libro_diario values ('".$id_libro."','".$fecha."','".$arreglo5[$i]."','','11501155240ac39d2f0','Tabla Pagos Cobrar','Cobro en efectivo del documento'.$arreglo1[1])";///caja
// $guardar = guardarSql($conexion,$sql_libro);

$id_libro  = unique($fecha_larga);
$sql_libro = "insert into libro_diario values ('".$id_libro."','".$fecha."','".$_POST['txt_7']."','','11501155240ac39f4e6','Tabla Pagos Nómina','Cuentas por pagar')";///cuentas por cobrar
$guardar = guardarSql($conexion,$sql_libro);	
// fin


$data = 0; /// error al guardar

echo $data;
?>