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

    // Salva o estado modificado no sessionStorage
    sessionStorage.setItem(
      "divState",
      JSON.stringify({
        position: div.style.position,
        top: div.style.top,
        left: div.style.left,
        width: div.style.width,
        height: div.style.height,
        zIndex: div.style.zIndex,
        classList: Array.from(div.classList),
      })
    );

    // Após 1 segundo, redireciona para a URL especificada em data-url
    setTimeout(() => {
      window.location.href = link.getAttribute("data-url");
    }, 2000); // 1 segundo após o início da transição
  });

  // Limpa o estado salvo no sessionStorage ao descarregar a página
  window.addEventListener("unload", function () {
    sessionStorage.removeItem("divState");
  });

  // Restaura o estado inicial da div ao carregar a página
  window.addEventListener("load", function () {
    const savedState = sessionStorage.getItem("divState");
    if (savedState) {
      const state = JSON.parse(savedState);
      div.style.position = state.position;
      div.style.top = state.top;
      div.style.left = state.left;
      div.style.width = state.width;
      div.style.height = state.height;
      div.style.zIndex = state.zIndex;
      div.className = ""; // Limpa todas as classes
      state.classList.forEach((cls) => div.classList.add(cls)); // Adiciona as classes salvas
    } else {
      // Redefina os estilos aplicados à div
      div.style.position = "";
      div.style.top = "";
      div.style.left = "";
      div.style.width = "";
      div.style.height = "";
      div.style.zIndex = "";

      // Remove a classe adicionada
      div.classList.remove("fullscreen-transition");
    }
  });
});
