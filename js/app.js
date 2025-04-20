/**
 * Funções JavaScript principais para o Kolibra Dashboard
 * Versão completamente reescrita para garantir funcionamento correto
 */

// Namespace global para o aplicativo Kolibra
window.Kolibra = {
    // Armazenará todas as funções e dados do aplicativo
    data: {
        clientes: [],
        vendas: [],
        metas: {
            receita: 10000,
            vendas: 10,
            retencao: 100,
            conclusao: 100
        }
    },
    
    // Inicialização do aplicativo
    init: function() {
        console.log('Inicializando Kolibra Dashboard...');
        
        // Carregar dados do localStorage
        this.loadData();
        
        // Inicializar componentes comuns
        this.initCommonComponents();
        
        // Detectar página atual e inicializar componentes específicos
        this.initCurrentPage();
        
        console.log('Kolibra Dashboard inicializado com sucesso!');
    },
    
    // Carregar dados do localStorage
    loadData: function() {
        console.log('Carregando dados do localStorage...');
        
        // Carregar clientes
        const clientesData = localStorage.getItem('kolibra_clientes');
        if (clientesData) {
            try {
                this.data.clientes = JSON.parse(clientesData);
                console.log(`${this.data.clientes.length} clientes carregados`);
            } catch (error) {
                console.error('Erro ao carregar clientes:', error);
                this.data.clientes = [];
            }
        }
        
        // Carregar vendas
        const vendasData = localStorage.getItem('kolibra_vendas');
        if (vendasData) {
            try {
                this.data.vendas = JSON.parse(vendasData);
                console.log(`${this.data.vendas.length} vendas carregadas`);
            } catch (error) {
                console.error('Erro ao carregar vendas:', error);
                this.data.vendas = [];
            }
        }
        
        // Carregar metas (se existirem)
        const metasData = localStorage.getItem('kolibra_metas');
        if (metasData) {
            try {
                this.data.metas = JSON.parse(metasData);
                console.log('Metas carregadas');
            } catch (error) {
                console.error('Erro ao carregar metas:', error);
                // Manter metas padrão
            }
        }
    },
    
    // Salvar dados no localStorage
    saveData: function() {
        console.log('Salvando dados no localStorage...');
        
        // Salvar clientes
        localStorage.setItem('kolibra_clientes', JSON.stringify(this.data.clientes));
        
        // Salvar vendas
        localStorage.setItem('kolibra_vendas', JSON.stringify(this.data.vendas));
        
        // Salvar metas
        localStorage.setItem('kolibra_metas', JSON.stringify(this.data.metas));
        
        console.log('Dados salvos com sucesso!');
    },
    
    // Inicializar componentes comuns a todas as páginas
    initCommonComponents: function() {
        console.log('Inicializando componentes comuns...');
        
        // Verificar autenticação
        this.checkAuth();
        
        // Definir nome do usuário
        this.setUserInfo();
        
        // Configurar sidebar
        this.setupSidebar();
        
        // Configurar submenus
        this.setupSubmenus();
        
        // Configurar logout
        this.setupLogout();
        
        // Configurar logo placeholder
        this.setupLogoPlaceholder();
        
        // Configurar navegação
        this.setupNavigation();
    },
    
    // Verificar autenticação
    checkAuth: function() {
        if (!localStorage.getItem('kolibra_logged_in') && !sessionStorage.getItem('kolibra_logged_in')) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },
    
    // Definir nome do usuário
    setUserInfo: function() {
        const username = localStorage.getItem('kolibra_username') || sessionStorage.getItem('kolibra_username') || 'Admin';
        const userNameElement = document.getElementById('user-name');
        const userAvatarElement = document.getElementById('user-avatar');
        
        if (userNameElement) {
            userNameElement.textContent = username;
        }
        
        if (userAvatarElement) {
            userAvatarElement.textContent = username.charAt(0).toUpperCase();
        }
    },
    
    // Configurar toggle da sidebar
    setupSidebar: function() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
            });
        }
        
        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('mobile-open');
            });
        }
    },
    
    // Configurar submenus
    setupSubmenus: function() {
        const menuItems = document.querySelectorAll('.menu-item[data-toggle]');
        
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const submenuId = this.getAttribute('data-toggle');
                this.classList.toggle('expanded');
            });
        });
    },
    
    // Configurar logout
    setupLogout: function() {
        const logoutBtn = document.getElementById('logout-btn');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('kolibra_logged_in');
                localStorage.removeItem('kolibra_username');
                sessionStorage.removeItem('kolibra_logged_in');
                sessionStorage.removeItem('kolibra_username');
                window.location.href = 'login.html';
            });
        }
    },
    
    // Gerar logo placeholder se a imagem não existir
    setupLogoPlaceholder: function() {
        const logoPlaceholder = document.getElementById('logo-placeholder');
        
        if (logoPlaceholder) {
            logoPlaceholder.onerror = function() {
                this.onerror = null;
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDAgMTBDMjMuNDMgMTAgMTAgMjMuNDMgMTAgNDBDMTAgNTYuNTcgMjMuNDMgNzAgNDAgNzBDNTYuNTcgNzAgNzAgNTYuNTcgNzAgNDBDNzAgMjMuNDMgNTYuNTcgMTAgNDAgMTBaIiBmaWxsPSIjMDA0NDk0Ii8+PHBhdGggZD0iTTUwIDI1TDMwIDQwTDUwIDU1VjI1WiIgZmlsbD0iI0ZGN0YwMCIvPjwvc3ZnPg==';
            };
        }
    },
    
    // Configurar navegação entre páginas
    setupNavigation: function() {
        document.querySelectorAll('.menu-item, .submenu-item, .quick-action').forEach(item => {
            if (item.dataset.page) {
                item.addEventListener('click', function() {
                    const page = this.dataset.page;
                    if (page === 'dashboard') {
                        window.location.href = 'dashboard.html';
                    } else if (page === 'registro-vendas') {
                        window.location.href = 'registro-vendas.html';
                    } else if (page === 'lista-clientes') {
                        window.location.href = 'lista-clientes.html';
                    } else if (page === 'catalogo-servicos') {
                        window.location.href = 'catalogo-servicos.html';
                    } else if (page === 'metas') {
                        window.location.href = 'metas.html';
                    } else {
                        // Mostrar mensagem para páginas não implementadas
                        this.showAlert('Esta funcionalidade está em desenvolvimento e será implementada em breve.', 'info');
                    }
                }.bind(this));
            } else {
                // Adicionar alerta para itens de menu sem página definida
                if (!item.classList.contains('menu-item') || !item.hasAttribute('data-toggle')) {
                    item.addEventListener('click', function(e) {
                        this.showAlert('Esta funcionalidade está em desenvolvimento e será implementada em breve.', 'info');
                    }.bind(this));
                }
            }
        });
    },
    
    // Detectar página atual e inicializar componentes específicos
    initCurrentPage: function() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('dashboard.html') || document.title.includes('Dashboard')) {
            console.log('Inicializando página de Dashboard...');
            this.initDashboardPage();
        } else if (currentPath.includes('lista-clientes.html')) {
            console.log('Inicializando página de Clientes...');
            this.initClientesPage();
        } else if (currentPath.includes('registro-vendas.html')) {
            console.log('Inicializando página de Vendas...');
            this.initVendasPage();
        } else if (currentPath.includes('metas.html')) {
            console.log('Inicializando página de Metas...');
            this.initMetasPage();
        }
    },
    
    // ===== FUNÇÕES PARA DASHBOARD =====
    
    // Inicializar página de dashboard
    initDashboardPage: function() {
        console.log('Inicializando componentes do Dashboard...');
        
        // Atualizar estatísticas do dashboard
        this.updateDashboardStats();
        
        // Inicializar gráficos
        this.initDashboardCharts();
        
        // Atualizar lista de atividades recentes
        this.updateAtividadesRecentes();
    },
    
    // Atualizar estatísticas do dashboard
    updateDashboardStats: function() {
        console.log('Atualizando estatísticas do Dashboard...');
        
        try {
            // Calcular estatísticas
            const stats = this.calculateDashboardStats();
            
            // Atualizar valores
            const receitaElement = document.querySelector('.stats-card:nth-child(1) .stats-value');
            const vendasElement = document.querySelector('.stats-card:nth-child(2) .stats-value');
            const clientesElement = document.querySelector('.stats-card:nth-child(3) .stats-value');
            const projetosElement = document.querySelector('.stats-card:nth-child(4) .stats-value');
            
            if (receitaElement) receitaElement.textContent = this.formatCurrency(stats.receitaTotal);
            if (vendasElement) vendasElement.textContent = stats.vendasTotal;
            if (clientesElement) clientesElement.textContent = stats.clientesAtivos;
            if (projetosElement) projetosElement.textContent = stats.projetosAtivos;
            
            // Calcular percentuais
            const percentualReceita = stats.receitaTotal > 0 ? Math.min(Math.round((stats.receitaTotal / this.data.metas.receita) * 100), 100) : 0;
            const percentualVendas = stats.vendasTotal > 0 ? Math.min(Math.round((stats.vendasTotal / this.data.metas.vendas) * 100), 100) : 0;
            const percentualRetencao = stats.clientesAtivos > 0 ? Math.min(Math.round(this.data.metas.retencao), 100) : 0;
            const percentualConclusao = stats.projetosAtivos > 0 ? Math.min(Math.round(this.data.metas.conclusao / 2), 100) : 0;
            
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
            
            console.log('Estatísticas do Dashboard atualizadas com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar estatísticas do Dashboard:', error);
        }
    },
    
    // Calcular estatísticas para o dashboard
    calculateDashboardStats: function() {
        // Calcular receita total
        const receitaTotal = this.data.vendas.reduce((total, venda) => total + parseFloat(venda.valor || 0), 0);
        
        // Contar total de vendas
        const vendasTotal = this.data.vendas.length;
        
        // Obter clientes únicos
        const clientesUnicos = [...new Set(this.data.vendas.map(venda => venda.cliente))];
        const clientesAtivos = clientesUnicos.length;
        
        // Contar projetos em andamento
        const projetosAtivos = this.data.vendas.filter(venda => venda.status === 'Em andamento').length;
        
        return {
            receitaTotal,
            vendasTotal,
            clientesAtivos,
            projetosAtivos
        };
    },
    
    // Inicializar gráficos do dashboard
    initDashboardCharts: function() {
        console.log('Inicializando gráficos do Dashboard...');
        
        try {
            // Verificar se há vendas
            if (this.data.vendas.length === 0) {
                console.log('Nenhuma venda encontrada, mostrando mensagens de "sem dados"');
                
                // Mostrar mensagens de "sem dados"
                document.querySelectorAll('.no-data-message').forEach(el => {
                    el.style.display = 'flex';
                });
                
                // Ocultar gráficos
                document.querySelectorAll('.chart-container canvas').forEach(el => {
                    el.style.display = 'none';
                });
                
                return;
            }
            
            // Ocultar mensagens de "sem dados"
            document.querySelectorAll('.no-data-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Mostrar gráficos
            document.querySelectorAll('.chart-container canvas').forEach(el => {
                el.style.display = 'block';
            });
            
            // Inicializar gráficos
            this.initVendasPorServicoChart();
            this.initVendasPorSegmentoChart();
            
            console.log('Gráficos do Dashboard inicializados com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar gráficos do Dashboard:', error);
        }
    },
    
    // Inicializar gráfico de vendas por serviço
    initVendasPorServicoChart: function() {
        console.log('Inicializando gráfico de vendas por serviço...');
        
        try {
            // Agrupar vendas por serviço
            const vendasPorServico = {};
            
            this.data.vendas.forEach(venda => {
                if (venda.servico) {
                    if (vendasPorServico[venda.servico]) {
                        vendasPorServico[venda.servico] += parseFloat(venda.valor || 0);
                    } else {
                        vendasPorServico[venda.servico] = parseFloat(venda.valor || 0);
                    }
                }
            });
            
            // Preparar dados para o gráfico
            const labels = Object.keys(vendasPorServico);
            const data = Object.values(vendasPorServico);
            
            console.log('Dados do gráfico de serviços:', { labels, data });
            
            // Verificar se o elemento canvas existe
            const canvas = document.getElementById('servicosChart');
            if (!canvas) {
                console.error('Elemento canvas "servicosChart" não encontrado');
                return;
            }
            
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
                                    return label + ': ' + this.formatCurrency(value);
                                }.bind(this)
                            }
                        }
                    }
                }
            });
            
            console.log('Gráfico de vendas por serviço inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar gráfico de vendas por serviço:', error);
        }
    },
    
    // Inicializar gráfico de vendas por segmento
    initVendasPorSegmentoChart: function() {
        console.log('Inicializando gráfico de vendas por segmento...');
        
        try {
            // Agrupar vendas por segmento
            const vendasPorSegmento = {};
            
            this.data.vendas.forEach(venda => {
                if (venda.segmento) {
                    if (vendasPorSegmento[venda.segmento]) {
                        vendasPorSegmento[venda.segmento] += parseFloat(venda.valor || 0);
                    } else {
                        vendasPorSegmento[venda.segmento] = parseFloat(venda.valor || 0);
                    }
                }
            });
            
            // Preparar dados para o gráfico
            const labels = Object.keys(vendasPorSegmento);
            const data = Object.values(vendasPorSegmento);
            
            console.log('Dados do gráfico de segmentos:', { labels, data });
            
            // Verificar se o elemento canvas existe
            const canvas = document.getElementById('segmentosChart');
            if (!canvas) {
                console.error('Elemento canvas "segmentosChart" não encontrado');
                return;
            }
            
            // Cores para o gráfico
            const backgroundColors = [
                'rgba(0, 68, 148, 0.7)',
                'rgba(255, 127, 0, 0.7)',
                'rgba(76, 175, 80, 0.7)',
                'rgba(33, 150, 243, 0.7)',
                'rgba(255, 193, 7, 0.7)'
            ];
            
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
                                    return label + ': ' + this.formatCurrency(value);
                                }.bind(this)
                            }
                        }
                    }
                }
            });
            
            console.log('Gráfico de vendas por segmento inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar gráfico de vendas por segmento:', error);
        }
    },
    
    // Atualizar lista de atividades recentes
    updateAtividadesRecentes: function() {
        console.log('Atualizando lista de atividades recentes...');
        
        try {
            const activityList = document.querySelector('.activity-list');
            if (!activityList) {
                console.error('Elemento ".activity-list" não encontrado');
                return;
            }
            
            // Limpar lista atual
            activityList.innerHTML = '';
            
            // Se não houver vendas, mostrar mensagem
            if (this.data.vendas.length === 0) {
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
            const vendasRecentes = [...this.data.vendas].sort((a, b) => {
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
                if (venda.servico && venda.servico.includes('Marketing')) {
                    iconClass = 'success';
                } else if (venda.servico && venda.servico.includes('Design')) {
                    iconClass = 'info';
                } else if (venda.servico && venda.servico.includes('Suporte')) {
                    iconClass = 'warning';
                } else if (venda.servico && venda.servico.includes('Desenvolvimento')) {
                    iconClass = 'accent';
                }
                
                const timestamp = venda.timestamp || new Date(venda.data).toISOString();
                
                activityItem.innerHTML = `
                    <div class="activity-icon ${iconClass}">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Venda de ${venda.servico || 'Serviço'}</div>
                        <div class="activity-subtitle">Cliente: ${venda.cliente || 'Cliente'} - ${this.formatCurrency(venda.valor || 0)}</div>
                    </div>
                    <div class="activity-time">${this.formatTimeAgo(timestamp)}</div>
                `;
                
                activityList.appendChild(activityItem);
            });
            
            console.log('Lista de atividades recentes atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar lista de atividades recentes:', error);
        }
    },
    
    // ===== FUNÇÕES PARA CLIENTES =====
    
    // Inicializar página de clientes
    initClientesPage: function() {
        console.log('Inicializando componentes da página de Clientes...');
        
        // Inicializar formulário de cliente
        this.initFormularioCliente();
        
        // Renderizar tabela de clientes
        this.renderTabelaClientes();
    },
    
    // Inicializar formulário de cliente
    initFormularioCliente: function() {
        console.log('Inicializando formulário de cliente...');
        
        try {
            const form = document.getElementById('clienteForm');
            const limparBtn = document.getElementById('limparClienteBtn');
            
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Obter dados do formulário
                    const nome = document.getElementById('nomeCliente').value;
                    const segmento = document.getElementById('segmentoCliente').value;
                    const email = document.getElementById('emailCliente').value;
                    const telefone = document.getElementById('telefoneCliente').value;
                    const endereco = document.getElementById('enderecoCliente').value;
                    const observacoes = document.getElementById('observacoesCliente').value;
                    
                    // Validar campos obrigatórios
                    if (!nome || !segmento || !email || !telefone) {
                        this.showAlert('Por favor, preencha todos os campos obrigatórios.', 'danger');
                        return;
                    }
                    
                    // Criar objeto cliente
                    const cliente = {
                        nome,
                        segmento,
                        email,
                        telefone,
                        endereco,
                        observacoes
                    };
                    
                    // Verificar se é cadastro ou atualização
                    const submitBtn = document.querySelector('#clienteForm button[type="submit"]');
                    const mode = submitBtn.getAttribute('data-mode');
                    
                    if (mode === 'update') {
                        // Atualizar cliente existente
                        const id = parseInt(submitBtn.getAttribute('data-id'));
                        
                        if (this.updateCliente(id, cliente)) {
                            // Mostrar mensagem de sucesso
                            this.showAlert('Cliente atualizado com sucesso!', 'success');
                        } else {
                            // Mostrar mensagem de erro
                            this.showAlert('Erro ao atualizar cliente.', 'danger');
                        }
                        
                        // Resetar botão para modo de cadastro
                        submitBtn.textContent = 'Cadastrar Cliente';
                        submitBtn.removeAttribute('data-mode');
                        submitBtn.removeAttribute('data-id');
                    } else {
                        // Adicionar novo cliente
                        this.addCliente(cliente);
                        
                        // Mostrar mensagem de sucesso
                        this.showAlert('Cliente cadastrado com sucesso!', 'success');
                    }
                    
                    // Limpar formulário
                    form.reset();
                    
                    // Atualizar tabela
                    this.renderTabelaClientes();
                }.bind(this));
            }
            
            if (limparBtn) {
                limparBtn.addEventListener('click', function() {
                    // Limpar formulário
                    form.reset();
                    
                    // Resetar botão para modo de cadastro
                    const submitBtn = document.querySelector('#clienteForm button[type="submit"]');
                    submitBtn.textContent = 'Cadastrar Cliente';
                    submitBtn.removeAttribute('data-mode');
                    submitBtn.removeAttribute('data-id');
                });
            }
            
            console.log('Formulário de cliente inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar formulário de cliente:', error);
        }
    },
    
    // Adicionar novo cliente
    addCliente: function(cliente) {
        console.log('Adicionando novo cliente:', cliente);
        
        try {
            // Gerar ID único para o cliente
            cliente.id = Date.now();
            
            // Adicionar cliente à lista
            this.data.clientes.push(cliente);
            
            // Salvar dados
            this.saveData();
            
            console.log('Cliente adicionado com sucesso!');
            return cliente;
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error);
            return null;
        }
    },
    
    // Atualizar cliente existente
    updateCliente: function(id, clienteAtualizado) {
        console.log('Atualizando cliente:', id, clienteAtualizado);
        
        try {
            // Encontrar índice do cliente
            const index = this.data.clientes.findIndex(cliente => cliente.id === id);
            
            if (index !== -1) {
                // Manter o ID original
                clienteAtualizado.id = id;
                
                // Atualizar cliente
                this.data.clientes[index] = clienteAtualizado;
                
                // Salvar dados
                this.saveData();
                
                console.log('Cliente atualizado com sucesso!');
                return true;
            }
            
            console.log('Cliente não encontrado para atualização');
            return false;
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            return false;
        }
    },
    
    // Remover cliente
    removeCliente: function(id) {
        console.log('Removendo cliente:', id);
        
        try {
            // Filtrar cliente a ser removido
            const clientesFiltrados = this.data.clientes.filter(cliente => cliente.id !== id);
            
            // Verificar se algum cliente foi removido
            if (clientesFiltrados.length < this.data.clientes.length) {
                // Atualizar lista de clientes
                this.data.clientes = clientesFiltrados;
                
                // Salvar dados
                this.saveData();
                
                console.log('Cliente removido com sucesso!');
                return true;
            }
            
            console.log('Cliente não encontrado para remoção');
            return false;
        } catch (error) {
            console.error('Erro ao remover cliente:', error);
            return false;
        }
    },
    
    // Renderizar tabela de clientes
    renderTabelaClientes: function() {
        console.log('Renderizando tabela de clientes...');
        
        try {
            const tableBody = document.getElementById('clientesTableBody');
            const noClientesMessage = document.getElementById('noClientesMessage');
            
            if (!tableBody) {
                console.error('Elemento "clientesTableBody" não encontrado');
                return;
            }
            
            // Limpar tabela
            tableBody.innerHTML = '';
            
            // Verificar se há clientes
            if (this.data.clientes.length === 0) {
                // Mostrar mensagem de "sem clientes"
                if (noClientesMessage) {
                    noClientesMessage.style.display = 'flex';
                }
                return;
            }
            
            // Ocultar mensagem de "sem clientes"
            if (noClientesMessage) {
                noClientesMessage.style.display = 'none';
            }
            
            // Adicionar clientes à tabela
            this.data.clientes.forEach((cliente, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.segmento}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefone}</td>
                    <td>0</td>
                    <td>
                        <div class="action-btn edit" data-id="${cliente.id}">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="action-btn delete" data-id="${cliente.id}">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
            
            // Adicionar event listeners para botões de edição e exclusão
            document.querySelectorAll('.action-btn.edit').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    this.editarCliente(id);
                }.bind(this));
            });
            
            document.querySelectorAll('.action-btn.delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    this.excluirCliente(id);
                }.bind(this));
            });
            
            console.log('Tabela de clientes renderizada com sucesso!');
        } catch (error) {
            console.error('Erro ao renderizar tabela de clientes:', error);
        }
    },
    
    // Função para editar cliente
    editarCliente: function(id) {
        console.log('Editando cliente:', id);
        
        try {
            const cliente = this.data.clientes.find(c => c.id === id);
            
            if (cliente) {
                // Preencher formulário com dados do cliente
                document.getElementById('nomeCliente').value = cliente.nome;
                document.getElementById('segmentoCliente').value = cliente.segmento;
                document.getElementById('emailCliente').value = cliente.email;
                document.getElementById('telefoneCliente').value = cliente.telefone;
                document.getElementById('enderecoCliente').value = cliente.endereco || '';
                document.getElementById('observacoesCliente').value = cliente.observacoes || '';
                
                // Alterar botão de cadastro para atualização
                const submitBtn = document.querySelector('#clienteForm button[type="submit"]');
                submitBtn.textContent = 'Atualizar Cliente';
                submitBtn.setAttribute('data-mode', 'update');
                submitBtn.setAttribute('data-id', id);
                
                console.log('Formulário preenchido para edição');
            } else {
                console.error('Cliente não encontrado para edição');
            }
        } catch (error) {
            console.error('Erro ao editar cliente:', error);
        }
    },
    
    // Função para excluir cliente
    excluirCliente: function(id) {
        console.log('Excluindo cliente:', id);
        
        try {
            if (confirm('Tem certeza que deseja excluir este cliente?')) {
                if (this.removeCliente(id)) {
                    // Atualizar tabela
                    this.renderTabelaClientes();
                    
                    // Mostrar mensagem de sucesso
                    this.showAlert('Cliente excluído com sucesso!', 'success');
                } else {
                    // Mostrar mensagem de erro
                    this.showAlert('Erro ao excluir cliente.', 'danger');
                }
            }
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    },
    
    // ===== FUNÇÕES PARA VENDAS =====
    
    // Inicializar página de vendas
    initVendasPage: function() {
        console.log('Inicializando componentes da página de Vendas...');
        
        // Inicializar formulário de venda
        this.initFormularioVenda();
        
        // Renderizar tabela de vendas
        this.renderTabelaVendas();
    },
    
    // Inicializar formulário de venda
    initFormularioVenda: function() {
        console.log('Inicializando formulário de venda...');
        
        try {
            const form = document.getElementById('vendaForm');
            const limparBtn = document.getElementById('limparBtn');
            
            // Preencher select de clientes
            this.preencherSelectClientes();
            
            // Definir data atual como padrão
            const dataInput = document.getElementById('data');
            if (dataInput) {
                dataInput.value = this.getCurrentDateFormatted();
            }
            
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Obter dados do formulário
                    const cliente = document.getElementById('cliente').value;
                    const servico = document.getElementById('servico').value;
                    const valor = parseFloat(document.getElementById('valor').value);
                    const data = document.getElementById('data').value;
                    const segmento = document.getElementById('segmento').value;
                    const status = document.getElementById('status').value;
                    const observacoes = document.getElementById('observacoes').value;
                    
                    // Validar campos obrigatórios
                    if (!cliente || !servico || isNaN(valor) || !data || !segmento || !status) {
                        this.showAlert('Por favor, preencha todos os campos obrigatórios.', 'danger');
                        return;
                    }
                    
                    // Criar objeto venda
                    const venda = {
                        cliente,
                        servico,
                        valor,
                        data,
                        segmento,
                        status,
                        observacoes
                    };
                    
                    // Verificar se é registro ou atualização
                    const submitBtn = document.querySelector('#vendaForm button[type="submit"]');
                    const mode = submitBtn.getAttribute('data-mode');
                    
                    if (mode === 'update') {
                        // Atualizar venda existente
                        const id = parseInt(submitBtn.getAttribute('data-id'));
                        
                        if (this.updateVenda(id, venda)) {
                            // Mostrar mensagem de sucesso
                            this.showAlert('Venda atualizada com sucesso!', 'success');
                        } else {
                            // Mostrar mensagem de erro
                            this.showAlert('Erro ao atualizar venda.', 'danger');
                        }
                        
                        // Resetar botão para modo de registro
                        submitBtn.textContent = 'Registrar Venda';
                        submitBtn.removeAttribute('data-mode');
                        submitBtn.removeAttribute('data-id');
                    } else {
                        // Adicionar nova venda
                        this.addVenda(venda);
                        
                        // Mostrar mensagem de sucesso
                        this.showAlert('Venda registrada com sucesso!', 'success');
                    }
                    
                    // Limpar formulário
                    form.reset();
                    
                    // Redefinir data atual
                    if (dataInput) {
                        dataInput.value = this.getCurrentDateFormatted();
                    }
                    
                    // Atualizar tabela
                    this.renderTabelaVendas();
                }.bind(this));
            }
            
            if (limparBtn) {
                limparBtn.addEventListener('click', function() {
                    // Limpar formulário
                    form.reset();
                    
                    // Redefinir data atual
                    if (dataInput) {
                        dataInput.value = this.getCurrentDateFormatted();
                    }
                    
                    // Resetar botão para modo de registro
                    const submitBtn = document.querySelector('#vendaForm button[type="submit"]');
                    submitBtn.textContent = 'Registrar Venda';
                    submitBtn.removeAttribute('data-mode');
                    submitBtn.removeAttribute('data-id');
                }.bind(this));
            }
            
            console.log('Formulário de venda inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar formulário de venda:', error);
        }
    },
    
    // Preencher select de clientes
    preencherSelectClientes: function() {
        console.log('Preenchendo select de clientes...');
        
        try {
            const clienteSelect = document.getElementById('cliente');
            
            if (clienteSelect) {
                // Manter a opção padrão
                const defaultOption = clienteSelect.options[0];
                clienteSelect.innerHTML = '';
                clienteSelect.appendChild(defaultOption);
                
                // Adicionar clientes ao select
                this.data.clientes.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.nome;
                    option.textContent = cliente.nome;
                    clienteSelect.appendChild(option);
                });
                
                console.log('Select de clientes preenchido com sucesso!');
            } else {
                console.error('Elemento "cliente" não encontrado');
            }
        } catch (error) {
            console.error('Erro ao preencher select de clientes:', error);
        }
    },
    
    // Adicionar nova venda
    addVenda: function(venda) {
        console.log('Adicionando nova venda:', venda);
        
        try {
            // Gerar ID único para a venda
            venda.id = Date.now();
            
            // Adicionar timestamp
            venda.timestamp = new Date().toISOString();
            
            // Adicionar venda à lista
            this.data.vendas.push(venda);
            
            // Salvar dados
            this.saveData();
            
            console.log('Venda adicionada com sucesso!');
            return venda;
        } catch (error) {
            console.error('Erro ao adicionar venda:', error);
            return null;
        }
    },
    
    // Atualizar venda existente
    updateVenda: function(id, vendaAtualizada) {
        console.log('Atualizando venda:', id, vendaAtualizada);
        
        try {
            // Encontrar índice da venda
            const index = this.data.vendas.findIndex(venda => venda.id === id);
            
            if (index !== -1) {
                // Manter o ID e timestamp originais
                vendaAtualizada.id = id;
                vendaAtualizada.timestamp = this.data.vendas[index].timestamp;
                
                // Atualizar venda
                this.data.vendas[index] = vendaAtualizada;
                
                // Salvar dados
                this.saveData();
                
                console.log('Venda atualizada com sucesso!');
                return true;
            }
            
            console.log('Venda não encontrada para atualização');
            return false;
        } catch (error) {
            console.error('Erro ao atualizar venda:', error);
            return false;
        }
    },
    
    // Remover venda
    removeVenda: function(id) {
        console.log('Removendo venda:', id);
        
        try {
            // Filtrar venda a ser removida
            const vendasFiltradas = this.data.vendas.filter(venda => venda.id !== id);
            
            // Verificar se alguma venda foi removida
            if (vendasFiltradas.length < this.data.vendas.length) {
                // Atualizar lista de vendas
                this.data.vendas = vendasFiltradas;
                
                // Salvar dados
                this.saveData();
                
                console.log('Venda removida com sucesso!');
                return true;
            }
            
            console.log('Venda não encontrada para remoção');
            return false;
        } catch (error) {
            console.error('Erro ao remover venda:', error);
            return false;
        }
    },
    
    // Renderizar tabela de vendas
    renderTabelaVendas: function() {
        console.log('Renderizando tabela de vendas...');
        
        try {
            const tableBody = document.getElementById('vendasTableBody');
            const noVendasMessage = document.getElementById('noVendasMessage');
            
            if (!tableBody) {
                console.error('Elemento "vendasTableBody" não encontrado');
                return;
            }
            
            // Limpar tabela
            tableBody.innerHTML = '';
            
            // Verificar se há vendas
            if (this.data.vendas.length === 0) {
                // Mostrar mensagem de "sem vendas"
                if (noVendasMessage) {
                    noVendasMessage.style.display = 'flex';
                }
                return;
            }
            
            // Ocultar mensagem de "sem vendas"
            if (noVendasMessage) {
                noVendasMessage.style.display = 'none';
            }
            
            // Adicionar vendas à tabela
            this.data.vendas.forEach((venda, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${venda.id}</td>
                    <td>${this.formatDate(venda.data)}</td>
                    <td>${venda.cliente}</td>
                    <td>${venda.servico}</td>
                    <td>${venda.segmento}</td>
                    <td>${this.formatCurrency(venda.valor)}</td>
                    <td>${venda.status}</td>
                    <td>
                        <div class="action-btn edit" data-id="${venda.id}">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="action-btn delete" data-id="${venda.id}">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
            
            // Adicionar event listeners para botões de edição e exclusão
            document.querySelectorAll('.action-btn.edit').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    this.editarVenda(id);
                }.bind(this));
            });
            
            document.querySelectorAll('.action-btn.delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    this.excluirVenda(id);
                }.bind(this));
            });
            
            console.log('Tabela de vendas renderizada com sucesso!');
        } catch (error) {
            console.error('Erro ao renderizar tabela de vendas:', error);
        }
    },
    
    // Função para editar venda
    editarVenda: function(id) {
        console.log('Editando venda:', id);
        
        try {
            const venda = this.data.vendas.find(v => v.id === id);
            
            if (venda) {
                // Preencher formulário com dados da venda
                document.getElementById('cliente').value = venda.cliente;
                document.getElementById('servico').value = venda.servico;
                document.getElementById('valor').value = venda.valor;
                document.getElementById('data').value = venda.data;
                document.getElementById('segmento').value = venda.segmento;
                document.getElementById('status').value = venda.status;
                document.getElementById('observacoes').value = venda.observacoes || '';
                
                // Alterar botão de registro para atualização
                const submitBtn = document.querySelector('#vendaForm button[type="submit"]');
                submitBtn.textContent = 'Atualizar Venda';
                submitBtn.setAttribute('data-mode', 'update');
                submitBtn.setAttribute('data-id', id);
                
                console.log('Formulário preenchido para edição');
            } else {
                console.error('Venda não encontrada para edição');
            }
        } catch (error) {
            console.error('Erro ao editar venda:', error);
        }
    },
    
    // Função para excluir venda
    excluirVenda: function(id) {
        console.log('Excluindo venda:', id);
        
        try {
            if (confirm('Tem certeza que deseja excluir esta venda?')) {
                if (this.removeVenda(id)) {
                    // Atualizar tabela
                    this.renderTabelaVendas();
                    
                    // Mostrar mensagem de sucesso
                    this.showAlert('Venda excluída com sucesso!', 'success');
                    
                    // Atualizar dashboard se estiver na página
                    if (document.title.includes('Dashboard')) {
                        this.updateDashboardStats();
                        this.initDashboardCharts();
                        this.updateAtividadesRecentes();
                    }
                } else {
                    // Mostrar mensagem de erro
                    this.showAlert('Erro ao excluir venda.', 'danger');
                }
            }
        } catch (error) {
            console.error('Erro ao excluir venda:', error);
        }
    },
    
    // ===== FUNÇÕES PARA METAS =====
    
    // Inicializar página de metas
    initMetasPage: function() {
        console.log('Inicializando componentes da página de Metas...');
        
        // Implementar funcionalidades de metas aqui
    },
    
    // ===== FUNÇÕES UTILITÁRIAS =====
    
    // Formatar valor monetário
    formatCurrency: function(value) {
        try {
            return 'R$ ' + parseFloat(value).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        } catch (error) {
            console.error('Erro ao formatar moeda:', error);
            return 'R$ 0,00';
        }
    },
    
    // Formatar data
    formatDate: function(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return 'Data inválida';
        }
    },
    
    // Obter data atual formatada para input date
    getCurrentDateFormatted: function() {
        try {
            const hoje = new Date();
            return hoje.toISOString().split('T')[0];
        } catch (error) {
            console.error('Erro ao obter data atual formatada:', error);
            return '';
        }
    },
    
    // Calcular data futura (em dias)
    getFutureDateFormatted: function(days) {
        try {
            const date = new Date();
            date.setDate(date.getDate() + days);
            return date.toISOString().split('T')[0];
        } catch (error) {
            console.error('Erro ao calcular data futura:', error);
            return '';
        }
    },
    
    // Formatar tempo relativo
    formatTimeAgo: function(timestamp) {
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
                return this.formatDate(date);
            }
        } catch (error) {
            console.error('Erro ao formatar tempo relativo:', error);
            return 'Data desconhecida';
        }
    },
    
    // Mostrar alerta
    showAlert: function(message, type = 'success', duration = 3000) {
        try {
            const alertContainer = document.createElement('div');
            alertContainer.className = `alert alert-${type}`;
            alertContainer.style.position = 'fixed';
            alertContainer.style.top = '20px';
            alertContainer.style.right = '20px';
            alertContainer.style.zIndex = '9999';
            alertContainer.style.minWidth = '300px';
            alertContainer.style.padding = '15px 20px';
            alertContainer.style.borderRadius = '10px';
            alertContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            alertContainer.style.opacity = '0';
            alertContainer.style.transform = 'translateY(-20px)';
            alertContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            alertContainer.textContent = message;
            
            document.body.appendChild(alertContainer);
            
            // Mostrar alerta com animação
            setTimeout(() => {
                alertContainer.style.opacity = '1';
                alertContainer.style.transform = 'translateY(0)';
            }, 10);
            
            // Remover alerta após duração
            setTimeout(() => {
                alertContainer.style.opacity = '0';
                alertContainer.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    document.body.removeChild(alertContainer);
                }, 300);
            }, duration);
        } catch (error) {
            console.error('Erro ao mostrar alerta:', error);
        }
    }
};

// Inicializar aplicativo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando Kolibra Dashboard...');
    
    // Inicializar aplicativo
    window.Kolibra.init();
});
