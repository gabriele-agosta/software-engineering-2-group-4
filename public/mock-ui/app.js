// --- state ---
let counterId = localStorage.getItem("oq_counter_id") || "C-01";
let current = null; // { id, code, service, issuedAt }

// --- elements ---
const counterSpan = document.getElementById("counterId");
const counterValue = document.getElementById("counterValue");
const counterInput = document.getElementById("counterInput");
const applyCounter = document.getElementById("applyCounter");

const ticketBox = document.getElementById("ticketBox");
const ticketCode = document.getElementById("ticketCode");
const ticketService = document.getElementById("ticketService");
const ticketIssued = document.getElementById("ticketIssued");

const btnNext = document.getElementById("btnNext");
const btnRecall = document.getElementById("btnRecall");
const btnServed = document.getElementById("btnServed");
const errorBox = document.getElementById("errorBox");

// --- init ---
function render() {
  counterSpan.textContent = counterId;
  counterValue.textContent = counterId;

  if (!current) {
    ticketBox.classList.add("ticket-empty");
    ticketCode.textContent = "—";
    ticketService.textContent = "";
    ticketIssued.textContent = "";
    btnRecall.disabled = true;
    btnServed.disabled = true;
  } else {
    ticketBox.classList.remove("ticket-empty");
    ticketCode.textContent = current.code;
    ticketService.textContent = "Service: " + current.service;
    ticketIssued.textContent = "Issued: " + new Date(current.issuedAt).toLocaleTimeString();
    btnRecall.disabled = false;
    btnServed.disabled = false;
  }
}
render();

// --- actions (mock) ---
function mockFetchNext() {
  // تیکت ساختگی – کاملاً مستقل از بک‌اند
  return {
    id: Math.random().toString(36).slice(2),
    code: "A" + String(Math.floor(Math.random() * 90) + 10),
    service: "General",
    issuedAt: new Date().toISOString(),
  };
}

function callNext() {
  try {
    errorBox.classList.add("hidden");
    current = mockFetchNext();
    render();
  } catch (e) {
    errorBox.textContent = e?.message || "Unknown error";
    errorBox.classList.remove("hidden");
  }
}
function recall() {
  if (!current) return;
  // اینجا می‌تونی صدای اعلان/انیمیشن بزاری
}
function served() {
  if (!current) return;
  current = null;
  render();
}

// --- events ---
applyCounter.addEventListener("click", () => {
  const val = (counterInput.value || "").trim();
  if (!val) return;
  counterId = val;
  localStorage.setItem("oq_counter_id", counterId);
  render();
});
btnNext.addEventListener("click", callNext);
btnRecall.addEventListener("click", recall);
btnServed.addEventListener("click", served);

window.addEventListener("keydown", (e) => {
  const k = (e.key || "").toLowerCase();
  if (k === "n") callNext();
  if (k === "r") recall();
  if (k === "s") served();
});
