/* =========================================================
   The Five Senses — learning content
   Conventions:
   - In every multiple-choice item, options[0] is the correct
     answer. The app shuffles the options at runtime, so the
     page never shows which one is correct.
   - In reading paragraphs, [[wordId|text]] creates a
     clickable glossary word.
   ========================================================= */

const UNIT = {
  title: "The Five Senses",
  subtitle: "How your body reads the world",
  bigIdea: "Every sense follows the same path: stimulus → receptor → nerve → brain.",
  bigIdeaEs: "Todos los sentidos siguen el mismo camino: estímulo → receptor → nervio → cerebro.",
  objectives: [
    "I can name the organ and the main parts of each sense.",
    "I can explain the path of each sense from stimulus to brain.",
    "I can use the key vocabulary in English sentences.",
    "I can compare the five senses and explain how they work together.",
    "I can name one problem and one way to take care of each sense organ."
  ],
  path: [
    { en: "Stimulus", es: "Estímulo", ex: "light, sound, odor, chemicals, pressure" },
    { en: "Organ", es: "Órgano", ex: "eye, ear, nose, tongue, skin" },
    { en: "Receptors", es: "Receptores", ex: "special cells change the stimulus into signals" },
    { en: "Nerve", es: "Nervio", ex: "carries the signals" },
    { en: "Brain", es: "Cerebro", ex: "interprets the signals: you see, hear, smell, taste, feel" }
  ]
};

