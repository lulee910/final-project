var flag2 = false;
var flag3 = false;
var flag4 = false;

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

$("#passswd1").on('click', function() {
    console.log($(this).val());
    var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;6-16 commonly used numbers, letters and common symbols, case sensitive</h6> <br > ';
    if ($(this).val() == "") {
        $("#passswd1Tip").html("");
        $("#passswd1Tip").append(text);
        $("#passswd1Tip").css('display', 'block');
    }
});

$("#passswd1").on('blur', function() {
    var keywd = $(this).val();
    if (keywd != '') {
        console.log(keywd);
        var patt = /^[0-9a-zA-Z~!@#$%^&*()_+=-\[\]\;',./|:"<>?"\{\}]{6,16}$/;
        console.log(patt.test(keywd));
        if (!patt.test(keywd)) {
            $("#passswd1Tip").html("");
            var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;Input password format error, 6-16 commonly used numbers, letters and common symbols, case sensitive</h6> <br > ';
            $("#passswd1Tip").append(text);
            $("#passswd1Tip").css('display', 'block');
            flag3 = false;
            enableBtn("registerBtn");
        } else {
            $("#passswd1Tip").html("");
            $("#passswd1Tip").css('display', 'none');
            flag3 = true;
            enableBtn("registerBtn");
        }
    }

});

$("#passswd2").on('blur', function() {
    var keywd = $(this).val();
    var keywd1 = $("#passswd1").val();
    console.log(keywd);
    console.log(keywd1);
    if (keywd != '') {
        if (keywd1 != keywd) {
            $("#passswd2Tip").html("");
            var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;The passwords you entered do not match</h6> <br > ';
            $("#passswd2Tip").append(text);
            $("#passswd2Tip").css('display', 'block');
            flag4 = false;
            enableBtn("registerBtn");
        } else {
            $("#passswd2Tip").html("");
            $("#passswd2Tip").css('display', 'none');
            flag4 = true;
            enableBtn("registerBtn");
        }
    } else {
        $("#passswd2Tip").html("");
        var text = '<h6 class="text-info"> &nbsp;&nbsp;<span class="glyphicon glyphicon-exclamation-sign"></span> &nbsp;&nbsp;Enter your password again</h6> <br > ';
        $("#passswd2Tip").append(text);
        $("#passswd2Tip").css('display', 'block');
        flag4 = false;
        enableBtn("registerBtn");
    }

});

$("#usernameR").on("click", function() {
    console.log("www");
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
        flag2 = false;
        enableBtn("registerBtn");
    } else {
        $("#usernameTip").html("");
        $("#usernameTip").css('display', 'none');
        flag2 = true;
        enableBtn("registerBtn");
    }
});

function enableBtn(btnId) {
    if (flag2 && flag3 && flag4) {
        $("#" + btnId).attr("disabled", false)
    } else {
        $("#" + btnId).attr("disabled", "disabled")
    }
}

$("#remember").on('click', function() {
    if ($(this)[0].checked) {
        setCookie('username', $("username").val());
        setCookie('passwd', $("passwd").val());
    } else {
        deleteCookie('username');
        deleteCookie('passwd');
    }
});

function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}

function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        } else return ""
    }
}

function deleteCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, "", expdate);
}

$("#loginBtn").on('click', function() {
    $('#error').addClass("hidden");
    var sessionStorage = new window.sessionStorage();
    sessionStorage.setItem("username", $("#username").val());
    sessionStorage.setItem("passwd", $("#passwd").val());
    console.log("session:%s-%s", sessionStorage.username, sessionStorage.passwd);
});
});