(function (window, document) {
  "use strict";

  const retrieveURL = function (filename) {
    let scripts = document.getElementsByTagName("script");
    if (scripts && scripts.length > 0) {
      for (let i in scripts) {
        if (
          scripts[i].src &&
          scripts[i].src.match(new RegExp(filename + "\\.js$"))
        ) {
          return scripts[i].src.replace(
            new RegExp("(.*)" + filename + "\\.js$"),
            "$1"
          );
        }
      }
    }
  };

  function load(url, element) {
    let req = new XMLHttpRequest();

    req.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        element.insertAdjacentHTML("afterbegin", req.responseText);
      }
    };

    req.open("GET", url, true);
    req.send(null);
  }

  if (
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.host !== ""
  ) {
    var files = ["./images/symbol_sprite.html"],
      revision = 10;

    if (
      !document.createElementNS ||
      !document.createElementNS("http://www.w3.org/2000/svg", "svg")
      .createSVGRect
    )
      return true;

    var isLocalStorage =
      "localStorage" in window && window["localStorage"] !== null,
      request,
      data,
      insertIT = function () {
        document.body.insertAdjacentHTML("afterbegin", data);
      },
      insert = function () {
        if (document.body) insertIT();
        else document.addEventListener("DOMContentLoaded", insertIT);
      };
    files.forEach((file) => {
      try {
        let request = new XMLHttpRequest();
        request.open("GET", file, true);
        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            data = request.responseText;
            insert();
            if (isLocalStorage) {
              localStorage.setItem("inlineSVGdata", data);
              localStorage.setItem("inlineSVGrev", revision);
            }
          }
        };
        request.send();
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
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
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
            slidesToShow: 1,
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
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
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
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
          }
        }]
      });
    });
  }

  const menuBtn = document.querySelector('.arrow-down');
  const menu = document.querySelector('.part-menu');

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('visible');
  });

  menu.addEventListener('mouseleave', () => {
    menu.classList.remove('visible');
  });

  const notifBtn = document.querySelector('.notif-popup');
  const notifBlock = document.querySelector('.notifBlock');

  notifBtn.addEventListener('click', () => {
    notifBlock.classList.toggle('visible');
    notifBtn.classList.toggle('active');
  });

  menu.addEventListener('mouseleave', () => {
    notifBlock.classList.remove('visible');
    notifBtn.classList.remove('active');
  });

  const mobileBtnMenu = document.querySelector('.menu-btn');
  const leftMenuAll = document.querySelector('.leftMenu');
  const leftMenuContent = document.querySelector('.leftMenu-content');

  mobileBtnMenu.addEventListener('click', () => {
    leftMenuAll.classList.toggle('visible');
    leftMenuContent.classList.toggle('visible');
  })

});
