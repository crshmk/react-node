const path = require('path')
const { Tray } = require('electron')
const { toggleWindow } = require('./toggleWindow')

const iconPath = path.join(__dirname, './fuelpumpTemplate.png')

const createTray = window => {
  const trayIcon = new Tray(iconPath)
  trayIcon.setIgnoreDoubleClickEvents(true)
  trayIcon.on('right-click', () => {
    if(window.isVisible()) {
      window.hide()
      return
    }
    const cursorPosition = screen.getCursorScreenPoint()
    window.setPosition(cursorPosition.x - 230,  0)
    window.show()
  })
}

module.exports = { createTray }