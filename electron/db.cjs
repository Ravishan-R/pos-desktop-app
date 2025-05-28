const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'pos.db');
const db = new Database(dbPath);

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
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

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
};
