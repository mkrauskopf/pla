import { Binary, Literal } from '../expr'
import { Lox } from '../lox'
import { Parser } from '../parser'
import { Token } from '../token'
import { TokenType } from '../tokenType'
import { EOF_1, mockConsole, numberToken } from './utils'

describe('Parser', () => {
  it('should parse empty content', () => {
    const warn = mockConsole()
    const tokens: Token[] = [EOF_1]
    const parser = new Parser(tokens)

    try {
      expect(parser.parse()).toBe(null)
      expect(Lox.hadError).toBe(true)
      expect(warn).toBeCalledWith(expect.any(String))
    } finally {
      warn.mockRestore()
    }
  })

  it('should parse basic expression', () => {
    const minusToken = new Token(TokenType.MINUS, '/', '/', 1)
    const tokens: Token[] = [numberToken(8), minusToken, numberToken(4), EOF_1]
    const parser = new Parser(tokens)
    expect(parser.parse()).toStrictEqual(new Binary(new Literal(8), minusToken, new Literal(4)))
  })

  it('should parse division associativity', () => {
    const slashToken = () => new Token(TokenType.SLASH, '/', '/', 1)
    const tokens: Token[] = [numberToken(8), slashToken(), numberToken(4), slashToken(), numberToken(2), EOF_1]
    const parser = new Parser(tokens)
    const binary8by4 = new Binary(new Literal(8), slashToken(), new Literal(4))
    expect(parser.parse()).toStrictEqual(new Binary(binary8by4, slashToken(), new Literal(2)))
  })
})
