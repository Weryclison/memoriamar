// ####### IMAGE COMPARATOR #######
function imageComparator() {
  const container = document.querySelector(".container-foto");
  const slider = document.querySelector(".slider");

  slider.addEventListener("input", (e) => {
    container.style.setProperty("--position", `${e.target.value}%`);
  });
}
imageComparator();
