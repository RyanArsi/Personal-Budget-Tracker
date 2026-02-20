
document.addEventListener('DOMContentLoaded', function() {
    console.log('Personal Budget Tracker carregado!');
    
    initializeApp();
    loadHomeBalance();
});


function initializeApp() {
    const movementForm = document.getElementById('movementForm');
    if (movementForm) {
        movementForm.addEventListener('submit', handleAddMovement);
        loadMovementsFromSession();
    }
    
    const filterMonth = document.getElementById('filterMonth');
    const filterYear = document.getElementById('filterYear');
    const applyFiltersBtn = document.getElementById('applyFilters');
    
    if (filterMonth || filterYear || applyFiltersBtn) {
        if (filterMonth) filterMonth.addEventListener('change', loadReports);
        if (filterYear) filterYear.addEventListener('change', loadReports);
        if (applyFiltersBtn) applyFiltersBtn.addEventListener('click', loadReports);
        loadReports();
    }
}

function handleAddMovement(event) {
    event.preventDefault();
    
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    
    const movement = {
        id: Date.now(),
        type: type,
        description: description,
        amount: amount,
        date: date
    };
    
    saveMovementToSession(movement);
    document.getElementById('movementForm').reset();
    loadMovementsFromSession();
    
    if (document.getElementById('applyFilters')) {
        loadReports();
    }
    
}

function saveMovementToSession(movement) {
    let movements = JSON.parse(sessionStorage.getItem('movements')) || [];
    movements.push(movement);
    sessionStorage.setItem('movements', JSON.stringify(movements));
}

function loadMovementsFromSession() {
    const movements = JSON.parse(sessionStorage.getItem('movements')) || [];
    const movementsList = document.getElementById('movementsList');
    
    if (!movementsList) return;
    
    movementsList.innerHTML = '';
    
    if (movements.length === 0) {
        movementsList.innerHTML = '<p>Nenhuma movimentação registrada ainda.</p>';
        return;
    }
    
    let html = '<table class="movements-table">';
    html += '<thead><tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Valor</th><th>Ação</th></tr></thead>';
    html += '<tbody>';
    
    movements.forEach(movement => {
        const typeLabel = movement.type === 'income' ? 'Entrada' : 'Saída';
        const typeClass = movement.type === 'income' ? 'income' : 'expense';
        const formattedAmount = formatCurrency(movement.amount);
        const dateFormatted = formatDate(movement.date);
        
        html += `<tr class="${typeClass}">
                    <td>${dateFormatted}</td>
                    <td>${typeLabel}</td>
                    <td>${movement.description}</td>
                    <td>${formattedAmount}</td>
                    <td><button class="btn-delete" onclick="deleteMovement(${movement.id})">Excluir</button></td>
                </tr>`;
    });
    
    html += '</tbody></table>';
    movementsList.innerHTML = html;
    updateFinancialSummary(movements);
}

function deleteMovement(id) {
    let movements = JSON.parse(sessionStorage.getItem('movements')) || [];
    movements = movements.filter(m => m.id !== id);
    sessionStorage.setItem('movements', JSON.stringify(movements));
    loadMovementsFromSession();
    
    if (document.getElementById('applyFilters')) {
        loadReports();
    }
    
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

function updateFinancialSummary(movements) {
    let totalIncome = 0;
    let totalExpense = 0;
    
    movements.forEach(movement => {
        if (movement.type === 'income') {
            totalIncome += movement.amount;
        } else {
            totalExpense += movement.amount;
        }
    });
    
    const balance = totalIncome - totalExpense;
    
    const summaryCards = document.querySelectorAll('.summary-cards .card');
    if (summaryCards.length > 0) {
        const incomeCard = document.querySelector('.summary-cards .income .amount');
        if (incomeCard) incomeCard.textContent = formatCurrency(totalIncome);
        
        const expenseCard = document.querySelector('.summary-cards .expense .amount');
        if (expenseCard) expenseCard.textContent = formatCurrency(totalExpense);
        
        const balanceCard = document.querySelector('.summary-cards .balance .amount');
        if (balanceCard) {
            balanceCard.textContent = formatCurrency(balance);
            balanceCard.className = 'amount ' + (balance >= 0 ? 'positive' : 'negative');
        }
    }
}



function makeRequest(url, method = 'GET', data = null) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null
    })
    .then(response => response.json())
    .catch(error => console.error('Erro na requisição:', error));
}

function loadReports() {
    const movements = JSON.parse(sessionStorage.getItem('movements')) || [];
    const selectedMonth = document.getElementById('filterMonth')?.value || '';
    const selectedYear = document.getElementById('filterYear')?.value || '';
    
    const filteredMovements = getFilteredMovements(movements, selectedMonth, selectedYear);
    
    updateReportsSummary(filteredMovements);
    createIncomeExpenseChart(filteredMovements);
    createMonthlyChart(movements, selectedMonth, selectedYear);
}

