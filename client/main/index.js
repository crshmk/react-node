const { app, BrowserWindow, Menu } = require('electron')

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'

//const { createTray } = require('./createTray')
const { createWindow } = require('./createWindow')

function setApplicationMenu() {
  const template = [
    {
      label: app.name, // Set custom name for macOS menu bar
      submenu: [
        {
          label: 'Quit',
          role: 'quit'
        }
      ]
    },
    // Add more custom menus if needed
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

//const { registerIpcEvents } = require('./ipcEvents/registerIpcEvents')

function launchApp() {
  const window = createWindow()
  setApplicationMenu()
 // createTray(window)
  //registerIpcEvents(window)
}

app.whenReady().then(launchApp)

//app.dock?.hide && app.dock?.hide()

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})