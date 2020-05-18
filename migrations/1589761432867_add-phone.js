/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('users', {
    phone: { type: 'text' },
  })
}

exports.down = (pgm) => {
  pgm.dropColumns('users', {
    phone: { type: 'text' },
  })
}