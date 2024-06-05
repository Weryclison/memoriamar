document.addEventListener("DOMContentLoaded", (event) => {
  const link = document.querySelector(".redimensione a");
  const div = document.querySelector(".redimensione");

  link.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que o link navegue para outra página

    // Obtém as dimensões e a posição originais da div
    const rect = div.getBoundingClientRect();
    const originalWidth = rect.width;
    const originalHeight = rect.height;
    const originalTop = rect.top;
    const originalLeft = rect.left;

    // Ajusta a div para a posição fixa
    div.style.position = "fixed";
    div.style.top = `${originalTop}px`;
    div.style.left = `${originalLeft}px`;
    div.style.width = `${originalWidth}px`;
    div.style.height = `${originalHeight}px`;
    div.style.zIndex = "1";

    // Força reflow para garantir que as mudanças de estilo sejam aplicadas antes da transição
    div.offsetHeight;

    // Adiciona a classe para iniciar a transição
    div.classList.add("fullscreen-transition");
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "100%";

    // Após 2 segundos, redireciona para a URL especificada em data-url
    setTimeout(() => {
      const url = link.getAttribute("data-url");

      // Redefine os estilos após a troca da URL
      setTimeout(() => {
        div.style.position = "";
        div.style.top = "";
        div.style.left = "";
        div.style.width = "";
        div.style.height = "";
        div.style.zIndex = "";
        div.classList.remove("fullscreen-transition");
      }, 0); // Ajuste o tempo conforme necessário

      window.location.href = url;
    }, 2000); // 2 segundos após o início da transição
  });
});
