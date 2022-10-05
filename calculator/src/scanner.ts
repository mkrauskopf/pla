import ScannerError from './errors/ScannerError'

enum TokenType {
  Number = 'NUMBER',

  // operators
  Plus = 'PLUS',
  Minus = 'MINUS',
  Multiply = 'MULTIPLY',
  Divide = 'DIVIDE',
}

type OperatorTokenType = TokenType.Plus | TokenType.Minus | TokenType.Multiply | TokenType.Divide

type NumberToken = { type: TokenType.Number; literal: number }
type OperatorToken = { type: OperatorTokenType }

type Token = NumberToken | OperatorToken

function scanTokens(source: string): Token[] {
  if (source.trim() === '') {
    throw new ScannerError('Cannot evaluate empty expression')
  }
  const lexemes = source.split(/ +/)
  return lexemes.map((lexeme): Token => {
    // try operator
    switch (lexeme) {
      case '+':
        return { type: TokenType.Plus }
      case '-':
        return { type: TokenType.Minus }
      case '*':
        return { type: TokenType.Multiply }
      case '/':
        return { type: TokenType.Divide }
    }

    // try number
    const literal = Number(lexeme)
    if (!Number.isNaN(literal)) {
      return { type: TokenType.Number, literal }
    }

    throw new ScannerError(`Unknown symbol: ${lexeme}`)
  })
}

function isOperatorToken(token: Token): token is OperatorToken {
  return [TokenType.Plus, TokenType.Minus, TokenType.Multiply, TokenType.Divide].includes(token.type)
}

function tokenAsString(token: Token) {
  if (isOperatorToken(token)) {
    return `type: ${token.type}`
  } else {
    return `type: ${token.type}(${token.literal})`
  }
}

export { scanTokens, isOperatorToken, tokenAsString, TokenType, Token, NumberToken, OperatorToken }
