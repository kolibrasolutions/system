/**
 * Funções para gerenciar os gráficos do dashboard da Kolibra Solutions
 * Versão corrigida para garantir a atualização do dashboard
 */

// Inicializar gráficos do dashboard
function initDashboardCharts() {
    console.log("Inicializando dashboard charts");
    
    // Verificar se há dados de vendas
    const vendas = getVendasFromLocalStorage();
    console.log("Vendas encontradas:", vendas);
    
    if (!vendas || vendas.length === 0) {
        console.log("Nenhuma venda encontrada, mostrando mensagens de 'sem dados'");
        // Se não houver vendas, mostrar mensagens de "sem dados"
        document.querySelectorAll('.no-data-message').forEach(el => {
            el.style.display = 'flex';
        });
        
        // Ocultar gráficos
        document.querySelectorAll('.chart-container canvas').forEach(el => {
            el.style.display = 'none';
        });
        
        // Atualizar estatísticas com valores zerados
        updateDashboardStats({
            receitaTotal: 0,
            vendasTotal: 0,
            clientesAtivos: 0,
            projetosAtivos: 0
        });
        
        return;
    }
    
    console.log("Vendas encontradas, atualizando dashboard");
    
    // Ocultar mensagens de "sem dados"
    document.querySelectorAll('.no-data-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Mostrar gráficos
    document.querySelectorAll('.chart-container canvas').forEach(el => {
        el.style.display = 'block';
    });
    
    // Calcular estatísticas
    const stats = calculateDashboardStats(vendas);
    console.log("Estatísticas calculadas:", stats);
    
    // Atualizar estatísticas no dashboard
    updateDashboardStats(stats);
    
    // Inicializar gráficos
    initVendasPorServicoChart(vendas);
    initVendasPorSegmentoChart(vendas);
    
    // Atualizar lista de atividades recentes
    updateAtividadesRecentes(vendas);
}

// Calcular estatísticas para o dashboard
function calculateDashboardStats(vendas) {
    // Calcular receita total
    const receitaTotal = vendas.reduce((total, venda) => total + parseFloat(venda.valor), 0);
    
    // Contar total de vendas
    const vendasTotal = vendas.length;
    
    // Obter clientes únicos
    const clientesUnicos = [...new Set(vendas.map(venda => venda.cliente))];
    const clientesAtivos = clientesUnicos.length;
    
    // Contar projetos em andamento
    const projetosAtivos = vendas.filter(venda => venda.status === 'Em andamento').length;
    
    return {
        receitaTotal,
        vendasTotal,
        clientesAtivos,
        projetosAtivos
    };
}

// Atualizar estatísticas no dashboard
function updateDashboardStats(stats) {
    console.log("Atualizando estatísticas do dashboard:", stats);
    
    try {
        // Atualizar valores
        const receitaElement = document.querySelector('.stats-card:nth-child(1) .stats-value');
        const vendasElement = document.querySelector('.stats-card:nth-child(2) .stats-value');
        const clientesElement = document.querySelector('.stats-card:nth-child(3) .stats-value');
        const projetosElement = document.querySelector('.stats-card:nth-child(4) .stats-value');
        
        if (receitaElement) receitaElement.textContent = formatCurrency(stats.receitaTotal);
        if (vendasElement) vendasElement.textContent = stats.vendasTotal;
        if (clientesElement) clientesElement.textContent = stats.clientesAtivos;
        if (projetosElement) projetosElement.textContent = stats.projetosAtivos;
        
        // Definir metas (valores fictícios para demonstração)
        const metaReceita = 10000;
        const metaVendas = 10;
        const metaRetencao = 100; // 100% de retenção
        const metaConclusao = 100; // 100% de conclusão
        
        // Calcular percentuais
        const percentualReceita = stats.receitaTotal > 0 ? Math.min(Math.round((stats.receitaTotal / metaReceita) * 100), 100) : 0;
        const percentualVendas = stats.vendasTotal > 0 ? Math.min(Math.round((stats.vendasTotal / metaVendas) * 100), 100) : 0;
        const percentualRetencao = stats.clientesAtivos > 0 ? Math.min(Math.round(metaRetencao), 100) : 0;
        const percentualConclusao = stats.projetosAtivos > 0 ? Math.min(Math.round(metaConclusao / 2), 100) : 0;
        
        // Atualizar percentuais
        const receitaPercentElement = document.querySelector('.stats-card:nth-child(1) .progress-percentage');
        const vendasPercentElement = document.querySelector('.stats-card:nth-child(2) .progress-percentage');
        const clientesPercentElement = document.querySelector('.stats-card:nth-child(3) .progress-percentage');
        const projetosPercentElement = document.querySelector('.stats-card:nth-child(4) .progress-percentage');
        
        if (receitaPercentElement) receitaPercentElement.textContent = percentualReceita + '%';
        if (vendasPercentElement) vendasPercentElement.textContent = percentualVendas + '%';
        if (clientesPercentElement) clientesPercentElement.textContent = percentualRetencao + '%';
        if (projetosPercentElement) projetosPercentElement.textContent = percentualConclusao + '%';
        
        // Atualizar barras de progresso
        const receitaBarElement = document.querySelector('.stats-card:nth-child(1) .progress-value');
        const vendasBarElement = document.querySelector('.stats-card:nth-child(2) .progress-value');
        const clientesBarElement = document.querySelector('.stats-card:nth-child(3) .progress-value');
        const projetosBarElement = document.querySelector('.stats-card:nth-child(4) .progress-value');
        
        if (receitaBarElement) receitaBarElement.style.width = percentualReceita + '%';
        if (vendasBarElement) vendasBarElement.style.width = percentualVendas + '%';
        if (clientesBarElement) clientesBarElement.style.width = percentualRetencao + '%';
        if (projetosBarElement) projetosBarElement.style.width = percentualConclusao + '%';
    } catch (error) {
        console.error("Erro ao atualizar estatísticas:", error);
    }
}

// Inicializar gráfico de vendas por serviço
function initVendasPorServicoChart(vendas) {
    console.log("Inicializando gráfico de vendas por serviço");
    
    try {
        // Agrupar vendas por serviço
        const vendasPorServico = {};
        
        vendas.forEach(venda => {
            if (vendasPorServico[venda.servico]) {
                vendasPorServico[venda.servico] += parseFloat(venda.valor);
            } else {
                vendasPorServico[venda.servico] = parseFloat(venda.valor);
            }
        });
        
        // Preparar dados para o gráfico
        const labels = Object.keys(vendasPorServico);
        const data = Object.values(vendasPorServico);
        
        console.log("Dados do gráfico de serviços:", { labels, data });
        
        // Cores para o gráfico
        const backgroundColors = [
            'rgba(0, 68, 148, 0.7)',
            'rgba(255, 127, 0, 0.7)',
            'rgba(76, 175, 80, 0.7)',
            'rgba(33, 150, 243, 0.7)',
            'rgba(255, 193, 7, 0.7)',
            'rgba(156, 39, 176, 0.7)',
            'rgba(233, 30, 99, 0.7)',
            'rgba(0, 188, 212, 0.7)'
        ];
        
        // Verificar se o elemento canvas existe
        const canvas = document.getElementById('servicosChart');
        if (!canvas) {
            console.error("Elemento canvas 'servicosChart' não encontrado");
            return;
        }
        
        // Configurar gráfico
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico existente se houver
        if (window.servicosChart) {
            window.servicosChart.destroy();
        }
        
        // Criar novo gráfico
        window.servicosChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors.slice(0, labels.length),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 12
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return label + ': ' + formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao inicializar gráfico de serviços:", error);
    }
}

// Inicializar gráfico de vendas por segmento
function initVendasPorSegmentoChart(vendas) {
    console.log("Inicializando gráfico de vendas por segmento");
    
    try {
        // Agrupar vendas por segmento
        const vendasPorSegmento = {};
        
        vendas.forEach(venda => {
            if (vendasPorSegmento[venda.segmento]) {
                vendasPorSegmento[venda.segmento] += parseFloat(venda.valor);
            } else {
                vendasPorSegmento[venda.segmento] = parseFloat(venda.valor);
            }
        });
        
        // Preparar dados para o gráfico
        const labels = Object.keys(vendasPorSegmento);
        const data = Object.values(vendasPorSegmento);
        
        console.log("Dados do gráfico de segmentos:", { labels, data });
        
        // Cores para o gráfico
        const backgroundColors = [
            'rgba(0, 68, 148, 0.7)',
            'rgba(255, 127, 0, 0.7)',
            'rgba(76, 175, 80, 0.7)',
            'rgba(33, 150, 243, 0.7)',
            'rgba(255, 193, 7, 0.7)'
        ];
        
        // Verificar se o elemento canvas existe
        const canvas = document.getElementById('segmentosChart');
        if (!canvas) {
            console.error("Elemento canvas 'segmentosChart' não encontrado");
            return;
        }
        
        // Configurar gráfico
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico existente se houver
        if (window.segmentosChart) {
            window.segmentosChart.destroy();
        }
        
        // Criar novo gráfico
        window.segmentosChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Receita por Segmento',
                    data: data,
                    backgroundColor: backgroundColors.slice(0, labels.length),
                    borderWidth: 0,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                family: "'Poppins', sans-serif"
                            },
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw || 0;
                                return label + ': ' + formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao inicializar gráfico de segmentos:", error);
    }
}

