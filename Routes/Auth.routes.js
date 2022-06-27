import { Router } from 'express'
import { AuthController} from '../Controller/Auth.Controller.js'


const router = Router();
const Controller = new AuthController();

router.post('/api/signup', (req,res)=>{
    Controller.signup(req,res);
});

router.post('/api/signin', (req,res)=>{
    Controller.signin(req,res);
});

router.post('/api/password-reset', (req,res)=>{
    Controller.forgotPassword(req,res);
});

export default router;