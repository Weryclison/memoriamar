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

// Seleciona todas as tags <a> dentro dos slides
var links = document.querySelectorAll(".swiper-slide a");

// Adiciona um evento de clique a cada link
links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Previne o comportamento padrão do link

    // Salva a URL a partir do data-url do link clicado
    var newUrl = link.dataset.url;

    // Atualiza o slidesPerView para 1
    swiper.params.slidesPerView = 1;
    swiper.update(); // Atualiza o swiper com as novas configurações

    // Altera a altura dos slides
    var slides = document.querySelectorAll(".swiper-slide");
    slides.forEach(function (slide) {
      slide.style.height = "100vh";
    });

    // Adiciona um pequeno atraso para a transição suave do Swiper
    setTimeout(function () {
      // Atualiza o slidesPerView para 1
      swiper.params.slidesPerView = 1;
      swiper.update(); // Atualiza o swiper com as novas configurações

      // Altera a URL do site 1 segundo após a transição
      setTimeout(function () {
        window.location.href = newUrl;
      }, 2000); // 1 segundo de atraso
    }, 0);
  });
});
