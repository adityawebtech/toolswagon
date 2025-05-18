async function convertPDFToWord() {
      const fileInput = document.getElementById("pdfFile");
      const status = document.getElementById("status");
      status.textContent = "";

      if (!fileInput.files.length) {
        alert("Please upload a PDF file first.");
        return;
      }

      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      status.textContent = "Converting... Please wait.";

      try {
        const response = await fetch("https://pdf-to-word-api-315i.onrender.com", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = "converted.docx";
          document.body.appendChild(a);
          a.click();
          a.remove();
          status.textContent = "Download started!";
        } else {
          status.textContent = "Conversion failed. Please try again.";
        }
      } catch (error) {
        console.error(error);
        status.textContent = "An error occurred: " + error.message;
      }
}
