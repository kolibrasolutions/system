# Estrutura do Dashboard Administrativo da Kolibra Solutions

## Visão Geral

Este documento define a estrutura e os componentes do dashboard administrativo para a Kolibra Solutions, uma empresa de transformação digital para pequenos e médios negócios. O dashboard será desenvolvido com base no template fornecido, adaptando-o para criar uma interface administrativa com sistema de login que permitirá o acompanhamento de vendas, metas e outras métricas importantes para a gestão do negócio.

## Objetivos do Dashboard

1. Fornecer uma visão centralizada do desempenho da empresa
2. Permitir o acompanhamento de vendas em relação às metas estabelecidas
3. Facilitar a gestão de clientes e projetos
4. Oferecer insights sobre o desempenho por segmento e tipo de serviço
5. Proteger informações sensíveis através de um sistema de autenticação

## Sistema de Autenticação

### Página de Login
- Formulário de login com campos para usuário e senha
- Opção "Lembrar-me" para manter a sessão ativa
- Validação de credenciais com feedback visual
- Proteção contra tentativas excessivas de login
- Design alinhado com a identidade visual da Kolibra (cores azul #004494 e laranja #FF7F00)

### Gerenciamento de Usuários
- Suporte para múltiplos usuários (proprietário e futuros colaboradores)
- Níveis de acesso diferenciados (administrador e usuário padrão)
- Funcionalidade para adicionar novos usuários (exclusiva para administrador)
- Opção para redefinição de senha

## Estrutura de Navegação

### Barra Lateral (Sidebar)
- Logo da Kolibra Solutions
- Menu de navegação principal
- Informações do usuário logado
- Botão de logout

### Menu Principal
1. **Dashboard** (página inicial)
2. **Vendas**
   - Registro de Vendas
   - Acompanhamento de Metas
   - Análise por Serviço
3. **Clientes**
   - Lista de Clientes
   - Segmentação
   - Projetos Ativos
4. **Serviços**
   - Catálogo de Serviços
   - Preços e Margens
5. **Marketing**
   - Calendário de Conteúdo
   - Desempenho de Canais
6. **Finanças**
   - Receitas e Despesas
   - Projeções
7. **Configurações**
   - Perfil
   - Usuários
   - Preferências

## Componentes do Dashboard Principal

### 1. Resumo de Desempenho
- **Card de Receita Mensal**: Valor atual vs. meta (com indicador visual de progresso)
- **Card de Vendas do Mês**: Número de projetos vendidos vs. meta
- **Card de Clientes Ativos**: Total de clientes ativos
- **Card de Receita Recorrente**: Valor atual de receita mensal recorrente

### 2. Gráfico de Evolução de Vendas
- Gráfico de linha mostrando a evolução das vendas nos últimos 12 meses
- Opção para filtrar por tipo de serviço (Sites, Branding, Kits, Suporte)
- Linha de referência indicando as metas mensais
- Indicador visual de porcentagem atingida da meta

### 3. Distribuição de Vendas por Serviço
- Gráfico de pizza/donut mostrando a distribuição de vendas por categoria de serviço
- Detalhamento ao passar o mouse sobre cada segmento
- Comparativo com a distribuição ideal conforme estratégia da empresa

### 4. Progresso das Metas Anuais
- Barras de progresso para cada categoria de serviço:
  - Sites (básico, intermediário, avançado)
  - Branding e Kits
  - Suporte Mensal
- Indicador visual de porcentagem concluída
- Projeção de atingimento com base no ritmo atual

### 5. Vendas por Segmento
- Gráfico de barras mostrando vendas por segmento prioritário:
  - Profissionais de Beleza e Estética
  - Terapias e Bem-estar
  - Serviços Domésticos Especializados
  - Gastronomia
- Comparativo com metas de distribuição equilibrada entre segmentos

### 6. Atividades Recentes
- Lista das últimas vendas registradas
- Projetos recentemente concluídos
- Novos clientes adicionados
- Renovações de suporte mensal

## Página de Registro de Vendas

### Formulário de Registro
- Campo para seleção de cliente (existente ou novo)
- Seleção de tipo de serviço
- Detalhes específicos do serviço
- Valor da venda
- Data de início e prazo de entrega
- Condições de pagamento
- Observações

### Tabela de Vendas
- Lista de todas as vendas registradas
- Filtros por período, tipo de serviço, segmento e status
- Opções para editar ou excluir registros
- Exportação de dados para CSV

## Página de Acompanhamento de Metas

### Metas Mensais
- Tabela detalhada com metas para cada mês do ano
- Valores atuais vs. metas para cada categoria de serviço
- Indicadores visuais de progresso
- Gráfico de barras comparando desempenho atual com metas

### Projeções
- Projeção de receita para os próximos meses
- Análise de tendências
- Alertas para categorias abaixo da meta
- Recomendações para ajustes de estratégia

## Página de Clientes

### Lista de Clientes
- Tabela com todos os clientes cadastrados
- Informações de contato
- Segmento do cliente
- Serviços contratados
- Valor total investido
- Status (ativo, inativo, prospecto)

### Detalhes do Cliente
- Histórico de compras
- Projetos em andamento
- Oportunidades de upsell
- Notas e observações

## Página de Serviços

### Catálogo de Serviços
- Lista de todos os serviços oferecidos
- Preços atuais
- Margens de lucro
- Tempo médio de produção
- Número de vendas por serviço

### Análise de Desempenho
- Serviços mais vendidos
- Serviços mais lucrativos
- Oportunidades de otimização

## Página de Marketing

### Calendário de Conteúdo
- Visualização de calendário com planejamento de conteúdo
- Integração com a estratégia de conteúdo da Kolibra
- Temas recorrentes por dia da semana
- Status de produção e publicação

### Desempenho de Canais
- Métricas de desempenho para cada canal (Instagram, Blog, TikTok, WhatsApp)
- Análise de engajamento
- Conversões geradas

## Página de Finanças

### Receitas e Despesas
- Visão geral das finanças
- Gráfico de receitas vs. despesas
- Análise de lucratividade por serviço
- Projeções financeiras

## Responsividade e Adaptação Mobile

- Design responsivo para acesso em diferentes dispositivos
- Layout otimizado para smartphones e tablets
- Funcionalidades essenciais acessíveis em dispositivos móveis

## Identidade Visual

- Utilização das cores corporativas da Kolibra:
  - Azul (#004494): Elementos principais, cabeçalhos
  - Laranja (#FF7F00): Destaques, botões de ação
  - Branco: Textos e áreas de conteúdo
- Efeitos visuais modernos adaptados do template original
- Tipografia consistente com a identidade da marca

## Funcionalidades Técnicas

- Armazenamento local de dados (localStorage)
- Exportação de relatórios em PDF e CSV
- Notificações para metas próximas de serem atingidas
- Backup automático de dados

## Próximos Passos

1. Desenvolver o sistema de autenticação
2. Implementar a interface base do dashboard
3. Integrar as informações da documentação da empresa
4. Adicionar as funcionalidades administrativas
5. Testar o sistema completo
6. Implantar e entregar ao usuário
