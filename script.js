document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     LOAD HEADER
  ========================== */
  fetch("header.html?cache=" + Date.now())
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // HEADER ELEMENTS (AFTER LOAD)
      const customLink = document.getElementById("custom-link");
      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("nav-menu");
      const overlay = document.getElementById("menu-overlay");

      /* =========================
         CUSTOM AUTOMATION CLICK
      ========================== */
      if (customLink) {
        customLink.addEventListener("click", (e) => {
          e.preventDefault();

          // ACTIVE MENU STATE
          document
            .querySelectorAll("#main-header nav a")
            .forEach((a) => a.classList.remove("active"));
          customLink.classList.add("active");

          // HIDE HOME CONTENT
          const home = document.getElementById("home-content");
          if (home) home.style.display = "none";

          // LOAD CUSTOM PAGE
          fetch("customautomation.html")
            .then((res) => {
              if (!res.ok) throw new Error("Custom page not found");
              return res.text();
            })
            .then((html) => {
              const pageContent = document.getElementById("page-content");
              pageContent.innerHTML = html;
              pageContent.style.display = "block";
            })
            .catch(() => {
              document.getElementById("page-content").innerHTML =
                "<p style='color:red'>Failed to load Custom Automation</p>";
            });

          // CLOSE MOBILE MENU IF OPEN
          closeMobileMenu();
        });
      }

      /* =========================
         MOBILE HAMBURGER MENU
      ========================== */
      function openMobileMenu() {
        navMenu.classList.add("active");
        hamburger.classList.add("active");
        if (overlay) overlay.classList.add("active");
      }

      function closeMobileMenu() {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
      }

      if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
          navMenu.classList.contains("active")
            ? closeMobileMenu()
            : openMobileMenu();
        });

        // CLOSE MENU WHEN ANY NAV LINK IS CLICKED
        navMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", closeMobileMenu);
        });
      }

      // CLOSE MENU WHEN OVERLAY IS CLICKED
      if (overlay) {
        overlay.addEventListener("click", closeMobileMenu);
      }

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
    })
    .catch((err) => console.error("Header load error:", err));

  /* =========================
     LOAD FOOTER
  ========================== */
  fetch("footer.html?cache=" + Date.now())
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((err) => console.error("Footer load error:", err));
});
