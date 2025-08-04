// canvas.on("object:modified", (e) => {
//   const obj = e.target;

//   // Only proceed if it's not already deselected
//   if (obj && obj.id === "target-image") {
//     // Use setTimeout to defer the discard and avoid recursion
//     setTimeout(() => {
//       canvas.discardActiveObject();
//       canvas.requestRenderAll();
//     }, 0);
//   }
// });
canvas.on("selection:cleared", (e) => {
  const targetImage = canvas
    .getObjects()
    .find((obj) => obj.id === "pupil-image");
  if (targetImage) {
    canvas.remove(targetImage);
    canvas.insertAt(1, targetImage); // or any index you want
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }

  // if (obj.left < 0) {
  //   obj.left =0; // snap back to 0 if it goes past the left edge
  // }
  // if (obj.left > 310) {
  //   obj.left = 310; // snap back to 0 if it goes past the left edge
  // }

  // if (obj.top < 0) {
  //   obj.top = 0; // snap back to 0 if it goes past the left edge
  // }
  // // Calculate bottom edge
  // const bottom = obj.top + obj.getScaledHeight();
  // if (bottom > 310) {
  //   obj.top = 310 - obj.getScaledHeight();
  // }
});

//drag and drop
canvas.upperCanvasEl.addEventListener("dragover", (e) => {
  e.preventDefault();
});

canvas.upperCanvasEl.addEventListener("drop", (e) => {
  e.preventDefault();

  // Get dragged image element from browser
  const imgElement = Array.from(e.dataTransfer.items)
    .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
    .map((item) => item.getAsFile())[0];

  if (imgElement) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      const pointer = canvas.getPointer(e);
      img.onload = () => {
        const fabricImg = new FabricImage(img, {
          left: pointer.x,
          top: pointer.y,
          selectable: true,
          evented: true,
          originX: "center",
          originY: "center",
        });

        fabricImg.scaleToWidth(138);
        fabricImg.scaleToHeight(106);

        canvas.add(fabricImg);
        // canvas.insertAt(0, fabricImg);
        canvas.requestRenderAll();
      };
    };
    reader.readAsDataURL(imgElement);
  }
});

// canvas.on("selection:cleared", () => {
//   // Move pupil image (if exists) to index 1
//   const targetImage = canvas
//     .getObjects()
//     .find((obj) => obj.id === "pupil-image");
//   if (targetImage) {
//     canvas.remove(targetImage);
//     canvas.insertAt(1, targetImage);
//     canvas.discardActiveObject();
//     canvas.requestRenderAll();
//   }
// });

fileA4Input.addEventListener("change", function () {
  const files = this.files;
  if (!files || files.length === 0) return;

  const imgWidth = 450;
  const imgHeight = 350; // estimate for spacing, but images will auto-scale
  const spacingX = 30;
  const spacingY = 30;
  const cols = 2;
  const marginTop = 30;

  const totalRowWidth = imgWidth * cols + spacingX * (cols - 1);
  const startX = (canvasA4.width - totalRowWidth) / 2;

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgEl = new Image();
      imgEl.src = e.target.result;
      const blobUrl = URL.createObjectURL(file);
      // ✅ Create a hidden <img> element
      const hiddenImg = document.createElement("img");
      hiddenImg.src = blobUrl;
      hiddenContainer.appendChild(hiddenImg);
      uploadedImageSrcs.push(blobUrl);
      var imagesContainer = document.querySelectorAll("div img");
      imgEl.onload = () => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const left = startX + col * (imgWidth + spacingX);
        const top = marginTop + row * (imgHeight + spacingY);

        const img = new FabricImage(imgEl, {
          selectable: true,
          evented: true,
          left: left,
          top: top,
          borderColor: "black",
        });

        img.scaleToWidth(imgWidth);
        canvasA4.add(img);
        canvasA4.requestRenderAll();
      };
    };
    reader.readAsDataURL(file);
  });
});

const uploadInput = document.getElementById("a4upload");
const exportBtn = document.getElementById("a4export");
let uploadedImages = [];

uploadInput.addEventListener("change", function () {
  const files = Array.from(this.files);
  uploadedImages = [];

  files.forEach((file) => {
    const url = URL.createObjectURL(file);
    uploadedImages.push(url);
  });

  alert(`${uploadedImages.length} images ready for export`);
});

exportBtn.addEventListener("click", async function () {
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // 841.89
  const pageHeight = pdf.internal.pageSize.getHeight(); // 595.28

  const cellWidth = 350;
  const cellHeight = 250;
  const spacingX = 40;
  const spacingY = 30;
  const marginX = (pageWidth - (2 * cellWidth + spacingX)) / 2;
  const marginY = (pageHeight - (2 * cellHeight + spacingY)) / 2;

  for (let i = 0; i < uploadedImages.length; i += 4) {
    if (i !== 0) pdf.addPage();

    const batch = uploadedImages.slice(i, i + 4);

    for (let j = 0; j < batch.length; j++) {
      const imgSrc = batch[j];
      const img = new Image();
      img.src = imgSrc;

      await new Promise((resolve) => {
        img.onload = () => {
          const col = j % 2;
          const row = Math.floor(j / 2);

          const x = marginX + col * (cellWidth + spacingX);
          const y = marginY + row * (cellHeight + spacingY);

          // Resize image to fit in cell while preserving aspect ratio
          let imgW = img.naturalWidth;
          let imgH = img.naturalHeight;
          const scale = Math.min(cellWidth / imgW, cellHeight / imgH);
          imgW *= scale;
          imgH *= scale;

          const offsetX = (cellWidth - imgW) / 2;
          const offsetY = (cellHeight - imgH) / 2;

          pdf.addImage(img, "PNG", x + offsetX, y + offsetY, imgW, imgH);
          resolve();
        };
      });
    }
  }

  pdf.save("images-4-per-page.pdf");
});
