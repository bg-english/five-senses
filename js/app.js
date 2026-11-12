/* =========================================================
   The Five Senses — Interactive Educational App
   Pedagogical engine:
   - SpeechSynthesis pronunciation
   - Diagram Explore & Test-Me modes
   - Path-ordering, matching & cloze activities
   - Formative quizzes with rich explanatory feedback
   - Go deeper & "I can..." self-assessment
   - Interactive Comparative Synthesis Table
   - Flashcards & Bilingual Glossary
   - Final Exam with Student Report & Teacher Guide
   ========================================================= */

(function () {
  'use strict';

  let currentSenseId = 'sight';
  let scoreStore = JSON.parse(localStorage.getItem('fiveSenses_progress') || '{}');

  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.sense-panel');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  /* ------------------------------------------------------------------
     Speech Synthesis (English pronunciation)
  ------------------------------------------------------------------ */
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  }

  window.speakWord = function (word) {
    speak(word);
  };

  /* ------------------------------------------------------------------
     Tab Switching + Keyboard Arrow Navigation (WCAG)
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
      const active = p.id === `panel-${targetId}`;
      p.classList.toggle('active', active);
    });
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

  /* ------------------------------------------------------------------
     Modal Glossary Handler
  ------------------------------------------------------------------ */
  window.openGlossary = function (wordId) {
    let item = null;
    for (const s of SENSES) {
      const found = s.words.find(w => w.id === wordId);
      if (found) { item = found; break; }
    }
    if (!item && EXTRA_WORDS[wordId]) item = EXTRA_WORDS[wordId];
    if (!item) return;

    modalTitle.innerHTML = `${item.en} <span style="font-weight:normal; font-size:0.9rem; color:var(--muted)">${item.ipa || ''}</span>`;
    modalBody.innerHTML = `
      <p style="font-weight:700; color:var(--sight); margin-bottom:6px;">Español: ${item.es}</p>
      <p style="margin-bottom:12px;">${item.def}</p>
      ${item.ex ? `<p style="font-style:italic; border-left:3px solid var(--line); padding-left:8px; margin-bottom:10px;">"${item.ex}"</p>` : ''}
      ${item.note ? `<p style="font-size:0.9rem; background:var(--paper-tint); padding:8px; border-radius:6px;">${item.note}</p>` : ''}
      <button class="action-btn" style="margin-top:10px; padding:6px 14px; font-size:0.9rem;" onclick="speakWord('${item.en.replace(/'/g, "\\'")}')">🔊 Listen</button>
    `;
    modalOverlay.classList.add('open');
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
     Sense Panels Initialization
  ------------------------------------------------------------------ */
  function renderSensePanels() {
    SENSES.forEach(sense => {
      const p = document.getElementById(`panel-${sense.id}`);
      if (!p) return;

      p.innerHTML = `
        <div class="sense-header">
          <span class="sense-badge">${sense.organ} · ${sense.organEs}</span>
          <h2 class="sense-title">${sense.name} <span style="font-size:1.4rem; color:var(--muted); font-weight:normal;">(${sense.es})</span></h2>
        </div>

        <!-- 1. Objectives & Warm-up -->
        <section class="step-section">
          <div class="step-header">
            <span class="step-num">1</span>
            <h3 class="step-title">Learning Goals &amp; Warm-up</h3>
          </div>
          <ul style="margin: 0 0 16px 24px; font-size:0.95rem; color:var(--ink-light);">
            ${sense.objectives.map(o => `<li>✅ ${o}</li>`).join('')}
          </ul>
          <div class="warmup-box">
            <p><strong>🤔 Think &amp; share:</strong> ${sense.warmup.q}</p>
            <p class="es-sub">${sense.warmup.qEs}</p>
            <p style="margin-top:8px;"><strong>👉 Quick action (30 sec):</strong> ${sense.warmup.task}</p>
            <p class="es-sub">${sense.warmup.taskEs}</p>
          </div>
        </section>

        <!-- 2. Key Vocabulary -->
        <section class="step-section">
          <div class="step-header">
            <span class="step-num">2</span>
            <h3 class="step-title">Key Vocabulary (${sense.words.length} core words)</h3>
          </div>
          <div class="vocab-grid">
            ${sense.words.map(w => `
              <div class="vocab-card">
                <div class="vocab-top">
                  <span class="vocab-word">${w.en}</span>
                  <button class="audio-btn" aria-label="Listen to ${w.en}" onclick="speakWord('${w.en.replace(/'/g, "\\'")}')">🔊</button>
                </div>
                <div class="vocab-ipa">${w.ipa || ''}</div>
                <div class="vocab-es">${w.es}</div>
                <div class="vocab-def">${w.def}</div>
                <div class="vocab-ex">"${w.ex}"</div>
                ${w.note ? `<div style="font-size:0.8rem; margin-top:6px; color:var(--muted);">${w.note}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 3. Interactive Diagram -->
        <section class="step-section">
          <div class="step-header">
            <span class="step-num">3</span>
            <h3 class="step-title">Explore the Diagram</h3>
          </div>
          <div class="diagram-card">
            <div class="diagram-toolbar">
              <span style="font-size:0.9rem; font-weight:600; color:var(--muted);" id="diagram-desc-${sense.id}">Click any number to explore its function.</span>
              <div class="diagram-mode-toggles">
                <button class="mode-btn active" data-diagram="${sense.id}" data-mode="explore">Explore (Labels On)</button>
                <button class="mode-btn" data-diagram="${sense.id}" data-mode="test">Test Me (Labels Off)</button>
              </div>
            </div>
            <div class="diagram-stage" id="stage-${sense.id}">
              <svg viewBox="0 0 800 450" class="diagram-svg" role="img" aria-label="${DIAGRAMS[sense.id].title}">
                ${DIAGRAMS[sense.id].svg}
              </svg>
            </div>
          </div>
          <div class="part-detail-box" id="detail-box-${sense.id}" aria-live="polite">
            <div class="part-detail-title">👆 Click a number on the diagram above</div>
            <div class="part-detail-def">Clicking a hotspot reveals its English name, Spanish translation, audio pronunciation, and biological role.</div>
          </div>
        </section>

        <!-- 4. Reading: The Path of... -->
        <section class="step-section">
          <div class="step-header">
            <span class="step-num">4</span>
            <h3 class="step-title">${sense.reading.title}</h3>
          </div>
          <div class="reading-block">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
              <span style="font-size:0.85rem; color:var(--muted);">💡 Tip: Click any <strong style="color:var(--theme)">highlighted word</strong> to see its meaning.</span>
              <button class="action-btn" style="padding:5px 12px; font-size:0.82rem;" onclick="readAloudParagraphs('${sense.id}')">🔊 Read Passage Aloud</button>
            </div>
            ${sense.reading.video ? `
              <div style="margin-bottom:16px;">
                <video src="${sense.reading.video.src}" controls playsinline preload="metadata" style="width:100%; border-radius:8px; background:#000;"></video>
                <p style="font-size:0.85rem; color:var(--muted); margin-top:6px;">${sense.reading.video.caption}</p>
              </div>
            ` : ''}
            ${renderReadingWithInlines(sense)}
          </div>
          <div style="background:var(--theme-tint); border-left:4px solid var(--theme); padding:12px 18px; border-radius:0 8px 8px 0; margin-top:14px;">
            <strong>💡 Did you know?</strong> ${sense.funfact}
          </div>
        </section>

        <!-- 5. Active Practice -->
        <section class="step-section">
          <div class="step-header">
            <span class="step-num">5</span>
            <h3 class="step-title">Active Practice</h3>
          </div>

          <!-- A. Path Order -->
          <h4 style="margin-bottom:6px;">A. Put the path in order</h4>
          <p style="font-size:0.9rem; color:var(--muted); margin-bottom:12px;">Click the chips in the exact order from stimulus to brain.</p>
          <div class="path-order-container" id="path-order-${sense.id}">
            <div class="path-slot-row" id="slots-${sense.id}"></div>
            <div class="path-chip-pool" id="pool-${sense.id}"></div>
            <div style="margin-top:10px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
              <button class="action-btn" style="padding:6px 14px; font-size:0.85rem;" onclick="checkPathOrder('${sense.id}')">Check Order</button>
              <button class="action-btn" style="padding:6px 14px; font-size:0.85rem; background:var(--muted);" onclick="resetPathOrder('${sense.id}')">Reset</button>
              <span id="path-feedback-${sense.id}" style="font-weight:700; font-size:0.9rem;" aria-live="polite"></span>
            </div>
          </div>

          <!-- B. Match Part & Function -->
          <h4 style="margin:24px 0 6px;">B. Match Part &amp; Function</h4>
          <p style="font-size:0.9rem; color:var(--muted); margin-bottom:12px;">Click one part on the left and its matching function on the right.</p>
          <div class="match-grid" id="match-grid-${sense.id}"></div>

          <!-- C. Fill the Gaps (Cloze) -->
          <h4 style="margin:24px 0 6px;">C. Complete the Summary</h4>
          <div class="reading-block" id="cloze-${sense.id}">
            ${renderCloze(sense)}
          </div>
        </section>

        <!-- 6. Health, Care & Go Deeper -->
        <section class="step-section">
          <div class="step-header">
            <span class="step-num">6</span>
            <h3 class="step-title">Health, Care &amp; Go Deeper</h3>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
            <div style="background:#FFF; border:1.5px solid var(--line); border-top:4px solid var(--theme); padding:16px; border-radius:10px;">
              <h4 style="color:var(--theme); margin-bottom:10px;">Common Conditions</h4>
              <ul style="padding-left:18px; font-size:0.92rem; line-height:1.5;">
                ${sense.health.problems.map(pr => `<li style="margin-bottom:6px;"><strong>${pr.name}:</strong> ${pr.text}</li>`).join('')}
              </ul>
            </div>
            <div style="background:#FFF; border:1.5px solid var(--line); border-top:4px solid var(--correct); padding:16px; border-radius:10px;">
              <h4 style="color:var(--correct); margin-bottom:10px;">How to Protect Your ${sense.name}</h4>
              <ul style="padding-left:18px; font-size:0.92rem; line-height:1.5;">
                ${sense.health.care.map(c => `<li style="margin-bottom:6px;">${c}</li>`).join('')}
              </ul>
            </div>
          </div>

          <details class="deeper-details">
            <summary>⭐ Go Deeper — Extra Anatomy &amp; Curiosities (Optional)</summary>
            <div class="deeper-grid">
              ${sense.deeper.map(d => `
                <div class="deeper-item">
                  <strong style="color:var(--theme)">${d.name}</strong> <span style="font-size:0.8rem; color:var(--muted)">(${d.es})</span>
                  <p style="margin-top:4px;">${d.text}</p>
                </div>
              `).join('')}
            </div>
          </details>
        </section>

        <!-- 7. Hands-on Experiment -->
        <section class="step-section">
          <div class="step-header">
            <span class="step-num">7</span>
            <h3 class="step-title">Mini-Lab Experiment: ${sense.experiment.title}</h3>
          </div>
          <div class="experiment-card">
            ${sense.experiment.type === 'blindspot' ? `
              <p>Close your <strong>left eye</strong> and look directly at the <strong>+</strong> with your <strong>right eye</strong>. Move slowly closer to the screen:</p>
              <div class="blindspot-stage" aria-label="Blind spot test with a cross on the left and a black dot on the right">
                <span class="blindspot-cross">+</span>
                <span class="blindspot-dot"></span>
              </div>
            ` : ''}
            <p><strong>Steps (Predict → Try → Observe → Explain):</strong></p>
            <ol class="experiment-steps">
              ${sense.experiment.steps.map(s => `<li>${s}</li>`).join('')}
            </ol>
            <div style="background:var(--paper-tint); padding:12px; border-radius:8px; margin-top:10px; font-size:0.92rem;">
              <strong>🔬 Why does this happen?</strong> ${sense.experiment.explain}
            </div>
          </div>
        </section>

        <!-- 8. Express It in English -->
        <section class="step-section">
          <div class="step-header">
            <span class="step-num">8</span>
            <h3 class="step-title">Express It in English (CLIL Writing)</h3>
          </div>
          <div style="background:#FFF; border:1px solid var(--line); border-radius:12px; padding:20px;">
            <h4 style="margin-bottom:8px;">Useful Sentence Frames:</h4>
            <ul style="padding-left:20px; font-size:0.95rem; line-height:1.6; margin-bottom:16px; color:var(--ink-light);">
              ${sense.frames.map(f => `<li><code>${f}</code></li>`).join('')}
            </ul>
            <h4>Writing Task:</h4>
            <p style="margin-bottom:4px;">${sense.writing.prompt}</p>
            <p style="font-size:0.85rem; color:var(--muted); margin-bottom:12px;">${sense.writing.promptEs}</p>
            <div style="font-size:0.85rem; background:var(--paper-tint); padding:10px; border-radius:6px; margin-bottom:12px;">
              <strong>Word Bank:</strong> ${sense.writing.bank.join(' · ')}
            </div>
            <textarea id="write-${sense.id}" rows="4" aria-label="Writing response for ${sense.name}" style="width:100%; border:1.5px solid var(--line); border-radius:8px; padding:10px; font-family:inherit; font-size:0.95rem;" placeholder="Write your explanation in English using First, Next, Then, Finally..."></textarea>
            <details style="margin-top:10px; font-size:0.9rem;">
              <summary style="cursor:pointer; font-weight:700; color:var(--theme);">👀 Compare with a Model Answer</summary>
              <div style="padding:12px; background:var(--theme-tint); border-radius:6px; margin-top:6px;">
                "${sense.writing.model}"
              </div>
            </details>
          </div>
        </section>

        <!-- 9. Formative Quiz with Explanations -->
        <section class="step-section quiz-section" id="quiz-${sense.id}">
          <h3 style="margin-bottom:6px; font-size:1.4rem;">9. Check Your Understanding (${sense.quiz.length} questions)</h3>
          <p style="font-size:0.9rem; color:var(--muted); margin-bottom:16px;">Questions progress from <em>Remember</em> to <em>Understand</em> and <em>Apply</em>. You get an explanation for every answer.</p>
          <div class="quiz-container">
            ${sense.quiz.map((q, idx) => `
              <div class="quiz-question-card" data-qidx="${idx}" id="quiz-${sense.id}-q${idx}">
                <span class="quiz-level-tag">${q.level}</span>
                <div class="quiz-q-title">${idx + 1}. ${q.q}</div>
                <div class="quiz-opts">
                  ${shuffleArray(q.options.map((opt, oidx) => ({ text: opt, isCorrect: oidx === 0 }))).map(o => `
                    <label class="quiz-opt-label">
                      <input type="radio" name="q-${sense.id}-${idx}" value="${o.isCorrect ? '1' : '0'}">
                      <span>${o.text}</span>
                    </label>
                  `).join('')}
                </div>
                <div class="quiz-feedback">${q.explain}</div>
              </div>
            `).join('')}
          </div>
          <div style="display:flex; align-items:center; gap:16px; margin-top:16px; flex-wrap:wrap;">
            <button class="action-btn" onclick="checkQuiz('${sense.id}')">Check Answers</button>
            <span id="quiz-score-${sense.id}" style="font-weight:700; font-size:1.05rem;" aria-live="polite"></span>
          </div>

          <!-- Self-reflection checklist -->
          <div class="ican-box">
            <h4 style="margin-bottom:8px;">🎯 Self-Check ("I can...")</h4>
            ${sense.objectives.map((o, i) => `
              <div class="ican-row">
                <span style="font-size:0.92rem;">${o}</span>
                <div style="display:flex; gap:8px;">
                  <label style="font-size:0.85rem; cursor:pointer;"><input type="radio" name="ican-${sense.id}-${i}" value="1"> 😟 Not yet</label>
                  <label style="font-size:0.85rem; cursor:pointer;"><input type="radio" name="ican-${sense.id}-${i}" value="2"> 🙂 Almost</label>
                  <label style="font-size:0.85rem; cursor:pointer;"><input type="radio" name="ican-${sense.id}-${i}" value="3"> 😎 Yes!</label>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      `;

      initDiagram(sense);
      initPathOrder(sense);
      initMatchPairs(sense);
    });
  }

  window.readAloudParagraphs = function (senseId) {
    const sense = SENSES.find(s => s.id === senseId);
    if (!sense) return;
    const plain = sense.reading.paragraphs
      .map(p => p.replace(/\[\[(.*?)\|(.*?)\]\]/g, '$2'))
      .join(' ');
    speak(plain);
  };

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
            <div class="reading-check-q">❓ Quick check: ${check.q}</div>
            <div class="reading-check-opts">
              ${shuffled.map(o => `
                <label class="reading-check-opt">
                  <input type="radio" name="rc-${sense.id}-${idx}" value="${o.isCorrect ? '1' : '0'}" onchange="checkInlineQuestion('${sense.id}', ${idx}, this, '${check.explain.replace(/'/g, "\\'")}')">
                  <span>${o.text}</span>
                </label>
              `).join('')}
            </div>
            <div id="rc-feedback-${sense.id}-${idx}" style="font-size:0.85rem; margin-top:6px; display:none; font-weight:600;" aria-live="polite"></div>
          </div>
        `;
      }
    });
    return html;
  }

  window.checkInlineQuestion = function (senseId, idx, input, explain) {
    const feedback = document.getElementById(`rc-feedback-${senseId}-${idx}`);
    feedback.style.display = 'block';
    if (input.value === '1') {
      feedback.style.color = 'var(--correct)';
      feedback.textContent = '✅ Correct! ' + explain;
    } else {
      feedback.style.color = 'var(--incorrect)';
      feedback.textContent = '❌ Not quite. ' + explain;
    }
  };

  /* ------------------------------------------------------------------
     Diagram Logic (Explore vs Test Mode)
  ------------------------------------------------------------------ */
  function initDiagram(sense) {
    const stage = document.getElementById(`stage-${sense.id}`);
    const hotspots = DIAGRAMS[sense.id].hotspots;
    const detailBox = document.getElementById(`detail-box-${sense.id}`);

    hotspots.forEach((hs, idx) => {
      const wObj = sense.words.find(w => w.id === hs.id);
      const btn = document.createElement('button');
      btn.className = 'diagram-hotspot';
      btn.style.left = (hs.x / 800 * 100) + '%';
      btn.style.top = (hs.y / 450 * 100) + '%';
      btn.textContent = idx + 1;
      btn.setAttribute('aria-label', `Part ${idx + 1}: ${wObj ? wObj.en : hs.id}`);
      btn.dataset.partId = hs.id;

      const pin = document.createElement('div');
      pin.className = 'diagram-label-pin';
      pin.style.left = (hs.lx / 800 * 100) + '%';
      pin.style.top = (hs.ly / 450 * 100) + '%';
      pin.textContent = `${idx + 1}. ${wObj ? wObj.en : hs.id}`;
      pin.id = `pin-${sense.id}-${hs.id}`;

      btn.addEventListener('click', () => {
        stage.querySelectorAll('.diagram-hotspot').forEach(h => h.classList.remove('active'));
        btn.classList.add('active');

        if (wObj) {
          detailBox.innerHTML = `
            <div class="part-detail-title">
              <span>${idx + 1}. ${wObj.en}</span>
              <span style="font-size:0.9rem; font-weight:normal; color:var(--muted)">(${wObj.es})</span>
              <button class="audio-btn" aria-label="Listen to ${wObj.en}" onclick="speakWord('${wObj.en.replace(/'/g, "\\'")}')">🔊</button>
            </div>
            <div class="part-detail-def">${wObj.def}</div>
            <div style="font-style:italic; font-size:0.9rem; margin-top:6px;">"${wObj.ex}"</div>
          `;
        }
      });

      stage.appendChild(btn);
      stage.appendChild(pin);
    });

    const modeBtns = document.querySelectorAll(`.mode-btn[data-diagram="${sense.id}"]`);
    modeBtns.forEach(b => {
      b.addEventListener('click', () => {
        modeBtns.forEach(mb => mb.classList.remove('active'));
        b.classList.add('active');
        const mode = b.dataset.mode;
        const pins = stage.querySelectorAll('.diagram-label-pin');
        const desc = document.getElementById(`diagram-desc-${sense.id}`);
        if (mode === 'test') {
          pins.forEach(p => p.style.display = 'none');
          desc.textContent = "Test mode: Labels are hidden! Try naming each numbered part before clicking it.";
        } else {
          pins.forEach(p => p.style.display = 'block');
          desc.textContent = "Explore mode: Click any number to explore its function.";
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     Path Ordering Activity
  ------------------------------------------------------------------ */
  const pathState = {};

  function initPathOrder(sense) {
    pathState[sense.id] = [];
    const pool = document.getElementById(`pool-${sense.id}`);
    const slots = document.getElementById(`slots-${sense.id}`);
    slots.innerHTML = '<span style="color:var(--muted); font-size:0.85rem;">Click chips below in order...</span>';

    const shuffled = shuffleArray([...sense.path]);
    shuffled.forEach(stepId => {
      const chip = document.createElement('button');
      chip.className = 'path-chip';
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
    const slots = document.getElementById(`slots-${senseId}`);
    slots.innerHTML = '';
    pathState[senseId].forEach((stepId, idx) => {
      const chip = document.createElement('span');
      chip.className = 'path-chip placed';
      chip.textContent = `${idx + 1}. ${sense.pathLabels[stepId] || stepId}`;
      slots.appendChild(chip);
    });
  }

  window.resetPathOrder = function (senseId) {
    pathState[senseId] = [];
    const pool = document.getElementById(`pool-${senseId}`);
    pool.querySelectorAll('.path-chip').forEach(c => c.classList.remove('placed'));
    const slots = document.getElementById(`slots-${senseId}`);
    slots.innerHTML = '<span style="color:var(--muted); font-size:0.85rem;">Click chips below in order...</span>';
    document.getElementById(`path-feedback-${senseId}`).textContent = '';
  };

  window.checkPathOrder = function (senseId) {
    const sense = SENSES.find(s => s.id === senseId);
    const cur = pathState[senseId];
    const fb = document.getElementById(`path-feedback-${senseId}`);
    if (cur.length < sense.path.length) {
      fb.style.color = 'var(--incorrect)';
      fb.textContent = `Place all ${sense.path.length} steps first.`;
      return;
    }
    const isCorrect = cur.every((val, i) => val === sense.path[i]);
    if (isCorrect) {
      fb.style.color = 'var(--correct)';
      fb.textContent = '🎉 Perfect sequence! From stimulus to brain.';
    } else {
      fb.style.color = 'var(--incorrect)';
      fb.textContent = '❌ Not quite in order yet. Click Reset and check Step 4!';
    }
  };

  /* ------------------------------------------------------------------
     Match Pairs Activity
  ------------------------------------------------------------------ */
  function initMatchPairs(sense) {
    const grid = document.getElementById(`match-grid-${sense.id}`);
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

    const parts = sense.match.map(m => {
      const w = sense.words.find(word => word.id === m[0]);
      return { id: m[0], label: w ? w.en : m[0] };
    });
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
      if (selectedPart === selectedDef) {
        const pBtn = Array.from(colParts.children).find(b => b.classList.contains('selected'));
        const dBtn = Array.from(colDefs.children).find(b => b.classList.contains('selected'));
        if (pBtn && dBtn) {
          pBtn.classList.remove('selected');
          pBtn.classList.add('paired');
          pBtn.textContent = '✅ ' + pBtn.textContent;
          dBtn.classList.remove('selected');
          dBtn.classList.add('paired');
        }
      } else {
        setTimeout(() => {
          colParts.querySelectorAll('.match-item').forEach(i => i.classList.remove('selected'));
          colDefs.querySelectorAll('.match-item').forEach(i => i.classList.remove('selected'));
        }, 350);
      }
      selectedPart = null;
      selectedDef = null;
    }

    grid.appendChild(colParts);
    grid.appendChild(colDefs);
  }

  /* ------------------------------------------------------------------
     Cloze Summary (with Word Bank)
  ------------------------------------------------------------------ */
  function renderCloze(sense) {
    let text = sense.cloze.text;
    const answers = [];
    const parsed = text.replace(/\{(.*?)\}/g, (m, word) => {
      answers.push(word);
      return `<input type="text" data-ans="${word.toLowerCase()}" aria-label="Missing word" style="width:130px; padding:4px 8px; font-weight:700; border:1.5px solid var(--line); border-radius:4px; text-align:center;">`;
    });
    const bank = shuffleArray([...answers, ...(sense.cloze.extra || [])]);
    return `
      <div style="font-size:0.88rem; background:var(--paper-tint); padding:8px 12px; border-radius:6px; margin-bottom:10px;">
        <strong>Word Bank:</strong> ${bank.map(w => `<code style="margin:0 4px;">${w}</code>`).join('·')}
      </div>
      <p style="line-height:2.1;">${parsed}</p>
      <div style="margin-top:14px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
        <button class="action-btn" style="padding:6px 14px; font-size:0.85rem;" onclick="checkCloze('${sense.id}')">Check Words</button>
        <span id="cloze-fb-${sense.id}" style="font-weight:700; font-size:0.9rem;" aria-live="polite"></span>
      </div>
    `;
  }

  window.checkCloze = function (senseId) {
    const wrap = document.getElementById(`cloze-${senseId}`);
    const inputs = wrap.querySelectorAll('input');
    let correct = 0;
    inputs.forEach(inp => {
      if (inp.value.trim().toLowerCase() === inp.dataset.ans) {
        inp.style.borderColor = 'var(--correct)';
        inp.style.backgroundColor = 'var(--correct-tint)';
        correct++;
      } else {
        inp.style.borderColor = 'var(--incorrect)';
        inp.style.backgroundColor = 'var(--incorrect-tint)';
      }
    });
    const fb = document.getElementById(`cloze-fb-${senseId}`);
    if (correct === inputs.length) {
      fb.style.color = 'var(--correct)';
      fb.textContent = `🎉 All ${correct}/${inputs.length} correct!`;
    } else {
      fb.style.color = 'var(--incorrect)';
      fb.textContent = `${correct}/${inputs.length} correct. Check the red boxes!`;
    }
  };

  /* ------------------------------------------------------------------
     Quiz Checking
  ------------------------------------------------------------------ */
  window.checkQuiz = function (senseId) {
    const sense = SENSES.find(s => s.id === senseId);
    let total = sense.quiz.length;
    let score = 0;
    let answered = 0;

    sense.quiz.forEach((q, idx) => {
      const card = document.getElementById(`quiz-${senseId}-q${idx}`);
      const checked = card.querySelector(`input[name="q-${senseId}-${idx}"]:checked`);
      card.classList.remove('correct', 'incorrect');
      if (checked) {
        answered++;
        if (checked.value === '1') {
          score++;
          card.classList.add('correct');
        } else {
          card.classList.add('incorrect');
        }
      }
    });

    const scoreEl = document.getElementById(`quiz-score-${senseId}`);
    if (answered < total) {
      scoreEl.style.color = 'var(--incorrect)';
      scoreEl.textContent = `Please answer all questions first (${answered}/${total}).`;
    } else {
      scoreEl.style.color = score === total ? 'var(--correct)' : 'var(--ink)';
      scoreEl.textContent = `Score: ${score} / ${total} (${Math.round(score / total * 100)}%)`;
      scoreStore[senseId] = score;
      localStorage.setItem('fiveSenses_progress', JSON.stringify(scoreStore));
    }
  };

  /* ------------------------------------------------------------------
     Compare Table (Study vs Interactive Practice Mode)
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
              <th>Sense</th>
              <th>Stimulus (Estímulo)</th>
              <th>Organ (Órgano)</th>
              <th>Receptor Cells (Receptores)</th>
              <th>Nerve to Brain (Nervio)</th>
            </tr>
          </thead>
          <tbody>
      `;
      SENSES.forEach(s => {
        html += `
          <tr>
            <td><strong style="color:var(--${s.id})">${s.name}</strong><br><span style="font-size:0.8rem; color:var(--muted)">${s.es}</span></td>
            <td>${COMPARE.rows[0].values[s.id]}</td>
            <td>${COMPARE.rows[1].values[s.id]}</td>
            <td>${COMPARE.rows[2].values[s.id]}</td>
            <td>${COMPARE.rows[3].values[s.id]}</td>
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
            <th>Sense</th>
            <th>Stimulus</th>
            <th>Organ</th>
            <th>Receptor Cells</th>
            <th>Nerve to Brain</th>
          </tr>
        </thead>
        <tbody>
    `;

    SENSES.forEach(s => {
      html += `<tr><td><strong style="color:var(--${s.id})">${s.name}</strong></td>`;
      COMPARE.rows.forEach(row => {
        const correctVal = row.values[s.id];
        const allOptions = shuffleArray(Object.values(row.values));
        html += `
          <td>
            <select data-ans="${correctVal}" aria-label="${s.name} ${row.label}" style="padding:6px; border:1.5px solid var(--line); border-radius:6px; font-size:0.85rem; width:100%;">
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
      <div style="padding:14px; display:flex; gap:12px; align-items:center;">
        <button class="action-btn" onclick="checkComparePractice()">Check Table</button>
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
    fb.style.color = correct === selects.length ? 'var(--correct)' : 'var(--incorrect)';
    fb.textContent = `${correct} / ${selects.length} correct!`;
  };

  /* ------------------------------------------------------------------
     Flashcards & Searchable Glossary Panel
  ------------------------------------------------------------------ */
  let allWordsList = [];
  let flashIdx = 0;
  let flashFlipped = false;

  function renderGlossaryPanel() {
    const wrap = document.getElementById('glossary-panel-content');
    if (!wrap) return;

    allWordsList = [];
    SENSES.forEach(s => {
      s.words.forEach(w => allWordsList.push({ ...w, senseName: s.name, senseId: s.id }));
    });

    wrap.innerHTML = `
      <div class="flashcard-stage" id="flashcard-box" onclick="flipFlashcard()" role="button" tabindex="0" aria-label="Flashcard. Click to flip.">
        <div id="flashcard-inner"></div>
      </div>
      <div style="display:flex; justify-content:center; gap:10px; margin-bottom:28px; flex-wrap:wrap;">
        <button class="action-btn" style="padding:8px 16px; font-size:0.9rem; background:var(--muted);" onclick="prevFlashcard()">← Previous</button>
        <button class="action-btn" style="padding:8px 16px; font-size:0.9rem;" onclick="flipFlashcard()">🔄 Flip Card</button>
        <button class="action-btn" style="padding:8px 16px; font-size:0.9rem; background:var(--muted);" onclick="nextFlashcard()">Next →</button>
      </div>

      <div style="margin-bottom:16px; display:flex; gap:10px; flex-wrap:wrap;">
        <input type="search" id="glossary-search" placeholder="🔍 Search word in English or Spanish..." aria-label="Search glossary" style="flex:1; min-width:220px; padding:10px 14px; border:1.5px solid var(--line); border-radius:8px; font-size:0.95rem;" oninput="filterGlossaryList()">
      </div>
      <div class="vocab-grid" id="glossary-list-grid"></div>
    `;

    updateFlashcard();
    filterGlossaryList();
  }

  function updateFlashcard() {
    const inner = document.getElementById('flashcard-inner');
    if (!inner || !allWordsList.length) return;
    const item = allWordsList[flashIdx];
    if (!flashFlipped) {
      inner.innerHTML = `
        <span style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--muted);">${item.senseName} (${flashIdx + 1}/${allWordsList.length})</span>
        <div style="font-size:1.8rem; font-weight:800; color:var(--sight); margin:8px 0;">${item.en}</div>
        <div style="font-family:monospace; color:var(--muted);">${item.ipa || ''}</div>
        <p style="font-size:0.85rem; color:var(--muted); margin-top:12px;">👆 Click card to see Spanish &amp; meaning</p>
      `;
    } else {
      inner.innerHTML = `
        <div style="font-size:1.25rem; font-weight:700; color:var(--sight); margin-bottom:6px;">${item.en} = ${item.es}</div>
        <p style="font-size:1rem; margin-bottom:8px;">${item.def}</p>
        <p style="font-style:italic; font-size:0.9rem; color:var(--ink-light);">"${item.ex}"</p>
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
          <button class="audio-btn" onclick="speakWord('${w.en.replace(/'/g, "\\'")}')">🔊</button>
        </div>
        <div class="vocab-es">${w.es} · <span style="font-weight:normal;">${w.senseName}</span></div>
        <div class="vocab-def">${w.def}</div>
        <div class="vocab-ex">"${w.ex}"</div>
      </div>
    `).join('');
  };

  /* ------------------------------------------------------------------
     Final Integrative Exam
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
    FINAL_EXTRA.forEach(q => currentFinalQuestions.push({ senseName: 'All Senses', ...q }));
    currentFinalQuestions = shuffleArray(currentFinalQuestions);

    wrap.innerHTML = currentFinalQuestions.map((q, idx) => `
      <div class="quiz-question-card" id="final-q${idx}">
        <span class="quiz-level-tag">${q.senseName} · ${q.level}</span>
        <div class="quiz-q-title">${idx + 1}. ${q.q}</div>
        <div class="quiz-opts">
          ${shuffleArray(q.options.map((opt, oidx) => ({ text: opt, isCorrect: oidx === 0 }))).map(o => `
            <label class="quiz-opt-label">
              <input type="radio" name="final-q-${idx}" value="${o.isCorrect ? '1' : '0'}">
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
      const card = document.getElementById(`final-q${idx}`);
      const checked = card.querySelector(`input[name="final-q-${idx}"]:checked`);
      card.classList.remove('correct', 'incorrect');
      if (checked) {
        answered++;
        if (checked.value === '1') {
          score++;
          card.classList.add('correct');
        } else {
          card.classList.add('incorrect');
        }
      }
    });

    const studentName = document.getElementById('student-name')?.value.trim() || '8th Grade Student';
    const res = document.getElementById('final-exam-result');
    if (answered < total) {
      res.style.color = 'var(--incorrect)';
      res.textContent = `Please answer all questions (${answered}/${total}).`;
    } else {
      const pct = Math.round(score / total * 100);
      res.style.color = pct >= 80 ? 'var(--correct)' : 'var(--ink)';
      res.innerHTML = `
        <div style="background:var(--paper-tint); border:2px solid var(--line); border-radius:12px; padding:20px; margin-top:16px;">
          <h3>🎓 Final Report for ${studentName}: ${score} / ${total} (${pct}%)</h3>
          <p style="margin-top:6px;">${pct >= 80 ? '🌟 Excellent mastery! You understand how every sense organ detects stimuli and sends signals to the brain.' : '👍 Good effort! Read the feedback boxes on the red questions and try a new shuffled exam.'}</p>
          <button class="action-btn" style="margin-top:12px;" onclick="window.print()">🖨️ Print / Save PDF Report</button>
        </div>
      `;
    }
  };

  /* ------------------------------------------------------------------
     Teacher Guide Panel
  ------------------------------------------------------------------ */
  function renderTeacherGuide() {
    const wrap = document.getElementById('teacher-guide-content');
    if (!wrap) return;

    wrap.innerHTML = `
      <div class="reading-block">
        <h3>1. Suggested 6-Session Lesson Sequence (45 min per session)</h3>
        <ul style="padding-left:20px; margin:10px 0 18px; line-height:1.7;">
          <li><strong>Session 1 (Sight &amp; The Unifying Model):</strong> Introduce <em>Stimulus → Receptor → Nerve → Brain</em>. Explore the Eye diagram, run the Blind Spot test, and complete the Sight sequence.</li>
          <li><strong>Session 2 (Hearing):</strong> Warm up with the 30-second sound hunt, study the Outer/Middle/Inner ear, practice ordering the path of sound, and discuss the 60/60 headphone rule.</li>
          <li><strong>Session 3 (Smell):</strong> Trace odor molecules → mucus → olfactory receptors → olfactory nerve → olfactory bulb. Discuss why smells trigger memories.</li>
          <li><strong>Session 4 (Taste &amp; Flavor):</strong> Debunk the tongue map myth, run the Nose-Pinch candy experiment, and contrast <em>taste</em> vs. <em>flavor</em>.</li>
          <li><strong>Session 5 (Touch):</strong> Compare the three skin layers (epidermis, dermis, hypodermis) and run the Two-Point discrimination test on fingertips vs. forearm.</li>
          <li><strong>Session 6 (Synthesis &amp; Final Assessment):</strong> Complete the Interactive Comparative Table in pairs, practice with Flashcards, and take the Final Unit Exam.</li>
        </ul>

        <h3>2. Common Student Misconceptions to Address</h3>
        <ul style="padding-left:20px; margin:10px 0 18px; line-height:1.7;">
          <li><strong>"The lens is called lente in Spanish":</strong> Highlight the false friend — the eye's lens is the <em>cristalino</em>.</li>
          <li><strong>"The olfactory nerve goes from the olfactory bulb to the brain":</strong> Clarify that the <em>olfactory nerve</em> connects the receptors to the olfactory bulb; from the bulb to the cortex is the <em>olfactory tract</em>.</li>
          <li><strong>"Sweet is only tasted on the tip of the tongue":</strong> All areas of the tongue with taste buds detect all five basic tastes (sweet, sour, salty, bitter, umami).</li>
          <li><strong>"Spicy is one of the basic tastes":</strong> Spicy (capsaicin) activates pain and heat receptors in the tongue, not taste cells.</li>
        </ul>

        <h3>3. Quick Rubric for Step 8 Writing Tasks (CLIL)</h3>
        <table class="compare-table" style="margin-top:10px;">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>3 - Proficient</th>
              <th>2 - Developing</th>
              <th>1 - Needs Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Scientific Sequence</strong></td>
              <td>Includes stimulus, receptor, nerve, and brain in the right order.</td>
              <td>Misses 1 step or mixes 2 adjacent parts.</td>
              <td>Steps are incomplete or out of order.</td>
            </tr>
            <tr>
              <td><strong>Key Vocabulary</strong></td>
              <td>Uses 5+ key terms accurately.</td>
              <td>Uses 3–4 key terms accurately.</td>
              <td>Uses fewer than 3 key terms.</td>
            </tr>
            <tr>
              <td><strong>Sequence Connectors</strong></td>
              <td>Uses <em>first, next, then, finally</em> clearly in present simple.</td>
              <td>Uses some connectors with minor grammar errors.</td>
              <td>Writes isolated words without connectors.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  /* ------------------------------------------------------------------
     Utility: Array Shuffle
  ------------------------------------------------------------------ */
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSensePanels();
    renderCompareTable('study');
    renderGlossaryPanel();
    rebuildFinalExam();
    renderTeacherGuide();
  });

})();
