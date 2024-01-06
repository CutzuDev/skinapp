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
    },
  });

  win.loadFile(path.join(__dirname, "/src/index.html"));
}

// Create a new file to copy - you can also copy existing files.

(async () => {
  await app.whenReady();
  createWindow();
  // fs.mkdir(path.join(app.getPath("documents"), "skinmaker123"));
  if (!fs.existsSync(path.join(app.getPath("documents"), "1skinmaker"))) {
    fs.mkdirSync(path.join(app.getPath("documents"), "1skinmaker"));
  }

  // const filePath = path.join(app.getPath("documents"), "skinmaker123");
  // console.log(filePath);
  // try {
  //   fs.writeFileSync(path.join(filePath, "test.txt"), "hi");
  // } catch (error) {
  //   console.log(error);
  // }
})();

app.on("window-all-closed", () => {
  // fs.rm(path.join(__dirname, "test.txt"));
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
