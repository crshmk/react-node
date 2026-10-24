import path from 'path'
import isDev from 'electron-is-dev'


const devUrl = 'http://localhost:4204'

const prodBuildPath = path.join(__dirname, '../dist/index.html')

const prodUrl = `file://${prodBuildPath}`

const windowUrl = isDev ? devUrl : prodUrl

module.exports = { windowUrl } 