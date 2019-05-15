$(function(){
    $('.navbar').css('position', 'absolute');
    $('li[name="drugAdd_tag "]').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="drugList_tag "]').removeClass('active');
        }
    })
    $('li[name="drugList_tag "]').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="drugAdd_tag "]').removeClass('active');
        }
    })

    $('#SCDate').datetimepicker({
        format: 'MM/DD/YYYY',
       locale: moment.locale('en-gb')
    });

    if($("#drugType")){
        let select = document.getElementById('drugType');  
        for (let i = 0; i < select.options.length; i++){  
            if (select.options[i].value == $('#lab_drugType').html()){  
                select.options[i].selected = true;  
                break;  
            }  
        }
     }

     if($("#drugType1")){
        let select = document.getElementById('drugType1');  
        for (let i = 0; i < select.options.length; i++){  
            if (select.options[i].value == $('#lab_drugType1').html()){  
                select.options[i].selected = true;  
                break;  
            }  
        }
     }

     if($("#drugUnit")){
        let select = document.getElementById('drugUnit');  
        for (let i = 0; i < select.options.length; i++){  
            if (select.options[i].value == $('#lab_drugUnit').html()){  
                select.options[i].selected = true;  
                break;  
            }  
        }
     }

     $("#btnExport").click(function(){
        bootbox.confirm({ 
            size: "small",
            message: "Are you sure you want to export the data?",
            callback: function(result){ 
                if(result){
                    $.post('/chargeSummary/delete', {
                        "_id": id
                    }, function (data) {
                        if(data !=null){
                            toastr.success("Delete success");
                        }else{
                            toastr.error("Delete failed");
                        }
                    });
                } 
            }
        })
    });
    $("#btnImport").click(function(){
        $.jBox($("#importBox").html(), {title:"导入数据", buttons:{"关闭":true}, 
            bottomText:"导入文件不能超过5M，仅允许导入“xls”或“xlsx”格式文件！"});
    });












})

function confirmx(obj,id){
    bootbox.confirm({ 
        size: "small",
        message: "Are you sure?",
        callback: function(result){ 
            if(result){
                $.post('/drugInfo/delete', {
                    "id": id
                }, function (data) {
                    if(data > 0){
                        $(obj).parent().parent().remove();
                        toastr.success("Delete success");
                    }else{
                        toastr.error("Delete failed");
                    }
                });
            } 
        }
    })
}

