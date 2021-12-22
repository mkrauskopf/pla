import { Token } from '../token'
import { TokenType } from '../tokenType'

// Prevent Jest complaining.
test.skip('skip', () => {})

// Tools
const mockConsole = () => jest.spyOn(console, 'error').mockImplementation(() => {})

// Tokens
const eof = (line: number) => new Token(TokenType.EOF, '', null, line)
const EOF_1 = eof(1)
const numberToken = (n: number) => new Token(TokenType.NUMBER, `${n}`, n, 1)

export { mockConsole, eof, EOF_1, numberToken }
