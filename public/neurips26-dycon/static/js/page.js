// DyCon project page: copy-citation button and TOC scroll-spy.
(function () {
  "use strict";

  const COPY_RESET_MS = 1600;

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for non-secure contexts (e.g. LAN preview over http).
    return new Promise(function (resolve, reject) {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      if (ok) {
        resolve();
      } else {
        reject(new Error("execCommand copy failed"));
      }
    });
  }

  function setupCopyButtons() {
    document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
      const target = document.getElementById(btn.dataset.copyTarget);
      if (!target) return;
      const label = btn.textContent;
      btn.addEventListener("click", function () {
        copyText(target.textContent.trim())
          .then(function () {
            btn.textContent = "Copied";
          })
          .catch(function (err) {
            console.error("Copy failed:", err);
            btn.textContent = "Select and copy";
          })
          .finally(function () {
            setTimeout(function () {
              btn.textContent = label;
            }, COPY_RESET_MS);
          });
      });
    });
  }

  function setupScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll(".toc a[href^='#']"));
    const byId = new Map(
      links.map(function (a) {
        return [a.getAttribute("href").slice(1), a];
      }),
    );
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.remove("is-active");
          });
          const active = byId.get(entry.target.id);
          if (active) active.classList.add("is-active");
        });
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    byId.forEach(function (_link, id) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  setupCopyButtons();
  setupScrollSpy();
})();
