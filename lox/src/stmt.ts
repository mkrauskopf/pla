import { Expr } from './expr'

abstract class Stmt {
  abstract accept<R>(visitor: Stmt.Visitor): void
}

namespace Stmt {
  export interface Visitor {
    visitPrintStatement(statement: Stmt): void
    visitExpressionStatement(statement: Stmt): void
  }

  export class Print extends Stmt {
    constructor(readonly expression: Expr) {
      super()
    }

    accept<R>(visitor: Visitor): void {
      visitor.visitPrintStatement(this)
    }
  }

  export class Expression extends Stmt {
    constructor(readonly expression: Expr) {
      super()
    }

    accept<R>(visitor: Visitor): void {
      visitor.visitExpressionStatement(this)
    }
  }
}

export { Stmt }
