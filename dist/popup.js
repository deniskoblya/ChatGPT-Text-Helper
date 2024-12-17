document.addEventListener("DOMContentLoaded", () => {
  const n = document.getElementById("apiKey"), a = document.getElementById("saveButton"), t = document.getElementById("status");
  chrome.storage.sync.get(["openaiApiKey"], (e) => {
    e.openaiApiKey && (n.value = e.openaiApiKey);
  }), a.addEventListener("click", () => {
    const e = n.value.trim();
    if (!e) {
      s("Please enter an API key", "error");
      return;
    }
    if (!e.startsWith("sk-")) {
      s("Invalid API key format", "error");
      return;
    }
    chrome.storage.sync.set({ openaiApiKey: e }, () => {
      s("API key saved successfully!", "success");
    });
  });
  function s(e, o) {
    t.textContent = e, t.className = `status ${o}`, setTimeout(() => {
      t.textContent = "", t.className = "status";
    }, 3e3);
  }
});
