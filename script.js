document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     LOAD HEADER
  ========================== */
  fetch("header.html?cache=" + Date.now())
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("header-placeholder").innerHTML = html;
      initHeaderLogic();
    })
    .catch((err) => console.error("Header load error:", err));

  /* =========================
     LOAD FOOTER
  ========================== */
  fetch("footer.html?cache=" + Date.now())
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer-placeholder").innerHTML = html;
    })
    .catch((err) => console.error("Footer load error:", err));
});

/* =========================
   HEADER + NAV LOGIC
========================== */
function initHeaderLogic() {
  const navLinks = document.querySelectorAll("#nav-menu a");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const overlay = document.getElementById("menu-overlay");

  /* =========================
     NAV CLICK (ALL PAGES)
  ========================== */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const page = link.dataset.page;
      if (!page) return;

      // ACTIVE MENU
      navLinks.forEach((a) => a.classList.remove("active"));
      link.classList.add("active");

      // HIDE HOME
      const home = document.getElementById("home-content");
      if (home) home.style.display = "none";

      // LOAD PAGE
      fetch(page)
        .then((res) => {
          if (!res.ok) throw new Error("Page not found");
          return res.text();
        })
        .then((html) => {
          const pageContent = document.getElementById("page-content");
          pageContent.innerHTML = html;
          pageContent.style.display = "block";

          // INIT SLIDER IF PRESENT
          initSlider(pageContent);
        })
        .catch(() => {
          document.getElementById("page-content").innerHTML =
            "<p style='color:red'>Failed to load page</p>";
        });

      closeMobileMenu();
    });
  });

  /* =========================
     MOBILE MENU
  ========================== */
  function openMobileMenu() {
    navMenu.classList.add("active");
    hamburger.classList.add("active");
    overlay.classList.add("active");
  }

  function closeMobileMenu() {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
  }

  hamburger.addEventListener("click", () => {
    navMenu.classList.contains("active") ? closeMobileMenu() : openMobileMenu();
  });

  overlay.addEventListener("click", closeMobileMenu);

  /* =========================
     HEADER SCROLL EFFECT
  ========================== */
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (!header) return;

    window.scrollY > 80
      ? header.classList.add("scrolled")
      : header.classList.remove("scrolled");
  });
}

/* =========================
   UNIVERSAL SLIDER (DOTS)
========================== */
function initSlider(container) {
  const slides = container.querySelectorAll(".slide");
  const dotsContainer = container.querySelector(".dots");

  if (!slides.length || !dotsContainer) return;

  let index = 0;
  let interval;

  dotsContainer.innerHTML = "";

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      showSlide(i);
      resetAutoSlide();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function showSlide(i) {
    slides[index].classList.remove("active");
    dots[index].classList.remove("active");

    index = i;

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function autoSlide() {
    showSlide((index + 1) % slides.length);
  }

  function resetAutoSlide() {
    clearInterval(interval);
    interval = setInterval(autoSlide, 3000);
  }

  interval = setInterval(autoSlide, 3000);
}

