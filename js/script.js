const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
      siteNav.classList.remove("is-open");
    });
  });
}

const workPreviews = document.querySelectorAll(".work-preview");
const resizePreview = (preview) => {
  const frame = preview.querySelector("iframe");
  if (!frame) return;
  const scale = preview.clientWidth / 1440;
  preview.style.setProperty("--preview-scale", String(scale));
};

if ("ResizeObserver" in window) {
  const previewObserver = new ResizeObserver((entries) => {
    entries.forEach(({ target }) => resizePreview(target));
  });
  workPreviews.forEach((preview) => previewObserver.observe(preview));
} else {
  workPreviews.forEach(resizePreview);
  window.addEventListener("resize", () => workPreviews.forEach(resizePreview));
}

const drawingDialog = document.querySelector(".drawing-lightbox");
if (drawingDialog) {
  const dialogImage = drawingDialog.querySelector("img");
  document.querySelectorAll(".drawing-zoom").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      dialogImage.src = link.dataset.image;
      dialogImage.alt = link.querySelector("img")?.alt || "建築図面";
      drawingDialog.showModal();
    });
  });
  drawingDialog.querySelector(".drawing-lightbox-close").addEventListener("click", () => drawingDialog.close());
  drawingDialog.addEventListener("click", (event) => {
    if (event.target === drawingDialog) drawingDialog.close();
  });
  drawingDialog.addEventListener("close", () => { dialogImage.src = ""; });
}
// Discourage direct image saving and dragging in the drawing archive.
document.querySelectorAll(".drawing-zoom img, .drawing-lightbox img").forEach((image) => {
  image.addEventListener("contextmenu", (event) => event.preventDefault());
  image.addEventListener("dragstart", (event) => event.preventDefault());
  image.draggable = false;
});