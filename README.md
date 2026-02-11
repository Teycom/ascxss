# 🏥 Atestado Médico Digital

Site de alta conversão para emissão de atestados médicos digitais. Desenvolvido com **Vite** + **HTML5** + **CSS3** + **JavaScript** vanilla.

## ✅ Correções Aplicadas

- ✅ `vercel.json` - Headers com regex válido `/(.*)` em vez de `/**/*.html`
- ✅ `vite.config.js` - Configuração otimizada para múltiplas páginas
- ✅ `package.json` - Scripts atualizados com `vercel-build`
- ✅ Caminhos de assets - Todos relativos e compatíveis

## 🚀 Deploy no Vercel

### Método 1: GitHub + Vercel Dashboard (Recomendado)

```bash
# 1. Inicialize git e envie para o GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEUUSUARIO/atestado-medico.git
git push -u origin main
```

2. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
3. Clique em "Add New Project"
4. Importe o repositório `SEUUSUARIO/atestado-medico`
5. **Framework Preset**: Selecione `Vite`
6. Clique em **Deploy**

### Método 2: Vercel CLI

```bash
# Instale o CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Método 3: Deploy Manual

```bash
# Instale dependências
npm install

# Build
npm run build

# O conteúdo da pasta 'dist' está pronto para deploy
# Arraste a pasta dist para o Vercel
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
atestado-medico/
├── index.html                 # Landing page
├── quiz.html                  # Quiz 15 perguntas
├── resultado.html             # Checkout/pagamento
├── termos.html                # Termos de uso
├── privacidade.html           # Política de privacidade (LGPD)
├── disclaimer.html            # Avisos legais
├── vercel.json                # ✅ Configuração Vercel corrigida
├── vite.config.js             # ✅ Configuração Vite
├── package.json               # ✅ Scripts atualizados
├── src/
│   ├── images/                # Ilustrações SVG
│   │   ├── hero-illustration.svg
│   │   ├── document-illustration.svg
│   │   ├── success-illustration.svg
│   │   └── ...
│   ├── styles/
│   │   └── main.css           # Estilos completos
│   └── scripts/
│       └── quiz.js            # Lógica do quiz
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions
```

## 🎯 Funcionalidades

### Quiz de 15 Passos
1. Sintoma principal (5 opções com ícones)
2. Tempo dos sintomas
3. Escala de dor (slider 1-10)
4. Sinais de alerta (checkboxes)
5. Tentativas de tratamento
6. Tipo de trabalho
7. Piora no trabalho
8. Quando precisa
9. CID necessário
10. Nome completo
11. CPF (com validação)
12. Email
13. Confirmação de veracidade
14. Assinatura digital (canvas)
15. Dias de repouso

### Recursos Visuais
- 🎨 Ilustrações SVG vetoriais
- ✨ Animações CSS suaves
- 📱 100% responsivo (mobile-first)
- 🔒 Páginas legais completas
- ⚡ Loading com progresso realista

## 🔧 Configurações

### Integração de Pagamento

Edite `resultado.html` e substitua a função `processPayment()`:

```javascript
function processPayment() {
  // Stripe
  stripe.redirectToCheckout({
    lineItems: [{ price: 'price_123', quantity: 1 }],
    mode: 'payment',
    successUrl: 'https://seudominio.com/sucesso',
    cancelUrl: 'https://seudominio.com/resultado',
  });
}
```

### Variáveis de Ambiente (opcional)

Crie um arquivo `.env`:

```env
VITE_STRIPE_KEY=pk_test_...
VITE_API_URL=https://api.seusite.com
```

## 🐛 Troubleshooting

### Erro: "Header at index 0 has invalid `source` regular expression"
**Solução**: ✅ Corrigido! Use `/(.*)` em vez de `/**/*.html`

### Erro: "Cannot find module 'vite'"
**Solução**: Execute `npm install` antes do build

### Erro: "Build command failed"
**Solução**: Verifique se o Node.js é >= 18.0.0

## 📄 Licença

Template para desenvolvimento. Consulte um advogado antes de colocar em produção.

---

**Suporte**: suporte@meddigital.com.br
