// =============================================================
//  app.js — Lógica da tela inicial (index.html)
// =============================================================

// ── Formatação ───────────────────────────────────────────────
function fmt(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 60000);
  if (diff < 1)  return 'agora';
  if (diff < 60) return `${diff} min`;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

// ── Renderização das comandas ────────────────────────────────
function renderComandas() {
  const list    = document.getElementById('comandas-list');
  const empty   = document.getElementById('empty-state');
  const comandas = Storage.getOpenComandas();
  const stats   = Storage.getStats();

  // Stats
  document.getElementById('stat-abertas').textContent  = stats.abertas;
  document.getElementById('stat-total').textContent    = fmt(stats.totalAberto);

  list.innerHTML = '';

  if (comandas.length === 0) {
    empty.style.display = 'flex';
    list.style.display  = 'none';
    return;
  }

  empty.style.display = 'none';
  list.style.display  = 'grid';

  comandas.forEach(c => {
    const card = document.createElement('div');
    card.className = 'comanda-card';
    card.setAttribute('data-id', c.id);

    const itensCount = c.itens.reduce((s, i) => s + i.quantidade, 0);

    card.innerHTML = `
      <div class="card-header">
        <div class="card-numero">
          <span class="num-label">Nº</span>
          <span class="num-value">${c.numero}</span>
        </div>
        <div class="card-actions">
          <button class="btn-icon btn-close-comanda" title="Fechar comanda" data-id="${c.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
          <button class="btn-icon btn-delete-comanda" title="Excluir comanda" data-id="${c.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="card-body" data-goto="${c.id}">
        <div class="card-client">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>${c.nomeCliente || 'Cliente não informado'}</span>
        </div>
        <div class="card-info">
          <div class="info-chip">
            <span class="info-label">Itens</span>
            <span class="info-val">${itensCount}</span>
          </div>
          <div class="info-chip">
            <span class="info-label">Total</span>
            <span class="info-val accent">${fmt(c.total)}</span>
          </div>
          <div class="info-chip">
            <span class="info-label">Aberta</span>
            <span class="info-val">${timeAgo(c.criadaEm)}</span>
          </div>
        </div>
      </div>
    `;

    list.appendChild(card);
  });

  // Clique no card (navegar para comanda)
  list.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = `comanda.html?id=${el.dataset.goto}`;
    });
  });

  // Fechar comanda
  list.querySelectorAll('.btn-close-comanda').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openConfirmModal(
        'Fechar Comanda',
        `Deseja fechar a comanda Nº ${Storage.getComanda(btn.dataset.id)?.numero}?<br>O valor total será registrado.`,
        'Fechar',
        () => {
          Storage.closeComanda(btn.dataset.id);
          showToast('Comanda fechada com sucesso!', 'success');
          renderComandas();
        }
      );
    });
  });

  // Excluir comanda
  list.querySelectorAll('.btn-delete-comanda').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openConfirmModal(
        'Excluir Comanda',
        `Tem certeza que deseja <strong>excluir</strong> a comanda Nº ${Storage.getComanda(btn.dataset.id)?.numero}?<br>Esta ação não pode ser desfeita.`,
        'Excluir',
        () => {
          Storage.deleteComanda(btn.dataset.id);
          showToast('Comanda excluída.', 'info');
          renderComandas();
        },
        'danger'
      );
    });
  });
}

// ── Modal: Nova Comanda ──────────────────────────────────────
function openNewComandaModal() {
  const modal = document.getElementById('modal-nova');
  modal.classList.add('active');
  document.getElementById('input-numero').focus();
  document.getElementById('input-numero').value = '';
  document.getElementById('input-nome').value   = '';
  document.getElementById('error-numero').textContent = '';
}

function closeNewComandaModal() {
  document.getElementById('modal-nova').classList.remove('active');
}

function submitNovaComanda() {
  const numero = document.getElementById('input-numero').value.trim();
  const nome   = document.getElementById('input-nome').value.trim();
  const errEl  = document.getElementById('error-numero');

  if (!numero) {
    errEl.textContent = 'O número da comanda é obrigatório.';
    document.getElementById('input-numero').focus();
    return;
  }

  if (!/^\d+$/.test(numero)) {
    errEl.textContent = 'Use apenas números.';
    document.getElementById('input-numero').focus();
    return;
  }

  if (Storage.numeroExiste(numero)) {
    errEl.textContent = `A comanda Nº ${numero} já está aberta.`;
    document.getElementById('input-numero').focus();
    return;
  }

  errEl.textContent = '';
  const comanda = Storage.createComanda(numero, nome);
  closeNewComandaModal();
  window.location.href = `comanda.html?id=${comanda.id}`;
}

// ── Modal: Confirmação ───────────────────────────────────────
function openConfirmModal(title, message, confirmLabel, onConfirm, type = 'default') {
  const modal = document.getElementById('modal-confirm');
  modal.querySelector('.modal-title').textContent       = title;
  modal.querySelector('.confirm-message').innerHTML     = message;
  const btn = modal.querySelector('#btn-confirm-ok');
  btn.textContent = confirmLabel;
  btn.className   = type === 'danger' ? 'btn btn-danger' : 'btn btn-primary';
  btn.onclick     = () => { onConfirm(); closeConfirmModal(); };
  modal.classList.add('active');
}

function closeConfirmModal() {
  document.getElementById('modal-confirm').classList.remove('active');
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderComandas();

  // Botão "+"
  document.getElementById('btn-nova-comanda').addEventListener('click', openNewComandaModal);

  // Fechar modais
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      closeNewComandaModal();
      closeConfirmModal();
    });
  });

  // Fechar clicando no backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) {
        closeNewComandaModal();
        closeConfirmModal();
      }
    });
  });

  // Submit da nova comanda
  document.getElementById('btn-criar-comanda').addEventListener('click', submitNovaComanda);

  // Enter no campo de número/nome
  document.getElementById('input-numero').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('input-nome').focus();
  });
  document.getElementById('input-nome').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitNovaComanda();
  });

  // Atualizar a cada 30s (tempos de "aberta há X min")
  setInterval(renderComandas, 30000);
});

