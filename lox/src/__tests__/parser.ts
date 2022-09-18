import { Lox } from '../lox'
import { Parser } from '../parser'
import { Stmt } from '../stmt'
import { Token } from '../token'
import { EOF_1, binary, literal, minusToken, numberToken, semicolon, slashToken } from './tokens'
import { mockConsole } from './utils'

describe('Parser', () => {
  it('should parse empty content', () => {
    const tokens: Token[] = [EOF_1]
    const parser = new Parser(tokens)

    expect(parser.parse()).toStrictEqual([])
  })

  it('should fail with Lox error for invalid program', () => {
    const tokens: Token[] = [numberToken(1)]
    const parser = new Parser(tokens)

    expect(() => parser.parse()).toThrow(new Error('current: 1, nOfTokens: 1. Missing EOF token?'))
    expect(Lox.hadError).toBe(true)
  })

  it('should parse basic expression', () => {
    const tokens: Token[] = [numberToken(8), minusToken(), numberToken(4), semicolon(), EOF_1]
    const parser = new Parser(tokens)
    expect(parser.parse()).toStrictEqual([new Stmt.Expression(binary(literal(8), minusToken(), literal(4)))])
  })

  it('should parse division associativity', () => {
    const tokens: Token[] = [
      numberToken(8),
      slashToken(),
      numberToken(4),
      slashToken(),
      numberToken(2),
      semicolon(),
      EOF_1,
    ]
    const parser = new Parser(tokens)
    const binary8by4 = binary(literal(8), slashToken(), literal(4))
    expect(parser.parse()).toStrictEqual([new Stmt.Expression(binary(binary8by4, slashToken(), literal(2)))])
  })
})
