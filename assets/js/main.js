
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const loader = document.querySelector('#loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.remove();
    });
  }


  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });
  // Javascript for TyperWriter 
  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }

  };



  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', () => {
    aos_init();
  });

});
// Logic for Dark-Mode toggle

toggle = document.getElementById('darkMode');
toggle.addEventListener('click', function () {

  root = document.querySelector(':root');

  mode = localStorage.getItem("mode");
  if (mode == 'dark') {
    toggle.classList.remove('bi-moon-fill');
    toggle.classList.add('bi-brightness-high-fill');
    root.style.setProperty('--bgColor-header', '#2f3143');
    root.style.setProperty('--textColor-black', '#fff');
    root.style.setProperty('--bgColor-shadow', '#3b4158');
    root.style.setProperty('--textColor-red', '#fff');
    root.style.setProperty('--textColor-gray', '#fff');
    root.style.setProperty('--bgColor-footer', '#2f3143');
    localStorage.setItem('mode', 'light');
  }
  if (mode == 'light') {
    toggle.classList.add('bi-moon-fill');
    toggle.classList.remove('bi-brightness-high-fill');
    root.style.setProperty('--bgColor-header', '#fff');
    root.style.setProperty('--textColor-black', '#212529');
    root.style.setProperty('--bgColor-shadow', '#eee')
    root.style.setProperty('--textColor-red', 'red');
    root.style.setProperty('textColor-gray', '#4f4f5a')
    root.style.setProperty('--bgColor-footer', '#1f1f24');
    localStorage.setItem('mode', 'dark');

  }


});

// Script for contact Google Sheets

const scriptURL = 'https://script.google.com/macros/s/AKfycbz6uXBozkoz3RVg-gEB7M4kCkq98ZAs0yOPJFT_LFZgmZqfRAmP5L2avS_fXq5R_BCtag/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      message = document.getElementsByClassName('sent-message')[0];
      message.style.backgroundColor = 'green';
      message.style.display = 'block'
      message.innerHTML = 'Message sent Succesfully';
      setInterval(() => {
        message.innerHTML = '';
        message.style.display = 'none';
      }, 2000);
      form.reset();
    })
})
