const fs = require('fs')

import {Command, flags} from '@oclif/command'
import {error} from '@oclif/errors'

import {adrDir} from '../config'

const templateFile = adrDir + '/template.md'
const tocFilePath = adrDir + 'README.md'
const extension = 'md'
const slicePos = -extension.length

function getLatestIndex(): number {
  const files = fs.readdirSync(adrDir)

  const decisionFiles = files.filter((filename: string) =>
    extension === filename.slice(slicePos) && (filename !== 'README.md' && filename !== 'template.md')
  )

  if (!(decisionFiles && decisionFiles.length > 0)) {
    return 0
  }

  return decisionFiles.length
}

export default class Create extends Command {
  static description = 'create a new decision and log it into docs/adr/README.md file'

  static examples = [
    `$ adr-tool create use-adr-tool
a decision created on ./docs/adr/0001-use-adr-tool.md
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'title'}]

  async run() {
    const {args} = this.parse(Create)

    if (!fs.existsSync(adrDir)) {
      error('docs/adr folder is not exist, please run `adr-tools init` command first.')
    }

    if (!args.title) {
      error('please give a title for the decision')
    }

    const date = new Date().toLocaleString()

    const raw = fs.readFileSync(templateFile, 'utf8')

    const cleanTitle = args.title.toLowerCase().trim()
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single _
    .replace(/^-+|-+$/g, '') // remove leading, trailing -
    .replace(/，/g, '')
    .replace(/。/g, '')
    .replace(/ /g, '-')
    .replace(/\?/g, '-')
    .replace(/#/g, '')
    .replace(/:/g, '')
    .replace(/# /g, '')

    const newIndex = getLatestIndex()
    const fileIndex = ('000000' + newIndex).substr(3)
    const filename = fileIndex + '-' + cleanTitle

    const fileData = raw
    .replace(/\[short title of solved problem and solution\]/g, newIndex + ' - ' + args.title)
    .replace(/\[YYYY-MM-DD when the decision was last updated\]/g, date)

    const filePath = adrDir + filename + '.md'
    fs.writeFileSync(filePath, fileData)

    const tocFileRaw = fs.readFileSync(tocFilePath, 'utf8')
    const tocFileArray = tocFileRaw.split('\n')
    const tocString = `* [ADR-${fileIndex}](${filename}.md) - ${args.title}`
    const tocStopIndex = tocFileArray.indexOf('<!-- tocstop -->')
    tocFileArray.splice(tocStopIndex - 1, 0, tocString)

    fs.writeFileSync(tocFilePath, tocFileArray.join('\n'))

    this.log('a decision created on ' + filePath)
  }
}
