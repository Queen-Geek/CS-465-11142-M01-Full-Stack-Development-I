const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done) => {
        const q = await User
            .findOne({ email: username })
            .exec();

            // IF the DB returned no records, the user doesn't exist
            if(!q) {
                return done(null, false, { message: 'Incorrect Username'});
            }

            // Validate password
            if(!q.validPassword(password)) {
                return done(null, false, { message: 'Incorrect Password'});
            }

            return done(null, q); // Everything is OK, return user object
    }
));


// module.exports = {
//     passport
// };