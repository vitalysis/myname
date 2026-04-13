const sections = document.querySelectorAll('section');
const sideLinks = document.querySelectorAll('.side-content a');

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      sideLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});


// ================= SEARCH =================
document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const toggleSearch = document.getElementById("toggle-search");

  if (!searchInput || !searchResults) return;

  const pages = [
    { title: "Breast Lumps Overview", url: "index.html#overview" },
    { title: "Healthfirst Overview", url: "healthfirst.html#overview" },
    { title: "Healthfirst mission", url: "healthfirst.html#mission" },
    { title: "Learning Resources", url: "educational.html#learning-resources" },
    { title: "Educational focus", url: "educational.html#educational focus" },
    { title: "Research Articles", url: "research.html#articles" },
    { title: "Research Studies", url: "research.html#studies" }
  ];

  function closeSearch() {
    searchResults.classList.remove("show");
    searchResults.innerHTML = "";
    if (toggleSearch) toggleSearch.checked = false;
  }

  // ===== typing search =====
  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    searchResults.innerHTML = "";

    if (!query) {
      searchResults.classList.remove("show");
      return;
    }

    const matches = pages.filter(p =>
      p.title.toLowerCase().includes(query)
    );

    matches.forEach(page => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${page.url}">${page.title}</a>`;
      searchResults.appendChild(li);
    });

    if (matches.length > 0) {
      searchResults.classList.add("show");
    } else {
      searchResults.classList.remove("show");
    }
  });

  // ===== click result =====
  searchResults.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;

    window.location.href = link.href;
    closeSearch();
  });

  // ===== mobile toggle =====
  if (toggleSearch) {
    toggleSearch.addEventListener("change", function () {
      if (!this.checked) {
        closeSearch();
      } else {
        searchInput.focus();
      }
    });
  }

  // ===== click outside =====
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-box")) {
      closeSearch();
    }
  });

});
