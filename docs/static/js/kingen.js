$(function () {
    // replace footer of mkdocs
    $("footer").each(function () {
        $(this).html("<p>Kingen | <a href='https://github.com/eastsunrise/wiki-kingen'>Wiki-Kingen - GitHub</a></p>");
    });

    // open a http/https link with a new label
    $("a").each(function () {
        var href = $(this).attr('href');
        if (typeof (href) != "undefined" && href.startsWith('http')) {
            $(this).attr('target', '_blank');
        }
    });
});