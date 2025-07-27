document.getElementById("uploadBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if (!fileInput.files[0]) {
    status.textContent = "Please select a JSON file first.";
    status.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("menu", fileInput.files[0]);

  status.textContent = "Uploading...";
  status.style.color = "blue";

  try {
    const res = await axios.post("https://lionsdencafe.onrender.com/upload-menu", formData)
    
    const data = res.data; // ✅ axios auto-parses JSON

    if (data.success) {
      status.textContent = "✅ Menu uploaded successfully.";
      status.style.color = "green";
    } else {
      status.textContent = "❌ " + (data.message || "Upload failed.");
      status.style.color = "red";
    }
  } catch (err) {
    console.error("Upload failed:", err);
    status.textContent = "❌ Upload failed. Check server or CORS settings.";
    status.style.color = "red";
  }
});
