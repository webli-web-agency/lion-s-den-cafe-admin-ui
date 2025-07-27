document.getElementById("uploadBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  // Validate file selection
  if (!fileInput.files.length) {
    status.textContent = "❌ Please select a JSON file to upload.";
    status.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("menu", fileInput.files[0]);

  status.textContent = "⏳ Uploading file...";
  status.style.color = "blue";

  try {
    const res = await fetch("https://lionsdencafe.onrender.com/upload-menu", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      status.textContent = "✅ Menu uploaded successfully!";
      status.style.color = "green";
    } else {
      status.textContent = "❌ Upload failed: " + (data.message || "Unknown error.");
      status.style.color = "red";
    }
  } catch (error) {
    console.error("❌ Upload failed:", error);
    status.textContent = "❌ Server error or CORS issue. Check backend.";
    status.style.color = "red";
  }
});
