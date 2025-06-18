// viewer.js
(function () {
  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');

  if (!file) {
    // If no file specified, redirect to index
    window.location.href = 'index.html';
    return;
  }

  fetch(`../${file}`)
    .then((res) => {
      if (!res.ok) {
        // Attempt to fetch from GitHub raw as fallback (for GitHub Pages paths)
        return fetch(
          `https://raw.githubusercontent.com/adonisarun123/travelperk-trebound/main/${file}`
        );
      }
      return res;
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Could not load document');
      }
      return res.text();
    })
    .then((markdown) => {
      const contentEl = document.getElementById('content');
      contentEl.innerHTML = marked.parse(markdown);

      // Build hero from first <h1>
      const firstH1 = contentEl.querySelector('h1');
      if (firstH1) {
        const hero = document.createElement('section');
        hero.className = 'doc-hero';
        hero.innerHTML = `<div class="container"><h1>${firstH1.textContent}</h1></div>`;
        contentEl.prepend(hero);
        firstH1.remove();
      }

      // Syntax highlighting
      if (window.hljs) {
        document.querySelectorAll('pre code').forEach((block) => {
          window.hljs.highlightElement(block);
        });
      }

      // Update document title
      const match = markdown.match(/^#\s+(.*)/m);
      if (match) {
        document.title = match[1];
      }
    })
    .catch((err) => {
      document.getElementById('content').innerHTML = `<p style="color:red; text-align:center; margin-top:2rem;">${err.message}</p>`;
    });
})(); 