import mongoose  from "mongoose";

const batchSchema = new mongoose.Schema({
  batch_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  courses: {
    type: [String], 
    required: true,
    // lowercase: true, 
  },
  batchof: {
    type: String,
    default: "Student",
  },
  applicants: {
    type: [String],
    default: [],
  },
},
  { 
    timestamps: true, 
    minimize:false 
  }
);



const batchModel =mongoose.model.batch || mongoose.model("Batches", batchSchema);
export default batchModel