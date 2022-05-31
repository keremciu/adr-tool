const fs = require('fs')

import {Command, flags} from '@oclif/command'
import {error} from '@oclif/errors'

import {adrDir, cliTemplatesPath} from '../config'
import {TEXTS} from '../texts'

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
    if (!fs.existsSync(adrDir)) {
      error(TEXTS.adrFolderIsNotExist)
    }

    if (fs.existsSync(adrDir + 'README.md')) {
      error(TEXTS.readmeExists)
    }

    fs.copyFile(cliTOCFile, adrDir + 'README.md', fs.constants.COPYFILE_EXCL, (err: Error) => {
      if (err) throw err
    })

    this.log('./docs/adr/README.md file is created!')
  }
}
