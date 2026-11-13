/* =========================================================
   The Five Senses — CLIL Neurophysiology & Psychometric Engine (v4.0)
   100% Encapsulated IIFE (Zero Global Leakage / Strict CSP Compliant)
   Integrates:
   - SessionManager (Classroom Multi-User Isolation, TTL & Signed JSON)
   - SecurityGuard (escapeHTML, Private Answer Map, SHA-256 Certificate Seal)
   - Neuro-Lab Gamification HUD & Procedural Web Audio SFX
   - Lazy Tab & Video Mounting + 180ms Debouncing
   - Pixar/NatGeo SVG Orthogonal Leader Lines & Test Me 2.0
   - CALL/MALL 4-Skills Engine (Levenshtein ASR, Karaoke TTS, Audio-Cloze,
     Morphosyntactic & Causal Linter)
   - SM-2 Algorithmic Flashcards + Dual-Coding Mnemonic Hooks
   - Clinical Lesion Simulator + Adaptive Linguaskill CAT Assessment
   ========================================================= */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     0. Service Worker Registration (Offline-First PWA)
  ------------------------------------------------------------------ */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  /* ------------------------------------------------------------------
     1. Security Utilities & Private Answer Store
  ------------------------------------------------------------------ */
  const PRIVATE_ANSWERS = new Map();
  let uidCounter = 0;
  function nextUid(prefix) {
    uidCounter += 1;
    return `${prefix}_${uidCounter}`;
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function computeVerificationHash(payloadStr) {
    try {
      if (window.crypto && window.crypto.subtle) {
        const data = new TextEncoder().encode(payloadStr + '|NGSS-CLIL-V4');
        const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        return hashArr.slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      }
    } catch (e) {}
    // Fallback deterministic digest if non-HTTPS file://
    let h = 2166136261;
    for (let i = 0; i < payloadStr.length; i++) {
      h ^= payloadStr.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ('00000000' + (h >>> 0).toString(16).toUpperCase()).slice(-8);
  }

  function debounce(fn, waitMs) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), waitMs);
    };
  }

  /* ------------------------------------------------------------------
     2. Classroom Multi-User Session Manager (FERPA / Shared PC Safe)
  ------------------------------------------------------------------ */
  const PROFILE_KEY_PREFIX = 'fiveSenses_v4_profile_';
  const ACTIVE_PROFILE_KEY = 'fiveSenses_active_profile';
  const SESSION_TTL_MS = 90 * 60 * 1000; // 90 minutes inactivity expiry

  function defaultAppState() {
    return {
      lastActive: Date.now(),
      scores: {},
      activeStages: { sight: 1, hearing: 1, smell: 1, taste: 1, touch: 1 },
      writtenText: {},
      poeObs: {},
      ican: {},
      sm2: {}, // { wordId: { interval, repetitions, easeFactor, nextReview } }
      scaffolding: 'guided',
      audioSpeed: 0.9,
      gamification: {
        xp: 0,
        streak: 0,
        maxStreak: 0,
        sfxEnabled: true,
        completedActivities: {},
        solvedCases: []
      }
    };
  }

  let currentProfileId = 'Scholar-1';
  try {
    const storedProf = localStorage.getItem(ACTIVE_PROFILE_KEY);
    if (storedProf && /^[a-zA-Z0-9_-]{2,24}$/.test(storedProf)) {
      currentProfileId = storedProf;
    }
  } catch (e) {}

  let appState = defaultAppState();

  function loadProfileState(profileId) {
    appState = defaultAppState();
    try {
      const raw = localStorage.getItem(PROFILE_KEY_PREFIX + profileId);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          const age = Date.now() - (parsed.lastActive || 0);
          if (age < SESSION_TTL_MS) {
            appState = Object.assign(defaultAppState(), parsed);
            appState.gamification = Object.assign(defaultAppState().gamification, parsed.gamification || {});
          } else {
            localStorage.removeItem(PROFILE_KEY_PREFIX + profileId);
          }
        }
      }
    } catch (e) {}
    const lbl = document.getElementById('active-profile-label');
    if (lbl) lbl.textContent = currentProfileId;
  }

  function saveState() {
    appState.lastActive = Date.now();
    try {
      localStorage.setItem(PROFILE_KEY_PREFIX + currentProfileId, JSON.stringify(appState));
      localStorage.setItem(ACTIVE_PROFILE_KEY, currentProfileId);
    } catch (e) {}
    updateTabBadges();
    updateHUD();
  }

  loadProfileState(currentProfileId);

  function switchStudentProfile(newAlias) {
    const clean = (newAlias || '').trim().replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 24);
    if (clean.length < 2) {
      alert('Please enter a student code or alias (at least 2 letters/numbers).');
      return;
    }
    saveState();
    currentProfileId = clean;
    try { localStorage.setItem(ACTIVE_PROFILE_KEY, currentProfileId); } catch (e) {}
    loadProfileState(currentProfileId);
    reinitializeFullWorkspace();
  }

  function endStudentTurn() {
    if (!confirm(`Clear all station data for "${currentProfileId}" and reset for the next student?`)) return;
    try {
      localStorage.removeItem(PROFILE_KEY_PREFIX + currentProfileId);
      // Also clean any biblical_senses reflections for this profile
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('spiritual_senses_' + currentProfileId + '_') || k.startsWith('spiritual_senses_journal-')) {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {}
    appState = defaultAppState();
    const stuInput = document.getElementById('student-name');
    if (stuInput) stuInput.value = '';
    const finalRes = document.getElementById('final-exam-result');
    if (finalRes) finalRes.innerHTML = '';
    saveState();
    reinitializeFullWorkspace();
  }

  function exportPortfolioJSON() {
    const exportObj = {
      schema: 'five-senses-clil-v4',
      profile: currentProfileId,
      exportedAt: new Date().toISOString(),
      state: appState
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FiveSenses_${currentProfileId}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importPortfolioJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed || parsed.schema !== 'five-senses-clil-v4' || !parsed.state || typeof parsed.state !== 'object') {
          throw new Error('Invalid portfolio schema.');
        }
        const safe = defaultAppState();
        if (parsed.state.scores && typeof parsed.state.scores === 'object') safe.scores = parsed.state.scores;
        if (parsed.state.writtenText && typeof parsed.state.writtenText === 'object') safe.writtenText = parsed.state.writtenText;
        if (parsed.state.poeObs && typeof parsed.state.poeObs === 'object') safe.poeObs = parsed.state.poeObs;
        if (parsed.state.sm2 && typeof parsed.state.sm2 === 'object') safe.sm2 = parsed.state.sm2;
        if (parsed.state.gamification && typeof parsed.state.gamification === 'object') {
          safe.gamification = Object.assign(safe.gamification, parsed.state.gamification);
        }
        appState = safe;
        saveState();
        reinitializeFullWorkspace();
        alert(`Portfolio restored cleanly for profile "${currentProfileId}".`);
      } catch (err) {
        alert('Could not import file: Invalid or corrupted JSON portfolio.');
      }
    };
    reader.readAsText(file);
  }

  /* ------------------------------------------------------------------
     3. Gamification Engine & Procedural Web Audio SFX
  ------------------------------------------------------------------ */
  let audioCtx = null;
  function playGameSfx(type) {
    if (!appState.gamification.sfxEnabled) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      const playTone = (freq, dur, delay = 0, wave = 'sine', vol = 0.08) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = wave;
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(vol, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + dur);
      };

      if (type === 'correct') {
        playTone(523.25, 0.12, 0);      // C5
        playTone(659.25, 0.16, 0.07);   // E5
      } else if (type === 'combo') {
        playTone(587.33, 0.1, 0);       // D5
        playTone(739.99, 0.1, 0.06);    // F#5
        playTone(880.00, 0.2, 0.12);    // A5
      } else if (type === 'error') {
        playTone(220, 0.18, 0, 'triangle', 0.06);
      } else if (type === 'levelup') {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, 0.22, i * 0.08));
      }
    } catch (e) {}
  }

  function spawnFloatingXP(anchorEl, labelText) {
    const div = document.createElement('div');
    div.className = 'floating-xp';
    div.textContent = labelText;
    let x = window.innerWidth / 2;
    let y = 120;
    if (anchorEl && anchorEl.getBoundingClientRect) {
      const rect = anchorEl.getBoundingClientRect();
      x = Math.min(window.innerWidth - 130, Math.max(20, rect.left + rect.width / 2 - 40));
      y = Math.max(40, rect.top - 10);
    }
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1200);
  }

  function getCurrentRank(xp) {
    let rank = UNIT.ranks[0];
    let nextRank = UNIT.ranks[1] || null;
    for (let i = 0; i < UNIT.ranks.length; i++) {
      if (xp >= UNIT.ranks[i].minXp) {
        rank = UNIT.ranks[i];
        nextRank = UNIT.ranks[i + 1] || null;
      }
    }
    return { rank, nextRank };
  }

  function awardXP(amount, activityKey, anchorEl, isSuccess = true) {
    const g = appState.gamification;
    if (!isSuccess) {
      g.streak = 0;
      playGameSfx('error');
      saveState();
      return;
    }

    const prevRank = getCurrentRank(g.xp).rank.title;
    g.streak += 1;
    if (g.streak > g.maxStreak) g.maxStreak = g.streak;

    const alreadyCompleted = activityKey && g.completedActivities[activityKey];
    const mult = g.streak >= 5 ? 2 : (g.streak >= 3 ? 1.5 : 1);
    const earned = Math.round((alreadyCompleted ? Math.max(5, amount * 0.2) : amount) * mult);
    g.xp += earned;
    if (activityKey) g.completedActivities[activityKey] = true;

    const newRank = getCurrentRank(g.xp).rank.title;
    if (newRank !== prevRank) {
      playGameSfx('levelup');
      spawnFloatingXP(anchorEl, `🎉 RANK UP: ${newRank}!`);
    } else {
      playGameSfx(g.streak >= 3 ? 'combo' : 'correct');
      spawnFloatingXP(anchorEl, `+${earned} XP${mult > 1 ? ` ⚡${mult}x` : ''}`);
    }
    saveState();
  }

  function updateHUD() {
    const g = appState.gamification;
    const { rank, nextRank } = getCurrentRank(g.xp);
    const badgeEl = document.getElementById('hud-rank-badge');
    const xpVal = document.getElementById('hud-xp-val');
    const nextRankEl = document.getElementById('hud-next-rank');
    const xpFill = document.getElementById('hud-xp-fill');
    const streakEl = document.getElementById('hud-streak-pill');
    const casesEl = document.getElementById('hud-cases-pill');
    const sfxBtn = document.getElementById('hud-sfx-toggle');

    if (badgeEl) badgeEl.textContent = `${rank.badge} ${rank.title}`;
    if (xpVal) xpVal.textContent = g.xp;
    if (nextRankEl) {
      nextRankEl.textContent = nextRank ? `Next: ${nextRank.minXp} XP` : 'Max Rank Achieved!';
    }
    if (xpFill) {
      if (!nextRank) {
        xpFill.style.width = '100%';
      } else {
        const span = nextRank.minXp - rank.minXp;
        const pct = Math.min(100, Math.max(0, Math.round(((g.xp - rank.minXp) / span) * 100)));
        xpFill.style.width = pct + '%';
      }
    }
    if (streakEl) streakEl.textContent = `🔥 Streak: ${g.streak}`;
    if (casesEl) casesEl.textContent = `🩺 Cases: ${(g.solvedCases || []).length}/${CLINICAL_CASES.length}`;
    if (sfxBtn) {
      sfxBtn.textContent = g.sfxEnabled ? '🔊 SFX On' : '🔇 SFX Off';
      sfxBtn.setAttribute('aria-pressed', String(g.sfxEnabled));
    }
  }

  /* ------------------------------------------------------------------
     4. Scaffolding & Audio Engine (TTS Karaoke + Levenshtein ASR)
  ------------------------------------------------------------------ */
  let currentSenseId = 'sight';
  const renderedPanels = new Set();

  function setScaffoldingMode(mode) {
    appState.scaffolding = mode;
    if (mode === 'immersion') {
      document.body.classList.add('scaffolding-immersion');
    } else {
      document.body.classList.remove('scaffolding-immersion');
    }
    const gBtn = document.getElementById('btn-scaffold-guided');
    const iBtn = document.getElementById('btn-scaffold-immersion');
    if (gBtn) {
      gBtn.classList.toggle('active', mode === 'guided');
      gBtn.setAttribute('aria-pressed', String(mode === 'guided'));
    }
    if (iBtn) {
      iBtn.classList.toggle('active', mode === 'immersion');
      iBtn.setAttribute('aria-pressed', String(mode === 'immersion'));
    }
    saveState();
  }

  // Enhanced TTS Sanitizer: Pronounces parenthetical academic synonyms naturally!
  function cleanSpokenText(raw) {
    if (!raw) return '';
    return raw
      .replace(/\s*\(([^)]+)\)/g, ', also called $1')
      .replace(/[\[\]|→←↔⚡🔊🎤⚠️💡✅❌🎯🎧]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getBestEnglishVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.lang.startsWith('en-US') && (v.name.includes('Natural') || v.name.includes('Google')))
        || voices.find(v => v.lang.startsWith('en-US'))
        || voices.find(v => v.lang.startsWith('en-'))
        || null;
  }

  if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = getBestEnglishVoice;
  }

  function speakText(rawText, customRate, onEndCallback) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleaned = cleanSpokenText(rawText);
    if (!cleaned) return;
    const utter = new SpeechSynthesisUtterance(cleaned);
    utter.lang = 'en-US';
    utter.rate = customRate || appState.audioSpeed || 0.9;
    const voice = getBestEnglishVoice();
    if (voice) utter.voice = voice;
    if (onEndCallback) utter.onend = onEndCallback;
    window.speechSynthesis.speak(utter);
  }

  // Karaoke Sentence-by-Sentence Passage Reader
  let activeKaraokeSense = null;
  function toggleReadPassage(senseId) {
    if (!('speechSynthesis' in window)) return;
    const btn = document.getElementById('read-aloud-btn-' + senseId);
    const clearHighlights = () => {
      document.querySelectorAll('.tts-sentence.speaking').forEach(el => el.classList.remove('speaking'));
    };

    if (activeKaraokeSense === senseId && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      activeKaraokeSense = null;
      clearHighlights();
      if (btn) btn.textContent = '🔊 Read Passage Aloud';
      return;
    }

    window.speechSynthesis.cancel();
    clearHighlights();
    activeKaraokeSense = senseId;
    if (btn) btn.textContent = '⏹ Stop Audio';

    const sentenceEls = Array.from(document.querySelectorAll(`#reading-box-${senseId} .tts-sentence`));
    let idx = 0;

    function speakNextSentence() {
      clearHighlights();
      if (activeKaraokeSense !== senseId || idx >= sentenceEls.length) {
        activeKaraokeSense = null;
        if (btn) btn.textContent = '🔊 Read Passage Aloud';
        return;
      }
      const el = sentenceEls[idx];
      el.classList.add('speaking');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      const utter = new SpeechSynthesisUtterance(cleanSpokenText(el.textContent));
      utter.lang = 'en-US';
      utter.rate = appState.audioSpeed || 0.9;
      const voice = getBestEnglishVoice();
      if (voice) utter.voice = voice;
      utter.onend = () => {
        idx += 1;
        speakNextSentence();
      };
      utter.onerror = () => {
        activeKaraokeSense = null;
        clearHighlights();
        if (btn) btn.textContent = '🔊 Read Passage Aloud';
      };
      window.speechSynthesis.speak(utter);
    }

    speakNextSentence();
  }

  function setAudioSpeed(speed) {
    appState.audioSpeed = parseFloat(speed);
    document.querySelectorAll('.speed-btn').forEach(b => {
      b.classList.toggle('active', Math.abs(parseFloat(b.dataset.speed) - appState.audioSpeed) < 0.05);
    });
    saveState();
  }

  // Exact Levenshtein Distance Similarity (0.0 to 1.0)
  function levenshteinSimilarity(a, b) {
    const s1 = a.toLowerCase().replace(/[^a-z]/g, '');
    const s2 = b.toLowerCase().replace(/[^a-z]/g, '');
    if (!s1 && !s2) return 1;
    if (!s1 || !s2) return 0;
    const len1 = s1.length, len2 = s2.length;
    const dp = Array.from({ length: len1 + 1 }, () => new Array(len2 + 1).fill(0));
    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    const maxLen = Math.max(len1, len2);
    return (maxLen - dp[len1][len2]) / maxLen;
  }

  function practicePronunciation(targetText, btnEl, feedbackId, isParagraph = false) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const fb = document.getElementById(feedbackId);
    if (!SpeechRec) {
      if (fb) {
        fb.style.display = 'block';
        fb.style.color = '#9A3412';
        fb.textContent = '⚠️ Microphone speech recognition requires Chrome or Edge desktop/mobile.';
      }
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.continuous = isParagraph;

    btnEl.classList.add('recording');
    if (fb) {
      fb.style.display = 'block';
      fb.style.color = 'var(--ink-light)';
      fb.textContent = isParagraph ? '🎙️ Reading paragraph... Speak steadily now.' : `🎙️ Listening... Say "${targetText}"`;
    }

    let finalTranscript = '';
    let finished = false;

    const evaluateSpeech = (alternatives) => {
      if (finished) return;
      finished = true;
      btnEl.classList.remove('recording');
      if (!fb) return;

      const bestSpoken = alternatives[0] || '';
      if (isParagraph) {
        const targetWords = targetText.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);
        const spokenWords = bestSpoken.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);
        if (targetWords.length === 0) return;
        let matchedCount = 0;
        targetWords.forEach(tw => {
          if (spokenWords.some(sw => levenshteinSimilarity(tw, sw) >= 0.78)) matchedCount++;
        });
        const pct = Math.round((matchedCount / targetWords.length) * 100);
        if (pct >= 65) {
          fb.style.color = 'var(--correct)';
          fb.textContent = `🌟 Great Shadowing! Word-level acoustic match: ${pct}% (${matchedCount}/${targetWords.length} words detected).`;
          awardXP(30, 'speak_para_' + feedbackId, btnEl, true);
        } else {
          fb.style.color = '#B45309';
          fb.textContent = `🔄 Detected ${pct}% (${matchedCount}/${targetWords.length} words). Heard: "${bestSpoken}". Read more slowly and clearly.`;
        }
        return;
      }

      // Single term phonological Levenshtein evaluation + Medical ASR Alias check
      const cleanTarget = targetText.replace(/\s*\([^)]*\)/g, '').trim();
      const targetKey = cleanTarget.toLowerCase().replace(/[^a-z]/g, '');
      const aliases = (UNIT.asrAliases && UNIT.asrAliases[targetKey]) ? UNIT.asrAliases[targetKey] : [];

      let maxSim = 0;
      alternatives.forEach(alt => {
        const sim = levenshteinSimilarity(cleanTarget, alt);
        if (sim > maxSim) maxSim = sim;
        // Also compare individual spoken words in case student said "the cornea"
        alt.split(/\s+/).forEach(tok => {
          const tokSim = levenshteinSimilarity(cleanTarget, tok);
          if (tokSim > maxSim) maxSim = tokSim;
          if (aliases.some(al => levenshteinSimilarity(al, tok) >= 0.85)) {
            maxSim = Math.max(maxSim, 0.9);
          }
        });
      });

      const pct = Math.round(maxSim * 100);
      if (pct >= 82) {
        fb.style.color = 'var(--correct)';
        fb.textContent = `🌟 Excellent (${pct}% match)! Heard: "${bestSpoken}"`;
        awardXP(15, 'speak_' + targetKey, btnEl, true);
      } else if (pct >= 60) {
        fb.style.color = '#B45309';
        fb.textContent = `⚡ Close (${pct}% match)! Heard: "${bestSpoken}". Listen to 🔊 and emphasize the stressed syllable.`;
      } else {
        fb.style.color = 'var(--incorrect)';
        fb.textContent = `🔄 Heard "${bestSpoken}" (${pct}%). Play 🔊 audio, check the syllable stress guide, and try again.`;
      }
    };

    if (isParagraph) {
      setTimeout(() => { try { recognition.stop(); } catch (e) {} }, 12000);
    }

    recognition.onresult = (event) => {
      if (isParagraph) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          finalTranscript += ' ' + event.results[i][0].transcript;
        }
        if (event.results[event.results.length - 1].isFinal) {
          evaluateSpeech([finalTranscript.trim()]);
        }
      } else {
        const alts = Array.from(event.results[0]).map(r => r.transcript);
        evaluateSpeech(alts);
      }
    };

    recognition.onerror = () => {
      btnEl.classList.remove('recording');
      if (fb) {
        fb.style.display = 'block';
        fb.style.color = 'var(--incorrect)';
        fb.textContent = '⚠️ Could not hear clearly. Check microphone permission and speak close to mic.';
      }
    };

    recognition.onend = () => {
      btnEl.classList.remove('recording');
      if (isParagraph && finalTranscript.trim() && !finished) {
        evaluateSpeech([finalTranscript.trim()]);
      }
    };

    recognition.start();
  }

  /* ------------------------------------------------------------------
     5. Modal Focus Trap & Accessible Controls
  ------------------------------------------------------------------ */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  let lastFocusedTrigger = null;

  function openGlossaryModal(wordId, senseId, triggerEl) {
    lastFocusedTrigger = triggerEl || document.activeElement;
    const sense = SENSES.find(s => s.id === senseId);
    let w = sense ? sense.words.find(item => item.id === wordId) : null;
    if (!w) w = EXTRA_WORDS[wordId];
    if (!w) return;

    modalTitle.textContent = w.en;
    modalBody.innerHTML = `
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <span class="vocab-ipa">${escapeHTML(w.ipa || '')}</span>
        ${w.syllables ? `<span class="syllable-pill">${escapeHTML(w.syllables)}</span>` : ''}
        <span class="vocab-es" style="margin:0;">${escapeHTML(w.es)}</span>
        <button class="audio-btn" data-action="speak-word" data-word="${escapeHTML(w.en)}">🔊 Listen</button>
        <button class="mic-btn" data-action="mic-modal" data-word="${escapeHTML(w.en)}" title="Practice speaking">🎤</button>
      </div>
      <div id="modal-mic-fb" style="display:none; font-size:0.86rem; font-weight:700; margin-bottom:10px;"></div>
      <p style="font-size:1.02rem; margin-bottom:10px;"><strong>Definition:</strong> ${escapeHTML(w.def)}</p>
      <p style="font-style:italic; color:var(--ink-light); background:var(--paper-tint); padding:10px 14px; border-radius:8px;">"${escapeHTML(w.ex)}"</p>
      ${w.pronTipEs ? `<div class="l1-tip-box es-sub">${escapeHTML(w.pronTipEs)}</div>` : ''}
      ${w.mnemonic ? `<div class="mnemonic-badge">🧠 Memory Hook: ${escapeHTML(w.mnemonic)}</div>` : ''}
      ${w.note ? `<p style="margin-top:10px; font-size:0.88rem; color:var(--sight); font-weight:600;">${escapeHTML(w.note)}</p>` : ''}
    `;
    modalOverlay.classList.add('open');
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  }
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------
     6. Main Tab Navigation + Lazy Tab Mounting
  ------------------------------------------------------------------ */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.sense-panel');

  function pauseVideosOutside(activeSenseId) {
    document.querySelectorAll('video').forEach(v => {
      if (!v.closest(`#panel-${activeSenseId}`)) {
        try { v.pause(); } catch (e) {}
      }
    });
  }

  function switchTab(targetId) {
    currentSenseId = targetId;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    pauseVideosOutside(targetId);

    tabButtons.forEach(btn => {
      const active = btn.dataset.target === targetId;
      btn.setAttribute('aria-selected', String(active));
    });

    panels.forEach(p => {
      p.classList.toggle('active', p.id === 'panel-' + targetId);
    });

    // Lazy mount sense panel or auxiliary tab on first open
    if (['sight', 'hearing', 'smell', 'taste', 'touch'].includes(targetId)) {
      ensureSenseRendered(targetId);
    } else if (targetId === 'compare' && !renderedPanels.has('compare')) {
      renderCompareTable('study');
      renderClinicalSimulator();
      renderedPanels.add('compare');
    } else if (targetId === 'glossary' && !renderedPanels.has('glossary')) {
      renderGlossaryPanel();
      renderedPanels.add('glossary');
    } else if (targetId === 'final' && !renderedPanels.has('final')) {
      rebuildStandardExam();
      renderedPanels.add('final');
    } else if (targetId === 'teacher' && !renderedPanels.has('teacher')) {
      renderTeacherGuide();
      renderedPanels.add('teacher');
    }
  }

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = tabButtons[(idx + 1) % tabButtons.length];
        next.focus();
        switchTab(next.dataset.target);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length];
        prev.focus();
        switchTab(prev.dataset.target);
      }
    });
  });

  function updateTabBadges() {
    SENSES.forEach(s => {
      const badge = document.getElementById('badge-' + s.id);
      if (!badge) return;
      const sc = appState.scores[s.id];
      if (sc !== undefined) {
        const pct = Math.round((sc / s.quiz.length) * 100);
        badge.textContent = `${pct}%`;
        badge.style.background = pct >= 70 ? 'var(--correct)' : 'var(--accent, var(--sight))';
        badge.style.color = '#FFF';
      } else {
        badge.textContent = '0%';
        badge.style.background = '';
        badge.style.color = '';
      }
    });
  }

  /* ------------------------------------------------------------------
     7. Lazy Sense Panel Renderer + Stage Stepper Navigation
  ------------------------------------------------------------------ */
  function goToStage(senseId, stageNum) {
    const panel = document.getElementById('panel-' + senseId);
    if (!panel) return;
    appState.activeStages[senseId] = stageNum;

    panel.querySelectorAll('.stage-tab').forEach(tab => {
      const isAct = parseInt(tab.dataset.stage, 10) === stageNum;
      tab.classList.toggle('active', isAct);
      tab.setAttribute('aria-selected', String(isAct));
    });

    panel.querySelectorAll('.stage-container').forEach(cont => {
      cont.classList.toggle('active', parseInt(cont.dataset.stage, 10) === stageNum);
    });

    // Lazy load path-of-light.mp4 only when Stage 2 of Sight is opened
    if (senseId === 'sight') {
      const vid = document.getElementById('sight-video-el');
      if (vid) {
        if (stageNum === 2 && !vid.getAttribute('src')) {
          vid.setAttribute('src', 'path-of-light.mp4');
        } else if (stageNum !== 2) {
          try { vid.pause(); } catch (e) {}
        }
      }
    }

    saveState();
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderReadingWithInlines(sense) {
    let html = '';

    // Graded A2 Executive Summary (Prominent in Guided A2 mode)
    if (sense.reading.a2Summary) {
      html += `
        <div class="es-sub" style="background:var(--tint); border-left:4px solid var(--accent); padding:14px 16px; border-radius:0 10px 10px 0; margin-bottom:16px;">
          <strong style="color:var(--accent); display:block; margin-bottom:4px;">🟢 Guided A2 Core Summary (Simplified Input):</strong>
          <p style="margin:0; font-size:0.95rem;">${escapeHTML(sense.reading.a2Summary)}</p>
        </div>
      `;
    }

    let sentIdx = 0;
    sense.reading.paragraphs.forEach((p, pIdx) => {
      // Split into sentences before token substitution
      const rawSentences = p.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [p];
      const wrappedSentences = rawSentences.map(sStr => {
        let formatted = escapeHTML(sStr).replace(/\[\[([a-z]+)\|([^\]]+)\]\]/g, (m, id, label) => {
          return `<button class="vocab-inline" data-action="open-glossary" data-word="${escapeHTML(id)}" data-sense="${sense.id}">${label}</button>`;
        });
        sentIdx += 1;
        return `<span class="tts-sentence" id="sent-${sense.id}-${sentIdx}">${formatted}</span>`;
      }).join(' ');

      html += `<p>${wrappedSentences}</p>`;

      // Inline Comprehension Checks (Answers stored securely in PRIVATE_ANSWERS)
      const check = sense.reading.checks.find(c => c.after === pIdx);
      if (check) {
        const uid = nextUid('inline_chk');
        const correctTxt = check.options[0];
        PRIVATE_ANSWERS.set(uid, { correctTxt, explain: check.explain });
        const shuffled = shuffleArray(check.options.slice());
        html += `
          <div class="inline-check" id="chk-${uid}">
            <strong>Quick Comprehension Check:</strong> ${escapeHTML(check.q)}
            <div class="inline-options">
              ${shuffled.map(opt => `<button class="inline-opt" data-action="check-inline-q" data-uid="${uid}" data-opt="${escapeHTML(opt)}">${escapeHTML(opt)}</button>`).join('')}
            </div>
            <div class="inline-feedback" id="fb-${uid}" style="display:none; margin-top:8px; font-size:0.9rem; font-weight:600;"></div>
          </div>
        `;
      }
    });

    if (sense.reading.collocations) {
      html += `
        <div style="margin-top:14px; background:#F8FAFC; padding:12px 14px; border-radius:10px; border:1px solid var(--line);">
          <strong style="font-size:0.82rem; color:var(--accent); text-transform:uppercase; letter-spacing:0.06em;">📘 Academic Collocations (OPAL / TOEFL Junior):</strong>
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:6px;">
            ${sense.reading.collocations.map(col => `<span class="coach-chip" data-action="speak-word" data-word="${escapeHTML(col)}" title="Click to hear academic phrase">🔊 ${escapeHTML(col)}</span>`).join('')}
          </div>
        </div>
      `;
    }
    return html;
  }

  function ensureSenseRendered(senseId) {
    if (renderedPanels.has(senseId)) return;
    const sense = SENSES.find(s => s.id === senseId);
    const panel = document.getElementById('panel-' + senseId);
    if (!sense || !panel) return;

    const stage = appState.activeStages[sense.id] || 1;
    const bio = sense.biophysics;
    const senseCases = CLINICAL_CASES.filter(c => c.sense === sense.id);

    panel.innerHTML = `
      <div class="sense-header">
        <span class="sense-badge">${escapeHTML(sense.receptorClassification)} <span class="es-sub">· ${escapeHTML(sense.receptorClassificationEs)}</span></span>
        <h2 class="sense-title">${escapeHTML(sense.name)} — ${escapeHTML(sense.organ)} <span class="es-sub" style="font-size:0.65em; font-weight:500;">(${escapeHTML(sense.es)} · ${escapeHTML(sense.organEs)})</span></h2>
        <p style="font-size:0.92rem; color:var(--ink-light); margin-top:6px;">
          <strong>Word Family:</strong> ${escapeHTML(sense.wordFamily)} &nbsp;|&nbsp;
          <strong>Target Cortex:</strong> ${escapeHTML(sense.cortex)}
        </p>
      </div>

      <!-- 4-Stage Stepper Sub-Navigation (WAI-ARIA Tablist) -->
      <nav class="stage-nav" role="tablist" aria-label="${escapeHTML(sense.name)} learning stages">
        <button class="stage-tab ${stage === 1 ? 'active' : ''}" role="tab" aria-selected="${stage === 1}" data-action="go-stage" data-sense="${sense.id}" data-stage="1">
          <strong>1. Explore &amp; Anatomy</strong><small>Warm-up, Diagram &amp; Phonology</small>
        </button>
        <button class="stage-tab ${stage === 2 ? 'active' : ''}" role="tab" aria-selected="${stage === 2}" data-action="go-stage" data-sense="${sense.id}" data-stage="2">
          <strong>2. Biophysics &amp; Clinic</strong><small>Reading, Ion Channels &amp; Patient Lab</small>
        </button>
        <button class="stage-tab ${stage === 3 ? 'active' : ''}" role="tab" aria-selected="${stage === 3}" data-action="go-stage" data-sense="${sense.id}" data-stage="3">
          <strong>3. Practice &amp; POE Lab</strong><small>Sequence, Match, Dictation &amp; Lab</small>
        </button>
        <button class="stage-tab ${stage === 4 ? 'active' : ''}" role="tab" aria-selected="${stage === 4}" data-action="go-stage" data-sense="${sense.id}" data-stage="4">
          <strong>4. Writing &amp; Quiz</strong><small>Morpho-Linter, Shadowing &amp; Quiz</small>
        </button>
      </nav>

      <!-- STAGE 1 -->
      <div class="stage-container ${stage === 1 ? 'active' : ''}" data-stage="1">
        <div class="step-section">
          <div class="step-header">
            <span class="step-num">1</span>
            <h3 class="step-title">Warm-up &amp; Learning Objectives</h3>
          </div>
          <div class="objectives-box">
            <ul class="objectives-list">
              ${sense.objectives.map(obj => `<li>${escapeHTML(obj)}</li>`).join('')}
            </ul>
          </div>
          <div class="warmup-grid">
            <div class="warmup-card">
              <h4>🔍 Observe &amp; Predict</h4>
              <p>${escapeHTML(sense.warmup.q)}</p>
              <p class="es-sub">${escapeHTML(sense.warmup.qEs)}</p>
            </div>
            <div class="warmup-card">
              <h4>✋ Try This Right Now</h4>
              <p>${escapeHTML(sense.warmup.task)}</p>
              <p class="es-sub">${escapeHTML(sense.warmup.taskEs)}</p>
            </div>
          </div>
        </div>

        <div class="step-section">
          <div class="step-header">
            <span class="step-num">2</span>
            <h3 class="step-title">NatGeo Anatomical Cutaway &amp; Signal Pathway</h3>
          </div>
          <div class="diagram-wrapper">
            <div class="diagram-controls">
              <div class="diagram-mode-toggles">
                <button class="mode-btn active" id="btn-explore-${sense.id}" data-action="diagram-mode" data-sense="${sense.id}" data-mode="explore">🔎 Explore Cutaway</button>
                <button class="mode-btn" id="btn-test-${sense.id}" data-action="diagram-mode" data-sense="${sense.id}" data-mode="test">🎯 Test Me 2.0 (Challenge)</button>
                <button class="mode-btn" data-action="animate-signal" data-sense="${sense.id}">⚡ Animate Neural Signal</button>
              </div>
              <div id="diagram-status-${sense.id}" style="font-size:0.88rem; font-weight:700; color:var(--accent);">Click any numbered tissue or pin to inspect.</div>
            </div>

            <div class="diagram-stage" id="diagram-stage-${sense.id}">
              <svg viewBox="0 0 800 450" role="img" aria-label="${escapeHTML(DIAGRAMS[sense.id].title)}">
                ${DIAGRAMS[sense.id].svg}
                <g class="natgeo-callouts" id="callouts-${sense.id}"></g>
              </svg>
            </div>

            <div class="diagram-mobile-dock" id="dock-${sense.id}"></div>
            <div class="diagram-info-panel" id="diagram-info-${sense.id}">
              <strong>${escapeHTML(sense.organ)}:</strong> Click any numbered hotspot to hear its pronunciation, inspect its phonological breakdown, and review its transduction role.
            </div>
          </div>
        </div>

        <div class="step-section">
          <div class="step-header">
            <span class="step-num">3</span>
            <h3 class="step-title">Academic Vocabulary, Syllables &amp; Levenshtein Speaking Coach</h3>
          </div>
          <div class="vocab-grid">
            ${sense.words.map((w, idx) => `
              <div class="vocab-card">
                <div class="vocab-top">
                  <span class="vocab-word">${escapeHTML(w.en)}</span>
                  <div class="vocab-actions">
                    <button class="audio-btn" data-action="speak-word" data-word="${escapeHTML(w.en)}" title="Listen">🔊</button>
                    <button class="mic-btn" data-action="mic-word" data-word="${escapeHTML(w.en)}" data-fb="mic-fb-${sense.id}-${idx}" title="Test Pronunciation">🎤</button>
                  </div>
                </div>
                <div>
                  <span class="vocab-ipa">${escapeHTML(w.ipa || '')}</span>
                  ${w.syllables ? `<span class="syllable-pill">${escapeHTML(w.syllables)}</span>` : ''}
                  <span class="vocab-es">${escapeHTML(w.es)}</span>
                </div>
                <p class="vocab-def">${escapeHTML(w.def)}</p>
                <p class="vocab-ex">"${escapeHTML(w.ex)}"</p>
                ${w.pronTipEs ? `<div class="l1-tip-box es-sub">${escapeHTML(w.pronTipEs)}</div>` : ''}
                ${w.mnemonic ? `<div class="mnemonic-badge">🧠 ${escapeHTML(w.mnemonic)}</div>` : ''}
                ${w.note ? `<div class="vocab-note">${escapeHTML(w.note)}</div>` : ''}
                <div id="mic-fb-${sense.id}-${idx}" style="display:none; font-size:0.82rem; font-weight:700; margin-top:6px;"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="stage-footer">
          <span>Stage 1 of 4 Completed</span>
          <button class="action-btn" data-action="go-stage" data-sense="${sense.id}" data-stage="2">Next: Biophysics &amp; Clinic →</button>
        </div>
      </div>

      <!-- STAGE 2 -->
      <div class="stage-container ${stage === 2 ? 'active' : ''}" data-stage="2">
        <div class="step-section">
          <div class="step-header">
            <span class="step-num">4</span>
            <h3 class="step-title">Scientific Reading &amp; Karaoke Comprehension</h3>
          </div>

          <div class="reading-controls-row">
            <button class="action-btn" id="read-aloud-btn-${sense.id}" data-action="toggle-read-aloud" data-sense="${sense.id}" style="padding:8px 16px; font-size:0.88rem;">🔊 Read Passage Aloud</button>
            <div class="speed-toggle-pill" role="group" aria-label="Audio speech speed">
              <button class="speed-btn ${appState.audioSpeed === 0.75 ? 'active' : ''}" data-action="set-speed" data-speed="0.75">0.75× Slow A2</button>
              <button class="speed-btn ${appState.audioSpeed === 0.9 ? 'active' : ''}" data-action="set-speed" data-speed="0.9">0.9× Guided</button>
              <button class="speed-btn ${appState.audioSpeed === 1.0 ? 'active' : ''}" data-action="set-speed" data-speed="1.0">1.0× Natural B1</button>
            </div>
          </div>

          ${sense.id === 'sight' ? `
            <div style="margin-bottom:18px; border-radius:12px; overflow:hidden; border:1.5px solid var(--line); background:#0F172A;">
              <video id="sight-video-el" controls playsinline preload="none" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 320'%3E%3Crect width='800' height='320' fill='%230F172A'/%3E%3Ctext x='400' y='165' text-anchor='middle' fill='%23E0E7FF' font-family='sans-serif' font-size='22' font-weight='700'%3E▶ Video: The Path of Light (Click Play to Load)%3C/text%3E%3C/svg%3E" style="width:100%; max-height:360px; display:block;"></video>
              <div style="padding:8px 14px; font-size:0.82rem; color:#CBD5E1; background:#1E293B;">🎬 Visual Animation: Follow photons through cornea, lens, retina, and CN II.</div>
            </div>
          ` : ''}

          <div class="reading-box" id="reading-box-${sense.id}">
            <h4>${escapeHTML(sense.reading.title)}</h4>
            ${renderReadingWithInlines(sense)}
          </div>

          <!-- Molecular Biophysics & Nobel Neurophysiology Card -->
          <div class="biophysics-card">
            <h4>⚛️ Molecular Biophysics &amp; Receptor Electrophysiology</h4>
            <div class="bio-grid">
              <div class="bio-item">
                <strong>Ion Channels &amp; Molecular Detectors</strong>
                ${escapeHTML(bio.ionChannel)}
                <div class="es-sub" style="color:#94A3B8; margin-top:4px; font-size:0.78rem;">${escapeHTML(bio.ionChannelEs)}</div>
              </div>
              <div class="bio-item">
                <strong>Receptor Potential &amp; Transduction</strong>
                ${escapeHTML(bio.receptorPotential)}
              </div>
              <div class="bio-item">
                <strong>Adaptation Dynamics (Phasic vs Tonic)</strong>
                ${escapeHTML(bio.adaptation)}
              </div>
              <div class="bio-item">
                <strong>Thalamic Relay &amp; Target Cortex</strong>
                ${escapeHTML(bio.thalamicRelay)}
              </div>
            </div>
          </div>
        </div>

        <div class="step-section">
          <div class="step-header">
            <span class="step-num">5</span>
            <h3 class="step-title">Health, Disorders &amp; Clinical Lesion Missions</h3>
          </div>
          <div class="funfact-box">
            <strong>💡 Neurobiology Insight:</strong> ${escapeHTML(sense.funfact)}
          </div>
          <div class="health-grid">
            <div class="health-card">
              <h4 style="color:#DC2626; margin-bottom:10px;">⚠️ Sensory Disorders</h4>
              <ul>${sense.health.problems.map(pr => `<li><strong>${escapeHTML(pr.name)}:</strong> ${escapeHTML(pr.text)}</li>`).join('')}</ul>
            </div>
            <div class="health-card">
              <h4 style="color:#15803D; margin-bottom:10px;">🛡️ Evidence-Based Prevention</h4>
              <ul>${sense.health.care.map(cr => `<li>${escapeHTML(cr)}</li>`).join('')}</ul>
            </div>
          </div>

          <!-- Interactive Neuro-Sensory Doctor Simulator for this sense -->
          ${senseCases.map(cs => renderClinicalCaseHTML(cs)).join('')}

          <details style="margin-top:16px; background:var(--paper-tint); border-radius:12px; padding:12px 16px; border:1px solid var(--line);">
            <summary style="cursor:pointer; font-weight:700; color:var(--accent);">🔬 Go Deeper: Advanced Cortical &amp; Cellular Phenomena</summary>
            <div style="margin-top:12px; display:grid; gap:10px;">
              ${sense.deeper.map(dp => `
                <div style="background:#FFF; padding:10px 14px; border-radius:8px; border:1px solid var(--line);">
                  <strong>${escapeHTML(dp.name)}</strong> <span class="es-sub">(${escapeHTML(dp.es)})</span>: ${escapeHTML(dp.text)}
                </div>
              `).join('')}
            </div>
          </details>
        </div>

        <div class="stage-footer">
          <button class="action-btn" style="background:var(--muted);" data-action="go-stage" data-sense="${sense.id}" data-stage="1">← Back to Stage 1</button>
          <button class="action-btn" data-action="go-stage" data-sense="${sense.id}" data-stage="3">Next: Practice &amp; POE Lab →</button>
        </div>
      </div>

      <!-- STAGE 3 -->
      <div class="stage-container ${stage === 3 ? 'active' : ''}" data-stage="3">
        <div class="step-section">
          <div class="step-header">
            <span class="step-num">6</span>
            <h3 class="step-title">Active Mastery: Sequence, Match &amp; Audio-Cloze</h3>
          </div>

          <h4 style="margin-bottom:8px;">A. Trace the 5-Step Sensory Pathway (Click chips in correct order)</h4>
          <div class="activity-box">
            <div class="path-slots" id="path-slots-${sense.id}"></div>
            <div class="path-chips" id="path-chips-${sense.id}"></div>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="action-btn" data-action="check-path" data-sense="${sense.id}" style="padding:7px 14px; font-size:0.86rem;">Check Sequence</button>
              <button class="action-btn" data-action="reset-path" data-sense="${sense.id}" style="padding:7px 14px; font-size:0.86rem; background:var(--muted);">Reset</button>
            </div>
            <div id="path-fb-${sense.id}" style="margin-top:10px; font-weight:700;"></div>
          </div>

          <h4 style="margin:22px 0 8px;">B. Match Anatomical Structures to Functions (Combo Multiplier Active ⚡)</h4>
          <div class="activity-box">
            <div class="match-container" id="match-box-${sense.id}"></div>
            <button class="action-btn" data-action="reset-match" data-sense="${sense.id}" style="padding:7px 14px; font-size:0.86rem; background:var(--muted); margin-top:10px;">Shuffle Pairs</button>
            <div id="match-fb-${sense.id}" style="margin-top:10px; font-weight:700;"></div>
          </div>

          <h4 style="margin:22px 0 8px;">C. Scientific Cloze &amp; Dictation Mode (Tap chips or listen to fill)</h4>
          <div class="activity-box" id="cloze-box-${sense.id}"></div>
        </div>

        <div class="step-section">
          <div class="step-header">
            <span class="step-num">7</span>
            <h3 class="step-title">Inquiry Mini-Lab: ${escapeHTML(sense.experiment.title)}</h3>
          </div>
          <div class="experiment-card">
            <div class="poe-box">
              <span class="poe-badge">Phase 1: Formulate Hypothesis (Predict)</span>
              <p style="font-weight:700; font-size:0.95rem; margin:8px 0 6px;">${escapeHTML(sense.experiment.predict.q)}</p>
              <p class="es-sub" style="margin-bottom:10px;">${escapeHTML(sense.experiment.predict.qEs)}</p>
              <div class="poe-options">
                ${sense.experiment.predict.options.map((opt, oIdx) => `
                  <label class="poe-opt-label">
                    <input type="radio" name="poe-predict-${sense.id}" value="${oIdx}" data-action="poe-predict" data-sense="${sense.id}">
                    <span>${escapeHTML(opt)}</span>
                  </label>
                `).join('')}
              </div>
              <div id="poe-predict-fb-${sense.id}" style="display:none; font-size:0.88rem; font-weight:700; margin-top:8px;"></div>
            </div>

            <div class="poe-box" style="background:#FFF;">
              <span class="poe-badge" style="background:var(--gold);">Phase 2: Conduct &amp; Observe</span>
              <p style="margin:8px 0 6px;"><strong>Required Materials:</strong> ${escapeHTML(sense.experiment.materials.join(', '))}</p>
              <ol style="margin-left:20px; margin-bottom:14px;">
                ${sense.experiment.steps.map(st => `<li>${escapeHTML(st)}</li>`).join('')}
              </ol>

              ${sense.experiment.type === 'blindspot' ? `
                <div class="calibration-bar">
                  <label for="bs-calib-${sense.id}">📐 Calibrate Blind Spot Target Distance:</label>
                  <input type="range" id="bs-calib-${sense.id}" min="120" max="440" value="280" data-action="bs-calib" data-sense="${sense.id}">
                  <span id="bs-calib-val-${sense.id}">~34 cm away</span>
                </div>
                <div class="blindspot-stage" id="bs-stage-${sense.id}">
                  <span class="blindspot-cross" id="bs-cross-${sense.id}">+</span>
                  <span class="blindspot-dot" id="bs-dot-${sense.id}"></span>
                </div>
              ` : ''}

              ${sense.experiment.type === 'twopoint' && sense.experiment.observe.rows ? `
                <div style="overflow-x:auto; margin-bottom:12px;">
                  <table class="compare-table" style="font-size:0.86rem;">
                    <thead><tr>${sense.experiment.observe.columns.map(c => `<th>${escapeHTML(c)}</th>`).join('')}</tr></thead>
                    <tbody>${sense.experiment.observe.rows.map(r => `<tr>${r.map(cell => `<td>${escapeHTML(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
                  </table>
                </div>
              ` : ''}

              <label for="obs-${sense.id}" style="font-weight:700; font-size:0.9rem; display:block; margin-bottom:4px;">${escapeHTML(sense.experiment.observe.prompt)}</label>
              <p class="es-sub" style="margin-bottom:6px;">${escapeHTML(sense.experiment.observe.promptEs || '')}</p>
              <textarea id="obs-${sense.id}" rows="2" class="poe-obs-area" data-action="save-poe-obs" data-sense="${sense.id}" style="width:100%; border:1.5px solid var(--line); border-radius:8px; padding:10px; font-family:inherit;" placeholder="Record your scientific observation here (auto-saved)..."></textarea>
            </div>

            <div class="poe-box">
              <span class="poe-badge" style="background:var(--correct);">Phase 3: Explain with Evidence (CER)</span>
              <div style="margin-top:8px;">
                <button class="action-btn" data-action="reveal-explain" data-sense="${sense.id}" style="padding:8px 16px; font-size:0.88rem;">🔬 Reveal Scientific Explanation</button>
              </div>
              <div id="poe-explain-box-${sense.id}" style="display:none; background:var(--paper-tint); border-left:4px solid var(--correct); padding:12px 16px; border-radius:8px; margin-top:12px;">
                <strong>Scientific Explanation:</strong> ${escapeHTML(sense.experiment.explain)}
              </div>
            </div>
          </div>
        </div>

        <div class="stage-footer">
          <button class="action-btn" style="background:var(--muted);" data-action="go-stage" data-sense="${sense.id}" data-stage="2">← Back to Stage 2</button>
          <button class="action-btn" data-action="go-stage" data-sense="${sense.id}" data-stage="4">Next: Writing Coach &amp; Quiz →</button>
        </div>
      </div>

      <!-- STAGE 4 -->
      <div class="stage-container ${stage === 4 ? 'active' : ''}" data-stage="4">
        <div class="step-section">
          <div class="step-header">
            <span class="step-num">8</span>
            <h3 class="step-title">Express It in English (Morpho-Syntactic Writing Coach)</h3>
          </div>

          <details style="margin-bottom:16px; background:var(--paper-tint); padding:12px 16px; border-radius:10px; border:1px solid var(--line);">
            <summary style="cursor:pointer; font-weight:700;">📝 Sentence Frames (Guided CLIL Scaffolding)</summary>
            <ul style="margin:10px 0 0 20px; font-size:0.9rem;">
              ${sense.frames.map(f => `<li style="margin-bottom:5px;">${escapeHTML(f)}</li>`).join('')}
            </ul>
            ${sense.writing.b1ChallengeFrame ? `<div style="margin-top:10px; font-size:0.86rem; color:var(--sight); font-weight:700;">🔵 B1 Immersion Challenge: ${escapeHTML(sense.writing.b1ChallengeFrame)}</div>` : ''}
          </details>

          <div class="writing-coach-box">
            <p style="font-weight:700; margin-bottom:4px;">${escapeHTML(sense.writing.prompt)}</p>
            <p class="es-sub" style="margin-bottom:12px;">${escapeHTML(sense.writing.promptEs)}</p>

            <div class="coach-section">
              <h5>1. Required Anatomical Word Bank (Click to insert):</h5>
              <div class="chip-tray" id="bank-tray-${sense.id}">
                ${sense.writing.bank.map(w => `<button class="coach-chip" data-action="insert-chip" data-sense="${sense.id}" data-chip="${escapeHTML(w)}" data-word="${w.toLowerCase()}">${escapeHTML(w)}</button>`).join('')}
              </div>
            </div>

            <div class="coach-section">
              <h5>2. Scientific CALP Verbs (Inflected forms accepted automatically):</h5>
              <div class="chip-tray" id="verb-tray-${sense.id}">
                ${sense.writing.verbs.map((v, vi) => {
                  const stem = (sense.writing.verbStems && sense.writing.verbStems[vi]) ? sense.writing.verbStems[vi] : v.replace(/(s|es)$/i, '');
                  return `<button class="coach-chip" data-action="insert-chip" data-sense="${sense.id}" data-chip="${escapeHTML(v)}" data-stem="${escapeHTML(stem)}">${escapeHTML(v)}</button>`;
                }).join('')}
              </div>
            </div>

            <div class="coach-section">
              <h5>3. Sequence &amp; Cause Connectors:</h5>
              <div class="chip-tray" id="conn-tray-${sense.id}">
                ${sense.writing.connectors.map(c => `<button class="coach-chip" data-action="insert-chip" data-sense="${sense.id}" data-chip="${escapeHTML(c)}" data-word="${c.toLowerCase()}">${escapeHTML(c)}</button>`).join('')}
              </div>
            </div>

            <textarea class="writing-textarea" id="write-${sense.id}" data-action="writing-input" data-sense="${sense.id}" placeholder="Explain the biological pathway step by step in full English sentences..."></textarea>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:10px;">
              <span id="write-count-${sense.id}" style="font-size:0.84rem; font-weight:700; color:var(--ink-light);">Words: 0 | Anatomical terms: 0/4</span>
              <div style="display:flex; gap:8px;">
                <button class="action-btn" data-action="validate-writing" data-sense="${sense.id}" style="padding:8px 16px; font-size:0.88rem;">✅ Analyze Grammar &amp; Pathway</button>
                <button class="mic-btn" data-action="mic-writing" data-sense="${sense.id}" title="Read your paragraph aloud (Continuous Shadowing)">🎙️ Read Aloud</button>
              </div>
            </div>

            <div id="write-feedback-${sense.id}" style="display:none; margin-top:12px; padding:12px; border-radius:8px; font-size:0.88rem; font-weight:600;"></div>
            <div id="write-mic-fb-${sense.id}" style="display:none; margin-top:8px; font-size:0.86rem; font-weight:700;"></div>

            <details id="model-answer-details-${sense.id}" style="margin-top:14px;">
              <summary style="cursor:pointer; font-weight:700; font-size:0.88rem; color:var(--muted);">🔒 Expert Model Answer (Locked until ≥25 words &amp; valid sequence)</summary>
              <div style="margin-top:10px; background:var(--paper-tint); padding:12px 14px; border-radius:8px; font-size:0.9rem; line-height:1.55;">
                ${escapeHTML(sense.writing.model)}
                <div style="margin-top:8px;">
                  <button class="audio-btn" data-action="speak-model" data-sense="${sense.id}">🔊 Listen to Expert Model</button>
                </div>
              </div>
            </details>
          </div>

          <div class="ican-box">
            <h4 style="margin-bottom:8px;">✅ Self-Evaluation Checklist (Can-Do Statements):</h4>
            ${sense.objectives.map((obj, idx) => `
              <label style="display:flex; align-items:center; gap:8px; margin-bottom:6px; cursor:pointer; font-size:0.9rem;">
                <input type="checkbox" id="ican-${sense.id}-${idx}" data-action="record-ican" data-sense="${sense.id}" data-idx="${idx}">
                <span>${escapeHTML(obj)}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="step-section">
          <div class="step-header">
            <span class="step-num">9</span>
            <h3 class="step-title">${escapeHTML(sense.name)} Mastery Check (${sense.quiz.length} CEFR-Calibrated Questions)</h3>
          </div>
          <div id="quiz-box-${sense.id}">
            ${sense.quiz.map((qObj, qIdx) => renderQuestionHTML(sense.id, qObj, qIdx)).join('')}
          </div>
          <div style="margin-top:16px; display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
            <button class="action-btn" data-action="check-quiz" data-sense="${sense.id}">Submit ${escapeHTML(sense.name)} Check</button>
            <div id="quiz-result-${sense.id}" style="font-weight:800; font-size:1rem;"></div>
          </div>
        </div>

        <div class="stage-footer">
          <button class="action-btn" style="background:var(--muted);" data-action="go-stage" data-sense="${sense.id}" data-stage="3">← Back to Stage 3</button>
          <span style="font-weight:700; color:var(--correct);">🎉 End of ${escapeHTML(sense.name)} Unit</span>
        </div>
      </div>
    `;

    // Initialize interactive sub-modules for this sense
    initDiagram(sense);
    initPathOrder(sense);
    initMatchPairs(sense);
    renderCloze(sense);
    restoreSenseInputs(sense);
    renderedPanels.add(senseId);
  }

  function renderQuestionHTML(scopeId, qObj, qIdx) {
    const uid = nextUid('q_' + scopeId);
    const correctTxt = qObj.options[0];
    PRIVATE_ANSWERS.set(uid, { correctTxt, explain: qObj.explain, cefr: qObj.cefr || 'A2.2', skill: qObj.skill || 'ngss_bio', difficulty: qObj.difficulty || 2 });
    const shuffledOpts = shuffleArray(qObj.options.slice());
    return `
      <div class="quiz-item" data-uid="${uid}" data-scope="${scopeId}" data-qidx="${qIdx}">
        <span class="quiz-level">${escapeHTML(qObj.level)} · CEFR ${escapeHTML(qObj.cefr || 'A2.2')}</span>
        <div class="quiz-q">${qIdx + 1}. ${escapeHTML(qObj.q)}</div>
        <div class="quiz-options">
          ${shuffledOpts.map(opt => `
            <label class="quiz-opt-label">
              <input type="radio" name="radio-${uid}" value="${escapeHTML(opt)}">
              <span>${escapeHTML(opt)}</span>
            </label>
          `).join('')}
        </div>
        <div class="quiz-explain" id="q-exp-${uid}" style="display:none; margin-top:8px; font-size:0.86rem; background:var(--paper-tint); padding:8px 12px; border-radius:8px;"></div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------
     8. NatGeo Leader Lines, Bidirectional Pairing & Test Me 2.0
  ------------------------------------------------------------------ */
  const diagramChallengeState = {};

  function initDiagram(sense) {
    const stage = document.getElementById('diagram-stage-' + sense.id);
    const calloutsGroup = document.getElementById('callouts-' + sense.id);
    const dock = document.getElementById('dock-' + sense.id);
    const data = DIAGRAMS[sense.id];
    if (!stage || !data) return;

    const svgNS = 'http://www.w3.org/2000/svg';

    data.hotspots.forEach((hs, idx) => {
      const w = sense.words.find(item => item.id === hs.id);
      const labelText = w ? w.en : hs.id;

      // 1. Draw Orthogonal NatGeo Callout Line inside SVG
      if (calloutsGroup) {
        const midX = hs.x + (hs.lx - hs.x) * 0.45;
        const poly = document.createElementNS(svgNS, 'polyline');
        poly.setAttribute('points', `${hs.x},${hs.y} ${midX.toFixed(1)},${hs.y} ${hs.lx},${hs.ly}`);
        poly.setAttribute('class', 'callout-line');
        poly.dataset.targetId = hs.id;
        calloutsGroup.appendChild(poly);

        const anchor = document.createElementNS(svgNS, 'circle');
        anchor.setAttribute('cx', hs.x);
        anchor.setAttribute('cy', hs.y);
        anchor.setAttribute('r', '3.2');
        anchor.setAttribute('class', 'callout-anchor');
        anchor.dataset.targetId = hs.id;
        calloutsGroup.appendChild(anchor);
      }

      // 2. Interactive Hotspot Button (WCAG 40px)
      const btn = document.createElement('button');
      btn.className = 'diagram-hotspot';
      btn.textContent = idx + 1;
      btn.style.left = (hs.x / 8) + '%';
      btn.style.top = (hs.y / 4.5) + '%';
      btn.dataset.id = hs.id;
      btn.setAttribute('aria-label', `Anatomical target ${idx + 1}`);
      btn.addEventListener('click', () => handleHotspotClick(sense, hs, btn));
      btn.addEventListener('mouseenter', () => setPairedHighlight(sense.id, hs.id, true));
      btn.addEventListener('mouseleave', () => setPairedHighlight(sense.id, hs.id, false));
      stage.appendChild(btn);

      // 3. Desktop Floating Label Pin
      const pin = document.createElement('div');
      pin.className = 'diagram-label-pin';
      pin.textContent = `${idx + 1}. ${labelText}`;
      pin.style.left = (hs.lx / 8) + '%';
      pin.style.top = (hs.ly / 4.5) + '%';
      pin.dataset.id = hs.id;
      pin.style.cursor = 'pointer';
      pin.addEventListener('click', () => handleHotspotClick(sense, hs, btn));
      pin.addEventListener('mouseenter', () => setPairedHighlight(sense.id, hs.id, true));
      pin.addEventListener('mouseleave', () => setPairedHighlight(sense.id, hs.id, false));
      stage.appendChild(pin);

      // 4. Mobile Dock Legend Button (< 640px)
      if (dock) {
        const dBtn = document.createElement('button');
        dBtn.className = 'dock-label-btn';
        dBtn.textContent = `${idx + 1}. ${labelText}`;
        dBtn.dataset.id = hs.id;
        dBtn.addEventListener('click', () => handleHotspotClick(sense, hs, btn));
        dock.appendChild(dBtn);
      }
    });

    diagramChallengeState[sense.id] = { mode: 'explore', queue: [], currentTarget: null, hits: 0, attempts: 0 };
  }

  function setPairedHighlight(senseId, hsId, on) {
    const stage = document.getElementById('diagram-stage-' + senseId);
    if (!stage) return;
    stage.querySelectorAll(`[data-id="${hsId}"]`).forEach(el => el.classList.toggle('paired-highlight', on));
    stage.querySelectorAll(`[data-target-id="${hsId}"]`).forEach(el => el.classList.toggle('highlighted', on));
  }

  function setDiagramMode(senseId, mode) {
    const st = diagramChallengeState[senseId];
    const sense = SENSES.find(s => s.id === senseId);
    const stage = document.getElementById('diagram-stage-' + senseId);
    const status = document.getElementById('diagram-status-' + senseId);
    const info = document.getElementById('diagram-info-' + senseId);
    if (!st || !sense || !stage) return;

    st.mode = mode;
    document.getElementById('btn-explore-' + senseId).classList.toggle('active', mode === 'explore');
    document.getElementById('btn-test-' + senseId).classList.toggle('active', mode === 'test');

    stage.querySelectorAll('.diagram-label-pin').forEach(p => { p.style.display = mode === 'test' ? 'none' : ''; });
    const dock = document.getElementById('dock-' + senseId);
    if (dock) dock.style.opacity = mode === 'test' ? '0.2' : '1';
    stage.querySelectorAll('.diagram-hotspot').forEach(b => b.classList.remove('active', 'correct-spot', 'wrong-spot'));

    if (mode === 'test') {
      st.queue = shuffleArray(DIAGRAMS[senseId].hotspots.map(h => h.id));
      st.hits = 0;
      st.attempts = 0;
      pickNextDiagramTarget(sense);
    } else {
      status.textContent = 'Click any numbered tissue or pin to inspect.';
      info.innerHTML = `<strong>${escapeHTML(sense.organ)}:</strong> Click any numbered hotspot to hear its pronunciation and explore its role.`;
    }
  }

  function pickNextDiagramTarget(sense) {
    const st = diagramChallengeState[sense.id];
    const status = document.getElementById('diagram-status-' + sense.id);
    const info = document.getElementById('diagram-info-' + sense.id);
    if (st.queue.length === 0) {
      const total = DIAGRAMS[sense.id].hotspots.length;
      const pct = Math.round((st.hits / Math.max(1, st.attempts)) * 100);
      status.innerHTML = `🏆 Challenge Complete! Accuracy: ${pct}% (${st.hits}/${st.attempts})`;
      info.innerHTML = `🌟 <strong>Flawless Anatomical Mastery!</strong> You located all ${total} structures without replacement.`;
      awardXP(45, 'diag_chal_' + sense.id, status, true);
      return;
    }
    const nextId = st.queue.shift();
    st.currentTarget = nextId;
    const w = sense.words.find(item => item.id === nextId);
    const label = w ? w.en : nextId;
    const total = DIAGRAMS[sense.id].hotspots.length;
    const done = total - st.queue.length;
    status.innerHTML = `🎯 Locate (${done}/${total}): <span style="background:var(--accent); color:#FFF; padding:2px 8px; border-radius:6px;">${escapeHTML(label)}</span>`;
    info.innerHTML = `<em>Click the exact numbered target on the anatomy cutaway corresponding to <strong>${escapeHTML(label)}</strong>.</em>`;
    speakText(label);
  }

  function handleHotspotClick(sense, hs, btnEl) {
    const st = diagramChallengeState[sense.id];
    const stage = document.getElementById('diagram-stage-' + sense.id);
    const info = document.getElementById('diagram-info-' + sense.id);
    const w = sense.words.find(item => item.id === hs.id);

    if (st.mode === 'explore') {
      stage.querySelectorAll('.diagram-hotspot').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
      if (w) {
        info.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:6px;">
            <strong style="font-size:1.05rem; color:var(--accent);">${escapeHTML(w.en)}</strong>
            <span class="vocab-ipa">${escapeHTML(w.ipa || '')}</span>
            ${w.syllables ? `<span class="syllable-pill">${escapeHTML(w.syllables)}</span>` : ''}
            <span class="vocab-es">${escapeHTML(w.es)}</span>
            <button class="audio-btn" data-action="speak-word" data-word="${escapeHTML(w.en)}">🔊</button>
          </div>
          <p style="margin:0; font-size:0.92rem;">${escapeHTML(w.def)}</p>
        `;
        speakText(w.en);
        awardXP(5, 'diag_exp_' + sense.id + '_' + w.id, btnEl, true);
      }
    } else if (st.currentTarget) {
      st.attempts += 1;
      if (hs.id === st.currentTarget) {
        st.hits += 1;
        btnEl.classList.add('correct-spot');
        awardXP(15, null, btnEl, true);
        info.innerHTML = `<span style="color:var(--correct); font-weight:700;">✅ Correct! That is the ${escapeHTML(w ? w.en : hs.id)}.</span>`;
        setTimeout(() => pickNextDiagramTarget(sense), 850);
      } else {
        btnEl.classList.add('wrong-spot');
        awardXP(0, null, btnEl, false);
        setTimeout(() => btnEl.classList.remove('wrong-spot'), 450);
        info.innerHTML = `<span style="color:var(--incorrect); font-weight:700;">❌ Incorrect. You clicked <em>${escapeHTML(w ? w.en : hs.id)}</em>. Try again!</span>`;
      }
    }
  }

  function animateSignalPath(senseId) {
    const stage = document.getElementById('diagram-stage-' + senseId);
    if (!stage) return;
    const pulse = stage.querySelector('.signal-pulse-path');
    if (!pulse) return;
    pulse.classList.remove('active');
    void pulse.offsetWidth;
    pulse.classList.add('active');
    setTimeout(() => pulse.classList.remove('active'), 3600);
  }

  /* ------------------------------------------------------------------
     9. Step 6 Activities: Path Order, Combo Match Pairs & Audio-Cloze
  ------------------------------------------------------------------ */
  const pathSelections = {};
  function initPathOrder(sense) {
    pathSelections[sense.id] = [];
    const chipsBox = document.getElementById('path-chips-' + sense.id);
    if (!chipsBox) return;
    const items = sense.pathLabels.map((lbl, idx) => ({ idx, lbl }));
    const shuffled = shuffleArray(items);
    chipsBox.innerHTML = shuffled.map(it =>
      `<button class="path-chip" data-action="pick-path-chip" data-sense="${sense.id}" data-step-idx="${it.idx}">${it.lbl}</button>`
    ).join('');
    renderPathSlots(sense.id);
  }

  function renderPathSlots(senseId) {
    const slotsBox = document.getElementById('path-slots-' + senseId);
    if (!slotsBox) return;
    const sense = SENSES.find(s => s.id === senseId);
    const sel = pathSelections[senseId] || [];
    if (sel.length === 0) {
      slotsBox.innerHTML = '<span style="color:var(--muted); font-size:0.88rem;">Click step chips below in chronological biological order (1 → 5)...</span>';
      return;
    }
    slotsBox.innerHTML = sel.map((stepIdx, pos) =>
      `<span class="path-chip in-slot" data-action="remove-path-slot" data-sense="${senseId}" data-pos="${pos}">${pos + 1}. ${sense.pathLabels[stepIdx]} &times;</span>`
    ).join('');
  }

  // Match Pairs with Combo Tracking
  const matchState = {};
  function initMatchPairs(sense) {
    const box = document.getElementById('match-box-' + sense.id);
    const fb = document.getElementById('match-fb-' + sense.id);
    if (!box) return;
    if (fb) fb.textContent = '';

    const leftItems = shuffleArray(sense.match.map((m, i) => ({ id: i, text: m[0] })));
    const rightItems = shuffleArray(sense.match.map((m, i) => ({ id: i, text: m[1] })));
    matchState[sense.id] = { selLeft: null, selRight: null, matchedCount: 0, total: sense.match.length };

    box.innerHTML = `
      <div class="match-col">${leftItems.map(it => `<button class="match-item" data-action="match-left" data-sense="${sense.id}" data-pair="${it.id}">${escapeHTML(it.text)}</button>`).join('')}</div>
      <div class="match-col">${rightItems.map(it => `<button class="match-item" data-action="match-right" data-sense="${sense.id}" data-pair="${it.id}">${escapeHTML(it.text)}</button>`).join('')}</div>
    `;
  }

  // Cloze with Gap Targeting, Audio Dictation Mode & Morphological Feedback
  const activeClozeGap = {};
  function renderCloze(sense, hideBank = false) {
    const box = document.getElementById('cloze-box-' + sense.id);
    if (!box) return;
    const answers = [];
    const textHtml = escapeHTML(sense.cloze.text).replace(/\{([^}]+)\}/g, (m, word) => {
      const uid = nextUid('cloze_' + sense.id);
      PRIVATE_ANSWERS.set(uid, word.toLowerCase());
      answers.push(word);
      return `<input type="text" class="cloze-input" id="${uid}" data-sense="${sense.id}" data-uid="${uid}" placeholder="___" autocomplete="off">`;
    });

    const bankWords = shuffleArray([...answers, ...(sense.cloze.extra || [])]);
    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <span style="font-size:0.84rem; font-weight:700; color:var(--accent);">Click a word chip or type inside any blank:</span>
        <button class="audio-btn" data-action="dictate-cloze" data-sense="${sense.id}" title="Listen to the full scientific paragraph">🎧 Dictation Mode (Listen)</button>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px; ${hideBank ? 'display:none;' : ''}" id="cloze-bank-${sense.id}">
        ${bankWords.map(w => `<button class="coach-chip" data-action="fill-cloze-chip" data-sense="${sense.id}" data-word="${escapeHTML(w)}">${escapeHTML(w)}</button>`).join('')}
      </div>
      <p style="line-height:2.2; font-size:0.96rem;">${textHtml}</p>
      <div style="display:flex; gap:10px; margin-top:12px;">
        <button class="action-btn" data-action="check-cloze" data-sense="${sense.id}" style="padding:7px 14px; font-size:0.86rem;">Check Blanks</button>
        <button class="action-btn" data-action="reset-cloze" data-sense="${sense.id}" style="padding:7px 14px; font-size:0.86rem; background:var(--muted);">Clear</button>
      </div>
      <div id="cloze-fb-${sense.id}" style="margin-top:10px; font-weight:700;"></div>
    `;
  }

  /* ------------------------------------------------------------------
     10. Writing Coach Step 8: Lemmatizer, Causal Sequence & L1 Linter
  ------------------------------------------------------------------ */
  const debouncedAnalyzeWriting = debounce((senseId) => analyzeWritingLive(senseId), 180);

  function analyzeWritingLive(senseId) {
    const textarea = document.getElementById('write-' + senseId);
    if (!textarea) return;
    const text = textarea.value;
    appState.writtenText[senseId] = text;
    saveState();

    const lower = text.toLowerCase();
    const words = text.trim().split(/\s+/).filter(Boolean);

    let bankHits = 0;
    const bankTray = document.getElementById('bank-tray-' + senseId);
    if (bankTray) {
      bankTray.querySelectorAll('.coach-chip').forEach(chip => {
        const target = chip.dataset.word;
        const rx = new RegExp(`\\b${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?\\b`, 'i');
        const hit = rx.test(lower);
        chip.classList.toggle('used', hit);
        if (hit) bankHits += 1;
      });
    }

    const verbTray = document.getElementById('verb-tray-' + senseId);
    if (verbTray) {
      verbTray.querySelectorAll('.coach-chip').forEach(chip => {
        const stem = chip.dataset.stem || chip.dataset.chip;
        // Accepts base, -s, -es, -ed, -ing inflections
        const root = stem.replace(/e$/i, '');
        const rx = new RegExp(`\\b${root}(e|es|s|ed|ing|d)?\\b`, 'i');
        chip.classList.toggle('used', rx.test(lower));
      });
    }

    const connTray = document.getElementById('conn-tray-' + senseId);
    if (connTray) {
      connTray.querySelectorAll('.coach-chip').forEach(chip => {
        const target = chip.dataset.word;
        const rx = new RegExp(`\\b${target}\\b`, 'i');
        chip.classList.toggle('used', rx.test(lower));
      });
    }

    const countEl = document.getElementById('write-count-' + senseId);
    if (countEl) countEl.textContent = `Words: ${words.length} | Anatomical terms: ${bankHits}/4+`;
  }

  function validateWritingRubric(senseId) {
    const textarea = document.getElementById('write-' + senseId);
    const fb = document.getElementById('write-feedback-' + senseId);
    const details = document.getElementById('model-answer-details-' + senseId);
    const sense = SENSES.find(s => s.id === senseId);
    if (!textarea || !fb || !sense) return;

    const text = textarea.value.trim();
    const lower = text.toLowerCase();
    const words = text.split(/\s+/).filter(Boolean);

    if (words.length < 25) {
      fb.style.display = 'block';
      fb.style.background = 'var(--incorrect-tint)';
      fb.style.color = '#7F1D1D';
      fb.innerHTML = `⚠️ Current length: <strong>${words.length} words</strong>. Expand to at least 25–30 words in complete sentences to model the full neural pathway.`;
      return;
    }

    // Check bank terms & sequence causal order
    let bankHits = 0;
    sense.writing.bank.forEach(w => {
      if (new RegExp(`\\b${w.toLowerCase()}s?\\b`, 'i').test(lower)) bankHits += 1;
    });

    // Check biological sequence ordering (organ/receptor appears before cortex)
    let orderError = false;
    if (sense.writing.sequenceOrder && sense.writing.sequenceOrder.length >= 3) {
      const seqPositions = sense.writing.sequenceOrder
        .map(kw => ({ kw, pos: lower.indexOf(kw) }))
        .filter(item => item.pos !== -1);
      for (let i = 1; i < seqPositions.length; i++) {
        if (seqPositions[i].pos < seqPositions[i - 1].pos) {
          orderError = `Check your biological causality: you mentioned <em>"${seqPositions[i].kw}"</em> before <em>"${seqPositions[i - 1].kw}"</em>.`;
          break;
        }
      }
    }

    // Morphosyntactic L1 -> L2 Grammar Linter
    const grammarTips = [];
    if (/\b(papillae|cilia|stimuli|ossicles)\s+(is|was|detects|transmits|enters|sends)\b/i.test(text)) {
      grammarTips.push("Latin Plural Agreement: 'papillae / cilia / stimuli / ossicles' are plural nouns! Use plural verbs (are, detect, transmit, enter).");
    }
    if (/\b(is|are)\s+(refract|focus|transmit|convert|process|carry|detect)\b/i.test(text)) {
      grammarTips.push("Passive Voice Form: After 'is / are', use the past participle (-ed / -ied): e.g., 'is refracted', 'are transmitted'.");
    }
    if (/\b(the\s+light|the\s+saliva|the\s+sound)\b/i.test(text)) {
      grammarTips.push("Academic Register Tip: General uncountable scientific nouns usually omit 'the' ('Light refracts...', 'Saliva dissolves...').");
    }

    const hasSubordination = /\b(because|which|where|when|while|whereas|once|after|before)\b/i.test(text);
    const cefrEstimate = (bankHits >= 4 && hasSubordination && words.length >= 40) ? 'CEFR B1.2' : (bankHits >= 3 ? 'CEFR B1.1' : 'CEFR A2.2');

    fb.style.display = 'block';
    if (bankHits >= 3 && !orderError) {
      fb.style.background = 'var(--correct-tint)';
      fb.style.color = '#14532D';
      let msg = `🌟 <strong>Proficient CLIL Explanation (${cefrEstimate})!</strong> Used ${bankHits} anatomical structures with valid neural sequence.`;
      if (grammarTips.length) msg += `<br><span style="color:#9A3412;">💡 ${grammarTips.join(' ')}</span>`;
      msg += '<br>🔓 Model answer unlocked below!';
      fb.innerHTML = msg;
      if (details) details.open = true;
      awardXP(40, 'write_' + senseId, fb, true);
    } else {
      fb.style.background = '#FEF3C7';
      fb.style.color = '#78350F';
      let msg = `🔄 <strong>Needs Revision (${cefrEstimate}):</strong> Found ${bankHits} anatomical terms. `;
      if (orderError) msg += `<br>⚠️ ${orderError}`;
      if (grammarTips.length) msg += `<br>💡 ${grammarTips.join(' ')}`;
      fb.innerHTML = msg;
    }
  }

  /* ------------------------------------------------------------------
     11. Clinical Lesion Simulator & Compare Table
  ------------------------------------------------------------------ */
  function renderClinicalCaseHTML(cs) {
    const uid = nextUid('clin_' + cs.id);
    const correctTxt = cs.options[cs.correct];
    PRIVATE_ANSWERS.set(uid, { correctTxt, explain: cs.rationale, caseId: cs.id });
    const shuffled = shuffleArray(cs.options.slice());
    const solved = (appState.gamification.solvedCases || []).includes(cs.id);

    return `
      <div class="clinical-case-card" id="case-card-${uid}">
        <span class="clinical-badge">🩺 Clinical Neurology Case · CEFR ${escapeHTML(cs.cefr)} ${solved ? '· ✅ Solved' : ''}</span>
        <p style="font-weight:700; font-size:0.96rem; margin-bottom:10px;">${escapeHTML(cs.patient)}</p>
        <div class="quiz-options">
          ${shuffled.map(opt => `
            <button class="inline-opt" data-action="solve-clinical" data-uid="${uid}" data-case="${cs.id}" data-opt="${escapeHTML(opt)}" style="text-align:left;">
              ${escapeHTML(opt)}
            </button>
          `).join('')}
        </div>
        <div id="clin-fb-${uid}" style="display:none; margin-top:10px; font-size:0.88rem; font-weight:600; padding:10px; border-radius:8px;"></div>
      </div>
    `;
  }

  function renderCompareTable(mode) {
    const box = document.getElementById('compare-table-content');
    const sBtn = document.getElementById('btn-compare-study');
    const pBtn = document.getElementById('btn-compare-practice');
    if (!box) return;

    if (sBtn) sBtn.style.background = mode === 'study' ? 'var(--sight)' : 'var(--muted)';
    if (pBtn) pBtn.style.background = mode === 'practice' ? 'var(--sight)' : 'var(--muted)';

    const senses = ['sight', 'hearing', 'smell', 'taste', 'touch'];
    const headers = ['Biological Dimension', '👁️ Sight', '👂 Hearing', '👃 Smell', '👅 Taste', '✋ Touch'];

    let html = `<table class="compare-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
    COMPARE.rows.forEach(row => {
      html += `<tr><th scope="row">${escapeHTML(row.label)}</th>`;
      senses.forEach(sid => {
        const correctVal = row.values[sid];
        if (mode === 'study') {
          html += `<td>${escapeHTML(correctVal)}</td>`;
        } else {
          const uid = nextUid('cmp_' + row.key + '_' + sid);
          PRIVATE_ANSWERS.set(uid, correctVal);
          const allRowVals = shuffleArray(senses.map(k => row.values[k]));
          html += `<td><select class="compare-select" data-uid="${uid}" style="width:100%; padding:6px; border:1px solid var(--line); border-radius:6px; font-size:0.82rem;">
            <option value="">-- Select --</option>
            ${allRowVals.map(v => `<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join('')}
          </select></td>`;
        }
      });
      html += `</tr>`;
    });
    html += `</tbody></table>`;

    if (mode === 'practice') {
      html += `<div style="margin-top:14px;"><button class="action-btn" data-action="check-compare-matrix">Verify Matrix Answers</button><span id="compare-fb" style="margin-left:14px; font-weight:700;"></span></div>`;
    }
    box.innerHTML = html;
  }

  function renderClinicalSimulator() {
    const container = document.getElementById('clinical-simulator-content');
    if (!container) return;
    container.innerHTML = `
      <h3 style="margin-bottom:8px;">🩺 Neuro-Sensory Doctor Simulator (All 10 Clinical Lesion Cases)</h3>
      <p style="color:var(--ink-light); font-size:0.92rem; margin-bottom:14px;">Analyze patient symptoms and pinpoint the exact lesion along the 5-step neural pathway.</p>
      ${CLINICAL_CASES.map(cs => renderClinicalCaseHTML(cs)).join('')}
    `;
  }

  /* ------------------------------------------------------------------
     12. SM-2 Spaced Repetition Flashcards, Roots & Glossary
  ------------------------------------------------------------------ */
  let flashDeck = [];
  let flashIdx = 0;
  let flashFlipped = false;
  let flashMode = 'en-def'; // or 'interleaved'

  function getSM2Record(wordId) {
    return appState.sm2[wordId] || { interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: 0 };
  }

  function gradeFlashcardSM2(quality) {
    // SM-2 Algorithm: quality 1=Again, 2=Hard, 3=Good, 4=Easy
    const item = flashDeck[flashIdx];
    if (!item) return;
    const rec = getSM2Record(item.id);
    const qMap = { 1: 1, 2: 3, 3: 4, 4: 5 };
    const q = qMap[quality] || 4;

    if (q < 3) {
      rec.repetitions = 0;
      rec.interval = 0; // Immediate re-queue
      // Re-insert card 2 spots later in active deck
      if (flashDeck.length > 2) {
        const clone = Object.assign({}, item);
        flashDeck.splice(Math.min(flashDeck.length, flashIdx + 3), 0, clone);
      }
      awardXP(0, null, document.getElementById('flashcard-stage'), false);
    } else {
      if (rec.repetitions === 0) rec.interval = 1;
      else if (rec.repetitions === 1) rec.interval = 6;
      else rec.interval = Math.round(rec.interval * rec.easeFactor);
      rec.repetitions += 1;
      awardXP(quality === 4 ? 20 : 12, 'sm2_' + item.id, document.getElementById('flashcard-stage'), true);
    }

    rec.easeFactor = Math.max(1.3, rec.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    rec.nextReview = Date.now() + rec.interval * 24 * 60 * 60 * 1000;
    appState.sm2[item.id] = rec;
    saveState();

    flashIdx = (flashIdx + 1) % flashDeck.length;
    flashFlipped = false;
    updateFlashcardUI();
  }

  function buildSmartInterleavedDeck() {
    const allWords = [];
    SENSES.forEach(s => s.words.forEach(w => allWords.push(Object.assign({}, w, { senseName: s.name }))));
    const now = Date.now();
    // Prioritize due cards and lowest easeFactor first (Interleaving)
    allWords.sort((a, b) => {
      const ra = getSM2Record(a.id), rb = getSM2Record(b.id);
      const aDue = ra.nextReview <= now ? 0 : 1;
      const bDue = rb.nextReview <= now ? 0 : 1;
      if (aDue !== bDue) return aDue - bDue;
      return ra.easeFactor - rb.easeFactor;
    });
    return allWords;
  }

  function renderGlossaryPanel() {
    const container = document.getElementById('glossary-panel-content');
    if (!container) return;
    flashDeck = buildSmartInterleavedDeck();
    flashIdx = 0;
    flashFlipped = false;

    container.innerHTML = `
      <div class="srs-status-bar">
        <span id="srs-due-count"></span>
        <span id="srs-card-counter"></span>
        <span id="srs-ef-pill" style="font-size:0.8rem; color:var(--sight);"></span>
      </div>

      <div style="display:flex; justify-content:center; gap:8px; margin-bottom:14px; flex-wrap:wrap;">
        <button class="mode-btn active" id="flash-mode-en" data-action="set-flash-mode" data-mode="en-def">Term → Definition</button>
        <button class="mode-btn" id="flash-mode-def" data-action="set-flash-mode" data-mode="def-en">Definition → Recall Term</button>
        <button class="mode-btn" data-action="smart-queue-flash">⚡ Smart Interleaved Queue</button>
      </div>

      <div class="flashcard-stage" id="flashcard-stage" data-action="flip-flashcard" tabindex="0"></div>

      <div id="sm2-rating-bar" class="sm2-actions" style="display:none;">
        <button class="sm2-btn sm2-again" data-action="grade-sm2" data-q="1">1. Again (&lt;1 min)</button>
        <button class="sm2-btn sm2-hard" data-action="grade-sm2" data-q="2">2. Hard (1 day)</button>
        <button class="sm2-btn sm2-good" data-action="grade-sm2" data-q="3">3. Good (6 days)</button>
        <button class="sm2-btn sm2-easy" data-action="grade-sm2" data-q="4">4. Easy (EF+)</button>
      </div>

      <div style="display:flex; justify-content:center; gap:10px; margin-bottom:28px;">
        <button class="action-btn" data-action="prev-flashcard" style="padding:7px 14px; background:var(--muted);">← Prev</button>
        <button class="action-btn" data-action="flip-flashcard" style="padding:7px 16px;">🔄 Flip Card</button>
        <button class="action-btn" data-action="next-flashcard" style="padding:7px 14px; background:var(--muted);">Next →</button>
      </div>

      <h3 style="margin-bottom:10px;">🧬 Scientific Morphology: Greek &amp; Latin Roots</h3>
      <div class="morpho-grid">
        ${UNIT.morphologyRoots.map(r => `
          <div class="morpho-card">
            <div class="morpho-root">${escapeHTML(r.root)} <span style="font-size:0.85rem; color:var(--ink);">(${escapeHTML(r.meaning)})</span></div>
            <div class="es-sub" style="margin:3px 0;">${escapeHTML(r.es)}</div>
            <p style="font-size:0.82rem; color:var(--ink-light); margin-top:4px;">${escapeHTML(r.def)}</p>
            <div style="font-size:0.8rem; font-weight:700; margin-top:6px;">Ex: ${escapeHTML(r.examples)}</div>
          </div>
        `).join('')}
      </div>

      <h3 style="margin:26px 0 10px;">🔍 Search Complete CLIL Glossary</h3>
      <input type="text" id="glossary-search" placeholder="Search anatomical terms, phonemes, or definitions..." style="width:100%; padding:10px 14px; border:1.5px solid var(--line); border-radius:10px; margin-bottom:14px; font-size:0.95rem;">
      <div class="vocab-grid" id="glossary-list-grid"></div>
    `;

    updateFlashcardUI();
    renderGlossaryCards('');
  }

  function updateFlashcardUI() {
    const stage = document.getElementById('flashcard-stage');
    const dueEl = document.getElementById('srs-due-count');
    const cntEl = document.getElementById('srs-card-counter');
    const efEl = document.getElementById('srs-ef-pill');
    const sm2Bar = document.getElementById('sm2-rating-bar');
    if (!stage || flashDeck.length === 0) return;

    const item = flashDeck[flashIdx];
    const rec = getSM2Record(item.id);
    const now = Date.now();
    const dueTotal = flashDeck.filter(w => getSM2Record(w.id).nextReview <= now).length;

    if (dueEl) dueEl.textContent = `📅 Due Today: ${dueTotal}`;
    if (cntEl) cntEl.textContent = `Card ${flashIdx + 1} / ${flashDeck.length}`;
    if (efEl) efEl.textContent = `Interval: ${rec.interval}d · Ease: ${rec.easeFactor.toFixed(2)}`;
    if (sm2Bar) sm2Bar.style.display = flashFlipped ? 'flex' : 'none';

    if (!flashFlipped) {
      if (flashMode === 'en-def') {
        stage.innerHTML = `
          <span style="font-size:0.78rem; font-weight:700; text-transform:uppercase; color:var(--sight); margin-bottom:6px;">${escapeHTML(item.senseName)}</span>
          <div style="font-size:1.7rem; font-weight:800; color:var(--ink);">${escapeHTML(item.en)}</div>
          <div style="margin-top:6px;">
            <span class="vocab-ipa">${escapeHTML(item.ipa || '')}</span>
            ${item.syllables ? `<span class="syllable-pill">${escapeHTML(item.syllables)}</span>` : ''}
          </div>
          <button class="audio-btn" data-action="speak-word-stop" data-word="${escapeHTML(item.en)}" style="margin-top:12px;">🔊 Hear Pronunciation</button>
          <p style="font-size:0.8rem; color:var(--muted); margin-top:12px;">(Click card to reveal meaning &amp; rate SM-2 recall)</p>
        `;
      } else {
        stage.innerHTML = `
          <span style="font-size:0.78rem; font-weight:700; text-transform:uppercase; color:var(--sight); margin-bottom:6px;">Recall Scientific Term (${escapeHTML(item.senseName)})</span>
          <div style="font-size:1.08rem; font-weight:600; color:var(--ink); max-width:44ch;">${escapeHTML(item.def)}</div>
          <p style="font-size:0.8rem; color:var(--muted); margin-top:14px;">(Click card to verify term)</p>
        `;
      }
    } else {
      stage.innerHTML = `
        <div style="font-size:1.3rem; font-weight:800; color:var(--sight);">${escapeHTML(item.en)} <span class="es-sub" style="font-size:0.85em;">(${escapeHTML(item.es)})</span></div>
        <p style="margin-top:8px; font-size:0.96rem;">${escapeHTML(item.def)}</p>
        ${item.mnemonic ? `<div class="mnemonic-badge" style="text-align:left;">🧠 ${escapeHTML(item.mnemonic)}</div>` : ''}
        <p style="margin-top:8px; font-style:italic; font-size:0.86rem; color:var(--ink-light);">"${escapeHTML(item.ex)}"</p>
      `;
    }
  }

  function renderGlossaryCards(query) {
    const grid = document.getElementById('glossary-list-grid');
    if (!grid) return;
    const q = query.trim().toLowerCase();
    const allWords = [];
    SENSES.forEach(s => s.words.forEach(w => allWords.push(Object.assign({}, w, { senseName: s.name }))));
    const filtered = q ? allWords.filter(w => w.en.toLowerCase().includes(q) || w.es.toLowerCase().includes(q) || w.def.toLowerCase().includes(q)) : allWords;
    grid.innerHTML = filtered.map(w => `
      <div class="vocab-card">
        <div class="vocab-top">
          <span class="vocab-word">${escapeHTML(w.en)}</span>
          <button class="audio-btn" data-action="speak-word" data-word="${escapeHTML(w.en)}">🔊</button>
        </div>
        <div>
          <span class="vocab-ipa">${escapeHTML(w.ipa || '')}</span>
          ${w.syllables ? `<span class="syllable-pill">${escapeHTML(w.syllables)}</span>` : ''}
          <span class="vocab-es">${escapeHTML(w.es)}</span>
        </div>
        <p class="vocab-def">${escapeHTML(w.def)}</p>
        ${w.mnemonic ? `<div class="mnemonic-badge">🧠 ${escapeHTML(w.mnemonic)}</div>` : ''}
      </div>
    `).join('');
  }

  const debouncedGlossaryFilter = debounce((val) => renderGlossaryCards(val), 180);

  /* ------------------------------------------------------------------
     13. Psychometric Engine: Standard & Adaptive Linguaskill CAT
  ------------------------------------------------------------------ */
  let catState = null;

  function rebuildStandardExam() {
    catState = null;
    const box = document.getElementById('final-exam-questions');
    const res = document.getElementById('final-exam-result');
    const subBar = document.getElementById('btn-submit-final');
    if (!box) return;
    if (res) res.innerHTML = '';
    if (subBar) subBar.style.display = 'inline-flex';

    const pool = [...FINAL_EXTRA];
    SENSES.forEach(s => {
      const picks = shuffleArray(s.quiz.slice()).slice(0, 2);
      picks.forEach(p => pool.push(Object.assign({}, p, { senseName: s.name })));
    });
    const finalQs = shuffleArray(pool).slice(0, 20);
    box.innerHTML = finalQs.map((qObj, idx) => renderQuestionHTML('final', qObj, idx)).join('');
  }

  function startAdaptiveCAT() {
    const box = document.getElementById('final-exam-questions');
    const res = document.getElementById('final-exam-result');
    const subBar = document.getElementById('btn-submit-final');
    if (!box) return;
    if (res) res.innerHTML = '';
    if (subBar) subBar.style.display = 'none';

    const bank = [...FINAL_CAT_BANK, ...FINAL_EXTRA.map((q, i) => Object.assign({ id: 'fe_' + i }, q))];
    catState = {
      theta: 2.0, // Starts at A2.2
      step: 0,
      maxSteps: 12,
      usedIds: new Set(),
      history: [], // { cefr, difficulty, skill, correct }
      bank
    };
    renderNextCATItem();
  }

  function renderNextCATItem() {
    const box = document.getElementById('final-exam-questions');
    if (!box || !catState) return;

    if (catState.step >= catState.maxSteps) {
      finalizeCATReport();
      return;
    }

    const targetDiff = Math.min(4, Math.max(1, Math.round(catState.theta)));
    let candidates = catState.bank.filter(q => !catState.usedIds.has(q.id) && q.difficulty === targetDiff);
    if (candidates.length === 0) {
      candidates = catState.bank.filter(q => !catState.usedIds.has(q.id));
    }
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    catState.usedIds.add(chosen.id);
    catState.step += 1;

    const uid = nextUid('cat');
    PRIVATE_ANSWERS.set(uid, chosen);
    const shuffled = shuffleArray(chosen.options.slice());

    box.innerHTML = `
      <div class="clinical-case-card" style="border-color:#6D28D9;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
          <span class="clinical-badge" style="background:#6D28D9;">🎯 Adaptive CAT · Item ${catState.step}/${catState.maxSteps}</span>
          <span style="font-size:0.82rem; font-weight:700; color:#4C1D95;">Estimated Probe: CEFR ${escapeHTML(chosen.cefr)} · Skill: ${escapeHTML(chosen.skill.replace(/_/g, ' ').toUpperCase())}</span>
        </div>
        <div class="quiz-q" style="font-size:1.08rem; margin-bottom:12px;">${escapeHTML(chosen.q)}</div>
        <div class="quiz-options">
          ${shuffled.map(opt => `
            <button class="inline-opt" data-action="answer-cat-item" data-uid="${uid}" data-opt="${escapeHTML(opt)}" style="text-align:left; font-size:0.95rem;">
              ${escapeHTML(opt)}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  async function renderPsychometricCertificate(metrics) {
    const res = document.getElementById('final-exam-result');
    if (!res) return;

    const rawName = document.getElementById('student-name')?.value.trim() || '8th Grade Science Scholar';
    const stamp = new Date().toLocaleString();
    const hashPayload = `${rawName}|${currentProfileId}|${metrics.band}|${metrics.cambridgeScore}|${stamp}`;
    const sealHash = await computeVerificationHash(hashPayload);

    // Build safely without interpolating user name directly into HTML string
    res.innerHTML = `
      <div class="cat-report-card print-student-report">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:0.78rem; font-weight:800; color:var(--sight); text-transform:uppercase; letter-spacing:0.08em;">Official CLIL Linguaskill &amp; NGSS Diagnostic</div>
            <h3 id="cert-student-title" style="font-size:1.4rem; margin:4px 0;"></h3>
            <div style="font-size:0.86rem; color:var(--muted);">Station Profile: <strong id="cert-profile-id"></strong> · Mode: ${escapeHTML(metrics.modeLabel)}</div>
          </div>
          <div class="cefr-band-badge">
            <span>🏅 ${escapeHTML(metrics.band)}</span>
            <span style="font-size:0.82rem; opacity:0.9;">(Score: ${metrics.cambridgeScore}/170)</span>
          </div>
        </div>

        <div class="cefr-profile-grid">
          <div class="skill-bar-box">
            <div style="display:flex; justify-content:space-between; font-size:0.84rem; font-weight:700;">
              <span>📖 Scientific Reading</span><span>${metrics.readingPct}%</span>
            </div>
            <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${metrics.readingPct}%;"></div></div>
          </div>
          <div class="skill-bar-box">
            <div style="display:flex; justify-content:space-between; font-size:0.84rem; font-weight:700;">
              <span>🔤 Use of Academic English</span><span>${metrics.usePct}%</span>
            </div>
            <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${metrics.usePct}%; background:#0EA5E9;"></div></div>
          </div>
          <div class="skill-bar-box">
            <div style="display:flex; justify-content:space-between; font-size:0.84rem; font-weight:700;">
              <span>🧠 NGSS Neurobiology</span><span>${metrics.bioPct}%</span>
            </div>
            <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${metrics.bioPct}%; background:#16A34A;"></div></div>
          </div>
        </div>

        <p style="font-size:0.9rem; background:var(--paper-tint); padding:12px 14px; border-radius:10px;">
          <strong>Can-Do Diagnostic Statement:</strong> ${escapeHTML(metrics.canDo)}
        </p>

        <div style="margin-top:14px;">
          <button class="action-btn" data-action="print-cert" style="padding:8px 16px; font-size:0.88rem;">🖨️ Print / Save Official PDF Certificate</button>
        </div>

        <div class="integrity-seal">
          <span>Issued: ${escapeHTML(stamp)}</span>
          <span>SHA-256 Integrity Seal: <strong>${sealHash}</strong></span>
        </div>
      </div>
    `;

    // Strictly use .textContent for user-supplied strings (Anti-XSS)
    const titleNode = document.getElementById('cert-student-title');
    if (titleNode) titleNode.textContent = `🎓 Mastery Report: ${rawName}`;
    const profNode = document.getElementById('cert-profile-id');
    if (profNode) profNode.textContent = currentProfileId;
  }

  function computeBandFromTheta(theta, rawPct) {
    const combined = theta !== null ? theta : (1 + (rawPct / 100) * 3);
    if (combined >= 3.4) return { band: 'CEFR B1.2 (Upper Intermediate CLIL)', score: Math.round(150 + Math.min(18, (combined - 3.4) * 20)), canDo: 'Can analyze complex neurophysiological mechanisms, interpret clinical lesions, and apply passive and conditional scientific syntax accurately.' };
    if (combined >= 2.6) return { band: 'CEFR B1.1 (Threshold CLIL)', score: Math.round(140 + (combined - 2.6) * 12), canDo: 'Can explain multi-step sensory pathways with academic collocations, sequence connectors, and cause-effect coherence.' };
    if (combined >= 1.8) return { band: 'CEFR A2.2 (Elementary+ CLIL)', score: Math.round(125 + (combined - 1.8) * 18), canDo: 'Can identify core sense organs, basic receptor classifications, and trace standard 5-step neural signals with guided frames.' };
    return { band: 'CEFR A2.1 (Foundational CLIL)', score: Math.round(108 + combined * 9), canDo: 'Recognizes key anatomical nouns; recommended to review Stage 1 vocabulary flashcards and Stage 2 A2 summaries.' };
  }

  function finalizeCATReport() {
    const box = document.getElementById('final-exam-questions');
    if (box) box.innerHTML = `<div class="funfact-box">✅ Adaptive Diagnostic Session Complete (12 Items). Inspect your Cambridge-style CEFR Profile below!</div>`;

    const calcSkill = (sk) => {
      const sub = catState.history.filter(h => h.skill === sk);
      if (!sub.length) return Math.round(((catState.theta - 1) / 3) * 100);
      return Math.round((sub.filter(h => h.correct).length / sub.length) * 100);
    };

    const meta = computeBandFromTheta(catState.theta, 0);
    renderPsychometricCertificate({
      modeLabel: 'Adaptive Linguaskill CAT',
      band: meta.band,
      cambridgeScore: meta.score,
      canDo: meta.canDo,
      readingPct: calcSkill('reading_comp'),
      usePct: calcSkill('use_of_english'),
      bioPct: calcSkill('ngss_bio')
    });
    awardXP(80, 'cat_exam_done', document.getElementById('final-exam-result'), true);
  }

  function checkStandardFinalExam() {
    const box = document.getElementById('final-exam-questions');
    if (!box) return;
    const items = box.querySelectorAll('.quiz-item');
    let weightedSum = 0, weightedMax = 0;
    const bySkill = { reading_comp: [0, 0], use_of_english: [0, 0], ngss_bio: [0, 0] };

    items.forEach(item => {
      const uid = item.dataset.uid;
      const meta = PRIVATE_ANSWERS.get(uid);
      if (!meta) return;
      const w = meta.difficulty || 2;
      weightedMax += w;
      const sk = bySkill[meta.skill] || bySkill.ngss_bio;
      sk[1] += 1;

      const checked = item.querySelector('input[type="radio"]:checked');
      const exp = document.getElementById('q-exp-' + uid);
      item.querySelectorAll('.quiz-opt-label').forEach(l => l.classList.remove('correct', 'incorrect'));

      if (checked) {
        const isCorrect = checked.value === meta.correctTxt;
        checked.closest('.quiz-opt-label').classList.add(isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
          weightedSum += w;
          sk[0] += 1;
        }
      }
      if (exp) {
        exp.style.display = 'block';
        exp.textContent = `Answer: ${meta.correctTxt} — ${meta.explain}`;
      }
    });

    const pct = Math.round((weightedSum / Math.max(1, weightedMax)) * 100);
    const meta = computeBandFromTheta(null, pct);
    renderPsychometricCertificate({
      modeLabel: 'Standard Summative (20 Items)',
      band: meta.band,
      cambridgeScore: meta.score,
      canDo: meta.canDo,
      readingPct: bySkill.reading_comp[1] ? Math.round((bySkill.reading_comp[0] / bySkill.reading_comp[1]) * 100) : pct,
      usePct: bySkill.use_of_english[1] ? Math.round((bySkill.use_of_english[0] / bySkill.use_of_english[1]) * 100) : pct,
      bioPct: bySkill.ngss_bio[1] ? Math.round((bySkill.ngss_bio[0] / bySkill.ngss_bio[1]) * 100) : pct
    });
    awardXP(60, 'std_exam_done', document.getElementById('final-exam-result'), true);
  }

  /* ------------------------------------------------------------------
     14. Teacher Guide (CER Lab Protocol + Nobel Socratic Probes)
  ------------------------------------------------------------------ */
  function renderTeacherGuide() {
    const box = document.getElementById('teacher-guide-content');
    if (!box) return;
    box.innerHTML = `
      <div class="warmup-grid">
        <div class="warmup-card">
          <h4>📅 Suggested 6-Session CLIL Sequence</h4>
          <ul style="margin-left:18px; font-size:0.9rem;">
            <li><strong>Session 1 (A2):</strong> Big Idea + Sight Cutaway + Blind Spot Calibration Lab.</li>
            <li><strong>Session 2 (A2):</strong> Hearing Anatomy + Cochlear Hair Cell Physics + Audio-Cloze.</li>
            <li><strong>Session 3 (B1):</strong> Chemoreception Synergy (Smell + Taste Flavor Lab).</li>
            <li><strong>Session 4 (B1):</strong> Touch 3D Block + Two-Point Discrimination + Clinical Cases.</li>
            <li><strong>Session 5 (B1):</strong> Morpho-Syntactic Writing Coach + Spiritual Senses Ethics Debate.</li>
            <li><strong>Session 6:</strong> Linguaskill CAT Assessment + SHA-256 Verified Portfolio Review.</li>
          </ul>
        </div>
        <div class="warmup-card">
          <h4>🧪 CER Lab Argumentation Framework</h4>
          <ul style="margin-left:18px; font-size:0.9rem;">
            <li><strong>Claim:</strong> State clear answer (e.g., <em>"Fingertips resolve 2 mm points, whereas the upper back merges 30 mm points."</em>)</li>
            <li><strong>Evidence:</strong> Cite exact quantitative millimeter readings or flavor test data from Phase 2.</li>
            <li><strong>Reasoning:</strong> Connect data to PIEZO2 receptor density, receptive field diameter, and cortical homunculus magnification.</li>
          </ul>
        </div>
        <div class="warmup-card">
          <h4>🧬 Socratic Biophysical Probes (Nobel 2004 / 2021)</h4>
          <ul style="margin-left:18px; font-size:0.9rem;">
            <li><strong>Phototransduction Paradox:</strong> Ask students why rods and cones <em>hyperpolarize</em> (-70 mV) when illuminated instead of depolarizing.</li>
            <li><strong>Pharmacological Perturbation:</strong> <em>"If a dentist injects lidocaine (blocking Nav1.7 channels), why does pain vanish before deep Pacinian pressure?"</em></li>
            <li><strong>Retronasal Illusion:</strong> Challenge misconceptions using Axel &amp; Buck (2004 GPCR olfaction) and Julius (2021 TRPV1/TRPM8 thermal mimics).</li>
          </ul>
        </div>
        <div class="warmup-card">
          <h4>🛠️ Diagnostic Misconception Intervention</h4>
          <ul style="margin-left:18px; font-size:0.9rem;">
            <li><strong>Refraction vs Reflection:</strong> Emphasize transparent bending (cornea + lens) vs bouncing off objects before entering eye.</li>
            <li><strong>Tongue Map Myth:</strong> Reiterate that all 5 tastes express across all regions; papillae contain microscopic taste buds inside clefts.</li>
            <li><strong>L1 → L2 Latin Plurals:</strong> Explicitly reinforce plural agreement on <em>papillae, cilia, stimuli, ossicles</em>.</li>
          </ul>
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------
     15. Centralized Event Delegation (Strict CSP Compliance)
  ------------------------------------------------------------------ */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    const senseId = el.dataset.sense;

    switch (action) {
      case 'switch-profile': {
        const inp = document.getElementById('profile-switch-input');
        if (inp) switchStudentProfile(inp.value);
        break;
      }
      case 'export-progress':
        exportPortfolioJSON();
        break;
      case 'end-student-turn':
        endStudentTurn();
        break;
      case 'set-scaffolding':
        setScaffoldingMode(el.dataset.mode);
        break;
      case 'toggle-sfx':
        appState.gamification.sfxEnabled = !appState.gamification.sfxEnabled;
        saveState();
        break;
      case 'go-stage':
        goToStage(senseId, parseInt(el.dataset.stage, 10));
        break;
      case 'diagram-mode':
        setDiagramMode(senseId, el.dataset.mode);
        break;
      case 'animate-signal':
        animateSignalPath(senseId);
        break;
      case 'speak-word':
        speakText(el.dataset.word);
        break;
      case 'speak-word-stop':
        e.stopPropagation();
        speakText(el.dataset.word);
        break;
      case 'mic-word':
        practicePronunciation(el.dataset.word, el, el.dataset.fb, false);
        break;
      case 'mic-modal':
        practicePronunciation(el.dataset.word, el, 'modal-mic-fb', false);
        break;
      case 'open-glossary':
        openGlossaryModal(el.dataset.word, senseId, el);
        break;
      case 'toggle-read-aloud':
        toggleReadPassage(senseId);
        break;
      case 'set-speed':
        setAudioSpeed(el.dataset.speed);
        break;
      case 'check-inline-q': {
        const uid = el.dataset.uid;
        const meta = PRIVATE_ANSWERS.get(uid);
        const fb = document.getElementById('fb-' + uid);
        if (!meta || !fb) return;
        const box = document.getElementById('chk-' + uid);
        box.querySelectorAll('.inline-opt').forEach(b => b.classList.remove('correct', 'incorrect'));
        const isOk = el.dataset.opt === meta.correctTxt;
        el.classList.add(isOk ? 'correct' : 'incorrect');
        fb.style.display = 'block';
        fb.style.color = isOk ? 'var(--correct)' : 'var(--incorrect)';
        fb.textContent = (isOk ? '✅ Correct! ' : '❌ Not quite. ') + meta.explain;
        awardXP(15, isOk ? 'chk_' + uid : null, el, isOk);
        break;
      }
      case 'solve-clinical': {
        const uid = el.dataset.uid;
        const caseId = el.dataset.case;
        const meta = PRIVATE_ANSWERS.get(uid);
        const fb = document.getElementById('clin-fb-' + uid);
        const card = document.getElementById('case-card-' + uid);
        if (!meta || !fb || !card) return;
        card.querySelectorAll('.inline-opt').forEach(b => b.classList.remove('correct', 'incorrect'));
        const isOk = el.dataset.opt === meta.correctTxt;
        el.classList.add(isOk ? 'correct' : 'incorrect');
        fb.style.display = 'block';
        fb.style.background = isOk ? 'var(--correct-tint)' : 'var(--incorrect-tint)';
        fb.style.color = isOk ? '#14532D' : '#7F1D1D';
        fb.textContent = (isOk ? '🩺 Diagnosis Confirmed! ' : '⚠️ Re-evaluate Neural Site: ') + meta.explain;
        if (isOk) {
          if (!appState.gamification.solvedCases.includes(caseId)) {
            appState.gamification.solvedCases.push(caseId);
          }
          awardXP(40, 'case_' + caseId, el, true);
        } else {
          awardXP(0, null, el, false);
        }
        break;
      }
      case 'pick-path-chip': {
        const stepIdx = parseInt(el.dataset.stepIdx, 10);
        if (!pathSelections[senseId].includes(stepIdx)) {
          pathSelections[senseId].push(stepIdx);
          el.classList.add('used');
          renderPathSlots(senseId);
        }
        break;
      }
      case 'remove-path-slot': {
        const pos = parseInt(el.dataset.pos, 10);
        const removed = pathSelections[senseId].splice(pos, 1)[0];
        const chip = document.querySelector(`#path-chips-${senseId} [data-step-idx="${removed}"]`);
        if (chip) chip.classList.remove('used');
        renderPathSlots(senseId);
        break;
      }
      case 'check-path': {
        const sense = SENSES.find(s => s.id === senseId);
        const fb = document.getElementById('path-fb-' + senseId);
        const sel = pathSelections[senseId] || [];
        if (sel.length < sense.pathLabels.length) {
          fb.style.color = '#B45309';
          fb.textContent = '⚠️ Place all 5 steps into the slots before verifying.';
          return;
        }
        const ok = sel.every((val, i) => val === i);
        if (ok) {
          fb.style.color = 'var(--correct)';
          fb.textContent = '🌟 Exact Physiological Sequence! Stimulus → Organ → Transduction → Nerve → Cortex.';
          awardXP(25, 'path_' + senseId, fb, true);
        } else {
          fb.style.color = 'var(--incorrect)';
          fb.textContent = '❌ Out of biological order. Remember: Stimulus always enters first and Brain Cortex perceives last.';
          awardXP(0, null, fb, false);
        }
        break;
      }
      case 'reset-path': {
        const sense = SENSES.find(s => s.id === senseId);
        if (sense) initPathOrder(sense);
        const fb = document.getElementById('path-fb-' + senseId);
        if (fb) fb.textContent = '';
        break;
      }
      case 'match-left':
      case 'match-right': {
        if (el.classList.contains('matched')) return;
        const ms = matchState[senseId];
        const col = el.parentElement;
        col.querySelectorAll('.match-item').forEach(b => b.classList.remove('selected'));
        el.classList.add('selected');
        if (action === 'match-left') ms.selLeft = el;
        else ms.selRight = el;

        if (ms.selLeft && ms.selRight) {
          const isPair = ms.selLeft.dataset.pair === ms.selRight.dataset.pair;
          if (isPair) {
            ms.selLeft.classList.remove('selected');
            ms.selRight.classList.remove('selected');
            ms.selLeft.classList.add('matched');
            ms.selRight.classList.add('matched');
            ms.matchedCount += 1;
            awardXP(15, null, ms.selRight, true);
            if (ms.matchedCount === ms.total) {
              const fb = document.getElementById('match-fb-' + senseId);
              if (fb) {
                fb.style.color = 'var(--correct)';
                fb.textContent = '🌟 All Anatomical Pairs Matched!';
              }
              awardXP(25, 'match_all_' + senseId, fb, true);
            }
          } else {
            const l = ms.selLeft, r = ms.selRight;
            l.classList.add('shake');
            r.classList.add('shake');
            awardXP(0, null, r, false);
            setTimeout(() => l.classList.remove('shake', 'selected'), 420);
            setTimeout(() => r.classList.remove('shake', 'selected'), 420);
          }
          ms.selLeft = null;
          ms.selRight = null;
        }
        break;
      }
      case 'reset-match': {
        const sense = SENSES.find(s => s.id === senseId);
        if (sense) initMatchPairs(sense);
        break;
      }
      case 'dictate-cloze': {
        const sense = SENSES.find(s => s.id === senseId);
        if (sense) {
          const cleanParagraph = sense.cloze.text.replace(/[{}]/g, '');
          speakText(cleanParagraph, 0.85);
        }
        break;
      }
      case 'fill-cloze-chip': {
        const box = document.getElementById('cloze-box-' + senseId);
        if (!box) return;
        let targetInp = activeClozeGap[senseId];
        if (!targetInp || !document.body.contains(targetInp)) {
          targetInp = Array.from(box.querySelectorAll('.cloze-input')).find(inp => !inp.value.trim());
        }
        if (targetInp) {
          targetInp.value = el.dataset.word;
          el.classList.add('used');
          activeClozeGap[senseId] = null;
        }
        break;
      }
      case 'check-cloze': {
        const box = document.getElementById('cloze-box-' + senseId);
        const fb = document.getElementById('cloze-fb-' + senseId);
        if (!box || !fb) return;
        let okCount = 0;
        const inputs = box.querySelectorAll('.cloze-input');
        let morphHint = '';
        inputs.forEach(inp => {
          const ans = PRIVATE_ANSWERS.get(inp.dataset.uid) || '';
          const val = inp.value.trim().toLowerCase();
          inp.classList.remove('correct', 'incorrect');
          if (val === ans) {
            inp.classList.add('correct');
            okCount += 1;
          } else {
            inp.classList.add('incorrect');
            if (val && (val + 's' === ans || val === ans + 's')) {
              morphHint = ' 💡 Check singular vs plural (-s) agreement!';
            }
          }
        });
        fb.style.color = okCount === inputs.length ? 'var(--correct)' : 'var(--incorrect)';
        fb.textContent = `Score: ${okCount}/${inputs.length}.${morphHint}`;
        if (okCount === inputs.length) awardXP(30, 'cloze_' + senseId, fb, true);
        break;
      }
      case 'reset-cloze': {
        const sense = SENSES.find(s => s.id === senseId);
        if (sense) renderCloze(sense);
        break;
      }
      case 'reveal-explain': {
        const box = document.getElementById('poe-explain-box-' + senseId);
        if (box) {
          box.style.display = 'block';
          awardXP(20, 'poe_' + senseId, box, true);
        }
        break;
      }
      case 'insert-chip': {
        const ta = document.getElementById('write-' + senseId);
        if (ta) {
          const v = el.dataset.chip;
          ta.value = (ta.value ? ta.value.trimEnd() + ' ' : '') + v + ' ';
          ta.focus();
          analyzeWritingLive(senseId);
        }
        break;
      }
      case 'validate-writing':
        validateWritingRubric(senseId);
        break;
      case 'mic-writing': {
        const ta = document.getElementById('write-' + senseId);
        if (ta && ta.value.trim().length > 10) {
          practicePronunciation(ta.value, el, 'write-mic-fb-' + senseId, true);
        } else {
          alert('Write your explanation paragraph first before reading it aloud.');
        }
        break;
      }
      case 'speak-model': {
        const sense = SENSES.find(s => s.id === senseId);
        if (sense) speakText(sense.writing.model);
        break;
      }
      case 'check-quiz': {
        const sense = SENSES.find(s => s.id === senseId);
        const box = document.getElementById('quiz-box-' + senseId);
        const res = document.getElementById('quiz-result-' + senseId);
        if (!sense || !box || !res) return;
        let correctCount = 0;
        box.querySelectorAll('.quiz-item').forEach(item => {
          const uid = item.dataset.uid;
          const meta = PRIVATE_ANSWERS.get(uid);
          const checked = item.querySelector('input[type="radio"]:checked');
          const exp = document.getElementById('q-exp-' + uid);
          item.querySelectorAll('.quiz-opt-label').forEach(l => l.classList.remove('correct', 'incorrect'));
          if (checked) {
            const ok = checked.value === meta.correctTxt;
            checked.closest('.quiz-opt-label').classList.add(ok ? 'correct' : 'incorrect');
            if (ok) correctCount += 1;
          }
          if (exp) {
            exp.style.display = 'block';
            exp.textContent = `Answer: ${meta.correctTxt} — ${meta.explain}`;
          }
        });
        appState.scores[senseId] = correctCount;
        saveState();
        const pct = Math.round((correctCount / sense.quiz.length) * 100);
        res.style.color = pct >= 70 ? 'var(--correct)' : '#B45309';
        res.textContent = `Score: ${correctCount}/${sense.quiz.length} (${pct}%)`;
        awardXP(correctCount * 10, 'quiz_' + senseId, res, pct >= 50);
        break;
      }
      case 'set-compare-mode':
        renderCompareTable(el.dataset.mode);
        break;
      case 'check-compare-matrix': {
        let ok = 0, total = 0;
        document.querySelectorAll('.compare-select').forEach(sel => {
          total += 1;
          const ans = PRIVATE_ANSWERS.get(sel.dataset.uid);
          sel.style.borderColor = sel.value === ans ? 'var(--correct)' : 'var(--incorrect)';
          if (sel.value === ans) ok += 1;
        });
        const fb = document.getElementById('compare-fb');
        if (fb) {
          fb.style.color = ok === total ? 'var(--correct)' : '#B45309';
          fb.textContent = `Matrix Accuracy: ${ok}/${total}`;
          if (ok >= total * 0.7) awardXP(50, 'compare_matrix', fb, true);
        }
        break;
      }
      case 'set-flash-mode':
        flashMode = el.dataset.mode;
        document.getElementById('flash-mode-en')?.classList.toggle('active', flashMode === 'en-def');
        document.getElementById('flash-mode-def')?.classList.toggle('active', flashMode === 'def-en');
        flashFlipped = false;
        updateFlashcardUI();
        break;
      case 'smart-queue-flash':
        flashDeck = buildSmartInterleavedDeck();
        flashIdx = 0;
        flashFlipped = false;
        updateFlashcardUI();
        break;
      case 'flip-flashcard':
        flashFlipped = !flashFlipped;
        updateFlashcardUI();
        break;
      case 'grade-sm2':
        gradeFlashcardSM2(parseInt(el.dataset.q, 10));
        break;
      case 'next-flashcard':
        flashIdx = (flashIdx + 1) % flashDeck.length;
        flashFlipped = false;
        updateFlashcardUI();
        break;
      case 'prev-flashcard':
        flashIdx = (flashIdx - 1 + flashDeck.length) % flashDeck.length;
        flashFlipped = false;
        updateFlashcardUI();
        break;
      case 'start-standard-exam':
        rebuildStandardExam();
        break;
      case 'start-cat-exam':
        startAdaptiveCAT();
        break;
      case 'answer-cat-item': {
        const meta = PRIVATE_ANSWERS.get(el.dataset.uid);
        if (!meta || !catState) return;
        const ok = el.dataset.opt === meta.options[0];
        catState.history.push({ cefr: meta.cefr, difficulty: meta.difficulty, skill: meta.skill, correct: ok });
        catState.theta = ok ? Math.min(4.0, catState.theta + 0.55) : Math.max(1.0, catState.theta - 0.5);
        playGameSfx(ok ? 'correct' : 'error');
        renderNextCATItem();
        break;
      }
      case 'check-final-exam':
        checkStandardFinalExam();
        break;
      case 'print-cert':
        window.print();
        break;
    }
  });

  // Input & Focus Listeners
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.dataset.action === 'writing-input') {
      debouncedAnalyzeWriting(el.dataset.sense);
    } else if (el.dataset.action === 'save-poe-obs') {
      appState.poeObs[el.dataset.sense] = el.value;
      saveState();
    } else if (el.dataset.action === 'bs-calib') {
      const senseId = el.dataset.sense;
      const dot = document.getElementById('bs-dot-' + senseId);
      const lbl = document.getElementById('bs-calib-val-' + senseId);
      const px = parseInt(el.value, 10);
      if (dot) dot.style.marginLeft = px + 'px';
      if (lbl) lbl.textContent = `~${Math.round(px * 0.12)} cm away`;
    } else if (el.id === 'glossary-search') {
      debouncedGlossaryFilter(el.value);
    }
  });

  document.addEventListener('focusin', (e) => {
    if (e.target.classList && e.target.classList.contains('cloze-input')) {
      activeClozeGap[e.target.dataset.sense] = e.target;
    }
  });

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el.dataset.action === 'poe-predict') {
      const fb = document.getElementById('poe-predict-fb-' + el.dataset.sense);
      if (fb) {
        fb.style.display = 'block';
        fb.style.color = 'var(--correct)';
        fb.textContent = '✅ Hypothesis locked! Proceed to Phase 2 below to test your prediction.';
      }
      awardXP(10, 'hypo_' + el.dataset.sense, el, true);
    } else if (el.dataset.action === 'record-ican') {
      appState.ican[`${el.dataset.sense}_${el.dataset.idx}`] = el.checked;
      saveState();
    } else if (el.id === 'import-progress-file' && el.files && el.files[0]) {
      importPortfolioJSON(el.files[0]);
      el.value = '';
    }
  });

  // WAI-ARIA Arrow Navigation for 4-Stage Stepper Tabs
  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest('.stage-tab');
    if (!tab) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const nav = tab.closest('.stage-nav');
      const all = Array.from(nav.querySelectorAll('.stage-tab'));
      const idx = all.indexOf(tab);
      const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % all.length : (idx - 1 + all.length) % all.length;
      all[nextIdx].focus();
      goToStage(all[nextIdx].dataset.sense, parseInt(all[nextIdx].dataset.stage, 10));
    }
  });

  function restoreSenseInputs(sense) {
    const ta = document.getElementById('write-' + sense.id);
    if (ta && appState.writtenText[sense.id]) {
      ta.value = appState.writtenText[sense.id];
      analyzeWritingLive(sense.id);
    }
    const obs = document.getElementById('obs-' + sense.id);
    if (obs && appState.poeObs[sense.id]) {
      obs.value = appState.poeObs[sense.id];
    }
    sense.objectives.forEach((_, idx) => {
      const cb = document.getElementById(`ican-${sense.id}-${idx}`);
      if (cb && appState.ican[`${sense.id}_${idx}`]) cb.checked = true;
    });
  }

  function reinitializeFullWorkspace() {
    renderedPanels.clear();
    document.querySelectorAll('.sense-panel[data-sense]').forEach(p => { p.innerHTML = ''; });
    setScaffoldingMode(appState.scaffolding || 'guided');
    updateTabBadges();
    updateHUD();
    switchTab(currentSenseId || 'sight');
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* ------------------------------------------------------------------
     16. Boot Application (Lazy First Paint Optimization)
  ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    setScaffoldingMode(appState.scaffolding || 'guided');
    updateTabBadges();
    updateHUD();
    switchTab('sight'); // Renders ONLY Sight on boot for ultra-fast LCP
  });
})();
