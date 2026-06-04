const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxMedium = document.getElementById("lightbox-medium");
const closeBtn = lightbox?.querySelector(".lightbox-close");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

document.getElementById("year").textContent = new Date().getFullYear();

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
