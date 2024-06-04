document.addEventListener("DOMContentLoaded", (event) => {
  const link = document.querySelector(".redimensione a");
  const div = document.querySelector(".redimensione");

  // Função para armazenar as dimensões e a posição originais da div
  function storeOriginalDimensionsAndPosition() {
    const rect = div.getBoundingClientRect();
    localStorage.setItem("originalWidth", rect.width);
    localStorage.setItem("originalHeight", rect.height);
    localStorage.setItem("originalTop", rect.top);
    localStorage.setItem("originalLeft", rect.left);
  }

  // Função para restaurar as dimensões e a posição originais da div
  function restoreOriginalDimensionsAndPosition() {
    const originalWidth = localStorage.getItem("originalWidth");
    const originalHeight = localStorage.getItem("originalHeight");
    const originalTop = localStorage.getItem("originalTop");
    const originalLeft = localStorage.getItem("originalLeft");

    div.style.position = "static"; // Restaurar a posição original
    div.style.width = `${originalWidth}px`;
    div.style.height = `${originalHeight}px`;
    div.style.top = `${originalTop}px`;
    div.style.left = `${originalLeft}px`;
    div.style.zIndex = ""; // Limpar zIndex
  }

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
      storeOriginalDimensionsAndPosition(); // Armazena as dimensões e a posição originais após a transição
    }, 2000); // 1 segundo após o início da transição
  });

  // Verifica se houve uma mudança na URL (transição de página)
  window.addEventListener("popstate", () => {
    // Restaura as dimensões e a posição originais da div
    restoreOriginalDimensionsAndPosition();
  });
});
