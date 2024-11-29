const transaction = JSON.parse(localStorage.getItem("transaction")) || [];

const addBtn = document.querySelector(".add_btn");
const deleteBtn = document.querySelector(".delete_btn");
const incomeForm = document.querySelector(".income_form");
const expencesForm = document.querySelector(".expences_form");
const income = document.querySelector(".span_income");
const expences = document.querySelector(".span_expences");
const total = document.querySelector(".span_total");

function addTransaction(type) {
  const date =
    type === "income"
      ? document.querySelector("#income_date").value
      : document.querySelector("#expences_date").value;

  const description =
    type === "income"
      ? document.querySelector("#income_disc").value
      : document.querySelector("#expences_disc").value;

  const amount = parseFloat(
    type === "income"
      ? document.querySelector("#income_amount").value
      : document.querySelector("#expences_amount").value
  );
  const select =
    type === "income"
      ? document.querySelector("#income_selecter").value
      : document.querySelector("#expences_selector").value;

  if (!date || !amount || !select) return alert("Please enter values");

  let transactions = { type, date, description, amount, select };
  transaction.push(transactions);
  updateTransaction();

  localStorage.setItem("transaction", JSON.stringify(transaction));
}

function updateTransaction() {
  let transactionHistory = document.querySelector(".transaction_history");
  let totalIncome = 0;
  let totalExpences = 0;
  transactionHistory.innerHTML = "";
  transaction.forEach((transaction, index) => {
    let listItem = document.createElement("li");
    listItem.classList.add(transaction.type);
    listItem.innerHTML = `• 
      ${transaction.date} - ${transaction.description}
      - ${transaction.select} - ₹${transaction.amount}
      <div class="transaction_btn">
      <button class="delete_transaction" onclick="deleteTransaction(${index})">&times;</button>
      </div>

    `;
    transactionHistory.appendChild(listItem);

    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpences += transaction.amount;
    }

    //Total
    income.textContent = totalIncome.toFixed(2);
    expences.textContent = totalExpences.toFixed(2);
    total.textContent = (totalIncome - totalExpences).toFixed(2);
  });
}

function deleteTransaction(index) {
  transaction.splice(index, 1);
  updateTransaction();
  localStorage.setItem("transaction", JSON.stringify(transaction));
}

// IncomeForm EventListner
incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTransaction("income");
  incomeForm.reset();
});

// ExpencesForm EventListner
expencesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTransaction("expences");
  expencesForm.reset();
});

updateTransaction();
