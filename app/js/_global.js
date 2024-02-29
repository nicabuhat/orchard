var app = {};
var counter = 0;
// Global
(app.global = {
  init: function () {
    // Load all global functions here
    console.log("load global functions");
    app.global.logAnchorClicks();
    app.global.modalAction();
    app.global.animateOnLoad();
  },
  logAnchorClicks: function () {
    const anchors = document.querySelectorAll("A");
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target);
      });
    });
  },
  modalAction: function () {
    const modal = document.querySelector("#modal");
    const close = document.querySelector("#close");
    const images = document.querySelectorAll(".img");

    let modalmageString = `modal-img-`;
    let currentImage;

    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        modal.style.display = "block";
        const currentImageId = image.id.slice(-1);
        currentImage = document.querySelector(
          `#${modalmageString}${currentImageId}`
        );
        currentImage.style.display = "block";
      });
    });

    close.addEventListener("click", (e) => {
      modal.style.display = "none";
      currentImage.style.display = "none";
    });
  },
  animateOnLoad: function () {
    const section = document.querySelectorAll("section")[1];

    document.addEventListener(
      "scroll",
      (e) => {
        const vwTop = window.scrollY;
        const vwBottom = window.scrollY + window.innerHeight;
        const elemTop = section.offsetTop;
        const elemHeight = section.offsetHeight;

        if (counter < 1) {
          if (vwBottom > elemTop && vwTop - elemHeight < elemTop) {
            section.classList.add("animate");
            counter++;
          } else {
            section.classList.remove("animate");
          }
        }
      },
      false
    );
  },
}),
  // Run the global stuff
  app.global.init();
