document.documentElement.classList.add("js");

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const activeAnimations = new Set();
function animateElement(element, keyframes, options) {
  if (motionPreference.matches || !element.animate) return;
  const animation = element.animate(keyframes, options);
  activeAnimations.add(animation);
  animation.onfinish = animation.oncancel = () => activeAnimations.delete(animation);
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");
const backgroundRegions = [
  document.querySelector("main"),
  document.querySelector(".site-footer"),
  document.querySelector(".mobile-contact-bar"),
  document.querySelector(".header-contact"),
  document.querySelector(".site-header .brand"),
  document.querySelector(".back-to-top"),
];

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  for (const region of backgroundRegions) region.inert = open;
  scheduleSlide();
}

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenu(open);
  if (open) navigation.querySelector("a").focus();
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
  if (event.target === navigation) {
    setMenu(false);
    menuToggle.focus();
  }
});

document.addEventListener("keydown", (event) => {
  if (menuToggle.getAttribute("aria-expanded") !== "true") return;
  if (event.key === "Escape") {
    setMenu(false);
    menuToggle.focus();
  }
  if (event.key === "Tab") {
    const focusable = [menuToggle, ...navigation.querySelectorAll("a[href]")];
    const index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) {
      event.preventDefault();
      focusable.at(-1).focus();
    } else if (!event.shiftKey && (index === focusable.length - 1 || index === -1)) {
      event.preventDefault();
      menuToggle.focus();
    }
  }
});

document.querySelector("#year").textContent = String(new Date().getFullYear());

const slides = [...document.querySelectorAll(".hero-slide")];
const slideCount = document.querySelector(".slide-count");
const autoplayButton = document.querySelector(".slide-autoplay");
const showcase = document.querySelector(".hero-showcase");
let currentSlide = 0;
let autoplayRequested = !motionPreference.matches;
let showcaseVisible = false;
let pointerOverShowcase = false;
let slideTimer;
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  for (const [slideIndex, slide] of slides.entries()) slide.hidden = slideIndex !== currentSlide;
  slideCount.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}
function scheduleSlide() {
  window.clearTimeout(slideTimer);
  if (!autoplayRequested || motionPreference.matches || document.hidden || !showcaseVisible || pointerOverShowcase || document.body.classList.contains("menu-open") || document.body.classList.contains("dialog-open")) return;
  slideTimer = window.setTimeout(() => {
    showSlide(currentSlide + 1);
    scheduleSlide();
  }, 6000);
}
function setAutoplay(playing) {
  autoplayRequested = playing;
  autoplayButton.textContent = playing ? "Pause slideshow" : "Play slideshow";
  slideCount.setAttribute("aria-live", playing ? "off" : "polite");
  scheduleSlide();
}
document.querySelector(".showcase-controls").hidden = false;
autoplayButton.hidden = motionPreference.matches;
setAutoplay(autoplayRequested);
document.querySelector(".slide-previous").addEventListener("click", () => {
  setAutoplay(false);
  showSlide(currentSlide - 1);
});
document.querySelector(".slide-next").addEventListener("click", () => {
  setAutoplay(false);
  showSlide(currentSlide + 1);
});
autoplayButton.addEventListener("click", () => setAutoplay(!autoplayRequested));
showcase.addEventListener("mouseenter", () => {
  pointerOverShowcase = true;
  scheduleSlide();
});
showcase.addEventListener("mouseleave", () => {
  pointerOverShowcase = false;
  scheduleSlide();
});
showcase.addEventListener("focusin", (event) => {
  if (event.target !== autoplayButton) setAutoplay(false);
});
document.addEventListener("visibilitychange", scheduleSlide);
const showcaseObserver = new IntersectionObserver(([entry]) => {
  showcaseVisible = entry.isIntersecting;
  scheduleSlide();
}, { threshold: .2 });
showcaseObserver.observe(showcase);

const galleryFilters = document.querySelector(".gallery-filters");
const filterButtons = [...document.querySelectorAll(".gallery-filter")];
const projectCards = [...document.querySelectorAll(".project-card")];
const galleryStatus = document.querySelector(".gallery-status");

