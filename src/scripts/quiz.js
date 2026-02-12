/**
 * ATESTADO MÉDICO DIGITAL - QUIZ ENGINE
 * Versão corrigida - Funções globais expostas
 */

// ========================================
// ESTADO GLOBAL
// ========================================
let currentStep = 1;
let selectedCheckboxes = [];
let hasSigned = false;
let painLevel = 5;

let userData = {
  nome: '',
  cpf: '',
  email: '',
  sintoma: '',
  dias: 2
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('Quiz iniciado');
  
  // Esconde todos os passos exceto o primeiro
  for (let i = 2; i <= 15; i++) {
    const step = document.getElementById('step-' + i);
    if (step) step.style.display = 'none';
  }
  
  // Inicializa assinatura
  initSignatureCanvas();
  
  // Atualiza progresso
  updateProgress(1);
});

// ========================================
// NAVEGAÇÃO
// ========================================
function goToStep(stepNum) {
  if (stepNum < 1 || stepNum > 15) return;
  
  // Esconde passo atual
  const currentEl = document.getElementById('step-' + currentStep);
  if (currentEl) {
    currentEl.style.display = 'none';
  }
  
  // Mostra novo passo
  const nextEl = document.getElementById('step-' + stepNum);
  if (nextEl) {
    nextEl.style.display = 'block';
    nextEl.classList.add('animate-fade-in');
  }
  
  currentStep = stepNum;
  updateProgress(stepNum);
  
  // Scroll para topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress(step) {
  const progressMap = {
    1: 20, 2: 30, 3: 40, 4: 48, 5: 54,
    6: 60, 7: 66, 8: 72, 9: 78, 10: 82,
    11: 86, 12: 90, 13: 93, 14: 96, 15: 98
  };
  
  const messages = {
    1: 'Analisando sintoma...',
    2: 'Avaliando tempo...',
    3: 'Processando intensidade...',
    4: 'Verificando alertas...',
    5: 'Analisando tratamento...',
    6: 'Avaliando risco...',
    7: 'Calculando repouso...',
    8: 'Definindo data...',
    9: 'Selecionando CID...',
    10: 'Validando dados...',
    11: 'Verificando CPF...',
    12: 'Confirmando email...',
    13: 'Verificando termos...',
    14: 'Processando assinatura...',
    15: 'Calculando período...'
  };

  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');
  
  if (fill) fill.style.width = (progressMap[step] || 0) + '%';
  if (text) text.textContent = messages[step] || 'Processando...';
}

// ========================================
// SELEÇÃO DE OPÇÕES (ONE CLICK)
// ========================================
function selectOption(step, value, label) {
  console.log('selectOption chamado:', step, value, label);
  
  // Salva dados
  if (step === 1) {
    userData.sintoma = label;
    showAlert('alert-sintoma', 'Detectamos padrão de <strong>' + label + '</strong>. Iniciando protocolo...');
  }
  
  // Alerts especiais
  if (step === 5 && value === 'nada') {
    showAlert('alert-remedio', '<strong>Atenção:</strong> Postergar tratamento pode aumentar o tempo de recuperação.');
    setTimeout(function() { goToStep(step + 1); }, 1500);
    return;
  }
  
  if (step === 6 && value === 'maquinas') {
    showAlert('alert-maquinas', '🚨 <strong>Risco de acidente detectado!</strong> Atestado prioritário indicado.');
    setTimeout(function() { goToStep(step + 1); }, 1500);
    return;
  }
  
  // Destaca visualmente
  const stepEl = document.getElementById('step-' + step);
  if (stepEl) {
    const options = stepEl.querySelectorAll('.option-item');
    options.forEach(function(opt) {
      opt.classList.remove('selected');
    });
    
    // Encontra e destaca o clicado
    const clickedOptions = stepEl.querySelectorAll('.option-item');
    clickedOptions.forEach(function(opt) {
      if (opt.getAttribute('data-value') === value) {
        opt.classList.add('selected');
      }
    });
  }
  
  // Avança automaticamente
  setTimeout(function() {
    goToStep(step + 1);
  }, 400);
}

// ========================================
// CHECKBOXES
// ========================================
function toggleCheckbox(element, value) {
  element.classList.toggle('selected');
  
  if (selectedCheckboxes.includes(value)) {
    selectedCheckboxes = selectedCheckboxes.filter(function(v) { return v !== value; });
  } else {
    selectedCheckboxes.push(value);
  }
  
  if (selectedCheckboxes.length >= 3) {
    showAlert('alert-checkboxes', '<strong>Nível crítico detectado.</strong> Repouso médico recomendado.');
  }
}

