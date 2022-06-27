import { IncomingForm } from 'formidable';
import { genSalt, hash, compare} from 'bcrypt';
import { config } from 'dotenv';
import { verify, sign } from 'jsonwebtoken';
import { userModel } from '../Models/User.models'
config()

export class AuthController{

    // Sign up method
    signup(request, response){
        const form = new IncomingForm();

        form.parse(request, async(err, fields, files)=>{
            if(err){
                return response.status(500).json({msg:'Network error: Failed to create account, please try again later'})
            }

            const { username, email, password } = fields;
            const salt = await genSalt(15);
            const hashedPassword = await hash(password, salt);
            const newAccount = new userModel({
                username,
                email,
                password: hashedPassword
            })
            try{
                const savedAccount = await newAccount.save();
                response.status(201).json({msg:'Account created successfully'})
            }
            catch(err){
                response.status(500).json({msg:'Failed to create account'})
            }
        })
    }

    // Sign in method
    signin(request, response){
        const form = new IncomingForm();

        form.parse(request, async (err,fields,files)=>{
            if(err){
                return response.status(500).json({msg:'Network Error: Failed to login'})
            }
            const { account, password } = fields;
            const isAccountEmail = account.includes("@");
            if(isAccountEmail){
                const user = await userModel.findOne({email:account});
                if(!user){
                    return response.status(404).json({msg:'Account with this email does not exist'})
                }
                const isPasswordValid = await compare(password, user.password);
                if(!isPasswordValid){
                    return response.status(401).json({msg:'Invalid credentials'});
                }
                const token_payload = {
                    _id:user._id,
                    email:user.email,
                    username:user.username
                }
                const token = sign(token_payload, process.env.COOKIE_SECRET, { expiresIn: '30d' })
                return response.status(200).json({token})
            }
            
            const user = await userModel.findOne({username:account});
                if(!user){
                    return response.status(404).json({msg:'Account with this username does not exist'})
                }
                const isPasswordValid = await compare(password, user.password);
                if(!isPasswordValid){
                    return response.status(401).json({msg:'Invalid credentials'});
                }
                const token_payload = {
                    _id:user._id,
                    email:user.email,
                    username:user.username
                }
                const token = sign(token_payload, process.env.COOKIE_SECRET, { expiresIn: '30d' })
                return response.status(200).json({token})
        })
    }

    // Forgot password method

    forgotPassword(request, response){
        const form = new IncomingForm();

        form.parse(request, async (err,fields,files)=>{
            if(err){
                return response.status(500).json({msg:'Network Error: Failed to reset password'})
            }
            const { email, password } = fields;
            if(!email || !password){
                return response.status(400).json({msg:'All fiedls are required to reset password'});
            }
            const salt = await genSalt(15);
            const hashedPassword = await hash(password, salt);

            try{
                const user = await userModel.findOne({email:email})
                if(!user){
                    return response.status(404).json({msg:'Account with this email does not exist'})
                }
                const updatedAccount = await userModel.findOneAndUpdate({email:email}, {$set:{password:hashedPassword}}, {new:true})
                return response.status(200).json({msg:'Password reset successfully'})

            }catch(err){
                return response.status(500).json({msg:'Failed to reset password'})
            }
        })
    }
    
}
