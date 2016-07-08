$(document).ready( function () {

    var $header_link = $(".header-link");

    // scroll to the corresponding section
    $header_link.click( function (e) {

        var target = $(this).attr("href"),
            scrollTo =$(target).offset().top,
            header_height = $("#hotcold-navigation-bar").height(),
            general_offset = 10;
        
        console.log("target is ", target, scrollTo, header_height);

        $("body").animate({
            scrollTop: scrollTo - header_height - general_offset
        }, 750);

        e.preventDefault();

    } );

} );