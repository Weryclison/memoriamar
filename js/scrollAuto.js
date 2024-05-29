document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    scrollSuave(200, 100);
  }, 600);

  function scrollSuave(offset, duration) {
    const initialY = window.scrollY;
    const baseY = (initialY + offset) * 0.5;
    const startTime = performance.now();
    function step() {
      const normalizedTime = (performance.now() - startTime) / duration;
      if (normalizedTime > 1) return window.scrollTo(0, initialY + offset);
      window.scrollTo(
        0,
        initialY + offset * Math.sin(normalizedTime * Math.PI)
      );
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
});
