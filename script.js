// Import Fabric.js components
import {
  Canvas,
  Textbox,
  Rect,
  Image as FabricImage,
} from "https://cdn.jsdelivr.net/npm/fabric@6.7.1/+esm";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = new Canvas("canvas", {
    preserveObjectStacking: true,
    selection: false,
  });
  let excel_array = [];
  let currentIndex = 0;

  // Helper Functions
  const getObjectById = (id) =>
    canvas.getObjects().find((obj) => obj.id === id);

  const removeControl = (obj) => {
    const controlsToRemove = ["mtr", "mt", "mb", "tl", "tr", "br", "bl"];
    controlsToRemove.forEach((control) => delete obj.controls[control]);
  };

  const changeStyleControl = (obj) => {
    Object.assign(obj, {
      transparentCorners: false,
      cornerColor: "black",
      cornerStyle: "circle",
      cornerSize: 12,
    });
  };

  const addTextbox = (text, options, id) => {
    const textbox = new Textbox(text, options);
    textbox.id = id;
    removeControl(textbox);
    changeStyleControl(textbox);
    canvas.add(textbox);
  };

  // Load ID template image
  const loadTemplate = () => {
    const template = document.querySelector("#id-template").src;
    const imgEl = new Image();
    imgEl.src = template;
    imgEl.onload = () => {
      const img = new FabricImage(imgEl, {
        selectable: false,
        evented: false,
        left: -0.25,
        top: -0.25,
        stroke: "black",
        strokeWidth: 1,
        objectCaching: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
      });
      img.scaleToWidth(638);
      img.scaleToHeight(506);
      canvas.insertAt(0, img);
      canvas.requestRenderAll();
    };
  };

  const setupUIControls = () => {
    const fontSizeSlider = document.getElementById("font-size-slider");
    const fontSizeDisplay = document.getElementById("font-size-display");
    const increaseBtn = document.getElementById("increase-font");
    const decreaseBtn = document.getElementById("decrease-font");
    const boldBtn = document.getElementById("toggle-bold");
    const italicBtn = document.getElementById("toggle-italic");
    const colorInput = document.getElementById("text-color-picker");

    const updateFontSizeControls = (obj) => {
      const size = obj?.fontSize ?? 24;
      fontSizeSlider.value = size;
      fontSizeDisplay.textContent = `${size}px`;
    };

    const setFontSize = (size) => {
      const clamped = Math.max(9, Math.min(48, size));
      fontSizeSlider.value = clamped;
      fontSizeDisplay.textContent = `${clamped}px`;
      const active = canvas.getActiveObject();
      if (active?.type === "textbox") {
        active.set("fontSize", clamped);
        active.initDimensions();
        canvas.requestRenderAll();
      }
    };

    const toggleStyle = (property, value) => {
      const active = canvas.getActiveObject();
      if (active?.type === "textbox") {
        const current = active.get(property);
        active.set(property, current === value ? "" : value);
        canvas.requestRenderAll();
      }
    };

    const updateStyleButtons = (obj) => {
      boldBtn.classList.toggle("bg-slate-700", obj?.fontWeight === "bold");
      italicBtn.classList.toggle("bg-slate-700", obj?.fontStyle === "italic");
    };

    const updateColorInput = (obj) => {
      colorInput.value = obj?.fill || "#000000";
    };

    fontSizeSlider.addEventListener("input", () =>
      setFontSize(parseInt(fontSizeSlider.value))
    );
    increaseBtn.addEventListener("click", () =>
      setFontSize(parseInt(fontSizeSlider.value) + 1)
    );
    decreaseBtn.addEventListener("click", () =>
      setFontSize(parseInt(fontSizeSlider.value) - 1)
    );

    boldBtn.addEventListener("click", () => toggleStyle("fontWeight", "bold"));
    italicBtn.addEventListener("click", () =>
      toggleStyle("fontStyle", "italic")
    );

    colorInput.addEventListener("input", () => {
      const active = canvas.getActiveObject();
      if (active?.type === "textbox") {
        active.set("fill", colorInput.value);
        canvas.requestRenderAll();
      }
    });

    canvas.on("selection:created", (e) => {
      updateFontSizeControls(e.selected[0]);
      updateStyleButtons(e.selected[0]);
      updateColorInput(e.selected[0]);
    });

    canvas.on("selection:updated", (e) => {
      updateFontSizeControls(e.selected[0]);
      updateStyleButtons(e.selected[0]);
      updateColorInput(e.selected[0]);
    });

    canvas.on("selection:cleared", () => {
      updateFontSizeControls(null);
      updateStyleButtons(null);
      updateColorInput(null);
    });
  };

  const setupDownloadButton = () => {
    const download = document.getElementById("download");
    download.addEventListener("click", () => {
      const obj = getObjectById("fullName");
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2,
      });
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = `${obj?.text || "canvas"}.png`;
      a.click();
    });
  };

  // Initialization
  loadTemplate();
  setupUIControls();
  setupDownloadButton();

  // Add predefined textboxes (unchanged IDs)
  addTextbox(
    "Dawn Andrew N. Rivero",
    {
      left: 159.5,
      top: 315,
      width: 300,
      fontSize: 24,
      fontFamily: "Roboto",
      fill: "black",
      borderColor: "black",
      textAlign: "center",
      fontWeight: "bold",
      lockMovementX: true,
      lockRotation: true,
      lockScalingY: true,
      originX: "center",
      centeredScaling: true,
    },
    "fullName"
  );
  addTextbox(
    "00000000000",
    {
      left: 186,
      top: 286,
      width: 100,
      fontSize: 16,
      fill: "black",
      fontFamily: "Roboto",
      borderColor: "black",
      textAlign: "left",
      fontWeight: "bold",
      lockMovementX: true,
      lockRotation: true,
      lockScalingY: true,
      originX: "left",
      centeredScaling: true,
    },
    "LRN"
  );
  addTextbox(
    "Grade 1 Rivero",
    {
      left: 159.5,
      top: 345,
      width: 300,
      fontSize: 16,
      fill: "black",
      fontFamily: "Roboto",
      borderColor: "black",
      textAlign: "center",
      fontStyle: "italic",
      lockMovementX: true,
      lockRotation: true,
      lockScalingY: true,
      originX: "center",
      centeredScaling: true,
    },
    "gradeSection"
  );
  addTextbox(
    "Rowena R. Ebero",
    {
      left: 159.5,
      top: 385,
      width: 300,
      fontSize: 20,
      fill: "black",
      fontFamily: "Roboto",
      borderColor: "black",
      textAlign: "center",
      lockMovementX: true,
      lockRotation: true,
      lockScalingY: true,
      originX: "center",
      centeredScaling: true,
    },
    "principalName"
  );
  addTextbox(
    "School Principal III",
    {
      left: 159.5,
      top: 405,
      width: 300,
      fontSize: 16,
      fill: "black",
      fontFamily: "Roboto",
      borderColor: "black",
      textAlign: "center",
      fontStyle: "italic",
      lockMovementX: true,
      lockRotation: true,
      lockScalingY: true,
      originX: "center",
      centeredScaling: true,
    },
    "principalTitle"
  );
  addTextbox(
    "Mr. & Mrs. Dela Cruz",
    {
      left: 472.5,
      top: 148,
      width: 300,
      fontSize: 20,
      fill: "black",
      fontFamily: "Roboto",
      borderColor: "black",
      textAlign: "center",
      lockMovementX: true,
      lockRotation: true,
      lockScalingY: true,
      originX: "center",
      centeredScaling: true,
    },
    "parentName"
  );
  addTextbox(
    "0912 1001 183",
    {
      left: 472.5,
      top: 230,
      width: 300,
      fontSize: 20,
      fill: "black",
      fontFamily: "Roboto",
      borderColor: "black",
      textAlign: "center",
      lockMovementX: true,
      lockRotation: true,
      lockScalingY: true,
      originX: "center",
      centeredScaling: true,
    },
    "contactNumber"
  );
  addTextbox(
    "Brgy. Rizal, Surigao City",
    {
      left: 472.5,
      top: 330,
      width: 300,
      fontSize: 20,
      fill: "black",
      fontFamily: "Roboto",
      borderColor: "black",
      textAlign: "center",
      lockMovementX: true,
      lockRotation: true,
      lockScalingY: true,
      originX: "center",
      centeredScaling: true,
    },
    "address"
  );

  const setupExcelUpload = () => {
    document
      .getElementById("excel-file")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

          excel_array = jsonData.map((row) => ({
            imageLink: row["Image Link"],
            lrn: row["LRN"],
            fullname: row["Fullname"],
            gradeSection: row["Grade and Section"],
            principal: row["Principal"],
            position: row["Position"],
            guardian: row["Parent/Guardian"],
            contact: row["Contact Number"],
            address: row["Address"],
          }));

          const obj_fullname = getObjectById("fullName");
          const obj_LRN = getObjectById("LRN");
          const obj_Grade = getObjectById("gradeSection");
          const obj_PrincipalName = getObjectById("principalName");
          const obj_position = getObjectById("principalTitle");
          const obj_parentName = getObjectById("parentName");
          const obj_contactNumber = getObjectById("contactNumber");
          const obj_address = getObjectById("address");

          function updateCanvasFromData(index) {
            const data = excel_array[index];
            if (!data) return;

            obj_fullname?.set("text", String(data.fullname || ""));
            obj_LRN?.set("text", String(data.lrn || ""));

            obj_Grade?.set("text", data.gradeSection);
            obj_PrincipalName?.set("text", data.principal);
            obj_position?.set("text", data.position || "");
            obj_parentName?.set("text", data.guardian || "");
            obj_contactNumber?.set("text", String(data.contact || ""));
            obj_address?.set("text", data.address || "");

            canvas.requestRenderAll();
          }

          updateCanvasFromData(currentIndex);

          document
            .getElementById("next-record")
            .addEventListener("click", () => {
              currentIndex++;
              if (currentIndex >= excel_array.length) currentIndex = 0;
              updateCanvasFromData(currentIndex);
            });

          document
            .getElementById("prev-record")
            .addEventListener("click", () => {
              currentIndex--;
              if (currentIndex < 0) currentIndex = excel_array.length - 1;
              updateCanvasFromData(currentIndex);
            });
        };

        reader.readAsArrayBuffer(file);
      });
  };
  setupExcelUpload();
  const setupImageUpload = () => {
    const fileInput = document.getElementById("upload");

    fileInput.addEventListener("change", async function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const imgEl = new Image();
        imgEl.src = e.target.result;

        const existing = canvas
          .getObjects()
          .find((obj) => obj.id === "pupil-image");
        if (existing) canvas.remove(existing);

        imgEl.onload = () => {
          const img = new FabricImage(imgEl, {
            left: 148,
            top: 148,
            selectable: true,
            evented: true,
            borderColor: "black",
          });

          img.scaleToWidth(145);

          const clipRect = new Rect({
            width: 145,
            height: 135,
            left: 148,
            top: 148,
            originX: "left",
            absolutePositioned: true,
            borderColor: "black",
          });

          img.clipPath = clipRect;
          img.id = "pupil-image";

          changeStyleControl(img);

          canvas.add(img);
          canvas.remove(img);
          canvas.insertAt(1, img);
          canvas.requestRenderAll();
        };
      };
      reader.readAsDataURL(file);
    });
  };
  setupImageUpload("pupil-image");

  // ========== Excel Upload and Canvas Update ==========
  document.getElementById("excel-file").addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(new Uint8Array(event.target.result), {
        type: "array",
      });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      const excel_array = data.map((row) => ({
        imageLink: row["Image Link"],
        lrn: row["LRN"],
        fullname: row["Fullname"],
        gradeSection: row["Grade and Section"],
        principal: row["Principal"],
        position: row["Position"],
        guardian: row["Parent/Guardian"],
        contact: row["Contact Number"],
        address: row["Address"],
      }));

      const objs = {
        fullname: getObjectById("fullName"),
        lrn: getObjectById("LRN"),
        grade: getObjectById("gradeSection"),
        principal: getObjectById("principalName"),
        position: getObjectById("principalTitle"),
        guardian: getObjectById("parentName"),
        contact: getObjectById("contactNumber"),
        address: getObjectById("address"),
      };

      let currentIndex = 0;

      function updateCanvas(index) {
        const entry = excel_array[index];
        if (!entry) return;

        objs.fullname?.set("text", entry.fullname);
        objs.lrn?.set("text", entry.lrn);
        objs.grade?.set("text", entry.gradeSection);
        objs.principal?.set("text", entry.principal);
        objs.position?.set("text", entry.position);
        objs.guardian?.set("text", entry.guardian);
        objs.contact?.set("text", entry.contact);
        objs.address?.set("text", entry.address);

        canvas.requestRenderAll();
      }

      updateCanvas(currentIndex);

      document.getElementById("next-record").onclick = () => {
        currentIndex = (currentIndex + 1) % excel_array.length;
        updateCanvas(currentIndex);
      };

      document.getElementById("prev-record").onclick = () => {
        currentIndex =
          (currentIndex - 1 + excel_array.length) % excel_array.length;
        updateCanvas(currentIndex);
      };
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  });

  // ========== Image Upload & PDF Export ==========
  const uploadInput = document.getElementById("a4upload");
  const exportBtn = document.getElementById("a4export");
  let uploadedImages = [];

  uploadInput.addEventListener("change", () => {
    uploadedImages = Array.from(uploadInput.files).map((file) =>
      URL.createObjectURL(file)
    );
    if (uploadedImages.length === 0) return false;
    document.querySelector(
      "#files-upload-pdf"
    ).innerHTML = `${uploadedImages.length} file(s) selected.`; // ✅ Show count
    showModal("pdfReadyModal");
  });

  exportBtn.addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
    const [pageWidth, pageHeight] = [
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight(),
    ];
    const [cellW, cellH, spacing, marginX, marginY] = [
      380,
      280,
      10,
      (pageWidth - 2 * 380) / 2,
      (pageHeight - 2 * 280 - 10) / 2,
    ];

    hideModal("pdfReadyModal");
    showModal("waiting-modal");

    for (let i = 0; i < uploadedImages.length; i += 4) {
      if (i !== 0) pdf.addPage();
      const batch = uploadedImages.slice(i, i + 4);

      for (let j = 0; j < batch.length; j++) {
        const img = new Image();
        img.src = batch[j];

        await new Promise((resolve) => {
          img.onload = () => {
            const [col, row] = [j % 2, Math.floor(j / 2)];
            const [x, y] = [
              marginX + col * (cellW + spacing),
              marginY + row * (cellH + spacing),
            ];
            const scale = Math.min(
              cellW / img.naturalWidth,
              cellH / img.naturalHeight
            );
            const [w, h] = [
              img.naturalWidth * scale,
              img.naturalHeight * scale,
            ];

            pdf.addImage(
              img,
              "PNG",
              x + (cellW - w) / 2,
              y + (cellH - h) / 2,
              w,
              h
            );
            resolve();
          };
        });
      }
    }

    pdf.save("images-4-per-page.pdf");
    hideModal("waiting-modal");
    showModal("successful-modal");

    document.getElementById("closeModalBtn").onclick = () =>
      hideModal("successful-modal");
  });

  // ========== Modal Helpers ==========
  function showModal(id) {
    document.getElementById(id)?.classList.remove("hidden");
  }
  function hideModal(id) {
    document.getElementById(id)?.classList.add("hidden");
  }

  canvas.requestRenderAll();
});
