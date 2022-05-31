import {fs} from 'memfs'
const {ufs} = require('unionfs')
const realFs = require('fs')

ufs
.use(realFs)
.use(fs)

export const fakeFs = {
  constants: fs.constants,
  statSync: fs.statSync,
  readdirSync: ufs.readdirSync,
  realpathSync: ufs.realpathSync,
  readFile: ufs.readFile,
  readFileSync: ufs.readFileSync,
  existsSync: ufs.existsSync,
  writeFileSync: ufs.writeFileSync,
  copyFile: ufs.copyFile,
}
