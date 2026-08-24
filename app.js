// ---- DARK MODE TOGGLE ----
const toggleBtn = document.querySelector(".theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("body--dark");
  const isDark = document.documentElement.classList.contains("body--dark");

  toggleBtn.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
});