// Atualizar lista de atividades recentes
function updateAtividadesRecentes(vendas) {
    console.log("Atualizando lista de atividades recentes");
    
    try {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) {
            console.error("Elemento '.activity-list' não encontrado");
            return;
        }
        
        // Limpar lista atual
        activityList.innerHTML = '';
        
        // Se não houver vendas, mostrar mensagem
        if (vendas.length === 0) {
            const noDataMessage = document.createElement('div');
            noDataMessage.className = 'no-data-message';
            noDataMessage.innerHTML = `
                <i class="fas fa-history"></i>
                <p>Nenhuma atividade recente</p>
                <a href="registro-vendas.html" class="btn btn-primary btn-sm">Iniciar Atividades</a>
            `;
            activityList.appendChild(noDataMessage);
            return;
        }
        
        // Ordenar vendas por data (mais recentes primeiro)
        const vendasRecentes = [...vendas].sort((a, b) => {
            const dateA = a.timestamp ? new Date(a.timestamp) : new Date(a.data);
            const dateB = b.timestamp ? new Date(b.timestamp) : new Date(b.data);
            return dateB - dateA;
        }).slice(0, 5);
        
        // Adicionar atividades à lista
        vendasRecentes.forEach(venda => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            // Definir ícone com base no serviço
            let iconClass = 'primary';
            if (venda.servico.includes('Marketing')) {
                iconClass = 'success';
            } else if (venda.servico.includes('Design')) {
                iconClass = 'info';
            } else if (venda.servico.includes('Suporte')) {
                iconClass = 'warning';
            } else if (venda.servico.includes('Desenvolvimento')) {
                iconClass = 'accent';
            }
            
            const timestamp = venda.timestamp || new Date(venda.data).toISOString();
            
            activityItem.innerHTML = `
                <div class="activity-icon ${iconClass}">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">Venda de ${venda.servico}</div>
                    <div class="activity-subtitle">Cliente: ${venda.cliente} - ${formatCurrency(venda.valor)}</div>
                </div>
                <div class="activity-time">${formatTimeAgo(timestamp)}</div>
            `;
            
            activityList.appendChild(activityItem);
        });
    } catch (error) {
        console.error("Erro ao atualizar atividades recentes:", error);
    }
}

