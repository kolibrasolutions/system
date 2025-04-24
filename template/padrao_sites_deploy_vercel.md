# Guia de Padrões para Criação de Sites com Deploy na Vercel

Este documento contém os padrões e melhores práticas identificados nos sites que foram implementados com sucesso e tiveram deploy correto na Vercel. Seguindo estas diretrizes, você poderá solicitar a criação de novos sites com maior probabilidade de funcionamento correto na primeira tentativa.

## Estrutura de Arquivos Padrão

```
site-projeto/
│
├── public/                  # Diretório principal para deploy na Vercel
│   ├── index.html           # Página inicial do site
│   ├── css/                 # Diretório para arquivos CSS
│   │   ├── style.css        # Estilos principais
│   │   ├── responsive.css   # Estilos para responsividade
│   │   └── animations.css   # Animações e efeitos visuais
│   │
│   ├── js/                  # Diretório para arquivos JavaScript
│   │   ├── main.js          # Funções principais
│   │   └── animations.js    # Scripts para animações
│   │
│   ├── img/                 # Diretório para imagens
│   │   └── produtos/        # Subdiretório para imagens de produtos (se aplicável)
│   │
│   └── [outras-paginas].html # Páginas adicionais do site
│
└── README.md                # Documentação do projeto
```

## Padrões HTML

### Estrutura Básica HTML

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nome do Site</title>
    
    <!-- Fontes -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome (para ícones) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Estilos CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/animations.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="container">
            <div class="logo">
                <a href="index.html">
                    <img src="img/logo.png" alt="Logo">
                </a>
            </div>
            
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link active">Home</a></li>
                <li><a href="#sobre" class="nav-link">Sobre</a></li>
                <li><a href="#servicos" class="nav-link">Serviços</a></li>
                <!-- Importante: Se houver vitrine de produtos, incluir este link -->
                <li><a href="produtos/vitrine.html" class="nav-link">Produtos</a></li>
                <li><a href="#contato" class="nav-link">Contato</a></li>
            </ul>
            
            <div class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    
    <!-- Conteúdo principal -->
    <main>
        <!-- Seções do site -->
    </main>
    
    <!-- Footer -->
    <footer>
        <div class="container">
            <!-- Conteúdo do rodapé -->
            
            <!-- Importante: Incluir links para todas as páginas principais, incluindo produtos -->
            <div class="footer-links">
                <h4>Links Rápidos</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                    <li><a href="#servicos">Serviços</a></li>
                    <li><a href="produtos/vitrine.html">Produtos</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            </div>
        </div>
    </footer>
    
    <!-- Scripts JavaScript -->
    <script src="js/main.js"></script>
    <script src="js/animations.js"></script>
</body>
</html>
```

### Navegação entre Páginas

- **Regra crucial**: Sempre use caminhos relativos corretos para links entre páginas
- Para links da página principal para subpáginas: `subpasta/pagina.html`
- Para links de subpáginas para a página principal: `../index.html`
- Para links entre subpáginas na mesma pasta: `outra-pagina.html`
- Para links entre subpáginas em pastas diferentes: `../outra-pasta/pagina.html`

## Padrões CSS

### Organização de Arquivos CSS

1. **style.css**: Estilos principais e globais
2. **responsive.css**: Media queries e ajustes para diferentes tamanhos de tela
3. **animations.css**: Animações e efeitos visuais

### Estrutura Básica CSS

```css
/* Variáveis CSS para consistência */
:root {
    /* Cores principais */
    --primary-color: #40e0d0;
    --primary-light: #7fffd4;
    --primary-dark: #20b2aa;
    --accent-color: #ff6b6b;
    --light-text: #ffffff;
    --dark-text: #121212;
    --dark-bg: #121212;
    --dark-card: #1e1e1e;
    
    /* Fontes */
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
    
    /* Espaçamentos */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 3rem;
    --spacing-xl: 5rem;
    
    /* Transições */
    --transition-fast: 0.3s ease;
    --transition-medium: 0.5s ease;
}

/* Reset e estilos base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-primary);
    line-height: 1.6;
    color: var(--dark-text);
}

a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-fast);
}

ul {
    list-style: none;
}

img {
    max-width: 100%;
    height: auto;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
}

/* Estilos específicos para componentes */
```

### Responsividade

```css
/* Tablets */
@media (max-width: 992px) {
    .nav-toggle {
        display: flex;
    }
    
    .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background-color: rgba(18, 18, 18, 0.95);
        flex-direction: column;
        align-items: center;
        padding: 40px 0;
        transition: var(--transition-medium);
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    /* Outros ajustes para tablets */
}

/* Smartphones */
@media (max-width: 768px) {
    /* Ajustes para smartphones */
}

/* Smartphones pequenos */
@media (max-width: 576px) {
    /* Ajustes para smartphones pequenos */
}
```

## Padrões JavaScript

### Menu Mobile

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Outros scripts
});
```

### Animações ao Scroll

