const balance = document.querySelector("#balance");
const incomeTitle = document.querySelector("#incomeTitle");
const incomeAmount = document.querySelector("#incomeAmount");
const addIncomeBtn = document.querySelector("#addIncomeBtn");
const transactionList = document.querySelector("#transactionList");
const clearBtn = document.querySelector(".clear");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Local storage function
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

addIncomeBtn.addEventListener("click", () => {
  const title = incomeTitle.value.trim();
  const amount = +incomeAmount.value;

  if (title === "" || amount === 0) {
    alert("Enter valid data");
    return;
  }

  const transaction = {
    id: Date.now(),
    text: title,
    amount: amount,
    date: new Date().toLocaleDateString()
  };

  transactions.push(transaction);

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
}

// this funtion will helps to show the list on page
function addTransactionToDOM(transaction) {
  const li = document.createElement("li");

  li.innerHTML = `
  ${transaction.text}
  <span>$${transaction.amount}</span>
  <small class="date">${transaction.date}</small>
  <button class="delete" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  transactionList.appendChild(li);
  
}

function updateBalance() {
  const total = transactions.reduce((acc, item) => acc + item.amount, 0);

  balance.innerHTML = `$${total}`;
}

// remove function
function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);

  updateUI();
  updateLocalStorage();
}

// data will be update after load the page
updateUI();
