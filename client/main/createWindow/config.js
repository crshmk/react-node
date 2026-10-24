const path = require('path')

const preloadPath = path.join(__dirname, 'preload.js')

const showDevTools = true
const width = showDevTools ? 1000 : 300
const height = 700 // showDevTools ? 500 : 243

const config = {
 // alwaysOnTop: true,
  width,
  height,
  title: "React App",
 // resizable: false,
//  frame: false,
 // transparent: true,
 // show: false,
  webPreferences: {
    webSecurity: false,
    preload: preloadPath,
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    sandbox: false

    
  }
}

module.exports = { config, showDevTools }