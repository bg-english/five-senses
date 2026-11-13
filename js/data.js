/* =========================================================
   The Five Senses — CLIL & Neurobiology Learning Engine (v4.0)
   8th Grade Science & English (CEFR A2-B1) | NGSS MS-LS1-8
   Molecular Biophysics (Nobel 2004/2021) + Linguaskill CAT Bank
   ========================================================= */

const UNIT = {
  "title": "The Five Senses",
  "subtitle": "Interactive CLIL Field Guide to Sensory Biology & Scientific English",
  "bigIdea": "Every sense follows the same universal path: Stimulus → Sense Organ → Receptor Cells (Sensory Transduction) → Sensory Nerve → Brain Cortex.",
  "bigIdeaEs": "Todos los sentidos siguen el mismo camino universal: Estímulo → Órgano sensorial → Células receptoras (Transducción sensorial) → Nervio sensorial → Corteza cerebral.",
  "objectives": [
    "I can name the organ, specialized structures, and primary brain cortex for each sense.",
    "I can explain sensory transduction: how receptor cells convert environmental stimuli into electrical nerve impulses.",
    "I can trace the neural pathway of each sense using scientific sequence connectors and CALP verbs.",
    "I can classify sensory receptors into photoreceptors, mechanoreceptors, and chemoreceptors.",
    "I can formulate hypotheses, record observations, and interpret evidence in hands-on inquiry experiments.",
    "I can compare the five senses and evaluate how sensory integration (like taste + smell = flavor) shapes perception."
  ],
  "path": [
    {
      "en": "1. Stimulus",
      "es": "1. Estímulo",
      "def": "Physical or chemical energy from the environment (light waves, sound waves, odor molecules, dissolved tastants, mechanical pressure)."
    },
    {
      "en": "2. Sense Organ",
      "es": "2. Órgano sensorial",
      "def": "Specialized anatomical structure that captures and focuses the stimulus (eye, ear, nose, tongue, skin)."
    },
    {
      "en": "3. Receptor Cells",
      "es": "3. Células receptoras",
      "def": "Specialized cells that perform sensory transduction: converting stimulus energy into electrical impulses (action potentials)."
    },
    {
      "en": "4. Sensory Nerve",
      "es": "4. Nervio sensorial",
      "def": "Bundle of axons (cranial or spinal nerves) that transmits electrical signals rapidly toward the central nervous system."
    },
    {
      "en": "5. Brain Cortex",
      "es": "5. Corteza cerebral",
      "def": "Specific cerebral cortex lobe that processes, integrates, and interprets the signals into conscious perception."
    }
  ],
  "morphologyRoots": [
    {
      "root": "photo-",
      "meaning": "Light",
      "es": "Luz",
      "examples": "photoreceptor, photosynthesis, photon",
      "def": "Related to light or radiant energy."
    },
    {
      "root": "mechano-",
      "meaning": "Mechanical / Movement",
      "es": "Mecánico / Movimiento",
      "examples": "mechanoreceptor, mechanism",
      "def": "Related to physical pressure, motion, or sound vibrations."
    },
    {
      "root": "chemo-",
      "meaning": "Chemical",
      "es": "Químico",
      "examples": "chemoreceptor, chemical, chemistry",
      "def": "Related to molecules and chemical compounds."
    },
    {
      "root": "thermo-",
      "meaning": "Heat / Temperature",
      "es": "Calor / Temperatura",
      "examples": "thermoreceptor, thermometer, thermal",
      "def": "Related to temperature variations."
    },
    {
      "root": "noci-",
      "meaning": "Harm / Pain / Damage",
      "es": "Daño / Dolor",
      "examples": "nociceptor, noxious",
      "def": "Related to tissue injury or threatening noxious stimuli."
    },
    {
      "root": "-ceptor",
      "meaning": "Receiver / Detector",
      "es": "Receptor / El que recibe",
      "examples": "receptor, intercept, sensory receptor",
      "def": "A biological structure or molecule that receives signals."
    },
    {
      "root": "epi-",
      "meaning": "Upon / Over / Outer",
      "es": "Sobre / Encima / Capa exterior",
      "examples": "epidermis, epicentre, epithelium",
      "def": "Situated on the outside or top layer."
    },
    {
      "root": "hypo-",
      "meaning": "Below / Under / Deficient",
      "es": "Debajo / Capa inferior",
      "examples": "hypodermis, hypothermia, hypothesis",
      "def": "Situated beneath or in lower concentration."
    },
    {
      "root": "-itis",
      "meaning": "Inflammation",
      "es": "Inflamación",
      "examples": "conjunctivitis, otitis, sinusitis",
      "def": "Medical suffix denoting inflammatory swelling or infection."
    },
    {
      "root": "an-",
      "meaning": "Without / Lack of",
      "es": "Sin / Carencia de",
      "examples": "anosmia (lack of smell), anemia",
      "def": "Prefix indicating absence or deficiency."
    }
  ],
  "ranks": [
    {
      "minXp": 0,
      "title": "Sensory Intern",
      "badge": "🩺",
      "es": "Interno Sensorial"
    },
    {
      "minXp": 250,
      "title": "Bio-Lab Technician",
      "badge": "🔬",
      "es": "Técnico de Bio-Laboratorio"
    },
    {
      "minXp": 600,
      "title": "Neural Specialist",
      "badge": "⚡",
      "es": "Especialista Neural"
    },
    {
      "minXp": 1100,
      "title": "Cortical Surgeon",
      "badge": "🧠",
      "es": "Cirujano Cortical"
    },
    {
      "minXp": 1800,
      "title": "Chief Neuro-Scientist",
      "badge": "🏆",
      "es": "Neurocientífico Jefe"
    }
  ],
  "asrAliases": {
    "cornea": [
      "corneal",
      "corner",
      "corny"
    ],
    "iris": [
      "irish",
      "ires"
    ],
    "pupil": [
      "pupils",
      "people",
      "pupal"
    ],
    "lens": [
      "lenses",
      "lance",
      "lands"
    ],
    "retina": [
      "retinal",
      "retainer"
    ],
    "opticnerve": [
      "optic nerve",
      "optic",
      "optical nerve"
    ],
    "pinna": [
      "pina",
      "pena",
      "pinner",
      "peanut"
    ],
    "earcanal": [
      "ear canal",
      "ear",
      "canal"
    ],
    "eardrum": [
      "ear drum",
      "drum"
    ],
    "ossicles": [
      "osicles",
      "ossicle",
      "obstacles",
      "articles"
    ],
    "cochlea": [
      "cochlear",
      "cockney",
      "cocklea",
      "coca"
    ],
    "auditorynerve": [
      "auditory nerve",
      "auditory"
    ],
    "nostril": [
      "nostrils",
      "nosetril"
    ],
    "nasalcavity": [
      "nasal cavity",
      "nasal"
    ],
    "olfreceptors": [
      "olfactory receptors",
      "olfactory",
      "receptors"
    ],
    "olfnerve": [
      "olfactory nerve",
      "olfactory"
    ],
    "olfbulb": [
      "olfactory bulb",
      "bulb"
    ],
    "tongue": [
      "tong",
      "lung",
      "tung"
    ],
    "papillae": [
      "papilla",
      "papilly",
      "papaya"
    ],
    "tastebuds": [
      "taste buds",
      "taste",
      "buds"
    ],
    "tastecells": [
      "taste cells",
      "taste",
      "cells"
    ],
    "tastenerve": [
      "cranial nerves",
      "taste nerve",
      "cranial"
    ],
    "epidermis": [
      "epidermal",
      "epi dermis"
    ],
    "dermis": [
      "derma",
      "dermiss"
    ],
    "hypodermis": [
      "hypo dermis",
      "hypothermia"
    ],
    "receptor": [
      "receptors",
      "receptor"
    ],
    "nerve": [
      "nerves",
      "sensory nerve",
      "sensory nerves"
    ],
    "photoreceptors": [
      "photo receptors",
      "photoreceptor",
      "photo receptor"
    ],
    "mechanoreceptors": [
      "mechano receptors",
      "mechanoreceptor"
    ],
    "chemoreceptors": [
      "chemo receptors",
      "chemoreceptor"
    ],
    "thermoreceptors": [
      "thermo receptors",
      "thermoreceptor"
    ],
    "nociceptors": [
      "noci ceptors",
      "nociceptor",
      "no see ceptors"
    ],
    "umami": [
      "oh mommy",
      "you mommy",
      "ooh mommy"
    ],
    "cones": [
      "cone",
      "coins"
    ],
    "rods": [
      "rod",
      "roads"
    ],
    "sclera": [
      "esclera",
      "clearer",
      "scleral"
    ]
  }
};

