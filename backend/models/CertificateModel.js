import mongoose  from "mongoose";

const certiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
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
    
    status:{
      type:"String",
      default:"pending",
    },
   
  seminar:{
    type:[String],
    require:true
  },

  },
  { 
    timestamps: true, 
    minimize:false 
  }
);



const certiModel =mongoose.model.certi || mongoose.model("Certificate", certiSchema);
export default certiModel