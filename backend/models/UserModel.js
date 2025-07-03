import mongoose  from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    phone:{
      type:String,
      required: true,
      match: /^[0-9]{10}$/,
    },
 
  city:{
    type:String,
    default:"Idar"
    },
    age:{
        type:Number 
    },
    status:{
      type:"String",
      default:"pending",
    },
    role:{
    type:Number,
    default:0
  },
  course:{
    type:[String],
    require:true
  },
  enrolled_course:{
    type:[String],
    default:[]
  },
   type:{
    type:String,
    default:"Offline"
  }
  },
  { 
    timestamps: true, 
    minimize:false 
  }
);



const userModel =mongoose.model.user || mongoose.model("User", userSchema);
export default userModel