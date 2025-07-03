import { v2 as cloudinary } from "cloudinary";
import internshipModel from "../models/InternshipProgramModel.js";

//Adding internship
const addinternship = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const {
      internship_name,
      description,
      fees,
      languages,
      duration,

    } = req.body;
    const image = req.file;

    const uploadResponse = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imageUrl = uploadResponse.secure_url;

    const internshipData ={
      internship_name,
      description,
      fees :Number(fees),
        languages,
      image:imageUrl,
      duration  
      };

    const internship =new internshipModel(internshipData)
    await internship.save()

    return res.json({ success: true, message: "Internship added", internship });

} catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Listing internship
const listinternships = async (req, res) => {
    try {
        const internships =await internshipModel.find({});
        res.json({success:true, internships})
    } catch (error) {
        console.log(error);
    return res.json({ success: false, message: error.message });
    }
};

//removing internship
const removeinternship = async (req, res) => {
  
    try {
        await internshipModel.findByIdAndDelete(req.body._id)
    return res.json({ success: true, message: "internship removed" });
        
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

//Single internship Info
const singleinternship = async (req, res) => {
    try {
         const {internshipid}= req.body
         const internship = await internshipModel.findById(internshipid)
         res.json({success:true, internship})
    } catch (error) {
        console.log(error); 
        return res.json({ success: false, message: error.message });
      }
};


export { addinternship, listinternships, removeinternship, singleinternship };
