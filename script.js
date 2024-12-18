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
