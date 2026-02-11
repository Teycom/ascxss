# 🚀 Guia de Deploy - Correções Aplicadas

## ⚠️ Erro Corrigido

### Problema
```
Header at index 0 has invalid `source` regular expression "/**/*.html"
```

### Solução
O Vercel usa regex PCRE no campo `source` dos headers, mas `/**/*.html` é um **glob**, não um regex válido.

**Mudança feita em `vercel.json`:**

```diff
- "source": "/**/*.html"
+ "source": "/(.*)"
```

E também:
```diff
- "source": "/src/**"
+ "source": "/src/(.*)"
```

## 📋 Checklist para Deploy

### 1. vercel.json ✅
- `$schema` adicionado para autocomplete
- Regex corrigido: `/(.*)` captura todas as rotas
- Regex corrigido: `/src/(.*)` para assets
- `buildCommand` especificado
- `outputDirectory` definido como `dist`

### 2. vite.config.js ✅
- `base: './'` para caminhos relativos
- Múltiplos entry points configurados
- Asset file names organizados
- Public dir configurado

### 3. package.json ✅
- Script `vercel-build` adicionado
- Node engine >= 18.0.0 especificado

## 🚀 Como Deployar

### Opção A: Dashboard do Vercel (Mais Fácil)

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe seu repositório do GitHub
3. **Framework Preset**: `Vite`
4. **Build Command**: `npm run build` (ou deixe em branco, o Vercel detecta)
5. **Output Directory**: `dist`
6. Clique em **Deploy**

### Opção B: CLI

```bash
# Instale o CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Opção C: GitHub Actions

O arquivo `.github/workflows/deploy.yml` já está configurado. Adicione os secrets no GitHub:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 🔍 Testando Localmente

```bash
# Instale dependências
npm install

# Rode o build
npm run build

# Verifique se a pasta dist foi criada
ls dist/

# Teste o preview
npm run preview
```

## 🐛 Se ainda houver erros

### Erro: "Cannot find module 'vite'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Build failed"
Verifique os logs no Vercel Dashboard > Deployments > [Seu deploy] > Build Logs

### Erro: "404 Not Found" nas páginas
Verifique se as `rewrites` estão funcionando:
- `/quiz` → `/quiz.html`
- `/resultado` → `/resultado.html`

## ✅ Configuração Final do vercel.json

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "version": 2,
  "name": "atestado-medico-digital",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/quiz", "destination": "/quiz.html" },
    { "source": "/resultado", "destination": "/resultado.html" },
    { "source": "/termos", "destination": "/termos.html" },
    { "source": "/privacidade", "destination": "/privacidade.html" },
    { "source": "/disclaimer", "destination": "/disclaimer.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/src/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## 📞 Suporte

Se persistir algum erro, verifique:
1. Logs de build no dashboard do Vercel
2. Versão do Node.js (deve ser >= 18)
3. Se `dist/index.html` existe após o build local
