document.addEventListener("DOMContentLoaded", () => {
  const addTransactionBtn = document.getElementById("addTransactionBtn");
  const transactionList = document.getElementById("transactionList");
  const totalIncomeE1 = document.getElementById("totalIncome");
  const totalExpensesE1 = document.getElementById("totalExpenses");
  const balanceE1 = document.getElementById("balance");

  function displayTransactions() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactionList.innerHTML = "";
    transactions.forEach((transaction, index) => {
      const li = document.createElement("li");

      if (transaction.category === "Income") {
        li.innerHTML = `
            ${transaction.name} - $${transaction.amount.toFixed(2)} (${
          transaction.category
        })
            <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>`;
        li.style.backgroundColor = "#0e3a0f";
        li.style.color = "white";
      } else {
        li.innerHTML = `
            ${transaction.name} - $${transaction.amount.toFixed(2)} (${
          transaction.category
        })
            <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>`;
        li.style.backgroundColor = "#705814";
        li.style.color = "white";
      }
      transactionList.appendChild(li);
    });
  }

  addTransactionBtn.addEventListener("click", addTransaction);

  function addTransaction() {
    const name = document.getElementById("transactionName").value;
    const amount = parseInt(document.getElementById("transactionAmount").value);

    const category = document.getElementById("transactionCategory").value;

    if (name && !isNaN(amount)) {
      const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];
      const newTransaction = { name, amount, category };
      transactions.push(newTransaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      displayTransactions();
      updateSummary();
    }
  }

  function updateSummary() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.category === "Income") {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
    });
    const balance = totalIncome - totalExpenses;

    totalIncomeE1.textContent = totalIncome.toFixed(2);
    totalExpensesE1.textContent = totalExpenses.toFixed(2);
    balanceE1.textContent = balance.toFixed(2);
  }

  function deleteTransaction(index) {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    displayTransactions();
    updateSummary();
  }
  window.deleteTransaction = deleteTransaction;
  displayTransactions();
  updateSummary();
});
