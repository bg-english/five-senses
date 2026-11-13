/* =========================================================
   Clean, label-free SVG diagrams (viewBox 0 0 800 450).
   Enhanced with:
   - Anatomical & optical precision (refraction, gaps, bone joints, papilla clefts)
   - Animated signal path overlay for interactive transduction visualization
   - Dynamic hotspot positioning & labeling for Explore & Test-Me modes
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
  /* ------------------------------------------------ EYE (SIGHT) */
  sight: {
    title: "Cross-section of the human eye (side view). Light refracts through cornea and lens to focus on the retina.",
    signalPath: "M 30,225 L 262,225 L 352,225 L 578,225 L 690,282 L 780,290",
    svg: `
      <!-- Sclera (White outer coating) -->
      <circle cx="430" cy="225" r="152" fill="#F8FAFC" stroke="#CFD8DC" stroke-width="10"/>

      <!-- Choroid vascular layer -->
      <path d="M366 98 A142 142 0 1 1 568 244" fill="none" stroke="#795548" stroke-width="5"/>
      <path d="M564 286 A142 142 0 0 1 366 352" fill="none" stroke="#795548" stroke-width="5"/>

      <!-- Retina (Sensory layer with physiological blind spot gap at optic disc) -->
      <path d="M370 100 A138 138 0 0 1 566 242" fill="none" stroke="#E11D48" stroke-width="7" stroke-linecap="round"/>
      <path d="M562 288 A138 138 0 0 1 370 350" fill="none" stroke="#E11D48" stroke-width="7" stroke-linecap="round"/>
      <!-- Fovea centralis depression -->
      <circle cx="578" cy="215" r="4" fill="#BE123C"/>

      <!-- Vitreous Chamber -->
      <circle cx="430" cy="225" r="130" fill="rgba(224, 242, 254, 0.45)"/>

      <!-- Optic Nerve Exit (Cranial Nerve II) -->
      <path d="M566 242 L770 262 L770 316 L562 288 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>
      <!-- Retinal blood vessels in optic nerve -->
      <line x1="565" y1="265" x2="770" y2="289" stroke="#E11D48" stroke-width="3"/>

      <!-- Cornea (Anterior clear refractive window) -->
      <path d="M300 150 Q220 225 300 300 Z" fill="rgba(186, 230, 253, 0.5)" stroke="none"/>
      <path d="M300 150 Q220 225 300 300" fill="none" stroke="#38BDF8" stroke-width="5.5" stroke-linecap="round"/>

      <!-- Ciliary Body and Suspensory Zonules -->
      <g fill="#475569">
        <polygon points="334,142 360,146 352,170 338,162"/>
        <polygon points="334,308 360,304 352,280 338,288"/>
      </g>
      <g stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="2 2">
        <line x1="346" y1="168" x2="352" y2="182"/>
        <line x1="346" y1="282" x2="352" y2="268"/>
      </g>

      <!-- Iris (Colored contractile muscular ring) -->
      <rect x="306" y="142" width="14" height="66" rx="6" fill="#854D0E" stroke="#713F12" stroke-width="1.5"/>
      <rect x="306" y="242" width="14" height="66" rx="6" fill="#854D0E" stroke="#713F12" stroke-width="1.5"/>

      <!-- Pupil (Central aperture) -->
      <line x1="313" y1="208" x2="313" y2="242" stroke="transparent" stroke-width="2"/>

      <!-- Crystalline Lens (Biconvex refractive structure) -->
      <ellipse cx="352" cy="225" rx="22" ry="54" fill="#E0F2FE" stroke="#0284C7" stroke-width="3.5"/>

      <!-- Optical Light Rays showing dual refraction at Cornea AND Lens -->
      <g class="d-rays" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="8 5" fill="none">
        <!-- Top ray: refracts at cornea (x=254), refracts at lens (x=352), crosses optical axis to retina -->
        <path d="M30 185 L 254 195 L 352 210 L 578 225"/>
        <!-- Central axial ray -->
        <path d="M30 225 L 578 225"/>
        <!-- Bottom ray: refracts at cornea, refracts at lens, crosses to retina -->
        <path d="M30 265 L 254 255 L 352 240 L 578 225"/>
      </g>
      <polygon points="38,214 56,225 38,236" fill="#EAB308"/>
      <circle cx="578" cy="225" r="5" fill="#EAB308"/>

      <!-- Animated Pulse Path (Hidden by default, activated on demand) -->
      <path class="signal-pulse-path" d="M 30,225 L 262,225 L 352,225 L 578,225 L 690,282 L 780,290" fill="none" stroke="#6366F1" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>
    `,
    hotspots: [
      { id: "cornea", x: 262, y: 225, lx: 180, ly: 345 },
      { id: "iris", x: 313, y: 172, lx: 300, ly: 68 },
      { id: "pupil", x: 313, y: 225, lx: 145, ly: 120 },
      { id: "lens", x: 352, y: 262, lx: 385, ly: 415 },
      { id: "retina", x: 535, y: 125, lx: 630, ly: 68 },
      { id: "opticnerve", x: 690, y: 282, lx: 690, ly: 375 }
    ]
  },

  /* ------------------------------------------------ EAR (HEARING) */
  hearing: {
    title: "Cross-section of the human ear: outer, middle and inner ear. Sound vibrations travel to cochlea.",
    signalPath: "M 40,225 L 120,225 L 265,225 L 366,225 L 420,195 L 486,225 L 565,268 L 715,220 L 785,210",
    svg: `
      <!-- Cranial Bone Surrounding Middle & Inner Ear -->
      <path d="M300 60 L800 60 L800 420 L300 420 C 325 330 325 150 300 60 Z" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2"/>

      <!-- Acoustic Sound Waves (Airborne pressure waves) -->
      <g fill="none" stroke="#EA580C" stroke-width="3" stroke-dasharray="7 6">
        <path d="M30 150 Q10 225 30 300"/>
        <path d="M55 168 Q38 225 55 282"/>
        <path d="M80 185 Q68 225 80 265"/>
      </g>

      <!-- Pinna / Auricle (Outer cartilaginous flap) -->
      <path d="M150 85 C 55 85 35 195 65 280 C 85 345 118 375 152 365 C 168 332 150 300 162 268 L 176 246 L 176 202 C 205 145 205 95 150 85 Z" fill="#FED7AA" stroke="#FB923C" stroke-width="3.5"/>
      <path d="M138 118 C 90 128 85 200 108 252" fill="none" stroke="#FB923C" stroke-width="3"/>

      <!-- External Auditory Canal -->
      <rect x="170" y="202" width="196" height="46" fill="#FFEDD5" stroke="#FB923C" stroke-width="2"/>

      <!-- Middle Ear Tympanic Cavity -->
      <rect x="368" y="162" width="118" height="126" rx="22" fill="#FEF3C7" stroke="#FDE68A" stroke-width="2"/>

      <!-- Eustachian Tube to Nasopharynx -->
      <path d="M420 286 L455 286 L565 432 L518 432 Z" fill="#FED7AA" stroke="#FDBA74" stroke-width="2"/>

      <!-- Eardrum (Tympanic Membrane) -->
      <ellipse cx="366" cy="225" rx="5.5" ry="36" fill="#94A3B8" stroke="#475569" stroke-width="2.5"/>

      <!-- The Three Ossicles (Malleus, Incus, and Stapes with footplate on oval window) -->
      <g stroke="#B45309" stroke-linecap="round" stroke-linejoin="round" fill="#FDE68A">
        <!-- Malleus (Hammer, attached to eardrum) -->
        <path d="M368 224 L396 182 L406 188 L380 232 Z" stroke-width="2"/>
        <!-- Incus (Anvil) -->
        <path d="M400 180 L434 186 L432 216 L418 206 Z" stroke-width="2"/>
        <!-- Stapes (Stirrup) with arch and footplate resting on oval window at x=486 -->
        <path d="M432 216 L458 208 L484 210 L484 226 L458 228 Z" stroke-width="2"/>
        <line x1="485" y1="206" x2="485" y2="230" stroke="#9A3412" stroke-width="5"/>
      </g>

      <!-- Vestibule and Semicircular Canals (Balance system) -->
      <circle cx="510" cy="216" r="26" fill="#E0E7FF" stroke="#818CF8" stroke-width="2.5"/>
      <g fill="none" stroke="#A5B4FC" stroke-width="8" stroke-linecap="round">
        <ellipse cx="530" cy="140" rx="26" ry="40"/>
        <ellipse cx="576" cy="158" rx="38" ry="20"/>
        <ellipse cx="494" cy="165" rx="20" ry="28"/>
      </g>

      <!-- Cochlea (Organ of hearing with spiral basilar membrane) -->
      <path d="${spiralPath(565, 268, 62, 7, 2.6, 160)}" fill="none" stroke="#818CF8" stroke-width="15" stroke-linecap="round"/>

      <!-- Auditory Nerve (CN VIII) conveying signals to temporal lobe -->
      <path d="M612 240 C 660 228 700 206 780 190 L780 228 C 700 242 662 268 612 284 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>
      <line x1="615" y1="262" x2="778" y2="210" stroke="#D97706" stroke-width="2.5" stroke-dasharray="6 4"/>

      <!-- Animated Pulse Path -->
      <path class="signal-pulse-path" d="M 40,225 L 120,225 L 265,225 L 366,225 L 420,195 L 486,225 L 565,268 L 715,220 L 785,210" fill="none" stroke="#EA580C" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>
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

  /* ------------------------------------------------ NOSE (SMELL) */
  smell: {
    title: "Side view of the nasal cavity and olfactory system. Odorant molecules dissolve in mucus and stimulate olfactory cilia.",
    signalPath: "M 120,350 L 178,306 L 330,280 L 430,172 L 430,135 L 440,105 L 640,96 L 780,94",
    svg: `
      <!-- Facial Profile & Cranial Bone -->
      <path d="M262 20 C 252 80 242 120 222 160 L 140 288 C 130 304 140 314 160 312 L 192 312 C 197 325 192 335 186 345 C 202 350 216 346 226 360 L 226 450 L 800 450 L 800 20 Z" fill="#FDF2E9" stroke="#FDBA74" stroke-width="3"/>

      <!-- Cranial Cavity & Frontal Lobe Base -->
      <path d="M300 20 L800 20 L800 125 C 650 112 500 106 330 120 Z" fill="#F3E8FF"/>

      <!-- Ethmoid Bone: Cribriform Plate (Sieve-like perforated plate) -->
      <line x1="330" y1="138" x2="540" y2="138" stroke="#D1D5DB" stroke-width="10" stroke-dasharray="14 7"/>

      <!-- Olfactory Tract to Limbic System & Temporal Lobe -->
      <path d="M492 108 C 550 104 620 98 780 94" stroke="#F59E0B" stroke-width="9" fill="none" stroke-linecap="round"/>

      <!-- Olfactory Bulb (Forebrain structure) -->
      <ellipse cx="440" cy="106" rx="76" ry="16" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>

      <!-- Olfactory Nerve Fibers (CN I) passing through cribriform perforations -->
      <g stroke="#D97706" stroke-width="3">
        <line x1="375" y1="120" x2="375" y2="164"/>
        <line x1="395" y1="122" x2="395" y2="164"/>
        <line x1="415" y1="123" x2="415" y2="164"/>
        <line x1="435" y1="123" x2="435" y2="164"/>
        <line x1="455" y1="122" x2="455" y2="164"/>
        <line x1="475" y1="120" x2="475" y2="164"/>
      </g>

      <!-- Nasal Cavity & Respiratory Turbinates -->
      <path d="M190 300 C 230 250 280 200 340 162 L 500 162 C 560 182 600 232 620 300 C 600 330 540 340 470 336 L 262 336 C 232 336 206 320 190 300 Z" fill="#FEE2E2" stroke="#FCA5A5" stroke-width="3"/>

      <!-- Olfactory Epithelium (Sensory receptor layer at roof of cavity) -->
      <rect x="350" y="162" width="150" height="18" rx="8" fill="#FEF08A" stroke="#EAB308" stroke-width="2"/>
      <!-- Aqueous Mucus Layer covering olfactory cilia -->
      <rect x="350" y="176" width="150" height="8" rx="3" fill="#BAE6FD" opacity="0.8"/>

      <!-- Nasal Turbinates (Curved spongy bones creating airflow turbulence) -->
      <ellipse cx="440" cy="225" rx="85" ry="14" fill="#FCA5A5" opacity=".7"/>
      <ellipse cx="455" cy="275" rx="105" ry="16" fill="#FCA5A5" opacity=".7"/>

      <!-- Nostril (Naris opening) -->
      <ellipse cx="178" cy="306" rx="16" ry="8" fill="#991B1B"/>

      <!-- Inhaled Airflow Vector with Odorant Molecules -->
      <path d="M120 350 Q165 330 196 300 Q290 215 410 185" fill="none" stroke="#16A34A" stroke-width="3.5" stroke-dasharray="8 6"/>
      <polygon points="404,178 422,185 408,196" fill="#16A34A"/>

      <!-- Animated Pulse Path -->
      <path class="signal-pulse-path" d="M 120,350 L 178,306 L 330,280 L 430,172 L 430,135 L 440,105 L 640,96 L 780,94" fill="none" stroke="#16A34A" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>
    `,
    hotspots: [
      { id: "nostril", x: 178, y: 306, lx: 95, ly: 395 },
      { id: "nasalcavity", x: 330, y: 300, lx: 340, ly: 395 },
      { id: "olfreceptors", x: 430, y: 172, lx: 640, ly: 200 },
      { id: "olfnerve", x: 375, y: 147, lx: 245, ly: 175 },
      { id: "olfbulb", x: 440, y: 105, lx: 450, ly: 55 }
    ]
  },

  /* ------------------------------------------------ TONGUE (TASTE) */
  taste: {
    title: "Dorsal surface of the tongue and high-magnification inset of a lingual papilla and taste bud.",
    signalPath: "M 220,270 L 300,170 L 610,188 L 668,188 L 700,215 L 700,320 L 780,330",
    svg: `
      <!-- Tongue Dorsal Surface (Muscular body) -->
      <path id="tg" d="M90 225 C 90 140 200 110 330 112 C 460 114 560 120 620 160 C 650 185 650 265 620 290 C 560 330 460 336 330 338 C 200 340 90 310 90 225 Z" fill="#FDA4AF" stroke="#F43F5E" stroke-width="3"/>
      <path d="M125 225 L560 225" stroke="#FB7185" stroke-width="3"/>

      <!-- Lingual Papillae surface field -->
      <g fill="#FECDD3">${seededDots(140, 7, (x, y) => {
        const dx = (x - 360) / 270, dy = (y - 225) / 105; return dx * dx + dy * dy < 0.9;
      })}</g>

      <!-- Circumvallate Papillae V-shaped row at back of tongue -->
      <g fill="#E11D48" stroke="#BE123C" stroke-width="2">
        <circle cx="592" cy="225" r="9"/>
        <circle cx="578" cy="198" r="9"/>
        <circle cx="578" cy="252" r="9"/>
        <circle cx="560" cy="174" r="9"/>
        <circle cx="560" cy="276" r="9"/>
      </g>

      <!-- Fungiform Papilla target for magnification inset -->
      <circle cx="300" cy="170" r="10" fill="#FFE4E6" stroke="#9F1239" stroke-width="3.5"/>
      <line x1="308" y1="166" x2="610" y2="188" stroke="#9F1239" stroke-width="2" stroke-dasharray="6 5"/>

      <!-- Magnification Inset Circle -->
      <clipPath id="insetClip"><circle cx="700" cy="210" r="92"/></clipPath>
      <g clip-path="url(#insetClip)">
        <rect x="600" y="110" width="200" height="200" fill="#FFE4E6"/>

        <!-- Papilla Trench / Lateral Cleft where saliva flows -->
        <path d="M600 150 L660 150 C 672 150 678 165 684 175 C 690 165 696 150 710 150 L800 150 L800 110 L600 110 Z" fill="#F43F5E"/>

        <!-- Microscopic Taste Bud within Papilla wall -->
        <ellipse cx="700" cy="210" rx="34" ry="52" fill="#FECDD3" stroke="#9F1239" stroke-width="2.5"/>

        <!-- Taste Pore opening at apex -->
        <ellipse cx="700" cy="160" rx="6" ry="3" fill="#881337"/>

        <!-- Gustatory Receptor Cells with apical microvilli -->
        <g fill="#FB7185" stroke="#9F1239" stroke-width="1.5">
          <ellipse cx="686" cy="212" rx="7" ry="40"/>
          <ellipse cx="700" cy="210" rx="7" ry="44"/>
          <ellipse cx="714" cy="212" rx="7" ry="40"/>
        </g>

        <!-- Sensory Nerve Fibers emerging from base (CN VII, IX, X) -->
        <g stroke="#D97706" stroke-width="3.5" fill="none">
          <path d="M690 252 C 688 274 680 292 676 312"/>
          <path d="M700 255 C 700 276 700 295 700 312"/>
          <path d="M710 252 C 712 274 720 292 724 312"/>
        </g>
      </g>
      <circle cx="700" cy="210" r="92" fill="none" stroke="#9F1239" stroke-width="3.5"/>

      <!-- Animated Pulse Path -->
      <path class="signal-pulse-path" d="M 220,270 L 300,170 L 610,188 L 668,188 L 700,215 L 700,320 L 780,330" fill="none" stroke="#9F1239" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>
    `,
    hotspots: [
      { id: "tongue", x: 220, y: 270, lx: 220, ly: 390 },
      { id: "papillae", x: 300, y: 170, lx: 300, ly: 75 },
      { id: "tastebuds", x: 668, y: 188, lx: 585, ly: 80 },
      { id: "tastecells", x: 714, y: 222, lx: 765, ly: 95 },
      { id: "tastenerve", x: 700, y: 285, lx: 700, ly: 345 }
    ]
  },

  /* ------------------------------------------------ SKIN (TOUCH) */
  touch: {
    title: "Cross-section of human skin showing the epidermis, dermis, hypodermis, and specialized somatosensory mechanoreceptors.",
    signalPath: "M 372,20 L 392,236 L 560,142 L 690,342 L 770,346",
    svg: `
      <!-- Hypodermis Layer (Subcutaneous adipose fat lobules) -->
      <rect x="150" y="300" width="620" height="120" fill="#FEF3C7"/>
      <g fill="none" stroke="#FDE68A" stroke-width="2.5">
        <circle cx="200" cy="350" r="16"/><circle cx="240" cy="385" r="16"/><circle cx="290" cy="345" r="16"/>
        <circle cx="340" cy="390" r="16"/><circle cx="400" cy="350" r="16"/><circle cx="560" cy="390" r="16"/>
        <circle cx="610" cy="350" r="16"/><circle cx="660" cy="395" r="16"/><circle cx="440" cy="398" r="16"/>
      </g>

      <!-- Dermis Layer (Vascular middle connective tissue) -->
      <rect x="150" y="120" width="620" height="180" fill="#FECDD3"/>

      <!-- Epidermis Layer with Dermal Papillae ridges -->
      <path d="M150 70 L770 70 L770 120 C 740 132 720 108 690 120 C 660 132 640 108 610 120 C 580 132 560 108 530 120 C 500 132 480 108 450 120 C 420 132 400 108 370 120 C 340 132 320 108 290 120 C 260 132 240 108 210 120 C 190 128 170 112 150 120 Z" fill="#FED7AA" stroke="#FDBA74" stroke-width="2.5"/>

      <!-- Blood Capillary loop in dermal papilla -->
      <path d="M150 304 C 300 292 500 316 770 300" stroke="#EF4444" stroke-width="5" fill="none"/>
      <path d="M150 322 C 320 310 520 332 770 318" stroke="#3B82F6" stroke-width="5" fill="none"/>

      <!-- Hair Follicle with Hair Shaft penetrating epidermis -->
      <ellipse cx="392" cy="236" rx="16" ry="34" fill="#FCA5A5" stroke="#E11D48" stroke-width="2"/>
      <line x1="372" y1="12" x2="392" y2="250" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>

      <!-- Meissner's Corpuscle (Light touch / flutter in dermal papilla) -->
      <ellipse cx="560" cy="142" rx="12" ry="18" fill="#FEF08A" stroke="#CA8A04" stroke-width="2.5"/>

      <!-- Pacinian Corpuscle (Concentric lamellae for deep vibration in reticular dermis) -->
      <g fill="none" stroke="#CA8A04" stroke-width="2.5">
        <ellipse cx="500" cy="292" rx="26" ry="18"/>
        <ellipse cx="500" cy="292" rx="18" ry="12"/>
        <ellipse cx="500" cy="292" rx="10" ry="6"/>
      </g>

      <!-- Free Nerve Endings (Nociceptors/pain branching into epidermis) -->
      <g fill="none" stroke="#B45309" stroke-width="3">
        <path d="M640 88 L648 150"/>
        <path d="M660 86 L652 150"/>
        <path d="M648 150 C 655 210 665 280 690 338"/>
      </g>

      <!-- Sensory Nerve Trunk -->
      <g fill="none" stroke="#D97706" stroke-width="4">
        <path d="M560 158 C 580 250 620 330 690 342"/>
        <path d="M524 292 C 580 320 630 344 690 346"/>
      </g>
      <path d="M690 336 L770 338 L770 356 L690 352 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>

      <!-- Layer Dimension Brackets -->
      <g stroke="#64748B" stroke-width="2">
        <line x1="140" y1="70" x2="140" y2="120"/>
        <line x1="140" y1="122" x2="140" y2="298"/>
        <line x1="140" y1="302" x2="140" y2="420"/>
      </g>

      <!-- Animated Pulse Path -->
      <path class="signal-pulse-path" d="M 372,20 L 392,236 L 560,142 L 690,342 L 770,346" fill="none" stroke="#0891B2" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>
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
