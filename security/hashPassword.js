const { randomBytes, pbkdf2Sync } = require('crypto')

module.exports = hashPassword = (password, salt = randomBytes(16).toString('hex')) => {
  return [pbkdf2Sync(
    password,
    salt,
    1000,
    32,
    'sha512'
  ).toString("hex"), salt]
}
