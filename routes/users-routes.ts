import express from 'express';
import {signUp, signIn, getUsers} from '../controllers/users-controllers';
import {check} from 'express-validator';

const router = express.Router();

router.get('/', getUsers);

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6}),
  ],
  signUp,
);

router.post(
  '/signin',
  [check('email').not().isEmpty(), check('password').not().isEmpty().isLength({min: 6})],
  signIn,
);

export default router;
