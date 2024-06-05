if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
// ######## EFEITO SUBIR #############

function botaoSubir() {
  const subirButtons = document.querySelectorAll(".subir");

  subirButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
}
botaoSubir();
// ######  DRAGABBLE SLIDE  ########
function dragabbleSlide() {
  const sliders = [...document.querySelectorAll(".slider__container")];

  sliders.forEach((slider, i) => {
    let isDragStart = false,
      isDragging = false,
      isSlide = false,
      prevPageX,
      prevScrollLeft,
      positionDiff;

    const sliderItem = slider.querySelector(".slider__item");
    var isMultislide = slider.dataset.multislide === "true";

    function autoSlide() {
      if (
        slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 ||
        slider.scrollLeft <= 0
      )
        return;
      positionDiff = Math.abs(positionDiff);
      let slideWidth = isMultislide
        ? slider.clientWidth
        : sliderItem.clientWidth;
      let valDifference = slideWidth - positionDiff;
      if (slider.scrollLeft > prevScrollLeft) {
        return (slider.scrollLeft +=
          positionDiff > slideWidth / 5 ? valDifference : -positionDiff);
      }
      slider.scrollLeft -=
        positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
    }

    function dragStart(e) {
      if (isSlide) return;
      isSlide = true;
      isDragStart = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = slider.scrollLeft;
      slider.classList.add("dragging");
      setTimeout(function () {
        isSlide = false;
      }, 700);
    }

    function dragging(e) {
      if (!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
      slider.scrollLeft = prevScrollLeft - positionDiff;
    }
    function dragStop() {
      isDragStart = false;
      slider.classList.remove("dragging");
      if (!isDragging) return;
      isDragging = false;

      const slideWidth = slider.querySelector(".slider__item").clientWidth;

      const scrollOffset = slider.scrollLeft;

      const currentIndex = Math.round(scrollOffset / slideWidth);

      const finalScrollPosition = currentIndex * slideWidth;

      slider.scrollLeft = finalScrollPosition;
    }

    function applyScale() {
      sliderItem.classList.add("scale-down");
    }

    function removeScale() {
      sliderItem.classList.remove("scale-down");
    }

    addEventListener("resize", autoSlide);
    slider.addEventListener("mousedown", dragStart);
    slider.addEventListener("touchstart", dragStart);
    slider.addEventListener("mousemove", dragging);
    slider.addEventListener("touchmove", dragging);
    slider.addEventListener("mouseup", dragStop);
    slider.addEventListener("touchend", dragStop);
    slider.addEventListener("mouseleave", dragStop);
    slider.addEventListener("mousedown", applyScale);
    slider.addEventListener("mouseup", removeScale);
    slider.addEventListener("touchstart", applyScale);
    slider.addEventListener("touchend", removeScale);
  });
}
dragabbleSlide();

// ########### MENU MOBILE #########

function menuMobile() {
  const btnMobile = document.getElementById("btn-mobile");
  const nav = document.getElementById("nav");
  const body = document.body;

  function toggleMenu(event) {
    if (event.type === "touchstart") event.preventDefault();

    nav.classList.toggle("active");
    const active = nav.classList.contains("active");

    if (active) {
      body.classList.add("menu-active");
      btnMobile.setAttribute("aria-expanded", true);
      btnMobile.setAttribute("aria-label", "Fechar Menu");
    } else {
      body.classList.remove("menu-active");
      btnMobile.setAttribute("aria-expanded", false);
      btnMobile.setAttribute("aria-label", "Abrir Menu");
    }
  }

  function closeMenuOutsideClick(event) {
    const isClickInsideMenu =
      nav.contains(event.target) || btnMobile.contains(event.target);

    if (!isClickInsideMenu && nav.classList.contains("active")) {
      nav.classList.remove("active");
      body.classList.remove("menu-active");
      btnMobile.setAttribute("aria-expanded", false);
      btnMobile.setAttribute("aria-label", "Abrir Menu");
    }
  }

  btnMobile.addEventListener("click", toggleMenu);
  btnMobile.addEventListener("touchstart", toggleMenu);
  document.addEventListener("click", closeMenuOutsideClick);
}
menuMobile();

// ########### SCROLL SUAVE #########

function scrollSuave() {
  const linksInterno = document.querySelectorAll("a.interno");

  function scrolar(i) {
    i.preventDefault();
    const href = i.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  linksInterno.forEach((item) => {
    item.addEventListener("click", scrolar);
  });
}
scrollSuave();

// ######## EFEITO ESCURO HOVER MENU ############

function escuroMenuHover() {
  var menuItems = document.querySelectorAll("#menu li");
  var timeoutId;

  menuItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      clearTimeout(timeoutId);
      document.body.classList.add("menu-active");
      setTimeout(function () {
        document.body.classList.add("active");
      }, 10);
    });
    item.addEventListener("mouseleave", function () {
      document.body.classList.remove("active");
      timeoutId = setTimeout(function () {
        document.body.classList.remove("menu-active");
      }, 500);
    });
  });
}
escuroMenuHover();

// ##### VIDEO PLAY HOVER #######
function playHover() {
  const clip = document.querySelectorAll(".clip");
  for (let i = 0; i < clip.length; i++) {
    clip[i].addEventListener("mouseenter", function (e) {
      clip[i].play();
    });
    clip[i].addEventListener("mouseout", function (e) {
      clip[i].pause();
    });
  }
}
playHover();
