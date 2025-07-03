import mongoose  from "mongoose";

const degreeSchema = new mongoose.Schema({
  degree_name: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },

  duration:{
    type: String,
    required: true,
  },
  fees:{
    type:Number,
    required:true
  },
  description:{
    type:String,
  }
},
  { 
    timestamps: true, 
    minimize:false 
  }
);

const degreeModel =mongoose.model.degree || mongoose.model("Degree", degreeSchema);
export default degreeModel