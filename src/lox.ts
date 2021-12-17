import fs from 'fs'

import readline from 'readline-sync'

import AstPrinter from './astPrinter'
import { Parser } from './parser'
import { Scanner } from './scanner'
import { Token } from './token'
import { TokenType } from './tokenType'

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
    const parser = new Parser(tokens)
    const expression = parser.parse()

    if (Lox.hadError || expression === null) {
      return
    }

    console.log(`Expr: ${new AstPrinter().print(expression)}`)
  }

  runPrompt(): void {
    while (true) {
      const line = readline.prompt('> ' as any)
      this.run(line)
      Lox.hadError = false
    }
  }

  static lineError(line: number, message: string): void {
    Lox.report(line, '', message)
  }

  static tokenError(token: Token, message: string): void {
    if (token.type === TokenType.EOF) {
      Lox.report(token.line, ' at end', message)
    } else {
      Lox.report(token.line, ` at '${token.lexeme}'`, message)
    }
  }

  static report(line: number, where: string, message: string): void {
    console.error(`[line ${line}] Error${where}: ${message}`)
    Lox.hadError = true
  }
}
