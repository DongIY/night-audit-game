/**
 * 《夜班审计》导航模块 v3.0
 * 16章节架构，含4个新增深度调查章节
 */
const Navigation = (() => {
  const pages = {
    0: 'prologue.html',
    1: 'index.html',
    2: 'dashboard.html',
    3: 'ticket.html',
    4: 'audit-log.html',
    5: 'kb-diff.html',
    6: 'email-forensics.html',
    7: 'supply-chain.html',
    8: 'db-forensics.html',
    9: 'permission.html',
    10: 'comms.html',
    11: 'personnel.html',
    12: 'surveillance.html',
    13: 'terminal.html',
    14: 'choices.html',
    15: 'finale.html',
    16: 'ending-success.html',
    17: 'ending-partial.html',
    18: 'ending-failure.html'
  };

  const pageNames = {
    0: '序章',
    1: '夜班登录',
    2: '事故总览',
    3: '工单详情',
    4: '审计日志',
    5: '知识库对比',
    6: '邮件考古',
    7: '供应链追踪',
    8: '数据库取证',
    9: '权限恢复',
    10: '通讯解密',
    11: '人事档案',
    12: '监控回放',
    13: '服务器终端',
    14: '道德抉择',
    15: '终局止损',
    16: '结局 — 真相大白',
    17: '结局 — 部分真相',
    18: '结局 — 证据湮灭'
  };

  const pageChapters = {
    0: { num: '序章', title: '深夜来电' },
    1: { num: '第一章', title: '紧急登录' },
    2: { num: '第二章', title: '异常信号' },
    3: { num: '第三章', title: '被折叠的求救' },
    4: { num: '第四章', title: '时间不会说谎' },
    5: { num: '第五章', title: '被污染的知识' },
    6: { num: '第六章', title: '被删除的对话' },
    7: { num: '第七章', title: '断裂的供应链' },
    8: { num: '第八章', title: '数据不会撒谎' },
    9: { num: '第九章', title: '碎片拼合' },
    10: { num: '第十章', title: '暗线浮现' },
    11: { num: '第十一章', title: '谁是幕后' },
    12: { num: '第十二章', title: '目击者的沉默' },
    13: { num: '第十三章', title: '深入核心' },
    14: { num: '第十四章', title: '十字路口' },
    15: { num: '终章', title: '最后三分钟' }
  };

  const pageGuides = {
    0: { icon: '🌙', title: '深夜来电', text: '你是 Helpline Zero 的合规审计员。凌晨2点47分，手机突然响起——一个P1级事故需要你立即介入。<br><br>仔细阅读来电内容，准备进入系统。' },
    1: { icon: '🔐', title: '登录系统', text: '输入你的姓名并找到临时验证码才能登录系统。<br><br><strong>提示：</strong>仔细阅读右侧的邮件，但验证码可能没那么容易获得……' },
    2: { icon: '🔍', title: '定位可疑工单', text: '23条工单被异常关闭，但不是所有的都可疑。<br><br><strong>提示：</strong>使用标签筛选器，尝试不同的标签组合。系统告警中的关键词可能帮助你缩小范围。' },
    3: { icon: '📋', title: '寻找证据', text: '这条工单被异常关闭，附件也被清理了。但缓存中可能还有残留。<br><br><strong>提示：</strong>对话记录里隐藏着关键信息，有些可能被"折叠"了。' },
    4: { icon: '⏱️', title: '发现时间线异常', text: 'HZ-7 的执行日志记录了所有操作。但有些操作之间的时间间隔不正常。<br><br><strong>提示：</strong>选中两条日志进行时间差分析。重点关注"停止"指令和"继续执行"之间的关系。' },
    5: { icon: '📑', title: '追溯知识库篡改', text: '知识库条目在事故前被人修改了。新版本中可能藏有隐藏内容。<br><br><strong>提示：</strong>仔细对比新旧版本的差异，注意那些看似正常但语义完全改变的段落。' },
    6: { icon: '📧', title: '邮件考古', text: '有人在事故发生后紧急删除了大量内部邮件。但邮件服务器的回收站还保留着碎片。<br><br><strong>提示：</strong>从碎片中还原邮件链的时间线，找出关键对话的完整上下文。某些碎片之间存在逻辑关联。' },
    7: { icon: '🔗', title: '供应链追踪', text: 'AX13 门锁的安全漏洞被压了3周。但供应链上一定有人知道这件事。<br><br><strong>提示：</strong>追踪采购订单、质检报告和供应商通讯，建立证据链。注意日期和批次号的对应关系。' },
    8: { icon: '🗄️', title: '数据库取证', text: '系统数据库的操作日志记录了每一次数据修改。但有人试图掩盖痕迹。<br><br><strong>提示：</strong>通过查询语句追踪异常的数据变更——关注"谁"在"什么时候"修改了"什么数据"。' },
    9: { icon: '🔑', title: '组装恢复令牌', text: '审批邮件已被撤回，但残留的信息加上你之前收集的线索足以拼出令牌。<br><br><strong>提示：</strong>查看你的线索面板（右侧 🔍 按钮），将所有碎片按格式组合。' },
    10: { icon: '💬', title: '解密内部通讯', text: '系统内部的通讯记录被加密了。每种加密方式都有内置解码工具帮助你。<br><br>找出谁在幕后策划了这一切。' },
    11: { icon: '👤', title: '调查可疑人员', text: '你已经锁定了服务账号 svc-admin-0312。但谁在操控它？<br><br>调查员工档案和访问记录，找出真正的幕后操纵者。' },
    12: { icon: '📹', title: '监控回放', text: '办公区的门禁系统和监控记录了关键时间段内的人员活动。<br><br><strong>提示：</strong>将监控片段按时间线排列，交叉验证嫌疑人的不在场证词——谁在说谎？' },
    13: { icon: '💻', title: '服务器终端', text: '你获得了服务器的临时访问权限。通过命令行直接查找被隐藏的证据。<br><br>输入命令来探索系统深层的秘密。' },
    14: { icon: '⚖️', title: '道德抉择', text: '你已经掌握了全部真相。但如何处置这些证据，将决定事件的最终走向。<br><br>每一个选择都有代价——选择你认为正确的道路。' },
    15: { icon: '⏳', title: '最后三分钟', text: '自动执行队列还在运行！你必须在倒计时结束前完成两件事：<br><br>① 暂停执行队列 &nbsp; ② 将证据发送至安全通道<br><br>时间不等人，立即行动！' }
  };

  let gameClockBase = new Date('2026-02-15T02:47:12').getTime();
  let gameClockStarted = null;
  const CLOCK_SPEED = 3;

  function getGameTime() {
    if (!gameClockStarted) gameClockStarted = Date.now();
    const elapsed = (Date.now() - gameClockStarted) * CLOCK_SPEED;
    const gameTime = new Date(gameClockBase + elapsed);
    const hours24 = gameTime.getHours();
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    const h = hours12.toString().padStart(2, '0');
    const m = gameTime.getMinutes().toString().padStart(2, '0');
    return `${h}:${m} ${period}`;
  }

  function goTo(pageNum) {
    if (!NightAudit.canAccessPage(pageNum)) {
      showAccessDenied(pageNum);
      return;
    }
    const chapter = pageChapters[pageNum];
    if (chapter && pageNum > 0) {
      showTransition(chapter.num, chapter.title, () => {
        NightAudit.visitPage(pageNum);
        window.location.href = pages[pageNum];
      });
    } else {
      NightAudit.visitPage(pageNum);
      window.location.href = pages[pageNum];
    }
  }

  function showTransition(chapterNum, title, callback) {
    if (typeof AudioEngine !== 'undefined') AudioEngine.playTransition();
    const overlay = document.createElement('div');
    overlay.className = 'scene-transition';
    overlay.innerHTML = `
      <div class="scene-transition-text">${chapterNum}</div>
      <div class="scene-transition-sub">${title}</div>
    `;
    document.body.appendChild(overlay);
    setTimeout(callback, 1800);
  }

  function showAccessDenied(pageNum) {
    const overlay = document.createElement('div');
    overlay.className = 'access-denied-overlay';
    overlay.innerHTML = `
      <div class="access-denied-modal">
        <div class="access-denied-icon">🔒</div>
        <div class="access-denied-title">权限不足</div>
        <div class="access-denied-msg">你尚未获得访问 "${pageNames[pageNum]}" 的必要权限。<br>请先完成当前阶段的调查。</div>
        <button class="btn-primary" onclick="this.closest('.access-denied-overlay').remove()">确认</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    for (const [num, file] of Object.entries(pages)) {
      if (path === file) return parseInt(num);
    }
    return 1;
  }

  function initTopBar() {
    const currentPage = getCurrentPage();
    const topBar = document.getElementById('top-bar');
    if (!topBar) return;

    const chapter = pageChapters[currentPage];
    const chapterText = chapter ? `${chapter.num} · ${chapter.title}` : (pageNames[currentPage] || '');
    const audioOn = typeof AudioEngine !== 'undefined' && AudioEngine.isEnabled();

    topBar.innerHTML = `
      <div class="top-bar-inner">
        <div class="top-bar-left">
          <span class="top-bar-logo">HELPLINE<span class="logo-zero">ZERO</span></span>
          <span class="top-bar-sep">|</span>
          <span class="top-bar-system">夜班审计终端</span>
        </div>
        <div class="top-bar-center" style="position:relative;">
          <span class="top-bar-page chapter-selector-trigger" onclick="Navigation.toggleChapterMenu()" title="章节选择">${chapterText} ▾</span>
          <div class="chapter-dropdown" id="chapter-dropdown"></div>
        </div>
        <div class="top-bar-right">
          <span class="top-bar-playtime" id="playtime-display" title="游玩时长">⏱ 0m</span>
          <span class="top-bar-sep">|</span>
          <span class="top-bar-audio" id="audio-toggle" onclick="Navigation.toggleAudio()" title="音效开关" style="cursor:pointer;">${audioOn ? '🔊' : '🔇'}</span>
          <span class="top-bar-sep">|</span>
          <span class="top-bar-time" id="game-clock">02:47 AM</span>
          <span class="top-bar-sep">|</span>
          <span class="top-bar-user">${(NightAudit.get('employeeId') || 'CSA-2917')} ${NightAudit.get('playerName') || '审计员'}</span>
        </div>
      </div>
    `;
    startClock();
    startPlaytimeCounter();
  }

  function startPlaytimeCounter() {
    const el = document.getElementById('playtime-display');
    if (!el) return;
    function updatePlaytime() {
      const mins = NightAudit.getPlayTime();
      if (mins >= 60) {
        el.textContent = `⏱ ${Math.floor(mins/60)}h${mins%60}m`;
      } else {
        el.textContent = `⏱ ${mins}m`;
      }
    }
    updatePlaytime();
    setInterval(updatePlaytime, 30000);
  }

  function toggleChapterMenu() {
    const dd = document.getElementById('chapter-dropdown');
    if (!dd) return;
    const isOpen = dd.classList.contains('dropdown-open');
    if (isOpen) {
      dd.classList.remove('dropdown-open');
      return;
    }
    const visited = NightAudit.get('visitedPages') || [];
    const currentPage = getCurrentPage();
    let html = '';
    for (let i = 0; i <= 15; i++) {
      const ch = pageChapters[i];
      if (!ch) continue;
      const unlocked = visited.includes(i) || NightAudit.canAccessPage(i);
      const isCurrent = i === currentPage;
      html += `<div class="chapter-dd-item ${unlocked ? '' : 'dd-locked'} ${isCurrent ? 'dd-current' : ''}" 
                    onclick="${unlocked && !isCurrent ? `Navigation.goTo(${i})` : ''}">
        <span class="dd-num">${ch.num}</span>
        <span class="dd-title">${ch.title}</span>
        ${isCurrent ? '<span class="dd-badge">当前</span>' : (!unlocked ? '<span class="dd-lock">🔒</span>' : '')}
      </div>`;
    }
    dd.innerHTML = html;
    dd.classList.add('dropdown-open');

    setTimeout(() => {
      document.addEventListener('click', function closeDD(e) {
        if (!e.target.closest('.top-bar-center')) {
          dd.classList.remove('dropdown-open');
          document.removeEventListener('click', closeDD);
        }
      });
    }, 10);
  }

  function toggleAudio() {
    if (typeof AudioEngine === 'undefined') return;
    const on = AudioEngine.toggle();
    const el = document.getElementById('audio-toggle');
    if (el) el.textContent = on ? '🔊' : '🔇';
  }

  function startClock() {
    const clockEl = document.getElementById('game-clock');
    if (!clockEl) return;

    const savedBase = NightAudit.get('clockBase');
    const savedStart = NightAudit.get('clockStarted');
    if (savedBase) gameClockBase = savedBase;
    if (savedStart) gameClockStarted = savedStart;
    else {
      gameClockStarted = Date.now();
      NightAudit.set('clockBase', gameClockBase);
      NightAudit.set('clockStarted', gameClockStarted);
    }

    function tick() {
      clockEl.textContent = getGameTime();
    }
    tick();
    setInterval(tick, 10000);
  }

  function initBottomBar() {
    const currentPage = getCurrentPage();
    const bottomBar = document.getElementById('bottom-bar');
    if (!bottomBar) return;

    const clueCount = Object.keys(NightAudit.getAllClues()).length;
    const totalPages = 16;
    const progressPct = Math.min(Math.round((currentPage / totalPages) * 100), 100);

    bottomBar.innerHTML = `
      <div class="bottom-bar-inner">
        <span class="bottom-bar-status">
          <span class="status-dot ${currentPage >= 15 ? 'status-red' : 'status-blue'}"></span>
          HZ-7 状态: ${currentPage >= 15 ? '执行中 — 证据正在被清理' : '异常 — 待排查'}
        </span>
        <span class="bottom-bar-clues" style="cursor:pointer;" onclick="Navigation.toggleCluePanel()">🔍 已收集线索: ${clueCount}</span>
        <span class="bottom-bar-progress">调查进度: ${progressPct}%</span>
      </div>
    `;
  }

  function initCluePanel() {
    const panel = document.createElement('div');
    panel.id = 'clue-panel';
    panel.innerHTML = `
      <div class="clue-panel-header">
        <span class="clue-panel-title">🔍 线索面板</span>
        <button class="clue-panel-close" onclick="Navigation.toggleCluePanel()">✕</button>
      </div>
      <div class="clue-panel-body" id="clue-panel-body"></div>
    `;
    document.body.appendChild(panel);

    const toggle = document.createElement('div');
    toggle.id = 'clue-panel-toggle';
    toggle.textContent = '🔍 线索';
    toggle.onclick = () => toggleCluePanel();
    document.body.appendChild(toggle);

    document.addEventListener('clue-found', (e) => {
      updateCluePanel();
      initBottomBar();
    });

    updateCluePanel();
  }

  function updateCluePanel() {
    const body = document.getElementById('clue-panel-body');
    if (!body) return;

    const clues = NightAudit.getAllClues();
    const entries = Object.entries(clues);

    if (entries.length === 0) {
      body.innerHTML = `<div class="clue-empty">暂未收集到线索<br><br>在调查过程中发现的关键信息会自动记录在这里。</div>`;
    } else {
      body.innerHTML = entries.map(([id, clue]) => `
        <div class="clue-entry">
          <div class="clue-entry-name">${clue.name}</div>
          <div class="clue-entry-value">${clue.value}</div>
          <div class="clue-entry-source">来源: ${clue.source}</div>
        </div>
      `).join('');
    }
  }

  function toggleCluePanel() {
    const panel = document.getElementById('clue-panel');
    if (panel) {
      panel.classList.toggle('panel-open');
    }
  }

  function showGuide() {
    const currentPage = getCurrentPage();
    const guide = pageGuides[currentPage];
    if (!guide) return;

    const shownGuides = NightAudit.get('shownGuides') || [];
    if (shownGuides.includes(currentPage)) return;

    const overlay = document.createElement('div');
    overlay.className = 'guide-overlay';
    overlay.innerHTML = `
      <div class="guide-bubble">
        <div class="guide-icon">${guide.icon}</div>
        <div class="guide-title">${guide.title}</div>
        <div class="guide-text">${guide.text}</div>
        <button class="guide-dismiss" onclick="this.closest('.guide-overlay').remove()">开始调查</button>
      </div>
    `;
    document.body.appendChild(overlay);

    shownGuides.push(currentPage);
    NightAudit.set('shownGuides', shownGuides);
  }

  function init() {
    NightAudit.load();
    initTopBar();
    initBottomBar();
    initCluePanel();
    setTimeout(() => showGuide(), 500);
  }

  return { goTo, getCurrentPage, init, pageNames, toggleCluePanel, getGameTime, toggleChapterMenu, toggleAudio };
})();

document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});
