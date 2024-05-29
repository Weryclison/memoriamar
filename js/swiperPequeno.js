var swiperP = new Swiper(".swiper-containe", {
  slidesPerView: 1,
  spaceBetween: 50,
  speed: 1000,
  centeredSlides: true,
  resistanceRatio: 0.5,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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

function handleClick(link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Previne o comportamento padrão do link

    // Salva a URL a partir do data-url do link clicado
    var newUrl = link.dataset.url;

    // Atualiza o slidesPerView para 1
    swiperP.params.slidesPerView = 1;
    swiperP.update(); // Atualiza o swiper com as novas configurações

    // Altera a altura dos slides
    var slides = document.querySelectorAll(".swiper-slide");
    slides.forEach(function (slide) {
      slide.style.height = "100vh";
    });

    // Adiciona um pequeno atraso para a transição suave do Swiper
    setTimeout(function () {
      // Atualiza o slidesPerView para 1
      swiperP.params.slidesPerView = 1;
      swiperP.update(); // Atualiza o swiper com as novas configurações

      // Altera a URL do site 1 segundo após a transição
      setTimeout(function () {
        window.location.href = newUrl;
      }, 2000); // 1 segundo de atraso
    }, 0);
  });
}

// Chama a função com o link desejado
var link = document.querySelector(".swiper-slide a");
handleClick(link);
