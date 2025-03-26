/* script.js */
let income = 0;
let expenses = 0;
let savings = 0;
let investment = 0;
let debts = [];

const budgetCtx = document.getElementById('budgetChart').getContext('2d');
const investmentCtx = document.getElementById('investmentChart').getContext('2d');
const debtList = document.getElementById('debtList');

let budgetChart = new Chart(budgetCtx, {
    type: 'pie',
    data: {
        labels: ['Income', 'Expenses', 'Savings'],
        datasets: [{
            data: [income, expenses, savings],
            backgroundColor: ['green', 'red', 'blue']
        }]
    }
});

let investmentChart = new Chart(investmentCtx, {
    type: 'line',
    data: {
        labels: ['Initial'],
        datasets: [{
            label: 'Investment Value',
            data: [investment],
            borderColor: 'purple',
            fill: false
        }]
    }
});

function addData() {
    income = parseFloat(document.getElementById('income').value) || 0;
    expenses = parseFloat(document.getElementById('expenses').value) || 0;
    savings = parseFloat(document.getElementById('savings').value) || 0;
    investment = parseFloat(document.getElementById('investment').value) || 0;
    const debtName = document.getElementById('debtName').value;
    const debtAmount = parseFloat(document.getElementById('debtAmount').value) || 0;

    if (debtName && debtAmount) {
        debts.push({ name: debtName, amount: debtAmount });
    }

    updateCharts();
    updateDebtList();
}

function updateCharts() {
    budgetChart.data.datasets[0].data = [income, expenses, savings];
    budgetChart.update();

    investmentChart.data.labels.push('Current');
    investmentChart.data.datasets[0].data.push(investment);
    investmentChart.update();
}

function updateDebtList() {
    debtList.innerHTML = '';
    debts.forEach(debt => {
        const li = document.createElement('li');
        li.textContent = `${debt.name}: $${debt.amount.toFixed(2)}`;
        debtList.appendChild(li);
    });
}
