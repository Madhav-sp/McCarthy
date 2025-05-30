import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const userSchema = new Schema({
    fullName: {
        type:String,
        required:true,
        trim:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    avatar: {
        type:String, //cloudinary service
        default: "https://as2.ftcdn.net/jpg/03/40/12/49/1000_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.webp"
    },
    // toolsHistory: [
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:"Tool",  
    //     }
    // ],
    password: {
        type: String,
        required: [true,"password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    favoriteTools: [
        {
            type:Schema.Types.ObjectId,
            ref:"Tool",
        }
    ],

},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            isAdmin: this.isAdmin, 
        },
        process.env.ACCESS_TOKEN_SECRET
    )
}

export const User = mongoose.model("User",userSchema)