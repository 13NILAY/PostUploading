import mongoose from "mongoose";
const { Schema } = mongoose;
import passportLocalMongoose from "passport-local-mongoose";


const InfoSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    posts:[
        {
            image:{
                type:String,
            },
            Caption:{
                type:String,
            },
            Location:{
                type:String,
            },
            geometry:{
                type: {
                    type: String, 
                    enum: ['Point'], 
                  },
                  coordinates: {
                    type: [Number],
                  }
            }
        },
    ]

})

InfoSchema.plugin(passportLocalMongoose);
const Info=mongoose.model("Info",InfoSchema);
export default Info