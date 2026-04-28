const balance = document.querySelector("#balance");
const incomeTitle = document.querySelector("#incomeTitle");
const incomeAmount = document.querySelector("#incomeAmount");
const addIncomeBtn = document.querySelector("#addIncomeBtn");
const transactionList = document.querySelector("#transactionList");
const clearBtn = document.querySelector(".clear");
const modal = document.querySelector("#modal");
const cancelBtn = document.querySelector("#cancelBtn");
const confirmBtn = document.querySelector("#confirmBtn");
const typeSelect = document.querySelector("#type");
const totalIncomeEl = document.querySelector("#totalIncome");
const totalExpenseEl = document.querySelector("#totalExpense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Local storage function
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

addIncomeBtn.addEventListener("click", () => {
  const title = incomeTitle.value.trim();

  const type = typeSelect.value;
  const amount =
    type === "expense"
      ? -Number(incomeAmount.value)
      : Number(incomeAmount.value);

  if (title === "" || amount === 0) {
    alert("Enter valid data");
    return;
  }

  if (editId) {
    transactions = transactions.map((t) =>
      t.id === editId ? { ...t, text: title, amount: amount } : t,
    );

    editId = null;
    addIncomeBtn.innerText = "Add";
  } else {
    const transaction = {
      id: Date.now(),
      text: title,
      amount: amount,
      date: new Date().toLocaleDateString(),
    };
    transactions.push(transaction);
  }

  updateLocalStorage();
  updateUI();

  incomeTitle.value = "";
  incomeAmount.value = "";
  clearBtn.style.display = "block";
});

// Update UI function
function updateUI() {
  transactionList.innerHTML = "";

  transactions.forEach(addTransactionToDOM);
  updateBalance();

  if (transactions.length === 0) {
    clearBtn.style.display = "none";
  } else {
    clearBtn.style.display = "block";
  }
}

// this funtion will helps to show the list on page
function addTransactionToDOM(transaction) {
  const li = document.createElement("li");

  li.innerHTML = `
  ${transaction.text}
  <span>$${transaction.amount}</span>
  <small class="date">${transaction.date}</small>
  <div class="btnAll">
  <button class="delete" onclick="removeTransaction(${transaction.id})"><span class="material-icons">delete</span></button>
  <button class="edit" onclick="editTransaction(${transaction.id})"><span class="material-icons">edit</span></button>
  </div>
  `;
  transactionList.appendChild(li);
}

function updateBalance() {
  const amounts = transactions.map((t) => t.amount);

  const total = transactions.reduce((acc, item) => acc + item.amount, 0);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item, 0);

  totalIncomeEl.innerHTML = `$${income}`;
  totalExpenseEl.innerHTML = `$${Math.abs(expense)}`;
  balance.innerHTML = `$${total}`;
}

// remove function
function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);

  updateUI();
  updateLocalStorage();
}

// Clear all button
function clearAll() {
  transactions = [];
  updateLocalStorage();
  updateUI();
}
clearBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

confirmBtn.addEventListener("click", () => {
  clearAll();
  modal.style.display = "none";
});

// edit function

let editId = null;

function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);

  incomeTitle.value = transaction.text;
  incomeAmount.value = Math.abs(transaction.amount);

  if (transaction.amount < 0) {
    typeSelect.value = "expense";
  } else {
    typeSelect.value = "income";
  }

  editId = id;

  addIncomeBtn.innerText = "Update";
}

// data will be update after load the page
updateUI();

// dark mood functionality

const toggleBtn = document.querySelector("#themeToggle");
const icon = document.querySelector("#icon");

// saved mood
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  icon.textContent = "☀️";
}

// toggle theme

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    icon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
