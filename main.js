const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let serverProcess = null;

function startServer() {
  return new Promise((resolve) => {
    const serverPath = path.join(__dirname, "server", "app.js");

    console.log("Iniciando servidor:", serverPath);

    serverProcess = spawn("node", [serverPath], {
      stdio: "inherit",
      shell: true,
    });

    // Aguarna o servidor subir
    setTimeout(() => {
      resolve();
    }, 1500); // 1.5 seg esperando o Express iniciar
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1030,
    height: 780,
    resizable: false,
  });

  // Carregar página inicial (Express)
  win.loadURL("http://localhost:4040/");
  // win.webContents.openDevTools();
}

app.whenReady().then(async () => {
  await startServer();   // Aguarda o servidor iniciar
  createWindow();

  app.on("will-quit", () => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });
});
