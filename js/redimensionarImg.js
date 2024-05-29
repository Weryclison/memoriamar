document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".redimensione-imagem");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRect.height >= 0) {
          entry.target.classList.add("expandir");
        }
      });
    },
    {
      threshold: [0, 0.1, 0.5, 1],
    }
  );

  images.forEach((image) => {
    observer.observe(image);
  });
});
