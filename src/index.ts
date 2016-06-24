import {WebpackConfig, get, literalReplace} from '@easy-webpack/core'
const DefinePlugin = require('webpack/lib/DefinePlugin')

/**
 * @param externals list packages that should be used as node modules, directly from node_modules (without bundling)
 */
export = function electron({externals = []} = {}) {
  return function electron(this: WebpackConfig): WebpackConfig {
    return {
      output: literalReplace<any>({
        path: this.output.path,
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
      }),
      
      resolve: {
        packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
        mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
      },

      plugins: [
        new DefinePlugin({
          '__DEV__': true,
          'ENV': JSON.stringify(this.metadata.ENV),
          'HMR': this.metadata.HMR,
          'process.env': {
            'ENV': JSON.stringify(this.metadata.ENV),
            'NODE_ENV': JSON.stringify(this.metadata.ENV),
            'HMR': this.metadata.HMR,
          }
        })
      ].concat(get(this, 'plugins', [])),

      externals: externals.concat(get(this, 'externals', []))
    }
  }
}