/* =========================================================
   The Five Senses — CLIL & Scientific Biology Learning Engine
   Vanilla JS Modular Architecture (WCAG 2.1 AA Compliant)
   - State Persistence (localStorage)
   - Dual-Speed SpeechSynthesis & Web Speech API Recognition
   - 4-Stage Stepper Navigation
   - Interactive Diagram "Test Me" Challenge & Signal Path Animation
   - Dynamic POE Mini-Labs with Live Calibration
   - Real-Time CLIL Writing Coach & Live Validator
   - Bidirectional Active Recall Flashcards & Leitner SRS
   ========================================================= */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. State Management & LocalStorage Persistence
  ------------------------------------------------------------------ */
  const STORAGE_KEY = 'fiveSenses_progress_v3';
  let appState = {
    scores: {},
    activeStages: { sight: 1, hearing: 1, smell: 1, taste: 1, touch: 1 },
    writtenText: {},
    ican: {},
    flashcardSRS: { mastered: [], review: [] },
    scaffolding: 'guided',
    audioSpeed: 0.9
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      appState = Object.assign(appState, JSON.parse(saved));
    }
  } catch (e) {
    console.warn('LocalStorage unavailable:', e);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
    updateTabBadges();
  }

  let currentSenseId = 'sight';
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.sense-panel');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  /* ------------------------------------------------------------------
     2. Speech Synthesis & Speech Recognition (Pronunciation Coach)
  ------------------------------------------------------------------ */
  let currentUtterance = null;
  let isReadingAloud = false;

  function cleanSpokenText(text) {
    return text.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function getBestEnglishVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira'))) ||
           voices.find(v => v.lang.startsWith('en')) || null;
  }

  function speak(text, rate = appState.audioSpeed) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = cleanSpokenText(text);
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = 'en-US';
    utter.rate = rate;
    const voice = getBestEnglishVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  }

  window.speakWord = function (word) {
    speak(word);
  };

  window.speakSentence = function (sentence) {
    speak(sentence, appState.audioSpeed * 0.95);
  };

  window.setAudioSpeed = function (speed) {
    appState.audioSpeed = speed;
    saveState();
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.dataset.speed) === speed);
    });
  };

  window.toggleReadPassage = function (senseId, btnEl) {
    if (!('speechSynthesis' in window)) return;
    const sense = SENSES.find(s => s.id === senseId);
    if (!sense) return;

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      isReadingAloud = false;
      if (btnEl) btnEl.textContent = '🔊 Read Passage Aloud';
      return;
    }

    const plainText = sense.reading.paragraphs
      .map(p => p.replace(/\[\[(.*?)\|(.*?)\]\]/g, '$2'))
      .join('. ');

    window.speechSynthesis.cancel();
    currentUtterance = new SpeechSynthesisUtterance(cleanSpokenText(plainText));
    currentUtterance.lang = 'en-US';
    currentUtterance.rate = appState.audioSpeed;
    const voice = getBestEnglishVoice();
    if (voice) currentUtterance.voice = voice;

    currentUtterance.onstart = () => {
      isReadingAloud = true;
      if (btnEl) btnEl.textContent = '⏹️ Stop Reading';
    };
    currentUtterance.onend = currentUtterance.onerror = () => {
      isReadingAloud = false;
      if (btnEl) btnEl.textContent = '🔊 Read Passage Aloud';
    };

    window.speechSynthesis.speak(currentUtterance);
  };

  /* Web Speech API: Real-Time Pronunciation Coach */
  window.practicePronunciation = function (targetWord, feedbackId, micBtn) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const fb = document.getElementById(feedbackId);
    if (!SpeechRec) {
      if (fb) {
        fb.style.display = 'block';
        fb.style.color = 'var(--muted)';
        fb.textContent = 'ℹ️ Speech Recognition requires Chrome, Edge or Safari. Use 🔊 to practice listening.';
      }
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    if (micBtn) micBtn.classList.add('listening');
    if (fb) {
      fb.style.display = 'block';
      fb.style.color = 'var(--sight)';
      fb.textContent = '🎙️ Listening... Say "' + targetWord + '" now!';
    }

    recognition.onresult = function (event) {
      if (micBtn) micBtn.classList.remove('listening');
      const cleanTarget = targetWord.toLowerCase().replace(/[^a-z]/g, '');
      const spokenAlternatives = Array.from(event.results[0]).map(r => r.transcript.toLowerCase().trim());
      const isMatch = spokenAlternatives.some(s => s.replace(/[^a-z]/g, '').includes(cleanTarget) || cleanTarget.includes(s.replace(/[^a-z]/g, '')));

      if (fb) {
        if (isMatch) {
          fb.style.color = 'var(--correct)';
          fb.textContent = '🌟 Excellent! You pronounced "' + targetWord + '" clearly!';
        } else {
          fb.style.color = 'var(--gold)';
          fb.textContent = '🔄 Heard: "' + spokenAlternatives[0] + '". Try again! Listen with 🔊 first.';
        }
      }
    };

    recognition.onerror = function () {
      if (micBtn) micBtn.classList.remove('listening');
      if (fb) {
        fb.style.color = 'var(--incorrect)';
        fb.textContent = '❌ Microphone error. Please allow mic permissions and try again.';
      }
    };

    recognition.onend = function () {
      if (micBtn) micBtn.classList.remove('listening');
    };

    try {
      recognition.start();
    } catch (e) {
      if (micBtn) micBtn.classList.remove('listening');
    }
  };

  /* ------------------------------------------------------------------
     3. Scaffolding Mode Switcher (Guided A2 vs Immersion B1)
  ------------------------------------------------------------------ */
  window.setScaffoldingMode = function (mode) {
    appState.scaffolding = mode;
    saveState();
    const btnGuided = document.getElementById('btn-scaffold-guided');
    const btnImmersion = document.getElementById('btn-scaffold-immersion');

    if (mode === 'immersion') {
      document.body.classList.add('scaffolding-immersion');
      if (btnGuided) { btnGuided.classList.remove('active'); btnGuided.setAttribute('aria-pressed', 'false'); }
      if (btnImmersion) { btnImmersion.classList.add('active'); btnImmersion.setAttribute('aria-pressed', 'true'); }
    } else {
      document.body.classList.remove('scaffolding-immersion');
      if (btnGuided) { btnGuided.classList.add('active'); btnGuided.setAttribute('aria-pressed', 'true'); }
      if (btnImmersion) { btnImmersion.classList.remove('active'); btnImmersion.setAttribute('aria-pressed', 'false'); }
    }
  };

  /* ------------------------------------------------------------------
     4. Navigation Tabs & Progress Badges
  ------------------------------------------------------------------ */
  function switchTab(targetId, focusTab) {
    currentSenseId = targetId;
    tabButtons.forEach(btn => {
      const isSel = btn.dataset.target === targetId;
      btn.setAttribute('aria-selected', isSel ? 'true' : 'false');
      btn.tabIndex = isSel ? 0 : -1;
      if (isSel && focusTab) btn.focus();
    });

    panels.forEach(p => {
      const active = p.id === 'panel-' + targetId;
      p.classList.toggle('active', active);
    });

    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  tabButtons.forEach((btn, idx) => {
    btn.tabIndex = idx === 0 ? 0 : -1;
    btn.addEventListener('click', () => switchTab(btn.dataset.target, false));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const nextIdx = (idx + dir + tabButtons.length) % tabButtons.length;
        switchTab(tabButtons[nextIdx].dataset.target, true);
      }
    });
  });

  function updateTabBadges() {
    SENSES.forEach(s => {
      const badge = document.getElementById('badge-' + s.id);
      if (!badge) return;
      const score = appState.scores[s.id];
      if (typeof score === 'number') {
        badge.textContent = Math.round(score / s.quiz.length * 100) + '%';
        badge.classList.add('done');
      } else {
        badge.textContent = '0%';
        badge.classList.remove('done');
      }
    });
  }

  /* ------------------------------------------------------------------
     5. Stage Stepper Navigation inside Sense Panels
  ------------------------------------------------------------------ */
  window.goToStage = function (senseId, stageNum) {
    appState.activeStages[senseId] = stageNum;
    saveState();
    const panel = document.getElementById('panel-' + senseId);
    if (!panel) return;

    panel.querySelectorAll('.stage-tab').forEach(tab => {
      tab.classList.toggle('active', parseInt(tab.dataset.stage, 10) === stageNum);
    });

    panel.querySelectorAll('.stage-content').forEach(content => {
      content.classList.toggle('active', parseInt(content.dataset.stage, 10) === stageNum);
    });

    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ------------------------------------------------------------------
     6. Modal Glossary Handler
  ------------------------------------------------------------------ */
  window.openGlossary = function (wordId) {
    let item = null;
    for (const s of SENSES) {
      const found = s.words.find(w => w.id === wordId);
      if (found) { item = found; break; }
    }
    if (!item && EXTRA_WORDS[wordId]) item = EXTRA_WORDS[wordId];
    if (!item) return;

    modalTitle.innerHTML = item.en + ' <span style="font-weight:normal; font-size:0.9rem; color:var(--muted)">' + (item.ipa || '') + '</span>';
    modalBody.innerHTML = `
      <p style="font-size:1.02rem; line-height:1.55; margin-bottom:12px;">${item.def}</p>
      ${item.ex ? `<p style="font-style:italic; border-left:3px solid var(--theme, var(--sight)); padding-left:10px; margin-bottom:12px; color:var(--ink-light);">"${item.ex}"</p>` : ''}
      <p style="font-weight:700; color:var(--theme, var(--sight)); margin-bottom:8px;">Español: ${item.es}</p>
      ${item.note ? `<p style="font-size:0.85rem; background:var(--paper-tint); padding:8px 12px; border-radius:6px; margin-bottom:12px;">${item.note}</p>` : ''}
      <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
        <button class="action-btn" style="padding:6px 14px; font-size:0.88rem;" onclick="speakWord('${item.en.replace(/'/g, "\\'")}')">🔊 Listen Term</button>
        ${item.ex ? `<button class="action-btn" style="padding:6px 14px; font-size:0.88rem; background:var(--muted);" onclick="speakSentence('${item.ex.replace(/'/g, "\\'")}')">🔊 Listen Sentence</button>` : ''}
      </div>
    `;
    modalOverlay.classList.add('open');
    if (modalClose) modalClose.focus();
  };

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      modalOverlay.classList.remove('open');
    }
  });

  /* ------------------------------------------------------------------
     7. Render Sense Panels (Modular 4-Stage Stepper Architecture)
  ------------------------------------------------------------------ */
  function renderSensePanels() {
    SENSES.forEach(sense => {
      const p = document.getElementById('panel-' + sense.id);
      if (!p) return;
      const initialStage = appState.activeStages[sense.id] || 1;

      p.innerHTML = `
        <div class="sense-header">
          <span class="sense-badge">${sense.organ} · ${sense.organEs}</span>
          <h2 class="sense-title">${sense.name} <span style="font-size:1.4rem; color:var(--muted); font-weight:normal;">(${sense.es})</span></h2>
          <div class="cortex-tag">
            <span>🧠 Primary Cortex: <strong>${sense.cortex}</strong></span>
          </div>
        </div>

        <!-- 4-Stage Stepper Navigation Bar -->
        <nav class="stage-nav" aria-label="${sense.name} study stages">
          <button class="stage-tab ${initialStage === 1 ? 'active' : ''}" data-stage="1" onclick="goToStage('${sense.id}', 1)">
            <span>1. Explore &amp; Vocab</span>
            <small>Goals, Terms, Diagram</small>
          </button>
          <button class="stage-tab ${initialStage === 2 ? 'active' : ''}" data-stage="2" onclick="goToStage('${sense.id}', 2)">
            <span>2. Path &amp; Anatomy</span>
            <small>Reading, Health, Deeper</small>
          </button>
          <button class="stage-tab ${initialStage === 3 ? 'active' : ''}" data-stage="3" onclick="goToStage('${sense.id}', 3)">
            <span>3. Practice &amp; Lab</span>
            <small>Sequence, Match, POE Lab</small>
          </button>
          <button class="stage-tab ${initialStage === 4 ? 'active' : ''}" data-stage="4" onclick="goToStage('${sense.id}', 4)">
            <span>4. Produce &amp; Assess</span>
            <small>Writing Coach &amp; Quiz</small>
          </button>
        </nav>

        <!-- STAGE 1: Explore, Goals & Vocabulary -->
        <div class="stage-content ${initialStage === 1 ? 'active' : ''}" data-stage="1" id="stage-${sense.id}-1">
          <!-- Step 1: Objectives & Warm-up -->
          <section class="step-section">
            <div class="step-header">
              <span class="step-num">1</span>
              <h3 class="step-title">Learning Goals &amp; Warm-up Inquiry</h3>
            </div>
            <ul style="margin: 0 0 16px 24px; font-size:0.95rem; color:var(--ink-light); line-height:1.7;">
              ${sense.objectives.map(o => `<li>✅ ${o}</li>`).join('')}
            </ul>
            <div class="warmup-box">
              <p><strong>🤔 Think &amp; Share:</strong> ${sense.warmup.q}</p>
              <p class="es-sub">${sense.warmup.qEs}</p>
              <p style="margin-top:10px;"><strong>👉 30-Second Mini-Action:</strong> ${sense.warmup.task}</p>
              <p class="es-sub">${sense.warmup.taskEs}</p>
            </div>
          </section>

          <!-- Step 2: Key Vocabulary & Pronunciation Coach -->
          <section class="step-section">
            <div class="step-header">
              <span class="step-num">2</span>
              <h3 class="step-title">Key Vocabulary (${sense.words.length} core terms)</h3>
            </div>
            <p style="font-size:0.88rem; color:var(--muted); margin-bottom:14px;">
              💡 <em>Pronunciation tip:</em> Use <strong>🔊</strong> to hear the word, or click <strong>🎙️</strong> to speak into your microphone and receive instant feedback!
            </p>
            <div class="vocab-grid">
              ${sense.words.map((w, wIdx) => `
                <div class="vocab-card">
                  <div class="vocab-top">
                    <span class="vocab-word">${w.en}</span>
                    <div class="vocab-audio-group">
                      <button class="audio-btn" aria-label="Listen to ${w.en}" onclick="speakWord('${w.en.replace(/'/g, "\\'")}')" title="Listen pronunciation">🔊</button>
                      <button class="mic-btn" aria-label="Practice speaking ${w.en}" onclick="practicePronunciation('${w.en.replace(/'/g, "\\'")}', 'speech-fb-${sense.id}-${wIdx}', this)" title="Speak into microphone">🎙️</button>
                    </div>
                  </div>
                  <div class="vocab-ipa">${w.ipa || ''}</div>
                  <div class="vocab-es">${w.es}</div>
                  <div class="vocab-def">${w.def}</div>
                  <div class="vocab-ex">
                    <span>"${w.ex}"</span>
                    <button class="audio-btn" style="flex-shrink:0;" aria-label="Listen example" onclick="speakSentence('${w.ex.replace(/'/g, "\\'")}')" title="Listen sentence">🔊</button>
                  </div>
                  <div id="speech-fb-${sense.id}-${wIdx}" class="speech-feedback" style="display:none; font-size:0.8rem; font-weight:700; margin-top:6px;"></div>
                  ${w.note ? `<div class="vocab-note">${w.note}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Step 3: Interactive Diagram -->
          <section class="step-section">
            <div class="step-header">
              <span class="step-num">3</span>
              <h3 class="step-title">Explore the Anatomical Diagram</h3>
            </div>
            <div class="diagram-card">
              <div class="diagram-toolbar">
                <span style="font-size:0.9rem; font-weight:600; color:var(--muted);" id="diagram-desc-${sense.id}">Click any numbered hotspot to explore its biological function.</span>
                <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                  <button class="action-btn" style="padding:5px 12px; font-size:0.8rem; background:var(--theme);" onclick="animateSignalPath('${sense.id}')">▶️ Animate Signal Path</button>
                  <div class="diagram-mode-toggles">
                    <button class="mode-btn active" data-diagram="${sense.id}" data-mode="explore">Explore Mode</button>
                    <button class="mode-btn" data-diagram="${sense.id}" data-mode="test">Test Me (Challenge)</button>
                  </div>
                </div>
              </div>
              <div id="diagram-challenge-banner-${sense.id}" style="display:none; background:var(--theme); color:#FFF; padding:10px 16px; font-weight:700; font-size:0.92rem; text-align:center;"></div>
              <div class="diagram-stage" id="stage-${sense.id}">
                <svg viewBox="0 0 800 450" class="diagram-svg" role="img" aria-label="${DIAGRAMS[sense.id].title}">
                  ${DIAGRAMS[sense.id].svg}
                </svg>
              </div>
            </div>
            <div class="part-detail-box" id="detail-box-${sense.id}" aria-live="polite">
              <div class="part-detail-title">👆 Click a number on the diagram above</div>
              <div class="part-detail-def">Clicking reveals its anatomical name, Spanish equivalent, auditory pronunciation, and role in sensory transduction.</div>
            </div>
          </section>

          <div class="stage-footer">
            <span style="color:var(--muted); font-size:0.85rem;">Stage 1 of 4 completed</span>
            <button class="action-btn" onclick="goToStage('${sense.id}', 2)">Proceed to Stage 2: Path &amp; Anatomy →</button>
          </div>
        </div>

        <!-- STAGE 2: Reading, Health & Go Deeper -->
        <div class="stage-content ${initialStage === 2 ? 'active' : ''}" data-stage="2" id="stage-${sense.id}-2">
          <!-- Step 4: Scientific Reading -->
          <section class="step-section">
            <div class="step-header">
              <span class="step-num">4</span>
              <h3 class="step-title">${sense.reading.title}</h3>
            </div>
            <div class="reading-block">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
                <span style="font-size:0.85rem; color:var(--muted);">💡 Tip: Click any <strong style="color:var(--theme)">highlighted term</strong> for instant scientific definitions.</span>
                <div style="display:flex; gap:8px; align-items:center;">
                  <button class="action-btn" style="padding:6px 14px; font-size:0.84rem;" id="btn-read-aloud-${sense.id}" onclick="toggleReadPassage('${sense.id}', this)">🔊 Read Passage Aloud</button>
                </div>
              </div>
              ${sense.reading.video ? `
                <div style="margin-bottom:18px;">
                  <video src="${sense.reading.video.src}" controls playsinline preload="metadata" style="width:100%; max-height:360px; border-radius:10px; background:#000;"></video>
                  <p style="font-size:0.84rem; color:var(--muted); margin-top:6px;">${sense.reading.video.caption}</p>
                </div>
              ` : ''}
              ${renderReadingWithInlines(sense)}
            </div>
            <div style="background:var(--theme-tint); border-left:4px solid var(--theme); padding:14px 18px; border-radius:0 10px 10px 0; margin-top:14px;">
              <strong>💡 Did You Know?</strong> ${sense.funfact}
            </div>
          </section>

          <!-- Step 6: Health & Go Deeper -->
          <section class="step-section">
            <div class="step-header">
              <span class="step-num">5</span>
              <h3 class="step-title">Health, Clinical Conditions &amp; Go Deeper</h3>
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
              <div style="background:#FFF; border:1.5px solid var(--line); border-top:4px solid var(--theme); padding:16px 18px; border-radius:12px;">
                <h4 style="color:var(--theme); margin-bottom:10px; font-size:1.1rem;">Common Clinical Conditions</h4>
                <ul style="padding-left:18px; font-size:0.92rem; line-height:1.6;">
                  ${sense.health.problems.map(pr => `<li style="margin-bottom:8px;"><strong>${pr.name}:</strong> ${pr.text}</li>`).join('')}
                </ul>
              </div>
              <div style="background:#FFF; border:1.5px solid var(--line); border-top:4px solid var(--correct); padding:16px 18px; border-radius:12px;">
                <h4 style="color:var(--correct); margin-bottom:10px; font-size:1.1rem;">Preventative Sensory Care</h4>
                <ul style="padding-left:18px; font-size:0.92rem; line-height:1.6;">
                  ${sense.health.care.map(c => `<li style="margin-bottom:8px;">${c}</li>`).join('')}
                </ul>
              </div>
            </div>

            <details class="deeper-details" style="margin-top:18px; background:#FFF; border:1.5px solid var(--line); border-radius:12px; padding:16px 20px;">
              <summary style="font-weight:700; cursor:pointer; color:var(--theme); font-size:1.02rem;">⭐ Go Deeper — Advanced Neuroanatomy &amp; Curiosities (Optional)</summary>
              <div class="deeper-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:12px; margin-top:14px;">
                ${sense.deeper.map(d => `
                  <div style="background:var(--paper-tint); padding:12px 14px; border-radius:8px; font-size:0.9rem;">
                    <strong style="color:var(--theme)">${d.name}</strong> <span style="font-size:0.8rem; color:var(--muted)">(${d.es})</span>
                    <p style="margin-top:4px; line-height:1.45;">${d.text}</p>
                  </div>
                `).join('')}
              </div>
            </details>
          </section>

          <div class="stage-footer">
            <button class="action-btn" style="background:var(--muted);" onclick="goToStage('${sense.id}', 1)">← Back to Stage 1</button>
            <button class="action-btn" onclick="goToStage('${sense.id}', 3)">Proceed to Stage 3: Practice &amp; Lab →</button>
          </div>
        </div>

        <!-- STAGE 3: Active Practice & POE Mini-Lab -->
        <div class="stage-content ${initialStage === 3 ? 'active' : ''}" data-stage="3" id="stage-${sense.id}-3">
          <!-- Step 5: Active Practice -->
          <section class="step-section">
            <div class="step-header">
              <span class="step-num">6</span>
              <h3 class="step-title">Active Practice: Neural Sequence &amp; Matching</h3>
            </div>

            <!-- A. Path Order -->
            <h4 style="margin-bottom:6px; font-size:1.05rem;">A. Order the Neural Pathway (From Stimulus to Brain Cortex)</h4>
            <p style="font-size:0.88rem; color:var(--muted); margin-bottom:12px;">Click chips below to arrange the steps. <em>Click any placed chip to remove it individually.</em></p>
            <div class="path-order-container" id="path-order-${sense.id}">
              <div class="path-slot-row" id="slots-${sense.id}"></div>
              <div class="path-chip-pool" id="pool-${sense.id}"></div>
              <div style="margin-top:12px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                <button class="action-btn" style="padding:7px 16px; font-size:0.88rem;" onclick="checkPathOrder('${sense.id}')">Check Sequence</button>
                <button class="action-btn" style="padding:7px 16px; font-size:0.88rem; background:var(--muted);" onclick="resetPathOrder('${sense.id}')">Reset All</button>
                <span id="path-feedback-${sense.id}" style="font-weight:700; font-size:0.9rem;" aria-live="polite"></span>
              </div>
            </div>

            <!-- B. Match Part & Function -->
            <h4 style="margin:26px 0 6px; font-size:1.05rem;">B. Match Structure &amp; Physiological Function</h4>
            <p style="font-size:0.88rem; color:var(--muted); margin-bottom:12px;">Click a structure on the left, then click its corresponding biological role on the right.</p>
            <div class="match-grid" id="match-grid-${sense.id}"></div>
            <div style="margin-top:10px;">
              <button class="action-btn" style="padding:6px 14px; font-size:0.82rem; background:var(--muted);" onclick="resetMatchPairs('${sense.id}')">🔄 Reset Pairs</button>
            </div>

            <!-- C. Cloze Summary -->
            <h4 style="margin:26px 0 6px; font-size:1.05rem;">C. Complete the Scientific Summary (Cloze)</h4>
            <div class="reading-block" id="cloze-${sense.id}">
              ${renderCloze(sense)}
            </div>
          </section>

          <!-- Step 7: Hands-on POE Mini-Lab -->
          <section class="step-section">
            <div class="step-header">
              <span class="step-num">7</span>
              <h3 class="step-title">Inquiry Mini-Lab: ${sense.experiment.title}</h3>
            </div>
            <div class="experiment-card">
              <!-- Phase 1: Predict -->
              <div class="poe-box">
                <span class="poe-badge">Phase 1: Formulate Your Hypothesis</span>
                <p style="font-weight:700; font-size:0.95rem; margin:8px 0 6px;">${sense.experiment.predict.q}</p>
                <p class="es-sub" style="margin-bottom:10px;">${sense.experiment.predict.qEs}</p>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  ${sense.experiment.predict.options.map((opt, oIdx) => `
                    <label class="quiz-opt-label">
                      <input type="radio" name="poe-predict-${sense.id}" value="${oIdx}" onchange="recordHypothesis('${sense.id}', ${oIdx})">
                      <span>${opt}</span>
                    </label>
                  `).join('')}
                </div>
                <div id="poe-predict-fb-${sense.id}" style="display:none; font-size:0.88rem; font-weight:700; margin-top:10px; color:var(--sight);"></div>
              </div>

              <!-- Phase 2: Try & Observe -->
              <div class="poe-box" style="background:#FFF;">
                <span class="poe-badge" style="background:var(--gold);">Phase 2: Conduct &amp; Observe</span>
                <p style="margin:8px 0 6px;"><strong>Required Materials:</strong> ${sense.experiment.materials.join(' · ')}</p>
                <ol style="margin: 8px 0 16px 22px; font-size:0.93rem; line-height:1.65;">
                  ${sense.experiment.steps.map(s => `<li>${s}</li>`).join('')}
                </ol>

                ${sense.experiment.type === 'blindspot' ? `
                  <div class="calibrator-bar">
                    <label for="bs-calib-${sense.id}"><strong>📐 Distance Calibration:</strong></label>
                    <input type="range" id="bs-calib-${sense.id}" min="120" max="440" value="280" oninput="updateBlindSpotCalibration(this.value, '${sense.id}')" style="flex:1;">
                    <span id="bs-calib-val-${sense.id}" style="font-weight:700; min-width:80px;">~38 cm away</span>
                  </div>
                  <div class="blindspot-stage" id="bs-stage-${sense.id}" aria-label="Optical blind spot stage with a cross on the left and a circle on the right">
                    <span class="blindspot-cross" id="bs-cross-${sense.id}">+</span>
                    <span class="blindspot-dot" id="bs-dot-${sense.id}"></span>
                  </div>
                ` : ''}

                <!-- Observation recording widget -->
                <div style="background:var(--paper-tint); padding:14px; border-radius:8px; margin-top:12px;">
                  <label for="obs-${sense.id}" style="font-weight:700; font-size:0.9rem; display:block; margin-bottom:6px;">${sense.experiment.observe.prompt}</label>
                  <textarea id="obs-${sense.id}" rows="2" style="width:100%; border:1.5px solid var(--line); border-radius:6px; padding:8px; font-family:inherit; font-size:0.9rem;" placeholder="Type your experimental findings here..."></textarea>
                </div>
              </div>

              <!-- Phase 3: Explain -->
              <div style="margin-top:14px;">
                <button class="action-btn" id="btn-reveal-explain-${sense.id}" onclick="revealScientificExplanation('${sense.id}')">🔬 Reveal Scientific Explanation</button>
                <div id="poe-explain-box-${sense.id}" style="display:none; background:var(--paper-tint); border-left:4px solid var(--correct); padding:14px 18px; border-radius:0 8px 8px 0; margin-top:12px; font-size:0.92rem; line-height:1.6;">
                  <strong>Scientific Explanation:</strong> ${sense.experiment.explain}
                </div>
              </div>
            </div>
          </section>

          <div class="stage-footer">
            <button class="action-btn" style="background:var(--muted);" onclick="goToStage('${sense.id}', 2)">← Back to Stage 2</button>
            <button class="action-btn" onclick="goToStage('${sense.id}', 4)">Proceed to Stage 4: Produce &amp; Assess →</button>
          </div>
        </div>

        <!-- STAGE 4: Produce & Assess -->
        <div class="stage-content ${initialStage === 4 ? 'active' : ''}" data-stage="4" id="stage-${sense.id}-4">
          <!-- Step 8: CLIL Writing Coach -->
          <section class="step-section">
            <div class="step-header">
              <span class="step-num">8</span>
              <h3 class="step-title">Express It in English (CLIL Writing Coach)</h3>
            </div>
            <div class="writing-card">
              <h4 style="margin-bottom:6px; font-size:1.05rem;">Useful Academic Sentence Frames:</h4>
              <ul style="padding-left:20px; font-size:0.92rem; line-height:1.65; margin-bottom:14px; color:var(--ink-light);">
                ${sense.frames.map(f => `<li><code>${f}</code></li>`).join('')}
              </ul>

              <h4 style="margin-top:14px; font-size:1.05rem;">Writing Task:</h4>
              <p style="margin-bottom:4px; font-weight:600;">${sense.writing.prompt}</p>
              <p class="es-sub" style="margin-bottom:14px;">${sense.writing.promptEs}</p>

              <!-- Live Interactive Chip Trays -->
              <div style="margin-bottom:12px;">
                <strong style="font-size:0.85rem; color:var(--muted);">1. Anatomical Word Bank (Target: Use at least 4):</strong>
                <div class="chips-tray" id="bank-tray-${sense.id}">
                  ${sense.writing.bank.map(w => `<span class="coach-chip" data-word="${w.toLowerCase()}">${w}</span>`).join('')}
                </div>
              </div>

              <div style="margin-bottom:12px;">
                <strong style="font-size:0.85rem; color:var(--muted);">2. Scientific CALP Verbs:</strong>
                <div class="chips-tray" id="verb-tray-${sense.id}">
                  ${sense.writing.verbs.map(v => `<span class="coach-chip" data-word="${v.toLowerCase()}">${v}</span>`).join('')}
                </div>
              </div>

              <div style="margin-bottom:14px;">
                <strong style="font-size:0.85rem; color:var(--muted);">3. Sequence Connectors:</strong>
                <div class="chips-tray" id="conn-tray-${sense.id}">
                  ${sense.writing.connectors.map(c => `<span class="coach-chip" data-word="${c.toLowerCase()}">${c}</span>`).join('')}
                </div>
              </div>

              <div style="position:relative;">
                <textarea id="write-${sense.id}" rows="5" aria-label="Scientific writing response for ${sense.name}" style="width:100%; border:1.5px solid var(--line); border-radius:10px; padding:12px; font-family:inherit; font-size:0.95rem; line-height:1.6;" placeholder="Begin with: Initially / First, light reflected from the..." oninput="handleWritingInput('${sense.id}')"></textarea>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; flex-wrap:wrap; gap:8px;">
                  <span id="write-count-${sense.id}" style="font-size:0.84rem; font-weight:700; color:var(--muted);">Words: 0 | Term score: 0/4</span>
                  <div style="display:flex; gap:8px;">
                    <button class="action-btn" style="padding:6px 14px; font-size:0.85rem;" onclick="validateWritingRubric('${sense.id}')">Validate My Paragraph</button>
                    <button class="mic-btn" style="padding:6px 12px; font-size:0.85rem; border:1px solid var(--line);" onclick="practicePronunciation(document.getElementById('write-${sense.id}').value, 'speech-fb-write-${sense.id}', this)" title="Read your paragraph aloud into microphone">🎙️ Read Aloud</button>
                  </div>
                </div>
                <div id="speech-fb-write-${sense.id}" style="display:none; font-size:0.85rem; margin-top:6px;"></div>
                <div id="write-feedback-${sense.id}" style="display:none; margin-top:12px; font-size:0.92rem; padding:12px; border-radius:8px;"></div>
              </div>

              <details id="model-answer-details-${sense.id}" style="margin-top:14px; font-size:0.92rem;">
                <summary style="cursor:pointer; font-weight:700; color:var(--theme);">👀 Compare with Scientific Model Answer</summary>
                <div style="padding:14px; background:var(--theme-tint); border-left:4px solid var(--theme); border-radius:6px; margin-top:8px; line-height:1.65;">
                  "${sense.writing.model}"
                </div>
              </details>
            </div>
          </section>

          <!-- Step 9: Formative Assessment Quiz -->
          <section class="step-section quiz-section" id="quiz-${sense.id}">
            <h3 style="margin-bottom:6px; font-size:1.35rem;">9. Formative Mastery Assessment (${sense.quiz.length} Questions)</h3>
            <p style="font-size:0.88rem; color:var(--muted); margin-bottom:16px;">Questions evaluate cognitive depth from <em>Remember &amp; Understand</em> up to <em>Analyze &amp; Evaluate</em>.</p>
            <div class="quiz-container">
              ${sense.quiz.map((q, qIdx) => `
                <div class="quiz-question-card" data-qidx="${qIdx}" id="quiz-${sense.id}-q${qIdx}">
                  <span class="quiz-level-tag">${q.level}</span>
                  <div class="quiz-q-title">${qIdx + 1}. ${q.q}</div>
                  <div class="quiz-opts">
                    ${shuffleArray(q.options.map((opt, oidx) => ({ text: opt, isCorrect: oidx === 0 }))).map(o => `
                      <label class="quiz-opt-label">
                        <input type="radio" name="q-${sense.id}-${qIdx}" data-correct="${o.isCorrect ? '1' : '0'}">
                        <span>${o.text}</span>
                      </label>
                    `).join('')}
                  </div>
                  <div class="quiz-feedback">${q.explain}</div>
                </div>
              `).join('')}
            </div>
            <div style="display:flex; align-items:center; gap:16px; margin-top:18px; flex-wrap:wrap;">
              <button class="action-btn" onclick="checkQuiz('${sense.id}')">Submit Answers</button>
              <span id="quiz-score-${sense.id}" style="font-weight:700; font-size:1.05rem;" aria-live="polite"></span>
            </div>

            <!-- Self-reflection Checklist -->
            <div class="ican-box" style="margin-top:24px; background:#FFF; border:1.5px solid var(--line); border-radius:12px; padding:18px 22px;">
              <h4 style="margin-bottom:8px; font-size:1.05rem;">🎯 Self-Assessment ("I can..." Checklist)</h4>
              ${sense.objectives.map((o, i) => `
                <div class="ican-row" style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:8px 0; border-bottom:1px dashed var(--line); flex-wrap:wrap;">
                  <span style="font-size:0.9rem; flex:1; min-width:240px;">${o}</span>
                  <div style="display:flex; gap:10px;">
                    <label style="font-size:0.85rem; cursor:pointer;"><input type="radio" name="ican-${sense.id}-${i}" value="1" onchange="recordICan('${sense.id}', ${i}, 1)"> 😟 Not yet</label>
                    <label style="font-size:0.85rem; cursor:pointer;"><input type="radio" name="ican-${sense.id}-${i}" value="2" onchange="recordICan('${sense.id}', ${i}, 2)"> 🙂 Developing</label>
                    <label style="font-size:0.85rem; cursor:pointer;"><input type="radio" name="ican-${sense.id}-${i}" value="3" onchange="recordICan('${sense.id}', ${i}, 3)"> 😎 Mastered!</label>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <div class="stage-footer">
            <button class="action-btn" style="background:var(--muted);" onclick="goToStage('${sense.id}', 3)">← Back to Stage 3</button>
            <button class="action-btn" onclick="switchTab('compare', true)">Proceed to Synthesis: Compare All 5 →</button>
          </div>
        </div>
      `;

      initDiagram(sense);
      initPathOrder(sense);
      initMatchPairs(sense);
      restoreWritingAndICan(sense.id);
    });
  }

  function renderReadingWithInlines(sense) {
    let html = '';
    sense.reading.paragraphs.forEach((pText, idx) => {
      const parsed = pText.replace(/\[\[(.*?)\|(.*?)\]\]/g, (m, id, label) => {
        return `<a class="glossary-term" href="javascript:void(0)" onclick="openGlossary('${id}')">${label}</a>`;
      });
      html += `<p>${parsed}</p>`;

      const check = sense.reading.checks && sense.reading.checks.find(c => c.after === idx);
      if (check) {
        const shuffled = shuffleArray(check.options.map((opt, oidx) => ({ text: opt, isCorrect: oidx === 0 })));
        html += `
          <div class="reading-check-card" id="rcheck-${sense.id}-${idx}">
            <div class="reading-check-q">❓ Quick Check: ${check.q}</div>
            <div class="reading-check-opts">
              ${shuffled.map(o => `
                <label class="reading-check-opt">
                  <input type="radio" name="rc-${sense.id}-${idx}" data-correct="${o.isCorrect ? '1' : '0'}" onchange="checkInlineQuestion('${sense.id}', ${idx}, this, '${check.explain.replace(/'/g, "\\'")}')">
                  <span>${o.text}</span>
                </label>
              `).join('')}
            </div>
            <div id="rc-feedback-${sense.id}-${idx}" style="font-size:0.88rem; margin-top:8px; display:none; font-weight:700;" aria-live="polite"></div>
          </div>
        `;
      }
    });
    return html;
  }

  window.checkInlineQuestion = function (senseId, idx, input, explain) {
    const feedback = document.getElementById('rc-feedback-' + senseId + '-' + idx);
    if (!feedback) return;
    feedback.style.display = 'block';
    if (input.dataset.correct === '1') {
      feedback.style.color = 'var(--correct)';
      feedback.textContent = '✅ Correct! ' + explain;
    } else {
      feedback.style.color = 'var(--incorrect)';
      feedback.textContent = '❌ Not quite. ' + explain;
    }
  };

  /* ------------------------------------------------------------------
     8. Diagram Controller: Explore, Test-Me Challenge & Pulse Animation
  ------------------------------------------------------------------ */
  const diagramChallengeState = {};

  function initDiagram(sense) {
    const stage = document.getElementById('stage-' + sense.id);
    if (!stage) return;
    const hotspots = DIAGRAMS[sense.id].hotspots;
    const detailBox = document.getElementById('detail-box-' + sense.id);
    diagramChallengeState[sense.id] = { mode: 'explore', currentTarget: null, score: 0 };

    hotspots.forEach((hs, idx) => {
      const wObj = sense.words.find(w => w.id === hs.id);
      const btn = document.createElement('button');
      btn.className = 'diagram-hotspot';
      btn.style.left = (hs.x / 800 * 100) + '%';
      btn.style.top = (hs.y / 450 * 100) + '%';
      btn.textContent = idx + 1;
      btn.setAttribute('aria-label', 'Part ' + (idx + 1) + ': ' + (wObj ? wObj.en : hs.id));
      btn.dataset.partId = hs.id;

      const pin = document.createElement('div');
      pin.className = 'diagram-label-pin';
      pin.style.left = (hs.lx / 800 * 100) + '%';
      pin.style.top = (hs.ly / 450 * 100) + '%';
      pin.textContent = (idx + 1) + '. ' + (wObj ? wObj.en : hs.id);
      pin.id = 'pin-' + sense.id + '-' + hs.id;

      btn.addEventListener('click', () => {
        handleHotspotClick(sense, hs, btn, idx, wObj);
      });

      stage.appendChild(btn);
      stage.appendChild(pin);
    });

    const modeBtns = document.querySelectorAll('.mode-btn[data-diagram="' + sense.id + '"]');
    modeBtns.forEach(b => {
      b.addEventListener('click', () => {
        modeBtns.forEach(mb => mb.classList.remove('active'));
        b.classList.add('active');
        setDiagramMode(sense.id, b.dataset.mode);
      });
    });
  }

  function setDiagramMode(senseId, mode) {
    const stage = document.getElementById('stage-' + senseId);
    const pins = stage.querySelectorAll('.diagram-label-pin');
    const desc = document.getElementById('diagram-desc-' + senseId);
    const banner = document.getElementById('diagram-challenge-banner-' + senseId);
    diagramChallengeState[senseId].mode = mode;

    if (mode === 'test') {
      pins.forEach(p => p.style.display = 'none');
      if (banner) banner.style.display = 'block';
      if (desc) desc.textContent = 'Challenge Mode active! Find the requested structure.';
      pickNextDiagramChallengeTarget(senseId);
    } else {
      pins.forEach(p => p.style.display = 'block');
      if (banner) banner.style.display = 'none';
      if (desc) desc.textContent = 'Explore mode: Click any number to explore its biological function.';
      stage.querySelectorAll('.diagram-hotspot').forEach(h => h.classList.remove('correct-hit', 'incorrect-hit'));
    }
  }

  function pickNextDiagramChallengeTarget(senseId) {
    const sense = SENSES.find(s => s.id === senseId);
    const hotspots = DIAGRAMS[senseId].hotspots;
    const randomHs = hotspots[Math.floor(Math.random() * hotspots.length)];
    const wObj = sense.words.find(w => w.id === randomHs.id);
    diagramChallengeState[senseId].currentTarget = randomHs.id;

    const banner = document.getElementById('diagram-challenge-banner-' + senseId);
    if (banner && wObj) {
      banner.innerHTML = `
        <span>🎯 Target: Click <strong>${wObj.en}</strong> (${wObj.def})</span>
        <button class="audio-btn" style="color:#FFF; margin-left:8px;" onclick="speakWord('${wObj.en.replace(/'/g, "\\'")}')">🔊</button>
      `;
    }
  }

  function handleHotspotClick(sense, hs, btn, idx, wObj) {
    const stage = document.getElementById('stage-' + sense.id);
    const detailBox = document.getElementById('detail-box-' + sense.id);
    const state = diagramChallengeState[sense.id];

    if (state.mode === 'test') {
      if (hs.id === state.currentTarget) {
        btn.classList.add('correct-hit');
        detailBox.innerHTML = `
          <div class="part-detail-title" style="color:var(--correct);">🎉 Correct! ${wObj.en}</div>
          <div class="part-detail-def">${wObj.def}</div>
        `;
        setTimeout(() => {
          btn.classList.remove('correct-hit');
          pickNextDiagramChallengeTarget(sense.id);
        }, 1500);
      } else {
        btn.classList.add('incorrect-hit');
        detailBox.innerHTML = `
          <div class="part-detail-title" style="color:var(--incorrect);">❌ Not quite!</div>
          <div class="part-detail-def">You clicked <strong>${wObj.en}</strong>. Look for: <em>${state.currentTarget}</em>.</div>
        `;
        setTimeout(() => btn.classList.remove('incorrect-hit'), 900);
      }
      return;
    }

    stage.querySelectorAll('.diagram-hotspot').forEach(h => h.classList.remove('active'));
    btn.classList.add('active');

    if (wObj) {
      detailBox.innerHTML = `
        <div class="part-detail-title">
          <span>${idx + 1}. ${wObj.en}</span>
          <span style="font-size:0.9rem; font-weight:normal; color:var(--muted)">(${wObj.es})</span>
          <button class="audio-btn" aria-label="Listen to ${wObj.en}" onclick="speakWord('${wObj.en.replace(/'/g, "\\'")}')">🔊</button>
          <button class="mic-btn" aria-label="Practice ${wObj.en}" onclick="practicePronunciation('${wObj.en.replace(/'/g, "\\'")}', 'speech-fb-diag-${sense.id}', this)">🎙️</button>
        </div>
        <div class="part-detail-def">${wObj.def}</div>
        <div style="font-style:italic; font-size:0.9rem; margin-top:6px; color:var(--ink-light);">"${wObj.ex}"</div>
        <div id="speech-fb-diag-${sense.id}" style="display:none; margin-top:6px;"></div>
      `;
    }
  }

  window.animateSignalPath = function (senseId) {
    const stage = document.getElementById('stage-' + senseId);
    if (!stage) return;
    const pulsePath = stage.querySelector('.signal-pulse-path');
    if (!pulsePath) return;

    pulsePath.classList.add('animating');
    setTimeout(() => {
      pulsePath.classList.remove('animating');
    }, 4500);
  };

  /* ------------------------------------------------------------------
     9. Path Ordering with Individual Chip Removal & Diagnostic Feedback
  ------------------------------------------------------------------ */
  const pathState = {};

  function initPathOrder(sense) {
    pathState[sense.id] = [];
    const pool = document.getElementById('pool-' + sense.id);
    const slots = document.getElementById('slots-' + sense.id);
    if (!pool || !slots) return;

    slots.innerHTML = '<span style="color:var(--muted); font-size:0.85rem;">Click chips below to arrange the steps...</span>';
    pool.innerHTML = '';

    const shuffled = shuffleArray([...sense.path]);
    shuffled.forEach(stepId => {
      const chip = document.createElement('button');
      chip.className = 'path-chip';
      chip.id = 'pchip-' + sense.id + '-' + stepId;
      chip.dataset.step = stepId;
      chip.textContent = sense.pathLabels[stepId] || stepId;
      chip.onclick = () => {
        if (pathState[sense.id].includes(stepId)) return;
        pathState[sense.id].push(stepId);
        chip.classList.add('placed');
        renderSlots(sense.id);
      };
      pool.appendChild(chip);
    });
  }

  function renderSlots(senseId) {
    const sense = SENSES.find(s => s.id === senseId);
    const slots = document.getElementById('slots-' + senseId);
    slots.innerHTML = '';

    if (pathState[senseId].length === 0) {
      slots.innerHTML = '<span style="color:var(--muted); font-size:0.85rem;">Click chips below to arrange the steps...</span>';
      return;
    }

    pathState[senseId].forEach((stepId, idx) => {
      const chip = document.createElement('button');
      chip.className = 'path-slot-chip';
      chip.innerHTML = `${idx + 1}. ${sense.pathLabels[stepId] || stepId} <span style="font-size:0.75rem; margin-left:4px;">✕</span>`;
      chip.title = 'Click to remove this step';
      chip.onclick = () => {
        removeStepFromSlots(senseId, stepId);
      };
      slots.appendChild(chip);
    });
  }

  function removeStepFromSlots(senseId, stepId) {
    pathState[senseId] = pathState[senseId].filter(id => id !== stepId);
    const poolChip = document.getElementById('pchip-' + senseId + '-' + stepId);
    if (poolChip) poolChip.classList.remove('placed');
    renderSlots(senseId);
    const fb = document.getElementById('path-feedback-' + senseId);
    if (fb) fb.textContent = '';
  }

  window.resetPathOrder = function (senseId) {
    pathState[senseId] = [];
    const pool = document.getElementById('pool-' + senseId);
    if (pool) pool.querySelectorAll('.path-chip').forEach(c => c.classList.remove('placed'));
    const slots = document.getElementById('slots-' + senseId);
    if (slots) slots.innerHTML = '<span style="color:var(--muted); font-size:0.85rem;">Click chips below to arrange the steps...</span>';
    const fb = document.getElementById('path-feedback-' + senseId);
    if (fb) fb.textContent = '';
  };

  window.checkPathOrder = function (senseId) {
    const sense = SENSES.find(s => s.id === senseId);
    const cur = pathState[senseId];
    const fb = document.getElementById('path-feedback-' + senseId);
    const slots = document.getElementById('slots-' + senseId);
    const slotChips = slots.querySelectorAll('.path-slot-chip');

    if (cur.length < sense.path.length) {
      fb.style.color = 'var(--incorrect)';
      fb.textContent = `Please place all ${sense.path.length} steps first (${cur.length}/${sense.path.length}).`;
      return;
    }

    let allCorrect = true;
    cur.forEach((stepId, idx) => {
      const isCorrectStep = stepId === sense.path[idx];
      if (slotChips[idx]) {
        slotChips[idx].classList.toggle('correct-step', isCorrectStep);
        slotChips[idx].classList.toggle('wrong-step', !isCorrectStep);
      }
      if (!isCorrectStep) allCorrect = false;
    });

    if (allCorrect) {
      fb.style.color = 'var(--correct)';
      fb.textContent = '🎉 Perfect sequence! From stimulus energy to cortical perception.';
    } else {
      fb.style.color = 'var(--incorrect)';
      fb.textContent = '❌ Some steps are out of order. Click the red chips to remove and reorder!';
    }
  };

  /* ------------------------------------------------------------------
     10. Match Pairs Activity with Shuffled Columns and Shake Animation
  ------------------------------------------------------------------ */
  function initMatchPairs(sense) {
    const grid = document.getElementById('match-grid-' + sense.id);
    if (!grid) return;
    grid.innerHTML = '';

    const colParts = document.createElement('div');
    colParts.style.display = 'flex';
    colParts.style.flexDirection = 'column';
    colParts.style.gap = '8px';

    const colDefs = document.createElement('div');
    colDefs.style.display = 'flex';
    colDefs.style.flexDirection = 'column';
    colDefs.style.gap = '8px';

    let selectedPart = null;
    let selectedDef = null;

    const parts = shuffleArray(sense.match.map(m => {
      const w = sense.words.find(word => word.id === m[0]);
      return { id: m[0], label: w ? w.en : m[0] };
    }));
    const defs = shuffleArray(sense.match.map(m => ({ id: m[0], text: m[1] })));

    parts.forEach(p => {
      const item = document.createElement('button');
      item.className = 'match-item';
      item.textContent = p.label;
      item.onclick = () => {
        colParts.querySelectorAll('.match-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        selectedPart = p.id;
        checkPair();
      };
      colParts.appendChild(item);
    });

    defs.forEach(d => {
      const item = document.createElement('button');
      item.className = 'match-item';
      item.textContent = d.text;
      item.onclick = () => {
        colDefs.querySelectorAll('.match-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        selectedDef = d.id;
        checkPair();
      };
      colDefs.appendChild(item);
    });

    function checkPair() {
      if (!selectedPart || !selectedDef) return;
      const pBtn = Array.from(colParts.children).find(b => b.classList.contains('selected'));
      const dBtn = Array.from(colDefs.children).find(b => b.classList.contains('selected'));

      if (selectedPart === selectedDef) {
        if (pBtn && dBtn) {
          pBtn.classList.remove('selected');
          pBtn.classList.add('paired');
          pBtn.innerHTML = '✅ ' + pBtn.textContent;
          dBtn.classList.remove('selected');
          dBtn.classList.add('paired');
        }
      } else {
        if (pBtn) pBtn.classList.add('shake');
        if (dBtn) dBtn.classList.add('shake');
        setTimeout(() => {
          if (pBtn) pBtn.classList.remove('selected', 'shake');
          if (dBtn) dBtn.classList.remove('selected', 'shake');
        }, 400);
      }
      selectedPart = null;
      selectedDef = null;
    }

    grid.appendChild(colParts);
    grid.appendChild(colDefs);
  }

  window.resetMatchPairs = function (senseId) {
    const sense = SENSES.find(s => s.id === senseId);
    if (sense) initMatchPairs(sense);
  };

  /* ------------------------------------------------------------------
     11. Cloze Summary with Tap-to-Fill Word Bank
  ------------------------------------------------------------------ */
  function renderCloze(sense) {
    let text = sense.cloze.text;
    const answers = [];
    let gapIndex = 0;

    const parsed = text.replace(/\{(.*?)\}/g, (m, word) => {
      answers.push(word);
      const html = `<input type="text" class="cloze-input" id="cloze-inp-${sense.id}-${gapIndex}" data-ans="${word.toLowerCase()}" aria-label="Missing gap ${gapIndex + 1}" style="width:140px; padding:4px 8px; font-weight:700; border:1.5px solid var(--line); border-radius:6px; text-align:center;">`;
      gapIndex++;
      return html;
    });

    const bank = shuffleArray([...answers, ...(sense.cloze.extra || [])]);

    return `
      <div class="cloze-bank">
        <strong style="font-size:0.85rem; color:var(--muted); margin-right:6px;">Tap-to-Fill Word Bank:</strong>
        ${bank.map(w => `<button class="cloze-chip-btn" onclick="fillNextClozeGap('${sense.id}', '${w}')">${w}</button>`).join('')}
      </div>
      <p style="line-height:2.2; font-size:1.02rem;">${parsed}</p>
      <div style="margin-top:14px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
        <button class="action-btn" style="padding:6px 16px; font-size:0.88rem;" onclick="checkCloze('${sense.id}')">Check Words</button>
        <button class="action-btn" style="padding:6px 14px; font-size:0.88rem; background:var(--muted);" onclick="resetCloze('${sense.id}')">Clear</button>
        <span id="cloze-fb-${sense.id}" style="font-weight:700; font-size:0.92rem;" aria-live="polite"></span>
      </div>
    `;
  }

  window.fillNextClozeGap = function (senseId, word) {
    const wrap = document.getElementById('cloze-' + senseId);
    if (!wrap) return;
    const inputs = wrap.querySelectorAll('.cloze-input');
    for (const inp of inputs) {
      if (!inp.value.trim()) {
        inp.value = word;
        inp.focus();
        break;
      }
    }
  };

  window.resetCloze = function (senseId) {
    const wrap = document.getElementById('cloze-' + senseId);
    if (!wrap) return;
    wrap.querySelectorAll('.cloze-input').forEach(inp => {
      inp.value = '';
      inp.style.borderColor = 'var(--line)';
      inp.style.backgroundColor = '#FFF';
    });
    const fb = document.getElementById('cloze-fb-' + senseId);
    if (fb) fb.textContent = '';
  };

  window.checkCloze = function (senseId) {
    const wrap = document.getElementById('cloze-' + senseId);
    if (!wrap) return;
    const inputs = wrap.querySelectorAll('.cloze-input');
    let correct = 0;

    inputs.forEach(inp => {
      const cleanVal = inp.value.trim().toLowerCase().replace(/\s+/g, ' ');
      if (cleanVal === inp.dataset.ans) {
        inp.style.borderColor = 'var(--correct)';
        inp.style.backgroundColor = 'var(--correct-tint)';
        correct++;
      } else {
        inp.style.borderColor = 'var(--incorrect)';
        inp.style.backgroundColor = 'var(--incorrect-tint)';
      }
    });

    const fb = document.getElementById('cloze-fb-' + senseId);
    if (correct === inputs.length) {
      fb.style.color = 'var(--correct)';
      fb.textContent = `🎉 Perfect! All ${correct}/${inputs.length} terms correctly placed.`;
    } else {
      fb.style.color = 'var(--incorrect)';
      fb.textContent = `${correct}/${inputs.length} correct. Check the highlighted red gaps!`;
    }
  };

  /* ------------------------------------------------------------------
     12. Mini-Labs: Predict - Observe - Explain (POE) Logic
  ------------------------------------------------------------------ */
  window.recordHypothesis = function (senseId, optIndex) {
    const sense = SENSES.find(s => s.id === senseId);
    const fb = document.getElementById('poe-predict-fb-' + senseId);
    if (!sense || !fb) return;

    fb.style.display = 'block';
    fb.innerHTML = '✅ Hypothesis recorded! Now conduct the experiment below to test your prediction.';
  };

  window.updateBlindSpotCalibration = function (val, senseId) {
    const cross = document.getElementById('bs-cross-' + senseId);
    const dot = document.getElementById('bs-dot-' + senseId);
    const label = document.getElementById('bs-calib-val-' + senseId);
    const stage = document.getElementById('bs-stage-' + senseId);
    if (!stage || !dot) return;

    const separationPx = parseInt(val, 10);
    dot.style.marginLeft = separationPx + 'px';
    const estimatedDistanceCm = Math.round(separationPx * 0.12);
    if (label) label.textContent = `~${estimatedDistanceCm} cm away`;
  };

  window.revealScientificExplanation = function (senseId) {
    const explainBox = document.getElementById('poe-explain-box-' + senseId);
    if (!explainBox) return;
    explainBox.style.display = 'block';
    explainBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  /* ------------------------------------------------------------------
     13. CLIL Writing Coach: Live Chip Validator
  ------------------------------------------------------------------ */
  window.handleWritingInput = function (senseId) {
    const textarea = document.getElementById('write-' + senseId);
    if (!textarea) return;
    const text = textarea.value;
    appState.writtenText[senseId] = text;
    saveState();

    const lowerText = text.toLowerCase();
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    // Validate Word Bank
    let bankScore = 0;
    const bankTray = document.getElementById('bank-tray-' + senseId);
    if (bankTray) {
      bankTray.querySelectorAll('.coach-chip').forEach(chip => {
        const target = chip.dataset.word;
        const isUsed = lowerText.includes(target);
        chip.classList.toggle('used', isUsed);
        if (isUsed) bankScore++;
      });
    }

    // Validate Verbs
    const verbTray = document.getElementById('verb-tray-' + senseId);
    if (verbTray) {
      verbTray.querySelectorAll('.coach-chip').forEach(chip => {
        chip.classList.toggle('used', lowerText.includes(chip.dataset.word));
      });
    }

    // Validate Connectors
    const connTray = document.getElementById('conn-tray-' + senseId);
    if (connTray) {
      connTray.querySelectorAll('.coach-chip').forEach(chip => {
        chip.classList.toggle('used', lowerText.includes(chip.dataset.word));
      });
    }

    const countEl = document.getElementById('write-count-' + senseId);
    if (countEl) {
      countEl.textContent = `Words: ${wordCount} | Anatomical terms: ${bankScore}/4`;
    }
  };

  window.validateWritingRubric = function (senseId) {
    const textarea = document.getElementById('write-' + senseId);
    const fb = document.getElementById('write-feedback-' + senseId);
    const details = document.getElementById('model-answer-details-' + senseId);
    if (!textarea || !fb) return;

    const text = textarea.value.trim();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const lower = text.toLowerCase();

    if (words.length < 25) {
      fb.style.display = 'block';
      fb.style.background = 'var(--incorrect-tint)';
      fb.style.color = '#7F1D1D';
      fb.innerHTML = `⚠️ Your explanation is currently <strong>${words.length} words</strong>. Expand your paragraph to at least 25-30 words to fully describe the neural pathway!`;
      return;
    }

    const sense = SENSES.find(s => s.id === senseId);
    let bankCount = 0;
    sense.writing.bank.forEach(w => { if (lower.includes(w.toLowerCase())) bankCount++; });

    let connCount = 0;
    sense.writing.connectors.forEach(c => { if (lower.includes(c.toLowerCase())) connCount++; });

    fb.style.display = 'block';
    if (bankCount >= 3 && connCount >= 2) {
      fb.style.background = 'var(--correct-tint)';
      fb.style.color = '#14532D';
      fb.innerHTML = `🌟 <strong>Proficient CLIL Explanation!</strong> Excellent use of scientific terminology (${bankCount} terms) and sequence connectors (${connCount} connectors). Model answer unlocked below!`;
      if (details) details.open = true;
    } else {
      fb.style.background = 'var(--gold-tint)';
      fb.style.color = '#78350F';
      fb.innerHTML = `👍 Good draft (${words.length} words)! To reach mastery, include at least <strong>${Math.max(0, 3 - bankCount)} more key term(s)</strong> and <strong>${Math.max(0, 2 - connCount)} more connector(s)</strong> from the trays above.`;
    }
  };

  function restoreWritingAndICan(senseId) {
    if (appState.writtenText[senseId]) {
      const textarea = document.getElementById('write-' + senseId);
      if (textarea) {
        textarea.value = appState.writtenText[senseId];
        window.handleWritingInput(senseId);
      }
    }
    const sense = SENSES.find(s => s.id === senseId);
    if (sense) {
      sense.objectives.forEach((o, i) => {
        const val = appState.ican[senseId + '-' + i];
        if (val) {
          const radio = document.querySelector(`input[name="ican-${senseId}-${i}"][value="${val}"]`);
          if (radio) radio.checked = true;
        }
      });
    }
  }

  window.recordICan = function (senseId, index, val) {
    appState.ican[senseId + '-' + index] = val;
    saveState();
  };

  /* ------------------------------------------------------------------
     14. Formative Quiz Checking & Persistence
  ------------------------------------------------------------------ */
  window.checkQuiz = function (senseId) {
    const sense = SENSES.find(s => s.id === senseId);
    let total = sense.quiz.length;
    let score = 0;
    let answered = 0;

    sense.quiz.forEach((q, idx) => {
      const card = document.getElementById('quiz-' + senseId + '-q' + idx);
      const checked = card.querySelector(`input[name="q-${senseId}-${idx}"]:checked`);
      card.classList.remove('correct', 'incorrect');
      if (checked) {
        answered++;
        if (checked.dataset.correct === '1') {
          score++;
          card.classList.add('correct');
        } else {
          card.classList.add('incorrect');
        }
      }
    });

    const scoreEl = document.getElementById('quiz-score-' + senseId);
    if (answered < total) {
      scoreEl.style.color = 'var(--incorrect)';
      scoreEl.textContent = `Please answer all questions first (${answered}/${total}).`;
    } else {
      scoreEl.style.color = score === total ? 'var(--correct)' : 'var(--ink)';
      scoreEl.textContent = `Score: ${score} / ${total} (${Math.round(score / total * 100)}%)`;
      appState.scores[senseId] = score;
      saveState();
    }
  };

  /* ------------------------------------------------------------------
     15. Compare Table: 6 Rows & 5 Senses
  ------------------------------------------------------------------ */
  window.setCompareMode = function (mode) {
    const btnStudy = document.getElementById('btn-compare-study');
    const btnPractice = document.getElementById('btn-compare-practice');
    if (btnStudy && btnPractice) {
      btnStudy.style.background = mode === 'study' ? 'var(--ink)' : 'var(--muted)';
      btnPractice.style.background = mode === 'practice' ? 'var(--ink)' : 'var(--muted)';
    }
    renderCompareTable(mode);
  };

  function renderCompareTable(mode = 'study') {
    const tableWrap = document.getElementById('compare-table-content');
    if (!tableWrap) return;

    if (mode === 'study') {
      let html = `
        <table class="compare-table">
          <thead>
            <tr>
              <th style="min-width:140px;">Biological Parameter</th>
              <th>👁️ Sight</th>
              <th>👂 Hearing</th>
              <th>👃 Smell</th>
              <th>👅 Taste</th>
              <th>✋ Touch</th>
            </tr>
          </thead>
          <tbody>
      `;
      COMPARE.rows.forEach(row => {
        html += `
          <tr>
            <td><strong>${row.label}</strong><br><span style="font-size:0.8rem; color:var(--muted);">${row.es}</span></td>
            <td>${row.values.sight}</td>
            <td>${row.values.hearing}</td>
            <td>${row.values.smell}</td>
            <td>${row.values.taste}</td>
            <td>${row.values.touch}</td>
          </tr>
        `;
      });
      html += `</tbody></table>`;
      tableWrap.innerHTML = html;
      return;
    }

    let html = `
      <table class="compare-table" id="compare-practice-table">
        <thead>
          <tr>
            <th style="min-width:140px;">Biological Parameter</th>
            <th>👁️ Sight</th>
            <th>👂 Hearing</th>
            <th>👃 Smell</th>
            <th>👅 Taste</th>
            <th>✋ Touch</th>
          </tr>
        </thead>
        <tbody>
    `;

    COMPARE.rows.forEach(row => {
      html += `<tr><td><strong>${row.label}</strong></td>`;
      SENSES.forEach(s => {
        const correctVal = row.values[s.id];
        const allOptions = shuffleArray(Object.values(row.values));
        html += `
          <td>
            <select data-ans="${correctVal}" aria-label="${s.name} ${row.label}" style="padding:6px; border:1.5px solid var(--line); border-radius:6px; font-size:0.82rem; width:100%;">
              <option value="">— Choose —</option>
              ${allOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          </td>
        `;
      });
      html += `</tr>`;
    });

    html += `
        </tbody>
      </table>
      <div style="padding:14px; display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <button class="action-btn" onclick="checkComparePractice()">Check Table Answers</button>
        <span id="compare-practice-fb" style="font-weight:700;"></span>
      </div>
    `;
    tableWrap.innerHTML = html;
  }

  window.checkComparePractice = function () {
    const selects = document.querySelectorAll('#compare-practice-table select');
    let correct = 0;
    selects.forEach(sel => {
      if (sel.value === sel.dataset.ans) {
        sel.style.borderColor = 'var(--correct)';
        sel.style.backgroundColor = 'var(--correct-tint)';
        correct++;
      } else {
        sel.style.borderColor = 'var(--incorrect)';
        sel.style.backgroundColor = 'var(--incorrect-tint)';
      }
    });
    const fb = document.getElementById('compare-practice-fb');
    if (!fb) return;
    fb.style.color = correct === selects.length ? 'var(--correct)' : 'var(--incorrect)';
    fb.textContent = `${correct} / ${selects.length} correct!`;
  };

  /* ------------------------------------------------------------------
     16. Flashcards, Morphology Lab & Searchable Glossary
  ------------------------------------------------------------------ */
  let allWordsList = [];
  let flashIdx = 0;
  let flashFlipped = false;
  let flashMode = 'term-def'; // 'term-def' | 'def-term' | 'audio-term'

  function renderGlossaryPanel() {
    const wrap = document.getElementById('glossary-panel-content');
    if (!wrap) return;

    allWordsList = [];
    SENSES.forEach(s => {
      s.words.forEach(w => allWordsList.push({ ...w, senseName: s.name, senseId: s.id }));
    });

    wrap.innerHTML = `
      <!-- Morphology Roots Lab -->
      <div style="background:#FFF; border:1.5px solid var(--line); border-radius:14px; padding:20px; margin-bottom:28px;">
        <h3 style="font-size:1.25rem; color:var(--sight); margin-bottom:6px;">🔬 Scientific Word Roots (Morphology Lab)</h3>
        <p style="font-size:0.9rem; color:var(--muted); margin-bottom:14px;">Understand the Greek and Latin roots behind scientific vocabulary to decode complex biology terms easily.</p>
        <div class="morpho-grid">
          ${UNIT.morphologyRoots.map(r => `
            <div class="morpho-card">
              <span class="morpho-root">${r.root}</span>
              <div style="font-size:0.85rem; font-weight:700; color:var(--ink);">${r.meaning} (${r.es})</div>
              <p style="font-size:0.8rem; color:var(--muted); margin-top:4px;">${r.def}</p>
              <div style="font-size:0.75rem; font-weight:600; color:var(--sight); margin-top:6px;">Ex: ${r.examples}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Flashcard Controls -->
      <div style="display:flex; justify-content:space-between; align-items:center; max-width:540px; margin:0 auto 10px; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; gap:6px;">
          <button class="scaffold-btn active" id="fmode-td" onclick="setFlashMode('term-def')">Term → Meaning</button>
          <button class="scaffold-btn" id="fmode-dt" onclick="setFlashMode('def-term')">Definition → Term</button>
        </div>
        <button class="action-btn" style="padding:4px 10px; font-size:0.8rem; background:var(--muted);" onclick="shuffleFlashcards()">🔀 Shuffle</button>
      </div>

      <!-- Flashcard Stage -->
      <div class="flashcard-stage" id="flashcard-box" onclick="flipFlashcard()" role="button" tabindex="0" aria-label="Flashcard. Click to flip.">
        <div id="flashcard-inner"></div>
      </div>

      <!-- Leitner SRS Buttons -->
      <div style="display:flex; justify-content:center; gap:10px; margin-bottom:28px; flex-wrap:wrap;">
        <button class="action-btn" style="padding:8px 16px; font-size:0.88rem; background:var(--muted);" onclick="prevFlashcard()">← Previous</button>
        <button class="action-btn" style="padding:8px 16px; font-size:0.88rem;" onclick="flipFlashcard()">🔄 Flip Card</button>
        <button class="action-btn" style="padding:8px 16px; font-size:0.88rem; background:var(--correct);" onclick="markFlashcardMastered()">✅ Got it (Mastered)</button>
        <button class="action-btn" style="padding:8px 16px; font-size:0.88rem; background:var(--muted);" onclick="nextFlashcard()">Next →</button>
      </div>

      <!-- Searchable Glossary Table -->
      <div style="margin-bottom:16px; display:flex; gap:10px; flex-wrap:wrap;">
        <input type="search" id="glossary-search" placeholder="🔍 Search any word in English, Spanish, or scientific definition..." aria-label="Search glossary" style="flex:1; min-width:240px; padding:10px 14px; border:1.5px solid var(--line); border-radius:8px; font-size:0.95rem;" oninput="filterGlossaryList()">
      </div>
      <div class="vocab-grid" id="glossary-list-grid"></div>
    `;

    updateFlashcard();
    filterGlossaryList();
  }

  window.setFlashMode = function (mode) {
    flashMode = mode;
    flashFlipped = false;
    document.getElementById('fmode-td').classList.toggle('active', mode === 'term-def');
    document.getElementById('fmode-dt').classList.toggle('active', mode === 'def-term');
    updateFlashcard();
  };

  window.shuffleFlashcards = function () {
    allWordsList = shuffleArray(allWordsList);
    flashIdx = 0;
    flashFlipped = false;
    updateFlashcard();
  };

  window.markFlashcardMastered = function () {
    const item = allWordsList[flashIdx];
    if (item && !appState.flashcardSRS.mastered.includes(item.id)) {
      appState.flashcardSRS.mastered.push(item.id);
      saveState();
    }
    nextFlashcard();
  };

  function updateFlashcard() {
    const inner = document.getElementById('flashcard-inner');
    if (!inner || !allWordsList.length) return;
    const item = allWordsList[flashIdx];
    const isMastered = appState.flashcardSRS.mastered.includes(item.id);

    if (flashMode === 'def-term') {
      if (!flashFlipped) {
        inner.innerHTML = `
          <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; color:var(--muted);">${item.senseName} (${flashIdx + 1}/${allWordsList.length}) ${isMastered ? '· ✅ Mastered' : ''}</span>
          <div style="font-size:1.15rem; font-weight:600; margin:14px 0; max-width:440px;">${item.def}</div>
          <p style="font-size:0.84rem; color:var(--muted);">👆 Click card to reveal the English term &amp; audio</p>
        `;
      } else {
        inner.innerHTML = `
          <div style="font-size:1.9rem; font-weight:800; color:var(--sight); margin-bottom:4px;">${item.en}</div>
          <div style="font-family:monospace; color:var(--muted); margin-bottom:8px;">${item.ipa || ''}</div>
          <div style="font-weight:700; color:var(--ink-light); margin-bottom:8px;">Español: ${item.es}</div>
          <button class="audio-btn" style="font-size:1.1rem;" onclick="event.stopPropagation(); speakWord('${item.en.replace(/'/g, "\\'")}')">🔊 Listen</button>
        `;
      }
      return;
    }

    // Default: Term -> Def
    if (!flashFlipped) {
      inner.innerHTML = `
        <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; color:var(--muted);">${item.senseName} (${flashIdx + 1}/${allWordsList.length}) ${isMastered ? '· ✅ Mastered' : ''}</span>
        <div style="font-size:1.9rem; font-weight:800; color:var(--sight); margin:8px 0;">${item.en}</div>
        <div style="font-family:monospace; color:var(--muted);">${item.ipa || ''}</div>
        <button class="audio-btn" style="margin-top:6px;" onclick="event.stopPropagation(); speakWord('${item.en.replace(/'/g, "\\'")}')">🔊</button>
        <p style="font-size:0.84rem; color:var(--muted); margin-top:10px;">👆 Click card to see Spanish &amp; definition</p>
      `;
    } else {
      inner.innerHTML = `
        <div style="font-size:1.25rem; font-weight:700; color:var(--sight); margin-bottom:6px;">${item.en} = ${item.es}</div>
        <p style="font-size:1rem; margin-bottom:8px; line-height:1.5;">${item.def}</p>
        ${item.ex ? `<p style="font-style:italic; font-size:0.9rem; color:var(--ink-light);">"${item.ex}"</p>` : ''}
      `;
    }
  }

  window.flipFlashcard = function () {
    flashFlipped = !flashFlipped;
    updateFlashcard();
  };
  window.nextFlashcard = function () {
    flashIdx = (flashIdx + 1) % allWordsList.length;
    flashFlipped = false;
    updateFlashcard();
  };
  window.prevFlashcard = function () {
    flashIdx = (flashIdx - 1 + allWordsList.length) % allWordsList.length;
    flashFlipped = false;
    updateFlashcard();
  };

  window.filterGlossaryList = function () {
    const q = (document.getElementById('glossary-search')?.value || '').trim().toLowerCase();
    const grid = document.getElementById('glossary-list-grid');
    if (!grid) return;

    const filtered = allWordsList.filter(w =>
      w.en.toLowerCase().includes(q) ||
      w.es.toLowerCase().includes(q) ||
      w.def.toLowerCase().includes(q)
    );

    grid.innerHTML = filtered.map(w => `
      <div class="vocab-card">
        <div class="vocab-top">
          <span class="vocab-word">${w.en}</span>
          <div class="vocab-audio-group">
            <button class="audio-btn" aria-label="Listen ${w.en}" onclick="speakWord('${w.en.replace(/'/g, "\\'")}')">🔊</button>
          </div>
        </div>
        <div class="vocab-ipa">${w.ipa || ''}</div>
        <div class="vocab-es">${w.es} · <span style="font-weight:normal;">${w.senseName}</span></div>
        <div class="vocab-def">${w.def}</div>
        ${w.ex ? `<div class="vocab-ex">"${w.ex}" <button class="audio-btn" onclick="speakSentence('${w.ex.replace(/'/g, "\\'")}')">🔊</button></div>` : ''}
      </div>
    `).join('');
  };

  /* ------------------------------------------------------------------
     17. Final Summative Assessment & Printable Student Report
  ------------------------------------------------------------------ */
  let currentFinalQuestions = [];

  window.rebuildFinalExam = function () {
    const wrap = document.getElementById('final-exam-questions');
    const res = document.getElementById('final-exam-result');
    if (res) res.innerHTML = '';
    if (!wrap) return;

    currentFinalQuestions = [];
    SENSES.forEach(s => {
      const picked = shuffleArray([...s.quiz]).slice(0, 2);
      picked.forEach(q => currentFinalQuestions.push({ senseName: s.name, ...q }));
    });
    FINAL_EXTRA.forEach(q => currentFinalQuestions.push({ senseName: 'Cross-Sensory', ...q }));
    currentFinalQuestions = shuffleArray(currentFinalQuestions);

    wrap.innerHTML = currentFinalQuestions.map((q, idx) => `
      <div class="quiz-question-card" id="final-q${idx}">
        <span class="quiz-level-tag">${q.senseName} · ${q.level}</span>
        <div class="quiz-q-title">${idx + 1}. ${q.q}</div>
        <div class="quiz-opts">
          ${shuffleArray(q.options.map((opt, oidx) => ({ text: opt, isCorrect: oidx === 0 }))).map(o => `
            <label class="quiz-opt-label">
              <input type="radio" name="final-q-${idx}" data-correct="${o.isCorrect ? '1' : '0'}">
              <span>${o.text}</span>
            </label>
          `).join('')}
        </div>
        <div class="quiz-feedback">${q.explain}</div>
      </div>
    `).join('');
  };

  window.checkFinalExam = function () {
    let score = 0;
    let total = currentFinalQuestions.length;
    let answered = 0;

    currentFinalQuestions.forEach((q, idx) => {
      const card = document.getElementById('final-q' + idx);
      const checked = card.querySelector(`input[name="final-q-${idx}"]:checked`);
      card.classList.remove('correct', 'incorrect');
      if (checked) {
        answered++;
        if (checked.dataset.correct === '1') {
          score++;
          card.classList.add('correct');
        } else {
          card.classList.add('incorrect');
        }
      }
    });

    const studentName = document.getElementById('student-name')?.value.trim() || '8th Grade Science Scholar';
    const res = document.getElementById('final-exam-result');
    if (answered < total) {
      res.style.color = 'var(--incorrect)';
      res.textContent = `Please complete all questions before submitting (${answered}/${total}).`;
      return;
    }

    const pct = Math.round(score / total * 100);
    appState.scores.final = score;
    saveState();

    res.innerHTML = `
      <div class="print-student-report" style="background:var(--paper-tint); border:2px solid var(--line); border-radius:14px; padding:24px; margin-top:20px;">
        <h3 style="font-size:1.35rem; color:var(--sight);">🎓 Official Student Mastery Report: ${studentName}</h3>
        <p style="font-size:1.1rem; font-weight:700; margin:8px 0;">Final Score: ${score} / ${total} (${pct}%) — ${pct >= 80 ? '🌟 High Proficiency (CEFR B1 & NGSS MS-LS1-8 Mastered)' : '👍 Developing Competence'}</p>
        <p style="margin-top:6px; color:var(--ink-light);">This assessment verifies foundational mastery of sensory receptors, physical energy transduction, cranial/spinal neural conduction, and primary cortical integration.</p>
        <div style="margin-top:16px; display:flex; gap:10px;">
          <button class="action-btn" onclick="window.print()">🖨️ Print / Save Student Certificate (PDF)</button>
        </div>
      </div>
    `;
    res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  /* ------------------------------------------------------------------
     18. Teacher Guide Content
  ------------------------------------------------------------------ */
  function renderTeacherGuide() {
    const wrap = document.getElementById('teacher-guide-content');
    if (!wrap) return;

    wrap.innerHTML = `
      <div class="reading-block">
        <h3 style="font-size:1.25rem; color:var(--sight); margin-bottom:10px;">1. Suggested 6-Session CLIL Instructional Sequence (45 min each)</h3>
        <ul style="padding-left:20px; margin:10px 0 20px; line-height:1.75;">
          <li><strong>Session 1 (Unifying Model &amp; Sight):</strong> Introduce the 5-step model (<em>Stimulus → Organ → Transduction → Nerve → Cortex</em>). Calibrate and conduct the Optical Blind Spot test, analyze image inversion, and complete Stage 1-4 for Sight.</li>
          <li><strong>Session 2 (Hearing &amp; Mechanotransduction):</strong> Study the outer/middle/inner ear, trace hair cell stereocilia deflection in the cochlea, conduct the Binaural Sound Localization experiment, and evaluate the 60/60 acoustic safety rule.</li>
          <li><strong>Session 3 (Smell &amp; Emotional Memory):</strong> Examine chemical detection in the olfactory epithelium, contrast G-protein transduction with mechanotransduction, and investigate why olfactory tracts link directly to the limbic amygdala/hippocampus.</li>
          <li><strong>Session 4 (Taste vs. Flavor):</strong> Debunk the 'tongue map' myth, identify the five basic tastes, and perform the Nose-Pinch Jellybean test to isolate gustation from retronasal olfaction.</li>
          <li><strong>Session 5 (Touch &amp; The Somatosensory Homunculus):</strong> Map two-point tactile discrimination thresholds on fingertips vs. upper back, examine the three skin layers, and evaluate why sensitive structures command massive cortical territory.</li>
          <li><strong>Session 6 (Synthesis &amp; Assessment):</strong> Complete the 6-row Comparative Table, practice active recall with Flashcards and Greek/Latin Roots, and take the summative Final Exam. Optional extension: Connect with <em>Spiritual Senses (Hebrews 5:14)</em>.</li>
        </ul>

        <h3 style="font-size:1.25rem; color:var(--sight); margin-bottom:10px;">2. Inquiry Laboratory Materials Checklist</h3>
        <ul style="padding-left:20px; margin:10px 0 20px; line-height:1.7;">
          <li><strong>Sight Lab:</strong> On-screen calibrated distance slider and metric ruler.</li>
          <li><strong>Hearing Lab:</strong> Blindfolds, finger-snapping partner, and quiet classroom space.</li>
          <li><strong>Smell Lab:</strong> Small opaque cups with coffee grounds, crushed cinnamon, and citrus peels.</li>
          <li><strong>Taste Lab:</strong> Fruit jellybeans or Skittles of identical shape/texture and clean drinking water.</li>
          <li><strong>Touch Lab:</strong> Pairs of dull pencils or paperclips taped together at measured 2 mm, 5 mm, 15 mm, and 30 mm gaps.</li>
        </ul>

        <h3 style="font-size:1.25rem; color:var(--sight); margin-bottom:10px;">3. Common Misconceptions to Proactively Address</h3>
        <ul style="padding-left:20px; margin:10px 0 20px; line-height:1.75;">
          <li><strong>"Spicy is a basic taste":</strong> Emphasize that capsaicin stimulates trigeminal pain and heat nociceptors (TRPV1), not taste buds.</li>
          <li><strong>"The eye transmits complete finished pictures to the brain":</strong> Clarify that photoreceptors decompose light into action potentials; the visual cortex actively reconstructs spatial perception.</li>
          <li><strong>"The tongue map localizes sweetness only at the tip":</strong> Point out that all regions containing taste buds detect all five basic tastes.</li>
        </ul>

        <h3 style="font-size:1.25rem; color:var(--sight); margin-bottom:10px;">4. CLIL Writing Rubric (Step 8 Paragraphs)</h3>
        <table class="compare-table" style="margin-top:10px;">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>3 - Proficient (B1)</th>
              <th>2 - Developing (A2+)</th>
              <th>1 - Emerging (A2)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Biological Accuracy</strong></td>
              <td>Accurately traces stimulus, organ, receptor transduction, nerve, and cortex.</td>
              <td>Traces most steps but omits transduction or the specific cortex lobe.</td>
              <td>Sequence is incomplete or confuses adjacent organs.</td>
            </tr>
            <tr>
              <td><strong>Scientific Vocabulary</strong></td>
              <td>Uses 4+ core terms and 2+ scientific CALP verbs (refracts, transduces, etc.).</td>
              <td>Uses 2–3 terms with general verbs (enters, goes).</td>
              <td>Uses fewer than 2 terms.</td>
            </tr>
            <tr>
              <td><strong>Sequence Connectors</strong></td>
              <td>Seamlessly employs sequence markers (Initially, subsequently, then, finally).</td>
              <td>Uses basic connectors (First, next, then) with minor grammatical errors.</td>
              <td>Lacks connectors; writes isolated clauses.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  /* ------------------------------------------------------------------
     19. Utility: Array Shuffle
  ------------------------------------------------------------------ */
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ------------------------------------------------------------------
     20. Application Bootstrap
  ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    setScaffoldingMode(appState.scaffolding || 'guided');
    renderSensePanels();
    renderCompareTable('study');
    renderGlossaryPanel();
    rebuildFinalExam();
    renderTeacherGuide();
    updateTabBadges();
  });

})();
