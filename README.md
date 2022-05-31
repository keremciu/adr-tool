adr-tool
========

easy CLI for ADR docs

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/adr-tool.svg)](https://npmjs.org/package/adr-tool)
[![Downloads/week](https://img.shields.io/npm/dw/adr-tool.svg)](https://npmjs.org/package/adr-tool)
[![License](https://img.shields.io/npm/l/adr-tool.svg)](https://github.com/keremciu/adr-tool/blob/main/package.json)

<!-- toc -->
* [Demo](#demo)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Demo

<p align="center">
  <a href="https://youtu.be/lesHQoZ7qYY" title="Click to watch the full screencast">
    <img src="demo.gif" alt="adr-tool demo" width="838" />
  </a>
</p>
<p align="center"><a href="https://youtu.be/lesHQoZ7qYY">🎞️ Watch the full screencast</a></p>

# Usage

You can install it globally (`npm install -g adr-tool`) or use it with [npx](https://docs.npmjs.com/cli/v7/commands/npx)

```sh-session
$ npx adr-tool init
./docs/adr folder is created!
$ npx adr-tool create Use Markdown Architectural Decision Records
a decision created on ./docs/adr/0000-use-markdown-architectural-decision-records.md
```
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

ARGUMENTS
  TITLE  title of the decision

OPTIONS
  -h, --help                               show CLI help
  -t, --ticket=ticket                      technical ticket
  --status=accepted|deprecated|superseded

EXAMPLE
  $ adr-tool create Use ADR Tool
  a decision created on ./docs/adr/0000-use-adr-tool.md
```

_See code: [src/commands/create.ts](https://github.com/keremciu/adr-tool/blob/v0.3.0/src/commands/create.ts)_

## `adr-tool help [COMMAND]`

Display help for adr-tool.

```
USAGE
  $ adr-tool help [COMMAND]

ARGUMENTS
  COMMAND  Command to show help for.

OPTIONS
  -n, --nested-commands  Include all nested commands in the output.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

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

_See code: [src/commands/init.ts](https://github.com/keremciu/adr-tool/blob/v0.3.0/src/commands/init.ts)_

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

_See code: [src/commands/toc.ts](https://github.com/keremciu/adr-tool/blob/v0.3.0/src/commands/toc.ts)_
<!-- commandsstop -->
