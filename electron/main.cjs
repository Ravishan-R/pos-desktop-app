const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db.cjs');

// IPC Handlers
ipcMain.handle('get-products', () => {
  return db.getAllProducts();
});

ipcMain.handle('add-product', (event, product) => {
  return db.addProduct(product.name, product.price, product.stock);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    title: 'POS Desktop App',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:5173');

  // win.webContents.openDevTools();

  console.log('Products:', db.getAllProducts());
  // db.addProduct('Sample Product', 9.99, 10); // Dev only
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
