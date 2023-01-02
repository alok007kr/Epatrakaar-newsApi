import Joi from 'joi';
import {RefreshToken, User} from '../../models'
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../services/customErrorHandler';
import JwtService from '../../services/JwtService'
import { REFRESH_SECRET } from '../../config';

const registerController = {
    async register(req,res,next){
        //Register logic write here
        // Validation using joi
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        const {error} = registerSchema.validate(req.body);
        if(error){
            return next(error);
            // Throwing the error to show in central
        }

        // Check if the user in the database already
        try{
            const exist = await User.exists({email: req.body.email})
            if(exist){
                return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
            }
        }catch(err){
            return next(err);
        }

        const {name,email,password} = req.body;

        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Prepare model
        const user = new User({
            // name: req.body.name, // name: name 
            name,
            email,
            password: hashedPassword
        })

        let access_token;
        let refresh_token;

        try{
            const result = await user.save() 
            console.log(result)
            //const id = result._id.toString()
            // Accessing ObjectId : (result._id.toString())
            // Token Generation
            access_token = JwtService.sign({_id: result._id, role: result.role})
            refresh_token = JwtService.sign({_id: result._id, role: result.role}, '1y', REFRESH_SECRET)
            //database
            await RefreshToken.create({tokens: refresh_token})

        }
        catch(err){
            return next(err);
        }
        res.json({access_token: access_token, refresh_token: refresh_token})
    }
}

export default registerController;