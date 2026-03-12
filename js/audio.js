/**
 * 《夜班审计》音效引擎 v1.0
 * 使用 Web Audio API 程序化生成所有音效，无需外部音频文件
 */
const AudioEngine = (() => {
  let ctx = null;
  let enabled = true;
  let bgmGain = null;
  let bgmOscillators = [];
  let bgmPlaying = false;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // 读取/保存用户音量偏好
  function loadPreference() {
    try {
      const saved = localStorage.getItem('night-audit-audio');
      if (saved !== null) enabled = saved === 'true';
    } catch {}
  }

  function savePreference() {
    try { localStorage.setItem('night-audit-audio', String(enabled)); } catch {}
  }

  function isEnabled() { return enabled; }

  function toggle() {
    enabled = !enabled;
    savePreference();
    if (!enabled) stopBGM();
    return enabled;
  }

  // ===== 音效生成 =====

  /** 打字机按键音 — 短促的高频 click */
  function playKeystroke() {
    if (!enabled) return;
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'square';
    osc.frequency.value = 1800 + Math.random() * 600;
    gain.gain.setValueAtTime(0.03, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.04);
    osc.connect(gain).connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.04);
  }

  /** 手机铃声 — 双音交替 */
  function playRingtone(duration = 3) {
    if (!enabled) return;
    const c = getCtx();
    const ringCount = Math.floor(duration / 0.8);
    for (let i = 0; i < ringCount; i++) {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = i % 2 === 0 ? 440 : 480;
      gain.gain.setValueAtTime(0.08, c.currentTime + i * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.4 + 0.35);
      osc.connect(gain).connect(c.destination);
      osc.start(c.currentTime + i * 0.4);
      osc.stop(c.currentTime + i * 0.4 + 0.35);
    }
  }

  /** 线索发现 — 上行琶音 */
  function playClueFound() {
    if (!enabled) return;
    const c = getCtx();
    const notes = [523, 659, 784]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, c.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.12 + 0.3);
      osc.connect(gain).connect(c.destination);
      osc.start(c.currentTime + i * 0.12);
      osc.stop(c.currentTime + i * 0.12 + 0.3);
    });
  }

  /** 成功音效 — 明亮的上行和弦 */
  function playSuccess() {
    if (!enabled) return;
    const c = getCtx();
    const notes = [523, 659, 784, 1047]; // C5 - E5 - G5 - C6
    notes.forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.07, c.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.15 + 0.5);
      osc.connect(gain).connect(c.destination);
      osc.start(c.currentTime + i * 0.15);
      osc.stop(c.currentTime + i * 0.15 + 0.5);
    });
  }

  /** 错误/失败音效 — 低频短促 */
  function playError() {
    if (!enabled) return;
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 180;
    gain.gain.setValueAtTime(0.06, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
    osc.connect(gain).connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.25);
  }

  /** 通知提示音 — 柔和的双音 */
  function playNotify() {
    if (!enabled) return;
    const c = getCtx();
    [880, 1320].forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.04, c.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.1 + 0.2);
      osc.connect(gain).connect(c.destination);
      osc.start(c.currentTime + i * 0.1);
      osc.stop(c.currentTime + i * 0.1 + 0.2);
    });
  }

  /** 章节转场 — 低沉的嗡鸣 + 上升 */
  function playTransition() {
    if (!enabled) return;
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 2);
    gain.gain.setValueAtTime(0.04, c.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, c.currentTime + 1);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 2.5);
    osc.connect(gain).connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 2.5);

    // 添加环境 shimmer
    const shimmer = c.createOscillator();
    const sGain = c.createGain();
    shimmer.type = 'sine';
    shimmer.frequency.value = 2400;
    sGain.gain.setValueAtTime(0, c.currentTime);
    sGain.gain.linearRampToValueAtTime(0.008, c.currentTime + 1.5);
    sGain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 2.5);
    shimmer.connect(sGain).connect(c.destination);
    shimmer.start(c.currentTime);
    shimmer.stop(c.currentTime + 2.5);
  }

  /** 即时消息提示音 — 短促三音提示 */
  function playMsgAlert() {
    if (!enabled) return;
    const c = getCtx();
    [660, 880, 1100].forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.05, c.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.08 + 0.15);
      osc.connect(gain).connect(c.destination);
      osc.start(c.currentTime + i * 0.08);
      osc.stop(c.currentTime + i * 0.08 + 0.15);
    });
  }

  /** 倒计时滴答声 */
  function playTick() {
    if (!enabled) return;
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1000;
    gain.gain.setValueAtTime(0.04, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
    osc.connect(gain).connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.05);
  }

  /** 紧张 BGM — 低沉的 drone + 缓慢脉动 */
  function startBGM() {
    if (!enabled || bgmPlaying) return;
    const c = getCtx();
    bgmGain = c.createGain();
    bgmGain.gain.value = 0.025;
    bgmGain.connect(c.destination);

    // 低频 drone
    const drone = c.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55; // A1
    drone.connect(bgmGain);
    drone.start();

    // 稍高的不和谐音
    const drone2 = c.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 82.4; // E2 — 纯五度
    const g2 = c.createGain();
    g2.gain.value = 0.6;
    drone2.connect(g2).connect(bgmGain);
    drone2.start();

    // LFO 调制音量产生脉动感
    const lfo = c.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.3; // 缓慢脉动
    const lfoGain = c.createGain();
    lfoGain.gain.value = 0.01;
    lfo.connect(lfoGain).connect(bgmGain.gain);
    lfo.start();

    bgmOscillators = [drone, drone2, lfo];
    bgmPlaying = true;
  }

  /** 紧急 BGM（倒计时专用）— 更快的脉动 + 更高的张力 */
  function startUrgentBGM() {
    if (!enabled || bgmPlaying) return;
    const c = getCtx();
    bgmGain = c.createGain();
    bgmGain.gain.value = 0.03;
    bgmGain.connect(c.destination);

    const drone = c.createOscillator();
    drone.type = 'sawtooth';
    drone.frequency.value = 55;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    drone.connect(filter).connect(bgmGain);
    drone.start();

    const drone2 = c.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 73.4; // D2 — 制造不和谐感
    const g2 = c.createGain();
    g2.gain.value = 0.5;
    drone2.connect(g2).connect(bgmGain);
    drone2.start();

    // 更快的 LFO
    const lfo = c.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 1.2; // 快脉动 — 紧张感
    const lfoGain = c.createGain();
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain).connect(bgmGain.gain);
    lfo.start();

    bgmOscillators = [drone, drone2, lfo];
    bgmPlaying = true;
  }

  function stopBGM() {
    bgmOscillators.forEach(o => {
      try { o.stop(); } catch {}
    });
    bgmOscillators = [];
    bgmPlaying = false;
  }

  loadPreference();

  return {
    isEnabled, toggle,
    playKeystroke, playRingtone, playClueFound, playSuccess, playError,
    playNotify, playTransition, playTick, playMsgAlert,
    startBGM, startUrgentBGM, stopBGM,
    getCtx  // 初始化 AudioContext（需要用户交互）
  };
})();
