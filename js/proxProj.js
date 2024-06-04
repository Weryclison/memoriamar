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

    // Após 1 segundo, redireciona para a URL especificada em data-url
    setTimeout(() => {
      window.location.href = link.getAttribute("data-url");

      // Após 2 segundos, retorna ao tamanho original
      setTimeout(() => {
        div.style.top = `${originalTop}px`;
        div.style.left = `${originalLeft}px`;
        div.style.width = `${originalWidth}px`;
        div.style.height = `${originalHeight}px`;

        // Remove a classe de transição se necessário
        div.classList.remove("fullscreen-transition");
      }, 2000); // 2 segundos após o redirecionamento
    }, 2000); // 2 segundos após o início da transição
  });
});
