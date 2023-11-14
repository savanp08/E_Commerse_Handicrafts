import mongoose from "mongoose";
import { userSchema } from "../Schemas/userSchema.js";

async function SignUp(req) {
    try {
        console.log("In function SignUp => Account creation requested for ", req.body);
        const user = new userSchema({
            ...req.body.user,
            password: req.body.user.password,
            email : req.body.user.email.toLowerCase(),
            userId: new mongoose.Types.ObjectId().toString(),
           
        });
        
        console.log("In function SignUp => Account creation requested for ");
        
        const res = await user.save();

        return {
            message: "success",
            user: res,
        };
    } catch (err) { 
        console.log("Error in SignUp", err);
        return {
            message: "error",
            error: err.message,
            user : null,
        };
    }
}

async function userExists(req) {
    console.log("In method userExists => Checking if user exists",);

    try {
        console.log("Searching for user with email", req.email); 
        const res = await userSchema.findOne({ email: req.email.toLowerCase() });

        

        if (res) {
            console.log("Account Already Exists", ); 
            return {
                message: "true",
                user: res,
            }
        } else {
            console.log("Account Does Not Exists",); 
            return {
                message: "false",
                user: null,
            }
        }
    } catch (err) {
        console.log("Error searching for user", err.message);
        return "error";
    }
}


export {
    SignUp,
    userExists,
}