const qrText = document.getElementById("qrText");
    const qrCanvas = document.getElementById("qrCanvas");
    const qrResult = document.getElementById("qrResult");

    function generateQRCode() {
      const text = qrText.value.trim();
      if (!text) {
        alert("Please enter a URL or text.");
        return;
      }

      QRCode.toCanvas(qrCanvas, text, { width: 256, margin: 2 }, function (error) {
        if (error) {
          console.error(error);
          alert("Error generating QR code.");
        } else {
          addWatermark(qrCanvas);
          qrResult.classList.remove("hidden");
          qrCanvas.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    function addWatermark(canvas) {
      const ctx = canvas.getContext("2d");
      ctx.font = "10px Arial";
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.textAlign = "center";
      ctx.fillText("created at www.toolswagon.site", canvas.width / 2, canvas.height / 2);
    }

    function downloadQR() {
      const link = document.createElement("a");
      link.download = "toolswagon-qr-code.png";
      link.href = qrCanvas.toDataURL("image/png");
      link.click();
    }

    function shareQR() {
      if (navigator.canShare) {
        qrCanvas.toBlob(blob => {
          const file = new File([blob], "toolswagon-qr-code.png", { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            navigator.share({
              files: [file],
              title: "QR Code from Toolswagon",
              text: "Scan this QR code created using Toolswagon.",
            }).catch(console.error);
          } else {
            alert("Sharing not supported on this device.");
          }
        });
      } else {
        alert("Sharing not supported on this device.");
      }
    }
