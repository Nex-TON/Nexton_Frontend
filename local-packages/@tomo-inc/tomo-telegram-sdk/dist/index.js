
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./tomo-telegram-sdk.cjs.production.min.js')
} else {
  module.exports = require('./tomo-telegram-sdk.cjs.development.js')
}
