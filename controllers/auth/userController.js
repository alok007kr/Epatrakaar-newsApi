import { User } from "../../models";
import CustomErrorHandler from "../../services/customErrorHandler";

const userController = {
    async me(req,res,next){
        try{
            // console.log(req.user._id)
            const user = await User.findOne({_id: req.user._id}).select('-password -updatedAt -__v')

            if(!user){
                return next(CustomErrorHandler.notFound())
            }
            // console.log(user)
            res.json(user)
        }catch(err){
            return next(err)
        }
    }
}

export default userController;