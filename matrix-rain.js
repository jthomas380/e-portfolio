/* ========================================
   MATRIX RAIN - CONFIGURATION
========================================

HTML DATA ATTRIBUTES

data-matrix-active-class="body--dark"
data-matrix-color="#00ff41"
data-matrix-font-size="16"
data-matrix-direction="up | down | both"
data-matrix-characters="01{}[]/="

JAVASCRIPT SETTINGS

this.frameDelay = 45
  Lower = faster; higher = slower.

speed: Math.random() * 1.4 + 0.6
  Controls column speed and variation.

Math.random() > 0.25 ? 1 : -1
  Controls downward/upward distribution.

"rgba(0, 0, 0, 0.09)"
  Lower alpha = longer trails.

"#caffca"
  Highlight character color.

CSS SETTINGS

opacity: 0.55
  Controls animation visibility.

filter: invert(1) hue-rotate(180deg)
  Compensates for page-wide dark-mode inversion.
  Remove if your theme does not use an inversion filter.

NOTE

Current movement supports up and down.
Left/right movement requires additional drawing logic.

======================================== */

class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.activeClass =
      canvas.dataset.matrixActiveClass || "body--dark";

    this.color =
      canvas.dataset.matrixColor || "#00ff41";

    this.fontSize =
      Number(canvas.dataset.matrixFontSize) || 16;

    this.direction =
      canvas.dataset.matrixDirection || "both";

    this.characters =
      canvas.dataset.matrixCharacters ||
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]";

    this.frameDelay = 45;
    this.columns = [];
    this.animationFrame = null;
    this.previousTime = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    this.draw = this.draw.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);

    this.initialize();
  }

  initialize() {
    this.themeObserver = new MutationObserver(
      this.handleThemeChange
    );

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    window.addEventListener(
      "resize",
      this.handleResize
    );

    this.handleThemeChange();
  }

  isActive() {
    return document.documentElement.classList.contains(
      this.activeClass
    );
  }

  getDirection() {
    if (this.direction === "up") {
      return -1;
    }

    if (this.direction === "down") {
      return 1;
    }

    return Math.random() > 0.25 ? 1 : -1;
  }

  resize() {
    const canvasBounds =
      this.canvas.getBoundingClientRect();

    const pixelRatio =
      Math.min(window.devicePixelRatio || 1, 2);

    this.canvasWidth = canvasBounds.width;
    this.canvasHeight = canvasBounds.height;

    this.canvas.width =
      Math.floor(this.canvasWidth * pixelRatio);

    this.canvas.height =
      Math.floor(this.canvasHeight * pixelRatio);

    this.context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );

    const columnCount =
      Math.ceil(this.canvasWidth / this.fontSize);

    this.columns = Array.from(
      { length: columnCount },
      () => ({
        position: Math.random() * this.canvasHeight,
        direction: this.getDirection(),
        speed: Math.random() * 1.4 + 0.6
      })
    );

    this.context.fillStyle = "#000000";

    this.context.fillRect(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  getRandomCharacter() {
    const randomIndex = Math.floor(
      Math.random() * this.characters.length
    );

    return this.characters[randomIndex];
  }

  draw(currentTime) {
    if (currentTime - this.previousTime < this.frameDelay) {
      this.animationFrame = requestAnimationFrame(
        this.draw
      );

      return;
    }

    this.previousTime = currentTime;

    this.context.fillStyle =
      "rgba(0, 0, 0, 0.09)";

    this.context.fillRect(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );

    this.context.font =
      `${this.fontSize}px monospace`;

    this.columns.forEach((column, index) => {
      const character = this.getRandomCharacter();

      const xPosition =
        index * this.fontSize;

      this.context.fillStyle =
        Math.random() > 0.96
          ? "#caffca"
          : this.color;

      this.context.fillText(
        character,
        xPosition,
        column.position
      );

      column.position +=
        column.direction *
        column.speed *
        this.fontSize;

      if (
        column.position >
        this.canvasHeight + this.fontSize
      ) {
        column.position = -this.fontSize;
      }

      if (
        column.position <
        -this.fontSize
      ) {
        column.position =
          this.canvasHeight + this.fontSize;
      }
    });

    this.animationFrame = requestAnimationFrame(
      this.draw
    );
  }

  start() {
    if (this.animationFrame !== null) {
      return;
    }

    this.resize();

    this.previousTime = 0;

    this.animationFrame = requestAnimationFrame(
      this.draw
    );
  }

  stop() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(
        this.animationFrame
      );

      this.animationFrame = null;
    }

    this.context.clearRect(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  handleThemeChange() {
    if (this.isActive()) {
      this.start();
    } else {
      this.stop();
    }
  }

  handleResize() {
    if (this.isActive()) {
      this.resize();
    }
  }

  destroy() {
    this.stop();

    this.themeObserver.disconnect();

    window.removeEventListener(
      "resize",
      this.handleResize
    );
  }
}

function initializeMatrixRain() {
  const matrixCanvases =
    document.querySelectorAll("[data-matrix-rain]");

  matrixCanvases.forEach((canvas) => {
    new MatrixRain(canvas);
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeMatrixRain
  );
} else {
  initializeMatrixRain();
}