// Formatar tempo relativo
function formatTimeAgo(timestamp) {
    try {
        const now = new Date();
        const date = new Date(timestamp);
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        
        if (diffSec < 60) {
            return 'Agora mesmo';
        } else if (diffMin < 60) {
            return `${diffMin} min atrás`;
        } else if (diffHour < 24) {
            return `${diffHour} h atrás`;
        } else if (diffDay < 30) {
            return `${diffDay} dias atrás`;
        } else {
            return formatDate(date);
        }
    } catch (error) {
        console.error("Erro ao formatar tempo:", error);
        return "Data desconhecida";
    }
}

// Formatar data
function formatDate(date) {
    try {
        return date.toLocaleDateString('pt-BR');
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
    }
}

// Formatar valor monetário
function formatCurrency(value) {
    try {
        return 'R$ ' + parseFloat(value).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } catch (error) {
        console.error("Erro ao formatar moeda:", error);
        return "R$ 0,00";
    }
}

// Função para obter vendas do localStorage
function getVendasFromLocalStorage() {
    try {
        const vendas = localStorage.getItem('kolibra_vendas');
        console.log("Vendas do localStorage:", vendas);
        return vendas ? JSON.parse(vendas) : [];
    } catch (error) {
        console.error("Erro ao obter vendas do localStorage:", error);
        return [];
    }
}

// Inicializar dashboard quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado, verificando se estamos na página do dashboard");
    
    // Verificar se estamos na página do dashboard
    if (window.location.pathname.includes('dashboard.html') || document.title.includes('Dashboard')) {
        console.log("Estamos na página do dashboard, inicializando...");
        
        // Inicializar dashboard com um pequeno atraso para garantir que tudo esteja carregado
        setTimeout(function() {
            initDashboardCharts();
        }, 100);
    }
});

// Exportar funções para uso global
window.DashboardCharts = {
    initDashboardCharts,
    getVendasFromLocalStorage,
    updateDashboardStats,
    initVendasPorServicoChart,
    initVendasPorSegmentoChart,
    updateAtividadesRecentes
};
