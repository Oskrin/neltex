$(document).on("ready",inicio);

function recargar() {
  setTimeout(function() {
    location.reload();
  }, 1000);  
}


function guardar_pago() {

  if($("#txt_0").val() == ""){
       alert("Seleccione un registro en nómina");
    } else {
        $.ajax({
            type: "POST",
            url: "pagos.php",
            data: $("#form_pagosVenta").serialize(),
            success: function(data) {
                var val = data;
                if (val == 0) {
                    $.gritter.add({
                      title: 'Información Mensaje',
                      text: ' <span class="fa fa-shield"></span>' + ' ' +'Pago Guardado correctamente <span class="text-succes fa fa-spinner fa-spin"></span>'
                          ,
                      sticky: false,
                      time: 1000,                       
                    });
                    recargar(); 
                }
            }
        }); 
    }
}

function inicio (){	
  show();

  // tooltips 
    $('[data-rel=tooltip]').tooltip();

    // seclect chosen 
    $('.chosen-select').chosen({
        allow_single_deselect:true,
        no_results_text:'No encontrado'     
    });
    
    $(document).one('ajaxloadstart.page', function(e) {
        //in ajax mode, remove before leaving page
        $('.modal.aside').remove();
        $(window).off('.aside')
    });

    // modal
      $('.modal.aside').ace_aside();
      $('#aside-inside-modal').addClass('aside').ace_aside({container: '#my-modal > .modal-dialog'});

    // formato calendario
      $('.date-picker').datepicker({
        autoclose: true,
        showOtherMonths: true,
        format:'yyyy-mm-dd',
        startView:0   
      }).datepicker('setDate', 'today');

 	////////////////validaciones/////////////////
 	$("#valor_pagado").on("keypress",punto);

/*-----guardar factura compra--*/
  $("#btn_0").on("click", guardar_pago);

// tabla pagos
jQuery("#list").jqGrid({          
datatype: "local",
colNames: ['', 'ID', 'Factura a Pagar', 'Fecha Factura', 'Monto Total', 'Valor a Pagar', 'Saldo'],
colModel:[ 
    {name: 'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions',
          formatoptions: {keys: false, delbutton: true, editbutton: false}
      },     
    {name: 'id_pagos_venta', index: 'id_pagos_venta', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center',frozen: true, width: 50},
    {name: 'num_factura', index: 'num_factura', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center',frozen: true, width: 150},
    {name: 'fecha_factura', index: 'fecha_factura', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 150},
    {name: 'totalcxc', index: 'totalcxc', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 70},
    {name: 'valor_pagado', index: 'valor_pagado', editable: false, search: false, frozen: true, editrules: {required: true}, align: 'center', width: 110, editoptions:{maxlength: 10, size:15,dataInit: function(elem){$(elem).bind("keypress", function(e) {return punto(e)})}}}, 
    {name: 'saldo', index: 'saldo', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 90},
  ],          
  rowNum: 10,       
  width: null,
  shrinkToFit: false,
  sortable: true,
  rowList: [10,20,30],
  pager: jQuery('#pager'),        
  sortorder: 'asc',
  viewrecords : true,
  cellEdit: true,
  shrinkToFit: true,
  delOptions: {
    modal: true,
    jqModal: true,
    onclickSubmit: function(rp_ge, rowid) {
        var id = jQuery("#list").jqGrid('getGridParam', 'selrow');
        jQuery('#list').jqGrid('restoreRow', id);
        var ret = jQuery("#list").jqGrid('getRowData', id);

         var su = jQuery("#list").jqGrid('delRowData', rowid);
         if (su === true) {
         rp_ge.processing = true;
         $(".ui-icon-closethick").trigger('click'); 
         }
      return true;
      },
    processing: true
}
});

// /busqueda facturas a cobrar
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
          url: 'xml_nomina.php',        
          colNames: ['ID','IDENTIFICACIÓN','NOMBRES','TELÉFONO','CELULAR','id_ciudad','CIUDAD','DIRECCIÓN','CORREO','COMENTARIO','SUELDO'],
          colModel:[      
              {name:'txt_0',index:'id_nomina',frozen:true,align:'left',search:false},
              {name:'txt_2',index:'identificacion',frozen : true,align:'left',search:true},
              {name:'txt_3',index:'nombres_completos',frozen : true,align:'left',search:false},
              {name:'txt_4',index:'telefono1',frozen : true,align:'left',search:false},            
              {name:'txt_5',index:'telefono2',frozen : true,align:'left',search:false},
              {name:'txt_11',index:'id_ciudad',frozen : true,align:'left',search:false},              
              {name:'descripcion',index:'descripcion',frozen : true,align:'left',search:false},
              {name:'txt_12',index:'direccion',frozen : true,align:'left',search:false},
              {name:'txt_6',index:'correo',frozen : true,align:'left',search:true},
              {name:'txt_13',index:'comentario',frozen : true,align:'left',search:false},
              {name:'txt_7',index:'sueldo',frozen : true,align:'left',search:false},
          ],          
          rowNum: 10,       
          width:600,
          shrinkToFit: false,
          height:200,
          rowList: [10,20,30],
          pager: pager_selector,        
          sortname: 'id_nomina',
          sortorder: 'asc',
          caption: 'LISTA NÓMINA',          
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
              $("#txt_2").val(ret.txt_2);
              $("#txt_3").val(ret.txt_3);
              $("#txt_4").val(ret.txt_4);             
              $("#txt_5").val(ret.txt_5);
              $("#txt_6").val(ret.txt_6);
              $("#txt_7").val(ret.txt_7);
              $("#txt_12").val(ret.txt_12);
              $("#txt_13").val(ret.txt_13);                         
              /**/
              $('#myModal').modal('hide');                  
          },
          
          caption: "LISTA NÓMINA"
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

      function styleCheckbox(table) { }
      
      function updateActionIcons(table) { }
      
      //replace icons with FontAwesome icons like above
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


jQuery(window).bind('resize', function () {
jQuery("#list").setGridWidth(jQuery('#grid_container').width(), true);
}).trigger('resize');

}