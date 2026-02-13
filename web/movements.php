<div class="page-movements">
    <h2>Movimentações</h2>
    <p>Gerencie suas entradas e saídas financeiras.</p>
    
    <div class="movements-container">
        <div class="form-section">
            <h3>Adicionar Movimentação</h3>
            <form id="movementForm">
                <div class="form-group">
                    <label for="type">Tipo:</label>
                    <select id="type" name="type" required>
                        <option value="income">Entrada (Ganho)</option>
                        <option value="expense">Saída (Gasto)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="description">Descrição:</label>
                    <input type="text" id="description" name="description" placeholder="Ex: Salário, Compra de eletrônicos" required>
                </div>
                
                <div class="form-group">
                    <label for="amount">Valor:</label>
                    <input type="number" id="amount" name="amount" placeholder="0.00" step="0.01" required>
                </div>
                
                <div class="form-group">
                    <label for="date">Data:</label>
                    <input type="date" id="date" name="date" required>
                </div>
                
                <button type="submit" class="btn">Adicionar</button>
            </form>
        </div>
        
        <div class="list-section">
            <h3>Histórico de Movimentações</h3>
            <div id="movementsList">
                <p>Nenhuma movimentação registrada ainda.</p>
            </div>
        </div>
    </div>
</div>
