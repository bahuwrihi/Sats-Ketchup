document.addEventListener("DOMContentLoaded", function () {
  const fileList = document.getElementById("file-list");
  const fileContent = document.getElementById("file-content");

  // Your GitHub repository details
  const owner = "bahuwrihi"; // GitHub username
  const repo = "Sats-Ketchup"; // Repository name
  const branch = "main"; // Branch name

  // Fetch the file list from GitHub API
  fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch file list from GitHub API.");
      }
      return response.json();
    })
    .then((data) => {
      const files = data.tree.filter((item) => item.type === "blob"); // Filter only files
      files.forEach((file) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = file.path;
        a.href = "#";
        a.className = "file-name";
        a.dataset.file = file.path; // Store the file path
        li.appendChild(a);
        fileList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error(error);
      fileContent.innerHTML = `<p>Error: Could not load file list.</p>`;
    });

  // Handle file click to load content
  fileList.addEventListener("click", (event) => {
    event.preventDefault();

    const target = event.target;
    if (target.tagName === "A") {
      const filePath = target.dataset.file;

      // Fetch the file content dynamically from the raw GitHub URL
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
      fetch(rawUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error loading file: ${filePath}`);
          }
          return response.text();
        })
        .then((content) => {
          fileContent.innerHTML = `<pre>${content}</pre>`; // Display content as preformatted text
        })
        .catch((error) => {
          console.error(error);
          fileContent.innerHTML = `<p>Error: Could not load file content.</p>`;
        });
    }
  });
});
