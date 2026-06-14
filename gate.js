/* ===== 비밀번호 잠금 (클라이언트 측, 캐주얼 차단용) =====
   비밀번호를 바꾸려면: 새 비밀번호의 SHA-256 해시를 구해 아래 PASS_HASH 값만 교체하세요.
   해시 구하는 법(브라우저 콘솔):
     crypto.subtle.digest('SHA-256', new TextEncoder().encode('새비밀번호'))
       .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
*/
(function () {
  var PASS_HASH = "bbc18deafe1b8fc3444eaf6c039362a959f6d31ae353c06d8b0b37e56713469e";
  var KEY = "dg-gate-ok";

  // 이미 인증된 경우 통과
  if (localStorage.getItem(KEY) === PASS_HASH) return;

  function sha256(s) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)).then(function (b) {
      return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, "0"); }).join("");
    });
  }

  var style = document.createElement("style");
  style.textContent =
    "#dg-gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;" +
    "background:var(--bg,#0e1220);font-family:Pretendard,-apple-system,sans-serif;padding:24px;}" +
    "#dg-gate .gcard{width:100%;max-width:360px;background:var(--card,#141a30);border:1px solid var(--border,#212a49);" +
    "border-radius:18px;padding:34px 28px;text-align:center;box-shadow:0 18px 50px -20px rgba(0,0,0,.7);}" +
    "#dg-gate .glogo{width:54px;height:54px;margin:0 auto 18px;border-radius:14px;background:var(--accent-soft,rgba(108,140,255,.15));" +
    "display:flex;align-items:center;justify-content:center;}" +
    "#dg-gate .glogo img{width:34px;height:34px;object-fit:contain;}" +
    "#dg-gate h1{margin:0 0 4px;font-size:18px;font-weight:800;color:var(--text,#e9ecf6);letter-spacing:-.2px;}" +
    "#dg-gate p.sub{margin:0 0 22px;font-size:12.5px;color:var(--text-3,#7b85a8);}" +
    "#dg-gate input{width:100%;height:46px;border-radius:11px;border:1px solid var(--border-strong,#2e3a64);" +
    "background:var(--inset,#0b0f1c);color:var(--text,#e9ecf6);font-size:15px;text-align:center;letter-spacing:2px;outline:none;}" +
    "#dg-gate input:focus{border-color:var(--accent,#6c8cff);}" +
    "#dg-gate button{width:100%;height:46px;margin-top:12px;border-radius:11px;background:var(--accent,#6c8cff);" +
    "color:#fff;font-size:15px;font-weight:700;}" +
    "#dg-gate button:active{transform:translateY(1px);}" +
    "#dg-gate .err{min-height:18px;margin-top:12px;font-size:12.5px;color:#e88;}";
  document.head.appendChild(style);

  function build() {
    var ov = document.createElement("div");
    ov.id = "dg-gate";
    ov.innerHTML =
      '<div class="gcard">' +
        '<div class="glogo"><img src="assets/logo-white.png" alt=""/></div>' +
        "<h1>2학년 담임샘 가이드</h1>" +
        '<p class="sub">목포덕인고 2학년부 · 담임 전용</p>' +
        '<input id="dg-pass" type="password" inputmode="numeric" placeholder="비밀번호" autocomplete="off"/>' +
        "<button id=\"dg-go\">입장하기</button>" +
        '<div class="err" id="dg-err"></div>' +
      "</div>";
    document.body.appendChild(ov);

    var input = ov.querySelector("#dg-pass");
    var btn = ov.querySelector("#dg-go");
    var err = ov.querySelector("#dg-err");
    input.focus();

    function tryUnlock() {
      sha256(input.value).then(function (h) {
        if (h === PASS_HASH) {
          localStorage.setItem(KEY, PASS_HASH);
          ov.remove();
        } else {
          err.textContent = "비밀번호가 올바르지 않습니다.";
          input.value = "";
          input.focus();
        }
      });
    }
    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") tryUnlock(); });
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
