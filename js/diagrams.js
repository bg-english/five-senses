/* =========================================================
   Clean, label-free SVG diagrams (viewBox 0 0 800 450).
   Labels are added by the app, so the same drawing works
   for exploring (labels on) and for testing (labels off).
   hotspots: { id: wordId, x, y, lx, ly }  (lx/ly = label position)
   ========================================================= */

function spiralPath(cx, cy, r0, r1, turns, steps) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * 2 * Math.PI;
    const r = r0 + (r1 - r0) * t;
    const x = (cx + r * Math.cos(a)).toFixed(1);
    const y = (cy + r * Math.sin(a)).toFixed(1);
    d += (i === 0 ? "M" : "L") + x + " " + y + " ";
  }
  return d;
}

function seededDots(n, seed, inside) {
  let s = seed;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  let out = "";
  let made = 0, guard = 0;
  while (made < n && guard < n * 20) {
    guard++;
    const x = 110 + rnd() * 420, y = 125 + rnd() * 200;
    if (!inside(x, y)) continue;
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(2 + rnd() * 2).toFixed(1)}"/>`;
    made++;
  }
  return out;
}

const DIAGRAMS = {
  /* ------------------------------------------------ EYE */
  sight: {
    title: "Cross-section of the human eye (side view). Light enters from the left.",
    svg: `
      <g class="d-rays" stroke="#E0A100" stroke-width="3" stroke-dasharray="9 6" fill="none">
        <path d="M30 185 L264 194 L578 225"/>
        <path d="M30 225 L578 225"/>
        <path d="M30 265 L264 256 L578 225"/>
      </g>
      <polygon points="40,212 58,225 40,238" fill="#E0A100"/>
      <circle cx="430" cy="225" r="150" fill="#FDF8F0" stroke="#CFD8DC" stroke-width="10"/>
      <path d="M370 96 A142 142 0 1 1 370 354" fill="none" stroke="#E2667A" stroke-width="8"/>
      <path d="M570 245 L770 266 L770 312 L566 283 Z" fill="#F3D58A" stroke="#D9B55A" stroke-width="2"/>
      <path d="M300 150 Q228 225 300 300 Z" fill="rgba(144,202,249,.35)" stroke="none"/>
      <path d="M300 150 Q228 225 300 300" fill="none" stroke="#64B5F6" stroke-width="5"/>
      <rect x="306" y="140" width="12" height="68" rx="5" fill="#7B5A3C"/>
      <rect x="306" y="242" width="12" height="68" rx="5" fill="#7B5A3C"/>
      <ellipse cx="352" cy="225" rx="22" ry="55" fill="#D6ECFA" stroke="#90CAF9" stroke-width="3"/>
      <circle cx="578" cy="225" r="5" fill="#E0A100"/>
    `,
    hotspots: [
      { id: "cornea", x: 262, y: 225, lx: 190, ly: 345 },
      { id: "iris", x: 312, y: 172, lx: 300, ly: 70 },
      { id: "pupil", x: 312, y: 225, lx: 150, ly: 120 },
      { id: "lens", x: 352, y: 262, lx: 380, ly: 415 },
      { id: "retina", x: 530, y: 125, lx: 620, ly: 70 },
      { id: "opticnerve", x: 690, y: 282, lx: 690, ly: 370 }
    ]
  },

  /* ------------------------------------------------ EAR */
  hearing: {
    title: "Cross-section of the human ear: outer, middle and inner ear. Sound arrives from the left.",
    svg: `
      <path d="M300 60 L800 60 L800 420 L300 420 C 320 330 320 150 300 60 Z" fill="#F5EAD7"/>
      <g fill="none" stroke="#9A4F06" stroke-width="3" stroke-dasharray="7 6">
        <path d="M34 160 Q14 225 34 290"/><path d="M54 175 Q38 225 54 275"/>
      </g>
      <path d="M150 90 C 60 90 40 200 70 280 C 90 340 120 372 152 362 C 168 330 150 300 162 268 L 176 246 L 176 202 C 202 150 202 100 150 90 Z" fill="#F2B8A0" stroke="#D4876B" stroke-width="3"/>
      <path d="M140 120 C 95 130 90 200 110 250" fill="none" stroke="#D4876B" stroke-width="3"/>
      <rect x="170" y="203" width="194" height="44" fill="#F6CDBB" stroke="#D4876B" stroke-width="2"/>
      <rect x="370" y="168" width="102" height="112" rx="20" fill="#FDE7E1" stroke="#E6B8AA" stroke-width="2"/>
      <path d="M420 278 L455 278 L560 432 L518 432 Z" fill="#F6CDBB" stroke="#E6B8AA" stroke-width="2"/>
      <ellipse cx="366" cy="225" rx="5" ry="34" fill="#B0BEC5" stroke="#78909C" stroke-width="2"/>
      <g stroke="#D9B04C" stroke-linecap="round" fill="none">
        <path d="M371 222 L396 186" stroke-width="9"/>
        <path d="M396 186 L426 190 L431 214" stroke-width="9"/>
        <path d="M431 214 L468 220" stroke-width="7"/>
      </g>
      <circle cx="510" cy="215" r="24" fill="#E8D3EE" stroke="#B48BC0" stroke-width="2"/>
      <g fill="none" stroke="#C49ACF" stroke-width="9">
        <ellipse cx="530" cy="140" rx="26" ry="40"/>
        <ellipse cx="572" cy="158" rx="38" ry="20"/>
        <ellipse cx="496" cy="165" rx="20" ry="28"/>
      </g>
      <path d="${spiralPath(565, 268, 60, 6, 2.6, 160)}" fill="none" stroke="#C49ACF" stroke-width="14" stroke-linecap="round"/>
      <path d="M612 240 C 660 228 700 206 780 190 L780 226 C 700 240 662 266 612 282 Z" fill="#F3D58A" stroke="#D9B55A" stroke-width="2"/>
    `,
    hotspots: [
      { id: "pinna", x: 88, y: 170, lx: 95, ly: 55 },
      { id: "earcanal", x: 265, y: 225, lx: 230, ly: 315 },
      { id: "eardrum", x: 366, y: 255, lx: 360, ly: 350 },
      { id: "ossicles", x: 412, y: 186, lx: 420, ly: 100 },
      { id: "cochlea", x: 565, y: 268, lx: 660, ly: 370 },
      { id: "auditorynerve", x: 705, y: 220, lx: 715, ly: 150 }
    ]
  },

  /* ------------------------------------------------ NOSE */
  smell: {
    title: "Side view of the nose and nasal cavity. The face looks to the left.",
    svg: `
      <path d="M262 20 C 252 80 242 120 222 160 L 140 288 C 130 304 140 314 160 312 L 192 312 C 197 325 192 335 186 345 C 202 350 216 346 226 360 L 226 450 L 800 450 L 800 20 Z" fill="#FBE3D6" stroke="#D9A38C" stroke-width="3"/>
      <path d="M300 20 L800 20 L800 125 C 650 112 500 106 330 120 Z" fill="#EFE3F2"/>
      <line x1="320" y1="138" x2="530" y2="138" stroke="#D8C49A" stroke-width="8" stroke-dasharray="16 6"/>
      <path d="M492 108 C 540 104 580 100 640 96" stroke="#E8C66E" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="425" cy="110" rx="70" ry="14" fill="#F3D58A" stroke="#D9B55A" stroke-width="2"/>
      <g stroke="#C9A646" stroke-width="3">
        <line x1="365" y1="122" x2="365" y2="164"/><line x1="385" y1="123" x2="385" y2="164"/>
        <line x1="405" y1="124" x2="405" y2="164"/><line x1="425" y1="124" x2="425" y2="164"/>
        <line x1="445" y1="124" x2="445" y2="164"/><line x1="465" y1="123" x2="465" y2="164"/>
      </g>
      <path d="M190 300 C 230 250 280 200 340 162 L 500 162 C 560 182 600 232 620 300 C 600 330 540 340 470 336 L 262 336 C 232 336 206 320 190 300 Z" fill="#F7C1BF" stroke="#E38F8B" stroke-width="3"/>
      <rect x="345" y="162" width="150" height="18" rx="8" fill="#FFE082" stroke="#E0B84C" stroke-width="2"/>
      <ellipse cx="440" cy="222" rx="85" ry="14" fill="#EE9F9B" opacity=".7"/>
      <ellipse cx="455" cy="272" rx="105" ry="16" fill="#EE9F9B" opacity=".7"/>
      <ellipse cx="178" cy="306" rx="16" ry="8" fill="#B8645E"/>
      <path d="M120 350 Q165 330 196 300 Q290 215 400 188" fill="none" stroke="#1B6E43" stroke-width="3" stroke-dasharray="8 6"/>
      <polygon points="392,180 410,186 396,198" fill="#1B6E43"/>
    `,
    hotspots: [
      { id: "nostril", x: 178, y: 306, lx: 95, ly: 395 },
      { id: "nasalcavity", x: 330, y: 300, lx: 340, ly: 395 },
      { id: "olfreceptors", x: 470, y: 171, lx: 640, ly: 200 },
      { id: "olfnerve", x: 375, y: 147, lx: 245, ly: 175 },
      { id: "olfbulb", x: 440, y: 105, lx: 450, ly: 55 }
    ]
  },

  /* ------------------------------------------------ TONGUE */
  taste: {
    title: "Top view of the tongue (tip on the left) with a magnified taste bud on the right.",
    svg: `
      <path id="tg" d="M90 225 C 90 140 200 110 330 112 C 460 114 560 120 620 160 C 650 185 650 265 620 290 C 560 330 460 336 330 338 C 200 340 90 310 90 225 Z" fill="#F19A9A" stroke="#D46A6A" stroke-width="3"/>
      <path d="M125 225 L560 225" stroke="#D97878" stroke-width="3"/>
      <g fill="#F8C4C4">${seededDots(140, 7, (x, y) => {
        const dx = (x - 360) / 270, dy = (y - 225) / 105; return dx * dx + dy * dy < 0.9;
      })}</g>
      <g fill="#E57373" stroke="#C85A5A" stroke-width="2">
        <circle cx="592" cy="225" r="8"/><circle cx="578" cy="200" r="8"/><circle cx="578" cy="250" r="8"/>
        <circle cx="562" cy="177" r="8"/><circle cx="562" cy="273" r="8"/>
      </g>
      <circle cx="300" cy="170" r="8" fill="#FBD0D0" stroke="#A8234A" stroke-width="3"/>
      <line x1="308" y1="166" x2="612" y2="190" stroke="#A8234A" stroke-width="2" stroke-dasharray="6 5"/>
      <clipPath id="insetClip"><circle cx="700" cy="210" r="90"/></clipPath>
      <g clip-path="url(#insetClip)">
        <rect x="600" y="110" width="200" height="200" fill="#FBD3D3"/>
        <path d="M600 150 L668 150 C 680 150 690 160 696 156 L704 156 C 710 160 720 150 732 150 L800 150 L800 110 L600 110 Z" fill="#F7A9A9"/>
        <ellipse cx="700" cy="205" rx="32" ry="50" fill="#F6B0B8" stroke="#C75C6C" stroke-width="2"/>
        <g fill="#E98A99" stroke="#C75C6C" stroke-width="1.5">
          <ellipse cx="686" cy="208" rx="7" ry="38"/><ellipse cx="700" cy="205" rx="7" ry="42"/><ellipse cx="714" cy="208" rx="7" ry="38"/>
        </g>
        <g stroke="#E0B84C" stroke-width="4" fill="none">
          <path d="M690 252 C 688 270 680 290 676 310"/><path d="M700 255 C 700 275 700 295 700 310"/><path d="M710 252 C 712 270 720 290 724 310"/>
        </g>
      </g>
      <circle cx="700" cy="210" r="90" fill="none" stroke="#A8234A" stroke-width="3"/>
    `,
    hotspots: [
      { id: "tongue", x: 220, y: 270, lx: 220, ly: 390 },
      { id: "papillae", x: 300, y: 170, lx: 300, ly: 75 },
      { id: "tastebuds", x: 668, y: 188, lx: 590, ly: 80 },
      { id: "tastecells", x: 714, y: 222, lx: 765, ly: 95 },
      { id: "tastenerve", x: 700, y: 282, lx: 700, ly: 345 }
    ]
  },

  /* ------------------------------------------------ SKIN */
  touch: {
    title: "Cross-section of the skin showing its three layers, receptors and a nerve.",
    svg: `
      <rect x="150" y="300" width="620" height="120" fill="#FFF1C9"/>
      <g fill="none" stroke="#EBD58F" stroke-width="2">
        <circle cx="200" cy="350" r="16"/><circle cx="240" cy="385" r="16"/><circle cx="290" cy="345" r="16"/>
        <circle cx="340" cy="390" r="16"/><circle cx="400" cy="350" r="16"/><circle cx="560" cy="390" r="16"/>
        <circle cx="610" cy="350" r="16"/><circle cx="660" cy="395" r="16"/><circle cx="440" cy="398" r="16"/>
      </g>
      <rect x="150" y="120" width="620" height="180" fill="#F8C9C4"/>
      <path d="M150 70 L770 70 L770 120 C 740 132 720 108 690 120 C 660 132 640 108 610 120 C 580 132 560 108 530 120 C 500 132 480 108 450 120 C 420 132 400 108 370 120 C 340 132 320 108 290 120 C 260 132 240 108 210 120 C 190 128 170 112 150 120 Z" fill="#F6D5B8" stroke="#E2B48E" stroke-width="2"/>
      <path d="M150 304 C 300 292 500 316 770 300" stroke="#E53935" stroke-width="6" fill="none"/>
      <path d="M150 322 C 320 310 520 332 770 318" stroke="#1E63C4" stroke-width="6" fill="none"/>
      <ellipse cx="392" cy="236" rx="16" ry="34" fill="#E8B49A" stroke="#C98B6E" stroke-width="2"/>
      <line x1="372" y1="12" x2="392" y2="250" stroke="#5D4037" stroke-width="6" stroke-linecap="round"/>
      <path d="M262 72 L262 230" stroke="#90CAF9" stroke-width="4"/>
      <g fill="none" stroke="#64A8E8" stroke-width="5">
        <circle cx="262" cy="244" r="12"/><circle cx="276" cy="256" r="10"/><circle cx="250" cy="258" r="10"/>
      </g>
      <ellipse cx="560" cy="142" rx="10" ry="16" fill="#F3D58A" stroke="#C9A646" stroke-width="2"/>
      <g fill="none" stroke="#C9A646" stroke-width="2">
        <ellipse cx="500" cy="292" rx="24" ry="17"/><ellipse cx="500" cy="292" rx="16" ry="11"/><ellipse cx="500" cy="292" rx="8" ry="5"/>
      </g>
      <g fill="none" stroke="#C9A646" stroke-width="3">
        <path d="M640 98 L648 150"/><path d="M660 96 L652 150"/>
      </g>
      <g fill="none" stroke="#D9B04C" stroke-width="4">
        <path d="M560 158 C 580 250 620 330 690 342"/>
        <path d="M524 292 C 580 320 630 344 690 346"/>
        <path d="M650 150 C 660 250 670 320 690 338"/>
      </g>
      <path d="M690 336 L770 338 L770 356 L690 352 Z" fill="#F3D58A" stroke="#C9A646" stroke-width="2"/>
      <g stroke="#7d8985" stroke-width="2">
        <line x1="140" y1="70" x2="140" y2="120"/><line x1="140" y1="122" x2="140" y2="298"/><line x1="140" y1="302" x2="140" y2="420"/>
      </g>
    `,
    hotspots: [
      { id: "epidermis", x: 190, y: 95, lx: 70, ly: 99 },
      { id: "dermis", x: 190, y: 210, lx: 70, ly: 214 },
      { id: "hypodermis", x: 190, y: 360, lx: 70, ly: 364 },
      { id: "receptor", x: 560, y: 142, lx: 575, ly: 40 },
      { id: "nerve", x: 735, y: 346, lx: 735, ly: 440 }
    ]
  }
};
