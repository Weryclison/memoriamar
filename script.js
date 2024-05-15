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

// ####### IMAGE COMPARATOR #######

const container = document.querySelector(".container-foto");
const slider = document.querySelector(".slider");

slider.addEventListener("input", (e) => {
  container.style.setProperty("--position", `${e.target.value}%`);
});

// ##### VIDEO PLAY HOVER #######

const clip = document.querySelectorAll(".clip");
for (let i = 0; i < clip.length; i++) {
  clip[i].addEventListener("mouseenter", function (e) {
    clip[i].play();
  });
  clip[i].addEventListener("mouseout", function (e) {
    clip[i].pause();
  });
}
