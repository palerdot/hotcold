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

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    })

} );