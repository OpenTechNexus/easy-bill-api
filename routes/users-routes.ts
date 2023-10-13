import express from 'express';
import {signUp, getUsers} from '../controllers/users-controllers';
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

export default router;
