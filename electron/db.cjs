const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'pos.db');
const db = new Database(dbPath);

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables.map(t => t.name));

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
  )
`).run();

// NEW: Create sales table
db.prepare(`
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL DEFAULT (datetime('now')),
    total REAL NOT NULL
  )
`).run();

// NEW: Create sale_items table
db.prepare(`
  CREATE TABLE IF NOT EXISTS sale_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  )
`).run();

// GET all
function getAllProducts() {
  return db.prepare('SELECT * FROM products').all();
}

// ADD
function addProduct(name, price, stock) {
  return db.prepare('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)')
           .run(name, price, stock);
}

// UPDATE
function updateProduct(id, name, price, stock) {
  return db.prepare('UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?')
           .run(name, price, stock, id);
}

// DELETE
function deleteProduct(id) {
  return db.prepare('DELETE FROM products WHERE id = ?').run(id);
}

// CREATE SALE
function createSale(items) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const insertSaleStmt = db.prepare('INSERT INTO sales (total) VALUES (?)');
  const result = insertSaleStmt.run(total);
  const saleId = result.lastInsertRowid;

  const insertItemStmt = db.prepare('INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
  const updateStockStmt = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');

  const insertItems = db.transaction((items) => {
    for (const item of items) {
      insertItemStmt.run(saleId, item.product_id, item.quantity, item.price);
      updateStockStmt.run(item.quantity, item.product_id);
    }
  });

  insertItems(items);
  return saleId;
}

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  createSale,   
  db            // Optional: export if you need raw access
};
