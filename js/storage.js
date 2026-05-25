// =============================================================
//  storage.js — Gerenciamento de dados (localStorage)
//  Todas as operações de leitura/escrita das comandas
// =============================================================

const Storage = {
  KEY: 'rcmd_comandas',

  // ── Leitura ─────────────────────────────────────────────
  getAll() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  },

  getComanda(id) {
    return this.getAll()[id] || null;
  },

  getOpenComandas() {
    const all = this.getAll();
    return Object.values(all)
      .filter(c => c.status === 'aberta')
      .sort((a, b) => Number(a.numero) - Number(b.numero));
  },

  getClosedComandas() {
    const all = this.getAll();
    return Object.values(all)
      .filter(c => c.status === 'fechada')
      .sort((a, b) => new Date(b.fechadaEm) - new Date(a.fechadaEm));
  },

  numeroExiste(numero) {
    const open = this.getOpenComandas();
    return open.some(c => String(c.numero) === String(numero));
  },

  // ── Escrita ─────────────────────────────────────────────
  _save(comandas) {
    localStorage.setItem(this.KEY, JSON.stringify(comandas));
  },

  createComanda(numero, nomeCliente) {
    const all = this.getAll();
    const id  = `cmd_${Date.now()}`;
    const comanda = {
      id,
      numero:      String(numero),
      nomeCliente: nomeCliente ? nomeCliente.trim() : '',
      itens:       [],
      status:      'aberta',
      total:       0,
      criadaEm:   new Date().toISOString(),
      fechadaEm:  null,
    };
    all[id] = comanda;
    this._save(all);
    return comanda;
  },

  // ── Itens ────────────────────────────────────────────────
  setItemQuantity(comandaId, produto, qty) {
    const all    = this.getAll();
    const comanda = all[comandaId];
    if (!comanda) return null;

    const idx = comanda.itens.findIndex(i => i.produtoId === produto.id);

    if (qty <= 0) {
      if (idx >= 0) comanda.itens.splice(idx, 1);
    } else if (idx >= 0) {
      comanda.itens[idx].quantidade = qty;
    } else {
      comanda.itens.push({
        produtoId:  produto.id,
        nome:       produto.name,
        preco:      produto.price,
        quantidade: qty,
      });
    }

    comanda.total = comanda.itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
    this._save(all);
    return comanda;
  },

  removeItem(comandaId, produtoId) {
    const all     = this.getAll();
    const comanda = all[comandaId];
    if (!comanda) return null;
    comanda.itens = comanda.itens.filter(i => i.produtoId !== produtoId);
    comanda.total = comanda.itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
    this._save(all);
    return comanda;
  },

  // ── Status ───────────────────────────────────────────────
  closeComanda(id) {
    const all = this.getAll();
    if (!all[id]) return null;
    all[id].status    = 'fechada';
    all[id].fechadaEm = new Date().toISOString();
    this._save(all);
    return all[id];
  },

  reopenComanda(id) {
    const all = this.getAll();
    if (!all[id]) return null;
    all[id].status    = 'aberta';
    all[id].fechadaEm = null;
    this._save(all);
    return all[id];
  },

  deleteComanda(id) {
    const all = this.getAll();
    delete all[id];
    this._save(all);
  },

  // ── Estatísticas ─────────────────────────────────────────
  getStats() {
    const all    = Object.values(this.getAll());
    const abertas = all.filter(c => c.status === 'aberta');
    const fechadas = all.filter(c => c.status === 'fechada');
    return {
      abertas:      abertas.length,
      fechadas:     fechadas.length,
      totalAberto:  abertas.reduce((s, c) => s + c.total, 0),
      totalFechado: fechadas.reduce((s, c) => s + c.total, 0),
    };
  },
};
