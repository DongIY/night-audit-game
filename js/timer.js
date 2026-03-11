/**
 * 《夜班审计》倒计时模块 (P7 终局专用)
 */
const Timer = (() => {
  let remaining = 180; // 3 分钟
  let interval = null;
  let callback = null;
  let tickCallback = null;

  function start(seconds, onTick, onExpire) {
    remaining = seconds;
    tickCallback = onTick;
    callback = onExpire;

    interval = setInterval(() => {
      remaining--;
      if (tickCallback) tickCallback(remaining);
      if (remaining <= 0) {
        stop();
        if (callback) callback();
      }
    }, 1000);
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function pause() {
    stop();
  }

  function resume(onTick, onExpire) {
    if (remaining > 0) {
      start(remaining, onTick || tickCallback, onExpire || callback);
    }
  }

  function getRemaining() {
    return remaining;
  }

  function format(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  return { start, stop, pause, resume, getRemaining, format };
})();
