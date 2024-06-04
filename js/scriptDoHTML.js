let currentIndex;
const itemsWrapper = document.getElementById("itemsWrapper");
const thumbs = [
  ...itemsWrapper.querySelectorAll(
    "img.grid__item-img:not(.grid__item-img--large)"
  ),
];
const fullviewItems = [...document.querySelectorAll(".fullview__item")];
const backToGridCtrl = document.querySelector(".fullview__close");
const transitionEffectDuration = 1.2;

const transitionEffect = createDemoEffect({
  activation: { type: "mouse" },
  timing: {
    duration: transitionEffectDuration,
  },
  transformation: {
    type: "simplex",
    props: {
      seed: "8000",
      frequencyX: 0.2,
      frequencyY: 0.2,
      amplitudeX: 0.3,
      amplitudeY: 0.3,
    },
  },
  onToFullscreenStart: ({ index }) => {
    currentIndex = index;
    thumbs[currentIndex].style.opacity = 0;
    transitionEffect.uniforms.uSeed.value = index * 10;
    toggleFullview();
  },
  onToGridFinish: ({ index, lastIndex }) => {
    thumbs[lastIndex].style.opacity = 1;
    fullviewItems[currentIndex].classList.remove("fullview__item--current");
  },
  seed: 800,
  easings: {
    toFullscreen: Power1.easeOut,
    toGrid: Power1.easeInOut,
  },
});
transitionEffect.init();

const toggleFullview = () => {
  if (transitionEffect.isFullscreen) {
    TweenLite.to(
      fullviewItems[currentIndex].querySelector(".fullview__item-title"),
      0.2,
      {
        ease: Quad.easeOut,
        opacity: 0,
        x: "5%",
      }
    );
    TweenLite.to(backToGridCtrl, 0.2, {
      ease: Quad.easeOut,
      opacity: 0,
      scale: 0,
    });

    transitionEffect.toGrid();
  } else {
    fullviewItems[currentIndex].classList.add("fullview__item--current");

    TweenLite.to(
      fullviewItems[currentIndex].querySelector(".fullview__item-title"),
      1,
      {
        ease: Expo.easeOut,
        startAt: { x: "5%" },
        opacity: 1,
        x: "0%",
        delay: transitionEffectDuration * 0.6,
      }
    );
    TweenLite.to(backToGridCtrl, 1, {
      ease: Expo.easeOut,
      startAt: { scale: 0 },
      opacity: 1,
      scale: 1,
      delay: transitionEffectDuration * 0.6,
    });
  }
};

backToGridCtrl.addEventListener("click", () => {
  if (transitionEffect.isAnimating) {
    return;
  }
  toggleFullview();
});

// Preload all the images in the page
imagesLoaded(document.querySelectorAll("img"), (instance) => {
  //https://www.techrepublic.com/article/preloading-and-the-javascript-image-object/
  document.body.classList.remove("loading");

  // Make Images sets for the transition effect
  let images = [];
  for (var i = 0, imageSet = {}; i < instance.elements.length; i++) {
    let image = {
      element: instance.elements[i],
      image: instance.images[i].isLoaded ? instance.images[i].img : null,
    };
    if (i % 2 === 0) {
      imageSet = {};
      imageSet.small = image;
    }

    if (i % 2 === 1) {
      imageSet.large = image;
      images.push(imageSet);
    }
  }
  transitionEffect.createTextures(images);
});
