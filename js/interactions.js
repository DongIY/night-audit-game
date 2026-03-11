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

    setTimeout(() => {
      el.classList.remove('notify-show');
      el.classList.add('notify-hide');
      setTimeout(() => el.remove(), 300);
    }, duration);
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
  }

  return { typewriter, notify, initCollapsibles, flashHighlight, fadeInElements, confirm, init };
})();

document.addEventListener('DOMContentLoaded', () => {
  Interactions.init();
});
