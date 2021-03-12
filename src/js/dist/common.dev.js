"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (window, document) {
  "use strict";

  var retrieveURL = function retrieveURL(filename) {
    var scripts = document.getElementsByTagName("script");

    if (scripts && scripts.length > 0) {
      for (var i in scripts) {
        if (scripts[i].src && scripts[i].src.match(new RegExp(filename + "\\.js$"))) {
          return scripts[i].src.replace(new RegExp("(.*)" + filename + "\\.js$"), "$1");
        }
      }
    }
  };

  function load(url, element) {
    var req = new XMLHttpRequest();

    req.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        element.insertAdjacentHTML("afterbegin", req.responseText);
      }
    };

    req.open("GET", url, true);
    req.send(null);
  }

  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1" && location.host !== "") {
    var files = ["./images/symbol_sprite.html"],
        revision = 10;
    if (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) return true;

    var isLocalStorage = "localStorage" in window && window["localStorage"] !== null,
        request,
        data,
        insertIT = function insertIT() {
      document.body.insertAdjacentHTML("afterbegin", data);
    },
        insert = function insert() {
      if (document.body) insertIT();else document.addEventListener("DOMContentLoaded", insertIT);
    };

    files.forEach(function (file) {
      try {
        var _request = new XMLHttpRequest();

        _request.open("GET", file, true);

        _request.onload = function () {
          if (_request.status >= 200 && _request.status < 400) {
            data = _request.responseText;
            insert();

            if (isLocalStorage) {
              localStorage.setItem("inlineSVGdata", data);
              localStorage.setItem("inlineSVGrev", revision);
            }
          }
        };

        _request.send();
      } catch (e) {}
    });
  } else {
    load("./images/symbol_sprite.html", document.querySelector("body"));
  }
})(window, document);

document.addEventListener("DOMContentLoaded", function (event) {
  if ($('.available-slider')) {
    $(document).ready(function () {
      $('.available-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: '.available-games .next',
        prevArrow: '.available-games .previous',
        infinite: false,
        responsive: [{
          breakpoint: 1500,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    });
  }

  if ($('.prize-slider')) {
    $(document).ready(function () {
      $('.prize-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: '.leaderBoards .next',
        prevArrow: '.leaderBoards .previous',
        infinite: false,
        responsive: [{
          breakpoint: 1572,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    });
  }

  if ($('.games-slider')) {
    $(document).ready(function () {
      $('.games-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: '.games .next',
        prevArrow: '.games .previous',
        infinite: false,
        responsive: [{
          breakpoint: 1900,
          settings: {
            slidesToShow: 4
          }
        }, {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    });
  }

  if ($('.challenge-slider')) {
    $(document).ready(function () {
      $('.challenge-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: '.carousel .next',
        prevArrow: '.carousel .previous',
        infinite: false,
        responsive: [{
          breakpoint: 1650,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 800,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    });
  }

  var menuBtn = document.querySelector('.arrow-down');
  var menu = document.querySelector('.part-menu');

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      menu.classList.toggle('visible');
    });
    menu.addEventListener('mouseleave', function () {
      menu.classList.remove('visible');
    });
  }

  ;
  var notifBtns = document.querySelectorAll('.notif-popup');
  var notifBlock = document.querySelector('.notifBlock');
  notifBtns.forEach(function (item) {
    item.addEventListener('click', function () {
      item.querySelector('.notifBlock').classList.toggle('visible');
      item.classList.toggle('active');
      menu.addEventListener('mouseleave', function () {
        item.querySelector('.notifBlock').classList.remove('visible');
        item.classList.remove('active');
      });
    });
  });
  var mobileBtnsMenu = document.querySelectorAll('.menu-btn');
  var leftMenuAll = document.querySelector('.leftMenu');
  var leftMenuContent = document.querySelector('.leftMenu-content');
  mobileBtnsMenu.forEach(function (item) {
    item.addEventListener('click', function () {
      leftMenuAll.classList.toggle('visible');
      leftMenuContent.classList.toggle('visible');
    });
  });

  if ($('.app-carousel')) {
    $(document).ready(function () {
      $('.app-carousel').slick(_defineProperty({
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: '.next',
        prevArrow: '.previous',
        dots: true,
        infinite: false
      }, "infinite", true));
    });
  }

  var simpleBar = new SimpleBar(document.getElementByClass('leftMenu-scroll'), {
    scrollbarMinSize: '60px'
  });
  simpleBar.recalculate();
  simpleBar.getScrollElement();
});