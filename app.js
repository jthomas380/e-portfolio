// ---- DARK MODE TOGGLE ----
const toggleBtn = document.querySelector(".theme-toggle");
const themeKey = "jet-portfolio-theme";

try {
  if (window.localStorage.getItem(themeKey) === "dark") {
    document.documentElement.classList.add("body--dark");
  }
} catch {}

function updateThemeLabel() {
  const isDark = document.documentElement.classList.contains("body--dark");
  toggleBtn.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
}

updateThemeLabel();

toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("body--dark");
  const isDark = document.documentElement.classList.contains("body--dark");
  try {
    window.localStorage.setItem(themeKey, isDark ? "dark" : "light");
  } catch {}
  updateThemeLabel();
});

const navToggle = document.querySelector(".nav__toggle");
const navList = document.querySelector("#primary-navigation");

function closeNavigation(restoreFocus = false) {
  navList.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  if (restoreFocus) navToggle.focus();
}

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
});

navList.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNavigation();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navList.classList.contains("is-open")) {
    closeNavigation(true);
  }
});

window.matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
  if (event.matches) closeNavigation();
});

document.querySelectorAll("[data-project-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const indicators = Array.from(
    carousel.querySelectorAll("[data-carousel-index]"),
  );
  const status = carousel.querySelector("[data-carousel-status]");
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    indicators.forEach((indicator, indicatorIndex) => {
      indicator.setAttribute(
        "aria-current",
        String(indicatorIndex === activeIndex),
      );
    });

    status.textContent = `${activeIndex + 1} / ${slides.length}`;
  };

  carousel.addEventListener("click", (event) => {
    const directionButton = event.target.closest("[data-carousel-direction]");
    if (directionButton) {
      showSlide(
        activeIndex + Number(directionButton.dataset.carouselDirection),
      );
      return;
    }

    const indicator = event.target.closest("[data-carousel-index]");
    if (indicator) {
      showSlide(Number(indicator.dataset.carouselIndex));
    }
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  });
});
