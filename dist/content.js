var c = (e, n, t) => new Promise((r, o) => {
  var i = (a) => {
    try {
      l(t.next(a));
    } catch (p) {
      o(p);
    }
  }, s = (a) => {
    try {
      l(t.throw(a));
    } catch (p) {
      o(p);
    }
  }, l = (a) => a.done ? r(a.value) : Promise.resolve(a.value).then(i, s);
  l((t = t.apply(e, n)).next());
});
function y(e, n) {
  return c(this, null, function* () {
    const t = yield fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: e
          }
        ],
        temperature: 0.7
      })
    });
    if (!t.ok)
      throw new Error("Failed to generate text");
    return (yield t.json()).choices[0].message.content;
  });
}
function f() {
  return c(this, null, function* () {
    return new Promise((e, n) => {
      chrome.storage.sync.get(["openaiApiKey"], (t) => {
        chrome.runtime.lastError ? n(chrome.runtime.lastError) : e(t.openaiApiKey || "");
      });
    });
  });
}
function g() {
  const e = document.createElement("div");
  return e.className = "gpt-modal", e.innerHTML = `
    <div class="gpt-modal-content">
      <span class="gpt-close">&times;</span>
      <h2>Ask ChatGPT</h2>
      <textarea class="gpt-prompt-input" placeholder="Enter your prompt here..."></textarea>
      <button class="gpt-submit">Generate</button>
      <div class="gpt-loading" style="display: none;">Generating...</div>
    </div>
  `, e;
}
function h(e, n) {
  const t = e.querySelector(".gpt-close"), r = e.querySelector(".gpt-submit"), o = e.querySelector(".gpt-prompt-input"), i = e.querySelector(".gpt-loading");
  t == null || t.addEventListener("click", () => {
    e.style.display = "none";
  }), window.addEventListener("click", (s) => {
    s.target === e && (e.style.display = "none");
  }), r == null || r.addEventListener("click", () => c(this, null, function* () {
    if (o.value.trim()) {
      i.style.display = "block", r.disabled = !0;
      try {
        yield n(o.value), e.style.display = "none";
      } catch (s) {
        alert("Error generating text: " + s.message);
      } finally {
        i.style.display = "none", r.disabled = !1;
      }
    }
  })), o == null || o.addEventListener("keydown", (s) => c(this, null, function* () {
    s.key === "Enter" && !s.shiftKey && !r.disabled && (s.preventDefault(), r.click());
  }));
}
function m(e) {
  var t;
  const n = document.createElement("div");
  return n.className = "gpt-wrapper", (t = e.parentNode) == null || t.insertBefore(n, e), n.appendChild(e), n;
}
function b() {
  const e = document.createElement("button");
  return e.className = "gpt-button", e.innerHTML = "🤖", e.title = "Ask ChatGPT", e;
}
function v(e, n) {
  let t;
  return function(...r) {
    t || (e.apply(this, r), t = !0, setTimeout(() => t = !1, n));
  };
}
const u = /* @__PURE__ */ new WeakSet();
function E(e) {
  if (u.has(e))
    return;
  const n = m(e), t = b();
  n.appendChild(t);
  let r = null;
  t.addEventListener("click", () => {
    r || (r = g(), document.body.appendChild(r), h(r, (i) => c(this, null, function* () {
      try {
        const s = yield f();
        if (!s)
          throw new Error("Please set your OpenAI API key in the extension settings");
        const l = yield y(i, s);
        e.value = l, e.dispatchEvent(new Event("input", { bubbles: !0 }));
      } catch (s) {
        alert(s instanceof Error ? s.message : "An error occurred");
      }
    }))), r.style.display = "block";
    const o = r.querySelector(".gpt-prompt-input");
    o.value = "", o.focus();
  }), u.add(e);
}
const d = v(() => {
  document.querySelectorAll("textarea").forEach((n) => {
    n instanceof HTMLTextAreaElement && E(n);
  });
}, 250);
d();
const w = new MutationObserver((e) => {
  let n = !1;
  for (const t of e)
    if (t.addedNodes.length > 0) {
      n = !0;
      break;
    }
  n && d();
});
w.observe(document.body, {
  childList: !0,
  subtree: !0
});
