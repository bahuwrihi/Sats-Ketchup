// Example folder structure (you can replace this with API calls to fetch real data)
const folderStructure = {
  "Folder 1": {
    "File 1.1": "This is the content of File 1.1",
    "File 1.2": "This is the content of File 1.2",
  },
  "Folder 2": {
    "File 2.1": "This is the content of File 2.1",
    "File 2.2": "This is the content of File 2.2",
  },
};

// Function to build the folder structure
function buildFileTree(structure, parentElement) {
  for (const key in structure) {
    const li = document.createElement("li");
    li.textContent = key;
    parentElement.appendChild(li);

    if (typeof structure[key] === "object") {
      const ul = document.createElement("ul");
      li.appendChild(ul);
      buildFileTree(structure[key], ul);
    } else {
      li.addEventListener("click", () => {
        document.getElementById("content").innerHTML = `<h1>${key}</h1><p>${structure[key]}</p>`;
      });
    }
  }
}

// Initialize the file tree
const fileTreeElement = document.getElementById("file-tree");
buildFileTree(folderStructure, fileTreeElement);

// Handle the draggable divider
const divider = document.getElementById("divider");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

let isDragging = false;

divider.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.body.style.cursor = "ew-resize";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const containerRect = document.querySelector(".container").getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;

    // Set minimum and maximum widths for the sidebar
    if (newWidth > 100 && newWidth < containerRect.width - 100) {
      sidebar.style.width = `${newWidth}px`;
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "default";
});
