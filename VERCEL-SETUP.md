# 🚀 Configuração do Deploy Vercel

## ✅ Status: Código Enviado para GitHub

O código foi enviado para: **https://github.com/Teycom/ascxss**

## 📋 Próximos Passos

### Opção 1: Deploy via Dashboard Vercel (Recomendado - Mais Fácil)

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New Project"**
3. Importe o repositório `Teycom/ascxss`
4. Configure:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Clique em **Deploy**

O Vercel vai detectar automaticamente e fazer o deploy!

---

### Opção 2: Deploy Automático via GitHub Actions

Para ativar o deploy automático a cada push:

#### Passo 1: Obter Tokens do Vercel

1. Acesse [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Crie um novo token: **"Create Token"**
3. Copie o token gerado

#### Passo 2: Criar Projeto no Vercel

```bash
# Instale o Vercel CLI
npm i -g vercel

# Login
vercel login

# Na pasta do projeto
vercel

# Siga as instruções
```

Ou crie via dashboard e obtenha:
- `VERCEL_ORG_ID` (nas configurações do projeto)
- `VERCEL_PROJECT_ID` (nas configurações do projeto)

#### Passo 3: Configurar Secrets no GitHub

1. Acesse: https://github.com/Teycom/ascxss/settings/secrets/actions
2. Clique em **"New repository secret"**
3. Adicione os 3 secrets:

| Nome | Valor |
|------|-------|
| `VERCEL_TOKEN` | Token do passo 1 |
| `VERCEL_ORG_ID` | Org ID do Vercel |
| `VERCEL_PROJECT_ID` | Project ID do Vercel |

#### Passo 4: Deploy Automático

Após configurar os secrets, todo push na branch `main` vai:
1. Rodar `npm run build`
2. Fazer deploy automático para Vercel

---

## 🔗 URLs Importantes

- **Repositório**: https://github.com/Teycom/ascxss
- **Vercel Dashboard**: https://vercel.com/dashboard

## 🐛 Troubleshooting

### "Failed to compile"
Verifique no Vercel Dashboard > Deployments > [Seu deploy] > Build Logs

### "Cannot find module"
O build command deve ser: `npm run build`

### "404 Not Found"
Verifique se as `rewrites` no `vercel.json` estão corretas

## ✅ Checklist Final

- [ ] Projeto criado no Vercel
- [ ] Framework: Vite
- [ ] Build: `npm run build`
- [ ] Output: `dist`
- [ ] Deploy realizado com sucesso
- [ ] URLs testadas:
  - [ ] /
  - [ ] /quiz
  - [ ] /resultado
