const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("history");
const clearHistoryBtn = document.getElementById("clearHistory");

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

/* LOAD HISTORY */
renderHistory();

/* BUTTON CLICK */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;

    if (value === "C") {
      screen.value = "";
      return;
    }

    if (value === "=") {
      calculate();
      return;
    }

    screen.value += value;
  });
});

/* CALCULATE */
function calculate() {
  try {
    const expression = screen.value;
    const result = eval(expression);

    history.unshift(`${expression} = ${result}`);

    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem("calcHistory", JSON.stringify(history));

    renderHistory();

    screen.value = result;

  } catch {
    screen.value = "Error";
  }
}

/* HISTORY RENDER */
function renderHistory() {
  historyList.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    historyList.appendChild(li);
  });
}

/* CLEAR HISTORY */
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
});

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {
  const allowed = "0123456789+-*/.%()";

  if (allowed.includes(e.key)) {
    screen.value += e.key;
  }

  if (e.key === "Enter") {
    calculate();
  }

  if (e.key === "Backspace") {
    screen.value = screen.value.slice(0, -1);
  }

  if (e.key === "Escape") {
    screen.value = "";
  }
});