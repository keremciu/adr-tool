adr-tool
========

easy CLI for ADR docs

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/adr-tool.svg)](https://npmjs.org/package/adr-tool)
[![Downloads/week](https://img.shields.io/npm/dw/adr-tool.svg)](https://npmjs.org/package/adr-tool)
[![License](https://img.shields.io/npm/l/adr-tool.svg)](https://github.com/keremciu/adr-tool/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g adr-tool
$ adr-tool COMMAND
running command...
$ adr-tool (-v|--version|version)
adr-tool/0.0.0 darwin-x64 node-v14.16.0
$ adr-tool --help [COMMAND]
USAGE
  $ adr-tool COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`adr-tool hello [FILE]`](#adr-tool-hello-file)
* [`adr-tool help [COMMAND]`](#adr-tool-help-command)

## `adr-tool hello [FILE]`

describe the command here

```
USAGE
  $ adr-tool hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ adr-tool hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/keremciu/adr-tool/blob/v0.0.0/src/commands/hello.ts)_

## `adr-tool help [COMMAND]`

display help for adr-tool

```
USAGE
  $ adr-tool help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
