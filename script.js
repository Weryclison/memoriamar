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
// ####### IMAGE COMPARATOR #######
function imageComparator() {
  const container = document.querySelector(".container-foto");
  const slider = document.querySelector(".slider");

  slider.addEventListener("input", (e) => {
    container.style.setProperty("--position", `${e.target.value}%`);
  });
}
imageComparator();

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

// ##### FOCUS #####
function focus() {
  const pos = document.documentElement;
  const circleDiv = document.querySelector(".circle");
  const link = document.querySelector("a");
  const box2 = document.querySelector("section .box-focus:nth-child(2)");

  function handleMouseMove(e) {
    pos.style.setProperty("--x", e.clientX + "px");
    pos.style.setProperty("--y", e.clientY + "px");

    const rect = link.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    ) {
      // Mouse sobre o link
      circleDiv.style.display = "none";
      // Altera o clip-path para 100px
      box2.style.clipPath = "circle(500px at var(--x) var(--y))";
    } else {
      // Mouse fora do link
      circleDiv.style.display = "block";
      // Volta ao clip-path original
      box2.style.clipPath = "circle(250px at var(--x) var(--y))";
    }
  }

  function handleResize() {
    if (window.innerWidth < 900) {
      pos.removeEventListener("mousemove", handleMouseMove);
    } else {
      pos.addEventListener("mousemove", handleMouseMove);
    }
  }

  handleResize(); // Verifica o tamanho da tela ao carregar a página

  window.addEventListener("resize", handleResize); // Verifica o tamanho da tela ao redimensionar
}

focus();
