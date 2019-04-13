$(document).ready(function () {
    $("#menu a").click(function () {
        $("#menu li").removeClass("active");
        $(this).parent().addClass("active");
        $("#mainFrame").show();
    });
    $("#topMenu a").click(function () {
        $("#topMenu li").removeClass("active");
        $(this).parent().addClass("active");
        $('#panel').removeClass("hidden");
        $('#panelHead').text((this).text);
        $("#menu li").removeClass("active");
        $('#menu ul').addClass("hidden");
        var menu = '#menu' + $(this).attr("data-id");
        $(menu).removeClass("hidden");
    });
})

