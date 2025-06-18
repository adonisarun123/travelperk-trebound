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
      document.getElementById('content').innerHTML = marked.parse(markdown);

      // Update document title based on the first heading
      const match = markdown.match(/^#\s+(.*)/m);
      if (match) {
        document.title = match[1];
      }
    })
    .catch((err) => {
      document.getElementById('content').innerHTML = `<p style="color:red; text-align:center; margin-top:2rem;">${err.message}</p>`;
    });
})(); 