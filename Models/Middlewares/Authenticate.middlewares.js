import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const Authenticate = (request, response, next) => {
    const token = request.headers['x-auth-token'];

    verify(token, process.env.COOKIE_SECRET, (err,decoded)=>{
        if(err){
            return response.status(403).json({msg:'Signup or login to upload video'});
        }
        request.token = decoded;
        next();
    });
}