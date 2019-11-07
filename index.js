const { app, BrowserWindow, ipcMain } = require("electron");
const ffmpeg = require("fluent-ffmpeg");

let mainWindow;

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("filePathChannel", function(event, data) {
  ffmpeg.ffprobe(data, (err, meta) => {
    mainWindow.webContents.send(
      "videoDuration",
      `Video Duration is ${meta.format.duration / 60} Minute`
    );
  });
});
