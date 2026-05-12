const balance =
  document.getElementById("balance");

const income =
  document.getElementById("income");

const expense =
  document.getElementById("expense");

const incomeSmall =
  document.getElementById("incomeSmall");

const expenseSmall =
  document.getElementById("expenseSmall");

const incomeFill =
  document.getElementById("incomeFill");

const expenseFill =
  document.getElementById("expenseFill");

const list =
  document.getElementById("list");

const text =
  document.getElementById("text");

const amount =
  document.getElementById("amount");

const transactionCount =
  document.getElementById("transactionCount");

const savingRate =
  document.getElementById("savingRate");

const financialHealth =
  document.getElementById("financialHealth");

const topCategory =
  document.getElementById("topCategory");

let transactions =
  JSON.parse(
    localStorage.getItem("transactions")
  ) || [];

/* SAVE */

function saveTransactions() {

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

/* ADD */

function addTransaction(type) {

  if (!text.value.trim()) {

    alert("Enter transaction name");

    return;
  }

  if (+amount.value <= 0) {

    alert("Enter valid amount");

    return;
  }

  const transaction = {

    id: Date.now(),

    text: text.value.trim(),

    amount:
      type === "expense"
        ? -Math.abs(+amount.value)
        : Math.abs(+amount.value)
  };

  transactions.push(transaction);

  saveTransactions();

  init();

  text.value = "";
  amount.value = "";
}

/* REMOVE */

function removeTransaction(id) {

  transactions =
    transactions.filter(
      t => t.id !== id
    );

  saveTransactions();

  init();
}

/* CREATE TRANSACTION */

function createTransaction(t) {

  const li =
    document.createElement("li");

  li.className =
    t.amount > 0
      ? "income-item"
      : "expense-item";

  /* LEFT */

  const left =
    document.createElement("div");

  left.className =
    "transaction-left";

  const title =
    document.createElement("strong");

  title.textContent =
    t.text;

  left.appendChild(title);

  /* RIGHT */

  const right =
    document.createElement("div");

  right.className =
    "transaction-right";

  const amountText =
    document.createElement("span");

  amountText.textContent =
    `₹${Math.abs(t.amount)}`;

  amountText.style.color =
    t.amount > 0
      ? "#4ade80"
      : "#fb7185";

  /* DELETE BUTTON */

  const del =
    document.createElement("button");

  del.className =
    "delete-btn";

  del.textContent = "✕";

  del.onclick = () =>
    removeTransaction(t.id);

  right.appendChild(amountText);

  right.appendChild(del);

  li.appendChild(left);

  li.appendChild(right);

  list.appendChild(li);
}

/* RENDER */

function renderTransactions() {

  list.innerHTML = "";

  transactions.forEach(
    createTransaction
  );
}

/* UPDATE VALUES */

function updateValues() {

  const incomeTotal =
    transactions
      .filter(t => t.amount > 0)
      .reduce((a,b)=>a+b.amount,0);

  const expenseTotal =
    transactions
      .filter(t => t.amount < 0)
      .reduce(
        (a,b)=>a+Math.abs(b.amount),
        0
      );

  const balanceTotal =
    incomeTotal - expenseTotal;

  /* TOTAL VALUES */

  balance.innerText =
    `₹${balanceTotal}`;

  income.innerText =
    `₹${incomeTotal}`;

  expense.innerText =
    `₹${expenseTotal}`;

  incomeSmall.innerText =
    `₹${incomeTotal}`;

  expenseSmall.innerText =
    `₹${expenseTotal}`;

  /* BALANCE COLOR */

  balance.style.color =
    balanceTotal >= 0
      ? "#4ade80"
      : "#fb7185";

  /* PROGRESS BARS */

  let incomePercent = 0;
  let expensePercent = 0;

  const totalFlow =
    incomeTotal + expenseTotal;

  if (totalFlow > 0) {

    incomePercent =
      (incomeTotal / totalFlow) * 100;

    expensePercent =
      (expenseTotal / totalFlow) * 100;
  }

  incomeFill.style.width =
    `${incomePercent}%`;

  expenseFill.style.width =
    `${expensePercent}%`;

  /* COUNT */

  transactionCount.innerText =
    transactions.length;

  /* SAVINGS */

  const savingsPercent =
    incomeTotal > 0
      ? (
          (
            incomeTotal - expenseTotal
          ) / incomeTotal
        ) * 100
      : 0;

  savingRate.innerText =
    `${savingsPercent.toFixed(0)}%`;

  /* HEALTH */

  if (balanceTotal < 0) {

    financialHealth.innerText =
      "Critical Debt";

  } else if (savingsPercent > 50) {

    financialHealth.innerText =
      "Excellent";

  } else if (savingsPercent > 20) {

    financialHealth.innerText =
      "Good";

  } else {

    financialHealth.innerText =
      "Warning";
  }

  /* TOP SPENDING */

  const expenses =
    transactions.filter(
      t => t.amount < 0
    );

  if (expenses.length > 0) {

    let top = expenses[0];

    expenses.forEach(t => {

      if (
        Math.abs(t.amount)
        >
        Math.abs(top.amount)
      ) {

        top = t;
      }
    });

    topCategory.innerText =
      top.text;

  } else {

    topCategory.innerText =
      "No data";
  }
}