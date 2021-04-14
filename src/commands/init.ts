const fs = require('fs')
const path = require('path')

import {Command, flags} from '@oclif/command'
import {error} from '@oclif/errors'

import {adrDir} from '../config'

const dirname = __dirname
const cliTemplates = path.join(dirname + '/../templates/')
const cliTemplateFile = cliTemplates + 'template.md'
const cliTOCFile = cliTemplates + 'toc.md'

export default class Init extends Command {
  static description = 'create docs/adr folder and copies template.md and README.md'

  static examples = [
    `$ adr-tool init
./docs/adr folder is created!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    this.parse(Init)

    if (fs.existsSync(adrDir)) {
      error('docs/adr folder is already exist, please remove /docs/adr folder to run this command.')
    }

    fs.mkdirSync(adrDir, {recursive: true})

    fs.copyFile(cliTemplateFile, adrDir + 'template.md', () => null)

    fs.copyFile(cliTOCFile, adrDir + 'README.md', () => null)

    this.log('./docs/adr folder is created!')
  }
}
