document.addEventListener("DOMContentLoaded", () => {
  // LOAD HEADER
  fetch("header.html")
    .then((res) => {
      if (!res.ok) {
        throw new Error("header.html not found");
      }
      return res.text();
    })
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch((err) => console.error("Header load error:", err));

  // HEADER COLOR CHANGE
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (!header) return;

    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // SLIDER
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000);
});
fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });