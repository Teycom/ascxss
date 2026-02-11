# 🏥 Atestado Médico Digital

Site de alta conversão para emissão de atestados médicos digitais. Desenvolvido com **Vite**, **HTML5**, **CSS3** e **JavaScript** vanilla.

## ✨ Características

- ⚡ **Vite** - Build tool ultrarrápido
- 📱 **Mobile-first** - Design responsivo e otimizado para celular
- 🎯 **Alta conversão** - Quiz estratégico com progress bar trick
- 🔐 **Páginas legais** - Termos, privacidade e disclaimer (compliance)
- ✍️ **Assinatura digital** - Canvas funcional no mobile
- 🎨 **Design premium** - Tema saúde com cores profissionais

## 🚀 Deploy no Vercel

### Opção 1: Deploy Automático (GitHub)

1. **Crie um repositório no GitHub e envie o código:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seuusuario/atestado-medico.git
git push -u origin main
```

2. **No Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe o repositório
   - Framework Preset: **Vite**
   - Clique em "Deploy"

### Opção 2: Deploy via CLI

```bash
# Instale o Vercel CLI
npm i -g vercel

# No diretório do projeto
vercel --prod
```

### Opção 3: Deploy Manual (Drag & Drop)

1. Execute localmente:
```bash
npm install
npm run build
```

2. Acesse [vercel.com/new](https://vercel.com/new)
3. Arraste a pasta `dist` para o upload

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
atestado-medico/
├── index.html              # Landing page
├── quiz.html               # Quiz de avaliação
├── resultado.html          # Página de checkout
├── termos.html             # Termos de uso
├── privacidade.html        # Política de privacidade
├── disclaimer.html         # Avisos legais
├── package.json            # Dependências
├── vite.config.js          # Configuração do Vite
├── vercel.json             # Configuração do Vercel
└── src/
    ├── styles/
    │   └── main.css        # Estilos completos
    └── scripts/
        └── quiz.js         # Lógica do quiz
```

## 🎯 Funcionalidades do Quiz

| Step | Pergunta | Tipo |
|------|----------|------|
| 1 | Sintoma principal | Opções |
| 2 | Tempo dos sintomas | Opções |
| 3 | Escala de dor | Slider |
| 4 | Sinais de alerta | Checkboxes |
| 5 | Tentativas de tratamento | Opções |
| 6 | Tipo de trabalho | Opções |
| 7 | Piora no trabalho | Opções |
| 8 | Quando precisa | Opções |
| 9 | CID necessário | Opções |
| 10 | Nome completo | Input |
| 11 | CPF | Input com validação |
| 12 | Email | Input |
| 13 | Confirmação | Checkbox |
| 14 | Assinatura digital | Canvas |
| 15 | Dias de repouso | Opções |

## 🔧 Configurações

### Integração de Pagamento

Edite `resultado.html` e substitua a função `processPayment()`:

```javascript
function processPayment() {
  // Exemplo: Stripe
  stripe.redirectToCheckout({
    lineItems: [{ price: 'price_123', quantity: 1 }],
    mode: 'payment',
    successUrl: 'https://seudominio.com/sucesso',
    cancelUrl: 'https://seudominio.com/resultado',
  });
  
  // Exemplo: Mercado Pago
  // window.location.href = 'https://mpago.la/...';
}
```

### Personalização

- **Cores**: Edite as variáveis CSS em `src/styles/main.css`
- **Preço**: Altere em `resultado.html`
- **CIDs**: Modifique o objeto `cids` em `resultado.html`

## 📱 Otimizações Mobile

- Touch otimizado
- Prevenção de zoom em inputs
- Scroll suave
- Safe area para iPhone X+
- Animações performáticas

## 🛡️ Segurança

- Headers de segurança no Vercel
- Validação de CPF
- Sanitização de inputs
- LocalStorage para persistência temporária

## 📄 Licença

Este é um template para desenvolvimento. Consulte um advogado antes de colocar em produção.

---

**Nota**: Substitua os dados de contato e integre seu gateway de pagamento antes de publicar.
