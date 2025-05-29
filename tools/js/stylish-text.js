const input = document.getElementById('stylishInput');
const outputContainer = document.getElementById('stylishOutput');

const styleGenerators = [
  // Basic Unicode style transformations
  {
    name: "Bold",
    transform: (txt) => mapUnicode(txt, 0x1D400, 0x1D41A) // A-Z
  },
  {
    name: "Italic",
    transform: (txt) => mapUnicode(txt, 0x1D434, 0x1D44E) // A-Z italic
  },
  {
    name: "Bold Italic",
    transform: (txt) => mapUnicode(txt, 0x1D468, 0x1D482)
  },
  {
    name: "Script",
    transform: (txt) => mapUnicode(txt, 0x1D49C, 0x1D4B6)
  },
  {
    name: "Bold Script",
    transform: (txt) => mapUnicode(txt, 0x1D4D0, 0x1D4EA)
  },
  {
    name: "Fraktur",
    transform: (txt) => mapUnicode(txt, 0x1D504, 0x1D51E)
  },
  {
    name: "Bold Fraktur",
    transform: (txt) => mapUnicode(txt, 0x1D56C, 0x1D586)
  },
  {
    name: "Double-struck",
    transform: (txt) => mapUnicode(txt, 0x1D538, 0x1D552)
  },
  {
    name: "Sans-serif",
    transform: (txt) => mapUnicode(txt, 0x1D5A0, 0x1D5BA)
  },
  {
    name: "Bold Sans-serif",
    transform: (txt) => mapUnicode(txt, 0x1D5D4, 0x1D5EE)
  },
  {
    name: "Sans-serif Italic",
    transform: (txt) => mapUnicode(txt, 0x1D608, 0x1D622)
  },
  {
    name: "Sans-serif Bold Italic",
    transform: (txt) => mapUnicode(txt, 0x1D63C, 0x1D656)
  },
  {
    name: "Monospace",
    transform: (txt) => mapUnicode(txt, 0x1D670, 0x1D68A)
  },
  // Lowercase versions for above
  {
    name: "Bold Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D41A)
  },
  {
    name: "Italic Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D44E)
  },
  {
    name: "Bold Italic Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D482)
  },
  {
    name: "Script Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D4B6)
  },
  {
    name: "Bold Script Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D4EA)
  },
  {
    name: "Fraktur Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D51E)
  },
  {
    name: "Bold Fraktur Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D586)
  },
  {
    name: "Double-struck Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D552)
  },
  {
    name: "Sans-serif Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D5BA)
  },
  {
    name: "Bold Sans-serif Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D5EE)
  },
  {
    name: "Sans-serif Italic Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D622)
  },
  {
    name: "Sans-serif Bold Italic Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D656)
  },
  {
    name: "Monospace Lowercase",
    transform: (txt) => mapUnicodeLower(txt, 0x1D68A)
  },
  // Other fancy styles
  {
    name: "Small Caps",
    transform: (txt) => txt.toLowerCase().split('').map(c => smallCapsMap[c] || c).join('')
  },
  {
    name: "Bubble",
    transform: (txt) => txt.toLowerCase().split('').map(c => bubbleMap[c] || c).join('')
  },
  {
    name: "Squared",
    transform: (txt) => txt.toLowerCase().split('').map(c => squaredMap[c] || c).join('')
  },
  {
    name: "Parenthesized",
    transform: (txt) => txt.toLowerCase().split('').map(c => parenthesizedMap[c] || c).join('')
  },
  {
    name: "Fullwidth",
    transform: (txt) => txt.split('').map(c => fullWidthMap[c] || c).join('')
  },
  {
    name: "Upside Down",
    transform: (txt) => txt.split('').reverse().map(c => upsideDownMap[c] || c).join('')
  },
  {
    name: "Zalgo",
    transform: (txt) => zalgoEffect(txt)
  },
  {
    name: "Glitch",
    transform: (txt) => glitchEffect(txt)
  },
  {
    name: "Strikethrough",
    transform: (txt) => txt.split('').map(c => c + '\u0336').join('')
  },
  {
    name: "Underline",
    transform: (txt) => txt.split('').map(c => c + '\u0332').join('')
  },
  {
    name: "Double Underline",
    transform: (txt) => txt.split('').map(c => c + '\u0333').join('')
  },
  {
    name: "Wavy",
    transform: (txt) => txt.split('').map(c => c + '\u0300').join('')
  },
  {
    name: "Reverse",
    transform: (txt) => txt.split('').reverse().join('')
  },
  {
    name: "Wide",
    transform: (txt) => txt.split('').join(' ')
  },
  {
    name: "Slashed",
    transform: (txt) => txt.split('').map(c => c + '\u0338').join('')
  },
  {
    name: "Circled",
    transform: (txt) => txt.split('').map(c => circledMap[c.toLowerCase()] || c).join('')
  },
  // Add some emoji-decorated styles:
  {
    name: "Stars ✨",
    transform: (txt) => `✨ ${txt.split('').join(' ✨ ')} ✨`
  },
  {
    name: "Hearts ❤️",
    transform: (txt) => `❤️ ${txt.split('').join(' ❤️ ')} ❤️`
  },
  {
    name: "Arrows ➔",
    transform: (txt) => `➔ ${txt.split('').join(' ➔ ')} ➔`
  },
  {
    name: "Sparkles ✨",
    transform: (txt) => `✨${txt}✨`
  },
  {
    name: "Fire 🔥",
    transform: (txt) => `🔥${txt}🔥`
  },
  {
    name: "Music 🎵",
    transform: (txt) => `🎵${txt}🎵`
  },
  {
    name: "Glitter ✨",
    transform: (txt) => `✨${txt.split('').join('✨')}✨`
  },
  {
    name: "Cute 🐾",
    transform: (txt) => `🐾${txt}🐾`
  },
  {
    name: "Flower 🌸",
    transform: (txt) => `🌸${txt}🌸`
  }
];

