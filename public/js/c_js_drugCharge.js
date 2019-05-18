function delRow(obj, chargesId, feeId, allNum, drugesId) {
    bootbox.confirm({
        size: "small",
        message: "Are you sure?",
        callback: function (result) {
            if (result) {
                $(obj).parent().parent().remove();
                numFee();
            }
        }
    })
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

function submit() {
    toastr.error("An error has occurred. Please check it");
}

$(function () {

    $("#tel").keyup(function(e) {
        var phoneNum = this.value;
            if (!/^[\d|-]*$/.test(phoneNum) || phoneNum.length > 13) {
                this.value = phoneNum.substring(0, phoneNum.length - 1);
            }
            if (/^[0-1]*$/.test(phoneNum) && phoneNum.length ==1) {
                this.value = phoneNum.substring(0, phoneNum.length - 1);
            }
            var checkPhoneNum = /^[2-9][0-9][0-9]\d+$/;
            if (checkPhoneNum.test(phoneNum) && phoneNum.length == 4) {
                this.value = phoneNum.substring(0, 3) + "-" +phoneNum.substring(3, phoneNum.length);
                return ;
            }
            checkPhoneNum = /^[2-9][0-9][0-9]-\d{4}$/;
            if (checkPhoneNum.test(phoneNum) && phoneNum.length == 8) {
                this.value = phoneNum.substring(0, 7) + "-" + phoneNum.substring(7, phoneNum.length);
                return ;
            }
            checkPhoneNum = /^[2-9][0-9][0-9]-\d{3}-\d{4}$/;
            if (checkPhoneNum.test(phoneNum) && phoneNum.length == 14) {
                this.value = phoneNum.replace(/-/g, '');
                return ;
            }
        });

    function addRow(list, idx, tpl, row) {
        var source = $("#hjFeeInfoTpl").html();
        var template = Handlebars.compile(source);
        var context = { row: row, idx: idx };
        var html = template(context);
        $(list).append(html);
        $(list + idx).find("select").each(function () {
            $(this).val($(this).attr("data-value"));
        });
        $(list + idx).find("input[type='checkbox'], input[type='radio']").each(function () {
            var ss = $(this).attr("data-value").split(',');
            for (var i = 0; i < ss.length; i++) {
                if ($(this).val() == ss[i]) {
                    $(this).attr("checked", "checked");
                }
            }
        });
    }

    function checkInfo() {
        $('#name').parent().removeClass("has-error");
        $('#feeDate').parent().removeClass("has-error");
        $('#tel').parent().removeClass("has-error");
        if ($("#name").val() == '') {
            $('#name').parent().addClass("has-error");
            $('#name').focus();
            return false;
        }
        if ($("#feeDate").val() == '') {
            $('#feeDate').parent().addClass("has-error");
            $('#feeDate').focus();
            return false;
        }
        if ($("#tel").val() == '') {
            $('#tel').parent().addClass("has-error");
            $('#tel').focus();
            return false;
        }
        var num = document.getElementById("hjFeeInfoList").rows.length;
        if (num == 0) return false;
        var text = '';
        for (var v = 0; v < num; v++) {
            text = document.getElementById("hjFeeInfoList").rows[v].cells[0].innerHTML;
            if ($("#hjFeeInfoList" + parseInt(text) + "_allNum").val() == '') {
                $("#hjFeeInfoList" + parseInt(text) + "_allNum").parent().addClass("has-error");
                $("#hjFeeInfoList" + parseInt(text) + "_allNum").focus();
                return false;
            }
            if ($("#hjFeeInfoList" + parseInt(text) + "_drugType").html().trim() == 'Prescription' && $('#firstDoc option:selected').val().trim() == "") {
                $('#firstDoc').parent().addClass("has-error");
                $('#firstDoc').focus();
                alert(1)
                return false;
            }
        }
        return true;
    }

    $("#btnSubmit").click(function () {
        if (!checkInfo()) {
            toastr.error("An error has occurred. Please check it");
            return;
        }
        $('#myModal').modal('show');
        $("#enter").val("1");
        var total = $("#numFee2").html();
        $("#numFee").val(total);
        $("#inFee").val(total);
        $("#changeFee").val(0.00);
        $("#owemoney").val(0.00);
        $("#methodType").val(1);
        $("#inFee").focus();
        $("#inFee").select();
    });

    $('#feeDate').datetimepicker({
        format: 'MM/DD/YYYY HH:mm',
        locale: moment.locale('en-gb')
    });

    $('#drugName').bind("input.autocomplete", function () {
        $(this).trigger('keydown.autocomplete');
    });

    $('#drugName').autocomplete("/drugInfo/getDrugInfo", {
        width: $("#drugName").width() + 30,
        scrollHeight: 300,
        matchCase: false,
        matchSubset:false,
        dataType: "json",
        extraParams: {
            drugsName: function () {
                var name = $.trim($("#drugName").val());
                return name;
            }
        },
        parse: function (data) {
            var rows = [];
            var d = data;
            for (var i = 0; i < d.length; i++) {
                rows[rows.length] = {
                    data: d[i],
                    value: d[i].bankName,
                    result: d[i].bankName
                };
            }
            return rows;
        },
        formatItem: function (item) {
            if (typeof item.drugName != "undefined") {
                if(item.barCode == ""){
                    return "<div><p><font>" + '[' + item.drugName + '---' + item.drugType + "</font>---Price：<font color=#CD4F39>" + item.drugPrice + "]</font></p></div>";
                }else{
                    return "<div><p><font>" + '[' + item.drugName + '---' + item.barCode + '---' + item.drugType + "</font>---Price：<font color=#CD4F39>" + item.drugPrice + "]</font></p></div>";
                }
                
            }
        }
    }).result(function (event, data, formatted) {
        $("#drugName").val('');
        var hjFeeInfoRowIdx = 0;
        data["allNum"] = "1";
        data["drugsId"] = data["_id"];
        var num = document.getElementById("hjFeeInfoList").rows.length;
        var text = '';
        if (num > 0) {
            text = document.getElementById("hjFeeInfoList").rows[num - 1].cells[0].innerHTML;
            hjFeeInfoRowIdx = parseInt(text) + 1;
        }
        data["numPrice"] = data["allNum"] * data["drugPrice"];
        addRow('#hjFeeInfoList', hjFeeInfoRowIdx, hjFeeInfoTpl, data);
        $('#Flag').val(1);
        numFee();
    });

    var data = $('#hjFeeData').html();
    if (data != "") {
        $.post('/drugCharge/getHjFeeInfo', {
            "id": data
        }, function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i]["allPrice"] = data[i]["drugPrice"] * data[i]["allNum"];
                addRow('#hjFeeInfoList', hjFeeInfoRowIdx, hjFeeInfoTpl, data[i]);
                hjFeeInfoRowIdx = hjFeeInfoRowIdx + 1;
            }
            numFee();
        });
    }

    if ($("#firstDoc")) {
        let select = document.getElementById('firstDoc');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value == $('#lab_firstDoc').html()) {
                select.options[i].selected = true;
                break;
            }
        }
    }

    if ($("#sex")) {
        let select = document.getElementById('sex');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].val() == $('#lab_sex').html()) {
                select.options[i].selected = true;
                break;
            }
        }
    }

    
});

