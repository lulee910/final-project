$(document).ready(function() {

    $('form').submit(function () {
        let check1 =  $("#passwd1Tip").html();
        let check2 = $("#passwd2Tip").html();
        if(check1 !="" || check2 !=""){
            return false;
        }
        return true;
     });

$("#passwd1").on('click', function() {
    var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;6-16 commonly used numbers, letters and common symbols, case sensitive</h6> <br > ';
    if ($(this).val() == "") {
        $("#passwd1Tip").html("");
        $("#passwd1Tip").append(text);
        $("#passwd1Tip").css('display', 'block');
    }
});

$("#passwd1").on('blur', function() {
    var keywd = $(this).val();
    if (keywd != '') {
        var patt = /^[0-9a-zA-Z~!@#$%^&*()_+=-\[\]\;',./|:"<>?"\{\}]{6,16}$/;
        if (!patt.test(keywd)) {
            $("#passwd1Tip").html("");
            var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;Input password format error, 6-16 commonly used numbers, letters and common symbols, case sensitive</h6> <br > ';
            $("#passwd1Tip").append(text);
            $("#passwd1Tip").css('display', 'block');
        } else {
            $("#passwd1Tip").html("");
            $("#passwd1Tip").css('display', 'none');
        }
    }

});

$("#passwd2").on('blur', function() {
    var keywd = $(this).val();
    var keywd1 = $("#passwd1").val();
    if (keywd != '') {
        if (keywd1 != keywd) {
            $("#passwd2Tip").html("");
            var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;The passwords you entered do not match</h6> <br > ';
            $("#passwd2Tip").append(text);
            $("#passwd2Tip").css('display', 'block');
        } else {
            $("#passwd2Tip").html("");
            $("#passwd2Tip").css('display', 'none');
        }
    } else {
        $("#passwd2Tip").html("");
        var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;Enter your password again</h6> <br > ';
        $("#passwd2Tip").append(text);
        $("#passwd2Tip").css('display', 'block');
    }

});

});