function submitCheckboxes(step) {
  selectedCheckboxes = [];
  goToStep(step + 1);
}

// ========================================
// SLIDER DE DOR
// ========================================
function updatePainLevel(value) {
  painLevel = parseInt(value);
  
  const labels = {
    1: 'Nível 1: Leve desconforto',
    2: 'Nível 2: Incômodo leve', 
    3: 'Nível 3: Desconforto moderado',
    4: 'Nível 4: Dor perceptível',
    5: 'Nível 5: Desconforto significativo',
    6: 'Nível 6: Dor moderada',
    7: 'Nível 7: Dor intensa',
    8: 'Nível 8: Dor muito intensa',
    9: 'Nível 9: Dor severa',
    10: 'Nível 10: Dor insuportável'
  };

  const display = document.getElementById('painValue');
  if (display) {
    display.textContent = labels[value];
    if (value >= 7) {
      display.classList.add('critical');
    } else {
      display.classList.remove('critical');
    }
  }
}

function submitPainLevel(step) {
  goToStep(step + 1);
}

// ========================================
// INPUTS
// ========================================
function updateNome(value) {
  userData.nome = value.trim();
  
  const preview = document.getElementById('nomePreview');
  const previewText = document.getElementById('nomePreviewText');
  const btn = document.getElementById('btnNome');
  const feedback = document.getElementById('feedbackNome');

  if (userData.nome.length >= 5) {
    if (preview) preview.classList.add('show');
    if (previewText) previewText.textContent = userData.nome;
    if (btn) btn.disabled = false;
    if (feedback) {
      feedback.innerHTML = '<span>✓</span><span>Nome validado</span>';
      feedback.className = 'input-feedback success';
    }
  } else {
    if (preview) preview.classList.remove('show');
    if (btn) btn.disabled = true;
    if (feedback) feedback.innerHTML = '';
  }
}

function submitNome(step) {
  if (userData.nome.length >= 5) {
    goToStep(step + 1);
  }
}

function formatCPF(input) {
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = value;

  const feedback = document.getElementById('feedbackCPF');
  const btn = document.getElementById('btnCPF');

  if (value.length === 14) {
    if (validarCPF(value)) {
      userData.cpf = value;
      if (feedback) {
        feedback.innerHTML = '<span>✓</span><span>CPF validado</span>';
        feedback.className = 'input-feedback success';
      }
      if (btn) btn.disabled = false;
    } else {
      if (feedback) {
        feedback.innerHTML = '<span>✗</span><span>CPF inválido</span>';
        feedback.className = 'input-feedback error';
      }
      if (btn) btn.disabled = true;
    }
  } else {
    if (feedback) feedback.innerHTML = '';
    if (btn) btn.disabled = true;
  }
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

function submitCPF(step) {
  if (validarCPF(userData.cpf)) {
    goToStep(step + 1);
  }
}

function validateEmail(value) {
  userData.email = value.trim();
  const feedback = document.getElementById('feedbackEmail');
  const btn = document.getElementById('btnEmail');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(userData.email)) {
    if (feedback) {
      feedback.innerHTML = '<span>✓</span><span>Email validado</span>';
      feedback.className = 'input-feedback success';
    }
    if (btn) btn.disabled = false;
  } else {
    if (feedback) feedback.innerHTML = '';
    if (btn) btn.disabled = true;
  }
}

function submitEmail(step) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(userData.email)) {
    localStorage.setItem('atestado_nome', userData.nome);
    localStorage.setItem('atestado_cpf', userData.cpf);
    localStorage.setItem('atestado_email', userData.email);
    localStorage.setItem('atestado_sintoma', userData.sintoma);
    goToStep(step + 1);
  }
}

// ========================================
// CONFIRMAÇÃO
// ========================================
function toggleConfirm(element) {
  element.classList.toggle('selected');
  const btn = document.getElementById('btnConfirm');
  if (btn) {
    btn.disabled = !element.classList.contains('selected');
  }
}

function submitConfirm(step) {
  goToStep(step + 1);
}

// ========================================
// ASSINATURA DIGITAL
// ========================================
let canvas, ctx;
let isDrawing = false;

