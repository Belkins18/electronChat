// Main Process
const { app, BrowserWindow } = require('electron');

function createWindow() {
    // BrowserWindow <- Renderer Process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: false,
            // will sanitizr JS code
            worldSafeExecuteJavaScript: true,
            // is a feature that ensures that both, your preload scripts and Electron 
            contextIsolation: true
        }
    }); 

    win.loadFile('index.html');
    win.webContents.openDevTools();
}

app.whenReady()
    .then(() => {
        createWindow();
    });
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})
