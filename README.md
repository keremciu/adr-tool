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
adr-tool/0.0.1 darwin-x64 node-v14.16.0
$ adr-tool --help [COMMAND]
USAGE
  $ adr-tool COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`adr-tool create [TITLE]`](#adr-tool-create-title)
* [`adr-tool help [COMMAND]`](#adr-tool-help-command)
* [`adr-tool init`](#adr-tool-init)
* [`adr-tool toc`](#adr-tool-toc)

## `adr-tool create [TITLE]`

create a new decision and log it into docs/adr/README.md file

```
USAGE
  $ adr-tool create [TITLE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ adr-tool create use-adr-tool
  a decision created on ./docs/adr/0001-use-adr-tool.md
```

_See code: [src/commands/create.ts](https://github.com/keremciu/adr-tool/blob/v0.0.1/src/commands/create.ts)_

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

## `adr-tool init`

create docs/adr folder and copies template.md and README.md

```
USAGE
  $ adr-tool init

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ adr-tool init
  ./docs/adr folder is created!
```

_See code: [src/commands/init.ts](https://github.com/keremciu/adr-tool/blob/v0.0.1/src/commands/init.ts)_

## `adr-tool toc`

create docs/adr/README.md file

```
USAGE
  $ adr-tool toc

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ adr-tool toc
  ./docs/adr/README.md file is created!
```

_See code: [src/commands/toc.ts](https://github.com/keremciu/adr-tool/blob/v0.0.1/src/commands/toc.ts)_
<!-- commandsstop -->