const SENSES = [
  {
    "id": "sight",
    "name": "Sight",
    "es": "Vista",
    "organ": "The Eye",
    "organEs": "El ojo",
    "cortex": "Visual Cortex (Occipital Lobe)",
    "cortexEs": "Corteza visual (Lóbulo occipital)",
    "receptorClassification": "Photoreceptors (Rods & Cones)",
    "receptorClassificationEs": "Fotorreceptores (Bastones y Conos)",
    "transduction": "Light photons strike photopigments in rods and cones in the retina, converting radiant light into electrical nerve impulses.",
    "transductionEs": "Los fotones de luz activan fotopigmentos en conos y bastones de la retina, convirtiendo la luz en impulsos nerviosos eléctricos.",
    "wordFamily": "see (verb) → sight (noun) → visual (adjective) → optic (anatomical) → photoreceptor (cellular)",
    "objectives": [
      "I can name and locate the 6 core structures of the human eye and their physiological functions.",
      "I can describe the step-by-step path of light from the cornea to the visual cortex using sequence connectors.",
      "I can explain sensory transduction in rods and cones and distinguish their roles in dim light vs. color vision.",
      "I can formulate a hypothesis, test my optical blind spot, and explain why the brain fills in the visual gap."
    ],
    "warmup": {
      "q": "Look at your classmate's eyes in normal room light, then turn toward a bright window. What happens to the pupil?",
      "qEs": "Mira los ojos de tu compañero con luz normal y luego hacia una ventana brillante. ¿Qué le pasa a la pupila?",
      "task": "Cover one eye with your hand. Now try to touch the tips of two pencils together horizontally. Is depth perception harder?",
      "taskEs": "Tápate un ojo. Intenta juntar las puntas de dos lápices horizontalmente. ¿Cuesta más calcular la distancia?"
    },
    "words": [
      {
        "id": "cornea",
        "en": "cornea",
        "es": "córnea",
        "ipa": "/ˈkɔːr.ni.ə/",
        "def": "The transparent, curved outer layer at the front of the eye that protects it and begins refracting (bending) light.",
        "ex": "Light enters the eye through the cornea, which does most of the focusing.",
        "note": "✅ Cognate: cornea = córnea.",
        "spot": true,
        "syllables": "KOR-nee-uh",
        "pronTipEs": "Acento en la primera sílaba (KOR). No digas 'cor-NE-a'.",
        "mnemonic": "Cornea = Cortina transparente curva al frente del ojo."
      },
      {
        "id": "iris",
        "en": "iris",
        "es": "iris",
        "ipa": "/ˈaɪ.rɪs/",
        "def": "The colored ring of muscle that contracts and dilates to regulate the amount of light entering the pupil.",
        "ex": "In bright sunlight, the iris constricts to make the pupil smaller.",
        "note": "✅ Identical in Spanish.",
        "spot": true,
        "syllables": "EYE-riss",
        "pronTipEs": "La 'i' inicial suena como 'ay' en inglés (/aɪ/).",
        "mnemonic": "Iris = Arcoíris de color que regula la pupila."
      },
      {
        "id": "pupil",
        "en": "pupil",
        "es": "pupila",
        "ipa": "/ˈpjuː.pəl/",
        "def": "The adjustable circular opening in the center of the iris through which light passes into the interior.",
        "ex": "In the dark, your pupil dilates to admit more light.",
        "note": "⚠️ Homonym: 'pupil' also means 'student' in school.",
        "spot": true,
        "syllables": "PYOO-pil",
        "pronTipEs": "Suena como 'piúpil'. Cuidado: también significa alumno.",
        "mnemonic": "Pupil = Puerta negra central."
      },
      {
        "id": "lens",
        "en": "lens (crystalline lens)",
        "es": "cristalino",
        "ipa": "/lenz/",
        "def": "The flexible, biconvex transparent structure behind the pupil that changes shape to finely focus light onto the retina.",
        "ex": "Ciliary muscles change the curvature of the lens so you can focus on near objects.",
        "note": "⚠️ False friend: the biological lens of the eye is 'el cristalino' (not 'lente').",
        "spot": true,
        "syllables": "LENZ",
        "pronTipEs": "Falso amigo: en español médico es 'cristalino', no solo lentes.",
        "mnemonic": "Lens = Lupa viviente biconvexa que cambia de forma."
      },
      {
        "id": "retina",
        "en": "retina",
        "es": "retina",
        "ipa": "/ˈret.ɪ.nə/",
        "def": "The light-sensitive sensory layer lining the back of the eye containing photoreceptor cells (rods and cones).",
        "ex": "The retina converts focused light into electrochemical nerve signals.",
        "note": "✅ Cognate: retina = retina.",
        "spot": true,
        "syllables": "RET-ih-nuh",
        "pronTipEs": "Esdrújula en inglés (RET-i-na), no grave como en español.",
        "mnemonic": "Retina = Red interna que retiene la imagen y la convierte en señal."
      },
      {
        "id": "opticnerve",
        "en": "optic nerve",
        "es": "nervio óptico",
        "ipa": "/ˈɑːp.tɪk nɜːrv/",
        "def": "The cranial nerve (CN II) composed of over one million axon fibers that transmits visual signals from the retina to the brain.",
        "ex": "The optic nerve carries electrical impulses to the visual cortex in the occipital lobe.",
        "note": "💡 Word family: optic → optical → optician.",
        "spot": true,
        "syllables": "OP-tik NURV",
        "pronTipEs": "En 'nerve' la 'e' suena como vocal central neutra /ɜːr/.",
        "mnemonic": "CN II: Dos ojos → Nervio Craneal II."
      },
      {
        "id": "photoreceptors",
        "en": "photoreceptors",
        "es": "fotorreceptores",
        "ipa": "/ˌfoʊ.toʊ.rɪˈsep.tərz/",
        "def": "Specialized sensory neurons (rods and cones) that perform sensory transduction by converting light photons into neural impulses.",
        "ex": "Rods detect dim light and movement, while cones detect fine detail and colors.",
        "note": "💡 Greek root: photo- (light) + -ceptor (receiver).",
        "syllables": "PHOTORECEPTORS"
      },
      {
        "id": "visualcortex",
        "en": "visual cortex",
        "es": "corteza visual",
        "ipa": "/ˈvɪʒ.u.əl ˈkɔːr.teks/",
        "def": "The region of the cerebral cortex located in the occipital lobe at the back of the brain where visual signals are processed and perceived.",
        "ex": "Although the retina creates an upside-down image, the visual cortex interprets it right-side up.",
        "note": "💡 Word family: vision → visual → visual cortex.",
        "syllables": "VISUAL CORTEX"
      }
    ],
    "path": [
      "light",
      "cornea",
      "pupil",
      "lens",
      "retina",
      "opticnerve",
      "visualcortex"
    ],
    "pathLabels": {
      "light": "1. Light stimulus (Fotones)",
      "cornea": "2. Cornea (Refracción inicial)",
      "pupil": "3. Pupil (Regulación de apertura)",
      "lens": "4. Lens (Enfoque fino)",
      "retina": "5. Retina: Rods & Cones (Transducción)",
      "opticnerve": "6. Optic nerve (Transmisión)",
      "visualcortex": "7. Visual Cortex (Percepción en lóbulo occipital)"
    },
    "reading": {
      "title": "The Path of Light & Visual Transduction",
      "video": {
        "src": "path-of-light.mp4",
        "caption": "Animation: The path of light through the ocular media to the retina and visual cortex."
      },
      "paragraphs": [
        "Every visual experience begins when [[photoreceptors|photoreceptors]] capture [[light|light]] reflected from objects in our surroundings. To understand vision, we must follow how light traverses the eye and how its physical energy is transduced into electrical signals.",
        "First, light strikes the [[cornea|cornea]], a clear, curved dome that shields the eye and performs about two-thirds of the total refraction (bending) of light. Next, the light enters the [[pupil|pupil]], the central aperture surrounded by the pigmented [[iris|iris]]. The sphincter and dilator muscles of the iris rapidly adjust the pupil diameter: in intense sunlight the pupil constricts to protect the interior, while in low ambient light it dilates to maximize photon capture.",
        "Then, the light beam passes through the flexible [[lens|lens]]. Controlled by delicate ciliary muscles, the lens alters its focal curvature (a dynamic process termed accommodation) so that rays from both near and distant objects converge sharply onto the [[retina|retina]] at the posterior surface of the eyeball. Because light rays cross as they pass through the lens, the real image formed on the retina is geometrically inverted (upside down) and reversed.",
        "At the retina, millions of specialized [[photoreceptors|photoreceptor cells]]—approximately 120 million rods and 6 million cones—perform sensory transduction. Rods operate in dim light (scotopic vision) but do not differentiate hues, whereas cones operate in bright daylight (photopic vision) and mediate high-acuity color detection (red, green, and blue). At the optic disc, where retinal ganglion axons bundle together to exit the eyeball, there are no photoreceptors at all; this anatomical gap is our natural physiological blind spot.",
        "Finally, the [[opticnerve|optic nerve]] conducts these action potentials through the optic chiasm and lateral geniculate nucleus directly to the [[visualcortex|visual cortex]] located in the occipital lobe at the rear of the brain. Here, the brain decodes spatial coordinates, contrast, motion, and color, effortlessly turning the inverted retinal signals into the upright, three-dimensional scene you consciously perceive."
      ],
      "checks": [
        {
          "after": 1,
          "q": "Which anatomical structure adjusts the pupil's diameter in response to light intensity?",
          "options": [
            "The iris muscle",
            "The crystalline lens",
            "The vitreous humor",
            "The optic nerve"
          ],
          "explain": "The iris contains smooth sphincter and dilator muscles that regulate how much light enters through the pupil."
        },
        {
          "after": 3,
          "q": "Why does the human eye have an anatomical blind spot (optic disc)?",
          "options": [
            "There are no photoreceptors where the optic nerve exits the retina",
            "The cornea has a protective opaque scar",
            "The lens cannot refract light at high angles",
            "The pupil closes completely in dim light"
          ],
          "explain": "At the optic disc, ganglion cell axons leave the eyeball to form the optic nerve, leaving zero rods or cones in that specific spot."
        }
      ],
      "a2Summary": "Light rays first enter through the clear cornea and pass through the pupil, which changes size thanks to the colorful iris. Next, the biconvex lens bends the light to focus a sharp image on the retina at the back of the eye. Inside the retina, rod cells detect dim light and cone cells detect colors, converting light into electrical signals. Finally, the optic nerve (CN II) carries these impulses to the visual cortex in the occipital lobe.",
      "collocations": [
        "refract light rays",
        "regulate the diameter",
        "focus sharply onto",
        "convert radiant energy into",
        "project via CN II"
      ]
    },
    "funfact": "Because the eye functions like a convex camera lens, the image projected on your retina is upside down and reversed left-to-right! Your visual cortex neural networks automatically process and invert the signals so you perceive the world right-side up.",
    "health": {
      "problems": [
        {
          "name": "Myopia (Nearsightedness)",
          "text": "The eyeball is slightly too long relative to the cornea's curvature, causing light to focus in front of the retina. Distant objects appear blurry, while close objects remain sharp. Corrected with diverging (concave) lenses."
        },
        {
          "name": "Hyperopia (Farsightedness)",
          "text": "The eyeball is shorter than normal, causing the focal point of near objects to fall behind the retina. Corrected with converging (convex) lenses."
        },
        {
          "name": "Astigmatism",
          "text": "An irregular, oval curvature of the cornea or lens causing multiple focal points and blurred vision at all distances."
        },
        {
          "name": "Conjunctivitis (Pink Eye)",
          "text": "Inflammation or bacterial/viral infection of the conjunctiva, the clear membrane covering the sclera and inner eyelids."
        }
      ],
      "care": [
        "Practice the 20-20-20 rule during screen use: every 20 minutes, gaze at an object at least 20 feet (6 meters) away for 20 seconds to relax ciliary muscles.",
        "Wear UV-blocking sunglasses (UV400 rating) when exposed to intense solar radiation to safeguard the cornea and retina.",
        "Avoid rubbing eyes with unwashed hands, and schedule regular comprehensive optometric examinations."
      ]
    },
    "deeper": [
      {
        "name": "Fovea Centralis",
        "es": "fóvea centralis",
        "text": "A tiny 1.5 mm depression in the center of the macula densely packed with cone photoreceptors, providing our sharpest, highest-resolution color vision for reading."
      },
      {
        "name": "Sclera",
        "es": "esclerótica",
        "text": "The tough, opaque fibrous outer coating of the eyeball ('the white of the eye') that maintains structural shape and anchors extrinsic eye muscles."
      },
      {
        "name": "Ciliary Body & Zonules",
        "es": "cuerpo ciliar y zónulas",
        "text": "Muscular and ligamentous structures that suspend the lens; contraction relaxes tension on the lens, allowing it to become rounder for near vision."
      },
      {
        "name": "Aqueous & Vitreous Humors",
        "es": "humor acuoso y vítreo",
        "text": "Aqueous humor is a watery fluid nourishing the cornea and lens in the anterior chamber; vitreous humor is a clear gel maintaining intraocular pressure in the posterior cavity."
      }
    ],
    "match": [
      [
        "cornea",
        "Transparent outer shield that performs the initial refraction of light"
      ],
      [
        "iris",
        "Contractile colored muscular ring regulating pupil diameter"
      ],
      [
        "lens",
        "Flexible biconvex disc performing dynamic optical accommodation"
      ],
      [
        "retina",
        "Sensory layer containing rods and cones that transduce photons into nerve signals"
      ],
      [
        "opticnerve",
        "Cranial nerve bundle transmitting electrical action potentials to the brain"
      ]
    ],
    "cloze": {
      "text": "Light enters the eye through the transparent {cornea}, which bends the light rays. The light passes through the {pupil}, whose diameter is modulated by the muscular {iris}. Next, the flexible {lens} focuses the rays precisely onto the {retina}. Specialized {photoreceptors} transduce the photons into electrical nerve impulses, which the {optic nerve} conducts to the visual cortex.",
      "extra": [
        "eardrum",
        "cochlea",
        "mucus"
      ]
    },
    "experiment": {
      "title": "Mapping Your Physiological Blind Spot (Optic Disc)",
      "type": "blindspot",
      "predict": {
        "q": "What do you hypothesize will happen when the black dot's image falls directly onto the region where the optic nerve leaves the eyeball?",
        "qEs": "¿Qué crees que ocurrirá cuando la imagen del punto negro coincida exactamente con la zona donde el nervio óptico sale del globo ocular?",
        "options": [
          "The dot will temporarily vanish because there are no rods or cones at the optic disc",
          "The cross (+) will change color due to pupil dilation",
          "The entire screen will go completely dark in both eyes",
          "The dot will appear twice as large due to lens magnification"
        ],
        "explain": "Because the optic disc contains no photoreceptors (rods or cones), light falling on that focal region cannot generate nerve signals, making the dot disappear."
      },
      "materials": [
        "Computer screen or tablet",
        "Ruler or calibrated on-screen distance slider",
        "One hand to occlude the left eye"
      ],
      "steps": [
        "Sit upright directly facing your screen at an initial distance of approximately 45–50 cm.",
        "Completely cover your LEFT eye with your left hand (do not press on the eyelid).",
        "With your RIGHT eye open, stare continuously at the cross (+) on the left side of the stage.",
        "Use the distance calibration slider below to match your screen size, then move your head slowly toward and away from the screen.",
        "At a specific distance (around 30–38 cm depending on screen scale), observe the solid black circle completely disappear from your peripheral field!"
      ],
      "observe": {
        "prompt": "Record your observation: At what distance did the circle disappear for your right eye, and what did you perceive in place of the dot?",
        "promptEs": "Registra tu observación: ¿A qué distancia desapareció el círculo y qué viste en su lugar?",
        "type": "slider",
        "label": "Focal vanishing distance (cm)"
      },
      "explain": "When the black circle's image falls on the optic disc—the spot on your retina where ganglion axons exit to form the optic nerve—there are zero photoreceptor cells (rods or cones) to detect it. Remarkably, you do not see a black hole or blank void; your visual cortex uses active perceptual interpolation ('filling-in') to automatically synthesize the surrounding white background over the missing data."
    },
    "frames": [
      "Light enters through the ___ and is focused by the ___ onto the ___.",
      "In bright light, the iris ___ so that the pupil ___; in dim light, it ___.",
      "Sensory transduction occurs when rods and cones convert ___ into ___.",
      "If the optic nerve is severed, the brain cannot receive visual signals because ___.",
      "Whereas rods operate in ___, cones are specialized for ___."
    ],
    "writing": {
      "prompt": "Explain how your visual system allows you to see a bird flying outside your classroom window. Incorporate the scientific sequence from photon entry to cortical perception.",
      "promptEs": "Explica cómo tu sistema visual te permite ver un pájaro volando fuera de la ventana. Incorpora la secuencia científica desde la entrada del fotón hasta la percepción cortical.",
      "bank": [
        "cornea",
        "pupil",
        "iris",
        "lens",
        "retina",
        "photoreceptors",
        "rods and cones",
        "optic nerve",
        "visual cortex",
        "transduction",
        "refracts",
        "focuses"
      ],
      "verbs": [
        "enters",
        "refracts",
        "focuses",
        "converges",
        "transduces",
        "converts",
        "transmits",
        "interprets"
      ],
      "connectors": [
        "First",
        "Next",
        "Subsequently",
        "Then",
        "As a result",
        "Finally"
      ],
      "model": "First, light photons reflected from the flying bird strike the transparent cornea, which refracts the incoming rays. Next, the light passes through the pupil, while the iris adjusts its aperture to control illumination. Then, the crystalline lens dynamically changes curvature to focus the light sharply onto the retina. At the retina, specialized photoreceptors (rods and cones) perform sensory transduction, converting radiant photon energy into electrical action potentials. Finally, the optic nerve conducts these nerve impulses to the visual cortex in the occipital lobe, where the brain interprets the moving bird right-side up.",
      "verbStems": [
        "enter",
        "refract",
        "regulate",
        "focus",
        "converge",
        "transduce",
        "transmit",
        "interpret"
      ],
      "sequenceOrder": [
        "cornea",
        "pupil",
        "lens",
        "retina",
        "optic nerve",
        "visual cortex"
      ],
      "b1ChallengeFrame": "Write using at least 1 passive voice construction ('is refracted by...') and 1 relative clause ('..., where rods and cones...')."
    },
    "quiz": [
      {
        "level": "Remember",
        "q": "Which part of the eye is the colored ring of muscle that modulates pupil size?",
        "options": [
          "Iris",
          "Pupil",
          "Cornea",
          "Sclera"
        ],
        "explain": "The iris is the contractile circular muscle that controls the aperture of the pupil.",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "ngss_bio"
      },
      {
        "level": "Remember",
        "q": "Where does sensory transduction take place within the visual system?",
        "options": [
          "In the photoreceptors of the retina",
          "In the crystalline lens",
          "Along the optic nerve sheath",
          "Within the cornea"
        ],
        "explain": "Sensory transduction—the conversion of light photons into electrical impulses—is performed exclusively by rods and cones in the retina.",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "reading_comp"
      },
      {
        "level": "Understand",
        "q": "How do rods and cones differ in their physiological roles?",
        "options": [
          "Rods operate in dim light without color; cones require bright light and detect color and fine detail",
          "Rods detect red and green wavelengths; cones operate only in darkness",
          "Rods are concentrated entirely in the cornea; cones line the optic nerve",
          "Rods focus distant objects; cones adjust the pupil diameter"
        ],
        "explain": "Rods provide high-sensitivity monochromatic vision in dim light, whereas cones provide high-acuity trichromatic color vision.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "use_of_english"
      },
      {
        "level": "Understand",
        "q": "What is the biological cause of the physiological blind spot in human vision?",
        "options": [
          "The absence of photoreceptors at the optic disc where nerve fibers exit the eyeball",
          "A temporary exhaustion of photopigments in the pupil",
          "An opaque barrier of blood vessels directly in front of the lens",
          "A developmental defect that affects only one hemisphere of the brain"
        ],
        "explain": "The optic disc contains only exiting nerve fibers and blood vessels, lacking rods and cones completely.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "ngss_bio"
      },
      {
        "level": "Apply",
        "q": "A student moves from a sunlit soccer field into a pitch-black auditorium. Why are they temporarily unable to see clearly?",
        "options": [
          "Their pupils must dilate and their rod photoreceptors require time to regenerate photopigments",
          "Their cornea has temporarily lost its refractive curvature",
          "Their crystalline lens becomes cloudy when exposed to sudden darkness",
          "The optic nerve stops transmitting signals until sound is heard"
        ],
        "explain": "Dark adaptation requires pupil dilation by the iris and biochemical regeneration of rhodopsin in rod cells.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "reading_comp"
      },
      {
        "level": "Apply",
        "q": "In a patient with severe myopia, light rays converge and focus in front of the retina. Which corrective lens solves this optical issue?",
        "options": [
          "A diverging (concave) lens that spreads light rays before they enter the cornea",
          "A converging (convex) lens that shortens the focal point",
          "An opaque contact lens that blocks all peripheral rays",
          "A cylindrical lens that rotates the retinal image 180 degrees"
        ],
        "explain": "Concave (diverging) lenses compensate for excessive focal convergence by spreading the rays slightly so the focal point falls precisely on the retina.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "use_of_english"
      },
      {
        "level": "Analyze",
        "q": "A clinical patient suffers a traumatic injury that severs the left optic nerve completely, while both eyes and the visual cortex remain structurally intact. What is the expected physiological outcome?",
        "options": [
          "Total loss of vision in the left eye, while the right eye retains full visual field processing",
          "The patient sees everything upside down through the left eye",
          "The left pupil remains permanently constricted while color vision is preserved",
          "Both eyes lose peripheral vision but retain sharp foveal vision"
        ],
        "explain": "Because the optic nerve carries all electrical signals from that specific eyeball to the brain, severing the left optic nerve eliminates signal transmission from the left retina entirely.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "ngss_bio"
      },
      {
        "level": "Evaluate",
        "q": "Evaluate this scientific claim: 'The human eye perceives the world directly, acting like a video screen that sends finished pictures to the brain.' Why is this claim scientifically inaccurate?",
        "options": [
          "The eye does not send pictures; photoreceptors decompose light into electrical impulses that the visual cortex must actively assemble and reconstruct into an image",
          "The eye only detects sound vibrations and passes them to the vestibular system",
          "The retina is completely transparent and does not interact with photons",
          "Images on the retina are right-side up, so the brain does not perform any processing"
        ],
        "explain": "The eye does not transmit finished pictures. It performs sensory transduction, breaking light down into discrete electrophysiological signals that are reconstructed in specialized visual cortex circuits.",
        "cefr": "B1.2",
        "difficulty": 4,
        "skill": "reading_comp"
      }
    ],
    "biophysics": {
      "ionChannel": "cGMP-gated Na⁺/Ca²⁺ channels (Photoreceptor outer segment)",
      "ionChannelEs": "Canales catiónicos dependientes de GMPc (Na⁺/Ca²⁺)",
      "receptorPotential": "Hyperpolarization: In darkness, open cGMP channels keep rods/cones depolarized (~ -40 mV, dark current). Light activates rhodopsin → transducin → PDE, hydrolyzing cGMP and closing channels to hyperpolarize the cell (~ -70 mV).",
      "receptorPotentialEs": "Hiperpolarización: La luz cierra canales de Na⁺ mediante la cascada rodopsina-PDE, hiperpolarizando el fotorreceptor (-70 mV).",
      "adaptation": "Dual Photochemical & Neural Adaptation: Rhodopsin bleaching + Ca²⁺ feedback shifts dynamic sensitivity across 10 orders of light intensity (pupillary reflex + rod/cone switching).",
      "adaptationEs": "Adaptación dual fotoquímica y pupilar across 10 órdenes de magnitud lumínica.",
      "thalamicRelay": "Lateral Geniculate Nucleus (LGN) of the Thalamus → Primary Visual Cortex (V1, Occipital Lobe)",
      "thalamicRelayEs": "Núcleo Geniculado Lateral (LGN) del Tálamo → Corteza Visual Primaria (V1)"
    }
  },
  {
    "id": "hearing",
    "name": "Hearing",
    "es": "Oído",
    "organ": "The Ear",
    "organEs": "El oído",
    "cortex": "Auditory Cortex (Temporal Lobe)",
    "cortexEs": "Corteza auditiva (Lóbulo temporal)",
    "receptorClassification": "Mechanoreceptors (Auditory Hair Cells)",
    "receptorClassificationEs": "Mecanirreceptores (Células ciliadas auditivas)",
    "transduction": "Sound pressure vibrations in cochlear fluid physically deflect stereocilia on hair cells, opening mechanically-gated ion channels and generating electrical impulses.",
    "transductionEs": "Las vibraciones de presión sonora en el líquido coclear flexionan los estereocilios de las células ciliadas, abriendo canales iónicos mecánicos y generando impulsos eléctricos.",
    "wordFamily": "hear (verb) → hearing (noun) → auditory (anatomical) → audio (technological) → mechanoreceptor (cellular)",
    "objectives": [
      "I can locate and describe the function of the outer, middle, and inner ear structures.",
      "I can trace acoustic energy transformation from sound waves to mechanical vibrations, fluid waves, and nerve impulses.",
      "I can explain how auditory hair cells in the cochlea perform mechanotransduction.",
      "I can analyze how binaural hearing enables horizontal sound localization and evaluate the risk of acoustic trauma."
    ],
    "warmup": {
      "q": "Close your eyes for 30 seconds and remain completely silent. How many distinct audio frequencies or sound sources can your brain isolate?",
      "qEs": "Cierra los ojos durante 30 segundos en silencio total. ¿Cuántas fuentes o frecuencias de sonido distintas logra aislar tu cerebro?",
      "task": "Gently place two fingers against your vocal cords and vocalize a continuous 'mmmmm'. Can you feel the physical mechanical vibration?",
      "taskEs": "Coloca dos dedos en tu garganta y haz un sonido continuo 'mmmmm'. ¿Sientes la vibración mecánica física?"
    },
    "words": [
      {
        "id": "pinna",
        "en": "pinna (auricle)",
        "es": "pabellón auricular",
        "ipa": "/ˈpɪn.ə/",
        "def": "The visible cartilaginous outer flap of the ear that collects and funnels acoustic sound waves into the auditory canal.",
        "ex": "The convoluted shape of the pinna helps filter frequencies to determine whether a sound comes from above or below.",
        "note": "💡 In everyday English often referred to simply as the 'outer ear'.",
        "spot": true,
        "syllables": "PIN-uh",
        "pronTipEs": "Evita pronunciarla como 'piña'; es 'pina' corta.",
        "mnemonic": "Pinna = Pantalla externa que atrapa ondas."
      },
      {
        "id": "earcanal",
        "en": "ear canal (external acoustic meatus)",
        "es": "conducto auditivo",
        "ipa": "/ɪr kəˈnæl/",
        "def": "The tubular passageway lined with ceruminous glands (earwax) that channels sound waves from the pinna to the tympanic membrane.",
        "ex": "Sound waves travel down the ear canal to reach the eardrum.",
        "note": "✅ Cognate: canal = conducto/canal.",
        "spot": true,
        "syllables": "EAR CANAL (EXTERNAL ACOUSTIC MEATUS)"
      },
      {
        "id": "eardrum",
        "en": "eardrum (tympanic membrane)",
        "es": "tímpano",
        "ipa": "/ˈɪr.drʌm/",
        "def": "A thin, taut cone-shaped fibrous membrane separating the outer and middle ear that vibrates in response to arriving sound waves.",
        "ex": "When acoustic compressions strike the eardrum, it vibrates at matching frequencies.",
        "note": "💡 Compound word: ear + drum (vibrates like the skin of a musical drum).",
        "spot": true,
        "syllables": "EER-drum",
        "pronTipEs": "Dos sílabas: 'ír-dram'.",
        "mnemonic": "Eardrum = Tambor timpánico que vibra con el sonido."
      },
      {
        "id": "ossicles",
        "en": "ossicles",
        "es": "huesecillos (martillo, yunque, estribo)",
        "ipa": "/ˈɑː.sɪ.kəlz/",
        "def": "The trio of micro-bones in the middle ear (malleus/hammer, incus/anvil, stapes/stirrup) that mechanically amplify vibrations from the eardrum to the oval window.",
        "ex": "The ossicles act as a mechanical lever system, amplifying acoustic pressure more than twentyfold.",
        "note": "💡 Latin root: ossiculum = tiny bone (óseo in Spanish).",
        "spot": true,
        "syllables": "OSS-ih-kulz",
        "pronTipEs": "Esdrújula: acento fuerte al inicio (OSS).",
        "mnemonic": "M-I-S: Malleus (Martillo) → Incus (Yunque) → Stapes (Estribo)."
      },
      {
        "id": "cochlea",
        "en": "cochlea",
        "es": "cóclea (caracol)",
        "ipa": "/ˈkoʊ.kli.ə/",
        "def": "The spiral, fluid-filled snail-shaped bony structure of the inner ear containing the organ of Corti with sensory hair cells.",
        "ex": "Inside the cochlea, fluid pressure waves bend microscopic hair cells to generate electrical signals.",
        "note": "✅ Cognate: cochlea = cóclea.",
        "spot": true,
        "syllables": "KOH-klee-uh",
        "pronTipEs": "⚠️ ¡Trampa! 'ch' suena como /k/ griega, NO como 'ch' española.",
        "mnemonic": "Cochlea = Caracol lleno de fluido y células ciliadas."
      },
      {
        "id": "auditorynerve",
        "en": "auditory nerve (cochlear nerve, CN VIII)",
        "es": "nervio auditivo (coclear)",
        "ipa": "/ˈɔː.dɪ.tɔːr.i nɜːrv/",
        "def": "The branch of cranial nerve VIII that conveys sensory auditory impulses from cochlear hair cells to the brainstem and auditory cortex.",
        "ex": "The auditory nerve fires synchronized electrical impulses toward the temporal lobe.",
        "note": "💡 Word family: audit → auditory → audible.",
        "spot": true,
        "syllables": "AW-dih-tor-ee NURV",
        "pronTipEs": "Vocal larga /ɔː/ en 'aw-'.",
        "mnemonic": "CN VIII: Dos bucles del '8' parecen los canales semicirculares y la cóclea."
      },
      {
        "id": "haircells",
        "en": "hair cells (stereocilia)",
        "es": "células ciliadas",
        "ipa": "/her selz/",
        "def": "The specialized mechanoreceptors within the cochlea whose microscopic hair-like stereocilia bend under fluid waves to perform sensory transduction.",
        "ex": "Excessive sound decibels can physically snap stereocilia, leading to permanent sensorineural hearing loss.",
        "note": "💡 Mechanoreceptor: converts physical motion into electrical impulses.",
        "syllables": "HAIR SELZ",
        "pronTipEs": "Aspiración suave en 'h' (/hɛr/).",
        "mnemonic": "Hair cells = Pelitos microscópicos (estereocilios) que bailan con la onda."
      },
      {
        "id": "auditorycortex",
        "en": "auditory cortex",
        "es": "corteza auditiva",
        "ipa": "/ˈɔː.dɪ.tɔːr.i ˈkɔːr.teks/",
        "def": "The tonotopically organized region within the superior temporal gyrus of the temporal lobe that decodes frequency, pitch, volume, and speech.",
        "ex": "The auditory cortex decodes musical harmonies and language phonemes.",
        "note": "💡 Located in the temporal lobe near the ears.",
        "syllables": "AUDITORY CORTEX"
      }
    ],
    "path": [
      "soundwave",
      "pinna",
      "earcanal",
      "eardrum",
      "ossicles",
      "cochlea",
      "auditorynerve",
      "auditorycortex"
    ],
    "pathLabels": {
      "soundwave": "1. Sound waves (Ondas acústicas)",
      "pinna": "2. Pinna (Captación y embudo)",
      "earcanal": "3. Ear canal (Conducción)",
      "eardrum": "4. Eardrum (Vibración de membrana)",
      "ossicles": "5. Ossicles: Malleus, Incus, Stapes (Amplificación mecánica)",
      "cochlea": "6. Cochlea: Hair cells (Transducción mecanosensorial)",
      "auditorynerve": "7. Auditory nerve (Transmisión por CN VIII)",
      "auditorycortex": "8. Auditory Cortex (Percepción en lóbulo temporal)"
    },
    "reading": {
      "title": "The Path of Sound & Mechanotransduction",
      "paragraphs": [
        "Every acoustic stimulus initiates as a physical [[vibration|vibration]] propagating through matter as a longitudinal [[soundwave|sound wave]]. The human auditory system converts these minute air-pressure oscillations into mechanical movements, hydraulic waves, and finally electrical nerve impulses.",
        "First, the outer ear's cartilaginous [[pinna|pinna]] collects sound waves from the environment and directs them down the [[earcanal|ear canal]]. At the terminus of the canal, the airborne pressure waves collide with the [[eardrum|eardrum]] (tympanic membrane), forcing this taut fibrous partition to oscillate back and forth in exact synchrony with the incoming acoustic frequency.",
        "Next, in the air-filled middle ear cavity, the vibrations of the eardrum engage the [[ossicles|ossicles]]—the smallest bones in the human body: the malleus (hammer), incus (anvil), and stapes (stirrup). Acting as an ingenious biological lever system, the ossicles match the low impedance of air to the high impedance of cochlear fluid, amplifying the mechanical force over twenty times as the stapes footplate pushes against the flexible oval window.",
        "Then, the inward piston-like pumping of the stapes generates traveling hydraulic pressure waves within the fluid of the spiral [[cochlea|cochlea]]. As fluid ripples across the basilar membrane, thousands of specialized [[haircells|auditory hair cells]] are deflected against the overlying tectorial membrane. This physical bending of microscopic hair-like stereocilia opens mechanically-gated ion channels, allowing potassium and calcium ions to flood into the cell. This remarkable process—mechanotransduction—converts kinetic fluid energy into electrical receptor potentials.",
        "Finally, these depolarizations stimulate spiral ganglion neurons, whose axons form the [[auditorynerve|auditory nerve]] (cochlear branch of CN VIII). The nerve delivers action potentials through the brainstem and medial geniculate nucleus to the [[auditorycortex|auditory cortex]] in the temporal lobe. Because the cochlea and cortex are organized tonotopically (like a piano keyboard), specific frequencies are mapped to precise cortical zones, enabling you to distinguish a violin melody from a friend's voice."
      ],
      "checks": [
        {
          "after": 2,
          "q": "What is the primary physiological function of the three middle ear ossicles?",
          "options": [
            "To mechanically amplify sound vibrations from the eardrum to the fluid-filled cochlea",
            "To equalize air pressure between the throat and the outer ear",
            "To produce antibacterial cerumen (earwax) that traps dust",
            "To perform sensory transduction into electrical impulses"
          ],
          "explain": "The ossicles act as a lever mechanism that multiplies mechanical acoustic pressure so it can move the dense liquid inside the cochlea."
        },
        {
          "after": 3,
          "q": "How do auditory hair cells in the cochlea perform sensory transduction?",
          "options": [
            "Fluid movement physically bends their stereocilia, opening mechanically-gated ion channels",
            "They absorb light photons and release photopigments",
            "They dissolve in chemical mucus and stimulate taste pores",
            "They vibrate against the pinna to generate heat"
          ],
          "explain": "Hair cells are mechanoreceptors: physical deflection of their stereocilia mechanically opens ion channels, converting movement into electrical impulses."
        }
      ],
      "a2Summary": "Sound waves enter the outer ear (pinna) and travel down the ear canal until they vibrate the eardrum. Three tiny middle ear bones—the malleus, incus, and stapes—amplify these vibrations and press on the fluid-filled cochlea. Inside the cochlea, microscopic hair cells bend and convert mechanical vibrations into electrical impulses. Finally, the auditory nerve (CN VIII) carries the signal to the auditory cortex in the temporal lobe.",
      "collocations": [
        "collect sound waves",
        "amplify mechanical vibrations",
        "vibrate in resonance",
        "bend microscopic stereocilia",
        "interpret pitch and volume"
      ]
    },
    "funfact": "The stapes (stirrup), one of your three auditory ossicles, measures only 3 millimeters across—making it the smallest bone in the entire human skeleton!",
    "health": {
      "problems": [
        {
          "name": "Noise-Induced Hearing Loss (NIHL)",
          "text": "Excessive acoustic energy (above 85 dB over prolonged periods, or acute exposure over 120 dB) physically tears and shears stereocilia off cochlear hair cells. Because mammalian auditory hair cells cannot regenerate, this damage is irreversible."
        },
        {
          "name": "Otitis Media (Middle Ear Infection)",
          "text": "Bacterial or viral proliferation in the middle ear cavity behind the eardrum, frequently caused by Eustachian tube dysfunction in children, producing painful fluid accumulation and conductive hearing dampening."
        },
        {
          "name": "Tinnitus",
          "text": "Perception of persistent ringing, buzzing, or hissing sounds without an external acoustic source, often caused by damaged hair cells misfiring spontaneous electrical signals to the brain."
        }
      ],
      "care": [
        "Follow the evidence-based 60/60 rule: listen to personal headphones at no more than 60% maximum volume for no more than 60 consecutive minutes.",
        "Wear certified hearing protection (earplugs or noise-canceling earmuffs) at concerts, sporting events, and around power tools exceeding 85 dB.",
        "Never insert cotton swabs (Q-tips), pens, or keys into the ear canal; doing so compacts earwax against the eardrum and risks traumatic tympanic perforation."
      ]
    },
    "deeper": [
      {
        "name": "Semicircular Canals & Vestibular System",
        "es": "canales semicirculares y sistema vestibular",
        "text": "Three fluid-filled orthogonal loops adjoining the cochlea that contain hair cells detecting rotational head acceleration, governing dynamic equilibrium and spatial balance rather than hearing."
      },
      {
        "name": "Eustachian Tube (Pharyngotympanic Tube)",
        "es": "trompa de Eustaquio",
        "text": "A channel connecting the middle ear cavity to the nasopharynx that opens during swallowing or yawning to equalize atmospheric pressure on both sides of the eardrum."
      },
      {
        "name": "Tonotopic Organization",
        "es": "organización tonotópica",
        "text": "High-frequency pitch (up to 20,000 Hz) vibrates the stiff, narrow base of the cochlea near the oval window, while low-frequency pitch (down to 20 Hz) travels all the way to the flexible, wide apex."
      },
      {
        "name": "Conductive vs. Sensorineural Hearing Loss",
        "es": "pérdida auditiva conductiva vs. neurosensorial",
        "text": "Conductive loss involves physical sound transmission failure in the outer or middle ear (wax, torn eardrum, ossicular stiffness); sensorineural loss involves hair cell or auditory nerve damage in the inner ear."
      }
    ],
    "match": [
      [
        "pinna",
        "Visible external cartilage funneling sound waves into the canal"
      ],
      [
        "eardrum",
        "Tympanic membrane vibrating in response to arriving acoustic waves"
      ],
      [
        "ossicles",
        "Malleus, incus, and stapes amplifying mechanical force"
      ],
      [
        "cochlea",
        "Fluid-filled spiral organ where hair cells perform mechanotransduction"
      ],
      [
        "auditorynerve",
        "Cranial nerve VIII conducting action potentials to the temporal lobe"
      ]
    ],
    "cloze": {
      "text": "Acoustic sound waves enter the ear canal and strike the {eardrum}, causing it to vibrate. In the middle ear, the three tiny {ossicles} amplify these vibrations and transmit them to the oval window. Inside the fluid-filled {cochlea}, specialized {hair cells} are bent by fluid ripples, performing mechanotransduction. Finally, the {auditory nerve} conducts the electrical signals to the {auditory cortex}.",
      "extra": [
        "retina",
        "cornea",
        "taste buds"
      ]
    },
    "experiment": {
      "title": "Binaural Hearing & Horizontal Sound Localization",
      "type": "localization",
      "predict": {
        "q": "How does covering one ear affect your brain's ability to pinpoint the exact spatial direction of a sound?",
        "qEs": "¿Cómo afecta taparse un oído la capacidad del cerebro para localizar la dirección espacial de un sonido?",
        "options": [
          "Covering one ear significantly reduces localization accuracy because the brain requires interaural time and intensity differences",
          "Covering one ear doubles localization accuracy by eliminating background echoes",
          "There is no measurable difference because each ear localizes 360 degrees independently",
          "Sounds become completely silent when one ear canal is occluded"
        ],
        "explain": "The brain localizes sound by calculating minute differences in arrival time (microseconds) and acoustic intensity between two ears. With only one ear open, interaural comparison is impossible."
      },
      "materials": [
        "A testing partner",
        "Blindfold or closed eyes",
        "Clicker, snapped fingers, or keys"
      ],
      "steps": [
        "Sit on a chair in the middle of a quiet room and close your eyes (or wear a blindfold).",
        "Your partner quietly stands at varying positions (front-left, behind-right, directly above, far-left) and snaps their fingers once.",
        "Immediately point your index finger directly at the perceived sound source. Have your partner record whether your angle was exact.",
        "Repeat for 5 trials with BOTH ears uncovered, tallying correct directions.",
        "Now tightly seal your LEFT ear with your finger and repeat 5 identical trials from random positions. Compare your binaural vs. monaural accuracy score!"
      ],
      "observe": {
        "prompt": "Compare your localization accuracy: Record how many correct source identifications you achieved with both ears versus one ear (out of 5 trials).",
        "promptEs": "Compara tu precisión de localización: Registra cuántas identificaciones correctas lograste con ambos oídos versus un oído (de 5 intentos).",
        "type": "table",
        "columns": [
          "Condition",
          "Correct Trials (out of 5)"
        ],
        "rows": [
          [
            "Both ears open (Binaural)",
            "5"
          ],
          [
            "One ear covered (Monaural)",
            "2"
          ]
        ]
      },
      "explain": "Your auditory brainstem centers (superior olivary complex) process two subtle binaural cues: Interaural Time Difference (ITD—sound reaching the closer ear fractions of a millisecond earlier) and Interaural Level Difference (ILD—the acoustic 'shadow' of your head making the sound slightly quieter in the far ear). When you cover one ear, you deprive your auditory cortex of these comparative differential cues, making spatial localization remarkably inaccurate."
    },
    "frames": [
      "Sound waves enter through the ___ and cause the ___ to oscillate.",
      "The three ossicles (___, ___, and ___) amplify mechanical vibrations by ___.",
      "In the cochlea, fluid displacement deflects ___, which opens ion channels and converts ___ into ___.",
      "Binaural hearing allows us to localize sound sources because the brain calculates ___.",
      "Prolonged exposure to sound above 85 dB can permanently destroy ___ because ___."
    ],
    "writing": {
      "prompt": "Explain how you hear a siren when an ambulance passes down the street. Describe how acoustic energy transforms into mechanical, hydraulic, and electrical signals.",
      "promptEs": "Explica cómo escuchas una sirena cuando pasa una ambulancia. Describe cómo la energía acústica se transforma en señales mecánicas, hidráulicas y eléctricas.",
      "bank": [
        "sound waves",
        "pinna",
        "ear canal",
        "eardrum",
        "ossicles",
        "cochlea",
        "hair cells",
        "auditory nerve",
        "auditory cortex",
        "mechanotransduction",
        "amplifies"
      ],
      "verbs": [
        "travels",
        "funnels",
        "vibrates",
        "amplifies",
        "deflects",
        "transduces",
        "transmits",
        "interprets"
      ],
      "connectors": [
        "Initially",
        "Subsequently",
        "Then",
        "Simultaneously",
        "Finally"
      ],
      "model": "Initially, acoustic sound waves from the ambulance siren are collected by the pinna and channeled down the ear canal. Subsequently, the pressure waves strike the eardrum, forcing it to vibrate mechanically. Then, the three middle ear ossicles amplify these vibrations and push against the oval window of the cochlea. Inside the cochlea, fluid pressure waves deflect the microscopic stereocilia of sensory hair cells, performing mechanotransduction by converting mechanical movement into electrical nerve impulses. Finally, the auditory nerve conveys these action potentials to the auditory cortex in the temporal lobe, where your brain identifies the siren's pitch and location.",
      "verbStems": [
        "collect",
        "channel",
        "vibrate",
        "amplify",
        "deflect",
        "transduce",
        "conduct",
        "process"
      ],
      "sequenceOrder": [
        "pinna",
        "eardrum",
        "ossicles",
        "cochlea",
        "auditory nerve",
        "auditory cortex"
      ],
      "b1ChallengeFrame": "Include 1 passive transformation ('vibrations are amplified by...') and connect mechanical energy to K⁺ hair cell transduction."
    },
    "quiz": [
      {
        "level": "Remember",
        "q": "What are the three middle ear ossicles collectively known as?",
        "options": [
          "Malleus, incus, and stapes (hammer, anvil, stirrup)",
          "Cornea, pupil, and lens",
          "Pinna, ear canal, and tympanum",
          "Cochlea, vestibule, and semicircular canal"
        ],
        "explain": "The ossicles comprise the malleus (hammer), incus (anvil), and stapes (stirrup).",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "ngss_bio"
      },
      {
        "level": "Remember",
        "q": "Where are the auditory mechanoreceptors (hair cells) located?",
        "options": [
          "Inside the cochlea of the inner ear",
          "Along the cartilage of the pinna",
          "On the surface of the eardrum",
          "Within the Eustachian tube"
        ],
        "explain": "Hair cells reside on the basilar membrane within the organ of Corti inside the cochlea.",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "reading_comp"
      },
      {
        "level": "Understand",
        "q": "What occurs during the process of mechanotransduction in the inner ear?",
        "options": [
          "Fluid movement physically bends hair cell stereocilia, opening ion channels and generating electrical impulses",
          "Light waves activate photopigments in the eardrum",
          "Enzymes in saliva break down acoustic proteins",
          "Air pressure closes the auditory nerve to prevent signal overload"
        ],
        "explain": "Deflection of stereocilia mechanically opens ion channels, converting kinetic fluid motion into electrical receptor potentials.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "use_of_english"
      },
      {
        "level": "Understand",
        "q": "Why is the tonotopic map of the cochlea compared to a piano keyboard?",
        "options": [
          "Different frequencies stimulate hair cells at specific anatomical locations along the cochlea from base to apex",
          "The ossicles strike the eardrum with rhythmic hammer strokes",
          "The ear canal produces musical chords when air enters",
          "Both ears alternate listening to odd and even sound frequencies"
        ],
        "explain": "High frequencies displace the stiff base of the cochlea, while low frequencies travel to the flexible apex.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "ngss_bio"
      },
      {
        "level": "Apply",
        "q": "A factory worker is exposed to continuous machinery noise at 95 dB without ear protection for five years. Why is their resulting hearing loss permanent?",
        "options": [
          "Damaged mammalian cochlear hair cells cannot regenerate once destroyed",
          "The pinna shrinks and closes the ear canal permanently",
          "The temporal lobe runs out of electrical energy",
          "The Eustachian tube remains permanently blocked by sound waves"
        ],
        "explain": "Mammalian auditory hair cells lack regenerative capacity; once stereocilia are broken or sheared off, sensorineural loss is irreversible.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "reading_comp"
      },
      {
        "level": "Apply",
        "q": "A passenger's ears 'pop' as an airplane ascends into low-pressure altitude. What anatomical structure is equalizing the pressure?",
        "options": [
          "The Eustachian (pharyngotympanic) tube connecting the middle ear to the throat",
          "The external auditory canal",
          "The semicircular canals of the inner ear",
          "The auditory nerve sheath"
        ],
        "explain": "The Eustachian tube opens during swallowing to balance middle-ear pressure with atmospheric air pressure.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "use_of_english"
      },
      {
        "level": "Analyze",
        "q": "A physician diagnoses a patient with otosclerosis, a condition where the stapes bone becomes fused and immobilized. How will this affect hearing transmission?",
        "options": [
          "Vibrations cannot be mechanically transferred to the fluid of the cochlea, causing conductive hearing loss",
          "Hair cells will fire uncontrollably, causing heightened ultrasonic hearing",
          "Light will no longer focus on the retina",
          "The auditory cortex will physically shrink in the parietal lobe"
        ],
        "explain": "If the stapes cannot move like a piston against the oval window, sound vibrations cannot displace cochlear fluid, blocking mechanical conduction.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "ngss_bio"
      },
      {
        "level": "Evaluate",
        "q": "Evaluate why humans possess two ears positioned on opposite sides of the head rather than a single ear in the center of the forehead. What evolutionary advantage does this configuration provide?",
        "options": [
          "Binaural processing calculates microsecond time and volume differences to locate predators or prey in three-dimensional space",
          "Two ears allow one ear to sleep while the other remains vigilant",
          "A single central ear would be incapable of hearing frequencies above 100 Hz",
          "Two ears double the pitch of incoming voices so words sound higher"
        ],
        "explain": "Separated ears produce interaural time (ITD) and intensity (ILD) differences that neural circuits in the brainstem use to calculate horizontal sound coordinates.",
        "cefr": "B1.2",
        "difficulty": 4,
        "skill": "reading_comp"
      }
    ],
    "biophysics": {
      "ionChannel": "TMC1/TMC2 mechanically-gated channels connected by cadherin-23 tip-links (K⁺ influx from endolymph)",
      "ionChannelEs": "Canales mecánicos TMC1/TMC2 acoplados por enlaces de punta (influjo de K⁺)",
      "receptorPotential": "Depolarization via K⁺: Bending stereocilia toward the tallest kinocilium pulls tip-links taut, opening TMC1 channels so high-K⁺ endolymph (+80 mV endocochlear potential) rushes in and depolarizes the hair cell.",
      "receptorPotentialEs": "Despolarización por K⁺: La deflexión de estereocilios abre canales TMC1 permitiendo entrada rápida de potasio.",
      "adaptation": "Rapid Phasic Mechanical Adaptation (~ms): Myosin-1c motor proteins slip along actin filaments to reset tip-link tension during sustained sound pressure, alongside efferent olivocochlear damping.",
      "adaptationEs": "Adaptación mecánica rápida mediante motores de miosina que reajustan la tensión del tip-link.",
      "thalamicRelay": "Medial Geniculate Nucleus (MGN) of the Thalamus → Primary Auditory Cortex (A1, Superior Temporal Gyrus)",
      "thalamicRelayEs": "Núcleo Geniculado Medial (MGN) del Tálamo → Corteza Auditiva Primaria (Lóbulo Temporal)"
    }
  },
  {
    "id": "smell",
    "name": "Smell",
    "es": "Olfato",
    "organ": "The Nose",
    "organEs": "La nariz",
    "cortex": "Olfactory Cortex & Limbic System (Temporal Lobe & Amygdala)",
    "cortexEs": "Corteza olfativa y Sistema límbico (Lóbulo temporal y Amígdala)",
    "receptorClassification": "Chemoreceptors (Olfactory Receptor Neurons)",
    "receptorClassificationEs": "Quimiorreceptores (Neuronas receptoras olfativas)",
    "transduction": "Volatile airborne odorant molecules dissolve in nasal mucus and bind to G-protein coupled receptors on olfactory cilia, triggering cyclic AMP cascades and depolarizing the neuron.",
    "transductionEs": "Moléculas olorosas volátiles se disuelven en el moco nasal y se unen a receptores acoplados a proteínas G, desencadenando despolarización neuronal.",
    "wordFamily": "smell (verb/noun) → odor (stimulus) → olfactory (anatomical) → olfaction (sensory process) → chemoreceptor (cellular)",
    "objectives": [
      "I can identify and locate the structures of the nasal cavity, olfactory epithelium, and olfactory bulb.",
      "I can explain chemical sensory transduction: how odorant molecules bind to specialized G-protein receptors in nasal mucus.",
      "I can explain why smell has a uniquely direct neural connection to emotional memory (limbic system).",
      "I can analyze the scientific cause of temporary anosmia during viral respiratory infections."
    ],
    "warmup": {
      "q": "Recall a distinct scent—such as wet rain, cut grass, vanilla, or cinnamon. Does it trigger an immediate visual or emotional memory?",
      "qEs": "¿Recuerdas un olor característico (lluvia, césped cortado, vainilla o canela)? ¿Te genera un recuerdo visual o emocional inmediato?",
      "task": "Take a deep sniff through both nostrils simultaneously, then close one nostril. Does airflow feel identical in both sides?",
      "taskEs": "Inhala profundamente por ambas fosas nasales a la vez, y luego tapa una fosa. ¿El flujo de aire se siente igual en ambos lados?"
    },
    "words": [
      {
        "id": "nostril",
        "en": "nostril (naris)",
        "es": "fosa nasal (orificio)",
        "ipa": "/ˈnɑː.strəl/",
        "def": "Either of the two external openings of the nose through which air and volatile odorant molecules enter the respiratory tract.",
        "ex": "Inhaled air enters through the nostrils and travels across the nasal septum.",
        "note": "💡 Humans have two nostrils that alternate airflow in a rhythmic nasal cycle.",
        "spot": true,
        "syllables": "NOSS-tril",
        "pronTipEs": "Pronuncia claramente el grupo '-str-' sin perder la 't'.",
        "mnemonic": "Nostril = Narina de entrada aérea."
      },
      {
        "id": "nasalcavity",
        "en": "nasal cavity",
        "es": "cavidad nasal",
        "ipa": "/ˈneɪ.zəl ˈkæv.ə.ti/",
        "def": "The large internal air-filled space behind the nose lined with mucous membranes and bony turbinates that warm, filter, and humidify air.",
        "ex": "Curved turbinates inside the nasal cavity create turbulence so odor molecules reach the roof of the nose.",
        "note": "✅ Cognate: nasal cavity = cavidad nasal.",
        "spot": true,
        "syllables": "NAY-zul KAV-ih-tee",
        "pronTipEs": "Vocal larga /eɪ/ en 'na-'.",
        "mnemonic": "Turbinates = Turbinas que giran y calientan el aire."
      },
      {
        "id": "olfreceptors",
        "en": "olfactory receptors",
        "es": "receptores olfativos",
        "ipa": "/ɑːlˈfæk.tər.i rɪˈsep.tərz/",
        "def": "Specialized bipolar chemoreceptor neurons located in the olfactory epithelium whose cilia detect airborne chemical molecules.",
        "ex": "Humans possess approximately 400 distinct genetic types of olfactory receptor proteins.",
        "note": "💡 Chemoreceptor: detects chemical compounds.",
        "spot": true,
        "syllables": "ohl-FAK-tor-ee",
        "pronTipEs": "Acento en '-FAK-'.",
        "mnemonic": "Chemoreceptors = Cerraduras moleculares para aromas."
      },
      {
        "id": "olfnerve",
        "en": "olfactory nerve (CN I)",
        "es": "nervio olfativo",
        "ipa": "/ɑːlˈfæk.tər.i nɜːrv/",
        "def": "The bundle of non-myelinated sensory axons (cranial nerve I) that traverses the cribriform plate of the ethmoid bone to connect receptors to the bulb.",
        "ex": "Axons forming the olfactory nerve pass through tiny perforations in the skull base.",
        "note": "⚠️ Cranial nerve I connects the nasal epithelium directly to the olfactory bulb.",
        "spot": true,
        "syllables": "ohl-FAK-tor-ee NURV",
        "pronTipEs": "CN I: 'One nose → Cranial Nerve I'.",
        "mnemonic": "CN I = 1 sola nariz, primer nervio craneal."
      },
      {
        "id": "olfbulb",
        "en": "olfactory bulb",
        "es": "bulbo olfativo",
        "ipa": "/ɑːlˈfæk.tər.i bʌlb/",
        "def": "The forebrain structure situated beneath the frontal lobes where olfactory nerve fibers synapse with mitral cells in clusters called glomeruli.",
        "ex": "The olfactory bulb sorts and processes raw odor signals before routing them to higher brain regions.",
        "note": "💡 Bulb: rounded anatomical structure like a plant bulb.",
        "spot": true,
        "syllables": "ohl-FAK-tor-ee BULB",
        "pronTipEs": "⚠️ Falso amigo parcial: traduce 'bulbo', no 'foco'.",
        "mnemonic": "Bulbo olfatorio = Estación directa al sistema límbico (emociones)."
      },
      {
        "id": "odor",
        "en": "odorant molecules",
        "es": "moléculas odoríferas",
        "ipa": "/ˈoʊ.dər.ənt ˈmɑː.lə.kjuːlz/",
        "def": "Volatile airborne chemical compounds small enough to evaporate into the air and bind to olfactory receptor sites.",
        "ex": "Baking bread releases hundreds of volatile odorant molecules into the kitchen.",
        "note": "✅ Cognate: odor = olor.",
        "syllables": "ODORANT MOLECULES"
      },
      {
        "id": "mucus",
        "en": "mucus layer",
        "es": "capa de moco",
        "ipa": "/ˈmjuː.kəs/",
        "def": "The protective watery aqueous secretion coating the nasal epithelium in which odorant molecules must dissolve before binding to receptors.",
        "ex": "Odor molecules must first dissolve in nasal mucus to reach the receptor cilia.",
        "note": "💡 Physiological solvent essential for olfaction.",
        "syllables": "MUCUS LAYER"
      },
      {
        "id": "olfactorycortex",
        "en": "olfactory cortex & limbic system",
        "es": "corteza olfativa y sistema límbico",
        "ipa": "/ɑːlˈfæk.tər.i ˈkɔːr.teks/",
        "def": "The neural network in the temporal lobe, amygdala, and hippocampus that identifies odors and associates them with emotion and episodic memory.",
        "ex": "Because olfactory tracts wire directly into the limbic system, smells trigger vivid emotional recall.",
        "note": "💡 The only sensory pathway that bypasses the thalamus on its primary route!",
        "syllables": "OLFACTORY CORTEX & LIMBIC SYSTEM"
      }
    ],
    "path": [
      "odor",
      "nostril",
      "nasalcavity",
      "mucus",
      "olfreceptors",
      "olfnerve",
      "olfbulb",
      "olfactorycortex"
    ],
    "pathLabels": {
      "odor": "1. Odorant molecules (Moléculas volátiles)",
      "nostril": "2. Nostrils (Entrada nasal)",
      "nasalcavity": "3. Nasal cavity & Turbinates (Turbulencia)",
      "mucus": "4. Mucus layer (Disolución química)",
      "olfreceptors": "5. Olfactory receptors (Transducción química)",
      "olfnerve": "6. Olfactory nerve: CN I (Cribriform plate)",
      "olfbulb": "7. Olfactory bulb (Procesamiento glomerular)",
      "olfactorycortex": "8. Olfactory Cortex & Limbic System (Memoria y emoción)"
    },
    "reading": {
      "title": "The Path of Smell & Chemical Transduction",
      "paragraphs": [
        "Olfaction is an ancient, highly sensitive chemical sense. Every scent in our environment originates as microscopic, volatile [[odor|odorant molecules]] circulating in the atmosphere. To detect these chemicals, our olfactory system executes an intricate sequence of physical transport and biochemical transduction.",
        "First, when you inhale, air currents carry odorant molecules through the [[nostril|nostrils]] into the [[nasalcavity|nasal cavity]]. Inside the cavity, three pairs of scroll-shaped spongy bones called turbinates warm, humidify, and churn the air into vortexes. This turbulent airflow propels a fraction of the inhaled molecules upward toward the roof of the nasal vault.",
        "At the superior apex of each nasal cavity lies the olfactory epithelium—a specialized yellowish tissue patch measuring roughly five square centimeters. Before any chemical interaction can occur, airborne odorants must first dissolve into the aqueous [[mucus|mucus layer]] secreted by Bowman's glands. If the nasal lining is desiccated or overly congested, molecules cannot dissolve properly.",
        "Once dissolved, the chemical odorants bind to matching receptor proteins embedded in the long cilia of millions of bipolar [[olfreceptors|olfactory receptor neurons]]. Each olfactory neuron expresses only one of approximately 400 distinct receptor types. When an odor molecule docks with its corresponding receptor like a key in a lock, it activates an intracellular G-protein cascade that opens ion channels. This influx of positive ions depolarizes the neuron, successfully executing sensory transduction from chemical binding into an electrical action potential.",
        "Next, the non-myelinated axons of these olfactory neurons converge into bundle fibers forming the [[olfnerve|olfactory nerve]] (cranial nerve I). These delicate fibers traverse upward through tiny perforations in the skull's ethmoid cribriform plate to synapse in the [[olfbulb|olfactory bulb]]. Inside the bulb, specialized spherical micro-circuits called glomeruli organize signals into a distinct combinatorial 'odor fingerprint.'",
        "Finally, unlike sight, hearing, taste, or touch, olfactory signals do not route primarily through the thalamus. Instead, olfactory tracts transmit action potentials directly to the primary [[olfactorycortex|olfactory cortex]] and into the limbic system—specifically the amygdala (emotional center) and the hippocampus (memory formation). This direct anatomical highway explains why a fleeting scent can evoke instant, deeply emotional childhood memories before you can even consciously name the smell."
      ],
      "checks": [
        {
          "after": 2,
          "q": "Why must airborne odor molecules dissolve in the nasal mucus layer before you can smell them?",
          "options": [
            "Receptor proteins on olfactory cilia can only bind to dissolved chemicals in solution",
            "Mucus cools the molecules so they don't burn the nasal cavity",
            "Mucus converts light into sound waves",
            "Dissolving molecules makes the nostrils expand mechanically"
          ],
          "explain": "Olfactory receptors are chemoreceptors; they can only interact with odorants once the molecules dissolve in the watery mucous fluid."
        },
        {
          "after": 4,
          "q": "What anatomical characteristic makes the olfactory pathway unique compared to vision, hearing, and touch?",
          "options": [
            "It routes directly into the limbic system (amygdala/hippocampus) without an obligatory first relay through the thalamus",
            "It travels down the spinal cord to the kidneys before reaching the brain",
            "It uses photoreceptors to detect volatile gases",
            "It only functions when the mouth is wide open"
          ],
          "explain": "Olfaction is the only sensory modality with direct neural projections into the limbic system without requiring a thalamic relay station first."
        }
      ],
      "a2Summary": "When you inhale, tiny chemical molecules enter your nostrils and swirl inside the nasal cavity. At the roof of the cavity, odor molecules dissolve in wet mucus and bind to specialized olfactory chemoreceptors. These sensory neurons send electrical impulses up through small holes in the bone to the olfactory bulb. Unlike other senses, smell travels directly to the brain's emotion and memory centers (the limbic system) and the olfactory cortex.",
      "collocations": [
        "dissolve in aqueous mucus",
        "bind to chemoreceptors",
        "ascend through the cribriform plate",
        "bypass the thalamus",
        "evoke emotional memories"
      ]
    },
    "funfact": "Humans can distinguish upwards of one trillion distinct odor combinations using a combinatorial code of roughly 400 olfactory receptor types—much like an alphabet of 26 letters can generate millions of different words!",
    "health": {
      "problems": [
        {
          "name": "Anosmia",
          "text": "Complete loss of the sense of smell. Temporary anosmia frequently occurs during upper respiratory viral infections (common cold, influenza, COVID-19) due to sustentacular cell disruption or mucosal inflammation blocking airflow to the epithelium."
        },
        {
          "name": "Hyposmia & Parosmia",
          "text": "Hyposmia is reduced olfactory sensitivity; parosmia is a distorted olfactory perception where familiar pleasant aromas (like coffee or roasted chicken) smell foul, rotten, or metallic during nerve regeneration."
        },
        {
          "name": "Sinusitis",
          "text": "Inflammation of the paranasal sinuses causing mucosal hypersecretion and severe facial pressure, impeding odorants from ascending to the olfactory cleft."
        }
      ],
      "care": [
        "Avoid sniffing concentrated caustic industrial chemicals, bleach, or ammonia directly; strong chemical fumes can permanently burn olfactory receptor cilia.",
        "Gently blow your nose one nostril at a time to prevent forcing infectious mucus back into your paranasal sinuses and Eustachian tubes.",
        "Maintain indoor air humidity and stay well-hydrated to ensure the nasal mucous membrane maintains the optimal physiological viscosity needed to dissolve odorants."
      ]
    },
    "deeper": [
      {
        "name": "Cribriform Plate of Ethmoid Bone",
        "es": "lámina cribosa del etmoides",
        "text": "A porous horizontal bone at the cranial base resembling a sieve; severe head trauma can fracture this plate, tearing olfactory nerve fibers and causing permanent anosmia or cerebrospinal fluid leakage."
      },
      {
        "name": "Olfactory Sensory Neuron Regeneration",
        "es": "regeneración de neuronas olfativas",
        "text": "Unlike auditory hair cells or retinal photoreceptors, olfactory neurons are directly exposed to the external environment and undergo natural replacement from basal stem cells every 30 to 60 days."
      },
      {
        "name": "Vomeronasal Organ (VNO)",
        "es": "órgano vomeronasal (de Jacobson)",
        "text": "An auxiliary olfactory structure prominent in many mammals for detecting pheromones; in adult humans, it is vestigial and non-functional."
      },
      {
        "name": "Nasal Cycle",
        "es": "ciclo nasal",
        "text": "An automatic ultradian rhythm governed by the autonomic nervous system wherein nasal erectile tissue alternates congestion and decongestion between nostrils every 2 to 4 hours."
      }
    ],
    "match": [
      [
        "nostril",
        "External opening admitting air and volatile chemicals"
      ],
      [
        "mucus",
        "Aqueous solvent coating cilia where odorants must dissolve"
      ],
      [
        "olfreceptors",
        "Bipolar sensory neurons performing chemical transduction"
      ],
      [
        "olfbulb",
        "Forebrain structure where glomeruli sort odor signals"
      ],
      [
        "olfactorycortex",
        "Cortical and limbic network processing scent, emotion, and memory"
      ]
    ],
    "cloze": {
      "text": "Airborne volatile {odor} molecules enter through the {nostrils} and circulate in the nasal cavity. They dissolve in the watery {mucus} layer and bind to specialized {olfactory receptors}. The axons of these neurons form the {olfactory nerve}, which passes through the skull to the {olfactory bulb}. Finally, signals project directly to the olfactory cortex and the {limbic system}.",
      "extra": [
        "cochlea",
        "cornea",
        "eardrum"
      ]
    },
    "experiment": {
      "title": "Chemical Aroma Detective & Retronasal Scent Isolation",
      "type": "aroma",
      "predict": {
        "q": "What do you hypothesize happens to your ability to identify distinct food aromas when airborne molecules enter only through the nose versus retronasally through the back of the mouth?",
        "qEs": "¿Qué crees que ocurre con tu capacidad para identificar aromas cuando las moléculas entran solo por la nariz versus retronasalmente por la boca?",
        "options": [
          "Smell and taste combine in the brain; blocking airflow prevents volatile odorants from reaching the olfactory cleft retronasally",
          "Food aroma is detected entirely by the tongue, so pinching the nose makes no difference",
          "Pinching the nose completely eliminates the basic taste of table salt and sugar",
          "The olfactory bulb moves closer to the throat during mastication"
        ],
        "explain": "True food aroma depends overwhelmingly on retronasal olfaction: chewing food forces volatile gases up into the nasal cavity from the back of the throat. Without olfactory input, you only perceive basic tongue tastants."
      },
      "materials": [
        "3 opaque cups containing distinct aromatic items (coffee grounds, crushed cinnamon, citrus peel, or peppermint)",
        "A blindfold or closed eyes"
      ],
      "steps": [
        "Work with a partner. Put on a blindfold or keep your eyes tightly closed.",
        "Your partner holds one mystery cup approximately 3 cm beneath your nose.",
        "Inhale gently through your nose for 3 seconds. Say aloud: 'I predict this scent is ___ because it reminds me of ___.'",
        "Now tightly pinch your nostrils closed with your fingers, place a small slice of fruit or flavored candy in your mouth, and chew for 5 seconds.",
        "Note that you can only feel sweetness or acidity; now suddenly RELEASE your nostrils! Notice how the full rich aroma explosively blooms in your consciousness."
      ],
      "observe": {
        "prompt": "Document your sensory experience: Which mystery scents were you able to identify, and what emotional memory or association did each aroma evoke?",
        "promptEs": "Documenta tu experiencia sensorial: ¿Cuáles aromas lograste identificar y qué recuerdo emocional te evocó cada uno?",
        "type": "notes",
        "label": "Aroma identification & Memory notes"
      },
      "explain": "When you pinched your nose, you isolated your tongue's gustatory receptors (sweet, sour), proving that taste alone cannot identify complex flavors like orange or cinnamon. Releasing your nose enabled volatile odorants released during mastication to travel through the pharynx into the nasal cavity (retronasal olfaction). These molecules bound to your olfactory receptors, which sent impulses directly into your limbic system (amygdala and hippocampus), instantly unlocking both flavor identification and evocative emotional memory."
    },
    "frames": [
      "Volatile odorant molecules enter through the ___ and circulate within the ___.",
      "Before chemical detection can occur, odor molecules must first dissolve in ___.",
      "Sensory transduction happens when odorants bind to ___, which triggers ___.",
      "The olfactory pathway is anatomically unique because signals travel directly to the ___ without ___.",
      "When we have a cold, our sense of smell diminishes because ___."
    ],
    "writing": {
      "prompt": "Explain how you smell freshly peeled orange slices across a room. Detail the chemical journey from the citrus fruit to your brain's emotional memory centers.",
      "promptEs": "Explica cómo hueles rodajas de naranja recién peladas al otro lado de la habitación. Detalla el viaje químico desde el cítrico hasta los centros de memoria emocional de tu cerebro.",
      "bank": [
        "odorant molecules",
        "nostrils",
        "nasal cavity",
        "mucus layer",
        "olfactory receptors",
        "olfactory nerve",
        "olfactory bulb",
        "limbic system",
        "transduction"
      ],
      "verbs": [
        "evaporates",
        "circulates",
        "dissolves",
        "binds",
        "depolarizes",
        "synapses",
        "recalls"
      ],
      "connectors": [
        "Initially",
        "Afterward",
        "Next",
        "As a consequence",
        "Ultimately"
      ],
      "model": "Initially, volatile odorant molecules evaporate from the freshly peeled orange and circulate through the room. Next, as you inhale, the molecules enter through the nostrils and travel into the nasal cavity. Afterward, the chemicals dissolve in the protective mucus layer coating the olfactory epithelium. When the dissolved molecules bind to matching olfactory receptors on sensory cilia, chemical transduction depolarizes the neurons into electrical action potentials. The olfactory nerve conducts these signals through the cribriform plate to the olfactory bulb. Ultimately, the impulses project directly to the olfactory cortex and the limbic system, allowing you to recognize the citrus scent and recall memories associated with oranges.",
      "verbStems": [
        "inhale",
        "dissolve",
        "bind",
        "depolarize",
        "pass",
        "synapse",
        "bypass",
        "evoke"
      ],
      "sequenceOrder": [
        "nostril",
        "nasal cavity",
        "mucus",
        "olfactory",
        "bulb",
        "limbic"
      ],
      "b1ChallengeFrame": "Use a participle clause ('Dissolved in mucus, volatile odorants...') and explain why smell bypasses the thalamus."
    },
    "quiz": [
      {
        "level": "Remember",
        "q": "Where are the sensory neurons of smell (olfactory receptor cells) located?",
        "options": [
          "In the olfactory epithelium at the superior roof of the nasal cavity",
          "Inside the lower respiratory lungs",
          "On the papillae of the tongue",
          "Along the auditory Eustachian tube"
        ],
        "explain": "Olfactory receptor neurons are embedded within the olfactory epithelium lining the roof of the nasal cavity.",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "ngss_bio"
      },
      {
        "level": "Remember",
        "q": "Through which perforated cranial bone do olfactory nerve fibers pass to reach the brain?",
        "options": [
          "Cribriform plate of the ethmoid bone",
          "Temporal bone of the inner ear",
          "Frontal bone of the forehead",
          "Occipital bone at the base of the skull"
        ],
        "explain": "Axons forming cranial nerve I pass through the sieve-like perforations of the ethmoid cribriform plate into the anterior cranial fossa.",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "reading_comp"
      },
      {
        "level": "Understand",
        "q": "What crucial physical step must occur before an odor molecule can bind to an olfactory receptor?",
        "options": [
          "It must dissolve into the watery mucus layer coating the epithelium",
          "It must be frozen by cold air",
          "It must be reflected off the cornea",
          "It must be converted into mechanical sound vibrations"
        ],
        "explain": "Olfactory receptors are chemoreceptors; they can only interact with odorants once the molecules dissolve in the aqueous mucous solvent.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "use_of_english"
      },
      {
        "level": "Understand",
        "q": "Why are olfactory sensations frequently tied to vivid emotional memories?",
        "options": [
          "Olfactory tracts connect directly into the amygdala and hippocampus of the limbic system",
          "The olfactory nerve is the largest motor nerve in the spinal cord",
          "Smell signals are stored inside red blood cells",
          "The nose contains specialized vision receptors"
        ],
        "explain": "The olfactory bulb projects direct axonal pathways into the limbic system (amygdala and hippocampus), the core brain centers for emotion and memory.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "ngss_bio"
      },
      {
        "level": "Apply",
        "q": "A student with a severe head cold and congested sinuses complains that their chicken soup 'has lost all its taste.' What is the actual scientific explanation?",
        "options": [
          "Swelling and excess mucus block odor molecules from reaching the olfactory cleft, eliminating retronasal flavor",
          "The cold virus has permanently killed their tongue taste buds",
          "The soup has stopped emitting molecules due to room temperature",
          "The auditory nerve is dampened by earwax"
        ],
        "explain": "What we perceive as 'flavor' is roughly 80% retronasal olfaction. When congested nasal passages block odorants from ascending to olfactory receptors, food seems bland.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "reading_comp"
      },
      {
        "level": "Apply",
        "q": "A cyclist suffers a skull fracture at the base of the forehead and permanently loses all sense of smell (anosmia). Which structure was most likely severed?",
        "options": [
          "The olfactory nerve fibers passing through the fractured cribriform plate",
          "The optic chiasm behind the eyes",
          "The tympanic membrane in the middle ear",
          "The hypodermis of the cheeks"
        ],
        "explain": "Fractures of the ethmoid cribriform plate shear off the fragile, non-myelinated olfactory nerve fibers entering the olfactory bulb.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "use_of_english"
      },
      {
        "level": "Analyze",
        "q": "Compare chemical transduction in smell with mechanotransduction in hearing. What fundamental difference distinguishes their receptor mechanisms?",
        "options": [
          "Smell uses molecular chemical docking with G-protein coupled receptors; hearing uses physical displacement of hair cell stereocilia to open ion channels",
          "Smell uses light photons; hearing uses airborne gases",
          "Hearing requires chemical dissolution in mucus; smell requires middle-ear ossicle levers",
          "There is no difference; both senses utilize identical photoreceptors"
        ],
        "explain": "Olfaction is chemosensory (ligand-receptor binding triggering biochemical second-messenger cascades); audition is mechanosensory (physical shearing force directly gating ion channels).",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "ngss_bio"
      },
      {
        "level": "Evaluate",
        "q": "Evaluate this statement: 'Humans have a primitive, insignificant sense of smell compared to dogs, so olfaction is practically useless for human survival.' Why is this conclusion false?",
        "options": [
          "Human olfaction can distinguish over one trillion odorant profiles, detects spoiled food and toxic airborne gases, and shapes nutritional intake and social bonding",
          "Humans actually have ten times more olfactory receptor genes than canines",
          "Humans use smell to locate objects ten miles away in the dark",
          "Smell is the only sense responsible for balancing human body posture"
        ],
        "explain": "While dogs have greater sensitivity, human olfaction is remarkably sophisticated (distinguishing up to a trillion scent profiles) and serves critical protective functions (detecting smoke, gas leaks, spoiled toxins) and nutritional health.",
        "cefr": "B1.2",
        "difficulty": 4,
        "skill": "reading_comp"
      }
    ],
    "biophysics": {
      "ionChannel": "Olfactory G-protein (Golf) → Adenylyl Cyclase III → cAMP-gated CNG channels + Ca²⁺-activated Cl⁻ channels",
      "ionChannelEs": "Cascada GPCR Golf → AMPc → Canales CNG y canales de Cl⁻ activados por Ca²⁺",
      "receptorPotential": "Depolarization Amplified by Cl⁻ Efflux: Odorant binding elevates cAMP, opening CNG channels (Na⁺/Ca²⁺ influx). Ca²⁺ then opens Cl⁻ channels, letting negatively charged Cl⁻ exit to boost depolarization above -55 mV.",
      "receptorPotentialEs": "Despolarización amplificada: Entrada de Ca²⁺ abre canales de Cl⁻ que intensifican la señal eléctrica.",
      "adaptation": "Phasic Olfactory Fatigue (~2–5 min): Ca²⁺-calmodulin binds CNG channels to reduce their cAMP affinity, explaining why a strong room scent vanishes quickly.",
      "adaptationEs": "Adaptación fásica rápida (fatiga olfativa) por retroalimentación Ca²⁺-calmodulina.",
      "thalamicRelay": "Direct Olfactory Bypass: Axons project straight from Olfactory Bulb to Piriform Cortex & Amygdala (Limbic System), bypassing initial thalamic gating.",
      "thalamicRelayEs": "Vía directa sin relevo talámico inicial → Corteza Piriforme y Amígdala (Sistema Límbico)"
    }
  },
  {
    "id": "taste",
    "name": "Taste",
    "es": "Gusto",
    "organ": "The Tongue",
    "organEs": "La lengua",
    "cortex": "Gustatory Cortex (Insula / Frontal Operculum)",
    "cortexEs": "Corteza gustativa (Ínsula / Operculum frontal)",
    "receptorClassification": "Chemoreceptors (Gustatory Receptor Cells)",
    "receptorClassificationEs": "Quimiorreceptores (Células receptoras gustativas)",
    "transduction": "Dissolved chemical tastants enter taste pores; salty and sour ions directly depolarize cells, while sweet, bitter, and umami molecules bind to G-protein coupled receptors, releasing neurotransmitters.",
    "transductionEs": "Sustancias químicas disueltas entran por poros gustativos; iones salados y ácidos despolarizan directamente, mientras dulce, amargo y umami activan receptores GPCR.",
    "wordFamily": "taste (verb/noun) → flavor (integration with smell) → gustatory (anatomical) → gustation (sensory process) → chemoreceptor (cellular)",
    "objectives": [
      "I can locate and describe the relationship between the tongue, papillae, taste buds, and gustatory cells.",
      "I can name and describe the 5 distinct basic tastes (sweet, sour, salty, bitter, umami) and debunk the tongue map myth.",
      "I can explain chemical transduction of tastants dissolved in saliva.",
      "I can differentiate between simple taste (tongue) and multisensory flavor (taste + smell + texture + temperature)."
    ],
    "warmup": {
      "q": "Think of biting into a crisp green apple versus a slice of aged cheddar cheese. How do your saliva and sensations respond?",
      "qEs": "Piensa en morder una manzana verde ácida versus un trozo de queso maduro. ¿Cómo responden tu saliva y tus sensaciones?",
      "task": "Look at your tongue closely in a hand mirror. Can you see the tiny pink bumps across the surface?",
      "taskEs": "Mira tu lengua de cerca en un espejo de mano. ¿Puedes ver los pequeños bultos rosados en la superficie?"
    },
    "words": [
      {
        "id": "tongue",
        "en": "tongue",
        "es": "lengua",
        "ipa": "/tʌŋ/",
        "def": "The muscular hydrostat organ in the oral cavity equipped with specialized papillae that facilitates mastication, deglutition, speech, and gustation.",
        "ex": "The dorsal surface of the tongue is covered in thousands of microscopic sensory structures.",
        "note": "⚠️ Polysemy: 'mother tongue' means native language.",
        "spot": true,
        "syllables": "TUNG",
        "pronTipEs": "⚠️ Terminación '-gue' es muda. Suena como 'tang'.",
        "mnemonic": "Tongue = Músculo con 8 músculos entrelazados."
      },
      {
        "id": "papillae",
        "en": "papillae",
        "es": "papilas linguales",
        "ipa": "/pəˈpɪl.iː/",
        "def": "The visible small epithelial projections on the tongue surface (fungiform, foliate, and circumvallate) that house taste buds.",
        "ex": "Fungiform papillae look like tiny mushrooms on the tip and edges of the tongue.",
        "note": "💡 Singular: papilla. Plural: papillae.",
        "spot": true,
        "syllables": "puh-PIL-ee",
        "pronTipEs": "⚠️ Plural latino: '-ae' final suena /iː/ larga, y requiere verbo plural!",
        "mnemonic": "Papillae = Pequeños relieves visibles (no son los botones microscópicos)."
      },
      {
        "id": "tastebuds",
        "en": "taste buds",
        "es": "botones gustativos",
        "ipa": "/teɪst bʌdz/",
        "def": "Barrel-shaped clusters of 50 to 150 spindle-shaped neuroepithelial cells embedded within the walls of lingual papillae.",
        "ex": "We possess approximately 5,000 to 10,000 taste buds throughout our mouth and throat.",
        "note": "⚠️ Clinical precision: a taste bud is inside a papilla (they are not identical).",
        "spot": true,
        "syllables": "TAYST BUDZ",
        "pronTipEs": "Vocal /eɪ/ en 'taste'.",
        "mnemonic": "Taste buds = Capullos microscópicos ocultos dentro de las papilas."
      },
      {
        "id": "tastecells",
        "en": "gustatory receptor cells",
        "es": "células receptoras gustativas",
        "ipa": "/ˈɡʌs.tə.tɔːr.i selz/",
        "def": "Specialized chemoreceptive epithelial cells equipped with microvilli extending into the taste pore that detect tastants.",
        "ex": "Gustatory cells have a rapid turnover rate, regenerating from basal stem cells every 10 to 14 days.",
        "spot": true,
        "syllables": "TAYST SELZ",
        "pronTipEs": "Son quimiorreceptores renovables cada 10–14 días.",
        "mnemonic": "5 Sabores: Sweet, Salty, Sour, Bitter, Umami."
      },
      {
        "id": "tastenerve",
        "en": "gustatory cranial nerves (CN VII, IX, X)",
        "es": "nervios craneales gustativos",
        "ipa": "/ˈɡʌs.tə.tɔːr.i nɜːrvz/",
        "def": "The three cranial nerves that transmit taste signals: Facial (CN VII, anterior 2/3), Glossopharyngeal (CN IX, posterior 1/3), and Vagus (CN X, epiglottis/throat).",
        "ex": "Taste impulses travel through the facial and glossopharyngeal nerves to the solitary nucleus.",
        "note": "💡 Neuroanatomy: Three distinct cranial nerves convey taste impulses!",
        "spot": true,
        "syllables": "GUSTATORY CRANIAL NERVES (CN VII, IX, X)"
      },
      {
        "id": "saliva",
        "en": "saliva",
        "es": "saliva",
        "ipa": "/səˈlaɪ.və/",
        "def": "The enzyme-rich watery fluid secreted by salivary glands that dissolves chemical food compounds so they can enter taste pores.",
        "ex": "Without saliva, food molecules cannot dissolve to reach gustatory microvilli.",
        "note": "✅ Identical word in Spanish.",
        "syllables": "SALIVA"
      },
      {
        "id": "flavor",
        "en": "flavor (multisensory)",
        "es": "sabor (gusto + olfato retronasal)",
        "ipa": "/ˈfleɪ.vər/",
        "def": "The complex multisensory cognitive perception synthesized in the brain combining basic taste, retronasal olfaction, temperature, and trigeminal texture.",
        "ex": "Vanilla ice cream has a sweet taste, but its rich vanilla flavor requires smell.",
        "note": "⚠️ Critical distinction: Taste = tongue only. Flavor = taste + smell + texture.",
        "syllables": "FLAVOR (MULTISENSORY)"
      },
      {
        "id": "umami",
        "en": "umami (savory)",
        "es": "umami (sabroso / glutamato)",
        "ipa": "/uːˈmɑː.mi/",
        "def": "The fifth basic taste recognized by science, triggered by L-glutamate amino acids found in aged cheeses, meats, mushrooms, and tomatoes.",
        "ex": "Parmesan cheese and bone broth contain high concentrations of natural umami compounds.",
        "note": "💡 Loanword from Japanese meaning 'pleasant savory taste'.",
        "syllables": "oo-MAH-mee",
        "pronTipEs": "Palabra japonesa: acento en la sílaba central '-MA-'.",
        "mnemonic": "Umami = Sabroso / Glutamato (tomate, queso, carne)."
      }
    ],
    "path": [
      "saliva",
      "papillae",
      "tastebuds",
      "tastecells",
      "tastenerve",
      "gustatorycortex"
    ],
    "pathLabels": {
      "saliva": "1. Food tastants dissolve in saliva (Disolución química)",
      "papillae": "2. Lingual papillae (Superficie lingual)",
      "tastebuds": "3. Taste buds & Taste pores (Entrada al botón)",
      "tastecells": "4. Gustatory receptor cells (Transducción química)",
      "tastenerve": "5. Cranial Nerves: CN VII, IX, X (Conducción sensorial)",
      "gustatorycortex": "6. Gustatory Cortex (Ínsula / Lóbulo frontal)"
    },
    "reading": {
      "title": "The Path of Taste & Gustatory Transduction",
      "paragraphs": [
        "Gustation (taste) is an essential chemical sensory system that evaluates the nutritional value and potential toxicity of ingested food. Every taste sensation begins when solid or liquid food interacts with the digestive secretions in your oral cavity.",
        "First, chemical compounds (tastants) from food must dissolve in [[saliva|saliva]]. If you dry your tongue thoroughly with a clean tissue and place a dry cube of sugar on it, you will experience virtually no sweetness until salivary glands release moisture. Only liquid-dissolved chemicals can flow into microscopic openings called taste pores.",
        "Next, dissolved tastants wash over the lingual [[papillae|papillae]]—the visible macroscopic bumps lining your [[tongue|tongue]]. While common filiform papillae provide mechanical friction and texture sensation, fungiform, foliate, and circumvallate papillae contain microscopic barrel-shaped [[tastebuds|taste buds]] embedded along their lateral crevices.",
        "Inside each taste bud, 50 to 150 specialized [[tastecells|gustatory receptor cells]] extend delicate hair-like microvilli out through the taste pore. These cells perform sensory transduction across five scientifically verified basic tastes: sweet (indicating caloric carbohydrates), salty (sodium balance), sour (acids/fermentation), bitter (protective defense against toxic alkaloids), and [[umami|umami]] (amino acids and proteins). Salty (Na⁺) and sour (H⁺) ions directly pass through membrane channels, whereas sweet, bitter, and umami molecules bind to G-protein coupled receptors. Both mechanisms trigger calcium influx and neurotransmitter release.",
        "Contrary to an outdated mid-twentieth-century myth, there is no geographical 'tongue map.' All areas of the tongue equipped with taste buds can detect all five basic tastes with comparable sensitivity.",
        "Finally, depolarizations excite sensory nerve endings. Three distinct [[tastenerve|gustatory cranial nerves]] convey the impulses: the Facial nerve (CN VII) innervates the anterior two-thirds of the tongue, the Glossopharyngeal nerve (CN IX) innervates the posterior third, and the Vagus nerve (CN X) covers the epiglottis. These nerves synapse in the brainstem's nucleus tractus solitarius before ascending through the thalamus to the primary [[gustatorycortex|gustatory cortex]] located within the insular lobe. Here, the brain combines pure taste with retronasal smell and trigeminal texture to synthesize holistic [[flavor|flavor]]."
      ],
      "checks": [
        {
          "after": 1,
          "q": "Why is saliva essential for tasting food?",
          "options": [
            "Taste receptor cells can only detect chemical compounds dissolved in an aqueous solution",
            "Saliva produces light waves that illuminate the tongue",
            "Saliva carries food directly to the occipital lobe",
            "Saliva shrinks the papillae so food can slide into the esophagus"
          ],
          "explain": "Gustatory cells are chemoreceptors; their sensory microvilli can only interact with tastants that are dissolved in liquid saliva."
        },
        {
          "after": 4,
          "q": "What does modern neuroscience confirm about the classic 'tongue map' taught in older textbooks?",
          "options": [
            "It is an anatomical myth: all five basic tastes can be detected across all regions of the tongue containing taste buds",
            "It is completely accurate: sweetness is only detected at the tip",
            "Bitterness is detected exclusively by the ear canal",
            "Umami can only be tasted on the lower lip"
          ],
          "explain": "The 'tongue map' is a misconception based on misinterpretation of 1901 research. Receptors for all five basic tastes are distributed across the entire tongue."
        }
      ],
      "a2Summary": "Saliva in your mouth dissolves food chemicals so they can enter tiny pores in the taste buds hidden inside tongue papillae. Specialized taste cells detect five basic flavors: sweet, sour, salty, bitter, and umami. After converting chemical tastes into electrical signals, three cranial nerves (CN VII, IX, and X) send messages to the gustatory cortex in the brain. Your sense of smell also blends with taste to create rich flavor.",
      "collocations": [
        "dissolve tastant molecules",
        "detect five primary modalities",
        "trigger neurotransmitter release",
        "combine retronasal aromas",
        "distinguish nutrients from toxins"
      ]
    },
    "funfact": "Did you know that 'spicy' is not a basic taste? Spicy foods contain chemical capsaicin, which does not stimulate taste cells at all. Instead, it activates thermal and pain receptors (nociceptors) on the trigeminal nerve, tricking your brain into feeling actual physical heat and pain!",
    "health": {
      "problems": [
        {
          "name": "Ageusia & Dysgeusia",
          "text": "Ageusia is the total loss of taste sensation (rare); dysgeusia is a persistent metallic, salty, or rancid taste distortion in the mouth frequently linked to medication side-effects, nutritional zinc deficiency, or radiation therapy."
        },
        {
          "name": "Thermal Tongue Burn",
          "text": "Scalding liquids or foods can destroy superficial gustatory receptor cells. Because gustatory cells regenerate from basal cells every 10 to 14 days, normal taste acuity typically recovers within two weeks."
        },
        {
          "name": "Glossitis",
          "text": "Inflammation of the tongue causing swelling, redness, and smoothing of papillae, often triggered by vitamin B12 deficiency or allergic reactions."
        }
      ],
      "care": [
        "Brush your teeth twice daily and use a soft tongue scraper to remove food debris and bacterial film from between papillae.",
        "Drink adequate water daily to maintain salivary gland output, as saliva contains bicarbonate buffers and enzymes vital for oral health.",
        "Avoid smoking and tobacco products, which chronically constrict lingual blood vessels and flatten taste bud microvilli."
      ]
    },
    "deeper": [
      {
        "name": "The Four Types of Papillae",
        "es": "los cuatro tipos de papilas",
        "text": "Fungiform (mushroom-shaped, anterior), Foliate (folds on lateral edges), Circumvallate (large V-shaped row at back), and Filiform (abundant cone-shaped, tactile only without taste buds)."
      },
      {
        "name": "Capsaicin and the Trigeminal Nerve (CN V)",
        "es": "capsaicina y nervio trigémino",
        "text": "Capsaicin in chili peppers binds to TRPV1 heat receptors on sensory trigeminal fibers, firing signals identical to temperatures exceeding 43°C (109°F)."
      },
      {
        "name": "Super-tasters",
        "es": "supergustadores",
        "text": "Approximately 25% of the population have a genetically higher density of fungiform papillae and taste buds, experiencing tastes (especially bitterness in coffee and broccoli) with intense sensitivity."
      },
      {
        "name": "Miraculin Protein",
        "es": "proteína miraculina",
        "text": "A glycoprotein from the miracle fruit that binds to sweet receptors; under acidic conditions (like lemon juice), it changes shape and triggers intense sweetness instead of sourness."
      }
    ],
    "match": [
      [
        "saliva",
        "Aqueous solvent that dissolves chemical food tastants"
      ],
      [
        "papillae",
        "Visible epithelial bumps housing microscopic taste buds"
      ],
      [
        "tastebuds",
        "Barrel-shaped clusters of 50-150 sensory receptor cells"
      ],
      [
        "tastenerve",
        "Cranial nerves VII, IX, and X carrying signals to the brainstem"
      ],
      [
        "flavor",
        "Multisensory synthesis of taste, retronasal smell, and texture"
      ]
    ],
    "cloze": {
      "text": "Chemical food molecules dissolve in {saliva} and enter taste pores on lingual {papillae}. Spindle-shaped {taste cells} inside microscopic {taste buds} detect five basic tastes: sweet, sour, salty, bitter, and {umami}. Sensory signals travel along {taste nerves} to the gustatory cortex, where taste combines with smell to produce {flavor}.",
      "extra": [
        "eardrum",
        "rods and cones",
        "cornea"
      ]
    },
    "experiment": {
      "title": "The Nose-Pinch Sensory Isolation Test (Taste vs. Flavor)",
      "type": "tasteisolate",
      "predict": {
        "q": "When you pinch your nostrils tightly shut and chew a fruit-flavored jellybean or candy, what will you perceive?",
        "qEs": "Cuando te tapas la nariz firmemente y masticas un caramelo de fruta, ¿qué percibirás?",
        "options": [
          "You will perceive basic sweetness or sourness, but cannot identify the specific fruit flavor until you unpinch your nose",
          "You will immediately identify whether the candy is strawberry, lemon, or grape",
          "The candy will taste entirely like salty ocean water",
          "You will experience total numbness across your entire mouth and lips"
        ],
        "explain": "The tongue alone can only register basic tastes (sweet, sour). Complex fruit flavors require volatile aroma molecules to travel retronasally to olfactory receptors."
      },
      "materials": [
        "Fruit-flavored jellybeans, Skittles, or gummy candies with identical textures but different flavors",
        "Clean drinking water"
      ],
      "steps": [
        "Take a sip of water to cleanse your palate.",
        "Firmly pinch your nostrils tightly closed with your thumb and forefinger so no airflow enters your nose.",
        "Have a partner hand you a mystery fruit candy without telling you the color or flavor. Close your eyes.",
        "Chew the candy thoroughly for 10 seconds with your nose remaining TIGHTLY pinched. Concentrate on what you feel.",
        "Notice you only perceive plain sweetness and mild tartness. Now, suddenly release your nostrils and breathe out normally through your nose!"
      ],
      "observe": {
        "prompt": "Describe what happened the exact moment you released your nostrils: What fruit flavor appeared, and why could you not identify it while your nose was pinched?",
        "promptEs": "Describe qué ocurrió en el momento exacto en que soltaste la nariz: ¿Qué sabor frutal apareció y por qué no pudiste identificarlo mientras tenías la nariz tapada?",
        "type": "notes",
        "label": "Sensory transition observations"
      },
      "explain": "This classic experiment proves the fundamental difference between taste and flavor. Your tongue's gustatory cells only registered pure sweetness and acidity. The distinct character of 'strawberry', 'lime', or 'grape' is an olfactory sensation created when chewing forces volatile aromas up through the pharynx into the nasal cavity (retronasal olfaction). Releasing your nose allowed air to carry these molecules to your olfactory epithelium, demonstrating that 80% of what we call 'taste' is actually smell!"
    },
    "frames": [
      "The tongue is covered in papillae, which house microscopic ___.",
      "Before a tastant can be detected, it must dissolve in ___ and enter the ___.",
      "The five scientifically recognized basic tastes are ___.",
      "The tongue map is a myth because all areas with taste buds can ___.",
      "Taste is different from flavor because flavor combines ___."
    ],
    "writing": {
      "prompt": "Explain how you experience the flavor of a slice of warm pepperoni pizza. Distinguish between what your tongue detects and what your olfactory and trigeminal systems detect.",
      "promptEs": "Explica cómo experimentas el sabor de una porción de pizza caliente. Distingue entre lo que detecta tu lengua y lo que detectan tus sistemas olfativo y trigeminal.",
      "bank": [
        "saliva",
        "papillae",
        "taste buds",
        "gustatory cells",
        "umami",
        "salty",
        "taste nerves",
        "retronasal smell",
        "flavor",
        "gustatory cortex"
      ],
      "verbs": [
        "dissolves",
        "enters",
        "depolarizes",
        "transduces",
        "transmits",
        "synthesizes",
        "integrates"
      ],
      "connectors": [
        "First",
        "Simultaneously",
        "Next",
        "Consequently",
        "Finally"
      ],
      "model": "First, as you chew the warm pizza, saliva dissolves the chemical tastants in the sauce and cheese. Next, the dissolved molecules enter the taste pores of microscopic taste buds on lingual papillae. Spindle-shaped gustatory cells perform sensory transduction: sodium ions stimulate salty receptors, while glutamates in the tomatoes and cheese activate umami receptors. Simultaneously, warm volatile aromas travel retronasally up the pharynx into the nasal cavity, stimulating olfactory receptors. Finally, three cranial nerves transmit taste signals to the gustatory cortex, where the brain integrates basic taste, retronasal smell, and melted cheese texture into the rich, unified flavor of pepperoni pizza.",
      "verbStems": [
        "dissolve",
        "diffuse",
        "bind",
        "trigger",
        "transduce",
        "convey",
        "integrate",
        "distinguish"
      ],
      "sequenceOrder": [
        "saliva",
        "papillae",
        "taste buds",
        "taste cells",
        "cranial",
        "gustatory cortex"
      ],
      "b1ChallengeFrame": "Contrast primary taste reception with retronasal olfaction using 'whereas' or 'while' to explain flavor."
    },
    "quiz": [
      {
        "level": "Remember",
        "q": "Where are taste buds located on the tongue?",
        "options": [
          "Embedded within the epithelial walls of lingual papillae",
          "Floating freely inside saliva glands",
          "Directly attached to the teeth enamel",
          "Only along the exact center line of the tongue"
        ],
        "explain": "Taste buds are microscopic structures housed within the epithelial folds of fungiform, foliate, and circumvallate papillae.",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "ngss_bio"
      },
      {
        "level": "Remember",
        "q": "Which of the following is scientifically recognized as one of the five basic tastes?",
        "options": [
          "Umami",
          "Spicy",
          "Minty",
          "Crunchy"
        ],
        "explain": "The five scientifically established basic tastes are sweet, sour, salty, bitter, and umami. Spicy is a trigeminal pain/heat sensation.",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "reading_comp"
      },
      {
        "level": "Understand",
        "q": "What is the critical scientific distinction between 'taste' and 'flavor'?",
        "options": [
          "Taste is chemical detection by the tongue alone; flavor is a multisensory synthesis of taste, retronasal smell, temperature, and texture",
          "Taste and flavor are completely identical synonyms in biology",
          "Taste requires the eyes; flavor only requires the ears",
          "Taste comes from the stomach; flavor comes from the teeth"
        ],
        "explain": "Taste refers strictly to the five basic gustatory qualities detected by tongue receptors; flavor is the brain's holistic integration of taste plus smell, texture, and temperature.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "use_of_english"
      },
      {
        "level": "Understand",
        "q": "Why is the historical 'tongue map' diagram considered false by modern sensory neurobiologists?",
        "options": [
          "All regions of the tongue containing taste buds can detect all five basic tastes",
          "The tongue only detects bitter; all other tastes are imaginary",
          "Taste buds migrate to different positions every month",
          "Only the back of the throat can detect sugar"
        ],
        "explain": "Modern electrophysiological recordings prove that taste buds across the entire tongue possess receptors for all five basic taste modalities.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "ngss_bio"
      },
      {
        "level": "Apply",
        "q": "A chef tastes a hot chicken broth and notes it lacks savory richness. What ingredient should they add to stimulate umami chemoreceptors?",
        "options": [
          "Ingredients rich in L-glutamate such as aged Parmesan cheese, soy sauce, or mushrooms",
          "Pure white cane sugar",
          "Distilled white vinegar",
          "Cold ice cubes"
        ],
        "explain": "Umami is triggered by glutamate amino acids and ribonucleotides found abundantly in aged cheeses, cured meats, mushrooms, and soy sauce.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "reading_comp"
      },
      {
        "level": "Apply",
        "q": "A child accidentally burns the tip of their tongue on boiling hot cocoa. Why will their taste sensation fully recover in about two weeks?",
        "options": [
          "Gustatory receptor cells regenerate continuously from basal stem cells every 10 to 14 days",
          "The tongue grows an entirely new muscular layer each week",
          "The brain invents taste sensations without needing tongue cells",
          "Saliva turns into new taste buds when exposed to burns"
        ],
        "explain": "Gustatory cells have one of the highest turnover rates in the human body, naturally renewing every 10 to 14 days.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "use_of_english"
      },
      {
        "level": "Analyze",
        "q": "A patient sustains damage to the Facial nerve (CN VII) during surgery. Which gustatory deficit will clinical tests reveal?",
        "options": [
          "Loss of taste sensation on the anterior two-thirds of the tongue, while posterior taste remains intact via CN IX",
          "Total loss of all hearing in both ears",
          "Inability to detect sweetness anywhere in the universe",
          "Loss of speech and total paralysis of the diaphragm"
        ],
        "explain": "The facial nerve (chorda tympani branch) innervates the anterior two-thirds of the tongue; the posterior third is innervated independently by the glossopharyngeal nerve (CN IX).",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "ngss_bio"
      },
      {
        "level": "Evaluate",
        "q": "Why did mammals evolve a specialized gustatory receptor for extreme bitterness with over 25 distinct receptor protein subtypes, compared to only one type for sweetness?",
        "options": [
          "Bitter detection evolved as a vital defense mechanism against ingesting poisonous plant alkaloids and lethal toxins",
          "Bitter foods provide the highest amount of caloric energy for hunting",
          "Sweetness was harmful to primitive hominids",
          "Bitter receptors are also used as ears to detect predators"
        ],
        "explain": "Plants produce diverse toxic alkaloids to deter herbivores. A sensitive, multi-receptor bitter detection system provided an evolutionary survival advantage to prevent accidental lethal ingestion.",
        "cefr": "B1.2",
        "difficulty": 4,
        "skill": "reading_comp"
      }
    ],
    "biophysics": {
      "ionChannel": "ENaC (Salty Na⁺), OTOP1 proton channel (Sour H⁺), and T1R2+T1R3 / T1R1+T1R3 / T2R GPCRs → TRPM5 (Sweet, Umami, Bitter)",
      "ionChannelEs": "Canales ENaC (salado), OTOP1 (ácido) y receptores GPCR T1R/T2R acoplados a TRPM5",
      "receptorPotential": "Depolarization: Direct Na⁺ (ENaC) or H⁺ (OTOP1) entry depolarizes Type III cells, while sweet/umami/bitter GPCRs trigger PLCβ2 → IP₃ → Ca²⁺ release → TRPM5 opening and non-vesicular ATP release via CALHM1.",
      "receptorPotentialEs": "Despolarización directa por iones o cascada GPCR-TRPM5 con liberación de ATP/serotonina.",
      "adaptation": "Moderate Phasic Adaptation + Rapid Cell Turnover: Saliva washes away tastants while gustatory basal stem cells replace entire taste receptor cells every 10–14 days.",
      "adaptationEs": "Adaptación moderada y renovación celular completa de botones gustativos cada 10–14 días.",
      "thalamicRelay": "Solitary Tract Nucleus (Brainstem) → VPMpc Nucleus of the Thalamus → Primary Gustatory Cortex (Insula)",
      "thalamicRelayEs": "Núcleo del Tracto Solitario → Núcleo VPMpc del Tálamo → Corteza Gustativa (Ínsula)"
    }
  },
  {
    "id": "touch",
    "name": "Touch",
    "es": "Tacto",
    "organ": "The Skin (Integumentary System)",
    "organEs": "La piel (Sistema tegumentario)",
    "cortex": "Primary Somatosensory Cortex (Parietal Lobe)",
    "cortexEs": "Corteza somatosensorial primaria (Lóbulo parietal)",
    "receptorClassification": "Mechanoreceptors, Thermoreceptors & Nociceptors",
    "receptorClassificationEs": "Mecanirreceptores, Termorreceptores y Nociceptores",
    "transduction": "Mechanical pressure, skin deformation, or thermal gradients open mechanically-gated or temperature-sensitive ion channels on cutaneous nerve endings.",
    "transductionEs": "La presión mecánica, la deformación de la piel o el calor abren canales iónicos mecánicos o térmicos en terminaciones nerviosas cutáneas.",
    "wordFamily": "touch (verb/noun) → tactile (anatomical) → cutaneous (related to skin) → somatosensory (bodily sensory system) → mechanoreceptor (cellular)",
    "objectives": [
      "I can identify and differentiate the three primary layers of human skin (epidermis, dermis, hypodermis).",
      "I can classify cutaneous receptors into mechanoreceptors, thermoreceptors, and nociceptors.",
      "I can trace somatic sensory pathways from cutaneous receptors through spinal or cranial nerves to the somatosensory cortex.",
      "I can measure two-point tactile discrimination thresholds and explain cortical representation (sensory homunculus)."
    ],
    "warmup": {
      "q": "Touch three different surfaces near you: your wooden desk, a metal zipper, and your fabric sweater. How does your skin instantly differentiate their textures and temperatures?",
      "qEs": "Toca tres superficies: tu escritorio de madera, una cremallera de metal y tu suéter de tela. ¿Cómo diferencia tu piel sus texturas y temperaturas?",
      "task": "Lightly glide the back of your hand over your forearm without pressing down. Can you feel the movement of individual fine hairs?",
      "taskEs": "Pasa suavemente el dorso de tu mano por tu antebrazo sin presionar. ¿Sientes el movimiento de los vellos individuales?"
    },
    "words": [
      {
        "id": "epidermis",
        "en": "epidermis",
        "es": "epidermis",
        "ipa": "/ˌep.ɪˈdɜːr.mɪs/",
        "def": "The keratinized outer protective epithelial layer of the skin that provides a waterproof barrier and houses free nerve endings and Merkel discs.",
        "ex": "Dead keratinized cells continually slough off the surface of the epidermis.",
        "note": "💡 Greek prefix: epi- = upon/outer + dermis = skin.",
        "spot": true,
        "syllables": "ep-ih-DUR-miss",
        "pronTipEs": "Acento en '-DUR-'.",
        "mnemonic": "Epi- = Encima (escudo impermeable externo)."
      },
      {
        "id": "dermis",
        "en": "dermis",
        "es": "dermis",
        "ipa": "/ˈdɜːr.mɪs/",
        "def": "The dense vascular middle connective tissue layer housing most cutaneous receptors, blood vessels, sweat glands, and hair follicles.",
        "ex": "Tactile corpuscles (Meissner's and Pacinian) reside within the rich dermal layer.",
        "note": "✅ Identical in Spanish.",
        "spot": true,
        "syllables": "DUR-miss",
        "pronTipEs": "Vocal central /ɜːr/ en 'dur-'.",
        "mnemonic": "Dermis = Densa capa media viva con receptores y vasos."
      },
      {
        "id": "hypodermis",
        "en": "hypodermis (subcutaneous tissue)",
        "es": "hipodermis",
        "ipa": "/ˌhaɪ.poʊˈdɜːr.mɪs/",
        "def": "The deepest subcutaneous adipose (fat) layer that stores energy, insulates thermal core temperature, and anchors skin to muscle and bone.",
        "ex": "The hypodermis cushions internal organs against traumatic mechanical impacts.",
        "note": "💡 Greek prefix: hypo- = below/under.",
        "spot": true,
        "syllables": "hy-poh-DUR-miss",
        "pronTipEs": "Prefijo 'hypo-' (/haɪ-/) significa debajo.",
        "mnemonic": "Hypo- = Debajo (almohada de grasa subcutánea aislante)."
      },
      {
        "id": "receptor",
        "en": "somatosensory receptors",
        "es": "receptores somatosensoriales",
        "ipa": "/ˈsen.sər.i rɪˈsep.tər/",
        "def": "Specialized neural sensory end-organs (Meissner, Pacinian, Merkel, Ruffini, and free nerve endings) that detect mechanical force, temperature, or pain.",
        "ex": "Pacinian corpuscles detect rapid high-frequency vibrations and deep transient pressure.",
        "note": "⚠️ 'Sensitive' = sensible (capable of feeling); 'sensible' = sensato (prudent).",
        "spot": true,
        "syllables": "SOMATOSENSORY RECEPTORS"
      },
      {
        "id": "nerve",
        "en": "sensory nerves",
        "es": "nervios sensoriales (somáticos)",
        "ipa": "/nɜːrv/",
        "def": "Bundles of afferent axon fibers that transmit electrical action potentials from cutaneous receptors into the spinal cord or brainstem.",
        "ex": "Sensory nerves from the hand bundle together into the median, radial, and ulnar nerves.",
        "note": "⚠️ False friend: 'nervous' = nervioso (emotional agitation).",
        "spot": true,
        "syllables": "SENSORY NERVES"
      },
      {
        "id": "spinalcord",
        "en": "spinal cord",
        "es": "médula espinal",
        "ipa": "/ˈspaɪ.nəl kɔːrd/",
        "def": "The thick cylindrical bundle of nervous tissue inside the vertebral column that conveys sensory information between body and brain.",
        "ex": "Touch signals from the legs ascend through the posterior dorsal columns of the spinal cord.",
        "note": "⚠️ Precision: spinal cord = médula espinal (bone marrow is médula ósea).",
        "spot": true,
        "syllables": "SPY-nul KORD",
        "pronTipEs": "⚠️ Inicia directo con /s/ líquida ('ssspinal'), SIN añadir 'e-' inicial.",
        "mnemonic": "Spinal cord = Autopista neural de reflejos y tacto corporal."
      },
      {
        "id": "pressure",
        "en": "mechanical pressure & vibration",
        "es": "presión mecánica y vibración",
        "ipa": "/ˈpreʃ.ər/",
        "def": "Physical force per unit area exerted against the skin surface that deforms cellular membranes.",
        "ex": "Gentle tactile pressure stimulates Meissner corpuscles, while heavy weight engages deep Pacinian corpuscles.",
        "note": "✅ Cognate: pressure = presión.",
        "syllables": "MECHANICAL PRESSURE & VIBRATION"
      },
      {
        "id": "somatosensorycortex",
        "en": "somatosensory cortex",
        "es": "corteza somatosensorial",
        "ipa": "/soʊˌmæt.oʊˈsen.sər.i ˈkɔːr.teks/",
        "def": "The region in the postcentral gyrus of the parietal lobe that contains a topographical sensory map (homunculus) of the human body.",
        "ex": "Because our fingertips and lips contain dense receptor fields, they occupy disproportionately large areas of the somatosensory cortex.",
        "note": "💡 Greek: soma = body + sensory.",
        "syllables": "soh-MAT-oh-SEN-sor-ee",
        "pronTipEs": "Acento secundario en MAT, primario en SEN.",
        "mnemonic": "Homúnculo = Mapa cortical gigante de manos, labios y lengua."
      }
    ],
    "path": [
      "pressure",
      "receptor",
      "nerve",
      "spinalcord",
      "somatosensorycortex"
    ],
    "pathLabels": {
      "pressure": "1. Mechanical, thermal, or pain stimulus (Estímulo cutáneo)",
      "receptor": "2. Cutaneous receptors (Transducción en dermis/epidermis)",
      "nerve": "3. Somatic sensory nerve (Conducción aferente)",
      "spinalcord": "4. Spinal cord / Trigeminal pathway (Médula espinal / Tronco encefálico)",
      "somatosensorycortex": "5. Somatosensory Cortex (Percepción en lóbulo parietal)"
    },
    "reading": {
      "title": "The Path of Touch & Somatosensory Processing",
      "paragraphs": [
        "Your skin (the integumentary system) is the largest sensory organ of the human body, weighing approximately four kilograms in an average adult. Unlike the localized eyes or ears, touch is a distributed general sense that provides continuous tactile, thermal, and protective feedback across your entire body surface.",
        "The skin is anatomically organized into three distinct histological layers. The outermost layer is the [[epidermis|epidermis]], a waterproof stratified barrier of keratinocytes that continuously sheds dead cells. Beneath it lies the vascular [[dermis|dermis]], a dense connective tissue bed containing the vast majority of [[receptor|somatosensory receptors]], capillary networks, hair follicles, and sweat glands. Finally, the deepest layer is the [[hypodermis|hypodermis]] (subcutaneous tissue), composed largely of adipose fat cells that provide thermal insulation and mechanical shock absorption.",
        "Scattered throughout the skin are diverse specialized receptor types. Mechanoreceptors detect physical deformation: Meissner's corpuscles detect light touch and low-frequency flutter; Merkel's discs register steady tactile pressure and fine texture; Pacinian corpuscles respond to high-frequency vibration and deep transient pressure; and Ruffini endings detect continuous skin stretch. Meanwhile, free nerve endings throughout the epidermis and dermis act as thermoreceptors (detecting warm and cold thermal gradients) and nociceptors (detecting tissue damage and burning pain). When skin is physically deformed, mechanically-gated ion channels open, executing sensory transduction into electrical impulses.",
        "Next, these electrical signals travel along afferent somatic [[nerve|sensory nerves]]. Signals originating from the trunk, arms, and legs enter the dorsal horn of the [[spinalcord|spinal cord]]. Touch and proprioceptive signals ascend through the posterior dorsal columns directly to the brainstem, while pain and temperature signals cross the spinal cord and ascend via the spinothalamic tract. Notably, sensory signals from the face, forehead, and lips do not pass through the spinal cord; they travel directly to the brainstem via the large Trigeminal nerve (cranial nerve V).",
        "Finally, after relaying through the sensory thalamus, impulses arrive at the primary [[somatosensorycortex|somatosensory cortex]] located along the postcentral gyrus of the parietal lobe. The cortex contains an orderly somatotopic map of the body known as the sensory homunculus. Because sensitive anatomical regions like your fingertips, tongue, and lips have thousands of small, dense receptive fields, they occupy enormous areas of cortical brain space compared to your back or thighs."
      ],
      "checks": [
        {
          "after": 1,
          "q": "Which layer of the skin contains the greatest density of mechanoreceptors, blood vessels, and sweat glands?",
          "options": [
            "The dermis (middle layer)",
            "The stratum corneum of the epidermis",
            "The subcutaneous hypodermis",
            "The fingernail bed"
          ],
          "explain": "Most specialized mechanoreceptors, capillaries, and dermal papillae reside within the dermis."
        },
        {
          "after": 3,
          "q": "Why do touch signals originating from the face and lips follow a different pathway than signals from the fingers?",
          "options": [
            "Facial touch is carried directly to the brainstem via the Trigeminal nerve (CN V), bypassing the spinal cord",
            "The face contains no mechanoreceptors",
            "Lips transmit signals using sound waves instead of nerves",
            "Facial skin has no epidermis"
          ],
          "explain": "Cranial nerve V (Trigeminal nerve) innervates the face directly into the brainstem, whereas the limbs and trunk route through the spinal cord."
        }
      ],
      "a2Summary": "Your skin has three main layers: the protective outer epidermis, the living dermis rich in sensors, and the deep fatty hypodermis. Inside the skin, specialized receptors detect light touch, deep vibration, heat, cold, and pain, converting physical contact into electrical impulses. Signals from your arms and legs travel up the spinal cord, while facial touch uses the Trigeminal nerve (CN V). Finally, the parietal lobe's somatosensory cortex maps where you were touched.",
      "collocations": [
        "deform mechanoreceptor membranes",
        "trigger protective withdrawal reflexes",
        "ascend the spinal cord",
        "innervate via Trigeminal nerve",
        "map receptive fields"
      ]
    },
    "funfact": "If you drew a human body sized proportionally to the amount of space each body part occupies in the somatosensory cortex (the 'Sensory Homunculus'), you would get a bizarre creature with enormous hands, giant lips, an oversized tongue, and a tiny shriveled torso and legs!",
    "health": {
      "problems": [
        {
          "name": "Peripheral Neuropathy",
          "text": "Damage to peripheral sensory nerves, commonly caused by chronic diabetes mellitus, resulting in numbness, tingling, or total loss of pain and temperature sensation in the feet and hands."
        },
        {
          "name": "Severe Sunburn & UV Damage",
          "text": "Ultraviolet radiation damages DNA in epidermal keratinocytes, triggering inflammatory cytokine release, acute vasodilation (redness), and blistering; repeated burns significantly increase cutaneous melanoma risk."
        },
        {
          "name": "Third-Degree Burn Anesthesia",
          "text": "Full-thickness burns destroy both the epidermis and the entire dermis. Paradoxically, the center of a third-degree burn causes zero pain because the sensory nerve endings themselves have been completely incinerated."
        }
      ],
      "care": [
        "Apply broad-spectrum sunscreen with a Sun Protection Factor (SPF) of 30 or higher and reapply every two hours when outdoors.",
        "Wear insulated gloves in sub-zero winter temperatures to prevent frostbite and cold-induced ischemic nerve injury.",
        "Wash lacerations and abrasions promptly with soap and clean water, applying sterile dressings to prevent invasive epidermal infections."
      ]
    },
    "deeper": [
      {
        "name": "Sensory Homunculus",
        "es": "homúnculo sensorial",
        "text": "A neurological visualization mapping brain cortex dedication: the hands, fingers, lips, and tongue occupy over 60% of primary somatosensory cortex territory."
      },
      {
        "name": "Two-Point Discrimination Threshold",
        "es": "umbral de discriminación de dos puntos",
        "text": "The minimum physical distance at which two simultaneous cutaneous pressure points are perceived as distinct stimuli rather than one (2 mm on fingertips vs. 40 mm on back)."
      },
      {
        "name": "Pain Withdrawal Reflex",
        "es": "reflejo de retirada por dolor",
        "text": "When touching a scalding pan, nociceptive impulses synapse directly with spinal interneurons and motor neurons, jerking your arm away milliseconds before the brain consciously perceives pain."
      },
      {
        "name": "Phantom Limb Sensation",
        "es": "sensación de miembro fantasma",
        "text": "Following surgical limb amputation, cortical neurons that formerly represented the missing limb continue to fire spontaneous signals, leading the patient to feel realistic sensations in a limb that is no longer there."
      }
    ],
    "match": [
      [
        "epidermis",
        "Waterproof stratified outer shield with free nerve endings"
      ],
      [
        "dermis",
        "Vascular middle layer housing most encapsulated mechanoreceptors"
      ],
      [
        "hypodermis",
        "Deep subcutaneous adipose tissue storing fat and cushioning"
      ],
      [
        "spinalcord",
        "Neural highway conveying somatic impulses from trunk and limbs"
      ],
      [
        "somatosensorycortex",
        "Parietal lobe postcentral gyrus hosting the sensory homunculus map"
      ]
    ],
    "cloze": {
      "text": "The human skin consists of three distinct layers: the outer {epidermis}, the middle {dermis}, and the subcutaneous {hypodermis}. Specialized somatosensory {receptors} detect mechanical pressure, temperature, and pain. Afferent {sensory nerves} transmit action potentials up the {spinal cord} to the primary {somatosensory cortex} in the parietal lobe.",
      "extra": [
        "retina",
        "cochlea",
        "taste buds"
      ]
    },
    "experiment": {
      "title": "Measuring Two-Point Tactile Discrimination Thresholds",
      "type": "twopoint",
      "predict": {
        "q": "Which region of the human body will have the smallest (most precise) two-point tactile discrimination threshold?",
        "qEs": "¿Qué región del cuerpo humano tendrá el umbral de discriminación de dos puntos más pequeño (más preciso)?",
        "options": [
          "The index fingertip, because it possesses high receptor density and small receptive fields",
          "The upper back, because it covers a much larger anatomical surface area",
          "The forearm, because it contains more hair follicles",
          "All body surfaces have identical 2 mm discrimination thresholds"
        ],
        "explain": "Receptor density varies dramatically across the body. Fingertips have tiny receptive fields packed with Meissner and Merkel receptors, allowing precise two-point resolution."
      },
      "materials": [
        "Two dull pencils or opened paperclips taped together at measured millimeter distances (2 mm, 5 mm, 15 mm, 30 mm)",
        "A metric ruler",
        "A testing partner"
      ],
      "steps": [
        "Your partner prepares two dull pencil tips held firmly together with tape at measured distances.",
        "Sit comfortably with your eyes closed and forearms resting flat on the table.",
        "Your partner gently touches your INDEX FINGERTIP with either ONE point or TWO points simultaneously.",
        "Without looking, report whether you feel 'One point' or 'Two distinct points'. Test 5 times at different separations.",
        "Repeat the identical procedure on your FOREARM and on your UPPER BACK, recording the minimum separation required to clearly feel two points."
      ],
      "observe": {
        "prompt": "Record your two-point discrimination data table: Document the minimum millimeter distance needed to feel two points on each anatomical site.",
        "promptEs": "Registra tu tabla de datos de discriminación de dos puntos: Documenta la distancia mínima en milímetros necesaria para sentir dos puntos en cada zona anatómica.",
        "type": "table",
        "columns": [
          "Anatomical Site",
          "Receptor Density",
          "Minimum 2-Point Threshold (mm)"
        ],
        "rows": [
          [
            "Index Fingertip",
            "Very High (Packed fields)",
            "2–3 mm"
          ],
          [
            "Forearm",
            "Moderate (Spread fields)",
            "25–35 mm"
          ],
          [
            "Upper Back",
            "Low (Sparse fields)",
            "40–60 mm"
          ]
        ]
      },
      "explain": "The two-point threshold test provides direct quantitative proof of receptor density and receptive field size. On your fingertips, sensory mechanoreceptor fields are microscopic (1–2 mm) and densely packed, and each neuron connects to dedicated circuits in the somatosensory cortex. On your back, receptive fields are huge (up to 50 mm across); two pencil points touching your back inside the same receptive field stimulate only one primary sensory neuron, tricking your brain into feeling a single touch point."
    },
    "frames": [
      "The skin is anatomically composed of three primary layers: the ___, the ___, and the ___.",
      "Cutaneous mechanoreceptors detect ___, while nociceptors detect ___.",
      "Touch signals from the body ascend the ___, whereas facial sensations travel along the ___.",
      "The index fingertip has a smaller two-point threshold than the back because ___.",
      "In the sensory homunculus, the hands and lips occupy vast cortical territory because ___."
    ],
    "writing": {
      "prompt": "Explain how your somatic nervous system perceives that you have accidentally placed your hand on a hot ceramic mug of tea. Detail the pathway from cutaneous receptors to cortical awareness.",
      "promptEs": "Explica cómo tu sistema somatosensorial percibe que has colocado accidentalmente tu mano sobre una taza de té caliente. Detalla el camino desde los receptores cutáneos hasta la consciencia cortical.",
      "bank": [
        "epidermis",
        "dermis",
        "thermoreceptors",
        "nociceptors",
        "sensory nerves",
        "spinal cord",
        "somatosensory cortex",
        "transduction",
        "reflex"
      ],
      "verbs": [
        "detects",
        "depolarizes",
        "transduces",
        "transmits",
        "ascends",
        "integrates",
        "perceives"
      ],
      "connectors": [
        "Initially",
        "Instantly",
        "Concurrently",
        "Afterward",
        "Finally"
      ],
      "model": "Initially, when your palm touches the scalding ceramic mug, high thermal heat stimulates free nerve ending thermoreceptors and nociceptors in the epidermis and dermis. Instantly, these receptors undergo sensory transduction, converting extreme thermal and mechanical energy into electrical action potentials. Concurrently, afferent sensory nerves conduct the impulses into the dorsal horn of the spinal cord. Here, a spinal reflex arc immediately fires motor neurons to withdraw your hand muscles. Afterward, the sensory impulses ascend the spinothalamic tract through the thalamus. Finally, the signals arrive at the primary somatosensory cortex in the parietal lobe, where your brain consciously localizes the intense heat and registers pain.",
      "verbStems": [
        "detect",
        "deform",
        "depolarize",
        "transduce",
        "transmit",
        "ascend",
        "trigger",
        "perceive"
      ],
      "sequenceOrder": [
        "epidermis",
        "dermis",
        "nociceptor",
        "spinal cord",
        "somatosensory cortex"
      ],
      "b1ChallengeFrame": "Contrast the rapid spinal withdrawal reflex with conscious parietal cortex arrival using temporal connectors."
    },
    "quiz": [
      {
        "level": "Remember",
        "q": "What is the outermost protective epithelial layer of human skin called?",
        "options": [
          "Epidermis",
          "Dermis",
          "Hypodermis",
          "Subcutis"
        ],
        "explain": "The epidermis is the superficial epithelial barrier of keratinized cells.",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "ngss_bio"
      },
      {
        "level": "Remember",
        "q": "Which type of cutaneous sensory receptor detects painful stimuli and tissue injury?",
        "options": [
          "Nociceptors",
          "Cones",
          "Hair cells",
          "Taste pores"
        ],
        "explain": "Nociceptors are specialized sensory neurons that respond to threatening or damaging noxious stimuli (pain).",
        "cefr": "A2.1",
        "difficulty": 1,
        "skill": "reading_comp"
      },
      {
        "level": "Understand",
        "q": "Why are human fingertips far more sensitive to fine textures than the skin on our backs?",
        "options": [
          "Fingertips possess a vastly higher density of mechanoreceptors with tiny receptive fields",
          "The back contains no blood vessels or nerve endings",
          "Fingertips lack an epidermis, exposing bare brain tissue",
          "The back only senses cold temperatures"
        ],
        "explain": "High receptor density and small individual receptive fields allow fingertips to distinguish microscopic surface contours.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "use_of_english"
      },
      {
        "level": "Understand",
        "q": "Which cranial nerve carries somatic sensory information from the face and lips directly to the brainstem?",
        "options": [
          "Trigeminal nerve (CN V)",
          "Optic nerve (CN II)",
          "Auditory nerve (CN VIII)",
          "Olfactory nerve (CN I)"
        ],
        "explain": "The Trigeminal nerve (CN V) is the major somatic sensory nerve for the face, teeth, and lips.",
        "cefr": "A2.2",
        "difficulty": 2,
        "skill": "ngss_bio"
      },
      {
        "level": "Apply",
        "q": "A patient with uncontrolled diabetes develops peripheral neuropathy and cannot feel a small pebble inside their shoe. What serious danger does this pose?",
        "options": [
          "Without pain sensation from nociceptors, repeated pressure ulcers and infections can develop unnoticed",
          "The patient's retina will detach",
          "The eardrum will permanently vibrate",
          "The liver will produce too much saliva"
        ],
        "explain": "Pain is a crucial protective sensation; sensory loss means mechanical tissue damage and infections go unnoticed, risking severe ulceration.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "reading_comp"
      },
      {
        "level": "Apply",
        "q": "A person closes their eyes while an investigator places two pencil tips 10 mm apart on their upper back. Why does the person report feeling only one point?",
        "options": [
          "Both pencil tips fall inside the same large receptive field of a single sensory neuron on the back",
          "The back has no sensory cortex representation",
          "The optic nerve is closed when eyes are closed",
          "The spinal cord blocks all signals below the neck"
        ],
        "explain": "Cutaneous receptive fields on the back are up to 40–50 mm wide; if two points stimulate the same receptive field, the brain receives only one input signal.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "use_of_english"
      },
      {
        "level": "Analyze",
        "q": "Examine the 'Sensory Homunculus' anatomical model. Why are the lips, tongue, and hands sculpted with disproportionately colossal dimensions compared to the torso?",
        "options": [
          "The size of each body part on the homunculus reflects the proportion of primary somatosensory cortex dedicated to processing its inputs",
          "The hands and lips weigh more than the torso in human anatomy",
          "The homunculus represents muscular strength rather than sensory touch",
          "Torso nerves transmit signals ten times faster than hand nerves"
        ],
        "explain": "The somatosensory homunculus is a neurological map; body parts with dense tactile innervation and fine motor touch command enormous cortical surface area.",
        "cefr": "B1.1",
        "difficulty": 3,
        "skill": "ngss_bio"
      },
      {
        "level": "Evaluate",
        "q": "Evaluate the adaptive evolutionary purpose of the rapid pain withdrawal reflex that occurs in the spinal cord before the brain consciously feels the pain.",
        "options": [
          "A monosynaptic or polysynaptic spinal reflex loop minimizes delay, retracting tissue from injury milliseconds faster than waiting for cortical processing",
          "The brain is incapable of moving limb muscles",
          "The spinal cord creates pain to prevent blood flow",
          "Reflexes exist only in amphibians and are non-functional in humans"
        ],
        "explain": "Spinal reflex arcs bypass the slower cerebral cortex pathway, instantly activating motor neurons to pull tissue away from noxious burns or cuts before conscious perception.",
        "cefr": "B1.2",
        "difficulty": 4,
        "skill": "reading_comp"
      }
    ],
    "biophysics": {
      "ionChannel": "PIEZO2 (Meissner/Merkel fine touch), TRPV1 (>43°C / capsaicin), TRPM8 (<25°C / menthol), TRPA1 (irritants)",
      "ionChannelEs": "Canales PIEZO2 (mecanotransducción) y familia TRP (TRPV1 calor/picante, TRPM8 frío/mentol)",
      "receptorPotential": "Depolarization: Lipid membrane stretch opens PIEZO2 cation channels; thermal/chemical shifts open TRP channels. When the graded generator potential crosses -55 mV at the first Node of Ranvier, all-or-nothing action potentials fire.",
      "receptorPotentialEs": "Despolarización por deformación mecánica (PIEZO2) o térmica (TRP) que dispara potenciales de acción.",
      "adaptation": "Phasic vs Tonic Dichotomy: Pacinian & Meissner corpuscles are Rapidly Adapting (Phasic — detect texture/vibration edges); Merkel discs & Nociceptors are Slowly Adapting (Tonic — continuous pressure and unremitting pain alerts).",
      "adaptationEs": "Dicotomía Fásico (Pacini/Meissner: adaptación rápida) vs Tónico (Merkel/Nociceptores: disparo sostenido).",
      "thalamicRelay": "Dorsal Column-Medial Lemniscal (Touch) or Spinothalamic Tract (Pain/Temp) → VPL/VPM Thalamus → Postcentral Gyrus (Parietal Lobe)",
      "thalamicRelayEs": "Columnas Dorsales / Tracto Espinotalámico → Tálamo (VPL/VPM) → Giro Postcentral (Lóbulo Parietal)"
    }
  }
];

