const path = require('path')
const fs = require('fs')

export const workDir = process.cwd()
export const adrDir = workDir + '/docs/adr/'

const cliDir = path.dirname(fs.realpathSync(__filename))
export const cliTemplatesPath = path.join(cliDir + '/templates/')
