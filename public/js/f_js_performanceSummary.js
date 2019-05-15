$(function(){
    $('#startDate').datetimepicker({
        format: 'MM/DD/YYYY',
       locale: moment.locale('en-gb')
    });

    $('#endDate').datetimepicker({
        format: 'MM/DD/YYYY',
       locale: moment.locale('en-gb')
    });

    $("#contentTable").mergeCell({
        cols:[0,3]
    });

    if($("#firstDoc")){
        let select = document.getElementById('firstDoc');  
        for (let i = 0; i < select.options.length; i++){  
            if (select.options[i].value == $('#lab_firstDoc').html()){  
                select.options[i].selected = true;  
                break;  
            }  
        }
     }

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

})


