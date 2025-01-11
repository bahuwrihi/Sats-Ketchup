// Update with your repo details
const repoUrl = "https://api.github.com/repos/bahuwrihi/Sats-Ketchup/contents";

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");
  const resizer = document.getElementById("resizer");

  // Handle Resizing
  let isResizing = false;

  resizer.addEventListener("mousedown", (e) => {
    isResizing = true;
    document.body.style.cursor = "ew-resize";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const sidebarWidth = e.clientX;
    sidebar.style.width = `${sidebarWidth}px`;
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
    document.body.style.cursor = "default";
  });

  // Fetch GitHub Files
  const fetchGitHubFiles = async () => {
    try {
      const response = await fetch(repoUrl);
      if (!response.ok) throw new Error("Failed to fetch repository contents");
      const files = await response.json();
      const fileList = document.getElementById("file-list");

      files.forEach((file) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <span>${file.name}</span>
          <span>${file.type}</span>
        `;
        listItem.addEventListener("click", () => loadFileContent(file.download_url));
        fileList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching GitHub files:", error);
    }
  };

  // Load File Content
  const loadFileContent = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Failed to fetch file content");
      const text = await response.text();
      const fileContent = document.getElementById("file-content");
      fileContent.textContent = text;
    } catch (error) {
      console.error("Error loading file content:", error);
    }
  };

  // Initial Load
  fetchGitHubFiles();
});
