(function () {
  window.addEventListener("load", () => {
    const clientTime = performance.now().toFixed(2);
    const el = document.getElementById("clientTime");
    if (el) el.textContent = clientTime;
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