function keyup(obj) {
    var phoneNum = obj.value.trim();
    alert(1)
    if (e.keyCode === 8) {
        this.value = phoneNum;
        return;
    }

    var len = phoneNum.length;
    if (len === 3 || len === 7) {
        phoneNum += ' ';
        alert(phoneNum)
        obj.value = phoneNum;
    }
}

function numFee() {
    var num = document.getElementById("hjFeeInfoList").rows.length;
    var numFee = 0;
    var text = '';
    for (var v = 0; v < num; v++) {
        text = document.getElementById("hjFeeInfoList").rows[v].cells[0].innerHTML;
        var fee = parseFloat($("#hjFeeInfoList" + parseInt(text) + "_numPrice").html());
        numFee += fee;
    }
    $("#numFee2").html(numFee.toFixed(2));
}

var hjFeeInfoRowIdx = 0, hjFeeInfoTpl = $("#hjFeeInfoTpl").html().replace(/(\/\/\<!\-\-)|(\/\/\-\->)/g, "");
function claim(idx) {
    var l1 = $("#hjFeeInfoList" + idx + "_allNum").val();
    var l2 = $("#hjFeeInfoList" + idx + "_price").html();
    var l3 = l1 * l2;
    l3 = l3.toFixed(2);
    $("#hjFeeInfoList" + idx + "_numPrice").html(l3);
    $("#hjFeeInfoList" + idx + "_numPrice1").val(l3);
    numFee();

}

function inFeeChange() {
    var inFee = parseFloat($("#inFee").val()).toFixed(2);
    var total = $("#numFee").val();
    var changeFee = inFee - total;
    if (changeFee > 0) {
        $("#changeFee").val(changeFee.toFixed(2));
        $("#owemoney").val("0.00");
    } else {
        var owemoney = total - inFee;
        $("#owemoney").val(owemoney.toFixed(2));
        $("#changeFee").val("0.00");
    }
}


