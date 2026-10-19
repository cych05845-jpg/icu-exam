/* 考試清單：新增一次考試 = 這裡加一行 + exams/ 放一個題目檔 + Code.gs 的 EXAMS 加一段 */
window.EXAM_LIST = [
  { id: '2026-final', title: '2026 ICU 訓練期末考試' },
  // { id: '2027-1', title: '2027 第一次考試' },
];
// 考生打開首頁時預設進入的考試（也可用網址指定：index.html?exam=2027-1）
window.ACTIVE_EXAM = '2026-final';
