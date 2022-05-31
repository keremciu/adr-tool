import {expect, test} from '@oclif/test'
import rewiremock from 'rewiremock'
import {fakeFs} from '../helpers/test-utils'
import {vol} from 'memfs'

rewiremock('fs').with(fakeFs)

describe('toc command', () => {
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
    .command(['toc'])
    .catch(error => expect(error).to.match(/docs\/adr folder is not exist, please run `adr-tool init` command first./))
    .it('running toc cmd throws error for folder')
  })

  describe('adr/README file is already exist', () => {
    beforeEach(() => {
      vol.fromJSON({
        './docs/adr/README.md': '1',
      }, process.cwd() + '/')
      rewiremock.enable()
    })

    test
    .stderr()
    .command(['toc'])
    .catch(error => expect(error).to.match(/docs\/adr\/README.md file is already exist./))
    .it('running toc cmd throws error for file')
  })

  describe('adr/README file is not exist', () => {
    beforeEach(() => {
      vol.fromJSON({
        './docs/adr/exists': 'make folder exist',
        './templates/toc.md': 'tocfilecontent',
      }, process.cwd() + '/')
      rewiremock.enable()
    })

    test
    .stdout()
    .command(['toc'])
    .it('running toc cmd creates README file with toc template', async (output: any, done) => {
      expect(output.stdout).to.contain('docs/adr/README.md file is created')
      expect(vol.readFileSync('./docs/adr/README.md', 'utf-8')).to.equal('tocfilecontent')
      done()
    })
  })
})
