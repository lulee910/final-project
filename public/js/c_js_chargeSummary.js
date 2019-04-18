$(function () {
    $('#startDate').datetimepicker({
        format: 'DD/MM/YYYY',
       locale: moment.locale('en-gb')
    });

    $('#endDate').datetimepicker({
        format: 'DD/MM/YYYY',
       locale: moment.locale('en-gb')
    });

});
function page(n,s){
    $("#pageNo").val(n);
    $("#pageSize").val(s);
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