function getFilteredMovements(movements, month, year) {
    return movements.filter(movement => {
        const movementDate = new Date(movement.date);
        const movementMonth = String(movementDate.getMonth() + 1).padStart(2, '0');
        const movementYear = String(movementDate.getFullYear());
        
        if (month && movementMonth !== month) return false;
        if (year && movementYear !== year) return false;
        
        return true;
    });
}

function updateReportsSummary(movements) {
    let totalIncome = 0;
    let totalExpense = 0;
    
    movements.forEach(movement => {
        if (movement.type === 'income') {
            totalIncome += movement.amount;
        } else {
            totalExpense += movement.amount;
        }
    });
    
    const balance = totalIncome - totalExpense;
    
    const incomeCard = document.querySelector('.summary-cards .income .amount');
    if (incomeCard) incomeCard.textContent = formatCurrency(totalIncome);
    
    const expenseCard = document.querySelector('.summary-cards .expense .amount');
    if (expenseCard) expenseCard.textContent = formatCurrency(totalExpense);
    
    const balanceCard = document.querySelector('.summary-cards .balance .amount');
    if (balanceCard) {
        balanceCard.textContent = formatCurrency(balance);
        balanceCard.className = 'amount ' + (balance >= 0 ? 'positive' : 'negative');
    }
}

function createIncomeExpenseChart(movements) {
    let totalIncome = 0;
    let totalExpense = 0;
    
    movements.forEach(movement => {
        if (movement.type === 'income') {
            totalIncome += movement.amount;
        } else {
            totalExpense += movement.amount;
        }
    });
    
    const container = document.getElementById('incomeExpenseContainer');
    const ctx = document.getElementById('incomeExpenseChart');
    
    if (!container) return;
    
    if (totalIncome === 0 && totalExpense === 0) {
        if (window.incomeExpenseChartInstance) {
            window.incomeExpenseChartInstance.destroy();
        }
        container.innerHTML = '<div class="no-data-message">Nenhum dado disponível para este período</div>';
        return;
    }
    
    if (!ctx) return;
    
    if (window.incomeExpenseChartInstance) {
        window.incomeExpenseChartInstance.destroy();
    }
    
    container.innerHTML = '<canvas id="incomeExpenseChart"></canvas>';
    
    const newCtx = document.getElementById('incomeExpenseChart');
    window.incomeExpenseChartInstance = new Chart(newCtx, {
        type: 'doughnut',
        data: {
            labels: ['Entradas', 'Saídas'],
            datasets: [{
                data: [totalIncome, totalExpense],
                backgroundColor: ['#27ae60', '#e74c3c'],
                borderColor: ['#229954', '#c0392b'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function loadHomeBalance() {
    const balanceAmountElement = document.querySelector('.balance-amount');
    const balanceCard = document.querySelector('.balance-card');
    
    if (!balanceAmountElement || !balanceCard) return;
    
    const movements = JSON.parse(sessionStorage.getItem('movements')) || [];
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    movements.forEach(movement => {
        if (movement.type === 'income') {
            totalIncome += movement.amount;
        } else {
            totalExpense += movement.amount;
        }
    });
    
    const balance = totalIncome - totalExpense;
    
    balanceAmountElement.textContent = formatCurrency(balance);
    
    // Adicionar classe de estilo baseado no saldo
    balanceCard.classList.remove('positive', 'negative');
    if (balance >= 0) {
        balanceCard.classList.add('positive');
    } else {
        balanceCard.classList.add('negative');
    }
}

function createMonthlyChart(movements, selectedMonth, selectedYear) {
    const filteredForChart = getFilteredMovements(movements, selectedMonth, selectedYear);
    
    const monthlyData = {};
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    months.forEach((month, index) => {
        monthlyData[index] = { income: 0, expense: 0 };
    });
    
    filteredForChart.forEach(movement => {
        const movementDate = new Date(movement.date);
        const monthIndex = movementDate.getMonth();
        
        if (movement.type === 'income') {
            monthlyData[monthIndex].income += movement.amount;
        } else {
            monthlyData[monthIndex].expense += movement.amount;
        }
    });
    
    const incomeData = Object.values(monthlyData).map(m => m.income);
    const expenseData = Object.values(monthlyData).map(m => m.expense);
    
    const hasData = incomeData.some(v => v > 0) || expenseData.some(v => v > 0);
    
    const container = document.getElementById('monthlyContainer');
    const ctx = document.getElementById('monthlyChart');
    
    if (!container) return;
    
    if (!hasData) {
        if (window.monthlyChartInstance) {
            window.monthlyChartInstance.destroy();
        }
        container.innerHTML = '<div class="no-data-message">Nenhum dado disponível para este período</div>';
        return;
    }
    
    if (!ctx) return;
    
    if (window.monthlyChartInstance) {
        window.monthlyChartInstance.destroy();
    }
    
    container.innerHTML = '<canvas id="monthlyChart"></canvas>';
    
    const newCtx = document.getElementById('monthlyChart');
    window.monthlyChartInstance = new Chart(newCtx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Entradas',
                    data: incomeData,
                    backgroundColor: '#27ae60'
                },
                {
                    label: 'Saídas',
                    data: expenseData,
                    backgroundColor: '#e74c3c'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}
