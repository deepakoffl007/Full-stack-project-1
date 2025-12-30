document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     LOAD HEADER
  ========================== */
  fetch("header.html?cache=" + Date.now())
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      const customLink = document.getElementById("custom-link");

      if (customLink) {
        customLink.addEventListener("click", (e) => {
          e.preventDefault();

          /* =========================
             ACTIVE MENU (YELLOW)
          ========================== */
          document
            .querySelectorAll("#main-header nav a")
            .forEach((a) => a.classList.remove("active"));

          customLink.classList.add("active");

          /* =========================
             HIDE HOME CONTENT
          ========================== */
          const home = document.getElementById("home-content");
          if (home) home.style.display = "none";

          /* =========================
             LOAD CUSTOM PAGE
          ========================== */
          fetch("customautomation.html")
            .then((res) => {
              if (!res.ok) throw new Error("Custom page not found");
              return res.text();
            })
            .then((data) => {
              const pageContent = document.getElementById("page-content");
              pageContent.innerHTML = data;
              pageContent.style.display = "block";
            })
            .catch((err) => {
              console.error(err);
              document.getElementById("page-content").innerHTML =
                "<p style='color:red'>Failed to load Custom Automation</p>";
            });
        });
      }
    });
  /* =========================
   LOAD FOOTER
========================== */
  fetch("footer.html?cache=" + Date.now())
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((err) => console.error("Footer load error:", err));

  /* =========================
     HEADER SCROLL EFFECT
  ========================== */
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (!header) return;

    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
fetch("footer.html?cache=" + Date.now())
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });
