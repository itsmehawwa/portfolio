const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxMedium = document.getElementById("lightbox-medium");
const closeBtn = lightbox?.querySelector(".lightbox-close");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

document.getElementById("year") &&
  (document.getElementById("year").textContent = new Date().getFullYear());

const personalName = document.getElementById("personal-name");
const logo = document.querySelector(".logo");

const LOGO_INTERACTIVE_THRESHOLD = 0.05;

function getLogoScrollProgress(rect) {
  if (rect.height <= 0) return 0;

  if (rect.top >= 0) return 0;
  if (rect.bottom <= 0) return 1;

  return Math.min(1, Math.max(0, -rect.top / rect.height));
}

function updateHeaderLogo() {
  if (!personalName || !logo) return;

  const rect = personalName.getBoundingClientRect();
  const progress = getLogoScrollProgress(rect);

  logo.style.setProperty("--logo-progress", String(progress));

  const isInteractive = progress > LOGO_INTERACTIVE_THRESHOLD;
  logo.setAttribute("aria-hidden", String(!isInteractive));
  logo.tabIndex = isInteractive ? 0 : -1;
  logo.style.pointerEvents = isInteractive ? "" : "none";
}

if (personalName && logo) {
  let ticking = false;

  const onScrollOrResize = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateHeaderLogo();
      ticking = false;
    });
  };

  updateHeaderLogo();
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  window.addEventListener("load", updateHeaderLogo);
  document.fonts?.ready.then(updateHeaderLogo);
}

document.querySelectorAll(".gallery-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const img = trigger.querySelector("img");
    if (!lightbox || !img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = trigger.dataset.title || "";
    lightboxMedium.textContent = trigger.dataset.medium || "";
    lightbox.showModal();
  });
});

closeBtn?.addEventListener("click", () => lightbox.close());

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});

lightbox?.addEventListener("close", () => {
  lightboxImg.src = "";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox?.open) lightbox.close();
});

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
  mobileNav.hidden = expanded;
  mobileNav.classList.toggle("is-open", !expanded);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileNav.hidden = true;
    mobileNav.classList.remove("is-open");
  });
});
