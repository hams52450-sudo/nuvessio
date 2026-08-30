/* Nuvessio — small, dependency-free progressive enhancements. */
"use strict";

(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const mobileQuery = window.matchMedia("(max-width: 800px)");

  if (menuButton && navigation) {
    const setMenu = (open, returnFocus = false) => {
      navigation.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
      if (returnFocus) menuButton.focus();
    };
    const updateNavigation = () => {
      menuButton.hidden = !mobileQuery.matches;
      navigation.classList.toggle("is-collapsible", mobileQuery.matches);
      setMenu(false);
    };
    menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
    navigation.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link || !mobileQuery.matches) return;
      setMenu(false);
      const target = document.querySelector(link.hash);
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") setMenu(false, true);
    });
    document.addEventListener("click", (event) => {
      if (mobileQuery.matches && !event.target.closest(".site-header")) setMenu(false);
    });
    mobileQuery.addEventListener("change", updateNavigation);
    updateNavigation();
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-course]").forEach((link) => {
    link.addEventListener("click", () => {
      const select = document.querySelector("#course");
      if (select) select.value = link.dataset.course;
    });
  });

  const privacyLink = document.querySelector('a[href="#privacy-note"]');
  privacyLink?.addEventListener("click", () => {
    document.querySelector("#privacy-note").open = true;
  });

  const form = document.querySelector("#inquiry-form");
  if (!form) return;
  const submitButton = form.querySelector('[type="submit"]');
  const submitLabel = form.querySelector(".submit-label");
  const status = document.querySelector("#form-status");
  const formNote = document.querySelector("#form-note");
  const endpoint = form.dataset.endpoint.trim();
  let sending = false;
  submitButton.disabled = false;

  // The buyer supplies an endpoint accepting JSON and returning { "success": true }.
  // No API secrets belong here. Validation, spam protection, and email delivery are server responsibilities.
  if (endpoint) formNote.textContent = "Your information will be sent to our inquiry service. Please read the information notice before submitting.";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    status.classList.remove("is-error");
    status.textContent = "";
    const values = new FormData(form);
    const name = String(values.get("name") || "").trim();
    if (name.length < 2) {
      status.classList.add("is-error");
      status.textContent = "Please enter your name using at least two characters.";
      form.querySelector('[name="name"]').focus();
      return;
    }
    if (!endpoint) {
      status.textContent = "Demo complete — nothing was sent or stored. The website owner can connect this form to an inquiry service using the README instructions.";
      return;
    }

    sending = true;
    submitButton.disabled = true;
    submitLabel.textContent = "Sending…";
    form.setAttribute("aria-busy", "true");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name, email: String(values.get("email")).trim(), course: values.get("course"), message: String(values.get("message") || "").trim(), consent: values.get("consent") === "on" }),
        signal: controller.signal,
        credentials: "omit"
      });
      if (!response.ok) throw new Error("Request failed");
      const result = await response.json();
      if (result.success !== true) throw new Error("Unconfirmed delivery");
      status.textContent = "Thank you — your inquiry was sent successfully. We’ll be in touch to help you find your next step.";
      form.reset();
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = error.name === "AbortError"
        ? "We couldn’t confirm delivery before the request timed out. Your entries are still here. Please contact us by email before trying again."
        : "We couldn’t confirm that your inquiry was sent. Your entries are still here. Please try later or contact us by email.";
    } finally {
      window.clearTimeout(timeout);
      sending = false;
      submitButton.disabled = false;
      submitLabel.textContent = "Start the conversation";
      form.removeAttribute("aria-busy");
    }
  });
})();
