import mongoose  from "mongoose";

const internshipSchema = new mongoose.Schema({
  internship_name: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  languages: {
    type: [String], 
    required: true,
  },
  duration:{
    type: String,
    required: true,
  },
  fees:{
    type:Number,
    required:true
  },
  image:{
    type:String,
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



const internshipModel =mongoose.model.internship || mongoose.model("Internships_Programs", internshipSchema);
export default internshipModel