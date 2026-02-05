// Riyad Kassimi - single JS file

// 1) Footer year
document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// 2) Active link highlight
(function setActiveNavLink() {
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".site-nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current) a.classList.add("active");
  });
})();

// 3) Mobile menu toggle
(function mobileNav() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("[data-nav]");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
})();

// 4) Theme toggle (saved)
(function themeToggle() {
  const themeBtn = document.querySelector("[data-theme-btn]");
  if (!themeBtn) return;

  const saved = localStorage.getItem("bb_theme");
  if (saved === "dark") document.body.classList.add("dark");

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "bb_theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
})();

// 5) FAQ accordion (About page)
(function faqAccordion() {
  const questions = document.querySelectorAll(".faq-q");
  if (!questions.length) return;

  questions.forEach(q => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      const expanded = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });
})();

// 6) Gallery filter (Gallery page)
(function galleryFilter() {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const items = Array.from(gallery.querySelectorAll("[data-tag]"));
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      items.forEach(item => {
        const tag = item.getAttribute("data-tag");
        item.style.display = (filter === "all" || filter === tag) ? "flex" : "none";
      });
    });
  });
})();

// 7) Contact form validation + success message
(function bookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const successBox = document.getElementById("successBox");
  const successText = document.getElementById("successText");

  function setError(name, msg) {
    const el = document.querySelector(`[data-err="${name}"]`);
    if (el) el.textContent = msg;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    ["name", "email", "date", "guests"].forEach(k => setError(k, ""));

    const data = new FormData(form);
    const name = (data.get("name") || "").trim();
    const email = (data.get("email") || "").trim();
    const date = (data.get("date") || "").trim();
    const guests = (data.get("guests") || "").trim();

    let ok = true;
    if (name.length < 2) { setError("name", "Enter at least 2 characters."); ok = false; }
    if (!email.includes("@") || !email.includes(".")) { setError("email", "Enter a valid email."); ok = false; }
    if (!date) { setError("date", "Select a date."); ok = false; }
    if (!guests) { setError("guests", "Select guests."); ok = false; }

    if (!ok) return;

    successText.textContent = `Thanks ${name}! Your request was recorded.`;
    successBox.hidden = false;
    form.reset();
  });
})();

// 8) Public endpoint demo (Gallery page) - robust fallback endpoints
(function coffeeApiDemo() {
  const btn = document.getElementById("loadCoffeeBtn");
  const img = document.getElementById("coffeeImg");
  const status = document.getElementById("coffeeStatus");
  if (!btn || !img || !status) return;

  const sources = [
    () => `https://loremflickr.com/800/500/coffee?lock=${Date.now()}`,
    () => `https://coffee.alexflipnote.dev/random?${Date.now()}`,
    () => `https://picsum.photos/800/500?${Date.now()}`
  ];

  function tryLoad(i) {
    if (i >= sources.length) {
      status.textContent = "All public image sources blocked in this preview.";
      return;
    }

    const url = sources[i]();
    status.textContent = `Loading image (source ${i + 1}/${sources.length})…`;

    const test = new Image();
    test.onload = () => {
      img.src = url;
      status.textContent = "Loaded from public endpoint successfully.";
    };
    test.onerror = () => tryLoad(i + 1);
    test.src = url;
  }

  btn.addEventListener("click", () => tryLoad(0));
  tryLoad(0);
})();
