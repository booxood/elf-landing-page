require('../index.html')
window.$ = window.jQuery = require('jquery')
require('waypoints/lib/jquery.waypoints.min.js')
require('jquery-qrcode')
require('../css/main.scss')
var Preloader = require('preloader.js')


var preloader = new Preloader({
  attr: 'preload',
  resources: [
    './img/banner-bg.jpg',
    './img/cover.png',
  ],
  perMinTime: 0,
  concurrency: 4
})
preloader.addProgressListener(function (loaded, length) {
  console.log('loading ', loaded, length, loaded / length)
})
preloader.addCompletionListener(function () {
  console.log('load completed')
  $('.wrapper').removeClass('hidden')
  $('.loader').addClass('over')

  loadOver()
})
preloader.start()


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


// mobile menu
$('.menu').bind('click', function () {
  navbarOpen()
})
$('.nav-right').delegate('.navbar.open', 'click', function () {
  navbarOpen()
})

function navbarOpen() {
  var $navbar = $('.navbar')
  if ($navbar.hasClass('open')) {
    $navbar.removeClass('open')
  } else {
    $navbar.addClass('open')
  }
}

function loadOver() {
  // go to
  $('.navbar [data-url], .to-top').bind('click', function (event) {
    var $anchor = $(this)
    $('html, body').stop().animate({
      scrollTop: $('#' + $anchor.attr('data-url')).offset().top - 60
    }, 1000)
    event.preventDefault()
  })

  // navbar
  // var navbarList = ['hero', 'about', 'feature', 'component', 'example', 'subscribe']
  var $navbar = $('.navbar')
  $('.section, #hero, #subscribe').waypoint({
    handler: function (direction) {
      if (direction === 'up') return
      // console.log('waypoint direction:', direction, this.element.id)
      var id = this.element.id

      $navbar.find('li').removeClass('active')
      $navbar.find('[data-url=' + id + ']').addClass('active')
    },
    offset: 80
  })
  $('.section, #hero, #subscribe').waypoint({
    handler: function (direction) {
      if (direction === 'down') return
      // console.log('waypoint direction:', direction, this.element.id)
      var id = this.element.id

      $navbar.find('li').removeClass('active')
      $navbar.find('[data-url=' + id + ']').addClass('active')
    },
    offset: -120
  })

  // qrcode
  $('.qrcode').each(function (i, qr) {
    var $qr = $(qr)
    $qr.qrcode({
      width: 200,
      height: 200,
      text: $qr.parents('.example-item').attr('href')
    })
  })
}


