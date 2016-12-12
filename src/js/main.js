require('../index.html')
window.$ = window.jQuery = require('jquery')
require('waypoints/lib/jquery.waypoints.min.js')
require('../css/main.scss')

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
  var $header = $(".header")
  if ($header.offset().top > 50) {
    $header.addClass("nav-collapse")
  } else {
    $header.removeClass("nav-collapse")
  }
}

$(window).scroll(collapseNavbar)
$(document).ready(collapseNavbar)


// jQuery to go to
$(function() {
    $('.navbar [data-url], .to-top').bind('click', function(event) {
        var $anchor = $(this)
        $('html, body').stop().animate({
            scrollTop: $('#' + $anchor.attr('data-url')).offset().top - 60
        }, 1000)
        event.preventDefault()
    })
})


// var navbarList = ['hero', 'about', 'feature', 'component', 'example', 'subscribe']
var $navbar = $('.navbar')
$('.section, #hero, #subscribe').waypoint({
  handler: function(direction) {
    if (direction === 'up') return
    // console.log('waypoint direction:', direction, this.element.id)
    var id = this.element.id

    $navbar.find('li').removeClass('active')
    $navbar.find('[data-url=' + id + ']').addClass('active')
  },
  offset: 80
})
$('.section, #hero, #subscribe').waypoint({
  handler: function(direction) {
    if (direction === 'down') return
    // console.log('waypoint direction:', direction, this.element.id)
    var id = this.element.id

    $navbar.find('li').removeClass('active')
    $navbar.find('[data-url=' + id + ']').addClass('active')
  },
  offset: -120
})
