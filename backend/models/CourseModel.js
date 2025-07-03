import mongoose  from "mongoose";

const courseSchema = new mongoose.Schema({
  course_name: {
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
  },
  prerequisites :{
    type:String,
  },
  featured:{
    type:Boolean,
  }
},
  { 
    timestamps: true, 
    minimize:false 
  }
);



const courseModel =mongoose.model.course || mongoose.model("Courses", courseSchema);
export default courseModel