$('.navbar').css('position', 'absolute');
    $('li[name="reg_tag "]').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="login_tag "]').removeClass('active');
        }
    })
    $('li[name="login_tag "]').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="reg_tag "]').removeClass('active');
        }
    })
$(document).ready(function() {

    $('form').submit(function () {
        let check1 =  $("#passwd1Tip").html();
        let check2 = $("#passwd2Tip").html();
        let check3 = $("#usernameTip").html();
        if(check1 !="" || check2 !="" || check3 !=""){
            return false;
        }
        return true;
     });

    let liFlag = $('#li_flag').html();
    if(liFlag == "2"){
        $('#li_login').removeClass('active');
        $('#li_reg').addClass('active');
        $('#login').removeClass('in active');
        $('#reg').addClass('in active');
    }

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

$("#usernameR").on("click", function() {
    var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;Please enter your username</h6> <br> ';
    if ($(this).val() == "") {
        $("#usernameTip").html("");
        $("#usernameTip").append(text);
        $("#usernameTip").css('display', 'block');
    }
});

$("#usernameR").on("blur", function() {
    var username = $(this).val();
    if (username == '') {
    } else {
        $("#usernameTip").html("");
        $("#usernameTip").css('display', 'none');
    }
});
});