function parseValue(val) {
      if (val === "true") return true;
      if (val === "false") return false;
      if (val === "null") return null;
      if (!isNaN(val) && val.trim() !== "") return parseFloat(val);
      return val;
    }

    function generateJSON() {
      const keys = document.querySelectorAll(".key");
      const values = document.querySelectorAll(".value");
      const obj = {};
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i].value.trim();
        const v = values[i].value.trim();
        if (k) obj[k] = parseValue(v);
      }
      document.getElementById("jsonOutput").textContent = JSON.stringify(obj, null, 2);
    }

    function addField() {
      const field = document.createElement("div");
      field.className = "flex space-x-2 mt-2";
      field.innerHTML = `
        <input type="text" placeholder="key" class="key w-1/2 px-3 py-2 border rounded" />
        <input type="text" placeholder="value" class="value w-1/2 px-3 py-2 border rounded" />
      `;
      document.getElementById("fields").appendChild(field);
      field.querySelector(".key").addEventListener("input", generateJSON);
      field.querySelector(".value").addEventListener("input", generateJSON);
    }

    function copyJSON() {
      const text = document.getElementById("jsonOutput").textContent;
      navigator.clipboard.writeText(text).then(() => alert("JSON copied to clipboard"));
    }

    function downloadJSON() {
      const data = document.getElementById("jsonOutput").textContent;
      const blob = new Blob([data], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "generated.json";
      link.click();
    }

    function resetFields() {
      document.getElementById("fields").innerHTML = "";
      addField();
      document.getElementById("jsonOutput").textContent = "";
    }

    // Initialize
    document.querySelectorAll(".key, .value").forEach(el =>
      el.addEventListener("input", generateJSON)
    );
    generateJSON();
