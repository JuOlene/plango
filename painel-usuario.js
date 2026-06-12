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

    // Reinitialize map when switching to roteiro
    if(viewId === 'roteiro') {
        setTimeout(() => {
            if(map) map.invalidateSize();
        }, 100);
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

    // Reinitialize map size when switching to map tab
    if(viewId === 'roteiro-mapa') {
        setTimeout(() => {
            if(map) map.invalidateSize();
        }, 100);
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

// =============================================
// BANCO DE DADOS DE ATIVIDADES POR PERFIL
// =============================================
const activityDatabase = {
    praia: {
        icon: '🏖️', name: 'Praia', color: '#2392D0',
        activities: [
            { time: '10:00', title: '🏖️ Praia do Forte', desc: 'Piscinas naturais e mar calmo. Perfeito para relaxar.', price: 'Grátis', priceColor: '#27AE60', transport: '🚲 15 min de bike do hotel' },
            { time: '15:00', title: '🏄 Surf na Praia Brava', desc: 'Aulas de surf para todos os níveis. Pranchas inclusas.', price: 'R$ 80', transport: '🚗 Uber (~R$ 20)' },
            { time: '09:00', title: '🚤 Passeio de Lancha', desc: 'Passeio pelas ilhas próximas com parada para mergulho.', price: 'R$ 150', transport: '🚐 Transfer do hotel' },
            { time: '16:00', title: '🍹 Sunset no Quiosque', desc: 'Aproveite o pôr do sol com drinks e petiscos locais.', price: 'R$ 60', transport: '🚶 A pé (5 min)' }
        ]
    },
    aventura: {
        icon: '🧗', name: 'Aventura', color: '#E67E22',
        activities: [
            { time: '08:00', title: '🧗 Rapel na Cachoeira', desc: 'Descida de 40m com guia especializado. Adrenalina pura!', price: 'R$ 150', transport: '🚐 Van do hotel' },
            { time: '14:00', title: '🚴 Trilha de Mountain Bike', desc: 'Percurso de 15km por mata nativa com vista panorâmica.', price: 'R$ 90', transport: '🚐 Transfer incluso' },
            { time: '09:00', title: '🛶 Rafting no Rio das Almas', desc: 'Aventura em corredeiras de nível médio.', price: 'R$ 120', transport: '🚗 Uber (~R$ 25)' },
            { time: '15:30', title: '🧗 Escalada Indoor', desc: 'Treinamento de escalada para todos os níveis.', price: 'R$ 70', transport: '🚶 A pé (15 min)' }
        ]
    },
    cultura: {
        icon: '🏛️', name: 'Cultura & Arte', color: '#8E44AD',
        activities: [
            { time: '10:00', title: '🏛️ Museu de Arte Regional', desc: 'Acervo com mais de 500 obras de artistas locais.', price: 'R$ 20', transport: '🚕 Uber (~R$ 15)' },
            { time: '15:00', title: '🎭 Centro Histórico', desc: 'Tour guiado pela arquitetura colonial e igrejas centenárias.', price: 'R$ 35', transport: '🚶 A pé (10 min)' },
            { time: '11:00', title: '🎨 Oficina de Cerâmica', desc: 'Aprenda a fazer peças artesanais com locais.', price: 'R$ 50', transport: '🚕 Uber (~R$ 10)' },
            { time: '19:00', title: '🎻 Concerto no Teatro Municipal', desc: 'Apresentação da orquestra sinfônica da cidade.', price: 'R$ 80', transport: '🚗 Uber (~R$ 20)' }
        ]
    },
    gastronomia: {
        icon: '🍽️', name: 'Gastronomia', color: '#F26419',
        activities: [
            { time: '13:00', title: '🍽️ Bistrô do Litoral', desc: 'Experiência Gastronômica via Flavor Route. Cupom: GoRoute (20% OFF).', price: '~R$ 72 (com desc.)', flavorRoute: true, transport: '🚶 5 min a pé' },
            { time: '20:00', title: '🍷 Restaurante Oásis Fine Dining', desc: 'Jantar premium com vista para o mar. Parceria Flavor Route.', price: '~R$ 160', flavorRoute: true, transport: '🚕 Uber (~R$ 18)' },
            { time: '12:30', title: '🥘 Feira Culinária Local', desc: 'Prove pratos típicos da região em barraquinhas.', price: 'R$ 45', transport: '🚶 A pé (10 min)' },
            { time: '16:00', title: '☕ Degustação de Cafés Especiais', desc: 'Conheça métodos de extração e grãos selecionados.', price: 'R$ 60', transport: '🚕 Uber (~R$ 12)' }
        ]
    },
    noturno: {
        icon: '🎉', name: 'Vida Noturna', color: '#9B59B6',
        activities: [
            { time: '22:00', title: '🎉 Balada Beach Club', desc: 'Evento com DJ internacional à beira-mar.', price: 'R$ 50 entrada', transport: '🚕 Uber (~R$ 12)' },
            { time: '23:00', title: '🍹 Rooftop Bar Skyline', desc: 'Coquetéis artesanais e música ao vivo com vista panorâmica.', price: '~R$ 80', transport: '🚶 A pé (5 min)' },
            { time: '21:00', title: '🎸 Pub de Rock Clássico', desc: 'Música ao vivo e cervejas artesanais.', price: 'R$ 30', transport: '🚗 Uber (~R$ 15)' },
            { time: '00:00', title: '🌙 Luau na Praia', desc: 'Festa com fogueira, música acústica e gente animada.', price: 'Grátis', priceColor: '#27AE60', transport: '🚶 A pé' }
        ]
    },
    natureza: {
        icon: '🌿', name: 'Natureza', color: '#27AE60',
        activities: [
            { time: '07:00', title: '🌄 Nascer do Sol no Mirante', desc: 'Vista espetacular do litoral. Experiência única!', price: 'Grátis', priceColor: '#27AE60', transport: '🚶 Trilha de 20 min' },
            { time: '14:00', title: '⛵ Passeio de Barco: Ilha do Sol', desc: 'Visita às ilhas vizinhas com parada para mergulho.', price: 'R$ 120', transport: '🚐 Transfer ao porto' },
            { time: '08:30', title: '🥾 Trilha das Cachoeiras', desc: 'Caminhada leve passando por três quedas d\'água.', price: 'R$ 40', transport: '🚗 Uber (~R$ 20)' },
            { time: '16:30', title: '🦜 Observação de Pássaros', desc: 'Passeio guiado na reserva ecológica ao fim da tarde.', price: 'R$ 65', transport: '🚐 Transfer incluso' }
        ]
    }
};

const destinationsByStyle = {
    'praia': { name: 'Litoral Norte', emoji: '🏖️', lat: -12.58, lng: -38.00 },
    'aventura': { name: 'Serra Gaúcha', emoji: '🏔️', lat: -29.17, lng: -51.18 },
    'cultura': { name: 'Ouro Preto', emoji: '🏛️', lat: -20.38, lng: -43.50 },
    'gastronomia': { name: 'Litoral Norte', emoji: '🍽️', lat: -12.58, lng: -38.00 },
    'noturno': { name: 'Florianópolis', emoji: '🎉', lat: -27.60, lng: -48.55 },
    'natureza': { name: 'Chapada Diamantina', emoji: '🌿', lat: -12.60, lng: -41.38 },
    'default': { name: 'Litoral Norte', emoji: '🏖️', lat: -12.58, lng: -38.00 }
};

const durationMap = {
    'Fim de semana (2-3 dias)': { days: 3, label: '3 dias', dayNames: ['Sexta-feira', 'Sábado', 'Domingo'] },
    'Curta temporada (4-6 dias)': { days: 5, label: '5 dias', dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'] },
    'Longa (7+ dias)': { days: 7, label: '7 dias', dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'] }
};

const dayThemes = [
    'Descoberta & Conexão', 'Cultura & Sabor', 'Aventura & Natureza',
    'Relaxamento & Prazer', 'Exploração Livre', 'Imersão Total', 'Despedida & Vista'
];

// =============================================
// LEITURA DAS RESPOSTAS DO QUIZ
// =============================================
function getQuizAnswers() {
    const orcamento = parseInt(document.getElementById('quiz-orcamento').value) || 3000;
    const duracao = document.getElementById('quiz-duracao').value;
    
    const estilos = [];
    document.querySelectorAll('#quiz-step-2 input[type="checkbox"]:checked').forEach(cb => {
        estilos.push(cb.value);
    });

    const hospedagem = document.querySelector('input[name="hospedagem"]:checked');
    const hospedagemVal = hospedagem ? hospedagem.value : 'pousada';

    const ritmo = document.getElementById('quiz-ritmo').value;

    const gastro = [];
    document.querySelectorAll('#quiz-step-4 input[type="checkbox"]:checked').forEach(cb => {
        gastro.push(cb.value);
    });

    return { orcamento, duracao, estilos, hospedagem: hospedagemVal, ritmo, gastro };
}

// =============================================
// GERAÇÃO DINÂMICA DO ROTEIRO
// =============================================
function generateItinerary(answers) {
    const cronograma = document.getElementById('roteiro-cronograma');
    if(!cronograma) return;

    const dur = durationMap[answers.duracao] || durationMap['Fim de semana (2-3 dias)'];
    const numDays = dur.days;

    // Determinar destino baseado no primeiro estilo escolhido
    const mainStyle = answers.estilos[0] || 'default';
    const dest = destinationsByStyle[mainStyle] || destinationsByStyle['default'];

    // Coletar todas as atividades dos estilos selecionados
    let allActivities = [];
    answers.estilos.forEach(estilo => {
        if(activityDatabase[estilo]) {
            activityDatabase[estilo].activities.forEach(act => {
                allActivities.push({ ...act, category: estilo, color: activityDatabase[estilo].color });
            });
        }
    });

    // Se não houver atividades, usar padrão
    if(allActivities.length === 0) {
        allActivities = activityDatabase.praia.activities.map(a => ({ ...a, category: 'praia', color: '#2392D0' }));
    }

    // Preço da hospedagem por dia
    const hotelPrices = { hostel: 150, pousada: 350, hotel: 500, resort: 900 };
    const hotelNames = { hostel: 'Hostel Design', pousada: 'Pousada Boutique', hotel: 'Hotel Confortável', resort: 'Resort Premium' };
    const hotelPrice = hotelPrices[answers.hospedagem] || 350;
    const hotelName = hotelNames[answers.hospedagem] || 'Pousada Boutique';

    // Gerar HTML dos dias
    let html = '';
    let totalEstimado = 800; // voo fixo
    totalEstimado += hotelPrice * (numDays - 1);
    let mapPoints = [];

    for(let day = 0; day < numDays; day++) {
        const dayName = dur.dayNames[day] || `Dia ${day+1}`;
        const theme = dayThemes[day % dayThemes.length];
        
        // Selecionar atividades para este dia (distribuir igualmente)
        const activitiesPerDay = Math.max(2, Math.ceil(allActivities.length / numDays));
        const startIdx = (day * activitiesPerDay) % allActivities.length;
        let dayActivities = [];
        
        for(let i = 0; i < activitiesPerDay && i < 3; i++) {
            const idx = (startIdx + i) % allActivities.length;
            dayActivities.push(allActivities[idx]);
        }

        html += `<div class="day-card">
            <div class="day-header">
                <h3>Dia ${day+1} &mdash; ${theme}</h3>
                <span class="text-orange" style="font-weight:bold;">${dayName}</span>
            </div>
            <div class="item-list">`;

        // Hospedagem no primeiro dia
        if(day === 0) {
            html += `
                <div class="trip-item" style="border-left: 5px solid #27AE60; background: #F0FFF4; padding: 20px;">
                    <div class="item-info">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <h4 style="font-size:1.1rem;">🏠 ${hotelName}</h4>
                            <span class="housing-badge">Baseado no seu perfil</span>
                        </div>
                        <p>Hospedagem selecionada para <strong>${answers.hospedagem}</strong> — R$ ${hotelPrice}/noite × ${numDays - 1} noites.</p>
                    </div>
                    <div class="item-controls">
                        <span class="price-tag" style="font-size:1rem;">Total: R$ ${(hotelPrice * (numDays - 1)).toLocaleString('pt-BR')}</span>
                    </div>
                </div>`;

            // Chegada
            html += `
                <div class="trip-item">
                    <div class="time-label">09:00</div>
                    <div class="item-info">
                        <h4>🛬 Chegada e Transfer</h4>
                        <p>Chegada em ${dest.name}. Sugerimos transfer local ou Uber (~R$ 45).</p>
                        <div class="transport-tag">🚗 Uber disponível no desembarque</div>
                    </div>
                </div>`;
        }

        // Último dia — checkout
        if(day === numDays - 1) {
            dayActivities = dayActivities.slice(0, 1); // menos atividades no último dia
        }

        dayActivities.forEach(act => {
            const priceStyle = act.priceColor ? `color:${act.priceColor};` : '';
            const borderStyle = `border-left:4px solid ${act.color};`;
            
            let priceHtml = `<span class="price-tag" style="${priceStyle}">${act.price}</span>`;
            let flavorHtml = '';
            
            if(act.flavorRoute) {
                priceHtml += `
                    <a href="https://eduardarodriguesz.github.io/FlavorRoute/" target="_blank" class="btn-primary" style="font-size:0.8rem;padding:8px 12px;text-decoration:none;">Reservar no Flavor Route 🔗</a>`;
                flavorHtml = `<span class="discount-badge">✨ 20% OFF</span>`;
            }

            html += `
                <div class="trip-item" style="${borderStyle}">
                    <div class="time-label">${act.time}</div>
                    <div class="item-info">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <h4>${act.title}</h4>
                            ${flavorHtml}
                        </div>
                        <p>${act.desc}</p>
                        ${act.transport ? `<div class="transport-tag">${act.transport}</div>` : ''}
                    </div>
                    <div class="item-controls">${priceHtml}</div>
                </div>`;

            // Parse preço para total
            const priceNum = parseInt((act.price || '').replace(/[^\d]/g, '')) || 0;
            totalEstimado += priceNum;

            mapPoints.push(act.title.replace(/[^\w\s]/g, '').trim());
        });

        // Checkout no último dia
        if(day === numDays - 1) {
            html += `
                <div class="trip-item">
                    <div class="time-label">16:00</div>
                    <div class="item-info">
                        <h4>🛫 Checkout e Retorno</h4>
                        <p>Transfer para o aeroporto. Fim da jornada!</p>
                    </div>
                </div>`;
        }

        html += `</div></div>`;
    }

    cronograma.innerHTML = html;

    // Atualizar título e descrição
    document.getElementById('roteiro-titulo').innerHTML = `Roteiro: ${dest.name} ${dest.emoji}`;
    document.getElementById('roteiro-perfil-desc').innerHTML = `Gerado com base no seu perfil: <strong>${answers.estilos.map(e => activityDatabase[e]?.name || e).join(', ')}</strong>`;
    document.getElementById('roteiro-resumo-tag').innerHTML = `${dur.label} &middot; R$ ${totalEstimado.toLocaleString('pt-BR')} estimado`;

    // Atualizar mapa
    const routeDesc = document.getElementById('mapa-rota-desc');
    if(routeDesc) {
        const stops = [hotelName, ...mapPoints.slice(0, 5), 'Aeroporto'];
        routeDesc.textContent = stops.join(' → ');
    }

    updateMap(dest, answers.estilos, numDays);

    // Atualizar orçamento global
    tripTotalBudget = totalEstimado;
    const budgetDisplay = document.getElementById('total-budget');
    if(budgetDisplay) {
        budgetDisplay.style.transform = 'scale(1.1)';
        budgetDisplay.innerText = `R$ ${totalEstimado.toLocaleString('pt-BR')},00`;
        setTimeout(() => { budgetDisplay.style.transform = 'scale(1)'; }, 200);
    }
    const custoCalc = document.getElementById('custo-roteiro-calc');
    if(custoCalc) custoCalc.innerText = `R$ ${totalEstimado.toLocaleString('pt-BR')},00`;

    calculateFinance();
}

// =============================================
// SALVAR QUIZ E ATUALIZAR ROTEIRO
// =============================================
function saveQuiz() {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    const done = document.getElementById('quiz-step-done');
    if (done) done.classList.add('active');
    const bar = document.getElementById('quiz-progress');
    if (bar) bar.style.width = '100%';

    // Ler respostas e gerar roteiro
    const answers = getQuizAnswers();
    generateItinerary(answers);

    showToast("🧠 Cérebro Atualizado!", "Seu roteiro foi recalculado com base nas suas novas preferências.");
}

// =============================================
// RESETAR QUIZ (Reajustar Perfil)
// =============================================
function resetQuiz() {
    // Navega para a aba Personalizar
    switchSubView('roteiro-perfil', document.querySelectorAll('.sub-tab')[2]);
    
    // Volta para o step 1 do quiz
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    const step1 = document.getElementById('quiz-step-1');
    if(step1) step1.classList.add('active');
    
    // Reseta barra de progresso
    const bar = document.getElementById('quiz-progress');
    if(bar) bar.style.width = '25%';
    
    showToast("🧠 Reajustando Perfil", "Responda o quiz novamente para recalibrar seu roteiro.");
}

// =============================================
// MAPA INTERATIVO (Leaflet)
// =============================================
let map = null;
let mapMarkers = [];
let mapPolyline = null;

function initMap() {
    if(map) return;
    
    const mapContainer = document.getElementById('leaflet-map');
    if(!mapContainer) return;

    map = L.map('leaflet-map').setView([-12.58, -38.00], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Marcadores iniciais — Litoral Norte (Praia do Forte / BA)
    const defaultPoints = [
        { lat: -12.5741, lng: -38.0017, label: '🏨 Hotel', popup: 'Hotel — Check-in' },
        { lat: -12.5766, lng: -37.9950, label: '🏖️', popup: 'Praia do Forte' },
        { lat: -12.5795, lng: -37.9990, label: '🍽️', popup: 'Bistrô do Litoral' },
        { lat: -12.5720, lng: -38.0050, label: '🛍️', popup: 'Feira Gastronômica' },
        { lat: -12.5680, lng: -37.9980, label: '🍷', popup: 'Oásis Fine Dining' },
        { lat: -12.5650, lng: -38.0100, label: '✈️', popup: 'Aeroporto' },
    ];

    addMapPoints(defaultPoints);
}

function addMapPoints(points) {
    // Limpar marcadores anteriores
    mapMarkers.forEach(m => map.removeLayer(m));
    mapMarkers = [];
    if(mapPolyline) map.removeLayer(mapPolyline);

    const latlngs = [];

    points.forEach((pt, idx) => {
        const marker = L.marker([pt.lat, pt.lng]).addTo(map);
        marker.bindPopup(`<strong>${idx + 1}. ${pt.popup}</strong>`);
        mapMarkers.push(marker);
        latlngs.push([pt.lat, pt.lng]);
    });

    // Desenha polyline da rota
    if(latlngs.length > 1) {
        mapPolyline = L.polyline(latlngs, {
            color: '#0A4D80',
            weight: 4,
            opacity: 0.8,
            dashArray: '10 6'
        }).addTo(map);
    }

    // Ajustar zoom para caber todos os pontos
    if(latlngs.length > 0) {
        const bounds = L.latLngBounds(latlngs);
        map.fitBounds(bounds, { padding: [40, 40] });
    }
}

function updateMap(dest, estilos, numDays) {
    if(!map) return;

    // Gerar pontos fictícios ao redor do destino
    const points = [
        { lat: dest.lat, lng: dest.lng, label: '🏨', popup: 'Hotel — Check-in' }
    ];

    const actNames = [];
    estilos.forEach(estilo => {
        if(activityDatabase[estilo]) {
            activityDatabase[estilo].activities.forEach(act => {
                actNames.push(act.title.replace(/[^\w\s\u00C0-\u024F]/g, '').trim());
            });
        }
    });

    // Distribuir pontos ao redor do destino
    const uniqueNames = [...new Set(actNames)].slice(0, 6);
    uniqueNames.forEach((name, i) => {
        const angle = (i / uniqueNames.length) * 2 * Math.PI;
        const radius = 0.01 + Math.random() * 0.015;
        points.push({
            lat: dest.lat + Math.cos(angle) * radius,
            lng: dest.lng + Math.sin(angle) * radius,
            label: '📍',
            popup: name
        });
    });

    points.push({
        lat: dest.lat - 0.02,
        lng: dest.lng + 0.02,
        label: '✈️',
        popup: 'Aeroporto — Retorno'
    });

    addMapPoints(points);
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

    if(hotelEcon && hotelPousada) {
        if(renda < 3000) {
            hotelEcon.style.borderColor = "#27AE60";
            hotelPousada.style.borderColor = "#E2E8F0";
        } else {
            hotelPousada.style.borderColor = "#27AE60";
            hotelEcon.style.borderColor = "#E2E8F0";
        }
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

// =============================================
// CHAT DE NEGOCIAÇÃO COM EMPRESAS
// =============================================
let currentChatEmpresa = '';
let currentChatOferta = '';

const autoReplies = [
    "Olá! Que bom que se interessou pela nossa oferta. Como posso ajudar?",
    "Posso oferecer um desconto adicional de 5% se fechar agora! 😊",
    "Temos disponibilidade para as datas do seu roteiro. Quer que eu reserve?",
    "Claro! Podemos personalizar o passeio de acordo com seu perfil.",
    "Ótima pergunta! O tour inclui transporte, guia e lanche.",
    "Se preferir, posso enviar mais fotos e detalhes por aqui mesmo.",
    "Temos ótimas avaliações dos viajantes! ⭐⭐⭐⭐⭐",
    "Posso fazer um pacote especial combinando com outros serviços."
];
let replyIndex = 0;

function openChat(empresaNome, ofertaNome) {
    currentChatEmpresa = empresaNome;
    currentChatOferta = ofertaNome;
    replyIndex = 0;

    document.getElementById('chat-empresa-nome').textContent = empresaNome;

    const messagesDiv = document.getElementById('chat-messages');
    messagesDiv.innerHTML = '';

    // Mensagem de boas-vindas da empresa
    addChatMessage('empresa', `Olá! Somos a ${empresaNome}. Vimos que você tem interesse no "${ofertaNome}". Como podemos ajudar? 😊`);

    setTimeout(() => {
        addChatMessage('sistema', `Você está negociando: ${ofertaNome} com ${empresaNome}`);
    }, 300);

    const modal = document.getElementById('chatModal');
    modal.style.display = 'flex';

    setTimeout(() => {
        document.getElementById('chat-input').focus();
    }, 100);
}

function closeChat() {
    document.getElementById('chatModal').style.display = 'none';
}

function addChatMessage(type, text) {
    const messagesDiv = document.getElementById('chat-messages');

    const msgDiv = document.createElement('div');
    msgDiv.style.cssText = 'max-width:80%; padding:12px 16px; border-radius:16px; font-size:0.9rem; line-height:1.5; animation:fadeIn 0.3s;';

    if(type === 'user') {
        msgDiv.style.cssText += 'align-self:flex-end; background:var(--primary-blue); color:white; border-bottom-right-radius:4px;';
    } else if(type === 'empresa') {
        msgDiv.style.cssText += 'align-self:flex-start; background:white; color:var(--text-dark); border:1px solid #E2E8F0; border-bottom-left-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,0.05);';
    } else if(type === 'sistema') {
        msgDiv.style.cssText += 'align-self:center; background:#EDF2F7; color:var(--text-light); font-size:0.8rem; text-align:center; border-radius:8px; padding:8px 12px;';
    }

    msgDiv.textContent = text;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if(!text) return;

    addChatMessage('user', text);
    input.value = '';

    // Simular digitação e resposta automática
    setTimeout(() => {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.style.cssText = 'align-self:flex-start; background:white; color:var(--text-light); border:1px solid #E2E8F0; padding:12px 18px; border-radius:16px; border-bottom-left-radius:4px; font-size:0.85rem; animation:fadeIn 0.3s;';
        typingDiv.textContent = 'digitando...';
        document.getElementById('chat-messages').appendChild(typingDiv);
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;

        setTimeout(() => {
            const typing = document.getElementById('typing-indicator');
            if(typing) typing.remove();

            const reply = autoReplies[replyIndex % autoReplies.length];
            replyIndex++;
            addChatMessage('empresa', reply);
        }, 1200 + Math.random() * 800);
    }, 400);
}

// =============================================
// ACEITAR OFERTA
// =============================================
function acceptOffer(id) {
    const actionsDiv = document.getElementById('proposta-actions-' + id);
    const tag = document.getElementById('proposta-tag-' + id);
    const card = document.getElementById('proposta-card-' + id);

    if(!actionsDiv) return;

    // Substituir botões por confirmação de sucesso
    actionsDiv.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; animation:fadeIn 0.4s;">
            <div style="width:36px; height:36px; background:#27AE60; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:1.2rem;">✓</div>
            <div>
                <p style="color:#27AE60; font-weight:700; margin:0; font-size:0.95rem;">Oferta Aceita!</p>
                <p style="color:var(--text-light); font-size:0.8rem; margin:0;">Adicionado ao seu plano</p>
            </div>
        </div>
    `;

    // Atualizar tag
    if(tag) {
        tag.textContent = 'Aceito ✓';
        tag.style.background = '#C6F6D5';
        tag.style.color = '#27AE60';
        tag.style.fontWeight = '700';
    }

    // Mudar borda do card
    if(card) {
        card.style.borderLeftColor = '#27AE60';
    }

    showToast('✅ Oferta Aceita com Sucesso!', 'O Tour Exclusivo foi adicionado ao seu roteiro e plano financeiro.');
}

// Init
window.onload = function() {
    recalculateBudget();
    runSimulation();
    
    // Inicializar mapa com delay para garantir que o container exista
    setTimeout(() => {
        initMap();
    }, 500);
};
