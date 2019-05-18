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
        this.value = this.value.replace(/[^0-9\s]/g,'');
        var phoneNum = this.value.trim();
        if (e.keyCode === 8) {
            this.value = phoneNum;
            return;
        }
        var len = phoneNum.length;
        if (len === 3 || len === 7) {
            phoneNum += ' ';
            this.value = phoneNum;
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

