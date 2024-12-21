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
  // List of files in the directory (manually added for now)
  const files = ["README.md", "index.html"]; // Add more filenames as needed

  const fileList = document.getElementById("file-list");
  const fileContent = document.getElementById("file-content");

  // Populate the sidebar with file links
  files.forEach((file) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = file;
    a.href = "#"; // Prevent default navigation
    a.className = "file-name";
    a.dataset.file = file; // Store the file name
    li.appendChild(a);
    fileList.appendChild(li);
  });

  // Handle file click to load content
  fileList.addEventListener("click", (event) => {
    event.preventDefault();

    const target = event.target;
    if (target.tagName === "A") {
      const fileName = target.dataset.file;

      // Fetch the file content dynamically
      fetch(fileName + "?t=" + new Date().getTime()) // Cache-busting query parameter
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`Error loading file: ${fileName}`);
          }
        })
        .then((content) => {
          // Display content in the right-hand content area
          fileContent.innerHTML = `<pre>${content}</pre>`;
        })
        .catch((error) => {
          fileContent.innerHTML = `<p>${error.message}</p>`;
        });
    }
  });
});
