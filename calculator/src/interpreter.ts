import CalculatorError from './errors/CalculatorError'
import { AdditiveExpression, Expression, MultiplicativeExpression, parse } from './parser'
import { NumberToken, TokenType, scanTokens } from './scanner'

function evaluate(expression: string): number {
  return evaluateExpr(parse(scanTokens(expression)))
}

function evaluateExpr(expr: Expression): number {
  if (isNumberExpression(expr)) {
    return expr.literal
  } else if (isAdditiveExpression(expr)) {
    if (expr.operator.type === TokenType.Plus) {
      return evaluateExpr(expr.leftTerm) + evaluateExpr(expr.rightTerm)
    } else {
      return evaluateExpr(expr.leftTerm) - evaluateExpr(expr.rightTerm)
    }
  } else if (isMultiplicativeExpression(expr)) {
    if (expr.operator.type === TokenType.Multiply) {
      return evaluateExpr(expr.leftFactor) * evaluateExpr(expr.rightFactor)
    } else {
      return evaluateExpr(expr.leftFactor) / evaluateExpr(expr.rightFactor)
    }
  } else {
    throw new CalculatorError(`Unknown expression: ${expr}`)
  }
}

function isNumberExpression(expr: Expression): expr is NumberToken {
  return (expr as NumberToken).type === TokenType.Number
}

function isAdditiveExpression(expr: Expression): expr is AdditiveExpression {
  return [TokenType.Plus, TokenType.Minus].includes((expr as AdditiveExpression).operator?.type)
}

function isMultiplicativeExpression(expr: Expression): expr is MultiplicativeExpression {
  return [TokenType.Multiply, TokenType.Divide].includes((expr as MultiplicativeExpression).operator?.type)
}

export { evaluate }
