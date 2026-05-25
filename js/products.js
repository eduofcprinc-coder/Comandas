// =============================================================
//  products.js — Catálogo de produtos do restaurante
//  Edite este arquivo para adicionar/remover/alterar produtos
// =============================================================

const PRODUCTS = {
  mais_vendidos: {
    name: 'Mais vendidos',
    icon: '🔥',
    color: '#ff5722',
    items: [
      { id: 'mv1', name: 'X-Burger Clássico', price: 25.00 },
      { id: 'mv2', name: 'Big Burger Especial', price: 35.00 },
      { id: 'mv3', name: 'Porção de Batata com Bacon', price: 36.00 },
      { id: 'mv4', name: 'Chopp Pilsen 500ml', price: 16.00 },
      { id: 'mv5', name: 'Coca Cola 350ml', price: 8.00 },
      { id: 'mv6', name: 'Burger de Costela', price: 32.00 },
      { id: 'mv7', name: 'Cerveja Lata Heineken', price: 12.00 },
      { id: 'mv8', name: 'Porção de Iscas de Frango', price: 42.00 },
      { id: 'mv9', name: 'Burger Doce de Leite', price: 20.00 },
      { id: 'mv10', name: 'Cerveja 600ml Original', price: 18.00 },
    ]
  },

  bebidas: {
    name: 'Bebidas',
    icon: '🥤',
    color: '#2196f3',
    items: [
      { id: 'b1', name: 'Água sem Gás 500ml', price: 5.00 },
      { id: 'b2', name: 'Água com Gás 500ml', price: 6.00 },
      { id: 'b3', name: 'Coca Cola Lata 350ml', price: 8.00 },
      { id: 'b4', name: 'Guaraná Antarctica Lata', price: 8.00 },
      { id: 'b5', name: 'Suco de Laranja Natural', price: 12.00 },
      { id: 'b6', name: 'Suco de Uva Integral', price: 12.00 },
      { id: 'b7', name: 'H2OH! Limão', price: 9.00 },
      { id: 'b8', name: 'Ice Tea Pêssego', price: 9.00 },
      { id: 'b9', name: 'Schweppes Citrus', price: 10.00 },
      { id: 'b10', name: 'Soda Italiana', price: 15.00 },
    ]
  },

  burguer: {
    name: 'Burguer',
    icon: '🍔',
    color: '#795548',
    items: [
      { id: 'bg1', name: 'X-Salada', price: 22.00 },
      { id: 'bg2', name: 'X-Bacon', price: 26.00 },
      { id: 'bg3', name: 'X-Egg', price: 24.00 },
      { id: 'bg4', name: 'X-Calabresa', price: 26.00 },
      { id: 'bg5', name: 'X-Frango', price: 24.00 },
      { id: 'bg6', name: 'Cheese Burger', price: 18.00 },
      { id: 'bg7', name: 'Duplo Salada', price: 30.00 },
      { id: 'bg8', name: 'Burger Veggie', price: 28.00 },
      { id: 'bg9', name: 'X-Tudo Pequeno', price: 28.00 },
      { id: 'bg10', name: 'X-Coração', price: 27.00 },
    ]
  },

  big_burguer: {
    name: 'Big Burguer',
    icon: '👑',
    color: '#ffc107',
    items: [
      { id: 'bb1', name: 'Big Burger Especial', price: 35.00 },
      { id: 'bb2', name: 'Big Bacon Supreme', price: 38.00 },
      { id: 'bb3', name: 'Big Costela BBQ', price: 40.00 },
      { id: 'bb4', name: 'Big Monster (3 carnes)', price: 45.00 },
      { id: 'bb5', name: 'Big Cheddar Bacon', price: 38.00 },
      { id: 'bb6', name: 'Big Salada Premium', price: 36.00 },
      { id: 'bb7', name: 'Big Gorgonzola', price: 42.00 },
      { id: 'bb8', name: 'Big Picanha', price: 48.00 },
      { id: 'bb9', name: 'Big Egg Duplo', price: 37.00 },
      { id: 'bb10', name: 'Big Australiano', price: 41.00 },
    ]
  },

  burguer_doce: {
    name: 'Burguer Doce',
    icon: '🍩',
    color: '#e91e63',
    items: [
      { id: 'bd1', name: 'Burger de Nutella', price: 22.00 },
      { id: 'bd2', name: 'Burger Doce de Leite', price: 20.00 },
      { id: 'bd3', name: 'Burger Morango com Chocolate', price: 25.00 },
      { id: 'bd4', name: 'Burger Prestígio', price: 22.00 },
      { id: 'bd5', name: 'Burger Banana com Canela', price: 18.00 },
      { id: 'bd6', name: 'Burger Confete', price: 20.00 },
      { id: 'bd7', name: 'Burger Paçoca', price: 19.00 },
      { id: 'bd8', name: 'Burger Chocolate Branco', price: 22.00 },
      { id: 'bd9', name: 'Burger Romeu e Julieta', price: 21.00 },
      { id: 'bd10', name: 'Burger Ovomaltine', price: 24.00 },
    ]
  },

  chopp: {
    name: 'Chopp',
    icon: '🍺',
    color: '#ff9800',
    items: [
      { id: 'ch1', name: 'Chopp Pilsen 300ml', price: 10.00 },
      { id: 'ch2', name: 'Chopp Pilsen 500ml', price: 16.00 },
      { id: 'ch3', name: 'Chopp Weiss 300ml', price: 12.00 },
      { id: 'ch4', name: 'Chopp Weiss 500ml', price: 19.00 },
      { id: 'ch5', name: 'Chopp IPA 300ml', price: 14.00 },
      { id: 'ch6', name: 'Chopp IPA 500ml', price: 22.00 },
      { id: 'ch7', name: 'Chopp Black 300ml', price: 13.00 },
      { id: 'ch8', name: 'Chopp Black 500ml', price: 20.00 },
      { id: 'ch9', name: 'Chopp de Vinho 300ml', price: 14.00 },
      { id: 'ch10', name: 'Chopp de Vinho 500ml', price: 22.00 },
    ]
  },

  cervejas_lata: {
    name: 'Cervejas Lata',
    icon: '🍻',
    color: '#9e9e9e',
    items: [
      { id: 'cl1', name: 'Heineken 350ml', price: 12.00 },
      { id: 'cl2', name: 'Amstel 350ml', price: 9.00 },
      { id: 'cl3', name: 'Brahma Duplo Malte 350ml', price: 8.00 },
      { id: 'cl4', name: 'Skol 350ml', price: 7.00 },
      { id: 'cl5', name: 'Eisenbahn 350ml', price: 10.00 },
      { id: 'cl6', name: 'Budweiser 350ml', price: 10.00 },
      { id: 'cl7', name: 'Corona 330ml (Long Neck)', price: 14.00 },
      { id: 'cl8', name: 'Stella Artois 350ml', price: 11.00 },
      { id: 'cl9', name: 'Spaten 350ml', price: 10.00 },
      { id: 'cl10', name: 'Colorado Indica 350ml', price: 16.00 },
    ]
  },

  cervejas_600ml: {
    name: 'Cervejas 600ml',
    icon: '🍾',
    color: '#8d6e63',
    items: [
      { id: 'c61', name: 'Original 600ml', price: 18.00 },
      { id: 'c62', name: 'Serramalte 600ml', price: 19.00 },
      { id: 'c63', name: 'Brahma 600ml', price: 14.00 },
      { id: 'c64', name: 'Skol 600ml', price: 14.00 },
      { id: 'c65', name: 'Heineken 600ml', price: 22.00 },
      { id: 'c66', name: 'Spaten 600ml', price: 18.00 },
      { id: 'c67', name: 'Amstel 600ml', price: 16.00 },
      { id: 'c68', name: 'Eisenbahn 600ml', price: 17.00 },
      { id: 'c69', name: 'Bohemia 600ml', price: 16.00 },
      { id: 'c610', name: 'Stella Artois 600ml', price: 20.00 },
    ]
  },

  chocolates: {
    name: 'Chocolates',
    icon: '🍫',
    color: '#5d4037',
    items: [
      { id: 'ct1', name: 'Petit Gâteau', price: 22.00 },
      { id: 'ct2', name: 'Brownie de Chocolate', price: 15.00 },
      { id: 'ct3', name: 'Taça de Chocolate', price: 25.00 },
      { id: 'ct4', name: 'Fondue de Chocolate', price: 45.00 },
      { id: 'ct5', name: 'Trufa de Chocolate', price: 8.00 },
      { id: 'ct6', name: 'Mousse de Chocolate', price: 12.00 },
      { id: 'ct7', name: 'Torta Alemã', price: 15.00 },
      { id: 'ct8', name: 'Bombom Aberto', price: 18.00 },
      { id: 'ct9', name: 'Chocolate Quente', price: 12.00 },
      { id: 'ct10', name: 'Milkshake de Chocolate', price: 18.00 },
    ]
  },

  porcoes: {
    name: 'Porções',
    icon: '🍟',
    color: '#f44336',
    items: [
      { id: 'po1', name: 'Batata Frita', price: 28.00 },
      { id: 'po2', name: 'Batata com Bacon e Cheddar', price: 36.00 },
      { id: 'po3', name: 'Onion Rings', price: 32.00 },
      { id: 'po4', name: 'Mandioca Frita', price: 28.00 },
      { id: 'po5', name: 'Calabresa Acebolada', price: 45.00 },
      { id: 'po6', name: 'Iscas de Frango', price: 42.00 },
      { id: 'po7', name: 'Polenta Frita', price: 25.00 },
      { id: 'po8', name: 'Frango a Passarinho', price: 48.00 },
      { id: 'po9', name: 'Queijo Coalho', price: 35.00 },
      { id: 'po10', name: 'Pastéis de Carne (6 un)', price: 30.00 },
    ]
  }
};