function filterProjects(category) {
  const selectedButton = filterButtons.find((button) => button.dataset.filter === category);
  if (!selectedButton) throw new Error(`Unknown signage category: ${category}`);
  for (const card of projectCards) {
    for (const animation of card.getAnimations()) animation.cancel();
    card.hidden = category !== "all" && !card.dataset.category.split(" ").includes(category);
  }
  for (const button of filterButtons) button.setAttribute("aria-pressed", String(button === selectedButton));
  const visibleCards = projectCards.filter((card) => !card.hidden);
  const count = visibleCards.length;
  const photos = visibleCards.reduce((total, card) => total + card.querySelectorAll(".project-photo").length, 0);
  galleryStatus.textContent = category === "all"
    ? `Showing all ${count} project galleries · ${photos} photos`
    : `Showing ${count} ${count === 1 ? "project gallery" : "project galleries"} · ${photos} ${photos === 1 ? "photo" : "photos"} · ${selectedButton.textContent.trim()}`;
  visibleCards.forEach((card, index) => {
    card.classList.remove("reveal-pending");
    animateElement(card, [{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }], {
      duration: 450, delay: Math.min(index, 3) * 55, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards",
    });
  });
}

galleryFilters.hidden = false;
galleryFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".gallery-filter");
  if (button) filterProjects(button.dataset.filter);
});
for (const link of document.querySelectorAll("[data-gallery-filter]")) {
  link.addEventListener("click", () => filterProjects(link.dataset.galleryFilter));
}
for (const link of document.querySelectorAll('a[href="#work"]:not([data-gallery-filter])')) {
  link.addEventListener("click", () => filterProjects("all"));
}

const photoDialog = document.querySelector("#project-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogCount = document.querySelector("#dialog-count");
const dialogThumbnails = document.querySelector(".dialog-thumbnails");
const dialogPrevious = document.querySelector(".dialog-previous");
const dialogNext = document.querySelector(".dialog-next");
const dialogOriginal = document.querySelector("#dialog-original");
const dialogPhotoError = document.querySelector("#dialog-photo-error");
let projectPhotos = [];
let projectPhotoIndex = 0;
let photoTrigger;

function showProjectPhoto(index) {
  projectPhotoIndex = (index + projectPhotos.length) % projectPhotos.length;
  const link = projectPhotos[projectPhotoIndex];
  const image = link.querySelector("img");
  dialogPhotoError.hidden = true;
  dialogImage.src = link.href;
  dialogImage.alt = image.alt;
  dialogDescription.textContent = `${image.alt}. Photo from VNR’s Google business updates.`;
  dialogOriginal.href = link.href;
  dialogCount.textContent = `Photo ${projectPhotoIndex + 1} of ${projectPhotos.length}`;
  for (const [position, button] of [...dialogThumbnails.children].entries()) {
    button.setAttribute("aria-pressed", String(position === projectPhotoIndex));
  }
  const activeThumbnail = dialogThumbnails.children[projectPhotoIndex];
  dialogThumbnails.scrollTo({ left: activeThumbnail.offsetLeft - (dialogThumbnails.clientWidth - activeThumbnail.clientWidth) / 2, behavior: "instant" });
}

function openProjectGallery(card, trigger) {
  photoTrigger = trigger;
  projectPhotos = [...card.querySelectorAll(".project-photo")];
  dialogTitle.textContent = card.querySelector("h3").textContent;
  dialogThumbnails.replaceChildren(...projectPhotos.map((photo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `View photo ${index + 1} of ${projectPhotos.length}: ${photo.querySelector("img").alt}`);
    button.setAttribute("aria-controls", "dialog-image");
    const thumbnail = document.createElement("img");
    thumbnail.src = photo.href;
    thumbnail.alt = "";
    thumbnail.loading = "lazy";
    button.append(thumbnail);
    button.addEventListener("click", () => showProjectPhoto(index));
    return button;
  }));
  dialogPrevious.disabled = dialogNext.disabled = projectPhotos.length === 1;
  dialogThumbnails.hidden = projectPhotos.length === 1;
  photoDialog.showModal();
  showProjectPhoto(Math.max(0, projectPhotos.indexOf(trigger)));
  photoDialog.scrollTop = 0;
  document.body.classList.add("dialog-open");
  scheduleSlide();
}

for (const details of document.querySelectorAll(".project-extra-photos")) details.hidden = true;
for (const link of document.querySelectorAll(".project-photo, .project-open, .client-link")) {
  const card = link.classList.contains("client-link")
    ? document.getElementById(link.dataset.clientGallery)
    : link.closest(".project-card");
  if (!card) throw new Error(`Missing project gallery for ${link.getAttribute("href")}`);
  const count = card.querySelectorAll(".project-photo").length;
  link.setAttribute("aria-haspopup", "dialog");
  link.setAttribute("aria-label", `View ${card.querySelector("h3").textContent} gallery: ${count} ${count === 1 ? "photo" : "photos"}`);
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openProjectGallery(card, link);
  });
}

