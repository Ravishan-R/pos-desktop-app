const path = require('path');
const Database = require('better-sqlite3');

// Path to your database file
const dbPath = path.join(__dirname, 'pos.sqlite');
const db = new Database(dbPath);

// Create products table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0
  )
`).run();

// Export functions
module.exports = {
  getAllProducts: () => {
    return db.prepare('SELECT * FROM products').all();
  },

  addProduct: (name, price, stock) => {
    return db.prepare('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)').run(name, price, stock);
  }
};
