$(function () {
    $("a").each(function () {
        if ($(this).attr('href').startsWith('http')) {
            $(this).attr('target', '_blank');
        }
    });
    MathJax.Hub.Config({
        config: ["MMLorHTML.js"],
        jax: ["input/TeX", "output/HTML-CSS", "output/NativeMML"],
        extensions: ["MathMenu.js", "MathZoom.js"]
    });
});