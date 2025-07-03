import { v2 as cloudinary } from "cloudinary";
import courseModel from "../models/CourseModel.js";

//Adding course
const addcourse = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const {
      course_name,
      description,
      fees,
      languages,
      duration,
      prerequisites,
      featured
    } = req.body;

    const image = req.file;
    const uploadResponse = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imageUrl = uploadResponse.secure_url;


    const isFeatured = featured === "true";

    const courseData ={
      course_name,
      description,
      fees :Number(fees),
      languages,
      image:imageUrl,
      duration  ,
      prerequisites,
      featured:isFeatured
      };

    const course =new courseModel(courseData)
    await course.save()

    return res.json({ success: true, message: "Course added", course });

} catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Listing course
const listcourses = async (req, res) => {
    try {
        const courses =await courseModel.find({});
        res.json({success:true, courses})
    } catch (error) {
        console.log(error);
    return res.json({ success: false, message: error.message });
    }
};

//removing course
const removecourse = async (req, res) => {
  
    try {
        await courseModel.findByIdAndDelete(req.body._id)
    return res.json({ success: true, message: "course removed" });
        
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

//Single course Info
const singlecourse = async (req, res) => {
    try {
         const {courseid}= req.body
         const course = await courseModel.findById(courseid)
         res.json({success:true, course})
    } catch (error) {
        console.log(error); 
        return res.json({ success: false, message: error.message });
      }
};


export { addcourse, listcourses, removecourse, singlecourse };
