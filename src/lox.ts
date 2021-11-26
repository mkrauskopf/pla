import fs from 'fs'

import readline from 'readline-sync'

import { Scanner } from './scanner'
import { Token } from './token'

const args = process.argv.slice(2)

export class Lox {
  static hadError: boolean = false

  runProgram(): void {
    if (args.length > 1) {
      console.info('Usage: lox [script]')
      // see https://www.freebsd.org/cgi/man.cgi?query=sysexits&apropos=0&sektion=0&manpath=FreeBSD+4.3-RELEASE&format=html
      process.exit(64)
    } else if (args.length === 1) {
      this.runFile(args[0])
    } else {
      this.runPrompt()
    }
  }

  runFile(path: string): void {
    console.info(`Running file: ${path}`)
    const source = fs.readFileSync(path)
    this.run(source as any)
    if (Lox.hadError) {
      process.exit(65)
    }
  }

  run(source: string): void {
    const scanner: Scanner = new Scanner(source)
    const tokens: Token[] = scanner.scanTokens()

    // TODO: temporary: remove once you get further
    tokens.forEach((token) => console.log('token:', token))
  }

  runPrompt(): void {
    while (true) {
      const line = readline.prompt('> ' as any)
      this.run(line)
      Lox.hadError = false
    }
  }

  static error(line: number, message: string): void {
    Lox.report(line, '', message)
  }

  static report(line: number, where: string, message: string): void {
    console.error(`[line ${line}] Error${where}: ${message}`)
    Lox.hadError = true
  }
}
