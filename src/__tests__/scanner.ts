import fs from 'fs'
import path from 'path'

import { Lox } from '../lox'
import { Scanner } from '../scanner'
import { Token } from '../token'
import { TokenType } from '../tokenType'
import { EOF_1, eof, mockConsole, numberToken } from './utils'

describe('scanner', () => {
  beforeEach(() => {
    Lox.hadError = false
  })

  afterEach(() => {
    expect(Lox.hadError).toBe(false)
  })

  it('should tokenize empty string', () => {
    expect('').toBeTokenizedTo([EOF_1])
  })

  it('should tokenize one simple token', () => {
    expect('+').toBeTokenizedTo([new Token(TokenType.PLUS, '+', null, 1), EOF_1])
  })

  it('should tokenize one compound token', () => {
    expect('!=').toBeTokenizedTo([new Token(TokenType.BANG_EQUAL, '!=', null, 1), EOF_1])
  })

  describe('for string lexemes', () => {
    it('should tokenize string', () => {
      expect('"Hello World"').toBeTokenizedTo([new Token(TokenType.STRING, '"Hello World"', 'Hello World', 1), EOF_1])
    })

    it('should tokenize multi-line string', () => {
      const stringLexeme = 'Hello World\nWelcome in Lox!'
      const multiline = `"${stringLexeme}"`
      expect(multiline).toBeTokenizedTo([new Token(TokenType.STRING, multiline, stringLexeme, 2), eof(2)])
    })

    it('should tokenize multi-line string and second line', () => {
      const stringLexeme = 'Hello World\nWelcome in Lox!'
      const multiline = `"${stringLexeme}"\n>=`
      expect(multiline).toBeTokenizedTo([
        new Token(TokenType.STRING, `"${stringLexeme}"`, stringLexeme, 2),
        new Token(TokenType.GREATER_EQUAL, '>=', null, 3),
        eof(3),
      ])
    })

    it('should handle unterminated string', () => {
      const warn = mockConsole()
      const stringLexeme = 'Hello World'
      const multiline = `"${stringLexeme}`
      try {
        expect(multiline).toBeTokenizedTo([EOF_1])
        expect(Lox.hadError).toBe(true)
        expect(warn).toBeCalledWith(expect.any(String))
        Lox.hadError = false
      } finally {
        warn.mockRestore()
      }
    })
  })

  describe('for number lexemes', () => {
    it('should tokenize number', () => {
      expect('1').toBeTokenizedTo([numberToken(1), EOF_1])
      expect('42').toBeTokenizedTo([numberToken(42), EOF_1])
      expect('42.91').toBeTokenizedTo([numberToken(42.91), EOF_1])
    })
  })

  describe('for identifiers', () => {
    it('should tokenize identifier', () => {
      expect('someIdentifier').toBeTokenizedTo([new Token(TokenType.IDENTIFIER, 'someIdentifier', null, 1), EOF_1])
    })
  })

  describe('for keyword identifiers', () => {
    it('should tokenize identifier', () => {
      expect('false').toBeTokenizedTo([new Token(TokenType.FALSE, 'false', null, 1), EOF_1])
      expect('class').toBeTokenizedTo([new Token(TokenType.CLASS, 'class', null, 1), EOF_1])
    })
  })

  describe('for more complex use cases', () => {
    it('should tokenize properly', () => {
      const source = fs.readFileSync(path.resolve(__dirname, '../../data/hello.lox')).toString()
      expect(new Scanner(source).scanTokens()).toMatchSnapshot()
      expect(Lox.hadError).toBe(false)
    })
  })
})
