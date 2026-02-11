(function() {
  window.addEventListener("load", function() {
    const loadTime = performance.now().toFixed(2);
    const footer = document.querySelector(".footer");
    if (footer) {
      const stats = document.createElement("p");
      stats.textContent = `загружено за ${loadTime} мс`;
      stats.style.fontSize = "0.9rem";
      stats.style.color = "#555";
      footer.appendChild(stats);
    }

    const currentPage = document.location.pathname.split("/").pop();
    const links = document.querySelectorAll(".nav-a");
    links.forEach(link => {
      if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
      }
    });
  });
})();