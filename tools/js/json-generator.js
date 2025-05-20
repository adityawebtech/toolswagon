function addField() {
        const container = document.getElementById('fields');
        const div = document.createElement('div');
        div.className = 'flex gap-2 mb-2';
        div.innerHTML = `
          <input type="text" class="key border rounded p-2 w-1/2" placeholder="Key" />
          <input type="text" class="value border rounded p-2 w-1/2" placeholder="Value" />
          <button onclick="this.parentElement.remove()" class="text-red-500">Remove</button>
        `;
        container.appendChild(div);
      }function generateJSON() {
    const keys = document.querySelectorAll('.key');
    const values = document.querySelectorAll('.value');
    const obj = {};

    keys.forEach((key, i) => {
      const k = key.value;
      const v = values[i].value;
      if (k) obj[k] = parseValue(v);
    });

    document.getElementById('output').textContent = JSON.stringify(obj, null, 2);
  }

  function parseValue(val) {
    if (!isNaN(val)) return Number(val);
    if (val.toLowerCase() === 'true') return true;
    if (val.toLowerCase() === 'false') return false;
    if (val.toLowerCase() === 'null') return null;
    return val;
  }

  function downloadJSON() {
    const json = document.getElementById('output').textContent;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.json';
    a.click();
    URL.revokeObjectURL(url);
  }
