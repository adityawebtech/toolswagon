let fields = [];

const fieldsContainer = document.getElementById('fieldsContainer');
const addFieldBtn = document.getElementById('addFieldBtn');
const generateBtn = document.getElementById('generateBtn');
const outputContainer = document.getElementById('jsonOutput');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

function createFieldElement(index, field = { key: '', type: 'string', value: '' }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-wrap gap-2 items-center field-group';

  wrapper.innerHTML = `
    <input class="field-key border p-2 rounded w-40" placeholder="Key" value="${field.key}" />
    <select class="field-type border p-2 rounded w-36">
      <option value="string" ${field.type === 'string' ? 'selected' : ''}>String</option>
      <option value="number" ${field.type === 'number' ? 'selected' : ''}>Number</option>
      <option value="boolean" ${field.type === 'boolean' ? 'selected' : ''}>Boolean</option>
      <option value="array" ${field.type === 'array' ? 'selected' : ''}>Array</option>
      <option value="object" ${field.type === 'object' ? 'selected' : ''}>Object</option>
      <option value="null" ${field.type === 'null' ? 'selected' : ''}>Null</option>
    </select>
    <input class="field-value border p-2 rounded w-40" placeholder="Value" value="${field.value}" ${field.type === 'object' || field.type === 'array' || field.type === 'null' ? 'disabled' : ''} />
    <button class="remove-field bg-red-500 text-white px-2 py-1 rounded">Remove</button>
  `;

  wrapper.querySelector('.remove-field').onclick = () => {
    fields.splice(index, 1);
    renderFields();
  };

  wrapper.querySelector('.field-type').onchange = (e) => {
    const selected = e.target.value;
    const valueInput = wrapper.querySelector('.field-value');
    if (selected === 'object' || selected === 'array' || selected === 'null') {
      valueInput.disabled = true;
      valueInput.value = '';
    } else {
      valueInput.disabled = false;
    }
  };

  fieldsContainer.appendChild(wrapper);
}

function renderFields() {
  fieldsContainer.innerHTML = '';
  fields.forEach((field, index) => createFieldElement(index, field));
}

addFieldBtn.addEventListener('click', () => {
  fields.push({ key: '', type: 'string', value: '' });
  renderFields();
});

generateBtn.addEventListener('click', () => {
  const json = {};
  let valid = true;

  const fieldElements = fieldsContainer.querySelectorAll('.field-group');

  fieldElements.forEach((group, i) => {
    const key = group.querySelector('.field-key').value.trim();
    const type = group.querySelector('.field-type').value;
    const val = group.querySelector('.field-value').value.trim();

    if (!key) {
      alert(`Key missing at row ${i + 1}`);
      valid = false;
      return;
    }

    let parsedValue;
    switch (type) {
      case 'number':
        parsedValue = Number(val);
        break;
      case 'boolean':
        parsedValue = val.toLowerCase() === 'true';
        break;
      case 'null':
        parsedValue = null;
        break;
      case 'array':
        parsedValue = [];
        break;
      case 'object':
        parsedValue = {};
        break;
      default:
        parsedValue = val;
    }

    json[key] = parsedValue;
  });

  if (valid) {
    outputContainer.value = JSON.stringify(json, null, 2);
  }
});

copyBtn.addEventListener('click', () => {
  outputContainer.select();
  document.execCommand('copy');
  alert('JSON copied to clipboard');
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([outputContainer.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'generated.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Initial field render
renderFields();

// Follow Buttons 

  let exitIntentShown = false;

  document.addEventListener("mouseout", function (e) {
    if (e.clientY < 50 && !exitIntentShown) {
      document.getElementById("exitIntentShare").style.display = "flex";
      exitIntentShown = true;
    }
  });

  // Close modal when clicking the close button
  document.getElementById("closeExitShare").addEventListener("click", function () {
    document.getElementById("exitIntentShare").style.display = "none";
  });

  // Optional: Close modal when clicking outside the content box
  document.getElementById("exitIntentShare").addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
    }
  });