```javascript
// Animação de elementos ao scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

// Executar animação inicial e adicionar evento de scroll
animateOnScroll();
window.addEventListener('scroll', animateOnScroll);
```

## Vitrine de Produtos

Se o site incluir uma vitrine de produtos, siga estas diretrizes adicionais:

### Estrutura de Arquivos para Produtos

```
public/
├── produtos/
│   ├── vitrine.html         # Página principal da vitrine
│   ├── produto-detalhe.html # Template para página de detalhes do produto
│   ├── categoria1.html      # Páginas de categorias específicas
│   └── categoria2.html
│
└── js/
    ├── vitrine-produtos.js  # Lógica para exibição da vitrine
    └── detalhes-produto.js  # Lógica para página de detalhes
```

### HTML da Vitrine

```html
<!-- Dentro de vitrine.html -->
<section class="produtos-grid">
    <!-- Produto 1 -->
    <div class="produto-card">
        <div class="produto-img">
            <img src="../img/produtos/produto1.jpg" alt="Nome do Produto">
            <!-- Importante: Incluir badges de desconto quando aplicável -->
            <div class="produto-badge">-15%</div>
        </div>
        <div class="produto-content">
            <span class="produto-categoria">Categoria</span>
            <h3 class="produto-titulo">Nome do Produto</h3>
            <div class="produto-preco">
                <span class="preco-atual">R$ 149,90</span>
                <span class="preco-antigo">R$ 179,90</span>
            </div>
            <div class="produto-acoes">
                <a href="produto-detalhe.html?id=1" class="btn-produto">Ver Detalhes</a>
                <a href="#" class="btn-favorito"><i class="far fa-heart"></i></a>
            </div>
        </div>
    </div>
    
    <!-- Mais produtos... -->
</section>
```

## Processo de Deploy na Vercel

1. **Preparação dos Arquivos**:
   - Certifique-se de que todos os arquivos estão na estrutura correta
   - Verifique se todos os links entre páginas estão funcionando
   - Teste o site localmente antes do deploy

2. **Deploy via Git**:
   - Crie um repositório Git para o projeto
   - Faça commit de todos os arquivos
   - Conecte o repositório à Vercel
   - Configure o diretório de build como `public` (ou o diretório principal do seu site)

3. **Deploy via Upload Direto**:
   - Comprima a pasta `public` (ou a pasta principal do seu site) em um arquivo ZIP
   - Faça upload do arquivo ZIP na Vercel
   - Selecione o framework como "Other" se for um site estático simples

## Checklist Pré-Deploy

Antes de solicitar o deploy, verifique:

- [ ] Estrutura de arquivos segue o padrão recomendado
- [ ] Todos os links de navegação estão corretos e funcionando
- [ ] Páginas de produtos estão acessíveis a partir do menu principal
- [ ] Site é responsivo e funciona em diferentes tamanhos de tela
- [ ] Imagens estão otimizadas para web
- [ ] JavaScript não contém erros
- [ ] Fontes e ícones estão sendo carregados corretamente

## Solicitação de Novos Sites

Ao solicitar a criação de um novo site, forneça as seguintes informações:

1. **Objetivo do site**: Descreva claramente o propósito do site
2. **Páginas necessárias**: Liste todas as páginas que o site deve ter
3. **Funcionalidades específicas**: Mencione recursos especiais como vitrine de produtos, formulários, etc.
4. **Referências visuais**: Forneça exemplos de sites ou imagens que representem o estilo desejado
5. **Conteúdo**: Forneça textos, imagens e outros conteúdos que devem ser incluídos
6. **Cores e identidade visual**: Especifique as cores e elementos de identidade visual a serem utilizados

## Exemplos de Solicitações Bem-Sucedidas

### Exemplo 1: Site de Academia com Vitrine de Produtos

"Preciso de um site para uma academia (CT Team Abu) com design moderno inspirado no Instagram que compartilhei. O site deve ter as seguintes páginas: Home, Planos, Sobre, Musculação, Produtos e Contato. A página de produtos deve mostrar suplementos, roupas e café com preços e placas de desconto. Use as cores turquesa/azul neon sobre fundo escuro e inclua animações modernas."

### Exemplo 2: Site Institucional para Empresa de Transformação Digital

"Preciso de um site para a Kolibra Solutions, uma empresa de transformação digital para pequenos e médios negócios. O site deve ter as seguintes páginas: Home, Serviços, Sobre Nós, Cases, Blog e Contato. O design deve ser clean e profissional, com foco em transmitir inovação e confiabilidade. Anexei um documento com informações detalhadas sobre a empresa."

## Conclusão

Seguindo estes padrões e fornecendo informações claras ao solicitar novos sites, você aumentará significativamente as chances de obter um site funcional no primeiro deploy, sem necessidade de correções posteriores.

Lembre-se que a comunicação clara e detalhada é fundamental para o sucesso do projeto. Quanto mais específico for o pedido, melhor será o resultado final.