const clientOrbit = document.querySelector(".client-orbit");
const clientOrbitList = document.querySelector(".client-orbit-list");
const clientPageStatus = document.querySelector(".client-page-status");
const compactClientOrbit = window.matchMedia("(max-width: 760px)");
const featuredClientIds = [
  "project-right-events", "project-tata-sierra", "project-jazz-photography",
  "project-pro-express-logistics", "project-praba-reddys", "project-apex-bridge",
  "project-rajambigai-sweets", "project-chef-brothers", "project-hp-petroleum",
  "project-atmen-attire", "project-sri-jeyaprabha", "project-st-antonys-hospital",
];
const clientRanks = new Map(featuredClientIds.map((id, index) => [id, index]));
const clientDirectoryLinks = [...document.querySelectorAll(".client-grid .client-link")].sort((a, b) =>
  (clientRanks.get(a.dataset.clientGallery) ?? clientRanks.size) - (clientRanks.get(b.dataset.clientGallery) ?? clientRanks.size));
let clientPage = 0;
let clientPageSize = compactClientOrbit.matches ? 4 : 12;

function renderClientOrbit() {
  const pageCount = Math.ceil(clientDirectoryLinks.length / clientPageSize);
  clientPage = (clientPage + pageCount) % pageCount;
  const links = clientDirectoryLinks.slice(clientPage * clientPageSize, (clientPage + 1) * clientPageSize);
  const positions = clientPageSize === 4
    ? [[0, -.38], [.38, 0], [0, .38], [-.38, 0]]
    : links.length === 8
      ? [[0, -.2], [.269, -.269], [.2, 0], [.269, .269], [0, .2], [-.269, .269], [-.2, 0], [-.269, -.269]]
      : [[0, -.38], [.205, -.205], [.2, 0], [.38, 0], [.205, .205], [0, .2], [0, .38], [-.205, .205], [-.2, 0], [-.38, 0], [-.205, -.205], [0, -.2]];
  const ratio = clientOrbit.clientWidth / clientOrbit.clientHeight;
  clientOrbitList.replaceChildren(...links.map((source, index) => {
    const item = document.createElement("li");
    item.style.setProperty("--orbit-x", `${50 + positions[index][0] * 100}%`);
    item.style.setProperty("--orbit-y", `${50 + positions[index][1] * 100 * ratio}%`);
    const link = source.cloneNode(true);
    link.className = "client-orbit-link";
    link.querySelector(".client-arrow").remove();
    item.append(link);
    return item;
  }));
  clientPageStatus.textContent = `${String(clientPage + 1).padStart(2, "0")} / ${String(pageCount).padStart(2, "0")}`;
  clientOrbitList.setAttribute("aria-label", `Client project galleries, page ${clientPage + 1} of ${pageCount}`);
  animateElement(clientOrbitList, [{ opacity: .2 }, { opacity: 1 }], { duration: 420, easing: "ease-out" });
}

clientOrbitList.addEventListener("click", (event) => {
  const link = event.target.closest(".client-orbit-link");
  if (!link) return;
  event.preventDefault();
  const card = document.getElementById(link.dataset.clientGallery);
  if (!card) throw new Error(`Missing client project gallery: ${link.dataset.clientGallery}`);
  openProjectGallery(card, link);
});
document.querySelector(".client-previous").addEventListener("click", () => {
  clientPage--;
  renderClientOrbit();
});
document.querySelector(".client-next").addEventListener("click", () => {
  clientPage++;
  renderClientOrbit();
});
compactClientOrbit.addEventListener("change", () => {
  const firstClient = clientPage * clientPageSize;
  clientPageSize = compactClientOrbit.matches ? 4 : 12;
  clientPage = Math.floor(firstClient / clientPageSize);
  renderClientOrbit();
});
document.querySelector(".client-orbit-controls").hidden = false;
renderClientOrbit();

dialogPrevious.addEventListener("click", () => showProjectPhoto(projectPhotoIndex - 1));
dialogNext.addEventListener("click", () => showProjectPhoto(projectPhotoIndex + 1));
photoDialog.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showProjectPhoto(projectPhotoIndex + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
dialogImage.addEventListener("error", () => {
  dialogPhotoError.hidden = false;
  console.error("Project photo failed to load:", dialogImage.src);
});
document.querySelector(".dialog-close").addEventListener("click", () => photoDialog.close());
photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) photoDialog.close();
});
photoDialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  photoTrigger?.focus({ preventScroll: true });
  scheduleSlide();
});

