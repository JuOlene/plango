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

// Lógica de Chat (Relacionamento)
function startChat(clientName) {
    document.getElementById('chat-title').innerText = `Relacionamento: ${clientName}`;
    
    const chatHistory = document.getElementById('chat-history');
    chatHistory.innerHTML = `
        <div class="message msg-client">
            <strong>Intenção do Sistema (Match de Compatibilidade):</strong> Olá! ${clientName} está planejando uma viagem e o perfil tem alta aderência com o seu negócio. Destaque seus serviços para converter a venda!
        </div>
    `;

    // Troca para a aba de chat
    const chatLink = document.querySelectorAll('.sidebar-menu a')[4];
    chatLink.click();
}

function sendMessage() {
    const input = document.getElementById('msg-input');
    const msg = input.value.trim();

    if (msg !== '') {
        const chatHistory = document.getElementById('chat-history');
        
        const newMsg = document.createElement('div');
        newMsg.classList.add('message', 'msg-business');
        newMsg.innerHTML = `<strong>Você:</strong> ${msg}`;
        
        chatHistory.appendChild(newMsg);
        input.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // Resposta simulada após 2 segundos
        setTimeout(() => {
            const replyMsg = document.createElement('div');
            replyMsg.classList.add('message', 'msg-client');
            replyMsg.innerHTML = `<strong>Cliente:</strong> Gostei muito da proposta! Quais são as formas de pagamento?`;
            chatHistory.appendChild(replyMsg);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 2000);
    }
}

document.getElementById('msg-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Notificações Toast em Tempo Real
function showToast(title, message) {
    const container = document.getElementById('toast-container');
    if(!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-icon">🚀</div>
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

// Automação e Gerador de Pacotes
function simulatePackageCreation() {
    showToast("Pacote Criado!", "Sua nova experiência foi adicionada ao catálogo. O sistema começará a fazer Match com clientes.");
}

function triggerAutomationToast() {
    showToast("Campanha Ativa", "A automação está rodando. O pacote 'Especial Gastronomia' está sendo enviado para 45 usuários compatíveis.");
}

// Notificações Toast Genéricas
function triggerToast(title, message) {
    showToast(title, message);
}

// Redes Sociais: Atualizar Prévia do Instagram
function updateInstaPreview() {
    const handle = document.getElementById('insta-handle').value;
    const previewHandle = document.getElementById('preview-handle');
    
    if (handle.trim() !== "") {
        previewHandle.innerText = handle;
    } else {
        previewHandle.innerText = "suaempresa";
    }
}

// Alerta de Nova Demanda Simulado
window.onload = function() {
    setTimeout(() => {
        showToast("Novo Match!", "Um usuário buscando Natureza acabou de entrar na plataforma com 92% de compatibilidade. Envie uma proposta!");
    }, 3000);
};
