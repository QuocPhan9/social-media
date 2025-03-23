import mongoose,{ Schema } from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String, 
            required: [true, "First name is required!"],

        },
        lastName: {
            type: String,
            required: [true, "last name is required!"]
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            minlength: [6, "Password length should be greater than 6 character"],
            select: true,
        },
        location: {type: String},
        profileUrl: {type: String},
        profession: {type: String},
        bio:{type:String},
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
        views: [{ type: String }],
        verified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const Users = mongoose.model("Users", UserSchema);

export default Users;