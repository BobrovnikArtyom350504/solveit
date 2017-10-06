let $ = require('jquery');
let slick = require('slick-carousel');
$(document).ready(() => {

  moveBackground();
  $('.main-banner').on('init', (event, slick)=>{
    let slide = $(slick['$slides'][0]);
    setTimeout(function() {
      slide.find('.overlay').slideDown(500);
      slide.find('.project-view img').slideDown(500);
      slide.find('.overview').fadeIn(300);
    },500);
  });

  $('.main-banner').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 300,
    arrows: false
  });

  $('.main-banner').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    if(currentSlide !== nextSlide) {
      let slide = $(slick['$slides'][currentSlide]);
      slide.find('.overlay').hide();
      slide.find('.overview').hide();
      slide.find('.project-view img').hide();
    }
  });

  $('.main-banner').on('afterChange', (event, slick, currentSlide) => {
    let slide = $(slick['$slides'][currentSlide]);
    slide.find('.overlay').slideDown(500);
    slide.find('.project-view img').slideDown(500);
    slide.find('.overview').fadeIn(700);
  });

  $('.nav-trigger').click(() => {
    let overlay = $('body > .overlay');
    let nav = overlay.find('.main-nav');
    $('.nav-trigger').toggleClass('active');
    nav.toggleClass('expend');
    if(nav.hasClass('expend')) {
      overlay.toggleClass('shown');
      nav.delay(400).slideToggle(200);
      $('body').css('overflow', 'hidden');
    }
    else {
      nav.slideToggle(200, ()=> {overlay.toggleClass('shown');});
      $('body').css('overflow', '');
    }
  });

  $('body > .overlay .main-nav').on('click', 'a', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('.nav-trigger').click();
  });

  $(window).on('scroll', () => {
    if ($(window).scrollTop() > 50)
       $('body > header').addClass('fixed');
    else
       $('body > header').removeClass('fixed');

    if(!isScrolledIntoView('.contacts', false))
      $('.contact .title').css({
        width: 0
      });
    if(isScrolledIntoView('.contacts', true))
      $('.contact .title').css({
        width: ''
      });
  });

  $(window).on('mousemove  touchstart ',  function(e) {
    var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX ||  e.touches[0].clientX));
    var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY ||  e.touches[0].clientY));
    lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (10 * lMouseY) / 100;

  });

  function isScrolledIntoView(elem, fullyInView) {
    let docViewTop = $(window).scrollTop();
    let docViewBottom = docViewTop + $(window).height();

    let elemTop = $(elem).offset().top;
    let elemBottom = elemTop + $(elem).height();
    if (fullyInView === true)
      return ((docViewTop < elemTop) && (docViewBottom > elemBottom));
    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
  }

  let lFollowX = 0,
      lFollowY = 0,
      x = 0,
      y = 0,
      friction = 1 / 30;

  function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;

    var translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

    $('.project .overlay').css({
      '-webit-transform': translate,
      '-moz-transform': translate,
      'transform': translate
    });

    window.requestAnimationFrame(moveBackground);
  }

});
