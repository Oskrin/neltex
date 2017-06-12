<?php include('../menu/index.php'); 
include '../conexion.php';
$conexion = conectarse();
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		
		<link rel="shortcut icon" href="../../dist/images/logo.fw.png">
		<title>Inicio - <?php empresa(); ?></title>

		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="../../dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="../../dist/css/font-awesome.min.css" />
		<!-- Select -->
		<link rel="stylesheet" href="../../dist/css/chosen.min.css" />				
		<link rel="stylesheet" href="../../dist/css/ui.jqgrid.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/datepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/fontdc.css" />
		<link rel="stylesheet" href="../../dist/css/jquery-ui.custom.min.css" type="text/css"/>
		<link rel="stylesheet" href="../../dist/css/jquery.gritter.min.css" />
		<link rel="stylesheet" href="../../dist/css/style.css"  />

		<!-- ace styles -->
		<link rel="stylesheet" href="../../dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
        <link type="text/css" rel="stylesheet" id="ace-skins-stylesheet" href="../../dist/css/ace-skins.min.css">
        <link type="text/css" rel="stylesheet" id="ace-rtl-stylesheet" href="../../dist/css/ace-rtl.min.css">
        <script src="../../dist/js/ace-extra.min.js"></script>
	</head>

	<body class="skin-2">
		<?php menu_arriba(); ?>
		<div class="main-container" id="main-container">
			<?php menu_lateral(); ?>
			 <div class="main-content">
				<div class="main-content-inner">
					<div class="breadcrumbs" id="breadcrumbs">
                        <script type="text/javascript">
                            try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
                        </script>
                        <ul class="breadcrumb">
                            <li>
                                <i class="ace-icon fa fa-home home-icon"></i>
                                <a href="../inicio/">Inicio</a>
                            </li>
                            <li class="active">Procesos</li>
                            <li class="active">Pagos Nómina</li>
                        </ul>
                    </div>
                    
					<div class="page-content">
						<div class="row">						
							<div class="col-xs-12 col-sm-12 widget-container-col">
								<div class="widget-box">
									<div class="widget-header">
										<h5 class="widget-title">Pagos Nómina</h5>
										<div class="widget-toolbar">
											<a href="#" data-action="fullscreen" class="orange2">
												<i class="ace-icon fa fa-expand"></i>
											</a>
											<a href="#" data-action="reload">
												<i class="ace-icon fa fa-refresh"></i>
											</a>
										</div>
									</div>									
									<div class="widget-body">
										<div class="widget-main">
											<div class="row">
												<form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_pagosVenta">	
													<div class="row">
														<div class="col-md-12 pull-right">
															<div class="col-md-4">
																<label class="col-sm-4 control-label" for="fecha_actual">Fecha Actual:</label>
																<div class="col-sm-8">
																	<div class="input-group">
																		<input class="form-control date-picker" id="fecha_actual" name="fecha_actual" type="text" readonly data-date-format="yyyy-mm-dd" />
																		<span class="input-group-addon">
																			<i class="fa fa-calendar bigger-110"></i>
																		</span>
																	</div>
																</div>
															</div>

															<div class="col-md-4">
																<label class="col-sm-4 control-label" for="hora_actual">Hora Actual:</label>
																<div class="col-sm-8">
																	<div class="input-group">
																		<input class="form-control" type="text" id="hora_actual" name="hora_actual"  readonly />
																		<span class="input-group-addon">
																			<i class="fa fa-clock-o bigger-110"></i>
																		</span>
																	</div>
																</div>
															</div>

															<div class="col-md-4">
																<span class="bigger-120">
																	<span class="red bolder">Responsable:</span>
																	<span ><?php print($_SESSION['nombrescompletosdow']); ?></span>
																</span>
															</div>
														</div>
													</div>
															
													<div class="row">
														<div class="col-md-12">
															<div class="hr hr-18 dotted hr-double"></div>
														</div>
													</div>

													<div class="row">	
														<div class="col-md-12">
															<div class="col-md-4">																		
																<div class="form-group">
																	<label class="col-sm-4 control-label" for="txt_3">Nombres Empleado: </label>
																	<div class="col-sm-8">
																		<input type="text" id="txt_3" name="txt_3" class="form-control" readonly data-toggle="tooltip"  value="" /> 
																		<input type="hidden" id="txt_0" name="txt_0" />
																	</div>																													
																</div>																												
															</div>

															<div class="col-md-4">																		
																<div class="form-group">
																	<label class="col-sm-4 control-label" for="txt_4">Teléfono:</label>
																	<div class="col-sm-8">
																	    <input type="text" id="txt_4" name="txt_4" class="form-control" readonly data-toggle="tooltip"  value="" /> 
																	</div>																													
																</div>																												
															</div>

															<div class="col-md-4">																		
																<div class="form-group">
																	<label class="col-sm-4 control-label" for="txt_12">Dirección:</label>
																	<div class="col-sm-8">
																		<input type="text" id="txt_12" name="txt_12" class="form-control" readonly data-toggle="tooltip"  value="" /> 
																	</div>																													
																</div>																												
															</div>

															<div class="col-md-4">																		
																<div class="form-group">
																	<label class="col-sm-4 control-label" for="txt_7">Pagar Neto: </label>
																	<div class="col-sm-8">
																		<input type="text" id="txt_7" name="txt_7" class="form-control" data-toggle="tooltip"  value="" /> 
																	</div>																													
																</div>																												
															</div>

															<div class="col-md-4">
																<div class="form-group">
																	<label class="col-sm-4 control-label" for="observaciones"> Observaciones: </label>
																	<div class="col-sm-8">	
																		<textarea id="observaciones" name="observaciones" placeholder="" class="col-sm-12"></textarea>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div class="row">
														<div class="col-md-12">
															<div class="hr hr-18 dotted hr-double"></div>
														</div>
													</div>
												</form>

												<div class="row">
													<div class="center">
														<button data-toggle="modal" href="#myModal" type="button" id="btn_3" class="btn btn-primary">
															<i class="ace-icon fa fa-floppy-o bigger-120 write"></i>
															Buscar Pagos
														</button>													 
														<button type="button" class="btn btn-primary" id="btn_0">
															<i class="ace-icon fa fa-floppy-o bigger-120 write"></i>
															Guardar Pagos
														</button>
														<button type="button" id="btn_1" class="btn btn-primary">
															<i class="ace-icon fa fa-file-o bigger-120 write"></i>
															Limpiar
														</button>
														<button type="button" id="btn_2" class="btn btn-primary">
															<i class="ace-icon fa fa-refresh bigger-120 write"></i>
															Actualizar
														</button>
													</div>
												</div>

												<!-- Modal -->
												<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
												    <div class="modal-dialog">
												        <div class="modal-content">
													        <div class="modal-header">
													          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
													          <h4 class="modal-title">BUSCAR NÓMINA</h4>
													        </div>

													        <div class="modal-body">
													            <table id="table"></table>
																<div id="pager"></div>
													        </div>
													        <div class="modal-footer">
													          <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
													        </div>
												        </div><!-- /.modal-content -->
												    </div><!-- /.modal-dialog -->
												</div><!-- /.modal -->
											</div>
										</div>
									</div>
								</div>
							</div>							
						</div>
					</div>
				</div>
			</div><!-- /.main-content -->

			<?php footer(); ?>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->

		<!-- Modal -->
		<div id="top-menu" class="modal aside" data-fixed="true" data-placement="top" data-background="true" data-backdrop="invisible" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body container">
						<div class="row">
							<div class="col-sm-5 col-sm-offset-1 white">
								<h3 class="lighter">Imprimir &amp; PAGO</h3>
							</div>

							<div class="col-sm-5 text-center line-height-2">									
								&nbsp; &nbsp;
								<a class="btn btn-app btn-light no-radius" href="#">
									<i class="ace-icon fa fa-print bigger-230"></i>
									Imprimir
								</a>
							</div>
						</div>
					</div>
				</div>
				<button class="btn btn-inverse btn-app btn-xs ace-settings-btn aside-trigger" data-target="#top-menu" data-toggle="modal" type="button">
					<i data-icon="fa-chevron-down" data-icon="fa-chevron-up" class="ace-icon fa fa-chevron-down bigger-110 icon-only"></i>
				</button>
			</div>
		</div>

		<script type="text/javascript">
			window.jQuery || document.write("<script src='../../dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>

		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../../dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		
		<script src="../../dist/js/bootstrap.min.js"></script>

		<script src="../../dist/js/jquery-ui.min.js"></script>
		<script src="../../dist/js/jquery.ui.touch-punch.min.js"></script>
		<script src="../../dist/js/jquery.easypiechart.min.js"></script>
		<script src="../../dist/js/jquery.sparkline.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.pie.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.resize.min.js"></script>
		<script src="../../dist/js/chosen.jquery.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-datepicker.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-timepicker.min.js"></script>
		<script src="../../dist/js/date-time/daterangepicker.min.js"></script>
		<script src="../../dist/js/date-time/moment.min.js"></script>
				
		<!-- ace scripts -->
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>
		<script src="../../dist/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../dist/js/jqGrid/i18n/grid.locale-en.js"></script>
        <script src="../../dist/js/jquery.maskedinput.min.js"></script>
        <script src="../../dist/js/jquery.bootstrap-duallistbox.min.js"></script>
        <script src="../../dist/js/jquery.raty.min.js"></script>
        <script src="../../dist/js/select2.min.js"></script>
        <script src="../../dist/js/bootstrap-multiselect.min.js"></script>
		
		<script src="../generales.js"></script>
		<script src="pagos.js"></script>
		<script src="../../dist/js/validCampoFranz.js" ></script>
		<script src="../../dist/js/jquery.gritter.min.js"></script>
		<script src="../../dist/js/ventana_reporte.js" type="text/javascript"></script>
	</body>
</html> 