const EXTRA_WORDS = {
  "brain": {
    "id": "brain",
    "en": "brain",
    "es": "cerebro",
    "ipa": "/breɪn/",
    "def": "The central organ of the nervous system that receives, integrates, and interprets all sensory signals.",
    "ex": "All sensory pathways ultimately project to specialized cortex regions of the brain."
  },
  "transduction": {
    "id": "transduction",
    "en": "sensory transduction",
    "es": "transducción sensorial",
    "ipa": "/trænzˈdʌk.ʃən/",
    "def": "The biological process by which a sensory receptor converts environmental energy (light, sound, chemicals, mechanical force) into electrical action potentials.",
    "ex": "Transduction is the universal mechanism shared by all five human senses."
  }
};

const COMPARE = {
  "rows": [
    {
      "key": "stimulus",
      "label": "Stimulus (Estímulo)",
      "es": "Estímulo",
      "values": {
        "sight": "Light photons (electromagnetic waves)",
        "hearing": "Sound waves (longitudinal pressure waves)",
        "smell": "Volatile airborne chemical molecules",
        "taste": "Chemical tastants dissolved in saliva",
        "touch": "Mechanical pressure, vibration, temperature, pain"
      }
    },
    {
      "key": "organ",
      "label": "Sense Organ (Órgano)",
      "es": "Órgano",
      "values": {
        "sight": "Eye (cornea, pupil, lens, retina)",
        "hearing": "Ear (pinna, ossicles, cochlea)",
        "smell": "Nose (nasal cavity & turbinates)",
        "taste": "Tongue (lingual papillae)",
        "touch": "Skin (epidermis, dermis, hypodermis)"
      }
    },
    {
      "key": "classification",
      "label": "Receptor Type (Tipo de receptor)",
      "es": "Tipo de receptor",
      "values": {
        "sight": "Photoreceptors",
        "hearing": "Mechanoreceptors",
        "smell": "Chemoreceptors",
        "taste": "Chemoreceptors",
        "touch": "Mechanoreceptors, Thermoreceptors, Nociceptors"
      }
    },
    {
      "key": "receptors",
      "label": "Receptor Cells (Células receptoras)",
      "es": "Células receptoras",
      "values": {
        "sight": "Rods and cones (Retina)",
        "hearing": "Hair cells with stereocilia (Organ of Corti)",
        "smell": "Bipolar olfactory sensory neurons (Cilia)",
        "taste": "Gustatory receptor cells (Taste buds)",
        "touch": "Meissner, Pacinian, Merkel discs & Free nerve endings"
      }
    },
    {
      "key": "nerve",
      "label": "Sensory Nerve Pathway (Nervio)",
      "es": "Nervio sensorial",
      "values": {
        "sight": "Optic nerve (CN II)",
        "hearing": "Auditory nerve (CN VIII)",
        "smell": "Olfactory nerve (CN I)",
        "taste": "Facial (CN VII), Glossopharyngeal (CN IX), Vagus (CN X)",
        "touch": "Somatic sensory nerves + Spinal cord / Trigeminal (CN V)"
      }
    },
    {
      "key": "cortex",
      "label": "Primary Brain Cortex (Corteza cerebral)",
      "es": "Corteza cerebral",
      "values": {
        "sight": "Visual Cortex (Occipital Lobe)",
        "hearing": "Auditory Cortex (Temporal Lobe)",
        "smell": "Olfactory Cortex & Limbic System (Temporal Lobe / Amygdala)",
        "taste": "Gustatory Cortex (Insula / Frontal Lobe)",
        "touch": "Primary Somatosensory Cortex (Parietal Lobe)"
      }
    },
    {
      "key": "channels",
      "label": "Molecular Channel / GPCR (Canal molecular)",
      "es": "Canal / Proteína receptora",
      "values": {
        "sight": "cGMP-gated Na⁺/Ca²⁺ channels (hyperpolarization via rhodopsin/PDE)",
        "hearing": "TMC1/TMC2 tip-link channels (K⁺ influx from endolymph)",
        "smell": "Golf GPCR → cAMP → CNG + Ca²⁺-activated Cl⁻ channels",
        "taste": "ENaC (Na⁺), OTOP1 (H⁺), T1R/T2R GPCRs → TRPM5",
        "touch": "PIEZO2 (touch), TRPV1 (heat/capsaicin), TRPM8 (cold/menthol)"
      }
    },
    {
      "key": "adaptation",
      "label": "Sensory Adaptation Profile (Adaptación)",
      "es": "Adaptación fásica vs tónica",
      "values": {
        "sight": "Dual photochemical bleaching + rapid pupillary iris scaling",
        "hearing": "Rapid phasic mechanical resetting (myosin-1c tip-link tension)",
        "smell": "Fast phasic olfactory fatigue (~2–5 min via Ca²⁺-calmodulin)",
        "taste": "Moderate adaptation + continuous saliva washout",
        "touch": "Phasic (Pacini/Meissner: fast) vs Tonic (Merkel/Nociceptors: non-adapting)"
      }
    },
    {
      "key": "thalamus",
      "label": "Thalamic Relay Station (Relevo talámico)",
      "es": "Relevo talámico",
      "values": {
        "sight": "Lateral Geniculate Nucleus (LGN)",
        "hearing": "Medial Geniculate Nucleus (MGN)",
        "smell": "Direct Limbic Bypass (Amygdala/Piriform) before mediodorsal thalamus",
        "taste": "Ventral Posteromedial parvocellular (VPMpc)",
        "touch": "Ventral Posterolateral & Posteromedial (VPL / VPM)"
      }
    },
    {
      "key": "regeneration",
      "label": "Cellular Regeneration (Regeneración celular)",
      "es": "Capacidad regenerativa",
      "values": {
        "sight": "Permanent photoreceptors (non-regenerating in mammals)",
        "hearing": "Permanent hair cells (irreversible acoustic trauma)",
        "smell": "Continuous neurogenesis (~30–60 days via basal stem cells)",
        "taste": "Rapid turnover every 10–14 days from lingual stem cells",
        "touch": "High epidermal & peripheral axon regrowth (CNS spinal tracts limited)"
      }
    }
  ]
};

