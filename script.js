
const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

// Mobil menyu
const menuBtn = $("#menuBtn");
const nav = $("#nav");

menuBtn.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");

  menuBtn.textContent = opened ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(opened));
  menuBtn.setAttribute(
    "aria-label",
    opened ? "Menyuni yopish" : "Menyuni ochish"
  );
});

// Menyu havolasini bosganda menyuni yopish
$$(".navbar nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Scroll orqali elementlarni paydo qilish
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// Raqamlarni animatsiya bilan oshirish
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const element = entry.target;
    const target = Number(element.dataset.count);
    const duration = 1200;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.5 });

$$("[data-count]").forEach(element => {
  counterObserver.observe(element);
});

// Bildirishnoma
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

$("#demoBtn").addEventListener("click", () => {
  showToast(
    "NEXORA tajribasiga xush kelibsiz! Imkoniyatlarni kashf etish uchun pastga tushing."
  );
});

$("#startBtn").addEventListener("click", () => {
  showToast(
    "Ajoyib! Kelajakni yaratish birinchi qadamingizdan boshlanadi."
  );
});

// Sichqoncha harakati bilan 3D orbni boshqarish
const heroArt = $(".hero-art");
const core = $(".ai-core");

if (window.matchMedia("(pointer: fine)").matches) {
  heroArt.addEventListener("pointermove", event => {
    const rect = heroArt.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    core.style.transform =
      `rotateX(${12 - y * 15}deg) rotateY(${x * 18}deg)`;
  });

  heroArt.addEventListener("pointerleave", () => {
    core.style.transform = "";
  });
}