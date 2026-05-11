// Menu Mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}

// Lógica de Modais
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('active');
    }
}

// Troca de abas nos modais
function switchTab(type, tabName) {
    // type: 'user' ou 'biz'
    const modalId = type === 'user' ? 'loginModal' : 'businessModal';
    const modal = document.getElementById(modalId);
    
    // Atualiza tabs
    const tabs = modal.querySelectorAll('.modal-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Atualiza forms
    const forms = modal.querySelectorAll('.modal-form');
    forms.forEach(form => form.classList.remove('active'));
    
    const formId = `${type}-${tabName}-form`;
    document.getElementById(formId).classList.add('active');
}

// Fechar modais ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
}

// Quiz Interativo
let currentStep = 1;

function nextQuizStep(step) {
    // Esconder passo atual
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    
    // Atualizar step
    currentStep = step;
    
    // Mostrar novo passo
    document.getElementById(`step-${currentStep}`).classList.add('active');
    
    // Atualizar barra de progresso
    updateProgress();
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    // Temos 4 passos: 25%, 50%, 75%, 100%
    const percentage = (currentStep / 4) * 100;
    progressFill.style.width = `${percentage}%`;
}

function finishQuiz() {
    const budget = document.getElementById('budgetInput').value;
    const travelers = document.getElementById('travelers').value;
    const duration = document.getElementById('duration').value;
    
    // Validação básica
    if(!budget || !travelers || !duration) {
        alert("Por favor, preencha as informações para criarmos o melhor roteiro!");
        return;
    }
    
    // Simular o carregamento e mostrar o resultado
    nextQuizStep(4);
}

// Smooth scroll para links da navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
