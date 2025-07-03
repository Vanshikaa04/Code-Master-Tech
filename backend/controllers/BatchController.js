import batchModel from "../models/BatchModel.js";


const addnewBatch = async (req,res) => {
    try {
    const { batch_name, courses, batchof } = req.body;

    const batchExists = await batchModel.findOne({ batch_name });
    if (batchExists) {
      return res.json({ success: false,message: 'Batch already exists' });
    }

    const newBatch = new batchModel({ batch_name, courses, batchof });
    await newBatch.save();

    res.json({ success:true, message: 'Batch created successfully', batch: newBatch });
  } catch (err) {
    res.json({ success: false, message: 'Error creating batch', error: err.message });
  }
}

const removeBatch =async (req,res) => {
    try {
    const { batchId } = req.body;

    const deleted = await batchModel.findByIdAndDelete(batchId);
    if (!deleted) {
      return res.json({ success:false, message: 'Batch not found' });
    }

    res.json({success:true,  message: 'Batch removed successfully' });
  } catch (err) {
    res.json({ success:false, message: 'Error removing batch', error: err.message });
  }
}

const viewBatch= async (req,res) => {
    try {
    const { batchId } = req.body;

    if (batchId) {
      const batch = await batchModel.findById(batchId);
      if (!batch) return res.json({ success:false, message: 'Batch not found' });
      return res.json({success:true , batch});
    }
  } catch (err) {
    res.json({ success:false, message: 'Error fetching batch', error: err.message });
  }
}

 const addCourse = async (req, res) => {
  try {
    const { batchId ,course} = req.body;
 
    const batch = await batchModel.findById(batchId);
    if (!batch) return res.json({success:false, message: 'Batch not found' });

    let dbcourse = batch.courses.map(c => c.toLowerCase());
    if (dbcourse.includes(course.map(c => c.toLowerCase()))) {
      return res.json({ success:false, message: 'Course already exists in this batch' });
    }

    batch.courses.push(...course);
    await batch.save();

    res.json({ success:true,message: 'Course added', batch });
  } catch (err) {
    res.json({ success:false, message: 'Error adding course', error: err.message });
  }
};


const addApplicant = async (req, res) => {
  try {
    const { batchId ,applicants} = req.body;
 
    const batch = await batchModel.findById(batchId);   
    if (!batch) return res.json({ success:false, message: 'Batch not found' });

    batch.applicants.push(...applicants); 
    await batch.save();

    res.json({success:true ,message: 'Applicant added', batch });
  } catch (err) {
    res.json({ success:false,message: 'Error adding applicant', error: err.message });
  }
};
const  allBatches= async (req,res) => {
    try {
      const batches = await batchModel.find({ });
        return res.json({ success: true, batches });
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
}
export { addApplicant, addCourse, addnewBatch, viewBatch, removeBatch, allBatches}