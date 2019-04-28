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

   let message = $('#message').html();
   if(message !=""){
       if(message.indexOf("success") > -1){
            toastr.success(message);
       }else{
            toastr.error(message);
       }
   }
})

function confirmx(obj,id){
    bootbox.confirm({ 
        size: "small",
        message: "Are you sure?",
        callback: function(result){ 
            if(result){
                $.post('/doctorInfo/deleteFeeId', {
                    "id": id
                }, function (data) {
                    $(obj).parent().parent().remove();
                });
            } 
        }
    })
}

