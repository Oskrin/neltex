$(document).on("ready",inicio);
function inicio (){	
	/*funcion inicial de la imagen y  buscadores del select no topar plz*/	
	// $('#txt_4').mask('(999) 999-999');
	// $('#txt_5').mask('(999) 999-9999');
	$('.chosen-select').chosen({allow_single_deselect:true}); 
	$(window)
	.off('resize.chosen')
	.on('resize.chosen', function() {
		$('.chosen-select').each(function() {
			 var $this = $(this);
			 $this.next().css({'width': $this.parent().width()});
		})
	}).trigger('resize.chosen');
	//resize chosen on sidebar collapse/expand
	$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
		if(event_name != 'sidebar_collapsed') return;
		$('.chosen-select').each(function() {
			 var $this = $(this);
			 $this.next().css({'width': $this.parent().width()});
		})
	});
	// stilo select2
	$(".select2").css({
	    'width': '100%',
	    allow_single_deselect: true,
	    no_results_text: "No se encontraron resultados",
	    allowClear: true,
	});
	// fin

	// agregar pais
	$('#btn_guardar_pais').on('click', function() {
		$.ajax({
		    url: "clientes.php",
		    data: {guardar_pais:'guardar_pais', txt_pais: $("#txt_pais").val()}, 	    	    	    
		    type: "POST",				
		    success: function(data) {	    	
		    	if(data == 2) {	
		    		$("#txt_9").html("");
		    		$("#txt_10").html("");
		    		$("#txt_11").html("");
		    		$("#cmb_pais").html("");
		    		$("#cmb_pais2").html("");	        		
		    		alert('Datos Agregados Correctamente');
		    		$("#txt_pais").val("");
		    		$('#modal_pais').modal('hide');
		    		carga_ubicaciones("txt_9","txt_10","txt_11");//pais provincia ciudad 
		    		carga_ubicaciones("cmb_pais");
		    		carga_ubicaciones("cmb_pais2");    		
		    	} else {
		    		if( data == 1 ) {	    		
		    			alert('El País ya existe. Ingrese otra');
		    			$("#txt_pais").val("");
		    			$("#txt_pais").focus();
		    		}
		    	}
			}		
		});
	});
	// fin

	// agregar provincia
	$('#btn_guardar_provincia').on('click', function() {
		$.ajax({
		    url: "clientes.php",
		    data: {guardar_provincia:'guardar_provincia', txt_provincia: $("#txt_provincia").val(), id: $("#cmb_pais").val()}, 	    	    	    
		    type: "POST",				
		    success: function(data) {	    	
		    	if(data == 2) {
		    		$("#txt_9").html("");
		    		$("#txt_10").html("");
		    		$("#txt_11").html("");  
		    		$("#cmb_pais2").html("");
		    		$("#cmb_provincia").html("");  		
		    		alert('Datos Agregados Correctamente');
		    		$("#txt_provincia").val("");
		    		$('#modal_provincia').modal('hide');
		    		carga_ubicaciones("txt_9","txt_10","txt_11");//pais provincia ciudad
					carga_ubicaciones("cmb_pais2","cmb_provincia");   	    		
		    	} else {
		    		if(data == 1) {	    		
		    			alert('La Provincia ya existe. Ingrese otra');
		    			$("#txt_provincia").val("");
		    			$("#txt_provincia").focus();
		    		}
		    	}
			},		
		});
	});
	// fin

	// agregar ciudad
	$('#btn_guardar_ciudad').on('click', function() {
		$.ajax({
		    url: "clientes.php",
		    data: {guardar_ciudad:'guardar_ciudad', txt_ciudad: $("#txt_ciudad").val(), id: $("#cmb_provincia").val()}, 	    	    	    
		    type: "POST",				
		    success: function(data) {	    	
		    	if(data == 2) {  
		    		$("#txt_9").html("");
		    		$("#txt_10").html("");
		    		$("#txt_11").html("");
		    		$("#cmb_pais2").html("");
		    		$("#cmb_provincia").html(""); 	 		
		    		alert('Datos Agregados Correctamente');
		    		$("#txt_ciudad").val("");
		    		$('#modal_ciudad').modal('hide');
		    		carga_ubicaciones("txt_9","txt_10","txt_11");//pais provincia ciudad
					carga_ubicaciones("cmb_pais2","cmb_provincia");	    		
		    	} else {
		    		if(data == 1) {	    		
		    			alert('La Ciudad ya existe. Ingrese otra');
		    			$("#txt_ciudad").val("");
		    			$("#txt_ciudad").focus();
		    		}
		    	}
			},		
		});
	});
	// fin

	carga_ubicaciones("cmb_pais");
	carga_ubicaciones("cmb_pais2","cmb_provincia");

	$("#cmb_pais2").change(function() {
		change_pais("cmb_pais2","cmb_provincia");
	});

	$("#txt_1").change(function() {
		documentos("0");
	});

	$("#txt_2").keyup(function() {
		ci_ruc_pass("txt_2",$("#txt_2").val(),$("#txt_1").val());
	});

	carga_ubicaciones("txt_9","txt_10","txt_11");//pais provincia ciudad

	$("#txt_9").change(function() {
		change_pais("txt_9","txt_10","txt_11");
	});

	$("#txt_10").change(function() {
		change_provincia("txt_9","txt_10","txt_11");
	});

	// funcion validar solo numeros
	function ValidNum() {
	    if (event.keyCode < 48 || event.keyCode > 57) {
	        event.returnValue = false;
	    }
	    return true;
	}
	// fin

	function soloLetras(e) {
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial) {
            return false;
        }
    }
    
    /*procesos de guardar buscar modificar limpiar actualizar*/ 
    $("#txt_2").keypress(ValidNum);
	$("#txt_3").keypress(soloLetras);   		
	$("#btn_0").on("click",guardar_clientes);
	$("#btn_1").on("click",limpiar_form);
	$("#btn_2").on("click",actualizar_form);
	
	$("#btn_4").on("click", function() {		
		var resp = "";		
		resp =atras($("#txt_0").val(),"clientes","secuencia.php");		
		if(resp[0] != false) {
			$("#txt_0").val(resp[0][0]);
			$("#txt_1").val(resp[0][1]);
			$("#txt_1").trigger("chosen:updated"); 
			$("#txt_2").val(resp[0][2]);
			$("#txt_3").val(resp[0][3]);
			$("#txt_8").val(resp[0][4]);		
			$("#txt_8").trigger("chosen:updated"); 
			$("#txt_4").val(resp[0][5]);		
			$("#txt_5").val(resp[0][6]);								
			$("#txt_12").val(resp[0][9]);					
			$("#txt_13").val(resp[0][11]);		
			$("#txt_7").val(resp[0][12]);		
			$("#txt_6").val(resp[0][10]);		
		    documentos("1");

	        var prov = 0;
	        var pais = 0;
	        $.ajax({
		        type: "POST",		        
		        url: "../carga_ubicaciones.php?tipo=0&id="+resp[0][7]+"&fun=5",        
		        success: function(response) {         
		        	prov = response;
		        	$.ajax({
				        type: "POST",			        
				        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=6",        
				        success: function(response) {         
				        	pais = response;						        	

						    $.ajax({        
						        type: "POST",
						        dataType: 'json',        
						        url: "../carga_ubicaciones.php?tipo=0&id=0&fun=1",        
						        success: function(response) {         			        	
						        	$("#txt_9").html("");
						            for (var i = 0; i < response.length; i=i+2) {            				            	
						            	if(response[i] == pais) {
											$("#txt_9").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
						            	} else {
											$("#txt_9").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
										}
						            }   
						            $("#txt_9").trigger("chosen:updated"); 

						            $.ajax({        
								        type: "POST",
								        dataType: 'json',        
								        url: "../carga_ubicaciones.php?tipo=0&id="+pais+"&fun=2",        
								        success: function(response) {         			        	
								        	$("#txt_10").html("");
								            for (var i = 0; i < response.length; i=i+2) {            				            	
								            	if(response[i] == prov) {
													$("#txt_10").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
								            	} else {
													$("#txt_10").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
												}
								            }   
								            $("#txt_10").trigger("chosen:updated");

								            $.ajax({        
										        type: "POST",
										        dataType: 'json',        
										        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=3",        
										        success: function(response) {         			        	
										        	$("#txt_11").html("");
										            for (var i = 0; i < response.length; i=i+2) {            				            	
										            	if(response[i] == resp[0][7]){
															$("#txt_11").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
										            	} else {
															$("#txt_11").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
														}
										            }   
										            $("#txt_11").trigger("chosen:updated");                               
										        }
										    });                               
								        }
								    });		                            
						        }
						    });						    
				        }                   
				    });
		        }                   
		    });	
		} else {
			alert("Sin registros anteriores");
		}				    	            
	    $("#btn_0").text("");
	    $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     	            
	});

	$("#btn_5").on("click",function () {		
		var resp = "";		
		resp =adelante($("#txt_0").val(),"clientes","secuencia.php");		
		if(resp[0] != false) {
			$("#txt_0").val(resp[0][0]);
			$("#txt_1").val(resp[0][1]);
			$("#txt_1").trigger("chosen:updated"); 
			$("#txt_2").val(resp[0][2]);
			$("#txt_3").val(resp[0][3]);
			$("#txt_8").val(resp[0][4]);		
			$("#txt_8").trigger("chosen:updated"); 
			$("#txt_4").val(resp[0][5]);		
			$("#txt_5").val(resp[0][6]);								
			$("#txt_12").val(resp[0][9]);					
			$("#txt_6").val(resp[0][10]);		
			$("#txt_13").val(resp[0][11]);		
			$("#txt_7").val(resp[0][12]);		
		    documentos("1");
		    
	        var prov = 0;
	        var pais = 0;
	        $.ajax({
		        type: "POST",		        
		        url: "../carga_ubicaciones.php?tipo=0&id="+resp[0][7]+"&fun=5",        
		        success: function(response) {         
		        	prov = response;
		        	$.ajax({
				        type: "POST",			        
				        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=6",        
				        success: function(response) {         
				        	pais = response;						        	
	
						    $.ajax({        
						        type: "POST",
						        dataType: 'json',        
						        url: "../carga_ubicaciones.php?tipo=0&id=0&fun=1",        
						        success: function(response) {         			        	
						        	$("#txt_9").html("");
						            for (var i = 0; i < response.length; i=i+2) {            				            	
						            	if(response[i] == pais) {
											$("#txt_9").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
						            	} else {
											$("#txt_9").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
										}
						            }   
						            $("#txt_9").trigger("chosen:updated"); 

						            $.ajax({        
								        type: "POST",
								        dataType: 'json',        
								        url: "../carga_ubicaciones.php?tipo=0&id="+pais+"&fun=2",        
								        success: function(response) {         			        	
								        	$("#txt_10").html("");
								            for (var i = 0; i < response.length; i=i+2) {            				            	
								            	if(response[i] == prov) {
													$("#txt_10").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
								            	} else {
													$("#txt_10").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
												}
								            }   
								            $("#txt_10").trigger("chosen:updated"); 

								            $.ajax({        
										        type: "POST",
										        dataType: 'json',        
										        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=3",        
										        success: function(response) {         			        	
										        	$("#txt_11").html("");
										            for (var i = 0; i < response.length; i=i+2) {            				            	
										            	if(response[i] == resp[0][7]){
															$("#txt_11").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
										            	} else {
															$("#txt_11").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
														}
										            }   
										            $("#txt_11").trigger("chosen:updated");                               
										        }
										    });                                
								        }
								    });	                            
						        }
						    });							    
				        }                   
				    });
		        }                   
		    });	
		} else {
			alert("Sin registros superiores");
		}				    	            
	    $("#btn_0").text("");
	    $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");
	});
    /*------*/
    jQuery(function($) {
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {
	        //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());	        
	        $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
	        
	    })
	    //cambiar el tamaño de la barra lateral collapse/expand
	    var parent_column = $(grid_selector).closest('[class*="col-"]');
	    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	            setTimeout(function() {
	                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
	            }, 0);
	        }
	    })

	    jQuery(grid_selector).jqGrid({	        
	        datatype: "xml",
	        url: 'xml_cliente.php',        
	        colNames: ['ID','DOCUMENTO','CI','NOMBRES','TIPO CLIENTE','TELÉFONO','CELULAR','id_ciudad','CIUDAD','DIRECCIÓN','CORREO','COMENTARIO','CUPO CRÉDITO'],
	        colModel:[      
	            {name:'txt_0',index:'id_cliente',frozen:true,align:'left',search:false},
	            {name:'txt_1',index:'tipo_documento',frozen : true,align:'left',search:true},
	            {name:'txt_2',index:'identificacion',frozen : true,align:'left',search:true},
	            {name:'txt_3',index:'nombres_completos',frozen : true,align:'left',search:false},
	            {name:'txt_8',index:'tipo',frozen : true,align:'left',search:false},
	            {name:'txt_4',index:'telefono1',frozen : true,align:'left',search:false},            
	            {name:'txt_5',index:'telefono2',frozen : true,align:'left',search:false},
				{name:'txt_11',index:'id_ciudad',frozen : true,align:'left',search:false},	            
	            {name:'descripcion',index:'descripcion',frozen : true,align:'left',search:false},
	            {name:'txt_12',index:'direccion',frozen : true,align:'left',search:false},
	            {name:'txt_6',index:'correo',frozen : true,align:'left',search:true},
	            {name:'txt_13',index:'comentario',frozen : true,align:'left',search:false},
	            {name:'txt_7',index:'cupo_credito',frozen : true,align:'left',search:false},
	        ],          
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:200,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id_cliente',
	        sortorder: 'asc',
	        caption: 'LISTA DE CLIENTES',	        
	        altRows: true,
	        multiselect: false,
	        multiboxonly: true,
	        viewrecords : true,
	        loadComplete : function() {
	            var table = this;
	            setTimeout(function(){
	                styleCheckbox(table);
	                updateActionIcons(table);
	                updatePagerIcons(table);
	                enableTooltips(table);
	            }, 0);
	        },
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);       	            
	            $("#txt_0").val(ret.txt_0);
	            $("#txt_1").val(ret.txt_1);
	            $("#txt_2").val(ret.txt_2);
	            $("#txt_3").val(ret.txt_3);
	            $("#txt_4").val(ret.txt_4);	            
	            $("#txt_5").val(ret.txt_5);
	            $("#txt_6").val(ret.txt_6);
	            $("#txt_7").val(ret.txt_7);
	            $("#txt_8").val(ret.txt_8);	            
	            $("#txt_12").val(ret.txt_12);
	            $("#txt_13").val(ret.txt_13);	
	            $("#txt_1").trigger("chosen:updated");  
	            documentos("1");           	            

	            var prov = 0;
	            var pais = 0;
	            $.ajax({
			        type: "POST",			        
			        url: "../carga_ubicaciones.php?tipo=0&id="+ret.txt_11+"&fun=5",        
			        success: function(response) {         
			        	prov = response;
			        	$.ajax({
					        type: "POST",			        
					        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=6",        
					        success: function(response) {         
					        	pais = response;
							    $.ajax({        
							        type: "POST",
							        dataType: 'json',        
							        url: "../carga_ubicaciones.php?tipo=0&id=0&fun=1",        
							        success: function(response) {         			        	
							        	$("#txt_9").html("");
							            for (var i = 0; i < response.length; i=i+2) {            				            	
							            	if(response[i] == pais) {
												$("#txt_9").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
							            	} else {
												$("#txt_9").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
											}
							            }   
							            $("#txt_9").trigger("chosen:updated"); 

							            $.ajax({        
									        type: "POST",
									        dataType: 'json',        
									        url: "../carga_ubicaciones.php?tipo=0&id="+pais+"&fun=2",        
									        success: function(response) {         			        	
									        	$("#txt_10").html("");
									            for (var i = 0; i < response.length; i=i+2) {            				            	
									            	if(response[i] == prov) {
														$("#txt_10").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
									            	} else {
														$("#txt_10").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
													}
									            }   
									            $("#txt_10").trigger("chosen:updated"); 

									            $.ajax({        
											        type: "POST",
											        dataType: 'json',        
											        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=3",        
											        success: function(response) {         			        	
											        	$("#txt_11").html("");
											            for (var i = 0; i < response.length; i=i+2) {            				            	
											            	if(response[i] == ret.txt_11) {
																$("#txt_11").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
											            	} else {
																$("#txt_11").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
															}
											            }   
											            $("#txt_11").trigger("chosen:updated");                               
											        }
											    });	                               
									        }
									    });	                            
							        }
							    });						    
					        }                   
					    });
			        }                   
			    });			    	            
	            /**/
	            $('#myModal').modal('hide'); 
	            $("#btn_0").text("");
	            $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     	            
	        },
	        
	        caption: "LISTA CLIENTES"
	    });

		jQuery(grid_selector).jqGrid('hideCol', "txt_0");
		jQuery(grid_selector).jqGrid('hideCol', "txt_11");		

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   
	    //navButtons
	    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
	    {   //navbar options
	        edit: false,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon : 'ace-icon fa fa-plus-circle purple',
	        del: false,
	        delicon : 'ace-icon fa fa-trash-o red',
	        search: true,
	        searchicon : 'ace-icon fa fa-search orange',
	        refresh: true,
	        refreshicon : 'ace-icon fa fa-refresh green',
	        view: true,
	        viewicon : 'ace-icon fa fa-search-plus grey'
	    },
	    {	        
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        //new record form
	        //width: 700,
	        closeAfterAdd: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        //delete record form
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            if(form.data('styled')) return false;
	                
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_delete_form(form);
	                
	            form.data('styled', true);
	        },
	        onClick : function(e) {
	            //alert(1);
	        }
	    },
	    {
	          recreateForm: true,
	        afterShowSearch: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	            style_search_form(form);
	        },
	        afterRedraw: function(){
	            style_search_filters($(this));
	        }
	        ,
	        //multipleSearch: true
	        overlay: false,
	        sopt: ['eq', 'cn'],
            defaultSearch: 'eq',            	       
	      },
	    {
	        //view record form
	        recreateForm: true,
	        beforeShowForm: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	        }
	    })	    
	    function style_edit_form(form) {
	        //enable datepicker on "sdate" field and switches for "stock" field
	        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
	        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
	                
	        //update buttons classes
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
	        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
	        
	        buttons = form.next().find('.navButton a');
	        buttons.find('.ui-icon').hide();
	        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
	        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
	    }

	    function style_delete_form(form) {
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
	        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
	    }
	    
	    function style_search_filters(form) {
	        form.find('.delete-rule').val('X');
	        form.find('.add-rule').addClass('btn btn-xs btn-primary');
	        form.find('.add-group').addClass('btn btn-xs btn-success');
	        form.find('.delete-group').addClass('btn btn-xs btn-danger');
	    }
	    function style_search_form(form) {
	        var dialog = form.closest('.ui-jqdialog');
	        var buttons = dialog.find('.EditTable')
	        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
	        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
	        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
	    }
	    
	    function beforeDeleteCallback(e) {
	        var form = $(e[0]);
	        if(form.data('styled')) return false;
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_delete_form(form);
	        
	        form.data('styled', true);
	    }
	    
	    function beforeEditCallback(e) {
	        var form = $(e[0]);
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_edit_form(form);
	    }

	    function styleCheckbox(table) {}
	    
	    function updateActionIcons(table) {}
	    
	    function updatePagerIcons(table) {
	        var replacement = 
	            {
	            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
	            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
	            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
	            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	        };
	        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
	            var icon = $(this);
	            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	            
	            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	        })
	    }

	    function enableTooltips(table) {
	        $('.navtable .ui-pg-button').tooltip({container:'body'});
	        $(table).find('.ui-pg-div').tooltip({container:'body'});
	    }

	    $(document).one('ajaxloadstart.page', function(e) {
	        $(grid_selector).jqGrid('GridUnload');
	        $('.ui-jqdialog').remove();
	    });
	}); 
}
/*Formularios Clientes*/
function guardar_clientes() {
	var valores = $("#form_cliente").serialize();
	var texto = ($("#btn_0").text()).trim();

	if($("#txt_2").val() == "") {
		alert('Campo Requerido');
		$("#txt_2").focus();
	} else {
		if($("#txt_3").val() == "") {
			alert('Campo Requerido');
			$("#txt_3").focus();
		} else {
			if($("#txt_12").val() == "") {
				alert('Campo Requerido');
				$("#txt_12").focus();
			} else {
				if(texto == "Guardar") {
					datos_clientes(valores,"g");
				} else {
					datos_clientes(valores,"m");	
				}
			}	
		}
	}
}
// fin

function datos_clientes(valores,tipo,p) {	
	$.ajax({				
		type: "POST",
		data: valores+"&tipo="+tipo,
		url: "clientes.php",			
	    success: function(data) {	
	    	if(data == 0) {			
	    		alert('Datos Agregados Correctamente');	
	    		actualizar_form();							
	    	} else {
	    		if(data == 1) {
	    			alert('Este nro de ' +$("#txt_1").val()+  ' ya existe ingrese otro');	
	    			$("#txt_2").val("");
	    			$("#txt_2").focus();	    			
	    		} else {
	    			alert("Error al momento de enviar los datos la página se recargara");	    			
	    			actualizar_form();
	    		}
	    	}
		}
	}); 
}

