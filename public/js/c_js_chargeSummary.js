$(function () {

    $('#startDate').datetimepicker({
        format: 'MM/DD/YYYY',
       locale: moment.locale('en-gb')
    });

    $('#endDate').datetimepicker({
        format: 'MM/DD/YYYY',
       locale: moment.locale('en-gb')
    });

    $("#treeTable").treeTable({expandLevel : 1});

    $('form').submit(function () {
        let startDate = $('#startDate').val();
        let endDate = $('#endDate').val();
        if(startDate !="" && endDate==""){
            $('#endDate').focus();
            toastr.error("Please input endDate");
            return false;
        }
        if(startDate =="" && endDate !=""){
            $('#startDate').focus();
            toastr.error("Please input startDate");
            return false;
        }
        return true;
     });
     
     if($("#methodType")){
        var methodType = document.getElementById("methodType");  
        for (let i = 0; i < methodType.options.length; i++){  
            if (methodType.options[i].value == $('#lab_methodType').html()){  
                methodType.options[i].selected = true;  
                break;  
            }  
        }  
     }
   
     if($("#firstDoc")){
        let select = document.getElementById('firstDoc');  
        for (let i = 0; i < select.options.length; i++){  
            if (select.options[i].value == $('#lab_firstDoc').html()){  
                select.options[i].selected = true;  
                break;  
            }  
        }
     }

     if($("#Arrears")){
        let select = document.getElementById('Arrears');  
        for (let i = 0; i < select.options.length; i++){  
            if (select.options[i].value == $('#lab_Arrears').html()){  
                select.options[i].selected = true;  
                break;  
            }  
        }
     }

     if($("#pagination")){
        var pagecount = $('#pagecount').html();;
        if(pagecount=="") pagecount =0;
        var pagesize = 10;
        var currentpage = parseInt($('#pageNo').val());
        var counts,pagehtml="";
        if(pagecount%pagesize==0){
            counts = parseInt(pagecount/pagesize);
        }else{
            counts = parseInt(pagecount/pagesize)+1;
        }
        if(pagecount<=pagesize){pagehtml="";}
        if(pagecount>pagesize){
            if(currentpage>1){
                pagehtml+= '<li><a href="javascript:void(0);" onclick="page('+(currentpage-1)+') "><<</a></li>';
            }
            for(var i=0;i<counts;i++){
                if(i>=(currentpage-3) && i<(currentpage+3)){
                    if(i==currentpage-1){
                        pagehtml+= '<li class="active"><a href="javascript:void(0);" onclick="page('+(i+1)+') ">'+(i+1)+'</a></li>';
                    }else{
                        pagehtml+= '<li><a href="javascript:void(0);" onclick="page('+(i+1)+') ">'+(i+1)+'</a></li>';
                    }
                    
                }
            }
            if(currentpage<counts){
                pagehtml+= '<li><a href="javascript:void(0);" onclick="page('+(currentpage+1)+') ">>></a></li>';
            }
        }
        $("#pagination").html(pagehtml);
    }
});


function page(n){
    $("#pageNo").val(n);
    $("#searchForm").submit();
    return false;
}

function treeTableTrtoggle(id){
	var visible = $("tr." + id).is(":visible");
	$("tr.active").removeClass("active");
	$("#"+id).addClass("active");
	if(visible){
		$("tr." + id).hide();
		$("#"+id).find("span.default_active_node").removeClass("default_open").addClass("default_last_shut");
	}else{
		$("tr." + id).show();
		$("#"+id).find("span.default_active_node").removeClass("default_last_shut").addClass("default_open");
    }
}

function confirmx(obj,id){
    bootbox.confirm({ 
        size: "small",
        message: "Are you sure?",
        callback: function(result){ 
            if(result){
                $.post('/chargeSummary/delete', {
                    "_id": id
                }, function (data) {
                    if(data !=null){
                        $(obj).parent().parent().remove();
                        $('#t_total').html(parseFloat($('#t_total').html()) - data.numFee);
                        $('#t_received').html(parseFloat($('#t_received').html()) - data.inFee);
                        $('#t_owemoney').html(parseFloat($('#t_owemoney').html()) - data.owemoney);
                        toastr.success("Delete success");
                    }else{
                        toastr.error("Delete failed");
                    }
                });
            } 
        }
    })
}