const FINAL_EXTRA = [
  {
    "level": "Understand",
    "q": "What universal biological process is shared by all five human sense organs?",
    "options": [
      "Sensory transduction: converting environmental energy into electrical action potentials",
      "Producing saliva to dissolve solid objects",
      "Directing light through a crystalline lens",
      "Equalizing air pressure through the Eustachian tube"
    ],
    "explain": "Every sense organ contains specialized receptor cells that execute sensory transduction, translating external physical or chemical energy into electrical signals for the nervous system.",
    "cefr": "A2.2",
    "difficulty": 2,
    "skill": "ngss_bio"
  },
  {
    "level": "Analyze",
    "q": "Which two senses rely on chemoreceptors and function cooperatively to synthesize the sensory perception of 'flavor'?",
    "options": [
      "Taste and Smell (gustation and olfaction)",
      "Sight and Hearing (vision and audition)",
      "Touch and Sight (tactile and vision)",
      "Hearing and Touch (mechanoreception)"
    ],
    "explain": "Flavor is a multisensory integration of gustatory chemoreception on the tongue and retronasal olfactory chemoreception in the nasal cavity.",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "use_of_english"
  },
  {
    "level": "Understand",
    "q": "Why is the olfactory pathway anatomically unique compared to sight, hearing, and touch?",
    "options": [
      "Olfactory signals project directly to the limbic system without an obligatory initial relay through the thalamus",
      "Olfactory signals travel down the spinal cord to the legs",
      "Smell uses photoreceptors that require sunlight",
      "Smell signals travel through the auditory ossicles"
    ],
    "explain": "Olfaction is the sole sensory modality that bypasses the thalamic relay station on its primary route, sending direct axons into the amygdala and hippocampus.",
    "cefr": "A2.2",
    "difficulty": 2,
    "skill": "reading_comp"
  },
  {
    "level": "Analyze",
    "q": "Rods and cones are to photoreception as auditory hair cells are to…",
    "options": [
      "mechanoreception in the cochlea",
      "chemical taste detection on the tongue",
      "olfactory cilia in the nasal cavity",
      "thermal detection in the dermis"
    ],
    "explain": "Rods and cones transduce light photons (photoreception); hair cells transduce sound pressure waves (mechanoreception).",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "ngss_bio"
  },
  {
    "level": "Understand",
    "q": "Which primary sensory modality bypasses the spinal cord entirely because it travels via cranial nerves directly to the brain?",
    "options": [
      "Sight, hearing, smell, and taste (all use cranial nerves CN I, II, VII, VIII, IX, X)",
      "Touch sensations from the feet",
      "Pain signals from the knee",
      "Reflex jerks of the elbow"
    ],
    "explain": "The specialized senses located in the head use cranial nerves connecting directly into the brainstem and forebrain, bypassing the spinal cord.",
    "cefr": "A2.2",
    "difficulty": 2,
    "skill": "use_of_english"
  },
  {
    "level": "Apply",
    "q": "A patient suffering from acute rhinitis (stuffy nose) eats a strawberry ice cream cone. Why do they report that 'it only tastes sweet without any strawberry taste'?",
    "options": [
      "Nasal congestion blocks retronasal airflow to olfactory receptors, preserving only basic tongue taste while eliminating fruit aroma",
      "The tongue stops functioning when a person has a cold",
      "The cold ice freezes the optic nerve",
      "Strawberry molecules only stimulate the auditory cortex"
    ],
    "explain": "The tongue detects basic sweetness; identifying 'strawberry' requires volatile aroma molecules ascending through the pharynx to olfactory receptors.",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "reading_comp"
  },
  {
    "level": "Evaluate",
    "q": "What does the 'Sensory Homunculus' illustrate about the primary somatosensory cortex?",
    "options": [
      "Cortical brain space is allocated based on receptor density and tactile precision rather than physical body surface size",
      "The human body is shaped like a giant foot",
      "All skin cells receive identical representation in the occipital lobe",
      "The back and legs require more brain power than the fingers"
    ],
    "explain": "The homunculus demonstrates cortical magnification: areas with tiny receptive fields and immense receptor density (fingers, lips) command huge brain territory.",
    "cefr": "B1.2",
    "difficulty": 4,
    "skill": "ngss_bio"
  },
  {
    "level": "Analyze",
    "q": "Which pair of senses both utilize mechanoreceptors to detect physical movement or pressure?",
    "options": [
      "Hearing (hair cells) and Touch (cutaneous corpuscles)",
      "Sight (rods) and Smell (olfactory neurons)",
      "Taste (taste cells) and Smell (cilia)",
      "Sight (cones) and Hearing (ossicles)"
    ],
    "explain": "Both audition and touch rely on mechanoreceptors that convert physical force or pressure into neural impulses.",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "use_of_english"
  },
  {
    "level": "Analyze",
    "q": "Damage to the occipital lobe would selectively impair which sensory function, leaving the others intact?",
    "options": [
      "Visual perception",
      "Auditory frequency localization",
      "Olfactory aroma recall",
      "Cutaneous pain recognition"
    ],
    "explain": "The primary visual cortex is located in the occipital lobe at the posterior of the brain.",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "reading_comp"
  },
  {
    "level": "Evaluate",
    "q": "Evaluate how sensory adaptation benefits human survival in everyday environments.",
    "options": [
      "By reducing sensitivity to continuous unchanging stimuli, the brain conserves cognitive energy to rapidly detect novel or dangerous environmental changes",
      "By shutting down all five senses when a person is tired",
      "By ensuring we smell our own clothes with maximum intensity all day",
      "By forcing the pupils to stay permanently closed in daylight"
    ],
    "explain": "Sensory adaptation prevents sensory overload by filtering out steady ambient stimuli (like the feel of clothing or familiar room odors), keeping neural pathways alert for new threats.",
    "cefr": "B1.2",
    "difficulty": 4,
    "skill": "ngss_bio"
  }
];

