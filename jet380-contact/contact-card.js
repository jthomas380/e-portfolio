// Contact card: stores messages through the site's PHP API.
(function () {
  const overlay = document.getElementById("contact-card-overlay");
  const closeBtn = document.getElementById("contact-card-close");
  const form = document.getElementById("contact-card-form");
  const status = document.getElementById("contact-status");
  const submitBtn = form.querySelector('[type="submit"]');
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  let previousFocus = null;

  function openCard() {
    previousFocus = document.activeElement;
    overlay.removeAttribute("hidden");
    const card = overlay.querySelector(".contact-card");
    card.style.animation = "none";
    card.offsetHeight;
    card.style.animation = "";
    closeBtn.focus();
  }
  function closeCard() {
    overlay.setAttribute("hidden", "");
    if (status) status.textContent = "";
    if (!submitBtn.disabled) form.reset();
    if (previousFocus) previousFocus.focus();
  }
  function clearErrors() {
    overlay.querySelectorAll(".contact-card__input").forEach(el => el.classList.remove("contact-card__input--error"));
    overlay.querySelectorAll(".contact-card__error").forEach(el => { el.textContent = ""; });
  }
  function fail(input, id, message) {
    input.classList.add("contact-card__input--error");
    document.getElementById(id).textContent = message;
    input.focus();
    return false;
  }
  function validate() {
    clearErrors();
    const name = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const message = document.getElementById("contact-message");
    if (!name.value.trim()) return fail(name, "name-error", "Please enter your full name.");
    if (!email.value.trim()) return fail(email, "email-error", "Please enter your email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return fail(email, "email-error", "Please enter a valid email address.");
    if (!message.value.trim()) return fail(message, "message-error", "Please enter a message.");
    if (name.value.trim().length > 120) return fail(name, "name-error", "Please keep your name under 120 characters.");
    if (message.value.trim().length > 5000) return fail(message, "message-error", "Please keep your message under 5,000 characters.");
    return true;
  }

  emailLinks.forEach(link => link.addEventListener("click", event => { event.preventDefault(); openCard(); }));
  closeBtn.addEventListener("click", closeCard);
  overlay.addEventListener("click", event => { if (event.target === overlay) closeCard(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !overlay.hasAttribute("hidden")) closeCard(); });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!validate()) return;
    status.textContent = "Sending your message…";
    status.className = "contact-card__status is-pending";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    const payload = {
      name: document.getElementById("contact-name").value.trim(),
      email: document.getElementById("contact-email").value.trim(),
      message: document.getElementById("contact-message").value.trim(),
      website: document.getElementById("contact-website").value
    };
    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
        credentials: "same-origin"
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "We couldn't send your message. Please try again.");
      status.textContent = result.notification_sent === false
        ? "Your message was saved, but the email alert could not be sent. You can close this window."
        : "Thanks — your message was sent. I’ll get back to you soon.";
      status.className = "contact-card__status is-success";
      form.reset();
    } catch (error) {
      status.textContent = error.message || "A connection error occurred. Please try again.";
      status.className = "contact-card__status is-error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Contact Me";
    }
  });
})();
