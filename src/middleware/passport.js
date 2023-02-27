const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/schema/user");
const userRepo = require("../repositories/user");
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "95768016127-dsemmaj0bijmr7g0nn28lauupvimudpd.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4500/api/users/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      userRepo.findOne(profile.id).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          userRepo.createGoogleUser(profile);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

module.exports = passport;
