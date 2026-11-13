(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var label = document.getElementById("themeLabel");

  function readSaved() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function save(value) {
    try { localStorage.setItem("theme", value); } catch (e) { /* storage may be blocked */ }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    label.textContent = theme === "dark" ? "Light" : "Dark";
  }

  var saved = readSaved();
  if (saved === "light" || saved === "dark") {
    apply(saved);
  } else {
    apply("dark");
  }

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    save(next);
  });

  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }
})();
