import {WebpackConfigWithMetadata, get, literalReplace} from '@easy-webpack/core'
const DefinePlugin = require('webpack/lib/DefinePlugin')

/**
 * @param externals list packages that should be used as node modules, directly from node_modules (without bundling)
 */
export = function electron({externals = []} = {}) {
  return function electron(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      resolve: {
        mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
      },

      externals: externals.concat(get(this, 'externals', []))
    }
  }
}
