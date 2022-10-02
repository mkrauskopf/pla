import ParserError from './errors/ParserError'
import { NumberToken, OperatorToken, Token, TokenType, isOperatorToken, tokenAsString } from './scanner'

type ComputationExpression = {
  operator: OperatorToken
  leftOperand: NumberToken
  rightOperand: NumberToken
}

type NumberExpression = {
  number: NumberToken
}

type Expression = NumberExpression | ComputationExpression

function parse(tokens: Token[]): Expression {
  if (tokens.length === 0) {
    throw new ParserError('Expression cannot be empty')
  }

  if (tokens.length === 1) {
    return { number: checkNumberToken(nextToken(tokens, 0)) }
  }

  return parseComputation(tokens, 0)
}

function parseComputation(tokens: Token[], index: number) {
  const leftOperand = checkNumberToken(nextToken(tokens, index++))
  const operator = checkOperatorToken(nextToken(tokens, index++))
  const rightOperand = checkNumberToken(nextToken(tokens, index++))

  if (tokens.length != index) {
    throw new ParserError(`Unexpected token ${tokenAsString(tokens[index]!)}. Expecting end of expression`)
  }

  return { leftOperand, operator, rightOperand }
}

function checkNumberToken(token: Token): NumberToken {
  if (token.type === TokenType.Number) {
    return token
  }
  throw new ParserError(`Expected number. Got operator: ${token.type}`)
}

function checkOperatorToken(token: Token): OperatorToken {
  if (isOperatorToken(token)) {
    return token
  }
  throw new ParserError(`Expected operator. Got number: ${token.lexem}`)
}

function nextToken(tokens: Token[], index: number): Token {
  if (index < tokens.length) {
    return tokens[index]!
  }
  throw new ParserError('Unexpected end of line')
}

export { parse, Expression, NumberExpression, ComputationExpression }