function initSignatureCanvas() {
  canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;

  // Ajusta resolução
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * 2;
  canvas.height = rect.height * 2;

  ctx = canvas.getContext('2d');
  ctx.scale(2, 2);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Mouse events
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  // Touch events
  canvas.addEventListener('touchstart', handleTouch, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', stopDrawing);
}

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function startDrawing(e) {
  isDrawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  hasSigned = true;
  const btn = document.getElementById('btnSignature');
  if (btn) btn.disabled = false;
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function handleTouch(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}

function clearSignature() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hasSigned = false;
  const btn = document.getElementById('btnSignature');
  if (btn) btn.disabled = true;
}

function submitSignature(step) {
  if (hasSigned && canvas) {
    // Salva a assinatura como imagem base64 no localStorage
    const signatureData = canvas.toDataURL('image/png');
    localStorage.setItem('atestado_assinatura', signatureData);
    console.log('Assinatura salva no localStorage');
    goToStep(step + 1);
  }
}

// ========================================
// DIAS DE REPOUSO
// ========================================
function selectDays(days) {
  const options = document.querySelectorAll('#step-15 .option-item');
  options.forEach(function(opt) { opt.classList.remove('selected'); });
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('selected');
  }

  if (days === 'ia') {
    userData.dias = 2;
    showModal('🤖 IA Médica Recomenda', 'Baseado nos seus sintomas, recomendamos <strong>2 dias de repouso</strong>.', function() {
      closeModal();
      startProcessing();
    });
  } else {
    userData.dias = days;
    setTimeout(startProcessing, 400);
  }
}

// ========================================
// PROCESSAMENTO FINAL
// ========================================
function startProcessing() {
  // Salva os dados no localStorage
  localStorage.setItem('atestado_dias', userData.dias);
  localStorage.setItem('atestado_nome', userData.nome);
  localStorage.setItem('atestado_cpf', userData.cpf);
  localStorage.setItem('atestado_email', userData.email);
  localStorage.setItem('atestado_sintoma', userData.sintoma);
  
  console.log('Dados salvos:', userData);

  // Esconde todos os elementos da página
  const quizContainer = document.querySelector('.quiz-container');
  const progressWrapper = document.querySelector('.progress-wrapper');
  const header = document.querySelector('.header');
  
  if (quizContainer) quizContainer.style.display = 'none';
  if (progressWrapper) progressWrapper.style.display = 'none';
  if (header) header.style.display = 'none';

  // Mostra a tela de carregamento
  const loading = document.getElementById('loadingScreen');
  if (loading) {
    loading.style.display = 'flex';
    loading.classList.add('active');
    console.log('Tela de carregamento ativada');
  }

  const steps = [
    { pct: 15, text: 'Analisando padrões de sintomas...', delay: 700 },
    { pct: 30, text: 'Verificando histórico clínico...', delay: 600 },
    { pct: 45, text: 'Calculando necessidade de repouso...', delay: 700 },
    { pct: 60, text: 'Selecionando CID mais adequado...', delay: 800 },
    { pct: 75, text: 'Gerando documento digital...', delay: 700 },
    { pct: 90, text: 'Assinando digitalmente...', delay: 800 },
    { pct: 100, text: 'Finalizando...', delay: 500 }
  ];

  let current = 0;
  const progress = document.getElementById('loadingProgress');
  const status = document.getElementById('loadingStatus');

  function runStep() {
    if (current >= steps.length) {
      setTimeout(function() {
        window.location.href = 'resultado.html';
      }, 400);
      return;
    }

    const step = steps[current];
    if (progress) progress.style.width = step.pct + '%';
    if (status) status.textContent = step.text;

    current++;
    setTimeout(runStep, step.delay);
  }

  runStep();
}

// ========================================
// UTILITÁRIOS
// ========================================
function showAlert(id, message) {
  const alert = document.getElementById(id);
  if (alert) {
    alert.innerHTML = '<span class="alert-icon">💡</span><div class="alert-content">' + message + '</div>';
    alert.style.display = 'flex';
  }
}

function showModal(title, text, onConfirm) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalButtons = document.getElementById('modalButtons');

  if (modalTitle) modalTitle.innerHTML = title;
  if (modalText) modalText.innerHTML = text;
  if (modalButtons) {
    modalButtons.innerHTML = '<button class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancelar</button><button class="modal-btn modal-btn-primary" onclick="handleModalConfirm()">Continuar</button>';
  }
  
  window.modalCallback = onConfirm;
  if (modal) modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.style.display = 'none';
  window.modalCallback = null;
}

function handleModalConfirm() {
  if (window.modalCallback) {
    window.modalCallback();
  }
  closeModal();
}

// Prevenir zoom em inputs no iOS
document.addEventListener('focusin', function(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    setTimeout(function() {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
});
