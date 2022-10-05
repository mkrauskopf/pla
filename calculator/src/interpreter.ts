import { Expression, NumberExpression, parse } from './parser'
import { TokenType, scanTokens } from './scanner'

function evaluate(expression: string): number {
  const ast = parse(scanTokens(expression))
  if (isNumberExpression(ast)) {
    return ast.number.literal
  } else {
    // is ComputationExpression
    const left = Number(ast.leftOperand.literal)
    const right = Number(ast.rightOperand.literal)
    switch (ast.operator.type) {
      case TokenType.Plus:
        return left + right
      case TokenType.Minus:
        return left - right
      case TokenType.Multiply:
        return left * right
      case TokenType.Divide:
        return left / right
    }
  }
}

function isNumberExpression(ast: Expression): ast is NumberExpression {
  return (ast as NumberExpression).number !== undefined
}

export { evaluate }
