import {
  Canvas,
  Textbox,
  Rect,
  Image as FabricImage,
} from "https://cdn.jsdelivr.net/npm/fabric@6.7.1/+esm";

window.addEventListener("DOMContentLoaded", async () => {
  let currentIndex = 0;
  const canvas = new Canvas("canvas", {
    preserveObjectStacking: true,
    selection: false,
  });

  // download =================

  const download = document.querySelector("#download");

  download.addEventListener("click", () => {
    // canvas.requestRenderAll(); // ensure canvas is rendered

    const dataURL = canvas.toDataURL({
      format: "png", // use PNG for better reliability
      quality: 1,
      multiplier: 2,
    });
    var obj = getObjectById("fullName");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = obj.text + ".png";
    a.click();
  });

  // upload pupil image  ===============

  const fileInput = document.getElementById("upload");

  fileInput.addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const imgEl = new Image();
      imgEl.src = e.target.result;
      // ✅ Remove existing object with ID 'pupil-image'
      const existing = canvas
        .getObjects()
        .find((obj) => obj.id === "pupil-image");
      if (existing) canvas.remove(existing);
      imgEl.onload = () => {
        var img = new FabricImage(imgEl, {
          selectable: true,
          evented: true,
          left: 148,
          top: 148,
          borderColor: "black", // 🖤 selection border color
        });

        img.scaleToWidth(145);
        // img.scaleToHeight(100);

        // ✅ Define a static clip path at fixed position on canvas
        var clipRect = new Rect({
          width: 145,
          height: 135,
          left: 148,
          top: 148,
          originX: "left", // anchor to the left
          absolutePositioned: true, // 🔒 keeps it fixed on the canvas
          borderColor: "black", // 🖤 selection border color
        });

        img.clipPath = clipRect;
        img.id = "pupil-image";
        // removeControl(img);
        changeStyleControl(img);

        canvas.add(img);
        canvas.remove(img);
        canvas.insertAt(1, img);
        canvas.requestRenderAll();
      };
    };
    reader.readAsDataURL(file);
  });

  //load id template

  let template = document.querySelector("#id-template").src;
  var imgEl = new Image();
  imgEl.src = template;
  imgEl.onload = () => {
    var img = new FabricImage(imgEl, {
      selectable: false,
      evented: false,
      left: -0.25,
      top: -0.25,
      stroke: "black", // ✅ border color
      strokeWidth: 1, // ✅ border thickness
      objectCaching: false, // ✅ fixes visual issues with stroke sometimes
      lockMovementX: true, // 🔒 prevent dragging
      lockMovementY: true,
      lockRotation: true, // 🔒 prevent rotating
      lockScalingX: true, // 🔒 prevent resizing
      lockScalingY: true,
    });

    img.scaleToWidth(638);
    img.scaleToHeight(506);

    canvas.add(img);
    canvas.remove(img);
    canvas.insertAt(0, img); // or any index you want
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };
  // textbox =============================
  var fullName = new Textbox("Dawn Andrew N. Rivero", {
    left: 159.5,
    top: 315,
    width: 300,
    fontSize: 24,
    fontFamily: "Roboto", // 👈 apply the custom font
    fill: "black",
    borderColor: "black", // 🖤 selection border color
    textAlign: "center",
    fontWeight: "bold", // ✅ makes text bold

    lockMovementX: true, // 🔒 prevent dragging
    // lockMovementY: true,
    lockRotation: true, // 🔒 prevent rotating
    // lockScalingX: true, // 🔒 prevent resizing
    lockScalingY: true,
    originX: "center", // anchor to the left
    centeredScaling: true, // disable center-based scaling
  });
  fullName.id = "fullName";
  removeControl(fullName);
  changeStyleControl(fullName);
  canvas.add(fullName);

  var LRN = new Textbox("00000000000", {
    left: 186,
    top: 286,
    width: 100,
    fontSize: 16,
    fill: "black",
    fontFamily: "Roboto", // 👈 apply the custom font
    borderColor: "black", // 🖤 selection border color
    textAlign: "left",
    fontWeight: "bold", // ✅ makes text bold
    // fontStyle: "italic", // ✅ makes text italic
    lockMovementX: true, // 🔒 prevent dragging
    // lockMovementY: true,
    lockRotation: true, // 🔒 prevent rotating
    // lockScalingX: true, // 🔒 prevent resizing
    lockScalingY: true,
    originX: "left", // anchor to the left
    centeredScaling: true, // disable center-based scaling
  });
  LRN.id = "LRN";
  removeControl(LRN);
  changeStyleControl(LRN);
  canvas.add(LRN);

  var gradeSection = new Textbox("Grade 1 Rivero", {
    left: 159.5,
    top: 345,
    width: 300,
    fontSize: 16,
    fill: "black",
    fontFamily: "Roboto", // 👈 apply the custom font
    borderColor: "black", // 🖤 selection border color
    textAlign: "center",
    fontStyle: "italic", // ✅ makes text italic
    lockMovementX: true, // 🔒 prevent dragging
    // lockMovementY: true,
    lockRotation: true, // 🔒 prevent rotating
    // lockScalingX: true, // 🔒 prevent resizing
    lockScalingY: true,
    originX: "center", // anchor to the left
    centeredScaling: true, // disable center-based scaling
  });
  gradeSection.id = "gradeSection";
  removeControl(gradeSection);
  changeStyleControl(gradeSection);
  canvas.add(gradeSection);

  var principalName = new Textbox("Rowena R. Ebero", {
    left: 159.5,
    top: 385,
    width: 300,
    fontSize: 20,
    fill: "black",
    fontFamily: "Roboto", // 👈 apply the custom font
    borderColor: "black", // 🖤 selection border color
    textAlign: "center",

    lockMovementX: true, // 🔒 prevent dragging
    // lockMovementY: true,
    lockRotation: true, // 🔒 prevent rotating
    // lockScalingX: true, // 🔒 prevent resizing
    lockScalingY: true,
    originX: "center", // anchor to the left
    centeredScaling: true, // disable center-based scaling
  });
  principalName.id = "principalName";
  removeControl(principalName);
  changeStyleControl(principalName);
  canvas.add(principalName);

  var principalTitle = new Textbox("School Principal III", {
    left: 159.5,
    top: 405,
    width: 300,
    fontSize: 16,
    fill: "black",
    borderColor: "black", // 🖤 selection border color
    textAlign: "center",
    fontStyle: "italic", // ✅ makes text italic
    fontFamily: "Roboto", // 👈 apply the custom font
    lockMovementX: true, // 🔒 prevent dragging
    // lockMovementY: true,
    lockRotation: true, // 🔒 prevent rotating
    // lockScalingX: true, // 🔒 prevent resizing
    lockScalingY: true,
    originX: "center", // anchor to the left
    centeredScaling: true, // disable center-based scaling
  });
  principalTitle.id = "principalTitle";
  removeControl(principalTitle);
  changeStyleControl(principalTitle);
  canvas.add(principalTitle);

  var parentName = new Textbox("Mr. & Mrs. Dela Cruz", {
    left: 472.5,
    top: 148,
    width: 300,
    fontSize: 20,
    fill: "black",
    borderColor: "black", // 🖤 selection border color
    textAlign: "center",
    fontFamily: "Roboto", // 👈 apply the custom font
    lockMovementX: true, // 🔒 prevent dragging
    // lockMovementY: true,
    lockRotation: true, // 🔒 prevent rotating
    // lockScalingX: true, // 🔒 prevent resizing
    lockScalingY: true,
    originX: "center", // anchor to the left
    centeredScaling: true, // disable center-based scaling
  });
  parentName.id = "parentName";
  removeControl(parentName);
  changeStyleControl(parentName);
  canvas.add(parentName);

  var contactNumber = new Textbox("0912 1001 183", {
    left: 472.5,
    top: 230,
    width: 300,
    fontSize: 20,
    fill: "black",
    borderColor: "black", // 🖤 selection border color
    textAlign: "center",
    fontFamily: "Roboto", // 👈 apply the custom font
    lockMovementX: true, // 🔒 prevent dragging
    // lockMovementY: true,
    lockRotation: true, // 🔒 prevent rotating
    // lockScalingX: true, // 🔒 prevent resizing
    lockScalingY: true,
    originX: "center", // anchor to the left
    centeredScaling: true, // disable center-based scaling
  });
  contactNumber.id = "contactNumber";
  removeControl(contactNumber);
  changeStyleControl(contactNumber);
  canvas.add(contactNumber);

  var address = new Textbox("Brgy. Rizal, Surigao City", {
    left: 472.5,
    top: 330,
    width: 300,
    fontSize: 20,
    fill: "black",
    borderColor: "black", // 🖤 selection border color
    textAlign: "center",
    fontFamily: "Roboto", // 👈 apply the custom font
    lockMovementX: true, // 🔒 prevent dragging
    // lockMovementY: true,
    lockRotation: true, // 🔒 prevent rotating
    // lockScalingX: true, // 🔒 prevent resizing
    lockScalingY: true,
    originX: "center", // anchor to the left
    centeredScaling: true, // disable center-based scaling
  });
  address.id = "address";
  removeControl(address);
  changeStyleControl(address);
  canvas.add(address);
  //======================================
  const fontSizeSlider = document.getElementById("font-size-slider");
  const fontSizeDisplay = document.getElementById("font-size-display");

  // Update slider + display on object selection
  function updateFontSizeControls(obj) {
    if (obj && obj.type === "textbox") {
      const size = obj.fontSize ?? 24;
      fontSizeSlider.value = size;
      fontSizeDisplay.textContent = `${size}px`;
    } else {
      fontSizeSlider.value = 24;
      fontSizeDisplay.textContent = "24px";
    }
  }

  // On object selected
  canvas.on("selection:created", (e) => updateFontSizeControls(e.selected[0]));
  canvas.on("selection:updated", (e) => updateFontSizeControls(e.selected[0]));

  // On slider move (live update)
  fontSizeSlider.addEventListener("input", function () {
    const newSize = parseInt(this.value);
    fontSizeDisplay.textContent = `${newSize}px`;

    const active = canvas.getActiveObject();
    if (active && active.type === "textbox") {
      active.set("fontSize", newSize);
      active.initDimensions();
      canvas.requestRenderAll();
    }
  });
  const increaseBtn = document.getElementById("increase-font");
  const decreaseBtn = document.getElementById("decrease-font");

  function setFontSize(size) {
    const clamped = Math.max(9, Math.min(48, size)); // Clamp between 9 and 48
    fontSizeSlider.value = clamped;
    fontSizeDisplay.textContent = `${clamped}px`;

    const active = canvas.getActiveObject();
    if (active && active.type === "textbox") {
      active.set("fontSize", clamped);
      active.initDimensions();
      canvas.requestRenderAll();
    }
  }

  // Plus button click
  increaseBtn.addEventListener("click", () => {
    const current = parseInt(fontSizeSlider.value);
    setFontSize(current + 1);
  });

  // Minus button click
  decreaseBtn.addEventListener("click", () => {
    const current = parseInt(fontSizeSlider.value);
    setFontSize(current - 1);
  });

  //helper============================================//
  function getObjectById(id) {
    return canvas.getObjects().find((obj) => obj.id === id);
  }

  function removeControl(obj) {
    // ✅ Remove rotate control (middle-top)
    delete obj.controls.mtr;

    delete obj.controls.mt;
    delete obj.controls.mb;
    delete obj.controls.tl;
    delete obj.controls.tr;
    delete obj.controls.br;
    delete obj.controls.bl;
  }
  function changeStyleControl(obj) {
    obj.transparentCorners = false;
    obj.cornerColor = "black";
    obj.cornerStyle = "circle";
    obj.cornerSize = 12;
  }

  //==============================================//

  // canvas.setActiveObject(text);
  canvas.requestRenderAll();
  // =================================================
  const boldBtn = document.getElementById("toggle-bold");
  const italicBtn = document.getElementById("toggle-italic");

  // Helper to toggle style
  function toggleStyle(property, value) {
    const active = canvas.getActiveObject();
    if (active && active.type === "textbox") {
      const current = active.get(property);
      active.set(property, current === value ? "" : value); // toggle
      canvas.requestRenderAll();
    }
  }

  // Event listeners
  boldBtn.addEventListener("click", () => {
    toggleStyle("fontWeight", "bold");
  });

  italicBtn.addEventListener("click", () => {
    toggleStyle("fontStyle", "italic");
  });
  function updateStyleButtons(obj) {
    if (obj && obj.type === "textbox") {
      boldBtn.classList.toggle("bg-slate-700", obj.fontWeight === "bold");
      italicBtn.classList.toggle("bg-slate-700", obj.fontStyle === "italic");
    } else {
      boldBtn.classList.remove("bg-slate-700");
      italicBtn.classList.remove("bg-slate-700");
    }
  }

  canvas.on("selection:created", (e) => updateStyleButtons(e.selected[0]));
  canvas.on("selection:updated", (e) => updateStyleButtons(e.selected[0]));
  canvas.on("selection:cleared", () => updateStyleButtons(null));
  // color ==========================

  const colorInput = document.getElementById("text-color-picker");

  colorInput.addEventListener("input", function () {
    const active = canvas.getActiveObject();
    if (active && active.type === "textbox") {
      active.set("fill", this.value);
      canvas.requestRenderAll();
    }
  });
  canvas.on("selection:created", (e) => {
    updateColorInput(e.selected[0]);
  });
  canvas.on("selection:updated", (e) => {
    updateColorInput(e.selected[0]);
  });
  canvas.on("selection:cleared", () => {
    colorInput.value = "#000000";
  });

  function updateColorInput(obj) {
    if (obj && obj.type === "textbox") {
      colorInput.value = obj.fill || "#000000";
    }
  }

  // upload excel file and read
  document
    .getElementById("excel-file")
    .addEventListener("change", function (e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming data is in the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to array of objects
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        console.log(jsonData); // ✅ This gives you an array of rows

        // Define the array before the loop
        const excel_array = [];

        // Loop through the Excel data
        jsonData.forEach((row) => {
          const entry = {
            imageLink: row["Image Link"],
            lrn: row["LRN"],
            fullname: row["Fullname"],
            gradeSection: row["Grade and Section"],
            principal: row["Principal"],
            position: row["Position"],

            guardian: row["Parent/Guardian"],
            contact: row["Contact Number"],
            address: row["Address"],
          };

          excel_array.push(entry);
        });

        // Cache object references

        const obj_fullname = getObjectById("fullName");
        const obj_LRN = getObjectById("LRN");
        const obj_Grade = getObjectById("gradeSection");
        const obj_principalName = getObjectById("principalName");
        const obj_principalTitle = getObjectById("principalTitle");
        const obj_parentName = getObjectById("parentName");
        const obj_contactNumber = getObjectById("contactNumber");
        const obj_address = getObjectById("address");

        function updateCanvasFromData(index) {
          const data = excel_array[index];
          if (!data) return;

          obj_fullname?.set("text", String(data.fullname || ""));
          obj_LRN?.set("text", String(data.lrn || ""));
          obj_Grade?.set("text", String(data.gradeSection || ""));
          obj_principalName?.set("text", String(data.principal || ""));
          obj_principalTitle?.set("text", data.position); // or from data if needed
          obj_parentName?.set("text", String(data.guardian || ""));
          obj_contactNumber?.set("text", String(data.contact || ""));
          obj_address?.set("text", String(data.address || ""));

          canvas.requestRenderAll();
        }
        updateCanvasFromData(currentIndex);
        // Handle "Next" button
        document.getElementById("next-record").addEventListener("click", () => {
          currentIndex++;
          if (currentIndex >= excel_array.length) currentIndex = 0; // wrap
          updateCanvasFromData(currentIndex);
        });

        // Handle "Previous" button
        document.getElementById("prev-record").addEventListener("click", () => {
          currentIndex--;
          if (currentIndex < 0) currentIndex = excel_array.length - 1; // wrap
          updateCanvasFromData(currentIndex);
        });
      };

      reader.readAsArrayBuffer(file);
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
});
