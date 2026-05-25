// =============================================================
//  comanda.js — Lógica da tela de detalhes da comanda
// =============================================================

let comandaId  = null;
let comanda    = null;
let activeCategory = Object.keys(PRODUCTS)[0];

// ── Formatação ───────────────────────────────────────────────
function fmt(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ── Qtd local de um produto (baseado na comanda salva) ───────
function getQty(produtoId) {
  if (!comanda) return 0;
  const item = comanda.itens.find(i => i.produtoId === produtoId);
  return item ? item.quantidade : 0;
}

// ── Atualiza o header da comanda ─────────────────────────────
function renderHeader() {
  document.getElementById('comanda-numero').textContent = `Comanda Nº ${comanda.numero}`;
  document.getElementById('comanda-cliente').textContent =
    comanda.nomeCliente ? comanda.nomeCliente : 'Cliente não informado';
}

// ── Render: categorias (sidebar) ─────────────────────────────
function renderCategories() {
  const nav = document.getElementById('category-nav');
  nav.innerHTML = '';

  Object.entries(PRODUCTS).forEach(([key, cat]) => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (key === activeCategory ? ' active' : '');
    btn.innerHTML = `<span class="cat-icon">${cat.icon}</span><span class="cat-name">${cat.name}</span>`;
    btn.addEventListener('click', () => {
      activeCategory = key;
      renderCategories();
      renderProducts();
    });
    nav.appendChild(btn);
  });
}

// ── Render: produtos (grid) ───────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const cat  = PRODUCTS[activeCategory];
  grid.innerHTML = '';

  document.getElementById('category-title').textContent = `${cat.icon} ${cat.name}`;

  cat.items.forEach(produto => {
    const qty  = getQty(produto.id);
    const card = document.createElement('div');
    card.className = 'product-card' + (qty > 0 ? ' has-item' : '');

    card.innerHTML = `
      <div class="product-info">
        <span class="product-name">${produto.name}</span>
        <span class="product-price">${fmt(produto.price)}</span>
      </div>
      <div class="product-controls">
        <button class="qty-btn minus" data-id="${produto.id}" ${qty === 0 ? 'disabled' : ''}>−</button>
        <span class="qty-display">${qty}</span>
        <button class="qty-btn plus" data-id="${produto.id}">+</button>
      </div>
    `;

    card.querySelector('.plus').addEventListener('click', () => {
      const newQty = getQty(produto.id) + 1;
      comanda = Storage.setItemQuantity(comandaId, produto, newQty);
      renderProducts();
      renderOrder();
    });

    card.querySelector('.minus').addEventListener('click', () => {
      const newQty = Math.max(0, getQty(produto.id) - 1);
      comanda = Storage.setItemQuantity(comandaId, produto, newQty);
      renderProducts();
      renderOrder();
    });

    grid.appendChild(card);
  });
}

// ── Render: pedido (painel direito) ──────────────────────────
function renderOrder() {
  const list    = document.getElementById('order-list');
  const empty   = document.getElementById('order-empty');
  const totalEl = document.getElementById('order-total');
  const btnClose = document.getElementById('btn-fechar-comanda');

  totalEl.textContent = fmt(comanda.total);
  list.innerHTML = '';

  if (!comanda.itens.length) {
    empty.style.display = 'flex';
    list.style.display  = 'none';
    btnClose.disabled   = true;
    return;
  }

  empty.style.display = 'none';
  list.style.display  = 'block';
  btnClose.disabled   = false;

  comanda.itens.forEach(item => {
    const el = document.createElement('div');
    el.className = 'order-item';
    el.innerHTML = `
      <div class="order-item-info">
        <span class="order-item-qty">${item.quantidade}×</span>
        <span class="order-item-name">${item.nome}</span>
      </div>
      <div class="order-item-right">
        <span class="order-item-subtotal">${fmt(item.preco * item.quantidade)}</span>
        <button class="btn-remove-item" title="Remover item" data-id="${item.produtoId}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `;

    el.querySelector('.btn-remove-item').addEventListener('click', () => {
      comanda = Storage.removeItem(comandaId, item.produtoId);
      renderProducts();
      renderOrder();
    });

    list.appendChild(el);
  });
}

// ── Fechar comanda ───────────────────────────────────────────
function handleFecharComanda() {
  const modal = document.getElementById('modal-fechar');
  document.getElementById('modal-total-preview').textContent = fmt(comanda.total);
  modal.classList.add('active');
}

function confirmFecharComanda() {
  Storage.closeComanda(comandaId);
  window.location.href = 'index.html?fechada=1';
}

// ── Busca de produtos ────────────────────────────────────────
function setupSearch() {
  const input = document.getElementById('search-input');
  const grid  = document.getElementById('products-grid');
  const title = document.getElementById('category-title');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();

    if (!q) {
      renderCategories();
      renderProducts();
      return;
    }

    // Desseleciona categoria visual
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    title.textContent = '🔍 Resultados';
    grid.innerHTML = '';

    const results = [];
    Object.values(PRODUCTS).forEach(cat => {
      cat.items.forEach(p => {
        if (p.name.toLowerCase().includes(q)) results.push(p);
      });
    });

    if (!results.length) {
      grid.innerHTML = '<p class="no-results">Nenhum produto encontrado.</p>';
      return;
    }

    results.forEach(produto => {
      const qty  = getQty(produto.id);
      const card = document.createElement('div');
      card.className = 'product-card' + (qty > 0 ? ' has-item' : '');

      card.innerHTML = `
        <div class="product-info">
          <span class="product-name">${produto.name}</span>
          <span class="product-price">${fmt(produto.price)}</span>
        </div>
        <div class="product-controls">
          <button class="qty-btn minus" data-id="${produto.id}" ${qty === 0 ? 'disabled' : ''}>−</button>
          <span class="qty-display">${qty}</span>
          <button class="qty-btn plus" data-id="${produto.id}">+</button>
        </div>
      `;

      card.querySelector('.plus').addEventListener('click', () => {
        const newQty = getQty(produto.id) + 1;
        comanda = Storage.setItemQuantity(comandaId, produto, newQty);
        renderOrder();
        setupSearch(); // re-trigger search
        input.dispatchEvent(new Event('input'));
      });

      card.querySelector('.minus').addEventListener('click', () => {
        const newQty = Math.max(0, getQty(produto.id) - 1);
        comanda = Storage.setItemQuantity(comandaId, produto, newQty);
        renderOrder();
        input.dispatchEvent(new Event('input'));
      });

      grid.appendChild(card);
    });
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  comandaId    = params.get('id');

  if (!comandaId) {
    window.location.href = 'index.html';
    return;
  }

  comanda = Storage.getComanda(comandaId);
  console.log("Dados da comanda carregados:", comanda); // Adicione esta linha

  if (!comanda || comanda.status !== 'aberta') {
    window.location.href = 'index.html';
    return;
  }

  renderHeader();
  renderCategories();
  renderProducts();
  renderOrder();
  setupSearch();

  // Fechar comanda
  document.getElementById('btn-fechar-comanda').addEventListener('click', handleFecharComanda);
  document.getElementById('btn-confirm-fechar').addEventListener('click', confirmFecharComanda);

  // Cancelar modal
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  });

  // Voltar
  document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
