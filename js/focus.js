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
