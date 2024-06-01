const Jwt = require("jsonwebtoken");

class jsonwebservise {
  static sign(payload, expiry = "1d", secret = "12334455y") {
    return Jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = "12334455y") {
    return Jwt.verify(token, secret);
  }
}

module.exports = jsonwebservise;
