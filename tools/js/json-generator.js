// json-generator.js

// Dependencies: jsoneditor, faker.js

let editor; const container = document.getElementById("jsoneditor"); const options = { mode: "tree", modes: ["code", "tree"], onChange: syncPreview, }; editor = new JSONEditor(container, options);

const preview = document.getElementById("jsonPreview"); const darkToggle = document.getElementById("darkToggle"); const importFile = document.getElementById("importFile"); const exportBtn = document.getElementById("exportBtn"); const importBtn = document.getElementById("importBtn"); const templateSelect = document.getElementById("templateSelect"); const bookmarkBtn = document.getElementById("bookmarkBtn"); const snippetList = document.getElementById("snippetList");

// Dark/Light Mode Toggle darkToggle.addEventListener("click", () => { document.body.classList.toggle("dark"); editor.setOptions({ theme: document.body.classList.contains("dark") ? "ace/theme/twilight" : "ace/theme/github" }); });

// Sync Preview Panel function syncPreview() { try { const json = editor.get(); preview.textContent = JSON.stringify(json, null, 2); preview.classList.remove("text-red-500"); } catch (e) { preview.textContent = e.toString(); preview.classList.add("text-red-500"); } }

// Import from file importFile.addEventListener("change", function () { const file = this.files[0]; const reader = new FileReader(); reader.onload = function (e) { try { const json = JSON.parse(e.target.result); editor.set(json); } catch (err) { alert("Invalid JSON"); } }; reader.readAsText(file); });

// Export JSON document.getElementById("exportPretty").onclick = () => { const data = JSON.stringify(editor.get(), null, 2); download("json-pretty.json", data); };

document.getElementById("exportMinified").onclick = () => { const data = JSON.stringify(editor.get()); download("json-minified.json", data); };

function download(filename, text) { const blob = new Blob([text], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; a.click(); }

// Templates const templates = { user: { name: "John Doe", age: 30, email: "john@example.com", address: { city: "New York", zip: "10001" } }, array: [ { id: 1, item: "Apple" }, { id: 2, item: "Banana" } ] }; templateSelect.addEventListener("change", () => { const val = templateSelect.value; if (val && templates[val]) editor.set(templates[val]); });

// Bookmark snippets bookmarkBtn.addEventListener("click", () => { const json = JSON.stringify(editor.get()); const timestamp = new Date().toISOString(); localStorage.setItem("json_snippet_" + timestamp, json); loadSnippets(); });

function loadSnippets() { snippetList.innerHTML = ""; Object.keys(localStorage) .filter(k => k.startsWith("json_snippet_")) .forEach(k => { const li = document.createElement("li"); li.className = "text-sm cursor-pointer hover:underline"; li.textContent = k.replace("json_snippet_", ""); li.onclick = () => editor.set(JSON.parse(localStorage[k])); snippetList.appendChild(li); }); } loadSnippets();

// Use faker.js for mock data document.getElementById("generateMock").onclick = () => { const mock = { name: faker.name.findName(), email: faker.internet.email(), address: faker.address.streetAddress(), phone: faker.phone.phoneNumber() }; editor.set(mock); };

// Undo/Redo window.addEventListener("keydown", (e) => { if (e.ctrlKey && e.key === "z") editor.undo(); if (e.ctrlKey && (e.key === "y" || (e.shiftKey && e.key === "z"))) editor.redo(); });

// Live validation and error display is built-in via JSONEditor.

