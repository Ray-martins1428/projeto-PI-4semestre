const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const { ipcMain, dialog } = require("electron");

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
    width: 1250,
    height: 780,
    // resizable: false,

    minWidth: 1100,
    minHeight: 720,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Carregar página inicial (Express)
  win.loadURL("http://localhost:4040/");
  // win.webContents.openDevTools();
}

app.whenReady().then(async () => {
  await startServer(); // Aguarda o servidor iniciar
  createWindow();

  app.on("will-quit", () => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });
});

ipcMain.handle("confirmacao-excluir", async (event, mensagem) => {
  const result = await dialog.showMessageBox({
    type: "question",
    buttons: ["Sim", "Cancelar"],
    defaultId: 0,
    cancelId: 1,
    message: mensagem,
  });

  return result.response;
});

ipcMain.handle("aviso-alerta", async (event, mensagem) => {
  await dialog.showMessageBox({
    type: "info",
    buttons: ["OK"],
    message: mensagem,
  });
});

ipcMain.handle("aviso-erro", async (event, mensagem) => {
  await dialog.showMessageBox({
    type: "error",
    buttons: ["OK"],
    message: mensagem,
  });
});

ipcMain.handle("aviso-sucesso", async (event, mensagem) => {
  await dialog.showMessageBox({
    type: "info",
    buttons: ["OK"],
    message: mensagem,
  });
});
