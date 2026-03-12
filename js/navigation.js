/**
 * 《夜班审计》导航模块 v4.0
 * 18章节架构，含6个深度调查章节
 */
const Navigation = (() => {
  const pages = {
    0: 'prologue.html',
    1: 'index.html',
    2: 'dashboard.html',
    3: 'ticket.html',
    4: 'victim-profile.html',
    5: 'audit-log.html',
    6: 'kb-diff.html',
    7: 'email-forensics.html',
    8: 'supply-chain.html',
    9: 'db-forensics.html',
    10: 'permission.html',
    11: 'comms.html',
    12: 'conspiracy.html',
    13: 'personnel.html',
    14: 'surveillance.html',
    15: 'terminal.html',
    16: 'choices.html',
    17: 'finale.html',
    18: 'ending-success.html',
    19: 'ending-partial.html',
    20: 'ending-failure.html'
  };

  const pageNames = {
    0: '序章',
    1: '夜班登录',
    2: '事故总览',
    3: '工单详情',
    4: '受害者画像',
    5: '审计日志',
    6: '知识库对比',
    7: '邮件考古',
    8: '供应链追踪',
    9: '数据库取证',
    10: '权限恢复',
    11: '通讯解密',
    12: '深夜密谋',
    13: '人事档案',
    14: '监控回放',
    15: '服务器终端',
    16: '道德抉择',
    17: '终局止损',
    18: '结局 — 真相大白',
    19: '结局 — 部分真相',
    20: '结局 — 证据湮灭'
  };

  const pageChapters = {
    0: { num: '序章', title: '深夜来电' },
    1: { num: '第一章', title: '紧急登录' },
    2: { num: '第二章', title: '异常信号' },
    3: { num: '第三章', title: '被折叠的求救' },
    4: { num: '第四章', title: '受害者画像' },
    5: { num: '第五章', title: '时间不会说谎' },
    6: { num: '第六章', title: '被污染的知识' },
    7: { num: '第七章', title: '被删除的对话' },
    8: { num: '第八章', title: '断裂的供应链' },
    9: { num: '第九章', title: '数据不会撒谎' },
    10: { num: '第十章', title: '碎片拼合' },
    11: { num: '第十一章', title: '暗线浮现' },
    12: { num: '第十二章', title: '深夜密谋' },
    13: { num: '第十三章', title: '谁是幕后' },
    14: { num: '第十四章', title: '目击者的沉默' },
    15: { num: '第十五章', title: '深入核心' },
    16: { num: '第十六章', title: '十字路口' },
    17: { num: '终章', title: '最后三分钟' }
  };

  // 叙事转场：每个章节的沉浸式过渡文本（替代干巴巴的章节标题卡）
  const narrativeTransitions = {
    1: { lines: ['屏幕亮光刺入黑暗的卧室。', '你摸到手机——Helpline Zero 的紧急通道。', '深呼吸。登录系统。'], mood: 'tense' },
    2: { lines: ['登录成功。控制台在你面前展开。', '23条工单被批量关闭——但关闭原因全是"已解决"。', '你的直觉告诉你，这不对。'], mood: 'suspicious' },
    3: { lines: ['从23条工单中，你锁定了那一条。', '附件被清理，对话记录被截断。', '有人不想让你看到这些。'], mood: 'dark' },
    4: { lines: ['许知微。28岁。独居。', '她的门锁在凌晨自动解锁了三次。', '她不知道发生了什么。但你需要她告诉你她知道的。'], mood: 'empathy' },
    5: { lines: ['HZ-7 自动化规则的日志很长。', '但有两个时间戳之间，隔了整整11分钟的空白。', '日志不会自己消失。'], mood: 'suspicious' },
    6: { lines: ['知识库的版本历史还在。', '有人在事故前48小时悄悄改了内容。', '改了什么？为什么要改？'], mood: 'dark' },
    7: { lines: ['你进入了邮件服务器的回收站。', '成片的删除记录。有人在凌晨3点清理了整个发件箱。', '但回收站有30天保留期。他们忘了这一点。'], mood: 'discovery' },
    8: { lines: ['AX13 门锁。3200台出货量。', '安全漏洞报告被标记为"低优先级"——三周前。', '谁做的这个决定？采购链上一定有答案。'], mood: 'tense' },
    9: { lines: ['数据库不会撒谎。但有人试过。', '操作日志里有一段被覆盖的记录。', '你需要找到原始数据——在它被彻底清除之前。'], mood: 'urgent' },
    10: { lines: ['散落的碎片开始拼合。', '你需要一个恢复令牌才能进入下一层。', '线索就在你已经收集的证据里。'], mood: 'tense' },
    11: { lines: ['加密通讯频道。有人以为这里很安全。', '但每一种加密，都有对应的解法。', '幕后的声音就藏在这些密文里。'], mood: 'dark' },
    12: { lines: ['你恢复了一组被删除的聊天记录。', '时间戳被人为损坏了——但对话内容暴露了一切。', '深夜，有人在密谋。'], mood: 'dark' },
    13: { lines: ['svc-admin-0312。一个服务账号。', '有人用它修改了知识库，删除了审计日志，伪造了记录。', '但账号背后的那个人，还没有露面。'], mood: 'tense' },
    14: { lines: ['门禁记录。监控回放。不在场证词。', '有人说"我一直在家"。', '让我们看看摄像头怎么说。'], mood: 'confrontation' },
    15: { lines: ['服务器终端的访问权限已获取。', '命令行界面闪烁着光标。', '在这里，你可以直接查看被隐藏的一切。'], mood: 'hacker' },
    16: { lines: ['你掌握了全部真相。', '公开揭露，还是内部斡旋，还是——假装什么都没发生？', '每一条路都有代价。选择的时间到了。'], mood: 'moral' },
    17: { lines: ['自动清理队列还在运行。', '你只有三分钟。', '暂停队列。发送证据。现在。'], mood: 'critical' }
  };

  const pageGuides = {
    0: { icon: '🌙', title: '深夜来电', text: '你是 Helpline Zero 的合规审计员。凌晨2点47分，手机突然响起——一个P1级事故需要你立即介入。<br><br>仔细阅读来电内容，准备进入系统。' },
    1: { icon: '🔐', title: '登录系统', text: '输入你的姓名并找到临时验证码才能登录系统。<br><br><strong>提示：</strong>仔细阅读右侧的邮件和顶部公告，将线索拼合成验证码。' },
    2: { icon: '🔍', title: '定位可疑工单', text: '23条工单被异常关闭，但不是所有的都可疑。<br><br><strong>提示：</strong>使用标签筛选器，尝试不同的标签组合。系统告警中的关键词可能帮助你缩小范围。' },
    3: { icon: '📋', title: '寻找证据', text: '这条工单被异常关闭，附件也被清理了。但缓存中可能还有残留。<br><br><strong>提示：</strong>订单号已被脱敏，你需要从对话记录中的线索推理还原。' },
    4: { icon: '👩', title: '受害者画像', text: '你联系到了受害者许知微。选择合适的问题获取关键信息。<br><br><strong>提示：</strong>注意信任度变化——问错问题会降低她的配合度。标记为"关键"的问题会获取重要情报。' },
    5: { icon: '⏱️', title: '发现时间线异常', text: 'HZ-7 的执行日志记录了所有操作。但有些操作之间的时间间隔不正常。<br><br><strong>提示：</strong>选中两条日志进行时间差分析。重点关注"停止"指令和"继续执行"之间的关系。' },
    6: { icon: '📑', title: '追溯知识库篡改', text: '知识库条目在事故前被人修改了。新版本中可能藏有隐藏内容。<br><br><strong>提示：</strong>仔细对比新旧版本的差异，注意那些看似正常但语义完全改变的段落。' },
    7: { icon: '📧', title: '邮件考古', text: '有人在事故发生后紧急删除了大量内部邮件。但邮件服务器的回收站还保留着碎片。<br><br><strong>提示：</strong>从碎片中还原邮件链的时间线，找出关键对话的完整上下文。' },
    8: { icon: '🔗', title: '供应链追踪', text: 'AX13 门锁的安全漏洞被压了3周。但供应链上一定有人知道这件事。<br><br><strong>提示：</strong>追踪采购订单、质检报告和供应商通讯，建立证据链。注意日期和批次号的对应关系。' },
    9: { icon: '🗄️', title: '数据库取证', text: '系统数据库的操作日志记录了每一次数据修改。但有人试图掩盖痕迹。<br><br><strong>提示：</strong>通过查询语句追踪异常的数据变更——关注"谁"在"什么时候"修改了"什么数据"。' },
    10: { icon: '🔑', title: '组装恢复令牌', text: '审批邮件已被撤回，但残留的信息加上你之前收集的线索足以拼出令牌。<br><br><strong>提示：</strong>查看你的线索面板（右侧 🔍 按钮），将所有碎片按格式组合。' },
    11: { icon: '💬', title: '解密内部通讯', text: '系统内部的通讯记录被加密了。每种加密方式都有内置解码工具帮助你。<br><br>找出谁在幕后策划了这一切。' },
    12: { icon: '🕵️', title: '深夜密谋', text: '通讯解密系统恢复了一组被删除的内部聊天记录。时间戳已被损坏。<br><br><strong>提示：</strong>通过对话内容中的逻辑关系（谁在回应谁、指令和执行的先后）还原正确的对话顺序。' },
    13: { icon: '👤', title: '调查可疑人员', text: '你已经锁定了服务账号 svc-admin-0312。但谁在操控它？<br><br>调查员工档案和访问记录，找出真正的幕后操纵者。' },
    14: { icon: '📹', title: '监控回放', text: '办公区的门禁系统和监控记录了关键时间段内的人员活动。<br><br><strong>提示：</strong>将监控片段按时间线排列，交叉验证嫌疑人的不在场证词——谁在说谎？' },
    15: { icon: '💻', title: '服务器终端', text: '你获得了服务器的临时访问权限。通过命令行直接查找被隐藏的证据。<br><br>输入命令来探索系统深层的秘密。' },
    16: { icon: '⚖️', title: '道德抉择', text: '你已经掌握了全部真相。但如何处置这些证据，将决定事件的最终走向。<br><br>每一个选择都有代价——选择你认为正确的道路。' },
    17: { icon: '⏳', title: '最后三分钟', text: '自动执行队列还在运行！你必须在倒计时结束前完成两件事：<br><br>① 暂停执行队列 &nbsp; ② 将证据发送至安全通道<br><br>时间不等人，立即行动！' }
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
    const currentPage = getCurrentPage();
    const nextPage = Object.keys(pages).find(k => pageChapters[k] && pageChapters[k].num === chapterNum && pageChapters[k].title === title);
    const narr = narrativeTransitions[nextPage];

    const overlay = document.createElement('div');
    overlay.className = 'scene-transition';

    if (narr && narr.lines.length > 0) {
      // 叙事型转场
      const moodClass = 'mood-' + (narr.mood || 'tense');
      overlay.classList.add(moodClass);
      overlay.innerHTML = `
        <div class="narr-container">
          <div class="narr-lines" id="narr-lines"></div>
          <div class="narr-skip" id="narr-skip" onclick="document.querySelector('.scene-transition').__skipCb && document.querySelector('.scene-transition').__skipCb()">按任意键继续 ▸</div>
        </div>
        <div class="narr-chapter-tag">${chapterNum}</div>
      `;
      document.body.appendChild(overlay);

      const linesEl = document.getElementById('narr-lines');
      const skipEl = document.getElementById('narr-skip');
      let lineIdx = 0;
      let charIdx = 0;
      let currentEl = null;
      let typing = true;
      let done = false;

      function typeNext() {
        if (done) return;
        if (lineIdx >= narr.lines.length) {
          // 所有行打完，显示跳过按钮
          typing = false;
          skipEl.style.opacity = '1';
          return;
        }
        if (charIdx === 0) {
          currentEl = document.createElement('div');
          currentEl.className = 'narr-line';
          if (lineIdx > 0) currentEl.style.animationDelay = '0s';
          linesEl.appendChild(currentEl);
        }
        const line = narr.lines[lineIdx];
        if (charIdx < line.length) {
          currentEl.textContent += line[charIdx];
          charIdx++;
          setTimeout(typeNext, 35 + Math.random() * 25);
        } else {
          lineIdx++;
          charIdx = 0;
          setTimeout(typeNext, 400);
        }
      }

      function skipAll() {
        if (done) return;
        done = true;
        if (typing) {
          // 快速显示所有文字
          linesEl.innerHTML = '';
          narr.lines.forEach(l => {
            const el = document.createElement('div');
            el.className = 'narr-line';
            el.textContent = l;
            el.style.opacity = '1';
            linesEl.appendChild(el);
          });
        }
        overlay.classList.add('narr-fadeout');
        setTimeout(callback, 600);
      }

      overlay.__skipCb = skipAll;

      // 键盘/点击跳过
      function onKeyOrClick(e) {
        if (e.type === 'click' && e.target.closest('.narr-skip')) return; // 让按钮自己处理
        if (!typing) {
          document.removeEventListener('keydown', onKeyOrClick);
          document.removeEventListener('click', onKeyOrClick);
          skipAll();
        }
      }
      setTimeout(() => {
        document.addEventListener('keydown', onKeyOrClick);
        document.addEventListener('click', onKeyOrClick);
      }, 300);

      // 自动推进：打完所有字后 2.5 秒自动跳过
      const autoTimer = setTimeout(() => {
        if (!done) skipAll();
      }, narr.lines.join('').length * 50 + narr.lines.length * 500 + 2500);
      overlay.__autoTimer = autoTimer;

      typeNext();
    } else {
      // 无叙事数据的章节，使用简洁过渡
      overlay.innerHTML = `
        <div class="scene-transition-text">${chapterNum}</div>
        <div class="scene-transition-sub">${title}</div>
      `;
      document.body.appendChild(overlay);
      setTimeout(callback, 1200);
    }
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
    for (let i = 0; i <= 17; i++) {
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
    const totalPages = 18;
    const progressPct = Math.min(Math.round((currentPage / totalPages) * 100), 100);

    // 动态威胁等级
    const threatLevels = [
      { min: 0, max: 4, level: '低', color: 'var(--accent-blue)', label: '常规排查', dot: 'status-blue' },
      { min: 5, max: 8, level: '中', color: 'var(--accent-orange)', label: '发现可疑活动', dot: 'status-orange' },
      { min: 9, max: 12, level: '高', color: 'var(--accent-red)', label: '有人在销毁证据', dot: 'status-red' },
      { min: 13, max: 15, level: '危急', color: 'var(--accent-red)', label: '证据清理队列已激活', dot: 'status-red' },
      { min: 16, max: 20, level: '紧急', color: 'var(--accent-red)', label: '立即行动 — 时间不多了', dot: 'status-red' },
    ];
    const threat = threatLevels.find(t => currentPage >= t.min && currentPage <= t.max) || threatLevels[0];

    bottomBar.innerHTML = `
      <div class="bottom-bar-inner">
        <span class="bottom-bar-status">
          <span class="status-dot ${threat.dot}"></span>
          威胁等级: <strong style="color:${threat.color}">${threat.level}</strong> — ${threat.label}
        </span>
        <span class="bottom-bar-clues" style="cursor:pointer;" onclick="Navigation.toggleCluePanel()">🔍 线索: ${clueCount}</span>
        <span class="bottom-bar-progress">
          <span class="progress-bar-mini"><span class="progress-bar-fill" style="width:${progressPct}%"></span></span>
          ${progressPct}%
        </span>
      </div>
    `;

    // 后半段增加屏幕边缘红光
    if (currentPage >= 13) {
      document.body.classList.add('threat-high');
    }
    if (currentPage >= 16) {
      document.body.classList.add('threat-critical');
    }
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

    // 内嵌式提示条，不打断玩家
    const toast = document.createElement('div');
    toast.className = 'guide-toast';
    toast.innerHTML = `
      <div class="guide-toast-icon">${guide.icon}</div>
      <div class="guide-toast-body">
        <div class="guide-toast-title">${guide.title}</div>
        <div class="guide-toast-text">${guide.text}</div>
      </div>
      <button class="guide-toast-close" onclick="this.closest('.guide-toast').classList.add('guide-toast-hide');setTimeout(()=>this.closest('.guide-toast').remove(),400)">✕</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('guide-toast-show'), 50);
    // 8秒后自动消失
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('guide-toast-hide');
        setTimeout(() => toast.remove(), 400);
      }
    }, 8000);

    shownGuides.push(currentPage);
    NightAudit.set('shownGuides', shownGuides);
  }

  function init() {
    NightAudit.load();
    initTopBar();
    initBottomBar();
    initCluePanel();
    setTimeout(() => showGuide(), 500);
    setTimeout(() => triggerContextMessages(), 2000);
  }

  // 即时消息系统 — 角色在关键时刻发送消息
  const contextMessages = {
    2: [
      { from: '赵锐 · 值班主管', avatar: '👨‍💼', text: '我看到你登录了。23条工单是系统自动处理的，别太纠结……', delay: 15000, mood: 'warning' },
    ],
    3: [
      { from: '系统告警', avatar: '⚠️', text: '检测到附件存储异常清理操作。部分文件可能已从缓存中恢复。', delay: 5000, mood: 'system' },
    ],
    5: [
      { from: '匿名', avatar: '👤', text: '你看到那段空白了吗？11分钟。想想在那11分钟里发生了什么。', delay: 20000, mood: 'mystery' },
    ],
    7: [
      { from: '系统告警', avatar: '🔴', text: '邮件回收站清理任务已排入队列。预计 4 小时后执行。', delay: 8000, mood: 'urgent' },
    ],
    9: [
      { from: '匿名', avatar: '👤', text: '你查数据库了？小心点。有人会注意到的。', delay: 12000, mood: 'mystery' },
    ],
    13: [
      { from: '系统', avatar: '🔒', text: '异常活动检测：有人正在尝试修改 svc-admin-0312 的访问日志。', delay: 10000, mood: 'urgent' },
    ],
    14: [
      { from: '赵锐 · 值班主管', avatar: '👨‍💼', text: '你在看监控？我劝你别看了。有些事情，不知道比知道好。', delay: 8000, mood: 'warning' },
    ],
    15: [
      { from: '系统告警', avatar: '🔴', text: '证据清理队列激活。预计 3 分钟内完成全部数据销毁。', delay: 5000, mood: 'critical' },
    ]
  };

  function triggerContextMessages() {
    const currentPage = getCurrentPage();
    const msgs = contextMessages[currentPage];
    if (!msgs) return;

    const shownMsgs = NightAudit.get('shownCtxMsgs') || [];

    msgs.forEach(msg => {
      const msgKey = `${currentPage}-${msg.from}`;
      if (shownMsgs.includes(msgKey)) return;

      setTimeout(() => {
        showContextMessage(msg);
        shownMsgs.push(msgKey);
        NightAudit.set('shownCtxMsgs', shownMsgs);
      }, msg.delay);
    });
  }

  function showContextMessage(msg) {
    if (typeof AudioEngine !== 'undefined') AudioEngine.playMsgAlert && AudioEngine.playMsgAlert();
    const el = document.createElement('div');
    el.className = `ctx-msg ctx-msg-${msg.mood || 'info'}`;
    el.innerHTML = `
      <div class="ctx-msg-avatar">${msg.avatar}</div>
      <div class="ctx-msg-body">
        <div class="ctx-msg-from">${msg.from}</div>
        <div class="ctx-msg-text">${msg.text}</div>
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('ctx-msg-show'), 50);
    // 点击关闭
    el.onclick = () => {
      el.classList.add('ctx-msg-hide');
      setTimeout(() => el.remove(), 400);
    };
    // 10秒后自动消失
    setTimeout(() => {
      if (el.parentNode) {
        el.classList.add('ctx-msg-hide');
        setTimeout(() => el.remove(), 400);
      }
    }, 10000);
  }

  return { goTo, getCurrentPage, init, pageNames, toggleCluePanel, getGameTime, toggleChapterMenu, toggleAudio };
})();

document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});
