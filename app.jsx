// ===== 2학년 담임샘 가이드 — 앱 =====
const { useState, useEffect, useRef, useMemo } = React;
const SYSTEMS = window.SYSTEMS, GUIDES = window.GUIDES, svgIcon = window.svgIcon;

function hexA(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
function Icon({ name, size, stroke, className, style }) {
  return <span className={"ico " + (className || "")} style={style} dangerouslySetInnerHTML={{ __html: svgIcon(name, size, stroke) }} />;
}
function openUrl(url) { window.open(url, "_blank", "noopener"); }
const sysById = (id) => SYSTEMS.find((s) => s.id === id);

function todayStr() {
  const d = new Date();
  const wk = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}. ${wk}요일`;
}

/* ---------- 사이드바 ---------- */
function Sidebar({ view, go }) {
  const onHome = view === "home";
  return (
    <aside className="side">
      <div className="side-logo">
        <div className="mark" />
        <div className="txt">2학년 담임샘 가이드<small>목포덕인고 2학년부</small></div>
      </div>
      <button className={"nav" + (onHome ? " active" : "")} onClick={() => go("home")}>
        <Icon name="home" size={18} /> 홈
      </button>
      <button className="nav" onClick={() => go("home", "systems")}>
        <Icon name="grid" size={18} /> 업무 시스템 <span className="badge-n">{SYSTEMS.length}</span>
      </button>
      <div className="side-label">업무 가이드</div>
      {GUIDES.map((g) => (
        <button key={g.no} className={"nav-g" + (view && view.cat === g.no ? " active" : "")} onClick={() => go({ cat: g.no })}>
          <span className="num">{g.no}</span> {g.title}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button className="nav" onClick={() => go("home", "guides")}>
        <Icon name="book" size={18} /> 가이드 전체
      </button>
    </aside>
  );
}

/* ---------- 시스템 카드 ---------- */
function SysCard({ s }) {
  return (
    <button className="sys-card" onClick={() => openUrl(s.url)}>
      <div className="sys-icon" style={{ background: hexA(s.accent, 0.15), color: s.accent }}>
        <Icon name={s.icon} size={21} />
      </div>
      <Icon name="upright" size={17} className="up" />
      <div className="name">{s.name}</div>
      <div className="desc">
        {s.desc.split(" \u2014 ").map((p, i) => (
          <span key={i} className={"desc-line l" + (i === 0 ? "0" : "1")}>{p}</span>
        ))}
      </div>
    </button>
  );
}

/* ---------- 홈 ---------- */
function HomeView({ go, sysRef, guideRef }) {
  return (
    <div className="view">
      <div className="topbar">
        <div className="hello">
          <h1>안녕하세요, 선생님 👋</h1>
          <p>{todayStr()} · 자주 쓰는 시스템과 가이드를 한곳에</p>
        </div>
      </div>

      <div ref={sysRef} style={{ scrollMarginTop: 20 }}>
        <h2 className="sec-title"><Icon name="grid" size={15} /> 담임 업무 시스템 {SYSTEMS.length}종</h2>
        <div className="sys-grid">
          {SYSTEMS.map((s) => <SysCard key={s.id} s={s} />)}
        </div>
      </div>

      <div ref={guideRef} style={{ marginTop: 38, scrollMarginTop: 20 }}>
        <h2 className="sec-title"><Icon name="book" size={15} /> 업무 가이드 {GUIDES.length}편</h2>
        <div className="guide-list">
          {GUIDES.map((g) => (
            <button key={g.no} className="guide-row" onClick={() => go({ cat: g.no })}>
              <span className="no" style={{ color: g.accent }}>{g.no}</span>
              <div style={{ flex: 1 }}>
                <div className="gtitle">{g.title}</div>
                <div className="glede">{g.lede}</div>
              </div>
              <span className="gcount">{g.items.length}개 항목</span>
              <Icon name="chevron" size={18} className="chev" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 상세 본문(구조화 읽기) ---------- */
function Block({ b }) {
  switch (b.t) {
    case "key":
      return <div className="key"><span className="kl">핵심 메시지</span><div className="kt">{b.x}</div></div>;
    case "p":
      return <p className="para">{b.x}</p>;
    case "sub":
      return (
        <div className="sub">
          <div className="sh">{b.h}</div>
          {b.body.map((t, i) => <p className="para" key={i}>{t}</p>)}
        </div>
      );
    case "deflist":
      return (
        <div className="deflist">
          <div className="sh">{b.h}</div>
          {b.rows.map(([k, v], i) => (
            <div className="drow" key={i}><div className="dk">{k}</div><div className="dv">{v}</div></div>
          ))}
        </div>
      );
    case "data":
      return (
        <div className="data">
          <div className="sh">{b.h}</div>
          <div className="chips">{b.chips.map((c, i) => <span className="chip" key={i}>{c}</span>)}</div>
        </div>
      );
    case "note":
      return <div className="callout note"><Icon name="info" size={19} className="ci" /><div className="ct">{b.x}</div></div>;
    case "warn":
      return <div className="callout warn"><Icon name="alert" size={19} className="ci" /><div className="ct">{b.x}</div></div>;
    default:
      return null;
  }
}

function DetailBody({ item }) {
  return (
    <div className="rc">
      {item.blocks.map((b, i) => <Block b={b} key={i} />)}
      {item.related && item.related.length > 0 && (
        <div className="related">
          <div className="rl-label">관련 시스템 바로가기</div>
          <div className="rl-wrap">
            {item.related.map((rid) => {
              const s = sysById(rid); if (!s) return null;
              return (
                <button key={rid} className="rl" onClick={() => openUrl(s.url)}>
                  <span className="ri" style={{ background: hexA(s.accent, 0.15), color: s.accent }}><Icon name={s.icon} size={16} /></span>
                  {s.name} <Icon name="upright" size={14} style={{ color: "var(--text-3)" }} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 카테고리(아코디언) ---------- */
function CategoryView({ no, go, openId, setOpenId }) {
  const g = GUIDES.find((x) => x.no === no);
  return (
    <div className="view">
      <div className="crumb">
        <button onClick={() => go("home")}>홈</button>
        <span className="sep">›</span>
        <button onClick={() => go("home", "guides")}>업무 가이드</button>
        <span className="sep">›</span>
        <span className="here">{g.no} {g.title}</span>
      </div>

      <div className="cat-hero" style={{ background: `linear-gradient(100deg, ${hexA(g.accent, 0.18)}, ${hexA(g.accent, 0.05)})` }}>
        <span className="tag" style={{ background: g.accent }}>{g.tag}</span>
        <h2>{g.title}</h2>
        <p>{g.lede}</p>
        <span className="ghost" style={{ color: g.accent }}>{g.no}</span>
      </div>

      <div className="acc">
        {g.items.map((it, i) => {
          const open = openId === it.id;
          return (
            <div className={"acc-item" + (open ? " open" : "")} key={it.id}>
              <button className="acc-head" onClick={() => setOpenId(open ? null : it.id)}>
                <span className="idx">{i + 1}</span>
                <span className="at">
                  <div className="t">{it.title}</div>
                  <div className="s">{it.sub}</div>
                </span>
                <Icon name="chevron" size={18} className="chev" />
              </button>
              <div className="acc-body">
                <div className="acc-inner">{open && <DetailBody item={it} />}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 하단 고정 바 ---------- */
function Dock() {
  return (
    <div className="dock-wrap">
      <div className="dock">
        {SYSTEMS.map((s) => (
          <button key={s.id} className="dock-item" onClick={() => openUrl(s.url)}>
            <span className="dock-tip">{s.name}</span>
            <span className="di" style={{ background: hexA(s.accent, 0.15), color: s.accent }}><Icon name={s.icon} size={19} /></span>
            <span className="dn">{s.name.replace("덕인生 ", "")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- 검색 오버레이 ---------- */
function SearchOverlay({ onClose, go, openItem }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  const ql = q.trim().toLowerCase();
  const sys = ql ? SYSTEMS.filter((s) => (s.name + s.desc + s.cat).toLowerCase().includes(ql)) : SYSTEMS;
  const items = [];
  GUIDES.forEach((g) => g.items.forEach((it) => {
    if (!ql || (it.title + it.sub + g.title).toLowerCase().includes(ql)) items.push({ ...it, gno: g.no, gtitle: g.title, accent: g.accent });
  }));
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, []);
  return (
    <div className="search-ov" onMouseDown={onClose}>
      <div className="search-panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="search-top">
          <Icon name="search" size={20} style={{ color: "var(--text-3)" }} />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="시스템·가이드 통합 검색…" />
          <span style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600 }}>ESC</span>
        </div>
        <div className="search-results">
          {sys.length > 0 && <div className="sr-label">업무 시스템</div>}
          {sys.map((s) => (
            <button key={s.id} className="sr-item" onClick={() => { openUrl(s.url); onClose(); }}>
              <span className="si" style={{ background: hexA(s.accent, 0.15), color: s.accent }}><Icon name={s.icon} size={17} /></span>
              <span style={{ flex: 1 }}><div className="st">{s.name}</div><div className="ss">{s.desc}</div></span>
              <Icon name="upright" size={15} style={{ color: "var(--text-3)" }} />
            </button>
          ))}
          {items.length > 0 && <div className="sr-label">가이드 항목</div>}
          {items.map((it) => (
            <button key={it.id} className="sr-item" onClick={() => { openItem(it.gno, it.id); onClose(); }}>
              <span className="si" style={{ background: hexA(it.accent, 0.15), color: it.accent }}><Icon name="book" size={16} /></span>
              <span style={{ flex: 1 }}><div className="st">{it.title}</div><div className="ss">{it.gno} {it.gtitle} · {it.sub}</div></span>
              <Icon name="chevron" size={15} style={{ color: "var(--text-3)" }} />
            </button>
          ))}
          {sys.length === 0 && items.length === 0 && <div className="sr-empty">검색 결과가 없습니다</div>}
        </div>
      </div>
    </div>
  );
}

/* ---------- 앱 루트 ---------- */
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("dg-theme") || "dark");
  const [view, setView] = useState("home");        // 'home' | { cat: no }
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState(false);
  const scrollRef = useRef(null), sysRef = useRef(null), guideRef = useRef(null);

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("dg-theme", theme); }, [theme]);

  function go(v, anchor) {
    setView(v);
    if (v === "home") setOpenId(null);
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
      if (anchor && v === "home") {
        const el = anchor === "systems" ? sysRef.current : guideRef.current;
        if (el) requestAnimationFrame(() => scrollRef.current.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" }));
      }
    });
  }
  function openItem(catNo, itemId) {
    setView({ cat: catNo });
    setOpenId(itemId);
    requestAnimationFrame(() => scrollRef.current && scrollRef.current.scrollTo({ top: 0 }));
  }

  useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearch(true); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, []);

  const curG = view !== "home" ? GUIDES.find((x) => x.no === view.cat) : null;
  const appbarLabel = view === "home" ? "담임 업무 허브" : (curG ? `${curG.no} · ${curG.title}` : "업무 가이드");

  return (
    <div className="app">
      <Sidebar view={view} go={go} />
      <div className="main">
        <header className="appbar">
          <div className="appbar-label">
            <span className="dot" /> {appbarLabel}
          </div>
          <div className="topbar-right">
            <button className="searchbox" onClick={() => setSearch(true)} style={{ cursor: "pointer" }}>
              <Icon name="search" size={17} />
              <span style={{ color: "var(--text-3)", fontSize: 13.5, flex: 1, textAlign: "left" }}>시스템·가이드 검색</span>
              <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 700, border: "1px solid var(--border)", borderRadius: 6, padding: "2px 6px" }}>⌘K</span>
            </button>
            <button className="toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Icon name={theme === "dark" ? "sun" : "moon"} size={16} /> {theme === "dark" ? "라이트" : "다크"}
            </button>
          </div>
        </header>
        <div className="scroll" ref={scrollRef}>
          {view === "home"
            ? <HomeView go={go} sysRef={sysRef} guideRef={guideRef} />
            : <CategoryView no={view.cat} go={go} openId={openId} setOpenId={setOpenId} />}
        </div>
        <Dock />
      </div>
      {search && <SearchOverlay onClose={() => setSearch(false)} go={go} openItem={openItem} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
