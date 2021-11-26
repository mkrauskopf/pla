import { Lox } from '../lox'
import { Scanner } from '../scanner'
import { Token } from '../token'
import { TokenType } from '../tokenType'

const EOF = new Token(TokenType.EOF, '', null, 1)

const scanTokens = (source: string) => new Scanner(source).scanTokens()

describe('scanner', () => {
  beforeEach(() => {
    Lox.hadError = false
  })

  afterEach(() => {
    expect(Lox.hadError).toBe(false)
  })

  it('should scan empty string', () => {
    expect(scanTokens('')).toStrictEqual([EOF])
  })

  it('should scan one simple token', () => {
    expect(scanTokens('+')).toStrictEqual([new Token(TokenType.PLUS, '+', null, 1), EOF])
  })

  it('should scan one compound token', () => {
    expect(scanTokens('!=')).toStrictEqual([new Token(TokenType.BANG_EQUAL, '!=', null, 1), EOF])
  })
})
