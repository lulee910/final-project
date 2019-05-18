$(function(){
    $('.navbar').css('position', 'absolute');
    $('li[name="doctorAdd_tag "]').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="doctorList_tag "]').removeClass('active');
        }
    })
    $('li[name="doctorList_tag "]').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="doctorAdd_tag "]').removeClass('active');
        }
    })
    
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
    })
    
})

function confirmx(obj,id){
    bootbox.confirm({ 
        size: "small",
        message: "Are you sure?",
        callback: function(result){ 
            if(result){
                $.post('/doctorInfo/delete', {
                    "_id": id
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

