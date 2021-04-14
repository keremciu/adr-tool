const fs = require('fs')
const path = require('path')

import {Command, flags} from '@oclif/command'
import {error} from '@oclif/errors'

import {adrDir, cliDir} from '../config'

const cliTemplates = path.join(cliDir + '/../templates/')

const cliTOCFile = cliTemplates + 'toc.md'

export default class Toc extends Command {
  static description = 'create docs/adr/README.md file'

  static examples = [
    `$ adr-tool toc
./docs/adr/README.md file is created!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    if (fs.existsSync(adrDir + 'README.md')) {
      error('docs/adr/README.md file is already exist.')
    }

    fs.copyFile(cliTOCFile, adrDir + 'README.md', (err: Error) => {
      if (err) throw err
    })

    this.log('./docs/adr/README.md file is created!')
  }
}
