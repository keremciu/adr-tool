const fs = require('fs')

import {Command, flags} from '@oclif/command'
import {error} from '@oclif/errors'

import {adrDir, cliTemplatesPath} from '../config'

const cliTemplateFile = cliTemplatesPath + 'template.md'
const cliTOCFile = cliTemplatesPath + 'toc.md'

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
    this.log("let's create your first decision: `npx adr-tool create Use Markdown Architectural Decision Records`")
  }
}
