let fieldCount = 0;

  function addField() {
    fieldCount++;
    const container = document.getElementById('fieldsContainer');
    const fieldRow = document.createElement('div');
    fieldRow.classList.add('grid', 'grid-cols-5', 'gap-4', 'items-center');
    fieldRow.innerHTML = `
      <input type="text" placeholder="Field Name" class="border p-2 rounded col-span-1" id="name-${fieldCount}">
      <select class="border p-2 rounded col-span-1" id="type-${fieldCount}">
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="date">Date</option>
      </select>
      <input type="text" placeholder="Example / Format (opt)" class="border p-2 rounded col-span-2" id="option-${fieldCount}">
      <button onclick="this.parentElement.remove()" class="text-red-600">Remove</button>
    `;
    container.appendChild(fieldRow);
  }

  function generateJSON() {
    const count = parseInt(document.getElementById('recordCount').value);
    const fields = document.querySelectorAll('#fieldsContainer > div');
    const result = [];

    for (let i = 0; i < count; i++) {
      const obj = {};
      fields.forEach((field, index) => {
        const name = field.querySelector(`#name-${index + 1}`)?.value || `field${index+1}`;
        const type = field.querySelector(`#type-${index + 1}`)?.value || 'string';
        const opt = field.querySelector(`#option-${index + 1}`)?.value || '';
        obj[name] = mockValue(type, opt);
      });
      result.push(obj);
    }

    document.getElementById('jsonPreview').textContent = JSON.stringify(result, null, 2);
  }

  function mockValue(type, opt) {
    switch(type) {
      case 'string': return opt || 'Example Text';
      case 'number': return Math.floor(Math.random() * 1000);
      case 'boolean': return Math.random() < 0.5;
      case 'date': return new Date().toISOString();
      default: return 'Value';
    }
  }

  function downloadJSON() {
    const data = document.getElementById('jsonPreview').textContent;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mock-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Add a sample field by default
  addField();