const SENSES = [
  /* ===================================================== SIGHT */
  {
    id: "sight", name: "Sight", es: "Vista", organ: "The Eye", organEs: "El ojo",
    objectives: [
      "I can name and locate 6 parts of the eye.",
      "I can describe the path of light using first, next, then, finally.",
      "I can explain why the pupil changes size.",
      "I can name one eye problem and one way to protect my eyes."
    ],
    warmup: {
      q: "Look at something near you, then out of the window. Did your eyes feel any change?",
      qEs: "Mira algo cerca de ti y luego por la ventana. ¿Notaste algún cambio en tus ojos?",
      task: "Cover one eye and try to touch the tip of a pen with another pen. Is it harder?",
      taskEs: "Tápate un ojo e intenta tocar la punta de un bolígrafo con otro. ¿Es más difícil?"
    },
    words: [
      { id: "cornea", en: "cornea", es: "córnea", ipa: "/ˈkɔːr.ni.ə/", def: "The clear, curved window at the front of the eye.", ex: "Light enters the eye through the cornea.", note: "✅ Cognate: cornea = córnea.", spot: true },
      { id: "iris", en: "iris", es: "iris", ipa: "/ˈaɪ.rɪs/", def: "The colored ring of muscle around the pupil.", ex: "My iris is brown, so I have brown eyes.", note: "✅ Same word in Spanish.", spot: true },
      { id: "pupil", en: "pupil", es: "pupila", ipa: "/ˈpjuː.pəl/", def: "The black opening in the center of the iris.", ex: "In the dark, your pupil gets bigger.", note: "⚠️ 'Pupil' also means 'student' in English.", spot: true },
      { id: "lens", en: "lens", es: "cristalino", ipa: "/lenz/", def: "The clear part behind the pupil that focuses light.", ex: "The lens changes shape to focus on near objects.", note: "⚠️ False friend: in the eye, lens = cristalino (not 'lente').", spot: true },
      { id: "retina", en: "retina", es: "retina", ipa: "/ˈret.ɪ.nə/", def: "The layer at the back of the eye that changes light into signals.", ex: "The retina has cells called rods and cones.", note: "✅ Cognate: retina = retina.", spot: true },
      { id: "opticnerve", en: "optic nerve", es: "nervio óptico", ipa: "/ˈɑːp.tɪk nɜːrv/", def: "The nerve that carries signals from the retina to the brain.", ex: "The optic nerve sends the image to the brain.", note: "💡 Word family: see → sight → visual → optic.", spot: true },
      { id: "light", en: "light", es: "luz", ipa: "/laɪt/", def: "The stimulus for sight. It travels in straight lines.", ex: "Without light, we cannot see colors.", note: "⚠️ 'Light' can also mean 'not heavy' (ligero)." },
      { id: "focus", en: "focus", es: "enfocar", ipa: "/ˈfoʊ.kəs/", def: "To bend light so that the image is clear and sharp.", ex: "The cornea and lens focus light on the retina.", note: "✅ Cognate: focus ≈ enfocar." }
    ],
    path: ["light", "cornea", "pupil", "lens", "retina", "opticnerve", "brain"],
    pathLabels: { light: "Light", cornea: "Cornea", pupil: "Pupil", lens: "Lens", retina: "Retina", opticnerve: "Optic nerve", brain: "Brain" },
    reading: {
      title: "The Path of Light",
      video: { src: "path-of-light.mp4", caption: "Animation: the path of light through the eye (10 seconds). Press play." },
      paragraphs: [
        "Your eyes collect [[light|light]] and turn it into signals your brain can understand. Let's follow the path of light through the eye.",
        "First, light enters through the [[cornea|cornea]], a clear window that bends the light and starts to [[focus|focus]] it. Next, light passes through the [[pupil|pupil]], the black opening in the center of the [[iris|iris]]. The iris is a muscle: in bright light it makes the pupil smaller, and in the dark it makes the pupil bigger.",
        "Then the light travels through the [[lens|lens]]. The lens changes shape to focus objects that are near or far away. The light reaches the [[retina|retina]] at the back of the eye. The retina has millions of receptor cells called rods and cones. They change light into electrical signals.",
        "Finally, the [[opticnerve|optic nerve]] carries these signals to the brain. The brain interprets the signals and creates the image you see."
      ],
      checks: [
        { after: 1, q: "What controls the size of the pupil?", options: ["The iris", "The lens", "The retina"], explain: "The iris is a ring of muscle. It makes the pupil bigger or smaller." },
        { after: 2, q: "Which cells change light into signals?", options: ["Rods and cones in the retina", "Cells in the cornea", "Cells in the lens"], explain: "Rods and cones are the receptors of sight. They are in the retina." }
      ]
    },
    funfact: "The image on your retina is upside down! Your brain turns it the right way up.",
    health: {
      problems: [
        { name: "Myopia (nearsightedness)", text: "Far objects look blurry because light focuses in front of the retina. Glasses or contact lenses correct it." },
        { name: "Conjunctivitis (pink eye)", text: "The thin layer that covers the white of the eye becomes red and itchy. It can be contagious." }
      ],
      care: [
        "Wear sunglasses that block UV light outdoors.",
        "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet (6 m) away for 20 seconds.",
        "Don't rub your eyes, and get regular eye exams."
      ]
    },
    deeper: [
      { name: "Sclera", es: "esclerótica", text: "The white, tough outer layer that protects the eye." },
      { name: "Rods and cones", es: "bastones y conos", text: "Rods work in dim light (black and white). Cones need bright light and detect color and detail." },
      { name: "Fovea", es: "fóvea", text: "A tiny spot in the retina with many cones. It gives you sharp vision for reading." },
      { name: "Blind spot", es: "punto ciego", text: "The place where the optic nerve leaves the eye. There are no rods or cones there, so you cannot see light that falls on it. Try the experiment below!" },
      { name: "Vitreous humor", es: "humor vítreo", text: "A clear gel that fills the eye and keeps its round shape." }
    ],
    match: [
      ["cornea", "Clear window that starts to focus light"],
      ["iris", "Muscle that controls the size of the pupil"],
      ["lens", "Changes shape to focus near or far"],
      ["retina", "Changes light into electrical signals"],
      ["opticnerve", "Carries signals to the brain"]
    ],
    cloze: {
      text: "Light enters the eye through the {cornea}. It passes through the {pupil}, which gets bigger in the dark. The {lens} focuses the light on the {retina}. Then the {optic nerve} carries the signals to the brain.",
      extra: ["eardrum", "iris"]
    },
    experiment: {
      title: "Find your blind spot",
      type: "blindspot",
      predict: { q: "Do you think there is a place in your eye that cannot see?", options: ["Yes", "No", "I'm not sure"] },
      steps: [
        "Cover or close your LEFT eye.",
        "Look at the cross (+) with your RIGHT eye. Keep looking at it.",
        "Move your face slowly closer to the screen (start at about 50 cm).",
        "At some point the dot disappears! Then it comes back."
      ],
      explain: "The dot disappears when its light falls on your blind spot: the place where the optic nerve leaves the retina. There are no rods or cones there. Your brain fills the gap, so normally you don't notice it."
    },
    frames: [
      "The ___ is a part of the eye.",
      "The ___ helps us to ___.",
      "First, light ___. Next, ___. Then, ___. Finally, ___.",
      "If the ___ is damaged, we cannot ___."
    ],
    writing: {
      prompt: "Explain how you see a tree. Use first, next, then, finally.",
      promptEs: "Explica cómo ves un árbol. Usa first, next, then, finally.",
      bank: ["light", "cornea", "pupil", "lens", "retina", "optic nerve", "brain", "first", "next", "then", "finally"],
      model: "First, light from the tree enters my eye through the cornea. Next, it passes through the pupil. Then, the lens focuses the light on the retina, where rods and cones change it into signals. Finally, the optic nerve carries the signals to my brain, and I see the tree."
    },
    quiz: [
      { level: "Remember", q: "Which part is the colored part of the eye?", options: ["Iris", "Pupil", "Retina", "Cornea"], explain: "The iris is the colored ring. The pupil is the black hole in its center." },
      { level: "Remember", q: "Which part changes light into signals for the brain?", options: ["Retina", "Lens", "Cornea", "Iris"], explain: "The lens and cornea focus light, but the retina (with rods and cones) changes it into signals." },
      { level: "Understand", q: "Why does the pupil get bigger in the dark?", options: ["To let more light into the eye", "To protect the retina from light", "To focus on far objects", "To produce tears"], explain: "When there is little light, the iris opens the pupil so more light can reach the retina." },
      { level: "Understand", q: "What is the correct path of light?", options: ["cornea → pupil → lens → retina", "lens → cornea → retina → pupil", "retina → lens → pupil → cornea", "pupil → cornea → retina → lens"], explain: "Light passes from the front to the back: cornea, pupil, lens, and finally the retina." },
      { level: "Apply", q: "You walk out of a dark cinema into bright sunlight. What happens to your pupils?", options: ["They get smaller", "They get bigger", "They stay the same", "They change color"], explain: "In bright light the iris makes the pupil smaller to protect the retina from too much light." },
      { level: "Apply", q: "A person's optic nerve is badly damaged, but the rest of the eye is healthy. What happens?", options: ["The brain cannot receive signals from that eye", "The person sees everything upside down", "The lens cannot focus", "The iris loses its color"], explain: "The retina can make signals, but without the optic nerve they never reach the brain, so the person cannot see with that eye." }
    ]
  },

  /* ===================================================== HEARING */
  {
    id: "hearing", name: "Hearing", es: "Oído", organ: "The Ear", organEs: "El oído",
    objectives: [
      "I can name and locate 6 parts of the ear.",
      "I can describe the path of sound from the pinna to the brain.",
      "I can explain where vibrations change into signals.",
      "I can explain how loud noise damages hearing and how to prevent it."
    ],
    warmup: {
      q: "Close your eyes for 30 seconds. How many different sounds can you hear?",
      qEs: "Cierra los ojos 30 segundos. ¿Cuántos sonidos diferentes puedes oír?",
      task: "Put your fingers on your throat and say 'aaaa'. What do you feel?",
      taskEs: "Pon los dedos en tu garganta y di 'aaaa'. ¿Qué sientes?"
    },
    words: [
      { id: "pinna", en: "pinna (outer ear)", es: "pabellón auricular (oreja)", ipa: "/ˈpɪn.ə/", def: "The part of the ear you can see. It collects sound waves.", ex: "The pinna is made of cartilage and skin.", note: "💡 In everyday English people say 'ear' or 'outer ear'.", spot: true },
      { id: "earcanal", en: "ear canal", es: "conducto auditivo", ipa: "/ɪr kəˈnæl/", def: "The tube that carries sound waves to the eardrum.", ex: "Earwax protects the ear canal.", note: "✅ Canal ≈ canal / conducto.", spot: true },
      { id: "eardrum", en: "eardrum", es: "tímpano", ipa: "/ˈɪr.drʌm/", def: "A thin membrane that vibrates when sound waves hit it.", ex: "Sound waves make the eardrum vibrate.", note: "💡 ear + drum (tambor): it works like a small drum.", spot: true },
      { id: "ossicles", en: "ossicles", es: "huesecillos", ipa: "/ˈɑː.sɪ.kəlz/", def: "Three tiny bones that make the vibrations stronger.", ex: "The ossicles are the hammer, the anvil and the stirrup.", note: "💡 'Ossi-' means bone, like 'óseo' in Spanish.", spot: true },
      { id: "cochlea", en: "cochlea", es: "cóclea (caracol)", ipa: "/ˈkoʊ.kli.ə/", def: "A spiral tube full of liquid. Its hair cells change vibrations into signals.", ex: "The cochlea looks like a snail shell.", note: "✅ Cognate: cochlea = cóclea.", spot: true },
      { id: "auditorynerve", en: "auditory nerve", es: "nervio auditivo", ipa: "/ˈɔː.dɪ.tɔːr.i nɜːrv/", def: "The nerve that carries sound signals from the cochlea to the brain.", ex: "The auditory nerve sends signals to the brain.", note: "💡 Word family: hear → hearing → auditory → audio.", spot: true },
      { id: "soundwave", en: "sound wave", es: "onda sonora", ipa: "/saʊnd weɪv/", def: "A vibration that travels through the air. It is the stimulus for hearing.", ex: "A guitar string makes sound waves." },
      { id: "vibration", en: "vibration", es: "vibración", ipa: "/vaɪˈbreɪ.ʃən/", def: "A fast movement back and forth.", ex: "You can feel the vibration of a speaker.", note: "✅ Cognate: vibration = vibración." }
    ],
    path: ["soundwave", "pinna", "earcanal", "eardrum", "ossicles", "cochlea", "auditorynerve", "brain"],
    pathLabels: { soundwave: "Sound waves", pinna: "Pinna", earcanal: "Ear canal", eardrum: "Eardrum", ossicles: "Ossicles", cochlea: "Cochlea", auditorynerve: "Auditory nerve", brain: "Brain" },
    reading: {
      title: "The Path of Sound",
      paragraphs: [
        "Every sound starts as a [[vibration|vibration]]. The vibration travels through the air as a [[soundwave|sound wave]]. Your ear collects these waves and turns them into signals your brain can understand.",
        "First, the [[pinna|pinna]] collects sound waves and sends them into the [[earcanal|ear canal]]. Next, the waves reach the [[eardrum|eardrum]], a thin membrane, and make it vibrate.",
        "Then, the vibrations move three tiny bones called the [[ossicles|ossicles]]: the hammer, the anvil and the stirrup. They make the vibrations stronger and pass them to the [[cochlea|cochlea]]. The cochlea is a spiral tube full of liquid. Inside it, tiny hair cells change the vibrations into electrical signals.",
        "Finally, the [[auditorynerve|auditory nerve]] carries these signals to the brain, which interprets them as sound: music, voices, or noise."
      ],
      checks: [
        { after: 1, q: "What makes the eardrum vibrate?", options: ["Sound waves", "Light", "The auditory nerve"], explain: "Sound waves travel down the ear canal and hit the eardrum." },
        { after: 2, q: "Which cells change vibrations into signals?", options: ["Hair cells in the cochlea", "Cells in the pinna", "Cells in the eardrum"], explain: "Hair cells are the receptors of hearing. They are inside the cochlea." }
      ]
    },
    funfact: "The stirrup (stapes), one of the ossicles, is the smallest bone in your body. It is only about 3 mm long!",
    health: {
      problems: [
        { name: "Noise-induced hearing loss", text: "Very loud sounds damage the hair cells in the cochlea. They do not grow back, so the damage is permanent." },
        { name: "Ear infection (otitis media)", text: "An infection behind the eardrum. It causes pain and is common in children." }
      ],
      care: [
        "Use the 60/60 rule: headphones at less than 60% volume, for less than 60 minutes at a time.",
        "Wear earplugs at concerts and in very noisy places.",
        "Never put cotton swabs or objects inside your ear canal."
      ]
    },
    deeper: [
      { name: "Hammer, anvil and stirrup", es: "martillo, yunque y estribo", text: "The scientific names of the ossicles are malleus, incus and stapes." },
      { name: "Semicircular canals", es: "canales semicirculares", text: "Three loops full of liquid next to the cochlea. They help you keep your balance, not hear." },
      { name: "Eustachian tube", es: "trompa de Eustaquio", text: "A tube that connects the middle ear with the throat. It balances air pressure: that's why your ears 'pop' in a plane." },
      { name: "Outer, middle and inner ear", es: "oído externo, medio e interno", text: "Outer: pinna and ear canal. Middle: eardrum and ossicles. Inner: cochlea and semicircular canals." }
    ],
    match: [
      ["pinna", "Collects sound waves"],
      ["eardrum", "Thin membrane that vibrates"],
      ["ossicles", "Three tiny bones that make vibrations stronger"],
      ["cochlea", "Hair cells change vibrations into signals"],
      ["auditorynerve", "Carries sound signals to the brain"]
    ],
    cloze: {
      text: "The {pinna} collects sound waves. The waves travel through the {ear canal} and make the {eardrum} vibrate. The {ossicles} make the vibrations stronger. In the {cochlea}, hair cells change vibrations into signals.",
      extra: ["retina", "lens"]
    },
    experiment: {
      title: "Where is the sound?",
      type: "steps",
      predict: { q: "Is it easier to find where a sound comes from with one ear or with two ears?", options: ["With two ears", "With one ear", "No difference"] },
      steps: [
        "Work with a partner. Sit with your eyes closed.",
        "Your partner snaps their fingers in different places around your head. Point to the sound.",
        "Now cover one ear with your hand and repeat.",
        "Count how many times you pointed correctly each time."
      ],
      explain: "With two ears, the sound arrives at one ear a tiny bit earlier and louder than at the other. Your brain compares the two signals to find the direction. With one ear, it is much harder."
    },
    frames: [
      "The ___ is in the outer / middle / inner ear.",
      "The ___ helps us to ___.",
      "First, sound waves ___. Next, ___. Then, ___. Finally, ___.",
      "Loud noise can damage the ___, so we should ___."
    ],
    writing: {
      prompt: "Explain how you hear your favorite song. Use first, next, then, finally.",
      promptEs: "Explica cómo oyes tu canción favorita. Usa first, next, then, finally.",
      bank: ["sound waves", "pinna", "ear canal", "eardrum", "vibrate", "ossicles", "cochlea", "auditory nerve", "brain", "first", "next", "then", "finally"],
      model: "First, the pinna collects the sound waves of the song. Next, they travel through the ear canal and make the eardrum vibrate. Then, the ossicles make the vibrations stronger, and hair cells in the cochlea change them into signals. Finally, the auditory nerve carries the signals to my brain, and I hear the music."
    },
    quiz: [
      { level: "Remember", q: "Which thin membrane vibrates when sound waves hit it?", options: ["Eardrum", "Cochlea", "Pinna", "Ear canal"], explain: "The eardrum is a thin membrane at the end of the ear canal." },
      { level: "Remember", q: "What do the ossicles do?", options: ["Make the vibrations stronger", "Collect sound waves", "Change vibrations into signals", "Produce earwax"], explain: "The three ossicles amplify (make stronger) the vibrations of the eardrum." },
      { level: "Understand", q: "Where are vibrations changed into electrical signals?", options: ["In the cochlea, by hair cells", "In the eardrum", "In the ear canal", "In the pinna"], explain: "Hair cells inside the cochlea are the receptors of hearing." },
      { level: "Understand", q: "What is the correct path of sound?", options: ["pinna → ear canal → eardrum → ossicles → cochlea", "eardrum → pinna → cochlea → ear canal → ossicles", "cochlea → ossicles → eardrum → ear canal → pinna", "ear canal → cochlea → pinna → ossicles → eardrum"], explain: "Sound goes from the outside in: outer ear, middle ear, inner ear." },
      { level: "Apply", q: "Why is very loud music dangerous for your hearing?", options: ["It can damage the hair cells in the cochlea, and they do not grow back", "It makes the ear canal longer", "It breaks the pinna", "It fills the cochlea with air"], explain: "Loud sounds damage hair cells. Lost hair cells are not replaced, so the hearing loss is permanent." },
      { level: "Apply", q: "Your friend has a small hole in the eardrum. Which step of hearing is affected first?", options: ["Vibrations are not passed well to the ossicles", "Light cannot reach the retina", "The auditory nerve sends too many signals", "The pinna cannot collect sound"], explain: "The eardrum passes vibrations to the ossicles. If it has a hole, it vibrates badly, so less sound reaches the inner ear." }
    ]
  },

  /* ===================================================== SMELL */
  {
    id: "smell", name: "Smell", es: "Olfato", organ: "The Nose", organEs: "La nariz",
    objectives: [
      "I can name and locate 5 parts of the sense of smell.",
      "I can describe the path of an odor from the nostrils to the brain.",
      "I can explain why we smell badly when we have a cold.",
      "I can explain why smells can bring back memories."
    ],
    warmup: {
      q: "Think of a smell that reminds you of a person or a place. Which one?",
      qEs: "Piensa en un olor que te recuerde a una persona o un lugar. ¿Cuál es?",
      task: "Smell your pencil, your hands and your sleeve. Can you describe each smell in English?",
      taskEs: "Huele tu lápiz, tus manos y tu manga. ¿Puedes describir cada olor en inglés?"
    },
    words: [
      { id: "nostril", en: "nostril", es: "fosa nasal", ipa: "/ˈnɑː.strəl/", def: "One of the two openings of the nose.", ex: "Air enters through the nostrils.", note: "💡 We have two nostrils.", spot: true },
      { id: "nasalcavity", en: "nasal cavity", es: "cavidad nasal", ipa: "/ˈneɪ.zəl ˈkæv.ə.ti/", def: "The space inside the nose where air travels.", ex: "The nasal cavity warms and cleans the air.", note: "✅ Cognate: nasal cavity = cavidad nasal.", spot: true },
      { id: "olfreceptors", en: "olfactory receptors", es: "receptores olfativos", ipa: "/ɑːlˈfæk.tər.i rɪˈsep.tərz/", def: "Cells at the top of the nasal cavity that detect odor molecules.", ex: "Olfactory receptors detect the smell of coffee.", note: "💡 Olfactory ≈ olfato / olfativo.", spot: true },
      { id: "olfnerve", en: "olfactory nerve", es: "nervio olfativo", ipa: "/ɑːlˈfæk.tər.i nɜːrv/", def: "Nerve fibers that carry signals from the receptors to the olfactory bulb.", ex: "The olfactory nerve passes through tiny holes in the skull bone.", note: "⚠️ It goes from the receptors to the bulb, not from the bulb to the brain.", spot: true },
      { id: "olfbulb", en: "olfactory bulb", es: "bulbo olfativo", ipa: "/ɑːlˈfæk.tər.i bʌlb/", def: "The part of the brain that first receives smell signals.", ex: "The olfactory bulb sends the signals to other parts of the brain.", note: "💡 Bulb = bulbo (like a flower bulb).", spot: true },
      { id: "odor", en: "odor molecules", es: "moléculas de olor", ipa: "/ˈoʊ.dər ˈmɑː.lə.kjuːlz/", def: "Tiny particles in the air that we can smell. They are the stimulus for smell.", ex: "Odor molecules from bread fill the kitchen.", note: "✅ Cognate: odor = olor. British English: 'odour'." },
      { id: "mucus", en: "mucus", es: "moco / mucosidad", ipa: "/ˈmjuː.kəs/", def: "A sticky liquid inside the nose. Odor molecules dissolve in it.", ex: "When you have a cold, you have more mucus.", note: "✅ Cognate: mucus ≈ mucosidad." }
    ],
    path: ["odor", "nostril", "nasalcavity", "olfreceptors", "olfnerve", "olfbulb", "brain"],
    pathLabels: { odor: "Odor molecules", nostril: "Nostrils", nasalcavity: "Nasal cavity", olfreceptors: "Olfactory receptors", olfnerve: "Olfactory nerve", olfbulb: "Olfactory bulb", brain: "Brain" },
    reading: {
      title: "The Path of Smell",
      paragraphs: [
        "Every smell begins with tiny [[odor|odor molecules]] floating in the air. When you breathe in, these molecules enter your nose through the [[nostril|nostrils]] and travel into the [[nasalcavity|nasal cavity]].",
        "At the top of the nasal cavity there is a small patch with millions of [[olfreceptors|olfactory receptors]]. First, the odor molecules dissolve in the [[mucus|mucus]] that covers this patch. Then, the receptors detect the molecules and make electrical signals.",
        "Next, the signals travel along the [[olfnerve|olfactory nerve]]. Its fibers pass through tiny holes in a skull bone and reach the [[olfbulb|olfactory bulb]], which is part of the brain.",
        "Finally, the olfactory bulb sends the signals to other areas of the brain. The brain compares them with smells you already know and identifies the smell: coffee, flowers, or rain. Some of these areas also control memory and emotions."
      ],
      checks: [
        { after: 1, q: "What must happen to odor molecules before the receptors detect them?", options: ["They dissolve in mucus", "They become liquid in the lungs", "They reach the tongue"], explain: "Odor molecules dissolve in the mucus that covers the olfactory receptors." },
        { after: 2, q: "Where does the olfactory nerve carry the signals?", options: ["From the receptors to the olfactory bulb", "From the bulb to the nostrils", "From the eyes to the nose"], explain: "The olfactory nerve connects the receptors with the olfactory bulb." }
      ]
    },
    funfact: "Smell signals reach the brain areas for memory and emotion very directly. That's why a smell can suddenly remind you of a place or a person.",
    health: {
      problems: [
        { name: "Anosmia", text: "Loss of the sense of smell. It can happen with a cold, flu or COVID-19, and usually comes back." },
        { name: "Sinusitis", text: "The sinuses (spaces around the nose) become swollen and blocked. It causes pain and a stuffy nose." }
      ],
      care: [
        "Blow your nose gently, one nostril at a time.",
        "Avoid smoke and strong chemicals: they damage the receptors.",
        "If you suddenly lose your sense of smell, tell an adult or a doctor."
      ]
    },
    deeper: [
      { name: "About 400 types of receptors", es: "unos 400 tipos de receptores", text: "Humans have about 400 kinds of olfactory receptors. Together they can tell apart a huge number of smells." },
      { name: "Olfactory tract", es: "tracto olfativo", text: "The path that carries signals from the olfactory bulb to the rest of the brain." },
      { name: "Nose hairs", es: "vellos nasales", text: "They filter dust and small particles from the air you breathe." },
      { name: "Turbinates", es: "cornetes", text: "Curved bones inside the nasal cavity. They warm and humidify the air." }
    ],
    match: [
      ["nostril", "Openings where air enters the nose"],
      ["mucus", "Sticky liquid where odor molecules dissolve"],
      ["olfreceptors", "Cells that detect odor molecules"],
      ["olfnerve", "Carries signals from the receptors to the bulb"],
      ["olfbulb", "First part of the brain that receives smell signals"]
    ],
    cloze: {
      text: "Odor molecules enter through the {nostrils} and travel into the {nasal cavity}. They dissolve in {mucus}. The olfactory {receptors} detect them. The olfactory nerve carries the signals to the olfactory {bulb}.",
      extra: ["cochlea", "pupil"]
    },
    experiment: {
      title: "Smell detectives",
      type: "steps",
      predict: { q: "Can you identify 3 foods only by their smell, with your eyes closed?", options: ["Yes, all 3", "Only 1 or 2", "None"] },
      steps: [
        "A partner prepares 3 small cups with things that smell (for example: coffee, lemon, cinnamon, soap).",
        "Close your eyes. Smell each cup for 3 seconds.",
        "Say what you think it is in English: 'I think it is…'",
        "Then say if the smell reminds you of something: 'It reminds me of…'"
      ],
      explain: "Your olfactory receptors detected the odor molecules and your brain compared them with smells you know. Many people remember places or people when they smell something, because smell signals reach memory areas of the brain very directly."
    },
    frames: [
      "Odor molecules enter through the ___.",
      "The ___ detect(s) ___.",
      "First, ___. Next, ___. Then, ___. Finally, ___.",
      "The smell of ___ reminds me of ___."
    ],
    writing: {
      prompt: "Explain how you smell fresh bread. Use first, next, then, finally.",
      promptEs: "Explica cómo hueles el pan recién hecho. Usa first, next, then, finally.",
      bank: ["odor molecules", "nostrils", "nasal cavity", "mucus", "olfactory receptors", "olfactory nerve", "olfactory bulb", "brain", "first", "next", "then", "finally"],
      model: "First, odor molecules from the bread enter my nose through the nostrils. Next, they travel into the nasal cavity and dissolve in the mucus. Then, the olfactory receptors detect them, and the olfactory nerve carries the signals to the olfactory bulb. Finally, the brain identifies the smell of fresh bread."
    },
    quiz: [
      { level: "Remember", q: "Where do odor molecules enter the body?", options: ["Through the nostrils", "Through the ear canal", "Through the taste buds", "Through the pupil"], explain: "Air with odor molecules enters through the nostrils." },
      { level: "Remember", q: "Which cells detect odor molecules?", options: ["Olfactory receptors", "Taste cells", "Hair cells", "Rods and cones"], explain: "Olfactory receptors are at the top of the nasal cavity." },
      { level: "Understand", q: "What does the olfactory nerve do?", options: ["Carries signals from the receptors to the olfactory bulb", "Carries signals from the bulb to the eyes", "Produces mucus", "Filters dust from the air"], explain: "The olfactory nerve connects the receptors in the nose with the olfactory bulb in the brain." },
      { level: "Understand", q: "Why is mucus important for smell?", options: ["Odor molecules dissolve in it so the receptors can detect them", "It makes the nostrils bigger", "It sends signals to the brain", "It cleans the olfactory bulb"], explain: "Receptors detect molecules that are dissolved in the mucus." },
      { level: "Apply", q: "When you have a bad cold, you can't smell well. Why?", options: ["Swelling and extra mucus stop odor molecules from reaching the receptors", "The olfactory bulb disappears", "The ears are blocked", "The tongue stops working"], explain: "The nose is blocked, so fewer odor molecules reach the olfactory receptors." },
      { level: "Apply", q: "The smell of a cake reminds you of your grandmother's house. Why?", options: ["Smell signals reach brain areas for memory and emotion very directly", "Smell is processed in the tongue", "The cake has memory molecules", "The optic nerve stores smells"], explain: "The smell pathway is closely connected to the brain areas that control memory and emotions." }
    ]
  },

  /* ===================================================== TASTE */
  {
    id: "taste", name: "Taste", es: "Gusto", organ: "The Tongue", organEs: "La lengua",
    objectives: [
      "I can name and locate the tongue, papillae, taste buds and taste cells.",
      "I can name the five basic tastes.",
      "I can explain why food must dissolve in saliva.",
      "I can explain the difference between taste and flavor."
    ],
    warmup: {
      q: "What is your favorite food? Is it sweet, sour, salty, bitter or umami?",
      qEs: "¿Cuál es tu comida favorita? ¿Es dulce, ácida, salada, amarga o umami?",
      task: "Look at your tongue in a mirror. Can you see small bumps?",
      taskEs: "Mira tu lengua en un espejo. ¿Puedes ver pequeños bultos?"
    },
    words: [
      { id: "tongue", en: "tongue", es: "lengua", ipa: "/tʌŋ/", def: "The muscle in your mouth used for tasting, chewing and speaking.", ex: "The tongue is covered with papillae.", note: "⚠️ 'Tongue' can also mean 'language' (mother tongue = lengua materna).", spot: true },
      { id: "papillae", en: "papillae", es: "papilas", ipa: "/pəˈpɪl.iː/", def: "Small bumps on the tongue. Most taste buds are inside them.", ex: "You can see papillae on your tongue.", note: "💡 Singular: papilla. Plural: papillae.", spot: true },
      { id: "tastebuds", en: "taste buds", es: "botones gustativos", ipa: "/teɪst bʌdz/", def: "Tiny groups of taste cells inside the papillae.", ex: "We have thousands of taste buds.", note: "⚠️ In Spanish people often say 'papilas gustativas', but a taste bud is inside a papilla.", spot: true },
      { id: "tastecells", en: "taste cells", es: "células gustativas", ipa: "/teɪst selz/", def: "The receptor cells of taste. They detect chemicals in food.", ex: "Taste cells are replaced about every two weeks.", spot: true },
      { id: "tastenerve", en: "taste nerves", es: "nervios gustativos", ipa: "/teɪst nɜːrvz/", def: "Nerves that carry taste signals from the tongue to the brain.", ex: "Two main nerves carry taste signals from the tongue.", note: "💡 Scientific word: gustatory (≈ gusto).", spot: true },
      { id: "saliva", en: "saliva", es: "saliva", ipa: "/səˈlaɪ.və/", def: "The liquid in your mouth. It dissolves chemicals from food.", ex: "Saliva helps us taste and swallow food.", note: "✅ Same word in Spanish." },
      { id: "flavor", en: "flavor", es: "sabor (gusto + olfato)", ipa: "/ˈfleɪ.vər/", def: "The mix of taste and smell (and texture) that the brain creates.", ex: "Strawberry flavor needs taste and smell.", note: "⚠️ Taste = what the tongue detects. Flavor = taste + smell. British English: 'flavour'." },
      { id: "umami", en: "umami", es: "umami (sabroso)", ipa: "/uːˈmɑː.mi/", def: "The savory taste of meat, cheese, tomato and soup.", ex: "Parmesan cheese has a strong umami taste.", note: "💡 A Japanese word. The five basic tastes: sweet, sour, salty, bitter, umami." }
    ],
    path: ["saliva", "papillae", "tastebuds", "tastecells", "tastenerve", "brain"],
    pathLabels: { saliva: "Food dissolves in saliva", papillae: "Papillae", tastebuds: "Taste buds", tastecells: "Taste cells", tastenerve: "Taste nerves", brain: "Brain" },
    reading: {
      title: "The Path of Taste",
      paragraphs: [
        "When you eat, [[saliva|saliva]] dissolves tiny chemicals from your food. Only dissolved chemicals can be tasted. That's why a completely dry tongue cannot taste sugar well.",
        "First, the dissolved chemicals touch the [[papillae|papillae]], the small bumps on your [[tongue|tongue]]. Next, they enter tiny holes called taste pores and reach the [[tastebuds|taste buds]] inside the papillae.",
        "Then, the [[tastecells|taste cells]] in each taste bud detect the chemicals. They react to five basic tastes: sweet, sour, salty, bitter and [[umami|umami]] (a savory taste). All parts of the tongue can detect all five tastes.",
        "Finally, the [[tastenerve|taste nerves]] carry the signals to the brain. The brain identifies the taste and combines it with smell to create [[flavor|flavor]]."
      ],
      checks: [
        { after: 0, q: "Why can't a dry tongue taste sugar well?", options: ["Only dissolved chemicals can be tasted", "Sugar has no taste", "The tongue needs light"], explain: "Taste cells detect chemicals that are dissolved in saliva." },
        { after: 2, q: "Which part of the tongue detects bitter tastes?", options: ["All parts of the tongue", "Only the back", "Only the tip"], explain: "The old 'tongue map' is a myth. All areas with taste buds can detect all five tastes." }
      ]
    },
    funfact: "Flavor is a mix of taste AND smell. That's why food seems to have less flavor when you have a cold and your nose is blocked.",
    health: {
      problems: [
        { name: "Loss of taste and flavor", text: "With a cold or COVID-19, food can seem to have no flavor, mainly because smell is blocked. It usually comes back." },
        { name: "Burned tongue", text: "Very hot food can damage taste cells. They are replaced in about two weeks." }
      ],
      care: [
        "Brush your teeth and gently clean your tongue every day.",
        "Drink water: saliva is essential for tasting.",
        "Don't smoke: smoking reduces your sense of taste."
      ]
    },
    deeper: [
      { name: "Types of papillae", es: "tipos de papilas", text: "Filiform papillae (the most common) have no taste buds: they feel texture. Fungiform, circumvallate and foliate papillae contain taste buds." },
      { name: "The tongue map myth", es: "el mito del mapa de la lengua", text: "Old books show 'sweet' on the tip and 'bitter' at the back. This is wrong: all taste buds can detect all five tastes." },
      { name: "Spicy is not a taste", es: "el picante no es un sabor", text: "Chili contains capsaicin. It activates pain and heat receptors, not taste cells. That's why spicy food feels 'hot'." },
      { name: "Gustatory nerves", es: "nervios gustativos", text: "The facial nerve carries taste from the front of the tongue, and the glossopharyngeal nerve from the back." }
    ],
    match: [
      ["saliva", "Dissolves chemicals from food"],
      ["papillae", "Small bumps on the tongue"],
      ["tastebuds", "Groups of taste cells inside the papillae"],
      ["tastecells", "Detect sweet, sour, salty, bitter and umami"],
      ["flavor", "Taste + smell combined by the brain"]
    ],
    cloze: {
      text: "First, {saliva} dissolves chemicals from food. The chemicals reach the {taste buds} inside the {papillae}. Taste cells detect five basic tastes: sweet, sour, salty, bitter and {umami}. The brain combines taste and smell to create {flavor}.",
      extra: ["spicy", "eardrum"]
    },
    experiment: {
      title: "The nose-pinch test",
      type: "steps",
      predict: { q: "If you pinch your nose, can you still recognize the fruit flavor of a candy?", options: ["Yes, easily", "Only partly", "No"] },
      steps: [
        "Close your eyes and pinch your nose.",
        "A partner gives you a fruit-flavored candy or jelly bean.",
        "Chew it for 10 seconds. Say what you taste: sweet? sour? Which fruit?",
        "Now let go of your nose. What changes?"
      ],
      explain: "With your nose pinched, your tongue can still detect basic tastes like sweet or sour. But the fruit flavor needs smell. When you let go, odor molecules reach your olfactory receptors and the flavor suddenly appears."
    },
    frames: [
      "The five basic tastes are ___.",
      "___ tastes sweet / sour / salty / bitter / umami.",
      "First, ___. Next, ___. Then, ___. Finally, ___.",
      "Taste is different from flavor because ___."
    ],
    writing: {
      prompt: "Explain how you taste a lemon. Use first, next, then, finally.",
      promptEs: "Explica cómo saboreas un limón. Usa first, next, then, finally.",
      bank: ["saliva", "dissolves", "papillae", "taste buds", "taste cells", "sour", "taste nerves", "brain", "flavor", "first", "next", "then", "finally"],
      model: "First, saliva dissolves the chemicals in the lemon juice. Next, the chemicals reach the taste buds inside the papillae. Then, the taste cells detect a sour taste. Finally, the taste nerves carry the signals to my brain, which combines taste and smell to create the flavor of lemon."
    },
    quiz: [
      { level: "Remember", q: "Where are most taste buds found?", options: ["Inside the papillae on the tongue", "In the nostrils", "In the eardrum", "In the epidermis"], explain: "Taste buds are inside the papillae, the small bumps on the tongue." },
      { level: "Remember", q: "Which of these is NOT one of the five basic tastes?", options: ["Spicy", "Umami", "Bitter", "Sour"], explain: "Spicy is not a taste: it activates pain and heat receptors." },
      { level: "Understand", q: "Why must food dissolve in saliva?", options: ["Taste cells can only detect dissolved chemicals", "Saliva makes food sweet", "Saliva sends signals to the brain", "Saliva changes the color of food"], explain: "Taste cells detect chemicals dissolved in saliva." },
      { level: "Understand", q: "What is the difference between taste and flavor?", options: ["Flavor combines taste and smell", "They are exactly the same", "Flavor only uses the eyes", "Taste only uses the nose"], explain: "Taste comes from the tongue. Flavor is created by the brain from taste + smell." },
      { level: "Apply", q: "You pinch your nose and eat a strawberry candy. What happens?", options: ["You taste sweet, but it is hard to recognize the strawberry flavor", "You cannot taste anything at all", "It tastes bitter", "It tastes stronger"], explain: "The tongue still detects sweet, but the strawberry flavor needs smell." },
      { level: "Apply", q: "You burned your tongue with hot soup. Why does your taste come back after a couple of weeks?", options: ["Taste cells are replaced regularly", "The tongue grows a new nerve", "The papillae move to another place", "Saliva becomes sweeter"], explain: "Taste cells live only about one to two weeks and are constantly replaced." }
    ]
  },

  /* ===================================================== TOUCH */
  {
    id: "touch", name: "Touch", es: "Tacto", organ: "The Skin", organEs: "La piel",
    objectives: [
      "I can name the three layers of the skin.",
      "I can name four things that skin receptors detect.",
      "I can describe the path of touch: receptor → nerve → spinal cord → brain.",
      "I can explain why some parts of the body are more sensitive."
    ],
    warmup: {
      q: "Touch your desk, your hair and your sleeve. How are they different?",
      qEs: "Toca tu pupitre, tu pelo y tu manga. ¿En qué se diferencian?",
      task: "Close your eyes. A partner puts an object in your hand. Can you guess what it is?",
      taskEs: "Cierra los ojos. Un compañero te pone un objeto en la mano. ¿Adivinas qué es?"
    },
    words: [
      { id: "epidermis", en: "epidermis", es: "epidermis", ipa: "/ˌep.ɪˈdɜːr.mɪs/", def: "The thin outer layer of the skin. It protects the body.", ex: "The epidermis is replaced every few weeks.", note: "💡 epi- = on top of.", spot: true },
      { id: "dermis", en: "dermis", es: "dermis", ipa: "/ˈdɜːr.mɪs/", def: "The middle layer. It contains most receptors, blood vessels, hair follicles and sweat glands.", ex: "Most touch receptors are in the dermis.", note: "✅ Same word in Spanish.", spot: true },
      { id: "hypodermis", en: "hypodermis", es: "hipodermis", ipa: "/ˌhaɪ.poʊˈdɜːr.mɪs/", def: "The deepest layer. It stores fat, keeps you warm and cushions the body.", ex: "The hypodermis protects muscles and bones.", note: "💡 hypo- = below.", spot: true },
      { id: "receptor", en: "sensory receptor", es: "receptor sensorial", ipa: "/ˈsen.sər.i rɪˈsep.tər/", def: "A special nerve ending that detects pressure, vibration, temperature or pain.", ex: "Receptors in my fingers feel the cold ice.", note: "⚠️ 'Sensitive' = sensible. But English 'sensible' = sensato.", spot: true },
      { id: "nerve", en: "nerve", es: "nervio", ipa: "/nɜːrv/", def: "A bundle of fibers that carries signals.", ex: "A nerve carries the signal from my hand to my spinal cord.", note: "⚠️ 'Nervous' = nervioso (an emotion).", spot: true },
      { id: "spinalcord", en: "spinal cord", es: "médula espinal", ipa: "/ˈspaɪ.nəl kɔːrd/", def: "The thick bundle of nerves inside the backbone. It connects the body with the brain.", ex: "Touch signals travel up the spinal cord to the brain.", note: "⚠️ 'Cord' here is médula, not 'cordón'." },
      { id: "pressure", en: "pressure", es: "presión", ipa: "/ˈpreʃ.ər/", def: "The force of something pushing on the skin.", ex: "I feel the pressure of my shoes on my feet.", note: "✅ Cognate: pressure = presión." }
    ],
    path: ["pressure", "receptor", "nerve", "spinalcord", "brain"],
    pathLabels: { pressure: "Touch / heat / pressure", receptor: "Sensory receptor", nerve: "Sensory nerve", spinalcord: "Spinal cord", brain: "Brain" },
    reading: {
      title: "The Path of Touch",
      paragraphs: [
        "Your skin is the largest organ of your body. It has three layers. The outer layer, the [[epidermis|epidermis]], protects your body. The middle layer, the [[dermis|dermis]], contains most of the sensory receptors. The deepest layer, the [[hypodermis|hypodermis]], stores fat and cushions the body.",
        "Different [[receptor|sensory receptors]] detect different things: light touch, [[pressure|pressure]], vibration, heat, cold and pain. Some receptors are very close to the surface; others are deep in the skin.",
        "When you touch something, for example a hot cup, first a receptor detects the heat. Next, it sends a signal along a [[nerve|nerve]]. Then, the signal travels up the [[spinalcord|spinal cord]].",
        "Finally, the signal reaches the brain, which tells you: 'This is hot!' Your fingertips and lips have many more receptors than your back, so they are much more sensitive."
      ],
      checks: [
        { after: 0, q: "Which layer contains most of the sensory receptors?", options: ["The dermis", "The epidermis", "The hypodermis"], explain: "Most receptors are in the dermis, the middle layer." },
        { after: 2, q: "Where does the touch signal go after the nerve?", options: ["Up the spinal cord to the brain", "To the eyes", "To the hypodermis"], explain: "Nerves carry touch signals to the spinal cord, and the spinal cord carries them to the brain." }
      ]
    },
    funfact: "Your skin is your largest organ. An adult's skin weighs about 4 kg!",
    health: {
      problems: [
        { name: "Sunburn", text: "UV light damages the epidermis. Many sunburns increase the risk of skin cancer." },
        { name: "Numbness (neuropathy)", text: "When nerves are damaged (for example by diabetes), a person may not feel pain or temperature in the feet or hands." }
      ],
      care: [
        "Use sunscreen (SPF 30 or more) and a hat in the sun.",
        "Wear gloves in the cold and when you use cleaning chemicals.",
        "Keep cuts clean and covered so they don't get infected."
      ]
    },
    deeper: [
      { name: "Types of receptors", es: "tipos de receptores", text: "Meissner's corpuscles: light touch. Pacinian corpuscles: vibration and deep pressure. Free nerve endings: pain and temperature." },
      { name: "Reflexes", es: "reflejos", text: "If you touch something very hot, the spinal cord can move your hand away before the brain even feels the pain." },
      { name: "Hair follicles and sweat glands", es: "folículos pilosos y glándulas sudoríparas", text: "They are in the dermis. Sweat glands help cool the body; receptors around hair follicles feel when a hair moves." },
      { name: "Two-point discrimination", es: "discriminación de dos puntos", text: "Scientists measure sensitivity by checking the smallest distance at which you feel two points instead of one." }
    ],
    match: [
      ["epidermis", "Thin outer layer that protects the body"],
      ["dermis", "Middle layer with most receptors"],
      ["hypodermis", "Deep layer that stores fat"],
      ["receptor", "Detects pressure, temperature or pain"],
      ["spinalcord", "Carries signals from the nerves to the brain"]
    ],
    cloze: {
      text: "The skin has three layers: the {epidermis}, the dermis and the {hypodermis}. Sensory {receptors} detect pressure, temperature and pain. A {nerve} carries the signal to the {spinal cord} and then to the brain.",
      extra: ["retina", "saliva"]
    },
    experiment: {
      title: "The two-point test",
      type: "steps",
      predict: { q: "Which part of your body is more sensitive: your fingertip or your back?", options: ["Fingertip", "Back", "The same"] },
      steps: [
        "Tape two pencils together so the points are about 1 cm apart.",
        "Your partner closes their eyes. Gently touch their fingertip with one or two points.",
        "Ask: 'One point or two points?' Repeat 5 times.",
        "Repeat on the forearm and on the back. Compare the results."
      ],
      explain: "Fingertips have many receptors very close together, so they can feel two separate points. The back has fewer receptors that are far apart, so two points feel like one."
    },
    frames: [
      "The skin has three layers: ___.",
      "Sensory receptors detect ___.",
      "First, ___. Next, ___. Then, ___. Finally, ___.",
      "My ___ is more sensitive than my ___ because ___."
    ],
    writing: {
      prompt: "Explain how you feel that a cup of hot chocolate is hot. Use first, next, then, finally.",
      promptEs: "Explica cómo sientes que una taza de chocolate está caliente. Usa first, next, then, finally.",
      bank: ["receptors", "dermis", "heat", "nerve", "spinal cord", "brain", "first", "next", "then", "finally"],
      model: "First, sensory receptors in the dermis of my fingers detect the heat of the cup. Next, they send a signal along a nerve. Then, the signal travels up the spinal cord. Finally, it reaches my brain, which tells me that the cup is hot."
    },
    quiz: [
      { level: "Remember", q: "What is the outer layer of the skin called?", options: ["Epidermis", "Dermis", "Hypodermis", "Retina"], explain: "Epi- means 'on top': the epidermis is the outer layer." },
      { level: "Remember", q: "Which layer contains most sensory receptors?", options: ["Dermis", "Epidermis", "Hypodermis", "Cornea"], explain: "Most receptors, blood vessels and glands are in the dermis." },
      { level: "Understand", q: "What can skin receptors detect?", options: ["Pressure, vibration, temperature and pain", "Light and color", "Sound waves", "Odor molecules"], explain: "Skin receptors detect mechanical, thermal and pain stimuli." },
      { level: "Understand", q: "What is the correct path of touch?", options: ["receptor → nerve → spinal cord → brain", "brain → spinal cord → nerve → receptor", "nerve → brain → receptor → spinal cord", "spinal cord → receptor → brain → nerve"], explain: "The stimulus is detected by a receptor, then nerves and the spinal cord carry the signal to the brain." },
      { level: "Apply", q: "Your fingertip can feel two pencil points, but your back feels only one. Why?", options: ["Fingertips have many more receptors close together", "The back has no nerves", "Fingertips have more fat", "The back has no epidermis"], explain: "More receptors close together = more sensitivity." },
      { level: "Apply", q: "What is the main job of the hypodermis?", options: ["To store fat, keep the body warm and cushion it", "To detect light", "To produce saliva", "To carry signals to the brain"], explain: "The hypodermis is mostly fat tissue: insulation, energy storage and protection." }
    ]
  }
];

