const path = require('path')
const fs = require('fs')

export const workDir = process.cwd()
export const adrDir = workDir + '/docs/adr/'
export const cliDir = path.dirname(fs.realpathSync(__filename))
