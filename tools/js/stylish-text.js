const styles = [
    { name: "Bold", transform: t => t.replace(/./g, c => "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d3bf - 0x61) : c) },
    { name: "Italic", transform: t => t.replace(/./g, c => "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d455 - 0x61) : c) },
    { name: "Bold Italic", transform: t => t.replace(/./g, c => "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d63f - 0x61) : c) },
    { name: "Monospace", transform: t => t.replace(/./g, c => "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d68f - 0x61) : c) },
    { name: "Double Struck", transform: t => t.replace(/./g, c => "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d53f - 0x61) : c) },
    { name: "Small Caps", transform: t => t.replace(/[a-z]/g, c => "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ"[c.charCodeAt(0) - 97]) },
    { name: "Upside Down", transform: t => t.split('').reverse().map(c => {
      const map = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ',
        'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ',
        'k': 'ʞ', 'l': 'ʃ', 'm': 'ɯ', 'n': 'u', 'o': 'o',
        'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ',
        'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ',
        'z': 'z', '.': '˙', ',': "'", "'": ',', '"': ',,',
        '_': '‾', '?': '¿', '!': '¡', '[': ']', ']': '[',
        '(': ')', ')': '(', '{': '}', '}': '{'
      };
      return map[c.toLowerCase()] || c;
    }).join('') },
    { name: "Mirror Text", transform: t => t.split('').reverse().join('') },
    { name: "Wide Text", transform: t => t.split('').map(c => c === ' ' ? '  ' : String.fromCharCode(c.charCodeAt(0) + 0xFF00 - 0x20)).join('') },
    { name: "Bubble Text", transform: t => t.replace(/[a-z]/gi, c => {
      const base = c === c.toLowerCase() ? 0x24d0 : 0x24b6;
      const offset = c.toLowerCase().charCodeAt(0) - 97;
      return String.fromCharCode(base + offset);
    }) },
    { name: "Squared Text", transform: t => t.replace(/[a-z]/gi, c => {
      const map = {
        'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶',
        'H': '🄷', 'I': '🄸', 'J': '🄹', 'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽',
        'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃', 'U': '🅄',
        'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉',
        'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶',
        'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽',
        'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄',
        'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉'
      };
      return map[c] || c;
    }) },
    { name: "Leet Speak", transform: t => t.replace(/[a-z]/gi, c => {
      const map = {
        A: '4', B: '8', C: '<', D: '[)', E: '3', F: 'ƒ', G: '6', H: '#',
        I: '1', J: '_|', K: '|<', L: '1', M: '/\\/\\', N: '|\\|', O: '0',
        P: '|D', Q: '(,)', R: 'Я', S: '$', T: '7', U: '|_|', V: '\\/',
        W: '\\/\\/', X: '><', Y: '`/', Z: '2'
      };
      return map[c.toUpperCase()] || c;
    }) },
    // Add more designs here as needed...
  ];

  const input = document.getElementById("stylishInput");
  const output = document.getElementById("stylishOutput");

  input.addEventListener("input", () => {
    const text = input.value;
    output.innerHTML = "";

    styles.forEach(style => {
      const div = document.createElement("div");
      div.className = "p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition";
      div.innerHTML = `<strong>${style.name}</strong><br><span class="break-all">${style.transform(text)}</span>`;
      output.appendChild(div);
    });
  });
