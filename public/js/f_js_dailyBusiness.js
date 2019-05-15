$(function(){
    $('#startDate').datetimepicker({
        format: 'MM/DD/YYYY',
       locale: moment.locale('en-gb')
    });

    $('#endDate').datetimepicker({
        format: 'MM/DD/YYYY',
       locale: moment.locale('en-gb')
    });
})


