import { Token } from './token'
import type * as T from './types'

abstract class Expr {
  abstract accept<R>(visitor: Expr.Visitor<R>): R
}

namespace Expr {
  export interface Visitor<R> {
    // visitAssignExpr(expr: Expr.Assign): R
    visitBinaryExpr(expr: Expr.Binary): R
    // visitCallExpr(expr: Expr.Call): R
    // visitGetExpr(expr: Expr.Get): R
    visitGroupingExpr(expr: Expr.Grouping): R
    visitLiteralExpr(expr: Expr.Literal): R
    // visitLogicalExpr(expr: Expr.Logical): R
    // visitSetExpr(expr: Expr.Set): R
    // visitSuperExpr(expr: Expr.Super): R
    // visitThisExpr(expr: Expr.This): R
    visitUnaryExpr(expr: Expr.Unary): R
    // visitVariableExpr(expr: Expr.Variable): R
  }
  export class Binary extends Expr {
    constructor(readonly left: Expr, readonly operator: Token, readonly right: Expr) {
      super()
    }

    accept<R>(visitor: Visitor<R>): R {
      return visitor.visitBinaryExpr(this)
    }
  }

  export class Grouping extends Expr {
    constructor(readonly expr: Expr) {
      super()
    }

    accept<R>(visitor: Visitor<R>): R {
      return visitor.visitGroupingExpr(this)
    }
  }

  export class Literal extends Expr {
    constructor(readonly value: T.Literal) {
      super()
    }

    accept<R>(visitor: Visitor<R>): R {
      return visitor.visitLiteralExpr(this)
    }
  }

  export class Unary extends Expr {
    constructor(readonly operator: Token, readonly right: Expr) {
      super()
    }

    accept<R>(visitor: Visitor<R>): R {
      return visitor.visitUnaryExpr(this)
    }
  }
}

export { Expr }
