$(document).on(`mouseover`, `.container .column`, function(){
    $(this).addClass(`active`).siblings().removeClass(`active`)
})

$(window).on('load', function () {
    $('#loading').hide();
  }) 
