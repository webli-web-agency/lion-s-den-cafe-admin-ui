document.getElementById("uploadBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if (!fileInput.files[0]) {
    status.textContent = "Please select a JSON file first.";
    status.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("menu", fileInput.files[0]);

  try {
    const res = await fetch("https://lionsdencafe.onrender.com/upload-menu", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      status.textContent = "✅ Menu uploaded successfully.";
      status.style.color = "green";
    } else {
      status.textContent = "❌ " + data.message;
      status.style.color = "red";
    }
  } catch (err) {
    status.textContent = "❌ Upload failed. Check server or CORS settings.";
    status.style.color = "red";
  }
});
