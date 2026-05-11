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

    const target = document.getElementById('quiz-step-' + stepNum);
    if (target) {
        target.classList.add('active');
    }

    // Atualiza barra de progresso
    const progressMap = {1: '25%', 2: '50%', 3: '75%', 4: '100%'};
    const bar = document.getElementById('quiz-progress');
    if (bar && progressMap[stepNum]) bar.style.width = progressMap[stepNum];
}

function saveQuiz() {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    const done = document.getElementById('quiz-step-done');
    if (done) done.classList.add('active');
    const bar = document.getElementById('quiz-progress');
    if (bar) bar.style.width = '100%';

    showToast("🧠 Cérebro Atualizado!", "Seu roteiro, gastronomia e hospedagem foram recalibrados com base no seu perfil.");
}

// Lógica de Orçamento do Roteiro Central
let tripTotalBudget = 0;

let selectedHotelPrice = 350;

function selectHotel(price, id) {
    selectedHotelPrice = price;
    
    // Remove active class from all
    document.querySelectorAll('.housing-option-card').forEach(card => {
        card.classList.remove('recommended');
    });
    
    // Add to selected
    document.getElementById(id).classList.add('recommended');
    
    document.getElementById('hotel-total-price').innerText = `R$ ${price * 2}`;
    recalculateBudget();
}

function recalculateBudget() {
    let total = 800; // Voo fixo
    
    total += (selectedHotelPrice * 2); 

    // Gastos de lazer/gastronomia expandidos (3 dias)
    total += 550; 

    tripTotalBudget = total;

    const budgetDisplay = document.getElementById('total-budget');
    if(budgetDisplay) {
        budgetDisplay.style.transform = 'scale(1.1)';
        budgetDisplay.innerText = `R$ ${total.toLocaleString('pt-BR')},00`;
    }
    
    const custoCalc = document.getElementById('custo-roteiro-calc');
    if(custoCalc) custoCalc.innerText = `R$ ${total.toLocaleString('pt-BR')},00`;
    
    setTimeout(() => {
        if(budgetDisplay) budgetDisplay.style.transform = 'scale(1)';
    }, 200);

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

    // Atualiza o valor de renda no roteiro (Hospedagem por Renda)
    const valRendaItinerary = document.getElementById('val-renda-itinerary');
    if(valRendaItinerary) {
        valRendaItinerary.innerText = renda.toLocaleString('pt-BR');
    }

    // Lógica de recomendação visual
    const hotelEcon = document.getElementById('hotel-econ');
    const hotelPousada = document.getElementById('hotel-pousada');

    if(renda < 3000) {
        hotelEcon.style.borderColor = "#27AE60";
        hotelPousada.style.borderColor = "#E2E8F0";
    } else {
        hotelPousada.style.borderColor = "#27AE60";
        hotelEcon.style.borderColor = "#E2E8F0";
    }
}

// Botões de Ação Rápida
function autoGenerateTrip() {
    showToast("⚡ Viagem Automática", "Processando seus gostos... Roteiro e reservas otimizadas com IA. Vá até a aba Roteiro Central para ver o resultado.");
}

function surpriseTrip() {
    showToast("🎁 Viagem Surpresa", "Destino sorteado dentro do seu limite de R$ 3.000! Você vai para um Chalé Ecológico na Serra.");
}

// Módulo de Gastronomia / Flavor Route
function showPixModal(restaurantName, price) {
    const modal = document.getElementById('pixModal');
    document.getElementById('pix-title').innerText = `Garantir mesa: ${restaurantName}`;
    
    // Mostra o desconto de 20% no modal se for via Flavor Route
    const pixSubtitle = modal.querySelector('p');
    if(pixSubtitle) {
        pixSubtitle.innerHTML = `Pague o sinal via Pix para garantir sua mesa.<br><strong style="color:var(--orange)">✨ Parceria Plango: 20% OFF aplicado!</strong>`;
    }
    
    modal.style.display = 'flex';
}

// Toggle See More (Experiências Extras)
function toggleSeeMore(id) {
    const section = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    
    if(section.classList.contains('active')) {
        section.classList.remove('active');
        icon.innerText = '▼';
    } else {
        section.classList.add('active');
        icon.innerText = '▲';
    }
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
};
