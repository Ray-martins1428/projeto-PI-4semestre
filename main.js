const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1030,
    height: 780,
    resizable: false,
  });

  win.loadURL("http://localhost:4040");
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  // inicia o servidor Node/Express em processo separado
  const server = spawn("node", [path.join(__dirname, "server", "app.js")], {
    stdio: "inherit",
    shell: true,
  });

  createWindow();

  app.on("will-quit", () => {
    server.kill();
  });
});
