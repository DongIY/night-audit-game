/**
 * 《夜班审计》通用交互模块
 */
const Interactions = (() => {

  /**
   * 打字机效果
   */
  function typewriter(element, text, speed = 30) {
    return new Promise(resolve => {
      let i = 0;
      element.textContent = '';
      element.style.visibility = 'visible';

      let skip = false;
      const skipHandler = () => { skip = true; };
      element.addEventListener('click', skipHandler, { once: true });

      const timer = setInterval(() => {
        if (skip) {
          element.textContent = text;
          clearInterval(timer);
          resolve();
          return;
        }
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  /**
   * 通知弹窗
   */
  function notify(message, type = 'info', duration = 3000) {
    const container = getNotifyContainer();
    const el = document.createElement('div');
    el.className = `notify notify-${type}`;

    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '🔴', clue: '🔍' };
    el.innerHTML = `
      <span class="notify-icon">${icons[type] || 'ℹ️'}</span>
      <span class="notify-msg">${message}</span>
    `;

    container.appendChild(el);
    requestAnimationFrame(() => el.classList.add('notify-show'));

    // 音效联动
    if (typeof AudioEngine !== 'undefined') {
      if (type === 'clue') AudioEngine.playClueFound();
      else if (type === 'success') AudioEngine.playSuccess();
      else if (type === 'error') AudioEngine.playError();
      else AudioEngine.playNotify();
    }

    // 线索发现时的增强效果
    if (type === 'clue') {
      showClueFlash();
      checkClueAchievements();
    }

    setTimeout(() => {
      el.classList.remove('notify-show');
      el.classList.add('notify-hide');
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  // 线索发现增强效果
  let clueCombo = 0;
  let comboTimer = null;

  function showClueFlash() {
    // 全屏闪光
    const flash = document.createElement('div');
    flash.className = 'clue-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);

    // 连击计数
    clueCombo++;
    clearTimeout(comboTimer);
    comboTimer = setTimeout(() => { clueCombo = 0; }, 8000);

    if (clueCombo >= 2) {
      const combo = document.createElement('div');
      combo.className = 'clue-combo';
      combo.innerHTML = `<span class="combo-num">${clueCombo}x</span> <span class="combo-text">连续发现</span>`;
      document.body.appendChild(combo);
      setTimeout(() => combo.classList.add('combo-show'), 50);
      setTimeout(() => {
        combo.classList.add('combo-hide');
        setTimeout(() => combo.remove(), 500);
      }, 2000);
    }

    // 屏幕边缘脉冲
    const pulse = document.createElement('div');
    pulse.className = 'screen-pulse';
    document.body.appendChild(pulse);
    setTimeout(() => pulse.remove(), 1500);
  }

  function getNotifyContainer() {
    let c = document.getElementById('notify-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'notify-container';
      document.body.appendChild(c);
    }
    return c;
  }

  /**
   * 折叠展开
   */
  function initCollapsibles() {
    document.querySelectorAll('[data-collapse]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-collapse');
        const target = document.getElementById(targetId);
        if (!target) return;

        const isOpen = target.classList.contains('collapsed-open');
        if (isOpen) {
          target.style.maxHeight = '0';
          target.classList.remove('collapsed-open');
          trigger.classList.remove('collapse-open');
        } else {
          target.style.maxHeight = target.scrollHeight + 'px';
          target.classList.add('collapsed-open');
          trigger.classList.add('collapse-open');
        }
      });
    });
  }

  /**
   * 闪烁高亮
   */
  function flashHighlight(element, times = 2) {
    let count = 0;
    const interval = setInterval(() => {
      element.classList.toggle('flash-highlight');
      count++;
      if (count >= times * 2) {
        clearInterval(interval);
        element.classList.remove('flash-highlight');
        element.classList.add('highlighted');
      }
    }, 400);
  }

  /**
   * 淡入动画
   */
  function fadeInElements(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay * i);
    });
  }

  /**
   * 确认弹窗
   */
  function confirm(title, message, onConfirm, onCancel) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-modal">
        <div class="confirm-title">${title}</div>
        <div class="confirm-msg">${message}</div>
        <div class="confirm-actions">
          <button class="btn-secondary confirm-cancel">取消</button>
          <button class="btn-primary confirm-ok">确认</button>
        </div>
      </div>
    `;

    overlay.querySelector('.confirm-ok').addEventListener('click', () => {
      overlay.remove();
      if (onConfirm) onConfirm();
    });
    overlay.querySelector('.confirm-cancel').addEventListener('click', () => {
      overlay.remove();
      if (onCancel) onCancel();
    });

    document.body.appendChild(overlay);
  }

  /**
   * 初始化所有通用交互
   */
  function init() {
    initCollapsibles();
    fadeInElements('.fade-in');
    setTimeout(initParticles, 1000);
    setTimeout(showMonologue, 3000);
    document.querySelector('.main-content')?.classList.add('page-enter');
  }



  // === v3.0 成就系统 ===
  const achievements = {
    'first-clue': { icon: '🔍', name: '初露端倪', desc: '发现第一条线索', rarity: 'common' },
    'combo-3': { icon: '⚡', name: '火眼金睛', desc: '连续发现3条线索', rarity: 'rare' },
    'combo-5': { icon: '🔥', name: '势如破竹', desc: '连续发现5条线索', rarity: 'epic' },
    'trust-max': { icon: '🤝', name: '以心换心', desc: '将受害者信任度提升至100%', rarity: 'rare' },
    'speed-run': { icon: '⏱️', name: '闪电审计', desc: '在20分钟内完成游戏', rarity: 'legendary' },
    'all-clues': { icon: '🏆', name: '真相大白', desc: '收集全部线索', rarity: 'legendary' },
    'hacker': { icon: '💻', name: '白帽骇客', desc: '在终端使用所有命令', rarity: 'epic' },
    'detective': { icon: '🕵️', name: '福尔摩斯', desc: '一次通关获得S级评价', rarity: 'legendary' },
    'email-master': { icon: '📧', name: '邮件考古学家', desc: '恢复所有被删除的邮件', rarity: 'rare' },
    'timeline-ace': { icon: '📹', name: '时间线大师', desc: '正确排列所有监控片段', rarity: 'rare' },
    'whisper': { icon: '👤', name: '密语者', desc: '发现匿名线人的真实身份', rarity: 'epic' },
    'night-owl': { icon: '🦉', name: '夜猫子', desc: '游戏内时间超过5:00 AM', rarity: 'common' },
    'paranoid': { icon: '👁️', name: '多疑者', desc: '查看了每一个可展开的面板', rarity: 'rare' },
  };

  function unlockAchievement(id) {
    if (!achievements[id]) return;
    const unlocked = NightAudit.get('achievements') || [];
    if (unlocked.includes(id)) return;
    unlocked.push(id);
    NightAudit.set('achievements', unlocked);
    showAchievementPopup(achievements[id]);
    if (typeof AudioEngine !== 'undefined' && AudioEngine.playAchievement) AudioEngine.playAchievement();
  }

  function showAchievementPopup(ach) {
    const el = document.createElement('div');
    el.className = 'achievement-popup';
    el.innerHTML = `
      <div class="ach-header">
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-title-group">
          <div class="ach-label">🏅 成就解锁</div>
          <div class="ach-name">${ach.name}</div>
        </div>
      </div>
      <div class="ach-desc">${ach.desc}</div>
      <span class="ach-rarity ach-${ach.rarity}">${({common:'普通',rare:'稀有',epic:'史诗',legendary:'传说'})[ach.rarity]}</span>
    `;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('ach-show'), 50);
    setTimeout(() => {
      el.classList.add('ach-hide');
      setTimeout(() => el.remove(), 500);
    }, 5000);
  }

  // === 内心独白系统 ===
  const monologues = {
    2: ['23条工单……全部标注"已解决"。但我的直觉说，这里面有问题。', 12000],
    3: ['这条工单的附件被人为清理了。为什么？', 8000],
    5: ['11分钟的空白。在审计日志里，这段时间不存在。', 10000],
    7: ['凌晨3点删除邮件……谁会在那个时间做这种事？', 10000],
    9: ['操作日志被覆盖了。但他们不知道——还有一份异地备份。', 8000],
    12: ['这些对话……他们从一开始就知道。', 6000],
    14: ['他说自己一直在家。让摄像头来验证这个说法。', 8000],
    15: ['命令行。在这里，代码不会说谎。', 6000],
    16: ['真相在手。但怎么处理它——这决定了一切。', 10000],
    17: ['时间不多了。每一秒都在流逝。', 3000],
  };

  function showMonologue() {
    const page = Navigation.getCurrentPage();
    const mono = monologues[page];
    if (!mono) return;
    const shownMonos = NightAudit.get('shownMonos') || [];
    if (shownMonos.includes(page)) return;
    shownMonos.push(page);
    NightAudit.set('shownMonos', shownMonos);

    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'inner-monologue';
      el.textContent = mono[0];
      document.body.appendChild(el);
      setTimeout(() => el.classList.add('mono-show'), 50);
      setTimeout(() => {
        el.classList.remove('mono-show');
        setTimeout(() => el.remove(), 800);
      }, 6000);
    }, mono[1]);
  }

  // === 环境粒子 ===
  function initParticles() {
    const count = 8;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'env-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      p.style.animationDuration = (15 + Math.random() * 20) + 's';
      p.style.animationDelay = (Math.random() * 15) + 's';
      p.style.opacity = (0.2 + Math.random() * 0.3).toString();
      document.body.appendChild(p);
    }
  }

  // 线索发现自动触发成就
  function checkClueAchievements() {
    const clues = NightAudit.getAllClues();
    const count = Object.keys(clues).length;
    if (count >= 1) unlockAchievement('first-clue');
    if (clueCombo >= 3) unlockAchievement('combo-3');
    if (clueCombo >= 5) unlockAchievement('combo-5');
  }

  return { typewriter, notify, initCollapsibles, flashHighlight, fadeInElements, confirm, init, unlockAchievement, showMonologue, initParticles, checkClueAchievements };
})();

document.addEventListener('DOMContentLoaded', () => {
  Interactions.init();
});
