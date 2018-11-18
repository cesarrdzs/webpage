(($) => {
    var top = 0;

    $(document).ready(() => {
        var contentHeight = $('.righty').height(),
            contents = $('.righty > .content').length;
        top = (0 - (contentHeight * (contents - 1)));
        $('.righty').css('top', top + 'px');
    });

    $(window).resize(() => {
        var contentHeight = $('.righty').height(),
            contents = $('.righty > .content').length;
        top = (0 - (contentHeight * (contents - 1)));
        $('.righty').css('top', (top + $(window).scrollTop()) + 'px');
    });

    $(window).scroll(function () {
        $('.righty').css('top', (top + $(window).scrollTop()) + 'px');
    });

    const container = $(".container");

    $(".left").on("mouseenter", () => {
        container.addClass("hover-left");
    });

    $(".left").on("mouseleave", () => {
        container.removeClass("hover-left");
    });

    $(".right").on("mouseenter", () => {
        container.addClass("hover-right");
    });

    $(".right").on("mouseleave", () => {
        container.removeClass("hover-right");
    });

    $(".left .button").on("click", (e) => {
        var doc = document.getElementById('leftFrame').contentWindow.document;
        doc.open();
        doc.write($("#leftTmpl").html() );
        doc.close()
        $(e.currentTarget).addClass("clicked");
        container.addClass("full-left");
    });
    
    $(".right .button").on("click", (e) => {
        var doc = document.getElementById('rightFrame').contentWindow.document;
        doc.open();
        doc.write($("#rightTmpl").html() );
        doc.close()
        $(e.currentTarget).addClass("clicked");
        container.addClass("full-right");
    });

    $(".left .button .close").on("click", (e) => {
        e.stopPropagation();
        $(".left .button").removeClass("clicked");
        container.removeClass("full-left");
    });
    
    $(".right .button .close").on("click", (e) => {
        e.stopPropagation();
        $(".right .button").removeClass("clicked");
        container.removeClass("full-right");
    });

})(jQuery);