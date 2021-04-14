const fs = require('fs')

import {Command, flags} from '@oclif/command'
import {error} from '@oclif/errors'

import {adrDir, cliTemplatesPath} from '../config'

const cliTOCFile = cliTemplatesPath + 'toc.md'

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
