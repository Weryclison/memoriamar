var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1.1,
  spaceBetween: 50,
  loop: true,
  speed: 1000,
  centeredSlides: true,
  resistanceRatio: 0.5,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // Quando a largura da tela for igual ou superior a 768px
    768: {
      slidesPerView: 1.5,
      spaceBetween: 100,
    },
    1020: {
      slidesPerView: 1.8,
      spaceBetween: 150,
    },
    // Adicione mais breakpoints conforme necessário
  },
});

// Adiciona evento de rolagem ao contêiner do Swiper
document
  .getElementById("swiper-container")
  .addEventListener("wheel", function (event) {
    event.preventDefault();

    if (event.deltaY < 0) {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  });
