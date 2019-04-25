$(function(){
    $("#passswd1").on('click', function() {
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
            var patt = /^[0-9a-zA-Z~!@#$%^&*()_+=-\[\]\;',./|:"<>?"\{\}]{6,16}$/;
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

   let message = $('#message').html();
   if(message !=""){
       if(message.indexOf("success") > -1){
            toastr.success(message);
       }else{
            toastr.error(message);
       }
   }

});