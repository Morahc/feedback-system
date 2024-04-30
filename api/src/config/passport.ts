import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserModel from '../models/user.model';
import { BadRequestException, NotFoundException } from '../exceptions';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: { id: string }, done) => {
  //fetch
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email }).select('_id password');

        if (!user) {
          return done(new NotFoundException('User not found'));
        }

        if (!user.matchPassword(password))
          return done(new BadRequestException('Incorrect password'));

        return done(null, { id: user.id });
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