/* Shared word for paths */
const EXTRA_WORDS = {
  brain: { id: "brain", en: "brain", es: "cerebro", def: "The organ that interprets all the signals from the senses." }
};

/* ---------- Compare table (five senses) ---------- */
const COMPARE = {
  rows: [
    { key: "stimulus", label: "Stimulus", es: "Estímulo", values: { sight: "light", hearing: "sound waves", smell: "odor molecules", taste: "dissolved chemicals", touch: "pressure, temperature, pain" } },
    { key: "organ", label: "Organ", es: "Órgano", values: { sight: "eye", hearing: "ear", smell: "nose", taste: "tongue", touch: "skin" } },
    { key: "receptors", label: "Receptors", es: "Receptores", values: { sight: "rods and cones (retina)", hearing: "hair cells (cochlea)", smell: "olfactory receptors", taste: "taste cells (taste buds)", touch: "sensory receptors (dermis)" } },
    { key: "nerve", label: "Nerve", es: "Nervio", values: { sight: "optic nerve", hearing: "auditory nerve", smell: "olfactory nerve", taste: "taste nerves", touch: "sensory nerves + spinal cord" } }
  ]
};

/* ---------- Final test: integrative questions ---------- */
const FINAL_EXTRA = [
  { level: "Understand", q: "What is the general path for all the senses?", options: ["stimulus → receptor → nerve → brain", "brain → nerve → receptor → stimulus", "receptor → brain → stimulus → nerve", "nerve → stimulus → brain → receptor"], explain: "All senses detect a stimulus with receptors; nerves carry the signals to the brain." },
  { level: "Remember", q: "Where are all sensations finally interpreted?", options: ["In the brain", "In the receptors", "In the nerves", "In the spinal cord"], explain: "Receptors detect, nerves carry, but the brain interprets." },
  { level: "Understand", q: "Which two senses work together to create flavor?", options: ["Taste and smell", "Sight and hearing", "Touch and hearing", "Sight and touch"], explain: "Flavor = taste + smell." },
  { level: "Apply", q: "Rods and cones are to sight as hair cells are to…", options: ["hearing", "smell", "taste", "touch"], explain: "Hair cells in the cochlea are the receptors of hearing." },
  { level: "Understand", q: "Which sense uses the spinal cord to send most of its signals to the brain?", options: ["Touch", "Sight", "Smell", "Hearing"], explain: "Touch signals from the body travel up the spinal cord." },
  { level: "Apply", q: "Which two senses detect chemicals?", options: ["Smell and taste", "Sight and touch", "Hearing and sight", "Touch and hearing"], explain: "Smell detects odor molecules; taste detects chemicals dissolved in saliva." }
];
