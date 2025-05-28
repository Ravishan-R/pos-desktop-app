const { app, BrowserWindow } = require('electron');
const path = require('path');
const db = require('./db.cjs');

// Test DB connection
console.log('Products:', db.getAllProducts());
db.addProduct('Sample Product', 9.99, 10);
console.log('Added sample product.');


function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    title: 'POS Desktop App',
    icon: path.join(__dirname, 'icon.png'), // Windows & Linux only
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:5173');

  // Optional: Open DevTools by default
  // win.webContents.openDevTools();
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
