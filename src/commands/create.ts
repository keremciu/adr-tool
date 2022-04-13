const fs = require('fs')

import {Command, flags} from '@oclif/command'
import {error} from '@oclif/errors'
import * as inquirer from 'inquirer'

import {adrDir} from '../config'

const templateFile = adrDir + '/template.md'
const tocFilePath = adrDir + 'README.md'
const extension = 'md'
const slicePos = -extension.length

function getDecisions() {
  const files = fs.readdirSync(adrDir)

  const decisionFiles = files.filter((filename: string) =>
    extension === filename.slice(slicePos) && (filename !== 'README.md' && filename !== 'template.md'),
  )

  return decisionFiles
}

function getLatestIndex(): number {
  const decisionFiles = getDecisions()

  if (!(decisionFiles && decisionFiles.length > 0)) {
    return 0
  }

  return decisionFiles.length
}

const statusOptions = ['accepted', 'deprecated', 'superseded']

export default class Create extends Command {
  static description = 'create a new decision and log it into docs/adr/README.md file'

  static examples = [
    `$ adr-tool create Use ADR Tool
a decision created on ./docs/adr/0000-use-adr-tool.md
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    ticket: flags.string({char: 't', description: 'technical ticket'}),
    // status flag with enum value
    status: flags.string({
      options: statusOptions,
    }),
  }

  static strict = false

  static args = [{name: 'title', description: 'title of the decision'}]

  async run() {
    const {argv, flags} = this.parse(Create)

    if (!fs.existsSync(adrDir)) {
      error('docs/adr folder is not exist, please run `adr-tools init` command first.')
    }

    if (argv.length === 0) {
      error('please give a title for the decision')
    }

    const title = argv.join(' ')
    let ticket = flags.ticket

    if (!ticket) {
      const ticketresponses: any = await inquirer.prompt([{
        name: 'ticket',
        message: 'technical story a link or text',
        type: 'input',
      }])
      ticket = ticketresponses.ticket
    }

    let status = flags.status
    if (!status) {
      const statusresponses: any = await inquirer.prompt([{
        name: 'status',
        message: 'select status',
        type: 'list',
        choices: statusOptions.map(s => ({name: s})),
      }])

      if (statusresponses.status === 'superseded') {
        const superseded: any = await inquirer.prompt([{
          name: 'ticket',
          message: 'select superseded decision',
          type: 'list',
          choices: getDecisions().map((filename: string) => ({name: filename})),
        }])
        status = `superseded by [${superseded.ticket}](${superseded.ticket})`
      } else {
        status = statusresponses.status
      }
    }

    const decidersresponse: any = await inquirer.prompt([{
      name: 'list',
      message: 'list everyone involved in the decision',
      type: 'input',
    }])

    const date = new Date().toLocaleString()

    const raw = fs.readFileSync(templateFile, 'utf8')

    const cleanTitle = title.toLowerCase().trim()
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
    const fileIndex = ('000000' + newIndex).slice(-4)
    const filename = fileIndex + '-' + cleanTitle

    let fileData = raw
    .replace(/\[short title of solved problem and solution]/g, newIndex + ' - ' + title)
    .replace(/\[YYYY-MM-DD when the decision was last updated]/g, date)
    .replace(/\[accepted \| deprecated \| superseded by \[ADR-0005]\(0005-example.md\)]/g, status)

    if (ticket) fileData = fileData.replace(/\[description \| ticket\/issue URL]/g, ticket)
    if (decidersresponse.list) fileData = fileData.replace(/\[list everyone involved in the decision]/g, decidersresponse.list)

    const filePath = adrDir + filename + '.md'
    fs.writeFileSync(filePath, fileData)

    const tocFileRaw = fs.readFileSync(tocFilePath, 'utf8')
    const tocFileArray = tocFileRaw.split('\n')
    const tocString = `* [ADR-${fileIndex}](${filename}.md) - ${title} - [${status}]`
    const tocStopIndex = tocFileArray.indexOf('<!-- tocstop -->')
    tocFileArray.splice(tocStopIndex - 1, 0, tocString)

    fs.writeFileSync(tocFilePath, tocFileArray.join('\n'))

    this.log('a decision created on ' + filePath)
  }
}
