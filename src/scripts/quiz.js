/**
 * ATESTADO MÉDICO DIGITAL - QUIZ ENGINE
 * Experiência fluida, alta conversão, mobile-first
 */

class QuizApp {
  constructor() {
    this.state = {
      currentStep: 1,
      totalSteps: 15,
      answers: {},
      selectedCheckboxes: [],
      nome: '',
      cpf: '',
      email: '',
      diasRepouso: 2,
      sintomaPrincipal: '',
      hasSigned: false,
      painLevel: 5
    };
    
    this.canvas = null;
    this.ctx = null;
    this.isDrawing = false;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.initSignatureCanvas();
    this.updateProgress(1);
  }

  // Progress bar com efeito visual de progresso rápido
  updateProgress(step) {
    const progressMap = {
      1: 22, 2: 35, 3: 45, 4: 52, 5: 58,
      6: 63, 7: 68, 8: 72, 9: 76, 10: 80,
      11: 84, 12: 87, 13: 90, 14: 93, 15: 96
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
    
    if (fill) {
      fill.style.width = `${progressMap[step] || 0}%`;
    }
    if (text) {
      text.textContent = messages[step] || 'Processando...';
    }
  }

  // Navegação entre steps
  goToStep(step) {
    // Esconde step atual
    const currentEl = document.getElementById(`step-${this.state.currentStep}`);
    if (currentEl) {
      currentEl.classList.add('hidden');
    }

    // Mostra novo step
    const nextEl = document.getElementById(`step-${step}`);
    if (nextEl) {
      nextEl.classList.remove('hidden');
      nextEl.classList.add('animate-fade-in');
    }

    this.state.currentStep = step;
    this.updateProgress(step);
    
    // Scroll para topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Seleção de opção única
  selectOption(step, value, label, alertConfig = null) {
    this.state.answers[`step${step}`] = { value, label };
    
    // Salva sintoma principal
    if (step === 1) {
      this.state.sintomaPrincipal = label;
      this.showAlert('alert-sintoma', `Detectamos padrão de <strong>${label}</strong>. Iniciando protocolo de análise...`);
      
      // Destaca seleção
      this.highlightSelection(step, value);
      setTimeout(() => this.goToStep(step + 1), 1000);
      return;
    }

    // Alerts específicos
    if (alertConfig) {
      if (alertConfig.condition && alertConfig.condition(value)) {
        this.showAlert(alertConfig.id, alertConfig.message);
      }
      setTimeout(() => this.goToStep(step + 1), alertConfig.delay || 600);
    } else {
      this.goToStep(step + 1);
    }

    this.highlightSelection(step, value);
  }

  // Destaca visualmente a seleção
  highlightSelection(step, value) {
    const stepEl = document.getElementById(`step-${step}`);
    if (!stepEl) return;

    const options = stepEl.querySelectorAll('.option-item');
    options.forEach(opt => {
      opt.classList.remove('selected');
      if (opt.dataset.value === value) {
        opt.classList.add('selected');
      }
    });
  }

  // Toggle checkbox (múltipla escolha)
  toggleCheckbox(element, value) {
    element.classList.toggle('selected');
    
    if (this.state.selectedCheckboxes.includes(value)) {
      this.state.selectedCheckboxes = this.state.selectedCheckboxes.filter(v => v !== value);
    } else {
      this.state.selectedCheckboxes.push(value);
    }

    // Alert se marcou muitos
    if (this.state.selectedCheckboxes.length >= 3) {
      this.showAlert('alert-checkboxes', '<strong>Nível crítico detectado.</strong> Repouso médico é fortemente recomendado.');
    }
  }

  // Submit checkboxes
  submitCheckboxes(step) {
    this.state.answers[`step${step}`] = {
      value: [...this.state.selectedCheckboxes],
      label: this.state.selectedCheckboxes.join(', ')
    };
    this.state.selectedCheckboxes = [];
    this.goToStep(step + 1);
  }

  // Slider de dor
  updatePainLevel(value) {
    this.state.painLevel = parseInt(value);
    
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
      display.classList.toggle('critical', value >= 7);
    }
  }

  submitPainLevel(step) {
    this.state.answers[`step${step}`] = {
      value: this.state.painLevel,
      label: `Nível ${this.state.painLevel}`
    };
    this.goToStep(step + 1);
  }

  // Input de nome
  updateNome(value) {
    this.state.nome = value.trim();
    const preview = document.getElementById('nomePreview');
    const previewText = document.getElementById('nomePreviewText');
    const btn = document.getElementById('btnNome');
    const feedback = document.getElementById('feedbackNome');

    if (this.state.nome.length >= 5) {
      preview?.classList.add('show');
      if (previewText) previewText.textContent = this.state.nome;
      if (btn) btn.disabled = false;
      if (feedback) {
        feedback.innerHTML = '<span>✓</span><span>Nome validado para laudo</span>';
        feedback.className = 'input-feedback success';
      }
    } else {
      preview?.classList.remove('show');
      if (btn) btn.disabled = true;
      if (feedback) feedback.innerHTML = '';
    }
  }

  submitNome(step) {
    if (this.state.nome.length >= 5) {
      this.goToStep(step + 1);
    }
  }

  // Input de CPF
  formatCPF(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;

    const feedback = document.getElementById('feedbackCPF');
    const btn = document.getElementById('btnCPF');

    if (value.length === 14) {
      if (this.validarCPF(value)) {
        this.state.cpf = value;
        if (feedback) {
          feedback.innerHTML = '<span>✓</span><span>CPF validado para assinatura digital</span>';
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

  validarCPF(cpf) {
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

  submitCPF(step) {
    if (this.validarCPF(this.state.cpf)) {
      this.goToStep(step + 1);
    }
  }

  // Input de email
  validateEmail(value) {
    this.state.email = value.trim();
    const feedback = document.getElementById('feedbackEmail');
    const btn = document.getElementById('btnEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(this.state.email)) {
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

  submitEmail(step) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.state.email)) {
      // Salva dados
      localStorage.setItem('atestado_nome', this.state.nome);
      localStorage.setItem('atestado_cpf', this.state.cpf);
      localStorage.setItem('atestado_email', this.state.email);
      localStorage.setItem('atestado_sintoma', this.state.sintomaPrincipal);
      this.goToStep(step + 1);
    }
  }

  // Confirmação de veracidade
  toggleConfirm(element) {
    element.classList.toggle('selected');
    const btn = document.getElementById('btnConfirm');
    if (btn) {
      btn.disabled = !element.classList.contains('selected');
    }
  }

  submitConfirm(step) {
    this.goToStep(step + 1);
  }

  // Assinatura Digital
  initSignatureCanvas() {
    this.canvas = document.getElementById('signatureCanvas');
    if (!this.canvas) return;

    // Ajusta resolução
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * 2;
    this.canvas.height = rect.height * 2;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(2, 2);
    this.ctx.strokeStyle = '#1e293b';
    this.ctx.lineWidth = 2.5;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // Eventos
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseleave', this.stopDrawing.bind(this));

    // Touch events
    this.canvas.addEventListener('touchstart', this.handleTouch.bind(this), { passive: false });
    this.canvas.addEventListener('touchmove', this.handleTouch.bind(this), { passive: false });
    this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
  }

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  startDrawing(e) {
    this.isDrawing = true;
    const pos = this.getPos(e);
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  draw(e) {
    if (!this.isDrawing) return;
    e.preventDefault();
    const pos = this.getPos(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    this.state.hasSigned = true;
    
    const btn = document.getElementById('btnSignature');
    if (btn) btn.disabled = false;
  }

  stopDrawing() {
    this.isDrawing = false;
    this.ctx.beginPath();
  }

  handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  clearSignature() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.state.hasSigned = false;
    const btn = document.getElementById('btnSignature');
    if (btn) btn.disabled = true;
  }

  submitSignature(step) {
    if (this.state.hasSigned) {
      this.goToStep(step + 1);
    }
  }

  // Seleção de dias
  selectDays(days) {
    // Destaca seleção
    const options = document.querySelectorAll('#step-15 .option-item');
    options.forEach(opt => opt.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    if (days === 'ia') {
      this.state.diasRepouso = 2;
      setTimeout(() => {
        this.showModal(
          '🤖 IA Médica Recomenda',
          'Baseado na análise dos seus sintomas, nossa IA recomenda <strong>2 dias de repouso</strong> para recuperação adequada.',
          () => {
            this.closeModal();
            this.startProcessing();
          }
        );
      }, 400);
    } else {
      this.state.diasRepouso = days;
      setTimeout(() => this.startProcessing(), 400);
    }
  }

  // Processamento final
  startProcessing() {
    localStorage.setItem('atestado_dias', this.state.diasRepouso);

    // Esconde quiz
    document.querySelector('.quiz-container')?.classList.add('hidden');
    document.querySelector('.progress-wrapper')?.classList.add('hidden');

    // Mostra loading
    const loading = document.getElementById('loadingScreen');
    if (loading) {
      loading.classList.remove('hidden');
    }

    // Simula processamento
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

    const runStep = () => {
      if (current >= steps.length) {
        setTimeout(() => {
          window.location.href = 'resultado.html';
        }, 400);
        return;
      }

      const step = steps[current];
      if (progress) progress.style.width = step.pct + '%';
      if (status) status.textContent = step.text;

      current++;
      setTimeout(runStep, step.delay);
    };

    runStep();
  }

  // Alert dinâmico
  showAlert(id, message) {
    const alert = document.getElementById(id);
    if (alert) {
      alert.innerHTML = `<span class="alert-icon">💡</span><div class="alert-content">${message}</div>`;
      alert.style.display = 'flex';
    }
  }

  // Modal
  showModal(title, text, onConfirm) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalButtons = document.getElementById('modalButtons');

    if (modalTitle) modalTitle.innerHTML = title;
    if (modalText) modalText.innerHTML = text;
    if (modalButtons) {
      modalButtons.innerHTML = `
        <button class="btn btn-secondary" onclick="quizApp.closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="quizApp.handleModalConfirm()">Continuar</button>
      `;
    }
    
    this.modalCallback = onConfirm;
    modal?.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('modal');
    modal?.classList.add('hidden');
    this.modalCallback = null;
  }

  handleModalConfirm() {
    if (this.modalCallback) {
      this.modalCallback();
    }
    this.closeModal();
  }

  // Event listeners
  bindEvents() {
    // Prevenir zoom em inputs no iOS
    document.addEventListener('focusin', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setTimeout(() => {
          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    });
  }
}

// Inicializa
const quizApp = new QuizApp();

// Exporta para uso global
window.quizApp = quizApp;