const CLINICAL_CASES = [
  {
    "id": "case_sight_1",
    "sense": "sight",
    "cefr": "B1.1",
    "patient": "Patient Elena (14 y/o) sees distant traffic signs as completely blurry, but reads tiny text on her smartphone clearly at 15 cm without glasses.",
    "lesionSite": "2. Sense Organ (Optical Refraction / Axial Length)",
    "options": [
      "2. Sense Organ — Eyeball is slightly elongated, so light converges IN FRONT OF the retina (Myopia).",
      "3. Receptor Cells — All rods in the peripheral retina have permanently died.",
      "4. Sensory Nerve — Complete transection of the Optic Nerve (CN II).",
      "5. Brain Cortex — Occipital lobe tumor blocking conscious vision."
    ],
    "correct": 0,
    "rationale": "Because Elena reads nearby screens clearly, her retina, optic nerve, and visual cortex are intact. Distant parallel light converges prematurely before hitting the retina (myopia), corrected with diverging concave lenses."
  },
  {
    "id": "case_sight_2",
    "sense": "sight",
    "cefr": "B1.2",
    "patient": "After an industrial laser accident, Patient Marcus retains normal corneal clarity and pupillary constriction in his right eye, but has zero conscious sight in the left visual field of both eyes.",
    "lesionSite": "5. Brain Cortex (Right Visual Cortex / Optic Radiation)",
    "options": [
      "5. Brain Cortex — Lesion in the right occipital visual cortex (contralateral hemianopia) spares pupillary brainstem reflexes.",
      "1. Stimulus — Visible photons stopped bouncing off objects.",
      "2. Sense Organ — Both crystalline lenses turned opaque (cataracts).",
      "3. Receptor Cells — Only foveal cones were bleached by sunlight."
    ],
    "correct": 0,
    "rationale": "Intact pupillary reflexes prove the cornea, retina, and optic nerve signal to the midbrain work; losing the entire left visual field across BOTH eyes points to post-chiasmatic damage in the right occipital cortex."
  },
  {
    "id": "case_hearing_1",
    "sense": "hearing",
    "cefr": "B1.1",
    "patient": "Patient Leo (15 y/o) blasts gaming headphones at 105 dB daily. His eardrum and ossicles vibrate normally, but he can no longer hear high-pitched 6,000 Hz tones.",
    "lesionSite": "3. Receptor Cells (Basal Cochlear Hair Cells)",
    "options": [
      "3. Receptor Cells — High-frequency hair cells at the base of the cochlea suffered permanent acoustic trauma.",
      "2. Sense Organ — Earwax completely sealed the external auditory canal.",
      "4. Sensory Nerve — The olfactory nerve (CN I) stopped conducting sound.",
      "5. Brain Cortex — Auditory cortex lost blood supply bilaterally."
    ],
    "correct": 0,
    "rationale": "High-decibel noise selectively shears stereocilia on outer and inner hair cells at the stiff basal turn of the cochlea (tonotopic high-frequency region), causing irreversible sensorineural hearing loss."
  },
  {
    "id": "case_hearing_2",
    "sense": "hearing",
    "cefr": "B1.2",
    "patient": "Patient Sofia hears voices very muffled through air conduction, yet hears a vibrating tuning fork clearly when pressed directly against her mastoid skull bone.",
    "lesionSite": "2. Sense Organ (Middle Ear Ossicles / Tympanic Membrane)",
    "options": [
      "2. Sense Organ — Conductive hearing loss (e.g., ossicle stiffening/otosclerosis); bone vibration bypasses the middle ear straight to the healthy cochlea.",
      "3. Receptor Cells — Hair cells inside the cochlea are completely destroyed.",
      "4. Sensory Nerve — Complete auditory nerve (CN VIII) atrophy.",
      "5. Brain Cortex — Temporal lobe auditory cortex damage."
    ],
    "correct": 0,
    "rationale": "Normal bone conduction proves the cochlea, CN VIII, and temporal cortex work! The mechanical blockage resides solely in air/ossicle sound transmission (conductive loss)."
  },
  {
    "id": "case_smell_1",
    "sense": "smell",
    "cefr": "B1.1",
    "patient": "Following a mild viral infection, Patient Mateo can still feel the cold coolness of menthol in his nose and distinguish sweet from salty foods, yet cannot smell coffee or strawberries.",
    "lesionSite": "3. Receptor Cells (Olfactory Epithelium Support & Chemoreceptors)",
    "options": [
      "3. Receptor Cells — Viral inflammation impaired olfactory epithelium chemoreceptors (anosmia), while Trigeminal CN V (menthol TRPM8) and gustatory receptors remained intact.",
      "5. Brain Cortex — Gustatory cortex inside the insula shut down.",
      "2. Sense Organ — Nostril cartilage completely collapsed.",
      "4. Sensory Nerve — Facial nerve (CN VII) lost motor control."
    ],
    "correct": 0,
    "rationale": "Feeling menthol coolness relies on trigeminal TRPM8 receptors (CN V), and sweet/salty rely on tongue taste buds (CN VII/IX). Isolated loss of aroma indicates olfactory epithelium anosmia."
  },
  {
    "id": "case_smell_2",
    "sense": "smell",
    "cefr": "B1.2",
    "patient": "After hitting the back of her head while skateboarding (coup-contrecoup injury), Patient Mia passes a bone X-ray showing micro-fractures across the ethmoid cribriform plate. She now has permanent anosmia.",
    "lesionSite": "4. Sensory Nerve (Olfactory Nerve CN I Axons)",
    "options": [
      "4. Sensory Nerve — Brain shift sheared the unmyelinated CN I olfactory axons passing through the perforated cribriform plate.",
      "1. Stimulus — Odor molecules became too heavy to evaporate.",
      "2. Sense Organ — Nasal turbinates grew too large.",
      "5. Brain Cortex — Occipital visual cortex suffered bruising."
    ],
    "correct": 0,
    "rationale": "Delicate CN I axon bundles pass vertically through tiny pores in the ethmoid cribriform plate to enter the olfactory bulb; sudden head deceleration can shear them cleanly."
  },
  {
    "id": "case_taste_1",
    "sense": "taste",
    "cefr": "B1.1",
    "patient": "Patient Lucas lost sweet and salty sensation ONLY on the anterior two-thirds of the right side of his tongue after severe middle ear surgery, yet still feels touch and heat normally on that exact spot.",
    "lesionSite": "4. Sensory Nerve (Chorda Tympani branch of Facial Nerve CN VII)",
    "options": [
      "4. Sensory Nerve — Injury to the chorda tympani (CN VII) running through the middle ear spared Trigeminal (CN V) tactile fibers.",
      "3. Receptor Cells — All fungiform papillae dissolved overnight.",
      "4. Sensory Nerve — Vagus nerve (CN X) failed in the stomach.",
      "5. Brain Cortex — Left parietal somatosensory cortex stroke."
    ],
    "correct": 0,
    "rationale": "Anterior 2/3 taste travels via the chorda tympani (CN VII) across the middle ear cavity, whereas general touch/temperature on the same tongue region travels separately via CN V."
  },
  {
    "id": "case_taste_2",
    "sense": "taste",
    "cefr": "A2.2",
    "patient": "Patient Nadia suffers from severe chronic dry mouth (xerostomia) due to salivary gland dysfunction. Even when holding dry sugar crystals on her tongue, she barely detects sweetness.",
    "lesionSite": "1. Stimulus Delivery (Lack of Saliva Solvent)",
    "options": [
      "1. Stimulus — Without aqueous saliva to dissolve solid tastants, chemical molecules cannot diffuse through taste pores to bind GPCRs.",
      "5. Brain Cortex — Gustatory insula cannot process sweetness.",
      "3. Receptor Cells — Circumvallate papillae lack nerve connections.",
      "4. Sensory Nerve — Optic nerve interference."
    ],
    "correct": 0,
    "rationale": "Gustation is a chemical sense requiring liquid dissolution: dry crystals cannot enter the microscopic taste pore to activate T1R2+T1R3 sweet receptors."
  },
  {
    "id": "case_touch_1",
    "sense": "touch",
    "cefr": "B1.2",
    "patient": "A patient has a focal lesion affecting ONLY the right dorsal columns of the spinal cord, while the spinothalamic tract remains intact. What sensory deficit occurs in his right leg?",
    "lesionSite": "4. Sensory Nerve / Spinal Tract (Dorsal Column Pathway)",
    "options": [
      "4. Sensory Nerve — Loss of fine two-point touch and vibration in the right leg, while pain and temperature perception remain intact.",
      "5. Brain Cortex — Total blindness in the right eye.",
      "3. Receptor Cells — Pacinian corpuscles vanished from the fingertips.",
      "2. Sense Organ — Loss of sweating across the face."
    ],
    "correct": 0,
    "rationale": "Somatosensory pathways diverge in the spinal cord: fine touch/vibration (PIEZO2 mechanoreceptors) ascend ipsilaterally in the dorsal columns, whereas pain/temperature travel via the spinothalamic tract."
  },
  {
    "id": "case_touch_2",
    "sense": "touch",
    "cefr": "B1.1",
    "patient": "Patient Diego suffers a deep third-degree burn covering both the epidermis and dermis on his forearm. Strangely, the center of the burn hurts LESS than the mild redness at the outer rim.",
    "lesionSite": "3. Receptor Cells (Destroyed Cutaneous Nociceptors)",
    "options": [
      "3. Receptor Cells — Full-thickness thermal necrosis completely incinerated the free nerve ending nociceptors in the dermis center.",
      "5. Brain Cortex — The parietal lobe refuses to feel pain.",
      "1. Stimulus — Heat no longer triggers TRPV1 channels anywhere.",
      "4. Sensory Nerve — The Trigeminal nerve blocked forearm pain."
    ],
    "correct": 0,
    "rationale": "Nociceptors reside in the epidermis and dermis; total destruction of both layers causes paradoxical local anesthesia at the wound center, while partially damaged outer margins fire intensely."
  }
];

