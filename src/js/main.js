require('../index.html')
window.$ = window.jQuery = require('jquery')
require('waypoints/lib/jquery.waypoints.min.js')
require('jquery-qrcode')
require('../css/package.scss')
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
// preloader.start()

$('.wrapper').removeClass('hidden')
$('.loader').addClass('over')
loadOver()

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
    window.MtaH5 && MtaH5.clickStat('click_navbar')
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
  $('.example-item').on('click', function() {
    var link = $(this).data('href')
    var desc = $(this).data('desc')
    var cli = $(this).data('cli')

    $('.example-phone-qrcode').html('')
    $('.example-phone-qrcode').qrcode({
      width: 160,
      height: 160,
      text: link || 'https://aotu.io'
    })

    $('.example-phone-logo').addClass('hide')
    $('.example-phone-item').removeClass('hide')
    $('.example-phone-desc').text(desc)
    $('.example-phone-link').attr('href', link)
    $('.example-phone-command').text(cli)

    window.MtaH5 && MtaH5.clickStat('click_template', {[cli.split(' ').pop()]: 'true'})
  })
  // $('.example-item').each(function (i, qr) {
  //   var $qr = $(qr)
  //   $qr.qrcode({
  //     width: 160,
  //     height: 160,
  //     text: 'http://html5-panorama.aco.aotu.io'
  //   })
  // })

  $('[data-redirect]').on('click', function (e) {
    var $btn = $(e.currentTarget)
    console.log('event:', $btn.data('event'))
    if ($btn.data('event')) {
      window.MtaH5 && MtaH5.clickStat($btn.data('event'))
    }
    setTimeout(function () {
      window.location.href = $btn.data('redirect')
    }, 500)
  })
}


