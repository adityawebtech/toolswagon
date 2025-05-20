let jsonObject = {};
const fieldsContainer = document.getElementById('fields');
const resultArea = document.getElementById('result');
const addFieldBtn = document.getElementById('add-field');
const formatToggle = document.getElementById('format');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');

function updateResult() {
  jsonObject = {};
  const fieldRows = fieldsContainer.querySelectorAll('.field-row');
  fieldRows.forEach(row => {
    const key = row.querySelector('.key').value.trim();
    const valueInput = row.querySelector('.value');
    const type = row.querySelector('.type').value;

    if (key) {
      let value;
      switch (type) {
        case 'number':
          value = parseFloat(valueInput.value);
          break;
        case 'boolean':
          value = valueInput.value.toLowerCase() === 'true';
          break;
        case 'array':
          try {
            value = JSON.parse(valueInput.value);
            if (!Array.isArray(value)) throw new Error();
          } catch {
            value = [];
          }
          break;
        case 'object':
          try {
            value = JSON.parse(valueInput.value);
            if (typeof value !== 'object' || Array.isArray(value)) throw new Error();
          } catch {
            value = {};
          }
          break;
        default:
          value = valueInput.value;
      }
      jsonObject[key] = value;
    }
  });

  const formatted = formatToggle.checked
    ? JSON.stringify(jsonObject, null, 2)
    : JSON.stringify(jsonObject);
  resultArea.textContent = formatted;
}

function addField(key = '', value = '', type = 'string') {
  const row = document.createElement('div');
  row.className = 'field-row flex gap-2 items-center mb-2';

  row.innerHTML = `
    <input type="text" placeholder="Key" class="key border px-2 py-1 rounded w-1/4" value="${key}">
    <input type="text" placeholder="Value" class="value border px-2 py-1 rounded w-1/2" value="${value}">
    <select class="type border px-2 py-1 rounded">
      <option value="string">String</option>
      <option value="number">Number</option>
      <option value="boolean">Boolean</option>
      <option value="array">Array</option>
      <option value="object">Object</option>
    </select>
    <button class="remove border px-2 py-1 rounded text-red-500">✖</button>
  `;

  row.querySelector('.type').value = type;

  row.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', updateResult);
  });

  row.querySelector('.remove').addEventListener('click', () => {
    row.remove();
    updateResult();
  });

  fieldsContainer.appendChild(row);
  updateResult();
}

addField(); // Initialize with one row

addFieldBtn.addEventListener('click', () => addField());

formatToggle.addEventListener('change', updateResult);

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(resultArea.textContent).then(() => {
    alert('JSON copied to clipboard!');
  });
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([resultArea.textContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'data.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
