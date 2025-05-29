const input = document.getElementById('stylishInput'); const outputContainer = document.getElementById('stylishOutput');

const styles = [ { name: "Bold", transform: (text) => text.replace(/[a-z]/gi, (c) => String.fromCodePoint(c.charCodeAt(0) + (c === c.toUpperCase() ? 119743 : 119737)) ) }, { name: "Italic", transform: (text) => text.replace(/[a-z]/gi, (c) => String.fromCodePoint(c.charCodeAt(0) + (c === c.toUpperCase() ? 119795 : 119789)) ) }, { name: "Monospace", transform: (text) => text.replace(/[a-z0-9]/gi, (c) => String.fromCodePoint(c.charCodeAt(0) + (c >= 'a' ? 120319 - 97 : (c >= 'A' ? 120223 - 65 : 120822 - 48))) ) }, { name: "Small Caps", transform: (text) => text.toLowerCase().replace(/[a-z]/g, c => String.fromCharCode("ᴀ".charCodeAt(0) + c.charCodeAt(0) - 97) ) }, { name: "Cursive", transform: (text) => text.replace(/[a-z]/gi, (c) => String.fromCodePoint(c.charCodeAt(0) + (c === c.toUpperCase() ? 119867 : 119861)) ) }, { name: "Wide", transform: (text) => text.split("").join(" ") }, { name: "Flipped", transform: (text) => text.split('').reverse().map(c => flipMap[c] || c).join('') }, { name: "Bubble", transform: (text) => text.replace(/[a-z0-9]/gi, (c) => bubbleMap[c] || c) }, { name: "Glitch", transform: (text) => text.split('').map(c => c + '͜').join('') }, { name: "Upside Down", transform: (text) => text.split('').reverse().map(c => upsideMap[c] || c).join('') }, { name: "Strike", transform: text => text.split('').join('\u0336') }, { name: "Double", transform: text => text.replace(/[a-z]/gi, c => String.fromCodePoint(c.charCodeAt(0) + (c >= 'a' ? 120395 - 97 : 120367 - 65))) }, { name: "Squared", transform: text => text.toUpperCase().replace(/[A-Z0-9]/g, c => String.fromCodePoint(c.charCodeAt(0) + (c >= 'A' ? 127312 - 65 : 127328 - 48))) }, { name: "Mirror", transform: text => text.split('').map(c => mirrorMap[c] || c).join('') }, { name: "Tiny", transform: text => text.replace(/[a-z]/g, c => tinyMap[c] || c) }, { name: "Parenthesized", transform: text => text.toLowerCase().replace(/[a-z]/g, c => (${c})) }, { name: "Aesthetic", transform: text => text.split('').join(' ') + ' ✨' }, { name: "Slash", transform: text => text.split('').join('/') }, { name: "Underline", transform: text => text.split('').map(c => c + '\u0332').join('') }, { name: "Dotty", transform: text => text.split('').join('·') }, { name: "Zalgo", transform: text => text.split('').map(c => c + '\u0300\u0315\u0301').join('') }, { name: "Wave", transform: text => text.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('') }, { name: "Inverse", transform: text => text.split('').map(c => c.toUpperCase() === c ? c.toLowerCase() : c.toUpperCase()).join('') }, { name: "Reverse", transform: text => text.split('').reverse().join('') }, { name: "Boxed", transform: text => [${text}] }, { name: "Hearts", transform: text => text.split('').join('❤') }, { name: "Stars", transform: text => '★ ' + text + ' ★' }, { name: "Wavy", transform: text => text.split('').join('~') }, { name: "Curly", transform: text => {${text}} }, { name: "Brackets", transform: text => '<' + text + '>' }, { name: "Angle", transform: text => '«' + text + '»' } ];

const flipMap = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "ʃ", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z" };

const bubbleMap = { a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ", k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ", 0: "⓪", 1: "①", 2: "②", 3: "③", 4: "④", 5: "⑤", 6: "⑥", 7: "⑦", 8: "⑧", 9: "⑨" };

const upsideMap = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z" };

const mirrorMap = { a: "ɒ", b: "d", c: "ↄ", d: "b", e: "ɘ", f: "Ⅎ", g: "ǫ", h: "ʜ", i: "ı", j: "ɾ", k: "ʞ", l: "ꞁ", m: "ᴍ", n: "ᴎ", o: "o", p: "q", q: "p", r: "ᴙ", s: "ƨ", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ʍ", x: "x", y: "ʏ", z: "ᴢ" };

const tinyMap = { a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", q: "ᑫ", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ" };

function generateStyles(text) { outputContainer.innerHTML = ''; styles.forEach(style => { const transformed = style.transform(text); const wrapper = document.createElement('div'); wrapper.className = "mb-4 p-3 border rounded-lg bg-gray-100 flex justify-between items-center";

const textEl = document.createElement('span');
textEl.className = "flex-1 mr-2 font-mono break-words text-sm sm:text-base";
textEl.innerText = transformed;

const btn = document.createElement('button');
btn.className = "bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm";
btn.innerText = "Copy";
btn.onclick = () => {
  navigator.clipboard.writeText(transformed);
  btn.innerText = "Copied!";
  setTimeout(() => btn.innerText = "Copy", 1500);
};

wrapper.appendChild(textEl);
wrapper.appendChild(btn);
outputContainer.appendChild(wrapper);

}); }

input.addEventListener('input', () => { const text = input.value.trim(); if (text.length) { generateStyles(text); } else { outputContainer.innerHTML = ''; } });
