// ============================================================
// 事件清单：想加/改/删倒计时事件，只需要改这个数组，别的都不用动
// 格式：{ name: "事件名", date: "YYYY-MM-DD", featured: true }
// featured: true 表示它是最上面那张渐变大卡（最多留一个）
// ============================================================
const EVENTS = [
  { name: "阶段 2 开始 · 每周旗舰项目", date: "2026-12-01" },
  { name: "实习投递启动", date: "2026-12-15" },
  { name: "简历定稿", date: "2027-01-17" },
  { name: "补基础收官 · 面试知识全过", date: "2027-02-15" },
  { name: "🔥 春招开始", date: "2027-02-16", featured: true },
  { name: "春招主战场结束", date: "2027-04-30" },
  { name: "🎓 毕业（2027.7）", date: "2027-06-30" },
];

// 100 项目挑战进度（和主页 script.js 里的数字保持一致即可）
const CHALLENGE_DONE = 2;
const CHALLENGE_GOAL = 100;

// 计算今天到目标日期还剩几天
function daysLeft(dateStr) {
  const target = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 抹掉时分秒：按"自然日"算，不然下午打开会少一天
  return Math.round((target - today) / 86400000);
}

// 天数 → 紧急度（对应 CSS 里的四个颜色类）
function urgency(days) {
  if (days < 0) return "done";    // 已经过去
  if (days <= 30) return "urgent"; // ≤30 天：红
  if (days <= 60) return "soon";   // ≤60 天：橙
  return "far";                    // 更远：蓝
}

// 日期显示成"2027年2月16日 周二"这种人类友好的格式
function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const week = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 · 周${week}`;
}

// 把所有卡片画到页面上
function render() {
  // 头部的今天日期
  document.getElementById("today").textContent = formatDate(
    new Date().toISOString().slice(0, 10)
  );

  // 挑出大卡（featured）和普通卡，普通卡按日期排序
  const featured = EVENTS.find((e) => e.featured);
  const others = EVENTS.filter((e) => !e.featured).sort((a, b) => a.date < b.date ? -1 : 1);

  // 填大卡
  const fDays = daysLeft(featured.date);
  document.getElementById("featured-name").textContent = featured.name;
  document.getElementById("featured-days").textContent = fDays;
  document.getElementById("featured-date").textContent = formatDate(featured.date);

  // 填卡片墙
  document.getElementById("grid").innerHTML = others
    .map((e) => {
      const d = daysLeft(e.date);
      const num =
        d < 0 ? "已达成 ✅" : d === 0 ? "就是今天" : d;
      const unit = d > 0 ? "<small>天</small>" : "";
      return `
        <div class="card">
          <p class="name">${e.name}</p>
          <p class="date">${formatDate(e.date)}</p>
          <p class="days ${urgency(d)}">${num}${unit}</p>
        </div>`;
    })
    .join("");

  // 填进度条
  document.getElementById("progress-bar").style.width =
    (CHALLENGE_DONE / CHALLENGE_GOAL) * 100 + "%";
  document.getElementById("progress-num").textContent = CHALLENGE_DONE;
}

render();
setInterval(render, 60000); // 每分钟刷新一次：页面一直开着，跨天数字也会自动变
