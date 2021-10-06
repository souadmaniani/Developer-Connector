const User = require('../models/User')

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require('./keys').secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // passport callback function
        console.log("The passport callback function called");
        User.findOne({_id: jwt_payload.id})
        .then((user)=> {
            if (user)
                return done(null, user);
            else
                return done(null, false);
        })
        .catch((err) => {
            console.log("error hapenend");
            return done(err, false);
        })
    }))
}
