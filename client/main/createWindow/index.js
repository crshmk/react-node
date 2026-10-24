const { BrowserWindow } = require('electron')
const path = require('path')

const { config, showDevTools } = require('./config')
//const { windowUrl } = require('./windowUrl')

let window = null

const createWindow = () => {
  window = new BrowserWindow(config)
  window.setTitle('A new app')

  const filePath = path.join(__dirname, 'dist', 'index.html')
  window.loadURL('http://localhost:4204')  
  if (showDevTools) window.webContents.openDevTools()

 // window.on('blur', window.hide)

  return window 
}

module.exports = { createWindow }




