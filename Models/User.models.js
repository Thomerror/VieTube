import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    username:{
        type: String,
        require:[true, 'Username is required to create account'],
        unique: [true, 'Account with this username already exist']
    },
    email:{
        type: String,
        require:[true, 'Email is required to create account'],
        unique: [true, 'Account with this email already exist']
    },
    password:{
        type:String,
        require:[true, 'Password is required to create account'],
        minlength: 6
    },
    videos:[
        {
            type: Schema.Types.ObjectId,
            ref:'videos'
        }
    ],
    subscribers:{
        type: Array,
        default:[]
    },
    userSunscribedChannels:{
        type: Array,
        default:[]
    },
})

export const userModel = model('user', userSchema)