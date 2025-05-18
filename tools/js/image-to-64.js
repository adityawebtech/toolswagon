const imageInput = document.getElementById("imageInput");
  const convertBtn = document.getElementById("convertBtn");
  const copyBtn = document.getElementById("copyBtn");
  const base64Output = document.getElementById("base64Output");
  const previewImage = document.getElementById("previewImage");
  const previewContainer = document.getElementById("preview");
  const modal = document.getElementById("countdownModal");
  const countdownValue = document.getElementById("countdownValue");

  convertBtn.addEventListener("click", () => {
    const file = imageInput.files[0];
    if (!file) {
      alert("Please select an image.");
      return;
    }

    let timeLeft = 15;
    countdownValue.textContent = timeLeft;
    modal.classList.remove("hidden");

    const timer = setInterval(() => {
      timeLeft--;
      countdownValue.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        modal.classList.add("hidden");

        const reader = new FileReader();
        reader.onload = function (e) {
          const base64String = e.target.result;

          // Update preview and output
          base64Output.value = base64String;
          previewImage.src = base64String;
          previewContainer.classList.remove("hidden");
          copyBtn.classList.remove("hidden");
        };

        reader.readAsDataURL(file);
      }
    }, 1000);
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(base64Output.value).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy Base64 to Clipboard";
      }, 2000);
    });
  });
