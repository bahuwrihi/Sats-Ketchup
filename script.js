// Handle the draggable divider
const divider = document.getElementById("divider");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

let isDragging = false;

divider.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.body.style.cursor = "ew-resize";
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
  if (!isDragging) return;

  const containerRect = document.querySelector(".container").getBoundingClientRect();
  const newWidth = e.clientX - containerRect.left;

  // Set minimum and maximum widths for the sidebar
  if (newWidth > 150 && newWidth < containerRect.width - 150) {
    sidebar.style.width = `${newWidth}px`;
  }
}

function onMouseUp() {
  isDragging = false;
  document.body.style.cursor = "default";
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

// Handle file listing and dynamic content loading
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

        // File name
        const fileName = document.createElement("span");
        fileName.className = "file-name";
        fileName.textContent = file.path;

        // Placeholder details for now
        const fileInfo = document.createElement("span");
        fileInfo.className = "file-info";
        fileInfo.textContent = "Last updated by Author";

        li.appendChild(fileName);
        li.appendChild(fileInfo);
        li.dataset.file = file.path;
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

    const target = event.target.closest("li");
    if (target) {
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
