$(function () {
    $('.navbar').css('position', 'absolute');
    $('li[name="drugAdd_tag "]').on('click', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="drugList_tag "]').removeClass('active');
        }
    })
    $('li[name="drugList_tag "]').on('click', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="drugAdd_tag "]').removeClass('active');
        }
    })

    $('#SCDate').datetimepicker({
        format: 'MM/DD/YYYY',
        locale: moment.locale('en-gb')
    });

    if ($("#drugType")) {
        let select = document.getElementById('drugType');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value == $('#lab_drugType').html()) {
                select.options[i].selected = true;
                break;
            }
        }
    }

    if ($("#drugType1")) {
        let select = document.getElementById('drugType1');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value == $('#lab_drugType1').html()) {
                select.options[i].selected = true;
                break;
            }
        }
    }

    if ($("#drugUnit")) {
        let select = document.getElementById('drugUnit');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value == $('#lab_drugUnit').html()) {
                select.options[i].selected = true;
                break;
            }
        }
    }

    $("#btnExport").click(function () {
        bootbox.confirm({
            size: "small",
            message: "Are you sure you want to export the data?",
            callback: function (result) {
                if (result) {
                    var num = document.getElementById("drugInfoList").rows.length;
                    $.post('/drugInfo/export', {
                        "drugName": $('#drugName').val(),
                        "drugType": $('#drugType option:selected').val(),
                        "rowCount": num
                    }, function (data) {
                        if (data.message == "ok") {
                            toastr.success("Export success");
                        } else {
                            toastr.error("Export failed");
                        }
                    });
                }
            }
        })
    });
    $("#btnImport").click(function () {
        bootbox.dialog({
            title: "Import Data",
            message: $('#importBox').html(),
            buttons: {
                cancel: {
                    label: "Close",
                    className: 'btn-danger',
                    callback: function () {
                    }
                },
            }
        });
    });
})

function confirmx(obj, id) {
    bootbox.confirm({
        size: "small",
        message: "Are you sure?",
        callback: function (result) {
            if (result) {
                $.post('/drugInfo/delete', {
                    "id": id
                }, function (data) {
                    if (data > 0) {
                        $(obj).parent().parent().remove();
                        toastr.success("Delete success");
                    } else {
                        toastr.error("Delete failed");
                    }
                });
            }
        }
    })
}
var fileName = "";

function changeName(e){
    fileName = e.currentTarget.files[0].name;
}

function fileCheck(){
    if(fileName=="" || fileName.indexOf(".xls") < 0){
        toastr.error("Please select file or file format error");
        return false;
    }
    return true;
}