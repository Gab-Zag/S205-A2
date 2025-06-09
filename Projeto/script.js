const adsContainer = document.getElementById('adsContainer');
const formPopup = document.getElementById('formPopup');
const adForm = document.getElementById('adForm');
const bannerCarousel = document.getElementById('bannerCarousel');

let ads = [
  {
    empresa: "Empresa Exemplo 1",
    titulo: "Vaga de Estágio em TI",
    descricao: "Oportunidade para estagiários na área de tecnologia.",
    imagem: "https://i.postimg.cc/yNbv30p8/ti.jpg",
    categorias: ["Estágio"]
  },
  {
    empresa: "Empresa Exemplo 2",
    titulo: "Intercâmbio Cultural",
    descricao: "Participe do nosso programa de intercâmbio para estudantes.",
    imagem: "https://i.postimg.cc/jdyfzy2S/EGALI-RA1000.png",
    categorias: ["Intercâmbio"]
  },
  {
    empresa: "Empresa Exemplo 3",
    titulo: "Auxílio Estudantil 2025",
    descricao: "Programa de auxílio financeiro para estudantes carentes.",
    imagem: "https://i.postimg.cc/j2r2Mk33/Banco-do-Brasil.jpg",
    categorias: ["Auxílio Estudantil"]
  }
];

let currentBannerIndex = 0;
let bannerInterval;

function openForm() {
  formPopup.style.display = 'block';
}

function closeForm() {
  formPopup.style.display = 'none';
  adForm.reset();
}

adForm.onsubmit = function (e) {
  e.preventDefault();
  const empresa = document.getElementById('empresa').value;
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const imagem = document.getElementById('imagem').value;
  const categoriaSelect = document.getElementById('categoria');
  const categorias = Array.from(categoriaSelect.selectedOptions).map(opt => opt.value);

  const newAd = { empresa, titulo, descricao, imagem, categorias };
  ads.push(newAd);
  renderAds(ads);
  renderBanner();  // Atualiza o banner com a nova imagem
  closeForm();
};

function renderAds(adList) {
  adsContainer.innerHTML = '';
  adList.forEach(ad => {
    const card = document.createElement('div');
    card.className = 'ad-card';
    card.innerHTML = `
      <img src="${ad.imagem}" alt="Imagem do anúncio" />
      <h3>${ad.empresa}</h3>
      <strong>${ad.titulo}</strong>
      <p>${ad.descricao}</p>
      <small>${ad.categorias.join(', ')}</small>
    `;
    adsContainer.appendChild(card);
  });
}

function renderBanner() {
  bannerCarousel.innerHTML = '';
  if (ads.length === 0) return;

  ads.forEach((ad, index) => {
    const img = document.createElement('img');
    img.src = ad.imagem;
    img.alt = ad.titulo;
    img.style.position = 'absolute';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.transition = 'opacity 1s ease-in-out';
    img.style.opacity = (index === currentBannerIndex) ? '1' : '0';
    bannerCarousel.appendChild(img);
  });

  // Se já existir intervalo, limpa para reiniciar
  if (bannerInterval) clearInterval(bannerInterval);

  bannerInterval = setInterval(() => {
    const images = bannerCarousel.querySelectorAll('img');
    images.forEach(img => img.style.opacity = '0');
    currentBannerIndex++;
    if (currentBannerIndex >= images.length) currentBannerIndex = 0;
    images[currentBannerIndex].style.opacity = '1';
  }, 3000);
}

function filterAds(filtro) {
  const filtrados = ads.filter(ad => ad.categorias.includes(filtro));
  renderAds(filtrados);
}

function showAllAds() {
  renderAds(ads);
}

// Renderiza anúncios e banner inicial ao carregar a página
renderAds(ads);
renderBanner();
