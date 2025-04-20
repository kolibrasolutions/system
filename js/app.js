/**
 * Funções JavaScript para o cadastro de clientes, registro de vendas e dashboard
 * Kolibra Dashboard - Versão corrigida
 */

// Inicializar dados do localStorage se não existirem
function initLocalStorage() {
    // Inicializar clientes
    if (!localStorage.getItem('kolibra_clientes')) {
        localStorage.setItem('kolibra_clientes', JSON.stringify([]));
    }
    
    // Inicializar vendas
    if (!localStorage.getItem('kolibra_vendas')) {
        localStorage.setItem('kolibra_vendas', JSON.stringify([]));
    }
}

// ===== FUNÇÕES PARA CLIENTES =====

// Obter lista de clientes
function getClientes() {
    const clientes = localStorage.getItem('kolibra_clientes');
    return clientes ? JSON.parse(clientes) : [];
}

// Adicionar novo cliente
function addCliente(cliente) {
    const clientes = getClientes();
    
    // Gerar ID único para o cliente
    cliente.id = Date.now();
    
    // Adicionar cliente à lista
    clientes.push(cliente);
    
    // Salvar no localStorage
    localStorage.setItem('kolibra_clientes', JSON.stringify(clientes));
    
    return cliente;
}

// Atualizar cliente existente
function updateCliente(id, clienteAtualizado) {
    const clientes = getClientes();
    
    // Encontrar índice do cliente
    const index = clientes.findIndex(cliente => cliente.id === id);
    
    if (index !== -1) {
        // Manter o ID original
        clienteAtualizado.id = id;
        
        // Atualizar cliente
        clientes[index] = clienteAtualizado;
        
        // Salvar no localStorage
        localStorage.setItem('kolibra_clientes', JSON.stringify(clientes));
        
        return true;
    }
    
    return false;
}

// Remover cliente
function removeCliente(id) {
    const clientes = getClientes();
    
    // Filtrar cliente a ser removido
    const clientesFiltrados = clientes.filter(cliente => cliente.id !== id);
    
    // Verificar se algum cliente foi removido
    if (clientesFiltrados.length < clientes.length) {
        // Salvar no localStorage
        localStorage.setItem('kolibra_clientes', JSON.stringify(clientesFiltrados));
        return true;
    }
    
    return false;
}

// Renderizar tabela de clientes
function renderTabelaClientes() {
    const clientes = getClientes();
    const tableBody = document.getElementById('clientesTableBody');
    const noClientesMessage = document.getElementById('noClientesMessage');
    
    // Limpar tabela
    tableBody.innerHTML = '';
    
    // Verificar se há clientes
    if (clientes.length === 0) {
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
    clientes.forEach((cliente, index) => {
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
            editarCliente(id);
        });
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            excluirCliente(id);
        });
    });
}

// Função para editar cliente
function editarCliente(id) {
    const clientes = getClientes();
    const cliente = clientes.find(c => c.id === id);
    
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
    }
}

// Função para excluir cliente
function excluirCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        if (removeCliente(id)) {
            // Atualizar tabela
            renderTabelaClientes();
            
            // Mostrar mensagem de sucesso
            KolibraUtils.showAlert('Cliente excluído com sucesso!', 'success');
        } else {
            // Mostrar mensagem de erro
            KolibraUtils.showAlert('Erro ao excluir cliente.', 'danger');
        }
    }
}

// Inicializar formulário de cliente
function initFormularioCliente() {
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
                KolibraUtils.showAlert('Por favor, preencha todos os campos obrigatórios.', 'danger');
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
                
                if (updateCliente(id, cliente)) {
                    // Mostrar mensagem de sucesso
                    KolibraUtils.showAlert('Cliente atualizado com sucesso!', 'success');
                } else {
                    // Mostrar mensagem de erro
                    KolibraUtils.showAlert('Erro ao atualizar cliente.', 'danger');
                }
                
                // Resetar botão para modo de cadastro
                submitBtn.textContent = 'Cadastrar Cliente';
                submitBtn.removeAttribute('data-mode');
                submitBtn.removeAttribute('data-id');
            } else {
                // Adicionar novo cliente
                addCliente(cliente);
                
                // Mostrar mensagem de sucesso
                KolibraUtils.showAlert('Cliente cadastrado com sucesso!', 'success');
            }
            
            // Limpar formulário
            form.reset();
            
            // Atualizar tabela
            renderTabelaClientes();
        });
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
}

