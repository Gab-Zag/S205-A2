// script.js
const carousel = document.querySelector('.carousel');
let index = 0;
let interval;

// Definição dos eventos
const eventos = [
    {
        image: "imagem1.jpg",
        title: "Evento 1",
        description: "Descrição do evento 1.",
        date: "01/04/2025",
        time: "18:00",
        location: "Local 1"
    },
    {
        image: "imagem2.jpg",
        title: "Evento 2",
        description: "Descrição do evento 2.",
        date: "05/04/2025",
        time: "20:00",
        location: "Local 2"
    },
    {
        image: "imagem3.jpg",
        title: "Evento 3",
        description: "Descrição do evento 3.",
        date: "10/04/2025",
        time: "19:30",
        location: "Local 3"
    }
];

// Função para criar os cards
eventos.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <div class="info">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
        </div>
    `;
    carousel.appendChild(card);
});

// Atualiza o carrossel
function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Próximo e anterior
const totalCards = eventos.length;
function nextCard() {
    index = (index + 1) % totalCards;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + totalCards) % totalCards;
    updateCarousel();
}

document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

// Arrastar no celular
let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
});

// Auto-slide
function startAutoSlide() {
    interval = setInterval(nextCard, 5000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

// Iniciar o carrossel automático
startAutoSlide();
