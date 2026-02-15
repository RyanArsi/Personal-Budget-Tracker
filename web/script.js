
document.addEventListener('DOMContentLoaded', function() {
    console.log('Personal Budget Tracker carregado!');
    
    initializeApp();
});


function initializeApp() {
    const movementForm = document.getElementById('movementForm');
    if (movementForm) {
        movementForm.addEventListener('submit', handleAddMovement);
        loadMovementsFromSession();
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
    
    console.log('Movimentação excluída:', id);
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
