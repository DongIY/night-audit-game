/**
 * 《夜班审计》状态管理模块 v4.0
 * 支持18章节、跨章线索联动、道德抉择系统、多结局
 */
const NightAudit = (() => {
  const STORAGE_KEY = 'night-audit-save';

  const defaultState = {
    currentPage: 0,
    // 章节完成状态
    prologueDone: false,
    loginComplete: false,
    filterApplied: false,
    victimFound: false,
    victimProfileDone: false,  // 受害者画像完成
    cacheRecovered: false,
    logTampered: false,
    kbCompared: false,
    // 新增章节状态
    emailRecovered: false,    // 邮件考古完成
    supplyChainDone: false,   // 供应链调查完成
    dbForensicDone: false,    // 数据库取证完成
    conspiracyDone: false,    // 深夜密谋完成
    timelineBuilt: false,     // 监控回放完成
    tokenAssembled: false,
    snapshotRestored: false,
    commsDecrypted: false,
    suspectIdentified: false,
    terminalAccessed: false,
    choiceMade: false,
    evidenceSent: 0,
    queuePaused: false,
    ending: null,
    // 道德抉择
    moralChoice: null,
    // 线索
    clues: {},
    // 解密进度
    puzzlesSolved: 0,
    // 引导已看
    shownGuides: [],
    // 访问记录
    visitedPages: [0],
    startTime: null,
    // 时钟
    clockBase: null,
    clockStarted: null,
    // 终端命令历史
    terminalHistory: [],
    // 通讯解锁
    unlockedMessages: [],
    // 发现的人物
    discoveredPersons: [],
    // 邮件考古进度
    emailFragments: [],
    // 供应链调查进度
    supplyChainFindings: [],
    // 数据库取证进度
    dbQueries: [],
    // 监控回放进度
    timelineEvents: []
  };

  let state = null;

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = { ...defaultState, ...JSON.parse(saved) };
      } else {
        state = { ...defaultState, startTime: Date.now() };
      }
    } catch {
      state = { ...defaultState, startTime: Date.now() };
    }
    return state;
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      showSaveIndicator();
    } catch (e) {
      console.warn('存档失败:', e);
    }
  }

  function showSaveIndicator() {
    let indicator = document.getElementById('save-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'save-indicator';
      indicator.innerHTML = '💾 已保存';
      indicator.style.cssText = `
        position:fixed; bottom:44px; left:12px; z-index:2000;
        font-size:11px; color:var(--accent-green,#27ae60);
        background:rgba(17,24,32,0.9); border:1px solid rgba(39,174,96,0.3);
        padding:4px 10px; border-radius:4px;
        opacity:0; transition:opacity 0.3s ease;
        pointer-events:none; font-family:inherit;
      `;
      document.body.appendChild(indicator);
    }
    indicator.style.opacity = '1';
    clearTimeout(indicator._hideTimer);
    indicator._hideTimer = setTimeout(() => {
      indicator.style.opacity = '0';
    }, 1500);
  }

  function get(key) {
    if (!state) load();
    return state[key];
  }

  function set(key, value) {
    if (!state) load();
    state[key] = value;
    save();
    return state;
  }

  function addClue(id, data) {
    if (!state) load();
    state.clues[id] = { ...data, foundAt: Date.now() };
    state.puzzlesSolved = Object.keys(state.clues).length;
    save();
    document.dispatchEvent(new CustomEvent('clue-found', {
      detail: { id, ...data }
    }));
  }

  function hasClue(id) {
    if (!state) load();
    return !!state.clues[id];
  }

  function getClue(id) {
    if (!state) load();
    return state.clues[id] || null;
  }

  function getAllClues() {
    if (!state) load();
    return { ...state.clues };
  }

  function visitPage(pageNum) {
    if (!state) load();
    if (!state.visitedPages.includes(pageNum)) {
      state.visitedPages.push(pageNum);
    }
    state.currentPage = pageNum;
    save();
  }

  function canAccessPage(pageNum) {
    if (!state) load();
    const rules = {
      0: true,                        // 序章
      1: state.prologueDone,          // 登录
      2: state.loginComplete,         // 事故总览
      3: state.filterApplied,         // 工单详情
      4: state.victimFound,           // 受害者画像 (新)
      5: state.victimProfileDone || state.cacheRecovered, // 审计日志 (可跳过画像)
      6: state.logTampered,           // 知识库对比
      7: state.kbCompared,            // 邮件考古
      8: state.emailRecovered,        // 供应链调查
      9: state.supplyChainDone,       // 数据库取证
      10: state.dbForensicDone,       // 权限恢复
      11: state.snapshotRestored,     // 通讯解密
      12: state.commsDecrypted,       // 深夜密谋 (新)
      13: state.conspiracyDone || state.suspectIdentified, // 人事档案
      14: state.suspectIdentified,    // 监控回放
      15: state.timelineBuilt,        // 终端
      16: state.terminalAccessed,     // 道德抉择
      17: state.choiceMade            // 终局
    };
    return rules[pageNum] !== undefined ? rules[pageNum] : true;
  }

  function reset() {
    state = { ...defaultState, startTime: Date.now() };
    save();
  }

  function getState() {
    if (!state) load();
    return { ...state };
  }

  function getPlayTime() {
    if (!state) load();
    if (!state.startTime) return 0;
    return Math.floor((Date.now() - state.startTime) / 60000);
  }

  function addTerminalCmd(cmd, result) {
    if (!state) load();
    state.terminalHistory.push({ cmd, result, time: Date.now() });
    save();
  }

  function addDiscoveredPerson(person) {
    if (!state) load();
    if (!state.discoveredPersons.includes(person)) {
      state.discoveredPersons.push(person);
      save();
    }
  }

  function unlockMessage(msgId) {
    if (!state) load();
    if (!state.unlockedMessages.includes(msgId)) {
      state.unlockedMessages.push(msgId);
      save();
    }
  }

  function addEmailFragment(fragId) {
    if (!state) load();
    if (!state.emailFragments.includes(fragId)) {
      state.emailFragments.push(fragId);
      save();
    }
  }

  function addSupplyChainFinding(findingId) {
    if (!state) load();
    if (!state.supplyChainFindings.includes(findingId)) {
      state.supplyChainFindings.push(findingId);
      save();
    }
  }

  function addDbQuery(queryId) {
    if (!state) load();
    if (!state.dbQueries.includes(queryId)) {
      state.dbQueries.push(queryId);
      save();
    }
  }

  function addTimelineEvent(eventId) {
    if (!state) load();
    if (!state.timelineEvents.includes(eventId)) {
      state.timelineEvents.push(eventId);
      save();
    }
  }

  return {
    load, save, get, set, addClue, hasClue, getClue, getAllClues,
    visitPage, canAccessPage, reset, getState, getPlayTime,
    addTerminalCmd, addDiscoveredPerson, unlockMessage,
    addEmailFragment, addSupplyChainFinding, addDbQuery, addTimelineEvent
  };
})();
