import mongoose  from "mongoose";

const collegeSchema = new mongoose.Schema(
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
    required:true

    },
    semester:{
        type:Number,
        required:true 
    },
    college:{
        type:String,
        required:true
    },
    status:{
      type:"String",
      default:"pending",
    },
  degree_name:{
    type:[String],
    required:true
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



const collegeModel =mongoose.model.college || mongoose.model("College", collegeSchema);
export default collegeModel