// ===== FUNÇÕES PARA VENDAS =====

// Obter lista de vendas
function getVendas() {
    const vendas = localStorage.getItem('kolibra_vendas');
    return vendas ? JSON.parse(vendas) : [];
}

// Adicionar nova venda
function addVenda(venda) {
    const vendas = getVendas();
    
    // Gerar ID único para a venda
    venda.id = Date.now();
    
    // Adicionar timestamp
    venda.timestamp = new Date().toISOString();
    
    // Adicionar venda à lista
    vendas.push(venda);
    
    // Salvar no localStorage
    localStorage.setItem('kolibra_vendas', JSON.stringify(vendas));
    
    return venda;
}

// Atualizar venda existente
function updateVenda(id, vendaAtualizada) {
    const vendas = getVendas();
    
    // Encontrar índice da venda
    const index = vendas.findIndex(venda => venda.id === id);
    
    if (index !== -1) {
        // Manter o ID e timestamp originais
        vendaAtualizada.id = id;
        vendaAtualizada.timestamp = vendas[index].timestamp;
        
        // Atualizar venda
        vendas[index] = vendaAtualizada;
        
        // Salvar no localStorage
        localStorage.setItem('kolibra_vendas', JSON.stringify(vendas));
        
        return true;
    }
    
    return false;
}

// Remover venda
function removeVenda(id) {
    const vendas = getVendas();
    
    // Filtrar venda a ser removida
    const vendasFiltradas = vendas.filter(venda => venda.id !== id);
    
    // Verificar se alguma venda foi removida
    if (vendasFiltradas.length < vendas.length) {
        // Salvar no localStorage
        localStorage.setItem('kolibra_vendas', JSON.stringify(vendasFiltradas));
        return true;
    }
    
    return false;
}

// Renderizar tabela de vendas
function renderTabelaVendas() {
    const vendas = getVendas();
    const tableBody = document.getElementById('vendasTableBody');
    const noVendasMessage = document.getElementById('noVendasMessage');
    
    // Limpar tabela
    tableBody.innerHTML = '';
    
    // Verificar se há vendas
    if (vendas.length === 0) {
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
    vendas.forEach((venda, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${venda.id}</td>
            <td>${KolibraUtils.formatDate(venda.data)}</td>
            <td>${venda.cliente}</td>
            <td>${venda.servico}</td>
            <td>${venda.segmento}</td>
            <td>${KolibraUtils.formatCurrency(venda.valor)}</td>
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
            editarVenda(id);
        });
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            excluirVenda(id);
        });
    });
}

// Função para editar venda
function editarVenda(id) {
    const vendas = getVendas();
    const venda = vendas.find(v => v.id === id);
    
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
    }
}

// Função para excluir venda
function excluirVenda(id) {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
        if (removeVenda(id)) {
            // Atualizar tabela
            renderTabelaVendas();
            
            // Mostrar mensagem de sucesso
            KolibraUtils.showAlert('Venda excluída com sucesso!', 'success');
            
            // Atualizar dashboard se estiver na página
            if (window.initDashboardCharts) {
                window.initDashboardCharts();
            }
        } else {
            // Mostrar mensagem de erro
            KolibraUtils.showAlert('Erro ao excluir venda.', 'danger');
        }
    }
}

// Preencher select de clientes
function preencherSelectClientes() {
    const clienteSelect = document.getElementById('cliente');
    
    if (clienteSelect) {
        const clientes = getClientes();
        
        // Manter a opção padrão
        const defaultOption = clienteSelect.options[0];
        clienteSelect.innerHTML = '';
        clienteSelect.appendChild(defaultOption);
        
        // Adicionar clientes ao select
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.nome;
            option.textContent = cliente.nome;
            clienteSelect.appendChild(option);
        });
    }
}

