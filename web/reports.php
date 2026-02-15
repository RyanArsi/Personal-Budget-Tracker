<div class="page-reports">
    <h2>Relatórios</h2>
    <p>Análise detalhada do seu orçamento.</p>
    
    <div class="reports-container">
        <div class="summary-section">
            <h3>Resumo Financeiro</h3>
            <div class="summary-cards">
                <div class="card income">
                    <h4>Total de Entradas</h4>
                    <p class="amount">R$ 0,00</p>
                </div>
                <div class="card expense">
                    <h4>Total de Saídas</h4>
                    <p class="amount">R$ 0,00</p>
                </div>
                <div class="card balance">
                    <h4>Saldo</h4>
                    <p class="amount">R$ 0,00</p>
                </div>
            </div>
        </div>
        
        <div class="charts-section">
            <h3>Gráficos e Análises</h3>
            <div class="charts-wrapper">
                <div class="chart-container">
                    <h4>Distribuição Entradas vs Saídas</h4>
                    <div id="incomeExpenseContainer">
                        <canvas id="incomeExpenseChart"></canvas>
                    </div>
                </div>
                <div class="chart-container">
                    <h4>Movimentações por Mês</h4>
                    <div id="monthlyContainer">
                        <canvas id="monthlyChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="filter-section">
            <h3>Filtros</h3>
            <div class="filters">
                <label for="filterMonth">Mês:</label>
                <select id="filterMonth">
                    <option value="">Todos</option>
                    <option value="01">Janeiro</option>
                    <option value="02">Fevereiro</option>
                    <option value="03">Março</option>
                    <option value="04">Abril</option>
                    <option value="05">Maio</option>
                    <option value="06">Junho</option>
                    <option value="07">Julho</option>
                    <option value="08">Agosto</option>
                    <option value="09">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
                
                <label for="filterYear">Ano:</label>
                <select id="filterYear">
                    <option value="">Todos</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                </select>
                
                <button type="button" class="btn" id="applyFilters">Aplicar Filtros</button>
            </div>
        </div>
    </div>
</div>
