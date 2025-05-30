const input = document.getElementById("stylishInput");
    const output = document.getElementById("stylishOutput");

    const styles = [
      t => [...t].map(c => "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d56f - 0x61) : c).join(""),
      t => [...t].map(c => "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d4cf - 0x61) : c).join(""),
      t => [...t].map(c => "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d53f - 0x61) : c).join(""),
      t => [...t].map(c => "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d52f - 0x61) : c).join(""),
      t => [...t].map(c => "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d3bf - 0x61) : c).join(""),
      t => [...t].map(c => "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d63f - 0x61) : c).join(""),
      t => [...t].map(c => "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻".includes(c.toLowerCase()) ? String.fromCharCode(c.toLowerCase().charCodeAt(0) + 0x1d455 - 0x61) : c).join(""),
      t => t.split('').reverse().join(''),
      t => t.toUpperCase(),
      t => t.toLowerCase(),
      t => t.replace(/[a-z]/gi, c => {
        const base = c === c.toLowerCase() ? 0x24d0 : 0x24b6;
        const offset = c.toLowerCase().charCodeAt(0) - 97;
        return String.fromCharCode(base + offset);
      }),
      t => t.replace(/[a-z]/gi, c => {
        const wide = {
          'a':'ａ','b':'ｂ','c':'ｃ','d':'ｄ','e':'ｅ','f':'ｆ','g':'ｇ','h':'ｈ','i':'ｉ','j':'ｊ','k':'ｋ','l':'ｌ','m':'ｍ',
          'n':'ｎ','o':'ｏ','p':'ｐ','q':'ｑ','r':'ｒ','s':'ｓ','t':'ｔ','u':'ｕ','v':'ｖ','w':'ｗ','x':'ｘ','y':'ｙ','z':'ｚ',
          'A':'Ａ','B':'Ｂ','C':'Ｃ','D':'Ｄ','E':'Ｅ','F':'Ｆ','G':'Ｇ','H':'Ｈ','I':'Ｉ','J':'Ｊ','K':'Ｋ','L':'Ｌ','M':'Ｍ',
          'N':'Ｎ','O':'Ｏ','P':'Ｐ','Q':'Ｑ','R':'Ｒ','S':'Ｓ','T':'Ｔ','U':'Ｕ','V':'Ｖ','W':'Ｗ','X':'Ｘ','Y':'Ｙ','Z':'Ｚ'
        };
        return wide[c] || c;
      }),
      t => t.replace(/[aeiouw]/gi, v => v + '💎'),
      t => t.replace(/[aeiou]/gi, v => '✨' + v + '✨'),
      t => t.split('').join('🔥'),
      t => t.replace(/./g, c => c + '͙'),
      t => t.replace(/./g, c => c + '⃠'),
      t => t.replace(/./g, c => c + '͜'),
      t => t.replace(/./g, c => c + '̷'),
      t => t.replace(/./g, c => c + '̶'),
      t => t.replace(/./g, c => c + '̿'),
      t => t.replace(/./g, c => c + '̾'),
      t => t.replace(/./g, c => c + '̽'),
      t => t.replace(/./g, c => c + '͟'),
      t => [...t].map(c => c + '⭐').join(''),
      t => [...t].map(c => '💖' + c).join(''),
      t => [...t].map(c => '✦' + c + '✦').join(''),
    ];

    function generateStyledText(inputText) {
      output.innerHTML = "";
      if (!inputText.trim()) return;

      styles.forEach(styleFn => {
        const styled = styleFn(inputText);
        const container = document.createElement("div");
        container.className = "flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition";

        const text = document.createElement("span");
        text.textContent = styled;
        text.className = "text-sm break-all flex-1 pr-3";

        const button = document.createElement("button");
        button.innerHTML = "📋";
        button.className = "text-blue-600 hover:text-blue-800 text-lg";
        button.onclick = () => {
          navigator.clipboard.writeText(styled);
          button.innerHTML = "✅";
          setTimeout(() => (button.innerHTML = "📋"), 1000);
        };

        container.appendChild(text);
        container.appendChild(button);
        output.appendChild(container);
      });
    }

    input.addEventListener("input", e => {
      generateStyledText(e.target.value);
    });
