$(function() {
// init
    //var deg = Math.PI / 180;
    $('input[type=range]').change(function(){
        setSVG();
    });
    function setSVG(){
        var transX = parseInt($('.transX').val());
        var transY = parseInt($('.transY').val());
        var RoatateSVG = parseInt($('.RoatateSVG').val());
        var ScaleXSVG = parseFloat($('.ScaleXSVG').val());
        var ScaleYSVG = parseFloat($('.ScaleYSVG').val());
        var SHearXSVG = parseInt($('.SHearXSVG').val());
        var SHearYSVG = parseInt($('.SHearYSVG').val());
        $("#front").attr("transform", "rotate("+RoatateSVG+") scale("+ScaleXSVG+", "+ScaleYSVG+") translate("+transX+", "+transY+") skewX("+SHearXSVG+") skewY("+SHearYSVG+")");
        $("#side").attr("transform", "rotate("+RoatateSVG+") scale("+ScaleXSVG+", "+ScaleYSVG+") translate("+transX+", "+transY+") skewX("+SHearXSVG+") skewY("+SHearYSVG+")");
        $("#top").attr("transform", "rotate("+RoatateSVG+") scale("+ScaleXSVG+", "+ScaleYSVG+") translate("+transX+", "+transY+") skewX("+SHearXSVG+") skewY("+SHearYSVG+")");
    }
})