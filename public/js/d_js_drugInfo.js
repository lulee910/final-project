$(function(){
    $('.navbar').css('position', 'absolute');
    $('li[name="drugAdd_tag "]').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="drugList_tag "]').removeClass('active');
        }
    })
    $('li[name="drugList_tag "]').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('li[name="drugAdd_tag "]').removeClass('active');
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
                $.post('/drugInfo/deleteFeeId', {
                    "id": id
                }, function (data) {
                    $(obj).parent().parent().remove();
                });
            } 
        }
    })
}