const FINAL_CAT_BANK = [
  {
    "id": "cat_a21_1",
    "sense": "sight",
    "cefr": "A2.1",
    "difficulty": 1,
    "skill": "ngss_bio",
    "q": "Which transparent part at the very front of the eye bends light rays first?",
    "options": [
      "The cornea",
      "The optic nerve",
      "The cochlea",
      "The hypodermis"
    ],
    "explain": "The cornea is the clear curved front window responsible for most initial refraction."
  },
  {
    "id": "cat_a21_2",
    "sense": "hearing",
    "cefr": "A2.1",
    "difficulty": 1,
    "skill": "use_of_english",
    "q": "Choose the grammatically correct scientific sentence:",
    "options": [
      "Sound waves travel through the ear canal and vibrate the eardrum.",
      "Sound waves travels through the ear canal and vibrates the eardrum.",
      "Sound wave are travel down the ear canal to eardrum.",
      "Sound waves traveling down ear canal vibrate eardrum."
    ],
    "explain": "Plural subject 'Sound waves' takes plural base verbs ('travel', 'vibrate')."
  },
  {
    "id": "cat_a21_3",
    "sense": "taste",
    "cefr": "A2.1",
    "difficulty": 1,
    "skill": "reading_comp",
    "q": "Read the clue: 'I am a liquid in your mouth. Without me, dry sugar cannot enter taste pores.' What am I?",
    "options": [
      "Saliva",
      "Mucus",
      "Endolymph",
      "Vitreous humor"
    ],
    "explain": "Saliva acts as the aqueous solvent dissolving food molecules for taste reception."
  },
  {
    "id": "cat_a21_4",
    "sense": "touch",
    "cefr": "A2.1",
    "difficulty": 1,
    "skill": "ngss_bio",
    "q": "Which layer of skin stores fat for insulation and protects deeper tissues from bumps?",
    "options": [
      "The hypodermis",
      "The retina",
      "The iris",
      "The papillae"
    ],
    "explain": "The subcutaneous hypodermis consists mainly of adipose fat tissue."
  },
  {
    "id": "cat_a22_1",
    "sense": "sight",
    "cefr": "A2.2",
    "difficulty": 2,
    "skill": "use_of_english",
    "q": "Complete the sentence with the correct scientific passive form: 'Once light passes through the pupil, it ___ onto the retina by the lens.'",
    "options": [
      "is focused",
      "focused",
      "focusing",
      "are focus"
    ],
    "explain": "Singular uncountable 'it' (light) requires singular passive 'is focused'."
  },
  {
    "id": "cat_a22_2",
    "sense": "smell",
    "cefr": "A2.2",
    "difficulty": 2,
    "skill": "reading_comp",
    "q": "Why can you stop smelling your own perfume after five minutes in a room?",
    "options": [
      "Olfactory receptors undergo sensory adaptation (fatigue) when exposed to steady odor molecules.",
      "The nostrils physically close shut after three minutes.",
      "Perfume molecules turn into light waves.",
      "The occipital lobe erases all scent memories."
    ],
    "explain": "Phasic olfactory adaptation reduces receptor responsiveness via Ca²⁺-calmodulin feedback."
  },
  {
    "id": "cat_a22_3",
    "sense": "taste",
    "cefr": "A2.2",
    "difficulty": 2,
    "skill": "use_of_english",
    "q": "Select the sentence with correct plural Latin noun agreement:",
    "options": [
      "The lingual papillae contain microscopic taste buds inside their clefts.",
      "The lingual papillae contains microscopic taste buds inside its cleft.",
      "A single papillae detect all five flavors immediately.",
      "The papillae is located in the auditory cortex."
    ],
    "explain": "'Papillae' is the plural of 'papilla', requiring plural verb agreement ('contain', 'their')."
  },
  {
    "id": "cat_a22_4",
    "sense": "hearing",
    "cefr": "A2.2",
    "difficulty": 2,
    "skill": "ngss_bio",
    "q": "Which cranial nerve transmits electrical impulses from cochlear hair cells to the temporal lobe?",
    "options": [
      "Auditory nerve (CN VIII)",
      "Olfactory nerve (CN I)",
      "Optic nerve (CN II)",
      "Trigeminal nerve (CN V)"
    ],
    "explain": "The vestibulocochlear / auditory nerve (CN VIII) carries hearing and balance signals."
  },
  {
    "id": "cat_b11_1",
    "sense": "sight",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "use_of_english",
    "q": "Choose the most precise academic collocation: 'Specialized receptor cells ___ radiant light energy into electrical action potentials.'",
    "options": [
      "transduce",
      "evaporate",
      "dissolve",
      "secrete"
    ],
    "explain": "'Transduce' is the precise scientific verb meaning converting one form of energy into a neural impulse."
  },
  {
    "id": "cat_b11_2",
    "sense": "touch",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "reading_comp",
    "q": "A study measures 2-point thresholds: 2 mm on the index fingertip versus 45 mm on the upper back. What inference is strongly supported?",
    "options": [
      "Receptive fields on the fingertip are vastly smaller and more densely innervated than on the back.",
      "Nerve impulses travel twenty times faster in the back than in the hand.",
      "The epidermis is completely absent on human fingertips.",
      "Nociceptors only function in the upper torso."
    ],
    "explain": "Small, dense receptive fields enable fine spatial discrimination between two nearby points."
  },
  {
    "id": "cat_b11_3",
    "sense": "taste",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "ngss_bio",
    "q": "Why does mint candy trigger a chilly sensation on your tongue even at room temperature (22°C)?",
    "options": [
      "Menthol chemically activates TRPM8 cold-sensitive ion channels in trigeminal nerve endings.",
      "Mint molecules absorb all thermal heat inside the mouth instantly.",
      "Sweet taste buds transform into Pacinian corpuscles.",
      "Mint paralyzes the ossicles in the middle ear."
    ],
    "explain": "Menthol acts as a chemical agonist of TRPM8 channels, mimicking cold temperatures."
  },
  {
    "id": "cat_b11_4",
    "sense": "smell",
    "cefr": "B1.1",
    "difficulty": 3,
    "skill": "use_of_english",
    "q": "Select the sentence using a reduced participle clause accurately:",
    "options": [
      "Dissolved in the nasal mucus layer, airborne odorants bind to olfactory cilia.",
      "Dissolving by the nasal mucus, the brain interprets airborne odorants immediately.",
      "Having dissolve in mucus, the odorant bulb smells the air.",
      "Dissolved in saliva, photoreceptors capture visible light."
    ],
    "explain": "A passive past participle clause ('Dissolved in...') logically modifies the subject 'airborne odorants'."
  },
  {
    "id": "cat_b12_1",
    "sense": "sight",
    "cefr": "B1.2",
    "difficulty": 4,
    "skill": "ngss_bio",
    "q": "How does a vertebrate photoreceptor (rod or cone) respond electrophysiologically when struck by a photon of light?",
    "options": [
      "It hyperpolarizes (~ -70 mV) as cGMP is hydrolyzed and Na⁺/Ca²⁺ dark-current channels close.",
      "It fires rapid +30 mV action potentials directly down the optic nerve.",
      "It depolarizes by opening voltage-gated K⁺ channels in the sclera.",
      "It mechanically stretches PIEZO2 channels in the cornea."
    ],
    "explain": "Unlike most sensory receptors, light turns OFF the dark current in rods and cones, hyperpolarizing them."
  },
  {
    "id": "cat_b12_2",
    "sense": "hearing",
    "cefr": "B1.2",
    "difficulty": 4,
    "skill": "use_of_english",
    "q": "Complete the counterfactual clinical diagnosis: 'Had the patient's stapes not fused to the oval window, sound vibrations ___ efficiently into the cochlear perilymph.'",
    "options": [
      "would have been transmitted",
      "will be transmitting",
      "had transmitted",
      "would transmit yesterday"
    ],
    "explain": "Inverted Third Conditional ('Had + S + past participle... would have + been + past participle') accurately expresses a past counterfactual clinical state."
  },
  {
    "id": "cat_b12_3",
    "sense": "touch",
    "cefr": "B1.2",
    "difficulty": 4,
    "skill": "reading_comp",
    "q": "Why do Pacinian corpuscles adapt rapidly (phasic), whereas cutaneous nociceptors exhibit slow or minimal adaptation (tonic)?",
    "options": [
      "Detecting vibration changes prevents sensory clutter from clothing, whereas persistent pain firing warns of ongoing tissue damage.",
      "Pacinian corpuscles lack any connection to the thalamus, while nociceptors bypass the spinal cord.",
      "Nociceptors use PIEZO2 while Pacinian corpuscles rely on rhodopsin.",
      "Slow adaptation forces muscles to remain paralyzed during burns."
    ],
    "explain": "Evolutionary survival requires filtering steady harmless pressure (phasic) while maintaining urgent pain signaling until threats cease (tonic)."
  },
  {
    "id": "cat_b12_4",
    "sense": "hearing",
    "cefr": "B1.2",
    "difficulty": 4,
    "skill": "ngss_bio",
    "q": "What unique ionic mechanism causes depolarization when cochlear stereocilia tip-links pull open TMC1/TMC2 channels?",
    "options": [
      "Potassium ions (K⁺) rush IN from the K⁺-rich endolymph driven by the +80 mV endocochlear potential.",
      "Chloride ions (Cl⁻) exit the tympanic membrane into the air.",
      "Sodium ions are pumped out of the occipital lobe.",
      "Hydrogen protons bind to OTOP1 receptors in the ossicles."
    ],
    "explain": "Endolymph has uniquely high K⁺ concentration and positive voltage (+80 mV), causing K⁺ influx to depolarize hair cells."
  }
];


// Security Integrity: Deep Freeze Data Catalogs against runtime tampering
(function freezeCatalog(obj) {
  if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
    Object.freeze(obj);
    Object.keys(obj).forEach(k => freezeCatalog(obj[k]));
  }
})({ UNIT, SENSES, EXTRA_WORDS, COMPARE, FINAL_EXTRA, CLINICAL_CASES, FINAL_CAT_BANK });
