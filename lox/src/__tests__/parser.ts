import { Lox } from '../lox'
import { Parser } from '../parser'
import { EOF_1, binary, literal, minusToken, numberToken, slashToken } from '../test-support/tokens'
import { mockConsole } from '../test-support/utils'
import { Token } from '../token'

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
    const tokens: Token[] = [numberToken(8), minusToken(), numberToken(4), EOF_1]
    const parser = new Parser(tokens)
    expect(parser.parse()).toStrictEqual(binary(literal(8), minusToken(), literal(4)))
  })

  it('should parse division associativity', () => {
    const tokens: Token[] = [numberToken(8), slashToken(), numberToken(4), slashToken(), numberToken(2), EOF_1]
    const parser = new Parser(tokens)
    const binary8by4 = binary(literal(8), slashToken(), literal(4))
    expect(parser.parse()).toStrictEqual(binary(binary8by4, slashToken(), literal(2)))
  })
})
