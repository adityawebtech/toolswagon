// Side nav hamburger + backdrop logic
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navBackdrop = document.getElementById('navBackdrop');
hamburger.onclick = function () {
  navMenu.classList.toggle('active');
  navBackdrop.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
};
navBackdrop.onclick = function () {
  navMenu.classList.remove('active');
  navBackdrop.classList.remove('active');
  document.body.style.overflow = '';
};

let signatureImage = null;
function makeSignatureTransparent(file, callback) {
  const img = new Image();
  img.onload = function () {
    const cv = document.createElement('canvas'), ctx = cv.getContext('2d');
    cv.width = img.width;
    cv.height = img.height;
    ctx.drawImage(img, 0, 0);
    let imgd = ctx.getImageData(0, 0, cv.width, cv.height);
    let d = imgd.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) {
        d[i + 3] = 0;
      }
    }
    ctx.putImageData(imgd, 0, 0);
    callback(cv);
  };
  img.src = URL.createObjectURL(file);
}

document.getElementById("signatureInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  makeSignatureTransparent(file, function (canvas) {
    signatureImage = canvas;
    let el = document.getElementById('preview-signature');
    el.src = canvas.toDataURL();
    el.style.display = "block";
  });
});

function drawFormOnImage(ctx, fields, w, h) {
  ctx.font = '19px "Noto Sans Devanagari", Mangal, "Arial Unicode MS", Arial, sans-serif';
  ctx.fillStyle = "#191919";
  ctx.textBaseline = "top";
  ctx.fillText(fields.name, 316, 558);
  ctx.fillText(fields.father, 808, 555);
  ctx.fillText(fields.age, 218, 613);
  ctx.fillText(fields.occupation, 482, 609);

  ctx.font = '18px "Noto Sans Devanagari", Mangal, Arial, sans-serif';
  let addr = fields.address.trim();
  let maxChars = 38;
  if (addr.length <= maxChars) {
    ctx.fillText(addr, 723, 605);
  } else {
    let breakIndex = addr.lastIndexOf(" ", maxChars);
    let line1, line2;
    if (breakIndex === -1) {
      line1 = addr.substring(0, maxChars - 1) + "-";
      line2 = addr.substring(maxChars - 1);
    } else {
      line1 = addr.substring(0, breakIndex);
      line2 = addr.substring(breakIndex + 1);
      if (
        addr.charAt(breakIndex + 1) !== " " &&
        breakIndex < addr.length - 1 &&
        !/\s/.test(addr.charAt(breakIndex)) &&
        !line1.endsWith(" ")
      ) {
        line1 += "-";
      }
    }
    ctx.fillText(line1, 723, 605);
    ctx.fillText(line2, 166, 659);
  }

  ctx.font = '19px "Noto Sans Devanagari", Mangal, Arial, sans-serif';
  ctx.fillText(fields.place, 238, 1007);
  let dateStr = fields.date ? fields.date.split('-').reverse().join('-') : '';
  ctx.fillText(dateStr, 246, 1055);
  ctx.fillText(fields.applicant_name, 883, 1050);

  if (signatureImage) {
    let sw = 160, sh = 45;
    let aspect = signatureImage.width / signatureImage.height;
    if (aspect > sw / sh) sh = sw / aspect;
    else sw = sh * aspect;
    ctx.globalAlpha = 0.94;
    ctx.drawImage(signatureImage, 922, 980, sw, sh);
    ctx.globalAlpha = 1.0;
  }
}

document.getElementById("declarationForm").addEventListener('submit', function (e) {
  e.preventDefault();
  if (!signatureImage) {
    alert("कृपया हस्ताक्षर अपलोड करें | Please upload signature.");
    return;
  }
  let f = {};
  for (const el of e.target.elements) if (el.name) f[el.name] = el.value;

  const img = new Image();
  img.onload = function () {
    const w = img.naturalWidth, h = img.naturalHeight;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    drawFormOnImage(ctx, f, w, h);
    let q = 0.95, out = c.toDataURL('image/jpeg', q);
    while (out.length / 1.38 > 98 * 1024 && q > 0.40) {
      q -= 0.08;
      out = c.toDataURL('image/jpeg', q);
    }

    document.getElementById("output").style.display = "none";
    document.getElementById("progress-bar-area").style.display = "block";
    let timer = 15;
    let progressText = document.getElementById('progress-text');
    progressText.textContent = "Processing... " + timer + "s";
    const interval = setInterval(function () {
      timer--;
      progressText.textContent = "Processing... " + timer + "s";
      if (timer <= 0) {
        clearInterval(interval);
        document.getElementById("progress-bar-area").style.display = "none";
        document.getElementById("output").style.display = "block";
      }
    }, 1000);

    let applicantNameClean = (f.applicant_name || "user").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
    let websitePart = "www.toolswagon.site";
    let downloadFileName = `${websitePart}-${applicantNameClean}-self-declaration.jpg`;
    document.getElementById("download-link").setAttribute("download", downloadFileName);
    document.getElementById("download-link").href = out;
    document.getElementById("result-img").src = out;
  };

  img.onerror = function () {
    alert('⚠️ फॉर्म टेम्पलेट इमेज लोड नहीं हो पाई!\nCheck this path:\nhttps://toolswagon-assets.onrender.com/assets/images/sdf.jpg');
  };

  img.crossOrigin = "anonymous";
  img.src = "https://toolswagon-assets.onrender.com/assets/images/sdf.jpg";
});

document.getElementById('declarationForm').addEventListener('input', function () {
  document.getElementById("output").style.display = "none";
});
