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

    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    const links = document.querySelectorAll(".nav-a");
    links.forEach(link => {
      const linkPath = link.pathname;
      const linkHash = link.hash;
      if (linkPath === currentPath && (linkHash === "" || linkHash === currentHash)) {
        link.classList.add("active");
      }
    });
  });
})();