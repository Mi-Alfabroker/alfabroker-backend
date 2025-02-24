import express from 'express';
import { SignInRequest } from '../requests/SignInRequest';
import RequestValidator from '../middlewares/RequestValidator';
import { SignUpRequest } from '../requests/SignUpRequest';
import { Container } from 'typedi';
import AuthController from '../controllers/AuthController';

const router = express.Router();

const authController = Container.get(AuthController);

router.post('/signup', RequestValidator.validate(SignUpRequest), authController.signUp);
router.post('/signin', RequestValidator.validate(SignInRequest), authController.signIn);
router.get('/users', authController.getAllUsers);

export default router;
