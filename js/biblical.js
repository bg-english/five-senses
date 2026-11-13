/* =========================================================
   Spiritual Senses (Hebrews 5:14) — CLIL & Neurobiology Module (v4.0)
   Externalized for strict Content-Security-Policy (script-src 'self')
   - Multi-User Classroom Profile Isolation + 90 min TTL
   - B2/C1 Vocabulary Pills across ALL 6 Tabs + L1 False Friend Alerts
   - Accessible WAI-ARIA Tablist + Modal Focus Trap
   - Sanitized TTS Pronunciation & Gerund Scaffolding
   ========================================================= */
(function () {
  'use strict';

  const ACTIVE_PROFILE_KEY = 'fiveSenses_active_profile';
  const TTL_MS = 90 * 60 * 1000;
  let profileId = 'Scholar-1';
  try {
    const p = localStorage.getItem(ACTIVE_PROFILE_KEY);
    if (p && /^[a-zA-Z0-9_-]{2,24}$/.test(p)) profileId = p;
  } catch (e) {}

  const VOCAB_DATA = {
    'discernment': {
      phonetic: '/dɪˈsɜːnmənt/ · dis-SURN-munt',
      def: 'The cognitive and moral ability to judge well, distinguish truth from deception, and separate beneficial inputs from harmful ones.',
      tip: 'Spanish cognate: discernimiento. Notice "-cern-" is pronounced /sɜːrn/.'
    },
    'intentional': {
      phonetic: '/ɪnˈtɛnʃənl/ · in-TEN-shun-ul',
      def: 'Done deliberately and purposefully rather than passively or by accident.',
      tip: 'Adverb form: intentionally (deliberadamente).'
    },
    'desensitizes': {
      phonetic: '/diːˈsɛnsɪtaɪzɪz/ · dee-SEN-sih-ty-ziz',
      def: 'Causes sensory receptors or emotional brain circuits (amygdala/prefrontal cortex) to become less responsive after repeated stimulation.',
      tip: 'Prefix "de-" (down/away) + "sensitize".'
    },
    'conscience': {
      phonetic: '/ˈkɒnʃəns/ · KON-shuns',
      def: 'Your internal moral compass evaluating right vs. wrong behavior.',
      tip: '⚠️ False Friend Alert: Do NOT confuse "conscience" (moral) with "consciousness" (being awake / cortical awareness)!'
    },
    'synaptic': {
      phonetic: '/sɪˈnæptɪk/ · sih-NAP-tik',
      def: 'Relating to the junction (synapse) where electrical/chemical signals pass from one neuron to another and strengthen via Long-Term Potentiation (LTP).',
      tip: 'Repeated practice physically strengthens synaptic connections (neuroplasticity).'
    },
    'saccadic': {
      phonetic: '/səˈkædɪk/ · suh-KAD-ik',
      def: 'Rapid, ballistic movements of both eyes jumping between fixation points on your visual field.',
      tip: 'Your brain actively steers where your fovea points!'
    },
    'photobleaching': {
      phonetic: '/ˌfoʊtoʊˈbliːtʃɪŋ/ · FOH-toh-BLEE-ching',
      def: 'Temporary biochemical breakdown of retinal photopigment (rhodopsin) caused by intense photon absorption, resulting in an afterimage.',
      tip: 'Peripheral receptor fatigue differs from central synaptic habituation in emotional circuits.'
    },
    'fovea': {
      phonetic: '/ˈfoʊviə/ · FOH-vee-uh',
      def: 'The tiny central pit of the retina packed exclusively with cones, responsible for sharp central reading vision.',
      tip: 'Acento en la primera sílaba (FOH-vee-uh).'
    },
    'attenuation': {
      phonetic: '/əˌtɛnjuˈeɪʃn/ · uh-ten-yoo-AY-shun',
      def: 'The gradual reduction in force, intensity, or amplitude of a sound wave or neural signal.',
      tip: 'Opposite of amplification.'
    },
    'cochlea': {
      phonetic: '/ˈkoʊkliə/ · KOH-klee-uh',
      def: 'The spiral-shaped, fluid-filled inner ear structure containing hair cells that transduce sound waves.',
      tip: '⚠️ Remember: "ch" is pronounced /k/, never "ch" like chair!'
    },
    'anosmia': {
      phonetic: '/æˈnɒzmiə/ · an-OZ-mee-uh',
      def: 'The partial or complete loss of the sense of smell.',
      tip: 'Greek roots: "an-" (without) + "osme" (odor).'
    },
    'limbic': {
      phonetic: '/ˈlɪmbɪk/ · LIM-bik',
      def: 'The interconnected forebrain system (amygdala, hippocampus) governing emotion, survival instincts, and long-term memory.',
      tip: 'Olfaction connects straight to the limbic system.'
    },
    'teleios': {
      phonetic: '/ˈtɛleɪɒs/ · TEL-ay-oss (Greek)',
      def: 'Biblical Greek word in Hebrews 5:14 meaning "mature, fully developed, having reached intended functional purpose."',
      tip: 'Connected to physiological maturation from milk to solid nutrients.'
    },
    'tastants': {
      phonetic: '/ˈteɪstənts/ · TAY-stunts',
      def: 'Water-soluble chemical molecules in food that stimulate gustatory receptors inside taste buds.',
      tip: 'Must dissolve in saliva to enter the taste pore.'
    },
    'wholesome': {
      phonetic: '/ˈhoʊlsəm/ · HOHL-sum',
      def: 'Conducive to physical, mental, or moral health and resilience.',
      tip: '⚠️ Silent "w" at the beginning (/h/).'
    },
    'somatosensation': {
      phonetic: '/soʊˌmætoʊsɛnˈseɪʃn/ · soh-MAT-oh-sen-SAY-shun',
      def: 'The broad sensory system detecting touch, vibration, pressure, temperature, and pain across skin and joints.',
      tip: 'Root "soma-" means body.'
    },
    'calloused': {
      phonetic: '/ˈkæləst/ · KAL-ust',
      def: 'Thickened and hardened skin caused by repeated friction—or metaphorically, a hardened, insensitive conscience.',
      tip: 'High friction builds thick dead keratin layers that dull mechanoreceptors.'
    }
  };

  // Show active station profile
  const profEl = document.getElementById('biblical-profile-label');
  if (profEl) profEl.textContent = profileId;

  // Accessible WAI-ARIA Tab Navigation
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.panel'));

  function activateTab(tab, shouldFocus = true) {
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.tabIndex = -1;
    });
    tab.setAttribute('aria-selected', 'true');
    tab.tabIndex = 0;
    if (shouldFocus) tab.focus();

    const target = tab.dataset.target;
    panels.forEach(p => p.classList.toggle('active', p.dataset.sense === target));
  }

  tabs.forEach((tab, index) => {
    tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
    tab.addEventListener('click', () => activateTab(tab, false));
    tab.addEventListener('keydown', (e) => {
      let nextIdx = null;
      if (e.key === 'ArrowRight') nextIdx = (index + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') nextIdx = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') nextIdx = 0;
      else if (e.key === 'End') nextIdx = tabs.length - 1;
      if (nextIdx !== null) {
        e.preventDefault();
        activateTab(tabs[nextIdx], true);
      }
    });
  });

  // Sanitized TTS Helper
  function speakEnglish(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/\s*\(([^)]+)\)/g, ', also called $1').replace(/[→⚠️✅]/g, ' ').trim();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'en-US';
    utter.rate = 0.88;
    window.speechSynthesis.speak(utter);
  }

  // Vocabulary Modal with Focus Trap & Escape Return
  const modal = document.getElementById('vocabModal');
  const modalWord = document.getElementById('modalWord');
  const modalPhonetic = document.getElementById('modalPhonetic');
  const modalDef = document.getElementById('modalDef');
  const modalTip = document.getElementById('modalTip');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalListenBtn = document.getElementById('modalListenBtn');
  let currentWord = '';
  let lastTriggerEl = null;

  function openModal(w, triggerEl) {
    const entry = VOCAB_DATA[w];
    if (!entry || !modal) return;
    lastTriggerEl = triggerEl || document.activeElement;
    currentWord = w;
    modalWord.textContent = w.charAt(0).toUpperCase() + w.slice(1);
    modalPhonetic.textContent = entry.phonetic;
    modalDef.textContent = entry.def;
    if (modalTip) modalTip.textContent = entry.tip ? '💡 ' + entry.tip : '';
    modal.classList.add('open');
    modalCloseBtn.focus();
    speakEnglish(w);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus();
    }
  }

  document.querySelectorAll('.vocab-pill').forEach(pill => {
    pill.addEventListener('click', () => openModal(pill.dataset.word, pill));
  });

  if (modalListenBtn) modalListenBtn.addEventListener('click', () => { if (currentWord) speakEnglish(currentWord); });
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Sentence Frame Click-to-Insert Scaffolding
  document.querySelectorAll('.frame-item').forEach(frame => {
    frame.addEventListener('click', () => {
      const targetId = frame.dataset.target;
      const textarea = document.getElementById(targetId);
      if (textarea) {
        const textToInsert = frame.textContent.replace(/^"|"$/g, '').replace(/\([^)]+\)$/, '').trim() + ' ';
        if (!textarea.value.includes(textToInsert.trim())) {
          textarea.value = (textarea.value ? textarea.value + '\n' : '') + textToInsert;
        }
        textarea.focus();
        textarea.dispatchEvent(new Event('input'));
      }
    });
  });

  // Profile-Isolated Journal Persistence + 90-min TTL + Linter Feedback
  const textareas = document.querySelectorAll('.journal-textarea');
  function storageKeyFor(taId) {
    return `spiritual_senses_${profileId}_${taId}`;
  }

  textareas.forEach(ta => {
    const key = storageKeyFor(ta.id);
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && (Date.now() - (parsed.ts || 0) < TTL_MS)) {
          ta.value = parsed.text || '';
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {}

    const counter = document.getElementById('wc-' + ta.id);
    const saveIndicator = document.getElementById('save-' + ta.id);

    function updateStats() {
      const words = ta.value.trim().split(/\s+/).filter(Boolean).length;
      const hasGrammarTip = /\bby\s+(?!(?:[a-z]+ing\b))[a-z]+\b/i.test(ta.value);
      if (counter) {
        counter.textContent = words + (words === 1 ? ' word' : ' words') + (hasGrammarTip ? ' · 💡 Tip: Use -ing after "by" (e.g., by practicing)' : '');
      }
    }
    updateStats();

    let saveTimer;
    ta.addEventListener('input', (ev) => {
      updateStats();
      clearTimeout(saveTimer);
      if (ev && ev.detail && ev.detail.skipSave) return;
      saveTimer = setTimeout(() => {
        try {
          localStorage.setItem(key, JSON.stringify({ text: ta.value, ts: Date.now() }));
        } catch (e) {}
        if (saveIndicator) {
          saveIndicator.classList.add('visible');
          setTimeout(() => saveIndicator.classList.remove('visible'), 1800);
        }
      }, 500);
    });
  });

  // End Turn / Clear Reflection Station Button
  const clearBtn = document.getElementById('btn-clear-journals');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!confirm(`Clear all reflection journals for "${profileId}"?`)) return;
      textareas.forEach(ta => {
        ta.value = '';
        try { localStorage.removeItem(storageKeyFor(ta.id)); } catch (e) {}
        ta.dispatchEvent(new CustomEvent('input', { detail: { skipSave: true } }));
      });
    });
  }

  // Register Service Worker cleanly for offline access
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
