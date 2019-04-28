function delRow(obj, chargesId, feeId, allNum, drugesId) {
    bootbox.confirm({ 
        size: "small",
        message: "Are you sure?",
        callback: function(result){ 
            if(result){
                if (feeId == ''){
                    $(obj).parent().parent().remove();
                    numFee();
                }else{
                    $.post('/drugInfo/deleteFeeId', {
                        "chargesId": chargesId,
                        "feeId": feeId,
                        "allNum": allNum,
                        "drugesId": drugesId
                    }, function (data) {
                        $(obj).parent().parent().remove();
                        numFee();
                    });
                }             
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

function submit(){
    toastr.error("An error has occurred. Please check it");
}

$(function () {
   let message = $('#message').html();
   if(message !=""){
       if(message.indexOf("success") > -1){
            toastr.success(message);
       }else{
            toastr.error(message);
       }
   }
    
    function addRow(list, idx, tpl, row) {
        var source   = $("#hjFeeInfoTpl").html();
        var template = Handlebars.compile(source);
        var context = {row: row, idx:idx};
        var html    = template(context);  
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
        var text = '';
        for (var v = 0; v < num; v++) {
            text = document.getElementById("hjFeeInfoList").rows[num-1].cells[v].innerHTML;
            if ($("#hjFeeInfoList" + parseInt(text) + "_allNum").val() == '') {
                $("#hjFeeInfoList" + parseInt(text) + "_allNum").parent().addClass("has-error");
                $("#hjFeeInfoList" + parseInt(text) + "_allNum").focus();
                return false;
            }
        }
        return true;
    }
    
    $("#btnSubmit").click(function () {
        if(!checkInfo()){
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
    max: 5,   
    minChars: 1,
    width: $("#drugName").width() + 30,     
    scrollHeight: 300,   
    matchContains: true,    
    autoFill: false,    
    dataType : "json",
    parse: function(data){
        console.log(data);
        var rows = [];
        var d = data;
        for(var i=0; i<d.length; i++){
            rows[rows.length] = {
                data:d[i],
                value:d[i].bankName,
                result:d[i].bankName
            };
        }
        return rows;
    },
    formatItem: function(item) {
        return "<div><p><font>" + item.id + '--(' + item.drugsName + ')--(规格：' + item.drugsSpec + "</font></p></span><p>&nbsp&nbsp;售价：<font color=#CD4F39>" + item.price + "</font>&nbsp&nbsp;类型：<font color=#CD4F39>" 
        + item.drugsType + "</font></p></div>";
    }
}).result(function(event, data, formatted) {
    $("#drugName").val('');
    var hjFeeInfoRowIdx = 0;
    data["allNum"] = "1";
    data["groupId"] = "1";
    var num = document.getElementById("hjFeeInfoList").rows.length;
    var text = '';
    if(num>0){
        text = document.getElementById("hjFeeInfoList").rows[num-1].cells[0].innerHTML;
        hjFeeInfoRowIdx = parseInt(text) + 1;
    }
    data["numPrice"] = data["allNum"] * data["price"];
    addRow('#hjFeeInfoList', hjFeeInfoRowIdx, hjFeeInfoTpl, data);
    $('#Flag').val(1);
    numFee();
});

    $('#drugName2').bind("input.autocomplete", function () {
        $(this).trigger('keydown.autocomplete');
    });

    $("#drugName2").autocomplete("/drugInfo/getDrugInfo", {
        max: 5,   
        minChars: 1,    
        width: $("#drugName2").width() + 30,    
        scrollHeight: 300,   
        matchContains: true,
        autoFill: false,    
        dataType : "json",
        parse: function(data){
            console.log(data);
            var rows = [];
            var d = data;
            for(var i=0; i<d.length; i++){
                rows[rows.length] = {
                    data:d[i],
                    value:d[i].bankName,
                    result:d[i].bankName
                };
            }
            return rows;
        },
        formatItem: function(item) {
            return "<div><p><font>" + item.id + '--(' + item.drugsName + ')--(规格：' + item.drugsSpec + "</font></p></span><p>&nbsp&nbsp;售价：<font color=#CD4F39>" + item.price + "</font>&nbsp&nbsp;类型：<font color=#CD4F39>" 
            + item.drugsType + "</font></p></div>";
        }
    }).result(function(event, data, formatted) {
        $("#drugName").val('');
        var hjFeeInfoRowIdx = 0;
        data["allNum"] = "1";
        data["groupId"] = "1";
        var num = document.getElementById("hjFeeInfoList").rows.length;
        var text = '';
        if(num>0){
            text = document.getElementById("hjFeeInfoList").rows[num-1].cells[0].innerHTML;
            hjFeeInfoRowIdx = parseInt(text) + 1;
        }
        data["numPrice"] = data["allNum"] * data["price"];
        addRow('#hjFeeInfoList', hjFeeInfoRowIdx, hjFeeInfoTpl, data);
        $('#Flag').val(1);
        numFee();
    });

});

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
$(document).ready(function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8]
    for (var i = 0; i < data.length; i++) {
        data[i]["allPrice"] = data[i]["drugsPrice"] * data[i]["allNum"];
        addRow('#hjFeeInfoList', hjFeeInfoRowIdx, hjFeeInfoTpl, data[i]);
        hjFeeInfoRowIdx = hjFeeInfoRowIdx + 1;
    }
});
function claim(idx) {
    var l1 = $("#hjFeeInfoList" + idx + "_allNum").val();
    var l2 = $("#hjFeeInfoList" + idx + "_price").html();
    var l3 = l1 * l2;
    l3 = l3.toFixed(2);
    $("#hjFeeInfoList" + idx + "_numPrice").html(l3);
    $("#hjFeeInfoList" + idx + "_numPrice1").val(l3);
    numFee();

}
function changeGroup(idx) {
    var len = document.getElementById("hjFeeInfoList").rows.length;
    var l1 = $("#hjFeeInfoList" + idx + "_groupId").val();
    for (var i = idx; i < len; i++) {
        $("#hjFeeInfoList" + i + "_groupId").val(l1);
    }
}


function inFeeChange() {
    var inFee = parseFloat($("#inFee").val()).toFixed(2);
    var total = $("#numFee").val();
    var changeFee = inFee - total;
    if (changeFee > 0) {
        $("#changeFee").val(changeFee.toFixed(2));//找零金额
        $("#owemoney").val("0.00");
    } else {
        var owemoney = total - inFee;
        $("#owemoney").val(owemoney.toFixed(2));//欠费金额
        $("#changeFee").val("0.00");
    }
}

//回车键提交
$(document).keypress(function (event) {
    var keycode = event.which;
    if (keycode == 13) {
        var o = document.getElementById("myModal").style.display;
        if (o == 'block') {
            document.getElementById("btnSubmit1").click();
        }
        var vId = event.srcElement.id;
        var vValue = vId.substring(vId.indexOf('t') + 1, vId.indexOf('_'));
        var vText = vId.substring(vId.indexOf('_') + 1);

        if (vText == "times") {
            if ($('#feeType').val() == 3) {
                $("#hjFeeInfoList" + vValue + "_price").focus();
            } else {
                $("#hjFeeInfoList" + vValue + "_umber").focus();
            }
        }
        if (vText == "umber") {
            $("#hjFeeInfoList" + vValue + "_price").focus();
        }

        if (vText == "price") {
            if ($('#Flag').val() == 1) {
                $("#drugName").focus();
            } else {
                $("#drugName2").focus();
            }
        }
    }
    if (keycode == 32) {
        document.getElementById("btnSubmit").click();
    }
});


