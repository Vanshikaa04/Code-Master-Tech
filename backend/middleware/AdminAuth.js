import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import userModel from "../models/UserModel.js";
dotenv.config();

const adminAuth = async(req,res,next)=>{
    try {
    const {token} = req.headers;
    if (!token) {
        return res.json(
            { success:"false",
                message: "Unauthorized! No token found." 
            }
        );
    }
    const decoded = jwt.verify(token, process.env.Jwt_secret);
     const user = await userModel.findById(decoded.id);

    if(user.role!==1)
    {
        return res.json(
            { success:"false",
                message: "Unauthorized! No token found." 
            }
        );
    } 
              next()
    } catch (err) {
        return res.json({ message: err.message });
    }
}

export default adminAuth