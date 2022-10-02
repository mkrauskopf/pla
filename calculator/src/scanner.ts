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

type NumberToken = { type: TokenType.Number; lexem: string }
type OperatorToken = { type: OperatorTokenType }

type Token = NumberToken | OperatorToken

function scanTokens(source: string): Token[] {
  if (source.trim() === '') {
    throw new ScannerError('Cannot evaluate empty expression')
  }
  const lexems = source.split(/ +/)
  return lexems.map((lexem): Token => {
    // try operator
    switch (lexem) {
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
    if (!Number.isNaN(Number(lexem))) {
      return { type: TokenType.Number, lexem }
    }

    throw new ScannerError(`Unknown symbol: ${lexem}`)
  })
}

function isOperatorToken(token: Token): token is OperatorToken {
  return [TokenType.Plus, TokenType.Minus, TokenType.Multiply, TokenType.Divide].includes(token.type)
}

function tokenAsString(token: Token) {
  if (isOperatorToken(token)) {
    return `type: ${token.type}`
  } else {
    return `type: ${token.type}(${token.lexem})`
  }
}

export { scanTokens, isOperatorToken, tokenAsString, TokenType, Token, NumberToken, OperatorToken }
