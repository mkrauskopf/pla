import { Lox } from '../lox'
import { Scanner } from '../scanner'
import { Token } from '../token'
import { TokenType } from '../tokenType'

const eof = (line: number) => new Token(TokenType.EOF, '', null, line)
const EOF_1 = eof(1)

const scanTokens = (source: string) => new Scanner(source).scanTokens()

describe('scanner', () => {
  beforeEach(() => {
    Lox.hadError = false
  })

  afterEach(() => {
    expect(Lox.hadError).toBe(false)
  })

  it('should scan empty string', () => {
    expect(scanTokens('')).toStrictEqual([EOF_1])
  })

  it('should scan one simple token', () => {
    expect(scanTokens('+')).toStrictEqual([new Token(TokenType.PLUS, '+', null, 1), EOF_1])
  })

  it('should scan one compound token', () => {
    expect(scanTokens('!=')).toStrictEqual([new Token(TokenType.BANG_EQUAL, '!=', null, 1), EOF_1])
  })

  it('should scan string', () => {
    expect(scanTokens('"Hello World"')).toStrictEqual([
      new Token(TokenType.STRING, '"Hello World"', 'Hello World', 1),
      EOF_1,
    ])
  })

  it('should scan multi-line string', () => {
    const stringLexeme = 'Hello World\nWelcome in Lox!'
    const multiline = `"${stringLexeme}"`
    expect(scanTokens(multiline)).toStrictEqual([new Token(TokenType.STRING, multiline, stringLexeme, 2), eof(2)])
  })

  it('should scan multi-line string and second line', () => {
    const stringLexeme = 'Hello World\nWelcome in Lox!'
    const multiline = `"${stringLexeme}"\n>=`
    expect(scanTokens(multiline)).toStrictEqual([
      new Token(TokenType.STRING, `"${stringLexeme}"`, stringLexeme, 2),
      new Token(TokenType.GREATER_EQUAL, '>=', null, 3),
      eof(3),
    ])
  })

  it('should handle unterminated string', () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
    const stringLexeme = 'Hello World'
    const multiline = `"${stringLexeme}`
    try {
      expect(scanTokens(multiline)).toStrictEqual([EOF_1])
      expect(Lox.hadError).toBe(true)
      expect(warn).toBeCalledWith(expect.any(String))
      Lox.hadError = false
    } finally {
      warn.mockRestore()
    }
  })
})
