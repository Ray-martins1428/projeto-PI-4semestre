const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  confirmar: (mensagem) => ipcRenderer.invoke("confirmacao-excluir", mensagem),
});

contextBridge.exposeInMainWorld("aviso", {
  alerta: (mensagem) => ipcRenderer.invoke("aviso-alerta", mensagem),
  erro: (mensagem) => ipcRenderer.invoke("aviso-erro", mensagem),
  sucesso: (mensagem) => ipcRenderer.invoke("aviso-sucesso", mensagem),
})