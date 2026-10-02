// ---- CONTACT CARD ----
(function () {
  function initializeContactCard() {
    const overlay = document.getElementById("contact-card-overlay");
    const closeBtn = document.getElementById("contact-card-close");
    const form = document.getElementById("contact-card-form");

    if (!overlay || !closeBtn || !form) {
      console.error(
        "Contact card could not initialize because required HTML elements are missing.",
      );
      return;
    }

    const openers = document.querySelectorAll(
      "[data-contact-open], a[href^='mailto:']",
    );

    const submitBtn = form.querySelector(".contact-card__submit");
    let previousFocus = null;
    function ensureStatusElement() {
      let status = document.getElementById("contact-status");

      if (!status) {
        status = document.createElement("p");
        status.id = "contact-status";
        status.className = "contact-card__status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        form.appendChild(status);
      }

      return status;
    }

    const status = ensureStatusElement();

    function setStatus(message, type) {
      status.textContent = message;
      status.className = "contact-card__status";

      if (type) {
        status.classList.add(`contact-card__status--${type}`);
      }
    }

    function clearErrors() {
      overlay.querySelectorAll(".contact-card__input").forEach(function (el) {
        el.classList.remove("contact-card__input--error");
        el.removeAttribute("aria-invalid");
      });

      overlay.querySelectorAll(".contact-card__error").forEach(function (el) {
        el.textContent = "";
      });
    }

    function showError(input, errorId, message) {
      input.classList.add("contact-card__input--error");
      input.setAttribute("aria-invalid", "true");

      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.textContent = message;
      }

      input.focus();
    }

    function validateForm() {
      const name = document.getElementById("contact-name");
      const email = document.getElementById("contact-email");
      const message = document.getElementById("contact-message");

      clearErrors();
      setStatus("");

      if (!name || !email || !message) {
        setStatus(
          "The contact form is missing a required field. Please refresh and try again.",
          "error",
        );
        return false;
      }

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

      return true;
    }

    function openCard(event) {
      if (event) {
        event.preventDefault();
      }

      previousFocus = document.activeElement;
      clearErrors();
      setStatus("");

      overlay.hidden = false;
      document.body.classList.add("contact-card-open");

      const card = overlay.querySelector(".contact-card");

      if (card) {
        card.style.animation = "none";
        void card.offsetHeight;
        card.style.animation = "";
      }

      window.requestAnimationFrame(function () {
        closeBtn.focus();
      });
    }

    function closeCard() {
      overlay.hidden = true;
      document.body.classList.remove("contact-card-open");

      clearErrors();
      setStatus("");
      form.reset();

      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    }

    openers.forEach(function (opener) {
      opener.addEventListener("click", openCard);
    });

    closeBtn.addEventListener("click", closeCard);

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeCard();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !overlay.hidden) {
        closeCard();
      }
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      setStatus("Sending your message...", "sending");

      const payload = {
        name: document.getElementById("contact-name").value.trim(),
        email: document.getElementById("contact-email").value.trim(),
        message: document.getElementById("contact-message").value.trim(),
        website: document.getElementById("contact-website").value,
      };

      try {
        const response = await fetch("/api/contact.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "same-origin",
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) {
          throw new Error(
            result.error || "We couldn't send your message. Please try again.",
          );
        }

        setStatus(
          result.notification_sent === false
            ? "Your message was saved, but the email alert could not be sent. You can close this window."
            : "Thanks — your message was sent. I’ll get back to you soon.",
          "success",
        );
        form.reset();
      } catch (error) {
        setStatus(
          error.message || "A connection error occurred. Please try again.",
          "error",
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Contact Me";
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeContactCard);
  } else {
    initializeContactCard();
  }
})();
