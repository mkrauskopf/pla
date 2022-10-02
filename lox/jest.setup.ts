import { Scanner } from './src/scanner'
import { Token } from './src/token'

// Extending Jest matchers was way harder and kind of hacky than I thought. I'm not sure whether there is a nicer way
// to reuse existing matchers. See e.g. the discussion here: https://github.com/facebook/jest/issues/2547
expect.extend({
  toBeTokenizedTo(source: string, expectedTokens: Token[]) {
    const result = new Scanner(source).scanTokens()
    const pass = this.equals(result, expectedTokens)

    const message = pass
      ? () =>
          [
            `${this.utils.matcherHint('.not.toBeTokenizedTo')}`,
            'Expected tokenized source to not be:',
            `    ${this.utils.printExpected(expectedTokens)}`,
            'Received:',
            `    ${this.utils.printReceived(result)}`,
          ].join('\n')
      : () => {
          const diffString = this.utils.diff(expectedTokens, result, { expand: this.expand })
          return [
            `${this.utils.matcherHint('.toBeTokenizedTo')}`,
            '\nExpected tokenized source to be:',
            `    ${this.utils.printExpected(expectedTokens)}`,
            'Received:',
            `    ${this.utils.printReceived(result)}`,
            '\nDifference:',
            `${diffString}`,
          ].join('\n')
        }
    return { pass, message }
  },
})
