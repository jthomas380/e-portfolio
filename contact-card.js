// ---- CONTACT CARD ----
(function () {
  const overlay = document.getElementById("contact-card-overlay");
  const closeBtn = document.getElementById("contact-card-close");
  const form = document.getElementById("contact-card-form");
  const emailLinks = document.querySelectorAll(
    "a[href='mailto:JEThomas1130@gmail.com']",
  );

  let previousFocus = null;

  // --- Open / Close ---

  function openCard() {
    previousFocus = document.activeElement;
    overlay.removeAttribute("hidden");

    // Re-trigger the entry animation each time the card opens
    const card = overlay.querySelector(".contact-card");
    card.style.animation = "none";
    card.offsetHeight; // force reflow
    card.style.animation = "";

    closeBtn.focus();
  }

  function closeCard() {
    overlay.setAttribute("hidden", "");
    clearErrors();
    form.reset();
    if (previousFocus) previousFocus.focus();
  }

  // --- Validation helpers ---

  function clearErrors() {
    overlay.querySelectorAll(".contact-card__input").forEach(function (el) {
      el.classList.remove("contact-card__input--error");
    });
    overlay.querySelectorAll(".contact-card__error").forEach(function (el) {
      el.textContent = "";
    });
  }

  function showError(input, errorId, message) {
    input.classList.add("contact-card__input--error");
    document.getElementById(errorId).textContent = message;
    input.focus();
  }

  function validateForm() {
    var valid = true;
    var name = document.getElementById("contact-name");
    var email = document.getElementById("contact-email");
    var message = document.getElementById("contact-message");

    clearErrors();

    if (!name.value.trim()) {
      showError(name, "name-error", "Please enter your full name.");
      return false;
    }

    if (!email.value.trim()) {
      showError(email, "email-error", "Please enter your email address.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError(email, "email-error", "Please enter a valid email address.");
      return false;
    }

    if (!message.value.trim()) {
      showError(message, "message-error", "Please enter a message.");
      return false;
    }

    return valid;
  }

  // --- Event listeners ---

  emailLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openCard();
    });
  });

  closeBtn.addEventListener("click", closeCard);

  // Close when clicking the backdrop
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeCard();
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hasAttribute("hidden")) closeCard();
  });

  // Build and open the mailto link on submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    var name = document.getElementById("contact-name").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var message = document.getElementById("contact-message").value.trim();
    var to = "JEThomas1130@gmail.com"; // Replace with your email address

    var subject = encodeURIComponent("Portfolio Contact from " + name);
    var body = encodeURIComponent(
      "Name: " +
        name +
        "\n" +
        "Email: " +
        email +
        "\n\n" +
        "Message:\n" +
        message,
    );

    window.location.href =
      "mailto:" + to + "?subject=" + subject + "&body=" + body;
  });
})();
