/* =========================================================
   The Five Senses — Pixar Lighting + National Geographic
   Editorial Scientific Cutaway & Histological Diagrams (v4.0)
   viewBox: 0 0 800 450
   Features:
   - Volumetric 3D radial & linear gradients + Subsurface Scattering
   - Specular highlights on wet/refractive tissues (cornea, lens, cochlea, mucosa)
   - Bio-luminescent filter (#bio-glow) for signal transduction pulses
   - Histological magnification insets (Retina x400, Corti, Olfactory cilia, Taste bud 50um)
   - True 3D Isometric Tissue Block for Skin (Touch)
   - Technical editorial scale bars & anatomical section headers
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
    const r = (1.6 + rnd() * 1.8).toFixed(1);
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r}" opacity="${(0.45 + rnd()*0.45).toFixed(2)}"/>`;
    made++;
  }
  return out;
}

const SHARED_SVG_DEFS = `
  <defs>
    <!-- Depth Drop Shadow -->
    <filter id="organ-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.16"/>
    </filter>
    <!-- Pixar Bio-Glow Luminescence -->
    <filter id="bio-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <!-- Trabecular Bone Pattern -->
    <pattern id="trabecular-bone" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="#F1F5F9"/>
      <circle cx="3" cy="4" r="2.2" fill="#E2E8F0"/>
      <circle cx="10" cy="10" r="2.6" fill="#E2E8F0"/>
      <circle cx="11" cy="3" r="1.4" fill="#CBD5E1"/>
    </pattern>
    <!-- Sclera 3D Sphere Gradient -->
    <radialGradient id="sclera-3d" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="68%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </radialGradient>
    <!-- Vitreous Humor Luminosity -->
    <radialGradient id="vitreous-depth" cx="42%" cy="46%" r="55%">
      <stop offset="0%" stop-color="#F0F9FF" stop-opacity="0.9"/>
      <stop offset="65%" stop-color="#BAE6FD" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0.22"/>
    </radialGradient>
    <!-- Crystalline Lens Refractive Gradient -->
    <linearGradient id="lens-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#BAE6FD" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.65"/>
    </linearGradient>
    <!-- Iris Radial Texture -->
    <radialGradient id="iris-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#78350F"/>
    </radialGradient>
    <!-- Volumetric Light Cone -->
    <linearGradient id="light-beam" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FACC15" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="#FEF08A" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#FDE047" stop-opacity="0.08"/>
    </linearGradient>
    <!-- Neural Gold Gradient -->
    <linearGradient id="gold-nerve" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="55%" stop-color="#FACC15"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <!-- Organic Skin/Pinna Subsurface Scattering -->
    <linearGradient id="tissue-warm" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#FFEDD5"/>
      <stop offset="55%" stop-color="#FDBA74"/>
      <stop offset="100%" stop-color="#EA580C"/>
    </linearGradient>
    <!-- Ossicle Ivory 3D Gradient -->
    <linearGradient id="ivory-3d" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#FEF3C7"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <!-- Mucosal Cavity Gradient -->
    <linearGradient id="mucosa-sss" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FECDD3"/>
      <stop offset="50%" stop-color="#FDA4AF"/>
      <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
    <!-- Tongue 3D Subsurface -->
    <radialGradient id="tongue-3d" cx="35%" cy="42%" r="65%">
      <stop offset="0%" stop-color="#FECDD3"/>
      <stop offset="58%" stop-color="#FB7185"/>
      <stop offset="100%" stop-color="#BE123C"/>
    </radialGradient>
    <!-- Skin Layers 3D -->
    <linearGradient id="epidermis-3d" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="100%" stop-color="#F97316"/>
    </linearGradient>
    <linearGradient id="dermis-sss" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE4E6"/>
      <stop offset="60%" stop-color="#FDA4AF"/>
      <stop offset="100%" stop-color="#FB7185"/>
    </linearGradient>
    <linearGradient id="adipose-3d" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7"/>
      <stop offset="100%" stop-color="#FDE047"/>
    </linearGradient>
  </defs>
`;

const DIAGRAMS = {
  /* =========================================================
     1. SIGHT — Human Eye Sagittal Cutaway + Retina x400 Inset
     ========================================================= */
  sight: {
    title: "Sagittal anatomical cutaway of the human eye with optical refraction cone and cellular retinal inset (×400).",
    signalPath: "M 30,225 L 262,225 L 352,225 L 578,225 L 690,282 L 775,290",
    svg: `
      ${SHARED_SVG_DEFS}
      <!-- Editorial Section Header & Scale -->
      <g font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#64748B" letter-spacing="1.2">
        <text x="18" y="24">SAGITTAL OPTICAL SECTION · EYE (24 mm)</text>
        <line x1="18" y1="428" x2="98" y2="428" stroke="#64748B" stroke-width="2"/>
        <line x1="18" y1="424" x2="18" y2="432" stroke="#64748B" stroke-width="2"/>
        <line x1="98" y1="424" x2="98" y2="432" stroke="#64748B" stroke-width="2"/>
        <text x="22" y="421" font-size="9">SCALE: 5 mm</text>
      </g>

      <!-- Volumetric Sclera Sphere with Drop Shadow -->
      <circle cx="430" cy="225" r="154" fill="url(#sclera-3d)" stroke="#94A3B8" stroke-width="8" filter="url(#organ-shadow)"/>

      <!-- Vascular Choroid Coat (Rich blood supply) -->
      <path d="M366 96 A144 144 0 1 1 568 244" fill="none" stroke="#881337" stroke-width="6.5"/>
      <path d="M564 286 A144 144 0 0 1 366 354" fill="none" stroke="#881337" stroke-width="6.5"/>

      <!-- Vitreous Humor Chamber with Specular Depth -->
      <circle cx="430" cy="225" r="134" fill="url(#vitreous-depth)"/>

      <!-- Neural Retina with Physiological Optic Disc Gap -->
      <path d="M370 100 A138 138 0 0 1 566 242" fill="none" stroke="#F43F5E" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M562 288 A138 138 0 0 1 370 350" fill="none" stroke="#F43F5E" stroke-width="7.5" stroke-linecap="round"/>
      <!-- Fovea Centralis Depression (Cone-dense focal pit) -->
      <circle cx="578" cy="225" r="6" fill="#E11D48" stroke="#FFF1F2" stroke-width="2"/>

      <!-- Optic Nerve Sheath & Axons (CN II) -->
      <path d="M566 242 L770 262 L770 318 L562 288 Z" fill="url(#gold-nerve)" stroke="#B45309" stroke-width="2.5" filter="url(#organ-shadow)"/>
      <!-- Central Retinal Artery & Vein inside Nerve -->
      <path d="M565 263 L770 286" stroke="#DC2626" stroke-width="3" fill="none"/>
      <path d="M565 268 L770 293" stroke="#2563EB" stroke-width="2.2" fill="none"/>

      <!-- Anterior Cornea with Wet Specular Reflection -->
      <path d="M300 148 Q216 225 300 302 Z" fill="url(#vitreous-depth)"/>
      <path d="M300 148 Q216 225 300 302" fill="none" stroke="#0EA5E9" stroke-width="5.5" stroke-linecap="round"/>
      <!-- Corneal Specular Highlight -->
      <path d="M276 178 Q254 202 256 224" fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" opacity="0.88"/>

      <!-- Ciliary Body & Suspensory Zonules -->
      <g fill="#334155">
        <polygon points="334,142 362,146 352,172 336,162"/>
        <polygon points="334,308 362,304 352,278 336,288"/>
      </g>
      <g stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="2 2">
        <line x1="346" y1="168" x2="352" y2="180"/>
        <line x1="346" y1="282" x2="352" y2="270"/>
      </g>

      <!-- Contractile Iris with Radial Pigment Shading -->
      <rect x="306" y="140" width="15" height="68" rx="7" fill="url(#iris-grad)" stroke="#451A03" stroke-width="1.5"/>
      <rect x="306" y="242" width="15" height="68" rx="7" fill="url(#iris-grad)" stroke="#451A03" stroke-width="1.5"/>

      <!-- Crystalline Biconvex Lens with Specular Shine -->
      <ellipse cx="352" cy="225" rx="23" ry="54" fill="url(#lens-crystal)" stroke="#0284C7" stroke-width="3" filter="url(#organ-shadow)"/>
      <path d="M342 186 Q336 205 339 225" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.85"/>

      <!-- Volumetric Light Cone + Refracting Rays -->
      <polygon points="30,185 254,195 352,210 578,225 352,240 254,255 30,265" fill="url(#light-beam)"/>
      <g stroke="#EAB308" stroke-width="2.2" stroke-dasharray="7 4" fill="none" filter="url(#bio-glow)">
        <path d="M30 185 L 254 195 L 352 210 L 578 225"/>
        <path d="M30 225 L 578 225"/>
        <path d="M30 265 L 254 255 L 352 240 L 578 225"/>
      </g>
      <polygon points="38,214 58,225 38,236" fill="#FACC15" filter="url(#bio-glow)"/>
      <circle cx="578" cy="225" r="5" fill="#FEF08A" filter="url(#bio-glow)"/>

      <!-- NatGeo Micro-Inset: Retina Photoreceptors (x400) -->
      <line x1="562" y1="150" x2="646" y2="115" stroke="#4338CA" stroke-width="1.8" stroke-dasharray="4 3"/>
      <clipPath id="eyeInset"><circle cx="712" cy="95" r="66"/></clipPath>
      <g clip-path="url(#eyeInset)">
        <rect x="640" y="25" width="150" height="150" fill="#1E1B4B"/>
        <!-- Rods (Blue/Silver) -->
        <rect x="670" y="55" width="10" height="42" rx="4" fill="#93C5FD"/>
        <rect x="706" y="55" width="10" height="42" rx="4" fill="#93C5FD"/>
        <rect x="742" y="55" width="10" height="42" rx="4" fill="#93C5FD"/>
        <!-- Cones (Amber/Pink RGB) -->
        <polygon points="692,58 685,96 699,96" fill="#F43F5E"/>
        <polygon points="728,58 721,96 735,96" fill="#34D399"/>
        <!-- Synaptic Bipolar Layer -->
        <circle cx="684" cy="112" r="5" fill="#FDE047"/>
        <circle cx="712" cy="112" r="5" fill="#FDE047"/>
        <circle cx="738" cy="112" r="5" fill="#FDE047"/>
        <path d="M675,97 L684,107 M692,97 L684,107 M711,97 L712,107 M728,97 L738,107 M684,117 L712,136 M738,117 L712,136" stroke="#FACC15" stroke-width="1.5"/>
        <circle cx="712" cy="138" r="7" fill="#FB923C"/>
        <text x="667" y="47" font-family="Inter, sans-serif" font-size="8.5" font-weight="800" fill="#E0E7FF">RETINA ×400</text>
      </g>
      <circle cx="712" cy="95" r="66" fill="none" stroke="#4338CA" stroke-width="3" filter="url(#organ-shadow)"/>

      <!-- Bio-Luminescent Neural Pulse Path -->
      <path class="signal-pulse-path" d="M 30,225 L 262,225 L 352,225 L 578,225 L 690,282 L 775,290" fill="none" stroke="#818CF8" stroke-width="5" stroke-dasharray="10 8" opacity="0" filter="url(#bio-glow)"/>
    `,
    hotspots: [
      { id: "cornea", x: 256, y: 225, lx: 155, ly: 342 },
      { id: "iris", x: 313, y: 170, lx: 295, ly: 58 },
      { id: "pupil", x: 313, y: 225, lx: 135, ly: 108 },
      { id: "lens", x: 352, y: 262, lx: 385, ly: 412 },
      { id: "retina", x: 528, y: 122, lx: 560, ly: 52 },
      { id: "opticnerve", x: 690, y: 282, lx: 695, ly: 378 }
    ]
  },

  /* =========================================================
     2. HEARING — Ear Cutaway + Trabecular Bone + Corti Inset
     ========================================================= */
  hearing: {
    title: "Coronal anatomical section of outer, middle, and inner ear with ossicular lever and Organ of Corti inset.",
    signalPath: "M 40,225 L 120,225 L 265,225 L 366,225 L 420,195 L 486,225 L 565,268 L 715,220 L 785,210",
    svg: `
      ${SHARED_SVG_DEFS}
      <g font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#64748B" letter-spacing="1.2">
        <text x="18" y="24">CORONAL TEMPORAL SECTION · EAR</text>
        <line x1="18" y1="428" x2="108" y2="428" stroke="#64748B" stroke-width="2"/>
        <text x="20" y="421" font-size="9">SCALE: 10 mm</text>
      </g>

      <!-- Temporal Bone with Porous Trabecular Mastoid Texture -->
      <path d="M298 56 L790 56 L790 426 L298 426 C 324 330 324 150 298 56 Z" fill="url(#trabecular-bone)" stroke="#CBD5E1" stroke-width="2.5"/>

      <!-- Radiant Acoustic Pressure Waves -->
      <g fill="none" stroke="#F97316" stroke-width="3.2" stroke-dasharray="7 5" filter="url(#bio-glow)">
        <path d="M28 150 Q8 225 28 300"/>
        <path d="M54 168 Q36 225 54 282"/>
        <path d="M80 185 Q66 225 80 265"/>
      </g>

      <!-- Outer Pinna (3D Shaded Cartilage) -->
      <path d="M150 84 C 55 84 35 195 65 280 C 85 345 118 375 152 365 C 168 332 150 300 162 268 L 176 246 L 176 202 C 205 145 205 95 150 84 Z" fill="url(#tissue-warm)" stroke="#C2410C" stroke-width="3" filter="url(#organ-shadow)"/>
      <path d="M138 118 C 90 128 85 200 108 252" fill="none" stroke="#9A3412" stroke-width="3" stroke-linecap="round"/>

      <!-- External Auditory Canal -->
      <rect x="170" y="202" width="196" height="46" fill="url(#mucosa-sss)" opacity="0.45" stroke="#EA580C" stroke-width="2"/>

      <!-- Middle Ear Tympanic Cavity -->
      <rect x="368" y="160" width="120" height="128" rx="22" fill="#FFFBEB" stroke="#F59E0B" stroke-width="2"/>

      <!-- Eustachian Tube -->
      <path d="M420 286 L455 286 L565 426 L518 426 Z" fill="#FED7AA" stroke="#FB923C" stroke-width="2"/>

      <!-- Conical Translucent Eardrum with Specular Highlight -->
      <ellipse cx="366" cy="225" rx="7" ry="37" fill="#CBD5E1" stroke="#475569" stroke-width="2.5" filter="url(#organ-shadow)"/>
      <line x1="363" y1="202" x2="363" y2="232" stroke="#FFFFFF" stroke-width="2" opacity="0.8"/>

      <!-- Articulated 3D Ivory Ossicles (Malleus, Incus, Stapes) -->
      <g stroke="#9A3412" stroke-linecap="round" stroke-linejoin="round" fill="url(#ivory-3d)" filter="url(#organ-shadow)">
        <path d="M368 224 L396 182 L407 188 L380 232 Z" stroke-width="2"/>
        <path d="M401 180 L435 186 L432 216 L418 206 Z" stroke-width="2"/>
        <path d="M432 216 L458 208 L484 210 L484 226 L458 228 Z" stroke-width="2"/>
        <line x1="485" y1="206" x2="485" y2="230" stroke="#7C2D12" stroke-width="5.5"/>
      </g>

      <!-- Semicircular Canals & Vestibule (Inner Fluid) -->
      <g fill="none" stroke="#6366F1" stroke-width="8.5" stroke-linecap="round" filter="url(#organ-shadow)">
        <ellipse cx="530" cy="140" rx="26" ry="40"/>
        <ellipse cx="576" cy="158" rx="38" ry="20"/>
        <ellipse cx="494" cy="165" rx="20" ry="28"/>
      </g>
      <circle cx="510" cy="216" r="26" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2.5"/>

      <!-- Volumetric Cochlea Spiral with Inner Highlight -->
      <path d="${spiralPath(565, 268, 62, 7, 2.6, 160)}" fill="none" stroke="#4F46E5" stroke-width="17" stroke-linecap="round" filter="url(#organ-shadow)"/>
      <path d="${spiralPath(565, 268, 62, 7, 2.6, 160)}" fill="none" stroke="#A5B4FC" stroke-width="7" stroke-linecap="round"/>

      <!-- Auditory Nerve (CN VIII) -->
      <path d="M612 240 C 660 228 700 206 780 190 L780 228 C 700 242 662 268 612 284 Z" fill="url(#gold-nerve)" stroke="#B45309" stroke-width="2.5"/>
      <line x1="615" y1="262" x2="778" y2="210" stroke="#92400E" stroke-width="2" stroke-dasharray="6 4"/>

      <!-- NatGeo Micro-Inset: Organ of Corti Hair Cells -->
      <line x1="585" y1="285" x2="646" y2="338" stroke="#EA580C" stroke-width="1.8" stroke-dasharray="4 3"/>
      <clipPath id="earInset"><circle cx="712" cy="368" r="62"/></clipPath>
      <g clip-path="url(#earInset)">
        <rect x="645" y="300" width="140" height="140" fill="#1E1B4B"/>
        <!-- Basilar membrane -->
        <rect x="645" y="392" width="140" height="12" fill="#4338CA"/>
        <!-- Hair Cells & Stereocilia -->
        <rect x="678" y="362" width="14" height="30" rx="5" fill="#FDBA74"/>
        <rect x="705" y="362" width="14" height="30" rx="5" fill="#FDBA74"/>
        <rect x="732" y="362" width="14" height="30" rx="5" fill="#FDBA74"/>
        <path d="M681,362 L683,348 M685,362 L687,346 M689,362 L691,344 M708,362 L710,348 M712,362 L714,346 M735,362 L737,348 M739,362 L741,346" stroke="#FEF08A" stroke-width="2"/>
        <!-- Tectorial Membrane -->
        <path d="M652 332 Q710 342 752 346 L752 336 Q710 326 652 320 Z" fill="#A5B4FC" opacity="0.7"/>
        <text x="670" y="324" font-family="Inter, sans-serif" font-size="8" font-weight="800" fill="#FEF08A">CORTI ×500</text>
      </g>
      <circle cx="712" cy="368" r="62" fill="none" stroke="#EA580C" stroke-width="3" filter="url(#organ-shadow)"/>

      <!-- Bio-Glow Signal Path -->
      <path class="signal-pulse-path" d="M 40,225 L 120,225 L 265,225 L 366,225 L 420,195 L 486,225 L 565,268 L 715,220 L 785,210" fill="none" stroke="#F97316" stroke-width="5" stroke-dasharray="10 8" opacity="0" filter="url(#bio-glow)"/>
    `,
    hotspots: [
      { id: "pinna", x: 88, y: 170, lx: 95, ly: 56 },
      { id: "earcanal", x: 265, y: 225, lx: 220, ly: 315 },
      { id: "eardrum", x: 366, y: 255, lx: 355, ly: 356 },
      { id: "ossicles", x: 412, y: 186, lx: 418, ly: 92 },
      { id: "cochlea", x: 565, y: 268, lx: 560, ly: 392 },
      { id: "auditorynerve", x: 705, y: 220, lx: 710, ly: 145 }
    ]
  },

  /* =========================================================
     3. SMELL — Sagittal Nasal Cavity + Olfactory Cilia Inset
     ========================================================= */
  smell: {
    title: "Sagittal nasal cutaway with sculpted respiratory turbinates, cribriform plate, and olfactory cilia inset (×600).",
    signalPath: "M 120,350 L 178,306 L 330,280 L 430,172 L 430,135 L 440,105 L 640,96 L 775,94",
    svg: `
      ${SHARED_SVG_DEFS}
      <g font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#64748B" letter-spacing="1.2">
        <text x="18" y="24">SAGITTAL NASAL CAVITY · OLFACTION</text>
        <line x1="18" y1="428" x2="108" y2="428" stroke="#64748B" stroke-width="2"/>
        <text x="20" y="421" font-size="9">SCALE: 10 mm</text>
      </g>

      <!-- Facial Profile -->
      <path d="M262 20 C 252 80 242 120 222 160 L 140 288 C 130 304 140 314 160 312 L 192 312 C 197 325 192 335 186 345 C 202 350 216 346 226 360 L 226 445 L 795 445 L 795 20 Z" fill="url(#tissue-warm)" opacity="0.28" stroke="#FB923C" stroke-width="2.5"/>

      <!-- Forebrain Base -->
      <path d="M300 20 L795 20 L795 125 C 650 112 500 106 330 120 Z" fill="#F3E8FF" stroke="#D8B4FE" stroke-width="1.5"/>

      <!-- Perforated Cribriform Plate -->
      <line x1="330" y1="138" x2="540" y2="138" stroke="#94A3B8" stroke-width="9" stroke-dasharray="14 6"/>

      <!-- Olfactory Tract & Bulb -->
      <path d="M492 108 C 550 104 620 98 780 94" stroke="url(#gold-nerve)" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="440" cy="106" rx="76" ry="17" fill="url(#gold-nerve)" stroke="#B45309" stroke-width="2.5" filter="url(#organ-shadow)"/>

      <!-- CN I Olfactory Nerve Bundles -->
      <g stroke="#D97706" stroke-width="3">
        <line x1="375" y1="120" x2="375" y2="164"/>
        <line x1="395" y1="122" x2="395" y2="164"/>
        <line x1="415" y1="123" x2="415" y2="164"/>
        <line x1="435" y1="123" x2="435" y2="164"/>
        <line x1="455" y1="122" x2="455" y2="164"/>
        <line x1="475" y1="120" x2="475" y2="164"/>
      </g>

      <!-- Nasal Cavity Interior -->
      <path d="M190 300 C 230 250 280 200 340 162 L 500 162 C 560 182 600 232 620 300 C 600 330 540 340 470 336 L 262 336 C 232 336 206 320 190 300 Z" fill="url(#mucosa-sss)" opacity="0.35" stroke="#FB7185" stroke-width="2.5"/>

      <!-- Sculpted Curved Turbinates (Conchae) -->
      <path d="M320 218 Q430 195 540 220 Q430 235 320 218 Z" fill="#FB7185" stroke="#E11D48" stroke-width="1.8" opacity="0.85"/>
      <path d="M300 268 Q440 242 565 272 Q440 292 300 268 Z" fill="#FB7185" stroke="#E11D48" stroke-width="1.8" opacity="0.85"/>

      <!-- Olfactory Epithelium + Aqueous Mucus Sheen -->
      <rect x="350" y="160" width="150" height="17" rx="6" fill="#FEF08A" stroke="#CA8A04" stroke-width="2"/>
      <rect x="350" y="176" width="150" height="8" rx="3" fill="#7DD3FC" opacity="0.82"/>

      <!-- Nostril -->
      <ellipse cx="178" cy="306" rx="16" ry="8" fill="#881337"/>

      <!-- Laminar Airflow + Odorant Molecules -->
      <path d="M120 350 Q165 330 196 300 Q290 215 410 185" fill="none" stroke="#16A34A" stroke-width="3.5" stroke-dasharray="8 5" filter="url(#bio-glow)"/>
      <polygon points="404,178 422,185 408,196" fill="#16A34A" filter="url(#bio-glow)"/>
      <g fill="#4ADE80" stroke="#14532D" stroke-width="1" filter="url(#bio-glow)">
        <circle cx="152" cy="336" r="4"/>
        <circle cx="242" cy="264" r="4.5"/>
        <circle cx="330" cy="208" r="4"/>
      </g>

      <!-- NatGeo Micro-Inset: Olfactory Bipolar Neurons & Cilia (x600) -->
      <line x1="485" y1="168" x2="646" y2="300" stroke="#15803D" stroke-width="1.8" stroke-dasharray="4 3"/>
      <clipPath id="smellInset"><circle cx="712" cy="348" r="68"/></clipPath>
      <g clip-path="url(#smellInset)">
        <rect x="640" y="275" width="150" height="150" fill="#064E3B"/>
        <!-- Mucus layer -->
        <rect x="640" y="382" width="150" height="40" fill="#38BDF8" opacity="0.45"/>
        <!-- Bipolar Sensory Neurons -->
        <ellipse cx="688" cy="342" rx="10" ry="18" fill="#FDE047"/>
        <ellipse cx="732" cy="342" rx="10" ry="18" fill="#FDE047"/>
        <line x1="688" y1="290" x2="688" y2="324" stroke="#FACC15" stroke-width="3"/>
        <line x1="732" y1="290" x2="732" y2="324" stroke="#FACC15" stroke-width="3"/>
        <!-- Olfactory Cilia in Mucus -->
        <path d="M688,360 L678,390 M688,360 L688,394 M688,360 L698,390 M732,360 L722,390 M732,360 L732,394 M732,360 L742,390" stroke="#FEF08A" stroke-width="2"/>
        <circle cx="685" cy="396" r="3" fill="#4ADE80"/>
        <circle cx="736" cy="395" r="3" fill="#4ADE80"/>
        <text x="668" y="302" font-family="Inter, sans-serif" font-size="8" font-weight="800" fill="#A7F3D0">CILIA ×600</text>
      </g>
      <circle cx="712" cy="348" r="68" fill="none" stroke="#15803D" stroke-width="3" filter="url(#organ-shadow)"/>

      <path class="signal-pulse-path" d="M 120,350 L 178,306 L 330,280 L 430,172 L 430,135 L 440,105 L 640,96 L 775,94" fill="none" stroke="#22C55E" stroke-width="5" stroke-dasharray="10 8" opacity="0" filter="url(#bio-glow)"/>
    `,
    hotspots: [
      { id: "nostril", x: 178, y: 306, lx: 95, ly: 395 },
      { id: "nasalcavity", x: 330, y: 300, lx: 340, ly: 395 },
      { id: "olfreceptors", x: 430, y: 172, lx: 640, ly: 192 },
      { id: "olfnerve", x: 375, y: 147, lx: 240, ly: 175 },
      { id: "olfbulb", x: 440, y: 105, lx: 450, ly: 52 }
    ]
  },

  /* =========================================================
     4. TASTE — Volumetric Tongue + Micro Taste Bud (50 μm)
     ========================================================= */
  taste: {
    title: "Dorsal tongue topography with circumvallate papillae V-row and cellular taste bud magnification (50 μm).",
    signalPath: "M 220,270 L 300,170 L 610,188 L 668,188 L 700,215 L 700,320 L 780,330",
    svg: `
      ${SHARED_SVG_DEFS}
      <g font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#64748B" letter-spacing="1.2">
        <text x="18" y="24">DORSAL LINGUAL TOPOGRAPHY &amp; TASTE BUD (50 μm)</text>
        <line x1="18" y1="428" x2="108" y2="428" stroke="#64748B" stroke-width="2"/>
        <text x="20" y="421" font-size="9">INSET BAR: 50 μm</text>
      </g>

      <!-- Volumetric Muscular Tongue -->
      <path id="tg" d="M90 225 C 90 138 200 108 330 110 C 460 112 560 118 620 158 C 652 185 652 265 620 292 C 560 332 460 338 330 340 C 200 342 90 312 90 225 Z" fill="url(#tongue-3d)" stroke="#BE123C" stroke-width="3" filter="url(#organ-shadow)"/>
      <!-- Median Sulcus -->
      <path d="M125 225 L575 225" stroke="#9F1239" stroke-width="2.5" opacity="0.5"/>

      <!-- Surface Papillae Field -->
      <g fill="#FFE4E6">${seededDots(150, 7, (x, y) => {
        const dx = (x - 360) / 265, dy = (y - 225) / 100; return dx * dx + dy * dy < 0.9;
      })}</g>

      <!-- Circumvallate V-Row -->
      <g fill="#BE123C" stroke="#FFE4E6" stroke-width="1.8">
        <circle cx="592" cy="225" r="9.5"/>
        <circle cx="576" cy="197" r="9.5"/>
        <circle cx="576" cy="253" r="9.5"/>
        <circle cx="558" cy="172" r="9.5"/>
        <circle cx="558" cy="278" r="9.5"/>
      </g>

      <!-- Highlighted Fungiform Papilla -->
      <circle cx="300" cy="170" r="11" fill="#FFF1F2" stroke="#881337" stroke-width="3.5" filter="url(#bio-glow)"/>
      <line x1="310" y1="166" x2="606" y2="188" stroke="#9F1239" stroke-width="2" stroke-dasharray="5 4"/>

      <!-- Cellular Taste Bud Inset (92px radius) -->
      <clipPath id="insetClip"><circle cx="700" cy="215" r="92"/></clipPath>
      <g clip-path="url(#insetClip)">
        <rect x="600" y="115" width="205" height="205" fill="#FFF1F2"/>
        <!-- Saliva Trench Wall -->
        <path d="M600 154 L660 154 C 672 154 678 168 684 178 C 690 168 696 154 710 154 L800 154 L800 115 L600 115 Z" fill="#FB7185"/>
        <!-- Taste Bud Capsule -->
        <ellipse cx="700" cy="215" rx="36" ry="52" fill="#FECDD3" stroke="#9F1239" stroke-width="2.5"/>
        <!-- Taste Pore & Microvilli -->
        <ellipse cx="700" cy="164" rx="7" ry="3.5" fill="#4C0519"/>
        <path d="M695,164 L692,155 M700,164 L700,153 M705,164 L708,155" stroke="#FEF08A" stroke-width="1.8"/>
        <!-- Differentiated Taste Cells (Type I/II/III) -->
        <ellipse cx="685" cy="216" rx="7" ry="39" fill="#F43F5E" stroke="#881337" stroke-width="1.2"/>
        <ellipse cx="700" cy="214" rx="7.5" ry="43" fill="#FB923C" stroke="#9A3412" stroke-width="1.2"/>
        <ellipse cx="715" cy="216" rx="7" ry="39" fill="#F43F5E" stroke="#881337" stroke-width="1.2"/>
        <!-- Glowing Synaptic Neurotransmitter Vesicles -->
        <circle cx="690" cy="252" r="2.5" fill="#FACC15" filter="url(#bio-glow)"/>
        <circle cx="700" cy="255" r="2.5" fill="#FACC15" filter="url(#bio-glow)"/>
        <circle cx="710" cy="252" r="2.5" fill="#FACC15" filter="url(#bio-glow)"/>
        <!-- Cranial Nerve Fibers (CN VII, IX, X) -->
        <g stroke="#D97706" stroke-width="3.5" fill="none">
          <path d="M690 256 C 688 278 680 295 676 315"/>
          <path d="M700 258 C 700 280 700 298 700 315"/>
          <path d="M710 256 C 712 278 720 295 724 315"/>
        </g>
      </g>
      <circle cx="700" cy="215" r="92" fill="none" stroke="#9F1239" stroke-width="3.5" filter="url(#organ-shadow)"/>

      <path class="signal-pulse-path" d="M 220,270 L 300,170 L 610,188 L 668,188 L 700,215 L 700,320 L 780,330" fill="none" stroke="#E11D48" stroke-width="5" stroke-dasharray="10 8" opacity="0" filter="url(#bio-glow)"/>
    `,
    hotspots: [
      { id: "tongue", x: 220, y: 270, lx: 220, ly: 392 },
      { id: "papillae", x: 300, y: 170, lx: 300, ly: 72 },
      { id: "tastebuds", x: 668, y: 188, lx: 585, ly: 76 },
      { id: "tastecells", x: 714, y: 222, lx: 760, ly: 92 },
      { id: "tastenerve", x: 700, y: 290, lx: 695, ly: 356 }
    ]
  },

  /* =========================================================
     5. TOUCH — True 3D Isometric Tissue Block (2x2x3 mm)
     ========================================================= */
  touch: {
    title: "3D isometric histological skin block showing epidermal ridges, dermal capillary loops, sweat gland, and mechanoreceptors.",
    signalPath: "M 372,42 L 392,236 L 560,150 L 685,342 L 770,346",
    svg: `
      ${SHARED_SVG_DEFS}
      <g font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#64748B" letter-spacing="1.2">
        <text x="18" y="24">3D ISOMETRIC HISTOLOGICAL BLOCK · SKIN (2×2×3 mm)</text>
        <line x1="18" y1="428" x2="98" y2="428" stroke="#64748B" stroke-width="2"/>
        <text x="20" y="421" font-size="9">SCALE: 0.5 mm</text>
      </g>

      <!-- Isometric Top Surface Plane (Epidermal Surface + Sweat Pores) -->
      <polygon points="150,86 225,46 775,46 700,86" fill="#FED7AA" stroke="#F97316" stroke-width="2" filter="url(#organ-shadow)"/>
      <!-- Epidermal Dermatoglyphic Fingerprint Ridges on Top Plane -->
      <g stroke="#FB923C" stroke-width="1.4" opacity="0.6" fill="none">
        <path d="M185 78 Q380 68 725 78"/>
        <path d="M205 68 Q400 58 745 68"/>
        <path d="M225 58 Q420 48 765 58"/>
      </g>

      <!-- Right 3D Isometric Side Wall -->
      <polygon points="700,86 775,46 775,380 700,420" fill="#FECDD3" stroke="#E11D48" stroke-width="1.5"/>
      <polygon points="700,305 775,265 775,380 700,420" fill="#FDE047" opacity="0.5"/>

      <!-- Front Cutaway: Hypodermis (Adipose Lobules) -->
      <rect x="150" y="305" width="550" height="115" fill="url(#adipose-3d)"/>
      <g fill="#FEF9C3" stroke="#EAB308" stroke-width="2">
        <circle cx="195" cy="348" r="17"/><circle cx="240" cy="382" r="18"/><circle cx="290" cy="342" r="16"/>
        <circle cx="342" cy="386" r="17"/><circle cx="400" cy="346" r="16"/><circle cx="552" cy="388" r="17"/>
        <circle cx="608" cy="350" r="16"/><circle cx="655" cy="392" r="15"/><circle cx="445" cy="392" r="16"/>
      </g>

      <!-- Front Cutaway: Dermis (Subsurface Scattering) -->
      <rect x="150" y="128" width="550" height="177" fill="url(#dermis-sss)"/>

      <!-- Front Cutaway: Epidermis with Dermal Papillae Waves -->
      <path d="M150 86 L700 86 L700 128 C 675 140 655 116 630 128 C 605 140 585 116 560 128 C 535 140 515 116 490 128 C 465 140 445 116 420 128 C 395 140 375 116 350 128 C 325 140 305 116 280 128 C 255 140 235 116 210 128 C 185 140 165 116 150 128 Z" fill="url(#epidermis-3d)" stroke="#EA580C" stroke-width="2"/>

      <!-- Ascending Capillary Vascular Loops -->
      <path d="M150 302 C 260 296 360 310 700 300" stroke="#DC2626" stroke-width="4.5" fill="none"/>
      <path d="M150 316 C 280 308 380 322 700 314" stroke="#2563EB" stroke-width="4" fill="none"/>
      <path d="M265 302 C 268 220 270 155 276 132 C 282 155 284 220 286 314" stroke="#EF4444" stroke-width="2.5" fill="none"/>

      <!-- Coiled Eccrine Sweat Gland ascending to Surface Pore -->
      <path d="M465 268 C 455 260 478 250 462 242 C 450 235 478 228 468 216 L468 68" fill="none" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round"/>
      <ellipse cx="468" cy="68" rx="4" ry="2" fill="#0369A1"/>

      <!-- Hair Follicle + Arrector Pili Muscle emerging from 3D Top -->
      <path d="M398 220 L432 145" stroke="#E11D48" stroke-width="6" opacity="0.6" stroke-linecap="round"/>
      <ellipse cx="392" cy="236" rx="16" ry="34" fill="#FCA5A5" stroke="#BE123C" stroke-width="2" filter="url(#organ-shadow)"/>
      <line x1="372" y1="32" x2="392" y2="250" stroke="#451A03" stroke-width="6.5" stroke-linecap="round"/>

      <!-- Meissner Corpuscle (Light touch in dermal papilla) -->
      <ellipse cx="560" cy="148" rx="12" ry="18" fill="#FEF08A" stroke="#CA8A04" stroke-width="2.5" filter="url(#organ-shadow)"/>

      <!-- Pacinian Corpuscle (Concentric translucent lamellae) -->
      <g fill="rgba(254, 240, 138, 0.35)" stroke="#CA8A04" stroke-width="2.2">
        <ellipse cx="505" cy="282" rx="26" ry="18"/>
        <ellipse cx="505" cy="282" rx="18" ry="12"/>
        <ellipse cx="505" cy="282" rx="10" ry="6" fill="#FACC15"/>
      </g>

      <!-- Free Nerve Endings (Nociceptors / TRP thermoreceptors) -->
      <g fill="none" stroke="#B45309" stroke-width="2.8">
        <path d="M628 96 L636 155"/>
        <path d="M648 94 L640 155"/>
        <path d="M636 155 C 645 215 655 280 685 338"/>
      </g>

      <!-- Sensory Nerve Trunk -->
      <g fill="none" stroke="#D97706" stroke-width="3.8">
        <path d="M560 166 C 580 250 615 330 685 342"/>
        <path d="M530 282 C 580 316 630 340 685 346"/>
      </g>
      <path d="M685 335 L775 338 L775 356 L685 352 Z" fill="url(#gold-nerve)" stroke="#B45309" stroke-width="2.5"/>

      <!-- Brackets -->
      <g stroke="#475569" stroke-width="2">
        <line x1="140" y1="86" x2="140" y2="128"/>
        <line x1="140" y1="130" x2="140" y2="303"/>
        <line x1="140" y1="306" x2="140" y2="420"/>
      </g>

      <path class="signal-pulse-path" d="M 372,42 L 392,236 L 560,150 L 685,342 L 770,346" fill="none" stroke="#06B6D4" stroke-width="5" stroke-dasharray="10 8" opacity="0" filter="url(#bio-glow)"/>
    `,
    hotspots: [
      { id: "epidermis", x: 190, y: 106, lx: 68, ly: 108 },
      { id: "dermis", x: 190, y: 215, lx: 68, ly: 218 },
      { id: "hypodermis", x: 190, y: 362, lx: 68, ly: 364 },
      { id: "receptor", x: 560, y: 148, lx: 560, ly: 32 },
      { id: "nerve", x: 735, y: 346, lx: 732, ly: 438 }
    ]
  }
};

Object.freeze(DIAGRAMS);
