import {expect, test} from '@oclif/test'
import rewiremock from 'rewiremock'
import {fs, vol} from 'memfs'
const realFs = require('fs')

// mock 'fs' lib and use memory for file system manipulations
// this part can be reusable for other tests
rewiremock('fs').with({
  constants: fs.constants,
  statSync: realFs.statSync,
  readdirSync: realFs.readdirSync,
  realpathSync: realFs.realpathSync,
  readFile: realFs.readFile,
  readFileSync: fs.readFileSync,
  existsSync: fs.existsSync,
  writeFileSync: fs.writeFileSync,
  copyFile: fs.copyFile,
})

rewiremock('inquirer').with({
  prompt: () => Promise.resolve({status: 'accepted'}),
})

describe('create command', () => {
  afterEach(() => {
    rewiremock.disable()
    vol.reset()
  })

  describe('adr folder is not exist', () => {
    beforeEach(() => {
      vol.fromJSON({}, process.cwd() + '/')
      rewiremock.enable()
    })

    test
    .stderr()
    .command(['create'])
    .catch(error => expect(error).to.match(/docs\/adr folder is not exist, please run `adr-tool init` command first./))
    .it('running create cmd throws error for folder')
  })

  describe('title should be provided', () => {
    beforeEach(() => {
      vol.fromJSON({
        './docs/adr/exists': 'make folder exist',
      }, process.cwd() + '/')
      rewiremock.enable()
    })

    test
    .stdout()
    .command(['create'])
    .catch(error => expect(error).to.match(/please give a title for the decision/))
    .it('running create cmd without title provides error')
  })

  describe('create file', () => {
    beforeEach(() => {
      vol.fromJSON({
        './docs/adr/README.md': '# Architectural Decision Log\n<!-- toc -->\n<!-- tocstop -->',
        './docs/adr/template.md': 'template file content',
      }, process.cwd() + '/')
      rewiremock.enable()
    })

    test
    .stdout()
    .command(['create', 'A big decision'])
    .it('running create cmd creates ADR file with file template', async (output: any, done) => {
      expect(output.stdout).to.contain('a decision created on')
      expect(vol.readFileSync('./docs/adr/README.md', 'utf-8')).to.contain('a-big-decision.md) - A big decision - [accepted]')
      done()
    })
  })
})
