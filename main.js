const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1030,
    height: 780,

    resizable:false,

  });
  win.loadURL("http://localhost:4040");

  // comando para ver o devtools ver erros
  //  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  require("./server/app");
  createWindow();
});
