const balance = document.querySelector("#balance");
const incomeTitle = document.querySelector("#incomeTitle");
const incomeAmount = document.querySelector("#incomeAmount");
const addIncomeBtn = document.querySelector("#addIncomeBtn");
const transactionList = document.querySelector("#transactionList");

let transactions = JSON.parse(localStorage.setItem("transactions")) || []













// Local storage function
function updateLocalStorage() {
    localStorage.getItem("transactions",JSON.stringify(transactions));
}