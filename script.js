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

