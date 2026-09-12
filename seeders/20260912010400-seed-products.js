'use strict';

const products = [
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI.',
    basePrice: 24.99,
    skuPrefix: 'ELEC-MOUSE',
    image: 'wireless-mouse.jpg',
    categoryId: 1,
    supplierId: 1,
  },
  {
    name: 'Bluetooth Keyboard',
    description: 'Compact Bluetooth keyboard for laptops and tablets.',
    basePrice: 39.99,
    skuPrefix: 'ELEC-KEYBOARD',
    image: 'bluetooth-keyboard.jpg',
    categoryId: 1,
    supplierId: 1,
  },
  {
    name: 'USB-C Charger',
    description: 'Fast USB-C wall charger for phones and tablets.',
    basePrice: 18.5,
    skuPrefix: 'ELEC-CHARGER',
    image: 'usb-c-charger.jpg',
    categoryId: 1,
    supplierId: 1,
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Soft everyday cotton t-shirt.',
    basePrice: 14.5,
    skuPrefix: 'FASH-TSHIRT',
    image: 'cotton-t-shirt.jpg',
    categoryId: 2,
    supplierId: 2,
  },
  {
    name: 'Denim Jacket',
    description: 'Classic denim jacket with regular fit.',
    basePrice: 54.99,
    skuPrefix: 'FASH-JACKET',
    image: 'denim-jacket.jpg',
    categoryId: 2,
    supplierId: 2,
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes for daily training.',
    basePrice: 69.99,
    skuPrefix: 'FASH-SHOES',
    image: 'running-shoes.jpg',
    categoryId: 2,
    supplierId: 2,
  },
  {
    name: 'Ceramic Dinner Set',
    description: 'Twelve-piece ceramic dinner set for daily use.',
    basePrice: 49.99,
    skuPrefix: 'HOME-DINNER',
    image: 'ceramic-dinner-set.jpg',
    categoryId: 3,
    supplierId: 3,
  },
  {
    name: 'Nonstick Fry Pan',
    description: 'Durable nonstick fry pan for everyday cooking.',
    basePrice: 29.99,
    skuPrefix: 'HOME-PAN',
    image: 'nonstick-fry-pan.jpg',
    categoryId: 3,
    supplierId: 3,
  },
  {
    name: 'Cotton Bedsheet',
    description: 'Breathable cotton bedsheet for queen beds.',
    basePrice: 34.5,
    skuPrefix: 'HOME-BEDSHEET',
    image: 'cotton-bedsheet.jpg',
    categoryId: 3,
    supplierId: 3,
  },
];

const seededProducts = (now) =>
  Array.from({ length: 200 }, (_, index) => {
    const id = index + 1;
    const product = products[index % products.length];
    const variant = Math.floor(index / products.length) + 1;
    const price = product.basePrice + variant * 1.75;

    return {
      id,
      name: `${product.name} ${variant}`,
      description: product.description,
      price: Number(price.toFixed(2)),
      sku: `${product.skuPrefix}-${String(variant).padStart(3, '0')}`,
      product_image: product.image,
      quantity: 25 + ((index * 7) % 176),
      category_id: product.categoryId,
      supplier_id: product.supplierId,
      user_id: id % 2 === 0 ? 2 : 1,
      is_active: index % 20 !== 0,
      created_at: now,
      updated_at: now,
    };
  });

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('products', seededProducts(now));

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('products', 'id'), (SELECT MAX(id) FROM products));",
    );
  },

  async down(queryInterface) {
    const skus = seededProducts(new Date()).map((product) => product.sku);

    await queryInterface.bulkDelete('products', {
      sku: skus,
    });
  },
};
