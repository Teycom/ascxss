import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync, cpSync } from 'fs';
import { join } from 'path';

// Cria pasta dist se não existir
if (!existsSync('dist')) {
  mkdirSync('dist');
}

// Lista de arquivos para copiar
const files = [
  'index.html',
  'quiz.html',
  'resultado.html',
  'termos.html',
  'privacidade.html',
  'disclaimer.html'
];

// Copia cada arquivo
files.forEach(file => {
  if (existsSync(file)) {
    copyFileSync(file, join('dist', file));
    console.log(`✓ Copiado: ${file}`);
  } else {
    console.warn(`⚠ Arquivo não encontrado: ${file}`);
  }
});

// Copia pasta src se existir
if (existsSync('src')) {
  cpSync('src', join('dist', 'src'), { recursive: true });
  console.log('✓ Copiado: src/');
}

// Copia pasta public se existir
if (existsSync('public')) {
  cpSync('public', join('dist', 'public'), { recursive: true });
  console.log('✓ Copiado: public/');
}

console.log('\n✓ Build completo! Arquivos copiados para /dist');
