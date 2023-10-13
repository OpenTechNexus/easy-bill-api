import express from 'express';
import {signUp, getUsers} from '../controllers/users-controllers';

const router = express.Router();

router.get('/', getUsers);

router.post('/signup', signUp);

export default router;
