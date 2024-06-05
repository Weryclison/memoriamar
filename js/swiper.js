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
    768: {
      slidesPerView: 1.5,
      spaceBetween: 100,
    },
    1020: {
      slidesPerView: 1.8,
      spaceBetween: 150,
    },
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
console.log(links);

// Adiciona um evento de clique a cada link
links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Previne o comportamento padrão do link

    // Salva a URL a partir do data-url do link clicado
    var newUrl = link.dataset.url;

    // Salva os estilos originais dos slides
    var slides = document.querySelectorAll(".swiper-slide");
    var originalStyles = [];
    slides.forEach(function (slide) {
      originalStyles.push({
        height: slide.style.height,
      });
    });

    // Atualiza o slidesPerView para 1
    swiper.params.slidesPerView = 1;
    swiper.update(); // Atualiza o swiper com as novas configurações

    // Altera a altura dos slides
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
      }, 2000); // 2 segundos de atraso
    }, 0);

    // Reinicia os estilos e configurações após a execução
    setTimeout(function () {
      slides.forEach(function (slide, index) {
        slide.style.height = originalStyles[index].height;
      });

      // Reinicia as configurações do Swiper
      swiper.params.slidesPerView = 1.1;
      swiper.params.spaceBetween = 50;
      swiper.update(); // Atualiza o swiper com as configurações originais

      // Verifica a largura da janela e aplica os breakpoints apropriados
      var windowWidth = window.innerWidth;

      if (windowWidth >= 1020) {
        swiper.params.slidesPerView = 1.8;
        swiper.params.spaceBetween = 150;
      } else if (windowWidth >= 768) {
        swiper.params.slidesPerView = 1.5;
        swiper.params.spaceBetween = 100;
      }

      swiper.update(); // Atualiza o swiper com as configurações de breakpoint
    }, 2500); // 2.5 segundos de atraso para garantir que a URL já foi alterada
  });
});
