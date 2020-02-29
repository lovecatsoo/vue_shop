const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/User')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'
module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      }).catch(err => {
        console.log(err)
      })
  }))
}
