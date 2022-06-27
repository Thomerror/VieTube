import { Schema, model } from 'mongoose'

const videoSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:[true, 'Video name is accquired to upload video']
    },
    videopath:{
        type:String,
        required:[true, 'Video path is required to upload video'],
        unique:[true, 'Video path already exist']
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    views:{
        types: Array,
        default: []
    },
    comments:{
        type: Array,
        default:[]
    }
})

export const videoModel = model('video', videoSchema)