// --- Helpers for Unicode alphabets mapping ---
function mapUnicode(text, upperStart, lowerStart) {
  return [...text].map(c => {
    if (c >= 'A' && c <= 'Z') return String.fromCodePoint(upperStart + (c.charCodeAt(0) - 65));
    else if (c >= 'a' && c <= 'z') return String.fromCodePoint(lowerStart + (c.charCodeAt(0) - 97));
    else return c;
  }).join('');
}

function mapUnicodeLower(text, start) {
  return [...text].map(c => {
    if (c >= 'a' && c <= 'z') return String.fromCodePoint(start + (c.charCodeAt(0) - 97));
    else return c;
  }).join('');
}

// Small caps map:
const smallCapsMap = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
  s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
};

const bubbleMap = {
  a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ",
  k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ",
  u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ"
};

const squaredMap = {
  a: "🄰", b: "🄱", c: "🄲", d: "🄳", e: "🄴", f: "🄵", g: "🄶", h: "🄷", i: "🄸", j: "🄹",
  k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿", q: "🅀", r: "🅁", s: "🅂", t: "🅃",
  u: "🅄", v: "🅅", w: "🅆", x: "🅇", y: "🅈", z: "🅉"
};

const parenthesizedMap = {
  a: "⒜", b: "⒝", c: "⒞", d: "⒟", e: "⒠", f: "⒡", g: "⒢", h: "⒣", i: "⒤", j: "⒥",
  k: "⒦", l: "⒧", m: "⒨", n: "⒩", o: "⒪", p: "⒫", q: "⒬", r: "⒭", s: "⒮", t: "⒯",
  u: "⒰", v: "⒱", w: "⒲", x: "⒳", y: "⒴", z: "⒵"
};

const fullWidthMap = {};
for(let i=33; i<=126; i++) {
  fullWidthMap[String.fromCharCode(i)] = String.fromCharCode(0xFF00 + i - 0x20);
}

const upsideDownMap = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ",
  j: "ɾ", k: "ʞ", l: "ʃ", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ",
  s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  '.': '˙', ',': "'", "'": ',', '"': ',,', '?': '¿', '!': '¡', '[': ']', ']': '[',
  '(': ')', ')': '(', '{': '}', '}': '{', '<': '>', '>': '<', '_': '‾'
};

const circledMap = {
  a: 'Ⓐ', b: 'Ⓑ', c: 'Ⓒ', d: 'Ⓓ', e: 'Ⓔ', f: 'Ⓕ', g: 'Ⓖ', h: 'Ⓗ', i: 'Ⓘ', j: 'Ⓙ',
  k: 'Ⓚ', l: 'Ⓛ', m: 'Ⓜ', n: 'Ⓝ', o: 'Ⓞ', p: 'Ⓟ', q: 'Ⓠ', r: 'Ⓡ', s: 'Ⓢ', t: 'Ⓣ',
  u: 'Ⓤ', v: 'Ⓥ', w: 'Ⓦ', x: 'Ⓧ', y: 'Ⓨ', z: 'Ⓩ'
};

// Zalgo effect generator (adds combining characters randomly)
function zalgoEffect(text) {
  const zalgo_up = ['\u030d','\u030e','\u0304','\u0305','\u033f','\u0311','\u0306','\u0310','\u0352','\u0357','\u0351','\u0307','\