const sectionLinks = [...navigation.querySelectorAll(".nav-main a")];
const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    for (const link of sectionLinks) {
      if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }
}, { rootMargin: "-10% 0px -65% 0px" });
for (const link of sectionLinks) sectionObserver.observe(document.querySelector(link.hash));

const briefForm = document.querySelector(".brief-form");
const briefResult = document.querySelector(".brief-result");
const briefText = briefForm.elements.namedItem("result");
const briefStatus = document.querySelector(".brief-status");
briefForm.hidden = false;
briefForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(briefForm);
  briefText.value = [
    "SIGNAGE PROJECT BRIEF — VNR",
    `Business / project: ${data.get("business").trim()}`,
    `Signage: ${data.get("category")}`,
    data.get("dimensions").trim() && `Dimensions: ${data.get("dimensions").trim()}`,
    data.get("location").trim() && `Location: ${data.get("location").trim()}`,
    data.get("notes").trim() && `Notes: ${data.get("notes").trim()}`,
  ].filter(Boolean).join("\n");
  briefResult.hidden = false;
  briefStatus.textContent = "Brief created on this device only. Nothing has been sent to VNR.";
  animateElement(briefResult, [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 350 });
  briefText.focus();
});
document.querySelector(".copy-brief").addEventListener("click", async () => {
  briefText.focus();
  briefText.select();
  if (!navigator.clipboard?.writeText) {
    briefStatus.textContent = "Automatic copying is unavailable in this browser. Your brief is selected; use your device’s Copy command.";
    return;
  }
  try {
    await navigator.clipboard.writeText(briefText.value);
    briefStatus.textContent = "Brief copied. Keep it ready when you call VNR. Nothing has been sent automatically.";
  } catch (error) {
    console.warn("Clipboard access was denied.", error);
    briefStatus.textContent = "Your browser blocked clipboard access. Your brief is selected; use your device’s Copy command.";
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const element = entry.target;
    if (!element.classList.contains("reveal-pending")) {
      revealObserver.unobserve(element);
      continue;
    }
    element.classList.remove("reveal-pending");
    animateElement(element, [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }], {
      duration: 700, delay: Number(element.dataset.revealDelay), easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards",
    });
    revealObserver.unobserve(element);
  }
}, { threshold: .08, rootMargin: "0px 0px -25px 0px" });

if (!motionPreference.matches && Element.prototype.animate) {
  const targets = document.querySelectorAll(".section-heading > *, .about > .container > .eyebrow, .about h2, .about-body > *, .project-names, .service-card, .project-card, .client-grid > li, .process-item, .review-card, .faq-layout > div:first-child, .faq-list details, .contact-copy, .contact-panel, .brief-form");
  for (const element of targets) {
    if (element.getBoundingClientRect().top < window.innerHeight * .95) continue;
    const siblings = [...element.parentElement.children];
    element.dataset.revealDelay = String((siblings.indexOf(element) % 4) * 65);
    element.classList.add("reveal-pending");
    revealObserver.observe(element);
  }
}

for (const card of document.querySelectorAll(".service-card")) {
  card.addEventListener("pointermove", (event) => {
    if (motionPreference.matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - y) * 2.5}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 2.5}deg`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
}

motionPreference.addEventListener("change", (event) => {
  autoplayButton.hidden = event.matches;
  if (!event.matches) return;
  setAutoplay(false);
  for (const animation of activeAnimations) animation.cancel();
  for (const element of document.querySelectorAll(".reveal-pending")) element.classList.remove("reveal-pending");
  revealObserver.disconnect();
});

const progress = document.querySelector(".scroll-progress");
let scrollFramePending = false;
function updateScrollProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
  progress.style.transform = `scaleX(${fraction})`;
  scrollFramePending = false;
}
window.addEventListener("scroll", () => {
  if (scrollFramePending) return;
  scrollFramePending = true;
  window.requestAnimationFrame(updateScrollProgress);
}, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

const backToTop = document.querySelector(".back-to-top");
const heroObserver = new IntersectionObserver(([entry]) => {
  backToTop.hidden = entry.isIntersecting;
});
heroObserver.observe(document.querySelector(".hero"));
