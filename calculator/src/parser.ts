import ParserError from './errors/ParserError'
import { NumberToken, Token, TokenType, tokenAsString } from './scanner'

/** ======== Grammar: Start ======== */
type Expression = Term | AdditiveExpression | MultiplicativeExpression

type AdditiveExpression = {
  leftTerm: Term | AdditiveExpression
  operator: { type: TokenType.Plus | TokenType.Minus }
  rightTerm: Term
}

type Term = Factor | MultiplicativeExpression

type MultiplicativeExpression = {
  leftFactor: Expression
  operator: { type: TokenType.Multiply | TokenType.Divide }
  rightFactor: Expression
}

type Factor = NumberToken
/** ======== Grammar: End ======== */

type State = {
  index: number
  tokens: Token[]
}

function parse(tokens: Token[]): Expression {
  if (tokens.length === 0) {
    throw new ParserError('Expression cannot be empty')
  }

  const state = { tokens, index: 0 }
  const expression = parseAdditiveExpression(state)
  if (!isAtEnd(state)) {
    throw new ParserError(
      `Unexpected token ${tokenAsString(currentToken(state))}@${state.index}. Expecting end of expression`
    )
  }
  return expression
}

function parseAdditiveExpression(state: State): Expression {
  let result: Term | AdditiveExpression = parseMultiplicativeExpression(state)

  while (!isAtEnd(state) && match(currentToken(state), [TokenType.Plus, TokenType.Minus])) {
    result = {
      leftTerm: result,
      operator: consumeToken(state) as { type: TokenType.Plus | TokenType.Minus },
      rightTerm: parseMultiplicativeExpression(state),
    }
  }

  if (!isAtEnd(state)) {
    throw new ParserError(`Unexpected token: ${tokenAsString(currentToken(state))}`)
  }
  return result
}

function parseMultiplicativeExpression(state: State): Term | Factor {
  let result: Expression = parseFactor(state)

  while (!isAtEnd(state) && match(currentToken(state), [TokenType.Multiply, TokenType.Divide])) {
    result = {
      leftFactor: result,
      operator: consumeToken(state) as { type: TokenType.Multiply | TokenType.Divide },
      rightFactor: parseFactor(state),
    }
  }

  return result
}

function parseFactor(state: State): NumberToken {
  return checkNumberToken(consumeToken(state))
}

function currentToken(state: State): Token {
  if (isAtEnd(state)) {
    throw new ParserError('Unexpected end of expression')
  }
  return state.tokens[state.index] as Token
}

function consumeToken(state: State): Token {
  if (isAtEnd(state)) {
    throw new ParserError('Unexpected end of expression')
  }
  return state.tokens[state.index++] as Token
}

function match(token: Token, tokenTypes: TokenType[]): boolean {
  return tokenTypes.includes(token.type)
}

function checkNumberToken(token: Token): NumberToken {
  if (token.type === TokenType.Number) {
    return token
  }
  throw new ParserError(`Expected number. Got operator: ${token.type}`)
}

function isAtEnd(state: State) {
  return state.index >= state.tokens.length
}

export { parse, Expression, AdditiveExpression, MultiplicativeExpression }
