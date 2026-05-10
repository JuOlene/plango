// Navegação Principal
function switchView(viewId, element) {
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => v.classList.remove('active'));

    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    menuLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(viewId).classList.add('active');
    
    if(element) {
        element.classList.add('active');
    }
}

// Navegação de Abas Internas
function switchSubView(viewId, element) {
    const views = document.querySelectorAll('.sub-view');
    views.forEach(v => v.classList.remove('active'));

    const tabs = document.querySelectorAll('.sub-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(viewId).classList.add('active');
    if(element) {
        element.classList.add('active');
    }
}

// Quiz Multi-step (Cérebro do Planejamento)
function nextQuizStep(stepNum) {
    // Esconde todos os steps
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#quiz-step-done').forEach(s => s.classList.remove('active'));
    document.getElementById('quiz-step-processing').classList.remove('active');

    const target = document.getElementById('quiz-step-' + stepNum);
    if (target) {
        target.classList.add('active');
    }

    // Atualiza barra de progresso (6 etapas)
    const progressMap = {1: '16%', 2: '32%', 3: '48%', 4: '64%', 5: '80%', 6: '100%'};
    const bar = document.getElementById('quiz-progress');
    if (bar && progressMap[stepNum]) bar.style.width = progressMap[stepNum];
}

function saveQuiz() {
    const stepProcessing = document.getElementById('quiz-step-processing');
    const currentStep = document.querySelector('.quiz-step.active');
    
    if (currentStep) currentStep.classList.remove('active');
    stepProcessing.classList.add('active');

    // Simula processamento da IA
    setTimeout(() => {
        generatePersonalizedTrip();
        
        // Esconde o quiz e mostra o dashboard após o processamento
        document.querySelector('.view-section.active').classList.remove('active');
        document.getElementById('visao-geral').classList.add('active');
        
        // Atualiza os links da sidebar
        document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
        document.querySelector('a[onclick*="visao-geral"]').classList.add('active');

        showToast("✅ Roteiro Gerado!", "Sua viagem personalizada está pronta para ser explorada.");
    }, 2500);
}

function generatePersonalizedTrip() {
    // Captura dados do quiz
    const orcamento = document.getElementById('quiz-orcamento').value;
    const ambiente = document.querySelector('input[name="ambiente"]:checked')?.value || 'praia';
    const companhia = document.querySelector('input[name="companhia"]:checked')?.value || 'solo';
    
    const tripTitleInput = document.getElementById('trip-title-input');
    const tripEmoji = document.getElementById('trip-emoji');
    const tripSubtitleInput = document.getElementById('trip-subtitle-input');
    
    // Lógica de Sugestão
    let destino = "Litoral Norte";
    let emoji = "🏖️";
    let resumo = "Praia, Gastronomia, Fim de Semana";

    if (ambiente === 'frio') {
        destino = "Gramado & Canela";
        emoji = "❄️";
        resumo = "Frio, Vinho, Fondue, Romance";
    } else if (ambiente === 'natureza') {
        destino = "Chapada dos Veadeiros";
        emoji = "🌿";
        resumo = "Cachoeiras, Trilhas, Misticismo, Aventura";
    } else if (ambiente === 'cidade') {
        destino = "São Paulo Cultural";
        emoji = "🏙️";
        resumo = "Museus, Gastronomia, Compras, Vida Noturna";
    }

    // Preenche como sugestão (editável)
    tripTitleInput.value = destino;
    tripEmoji.innerText = emoji;
    tripSubtitleInput.value = `Para ${companhia.toUpperCase()} - Perfil Sugerido: ${resumo}`;
    
    // Atualiza o orçamento no dashboard
    tripTotalBudget = parseInt(orcamento) || 1500;
    const budgetDisplay = document.getElementById('total-budget');
    if (budgetDisplay) budgetDisplay.innerText = `R$ ${tripTotalBudget.toLocaleString('pt-BR')},00`;
    
    recalculateBudget();
    showToast("✨ Sugestões Aplicadas", "Ajustamos o roteiro com base no seu perfil, mas você pode mudar o que quiser!");
}

// Gestão de Itens do Roteiro (Manual)
function addItemToTrip(dayListId) {
    const list = document.getElementById(dayListId);
    const newItem = document.createElement('div');
    newItem.className = 'trip-item';
    newItem.style.animation = 'fadeIn 0.3s';
    newItem.innerHTML = `
        <div class="item-info">
            <h4 contenteditable="true">✨ Nova Atividade</h4>
            <p contenteditable="true">Clique para editar a descrição e horário...</p>
        </div>
        <div class="item-controls">
            <span class="price-tag">R$ 0</span>
            <button class="btn-delete" onclick="this.closest('.trip-item').remove(); recalculateBudget()">🗑️</button>
        </div>
    `;
    list.appendChild(newItem);
    recalculateBudget();
}

// Funções de Personalização do Quiz
function showCustomInput(stepNum) {
    document.getElementById('custom-container-' + stepNum).style.display = 'flex';
    document.getElementById('btn-add-' + stepNum).style.display = 'none';
    document.getElementById('custom-input-' + stepNum).focus();
}

function confirmCustomOption(stepNum) {
    const input = document.getElementById('custom-input-' + stepNum);
    const value = input.value.trim();
    
    if (value === "") {
        showToast("Ops!", "Por favor, digite o nome da opção.");
        return;
    }

    const grid = document.getElementById('options-grid-' + stepNum);
    
    // Criar novo label de opção
    const label = document.createElement('label');
    label.className = 'quiz-option';
    label.style.animation = 'fadeIn 0.4s';
    
    // Tenta extrair um emoji ou usa um padrão
    const hasEmoji = /\p{Emoji}/u.test(value);
    const finalValue = hasEmoji ? value : "✨ " + value;

    label.innerHTML = `<input type="checkbox" value="${value.toLowerCase().replace(/\s+/g, '-')}" checked> ${finalValue}`;
    
    grid.appendChild(label);
    
    // Limpar e esconder input
    input.value = "";
    document.getElementById('custom-container-' + stepNum).style.display = 'none';
    document.getElementById('btn-add-' + stepNum).style.display = 'block';
    
    showToast("Opção Adicionada!", `"${value}" agora faz parte do seu perfil.`);
}

// Lógica de Orçamento do Roteiro Central
let tripTotalBudget = 0;

function recalculateBudget() {
    let total = 800; // Voo base (fixo)
    
    const hotelSelect = document.getElementById('hotel-selector');
    if (hotelSelect) {
        const hotelPrice = parseInt(hotelSelect.value);
        document.getElementById('hotel-price').innerText = `R$ ${hotelPrice}`;
        total += (hotelPrice * 2); // 2 noites
    }

    // Soma itens marcados (checkboxes)
    const checkboxes = document.querySelectorAll('.item-controls input[type="checkbox"]:checked');
    checkboxes.forEach(cb => {
        const item = cb.closest('.trip-item');
        const priceTag = item.querySelector('.price-tag').innerText;
        const price = parseInt(priceTag.replace('R$', '').trim()) || 0;
        total += price;
    });

    // Soma outros itens com preços fixos (ex: Bistrô, Festa) que não têm checkbox mas estão no roteiro
    const fixedPrices = document.querySelectorAll('.trip-item:not(:has(input[type="checkbox"])) .price-tag');
    fixedPrices.forEach(pt => {
        if (pt.innerText.includes('Grátis')) return;
        const price = parseInt(pt.innerText.replace('R$', '').trim()) || 0;
        total += price;
    });

    tripTotalBudget = total;

    const budgetDisplay = document.getElementById('total-budget');
    if (budgetDisplay) {
        budgetDisplay.style.transform = 'scale(1.1)';
        budgetDisplay.innerText = `R$ ${total.toLocaleString('pt-BR')},00`;
    }
    
    const calcDisplay = document.getElementById('custo-roteiro-calc');
    if (calcDisplay) calcDisplay.innerText = `R$ ${total.toLocaleString('pt-BR')},00`;
    
    setTimeout(() => { if (budgetDisplay) budgetDisplay.style.transform = 'scale(1)'; }, 200);
    calculateFinance(); 
}

// Notificações Toast em Tempo Real
function showToast(title, message) {
    const container = document.getElementById('toast-container');
    if(!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-icon">✨</div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(toast);

    setTimeout(() => {
        if(container.contains(toast)) {
            container.removeChild(toast);
        }
    }, 5000);
}

// Cérebro do Planejamento (Quiz Permanente)
function toggleTag(el) {
    if(el.style.background === 'var(--primary-blue)' || el.style.background === 'var(--orange)') {
        el.style.background = '#E2E8F0';
        el.style.color = 'var(--text-dark)';
    } else {
        el.style.background = 'var(--primary-blue)';
        el.style.color = 'white';
    }
}

function updateBrain() {
    showToast("Cérebro Atualizado 🧠", "Seu perfil foi reprocessado. As opções de gastronomia e hotéis foram ajustadas no seu roteiro!");
}

// Assistente Financeiro Avançado
function calculateFinance() {
    const rendaStr = document.getElementById('renda-mensal').value;
    const porcentagemStr = document.getElementById('porcentagem-economia').value;
    
    if(!rendaStr || !porcentagemStr) return;

    const renda = parseFloat(rendaStr);
    const porcentagem = parseFloat(porcentagemStr) / 100;

    const economiaMensal = renda * porcentagem;
    document.getElementById('valor-economizado').innerText = economiaMensal.toLocaleString('pt-BR');

    if(economiaMensal <= 0 || tripTotalBudget <= 0) return;

    let meses = Math.ceil(tripTotalBudget / economiaMensal);
    const mesesDisplay = document.getElementById('meses-meta');
    
    mesesDisplay.innerText = meses === 1 ? "1 Mês" : `${meses} Meses`;

    if(meses > 12) {
        mesesDisplay.style.color = "#E53E3E";
        showToast("⚠️ Alerta Financeiro", "Sua viagem demorará mais de 1 ano. Considere abrir o Simulador para reduzir os custos.");
    } else {
        mesesDisplay.style.color = "#27AE60";
    }
}

// Botões de Ação Rápida
function autoGenerateTrip() {
    showToast("⚡ Viagem Automática", "Processando seus gostos... Roteiro e reservas otimizadas com IA. Vá até a aba Roteiro Central para ver o resultado.");
}

function surpriseTrip() {
    showToast("🎁 Viagem Surpresa", "Destino sorteado dentro do seu limite de R$ 3.000! Você vai para um Chalé Ecológico na Serra.");
}

function startNewTrip() {
    // Esconde navegação para forçar o quiz inicial (opcional, ou apenas muda aba)
    document.getElementById('trip-details').style.display = 'none';
    document.getElementById('no-trip-details').style.display = 'block';
    
    // Abre o quiz para o usuário começar do zero
    switchView('perfil');
    showToast("Bem-vindo!", "Vamos começar definindo seu orçamento e estilo de viagem.");
}

function openFlavorRoute() {
    window.open('https://eduardarodriguesz.github.io/FlavorRoute/', '_blank', 'noopener,noreferrer');
}

// Módulo de Gastronomia / Flavor Route
function showPixModal(restaurantName, price) {
    const modal = document.getElementById('pixModal');
    document.getElementById('pix-title').innerText = `Garantir mesa: ${restaurantName}`;
    modal.style.display = 'flex';
}

// Simulador de Cenários
function runSimulation() {
    const dias = parseInt(document.getElementById('sim-dias').value);
    const hotelType = document.getElementById('sim-hotel').value;
    
    let basePricePerDay = 200; 
    let hotelPricePerDay = 150;
    
    if(hotelType === 'pousada') hotelPricePerDay = 350;
    if(hotelType === 'resort') hotelPricePerDay = 900;

    const c1_total = (basePricePerDay + hotelPricePerDay) * dias + 800;
    
    let c2_dias = dias + 2;
    let c2_hotelPrice = 150; 
    const c2_total = (basePricePerDay + c2_hotelPrice) * c2_dias + 800;

    const resultsDiv = document.getElementById('sim-results');
    resultsDiv.innerHTML = `
        <div class="comparison-card">
            <h4>Seu Cenário Customizado</h4>
            <p class="text-light">${dias} dias em ${hotelType.toUpperCase()}</p>
            <div class="comparison-price">R$ ${c1_total.toLocaleString('pt-BR')}</div>
            <ul style="list-style:none; line-height:1.6; color:var(--text-light); font-size:0.9rem;">
                <li>✔️ Voo Incluído</li>
                <li>✔️ ${dias} noites de hospedagem</li>
            </ul>
        </div>
        
        <div class="comparison-card highlight">
            <h4>Sugestão Inteligente Plango</h4>
            <p class="text-light">Aproveite mais! ${c2_dias} dias em HOSTEL.</p>
            <div class="comparison-price">R$ ${c2_total.toLocaleString('pt-BR')}</div>
            <ul style="list-style:none; line-height:1.6; color:var(--text-light); font-size:0.9rem;">
                <li>✔️ Voo Incluído</li>
                <li><strong style="color:var(--orange)">✔️ ${c2_dias} noites de hospedagem (+2 dias)</strong></li>
            </ul>
        </div>
    `;
}

// Init
window.onload = function() {
    recalculateBudget();
    runSimulation();
    
    // Se for um novo acesso (simulado), mostra a tela de "criar nova"
    if(window.location.hash === '#new') {
        startNewTrip();
    }
};