// Inicializar formulário de venda
function initFormularioVenda() {
    const form = document.getElementById('vendaForm');
    const limparBtn = document.getElementById('limparBtn');
    
    // Preencher select de clientes
    preencherSelectClientes();
    
    // Definir data atual como padrão
    const dataInput = document.getElementById('data');
    if (dataInput) {
        dataInput.value = KolibraUtils.getCurrentDateFormatted();
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
                KolibraUtils.showAlert('Por favor, preencha todos os campos obrigatórios.', 'danger');
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
                
                if (updateVenda(id, venda)) {
                    // Mostrar mensagem de sucesso
                    KolibraUtils.showAlert('Venda atualizada com sucesso!', 'success');
                } else {
                    // Mostrar mensagem de erro
                    KolibraUtils.showAlert('Erro ao atualizar venda.', 'danger');
                }
                
                // Resetar botão para modo de registro
                submitBtn.textContent = 'Registrar Venda';
                submitBtn.removeAttribute('data-mode');
                submitBtn.removeAttribute('data-id');
            } else {
                // Adicionar nova venda
                addVenda(venda);
                
                // Mostrar mensagem de sucesso
                KolibraUtils.showAlert('Venda registrada com sucesso!', 'success');
            }
            
            // Limpar formulário
            form.reset();
            
            // Redefinir data atual
            if (dataInput) {
                dataInput.value = KolibraUtils.getCurrentDateFormatted();
            }
            
            // Atualizar tabela
            renderTabelaVendas();
            
            // Atualizar dashboard se estiver na página
            if (window.initDashboardCharts) {
                window.initDashboardCharts();
            }
        });
    }
    
    if (limparBtn) {
        limparBtn.addEventListener('click', function() {
            // Limpar formulário
            form.reset();
            
            // Redefinir data atual
            if (dataInput) {
                dataInput.value = KolibraUtils.getCurrentDateFormatted();
            }
            
            // Resetar botão para modo de registro
            const submitBtn = document.querySelector('#vendaForm button[type="submit"]');
            submitBtn.textContent = 'Registrar Venda';
            submitBtn.removeAttribute('data-mode');
            submitBtn.removeAttribute('data-id');
        });
    }
}

// ===== INICIALIZAÇÃO =====

// Inicializar página de clientes
function initPaginaClientes() {
    // Inicializar localStorage
    initLocalStorage();
    
    // Inicializar componentes comuns
    KolibraUtils.initCommonComponents();
    
    // Inicializar formulário de cliente
    initFormularioCliente();
    
    // Renderizar tabela de clientes
    renderTabelaClientes();
}

// Inicializar página de vendas
function initPaginaVendas() {
    // Inicializar localStorage
    initLocalStorage();
    
    // Inicializar componentes comuns
    KolibraUtils.initCommonComponents();
    
    // Inicializar formulário de venda
    initFormularioVenda();
    
    // Renderizar tabela de vendas
    renderTabelaVendas();
}

// Inicializar página de dashboard
function initPaginaDashboard() {
    // Inicializar localStorage
    initLocalStorage();
    
    // Inicializar componentes comuns
    KolibraUtils.initCommonComponents();
    
    // Inicializar gráficos do dashboard
    if (window.initDashboardCharts) {
        window.initDashboardCharts();
    }
}

// Detectar página atual e inicializar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar localStorage
    initLocalStorage();
    
    // Detectar página atual
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('lista-clientes.html')) {
        initPaginaClientes();
    } else if (currentPath.includes('registro-vendas.html')) {
        initPaginaVendas();
    } else if (currentPath.includes('dashboard.html')) {
        initPaginaDashboard();
    } else {
        // Inicializar componentes comuns para outras páginas
        KolibraUtils.initCommonComponents();
    }
});

// Exportar funções
window.KolibraApp = {
    getClientes,
    addCliente,
    updateCliente,
    removeCliente,
    getVendas,
    addVenda,
    updateVenda,
    removeVenda,
    renderTabelaClientes,
    renderTabelaVendas,
    preencherSelectClientes
};
