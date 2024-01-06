const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const fs = require("node:fs");
const https = require("node:https");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      sandbox: false,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "/src/index.html"));
}

const appFiles = path.join(app.getPath("documents"), "1skinmaker");
(async () => {
  await app.whenReady();
  createWindow();
  if (!fs.existsSync(appFiles)) {
    fs.mkdirSync(appFiles);
  }
  fs.writeFileSync(path.join(appFiles, "test.txt"), "hi");
})();

app.on("window-all-closed", () => {
  fs.rmSync(path.join(appFiles, "test.txt"));
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
