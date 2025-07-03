import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import collegeModel from "../models/CollegeModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.Jwt_secret);
};

const loginstudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await collegeModel.findOne({ email });
    if (!exists)
      return res.json({ success: false, message: "Student Does not  Exists!" });
    
   
    const student = await collegeModel
      .findOne({ email: req.body.email })
      .select("+password"); //ensures password lega hi

    const isMatch = await bcrypt.compare(password, student.password);

    if (isMatch) {
      const token = createToken(student._id);
      res.json({
        success: true,
        token,
        user: {
          studentid: student._id,
          name: student.name,
          email: student.email,
          semester:student.semester,
          college: student.college,
          city :student.city,
          phone :student.phone,
          degree:student.degree_name,
          type: student.type
        },
      });
    } else
     return res.json({ success: false, message: "Invalid Credentials!"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const validatestudent = async (req, res) => {
  try {
    const { email, password, phone, confpassword } = req.body;

    //checking for student already exists
    const exists = await collegeModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "student Already Exists!" });
    }

    //Validating email format  & strong pass
    if (!validator.isEmail(email))
      return res.json({
        success: false,
        message: "Please Enter Valid Email Address!",
      });

    if (password.length < 8)
      return res.json({
        success: false,
        message: "Please Enter a Strong Password",
      });
    if (password !== confpassword)
      return res.json({
        success: false,
        message: "Confirm Password And Password do not match",
      });
    if (phone.length != 10)
      return res.json({
        success: false,
        message: "Please Enter Correct Phone  Number",
      });
    else {
      return res.json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const addstudent = async (req, res) => {
    const { email, password, phone, name,semester, college, city ,degree_name, type} = req.body;

  try {

    // hashing password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newstudent = new collegeModel({
      name,
      email,
      password: hashedPassword,
      phone,
      semester,
      college, city, degree_name, type
    });

    const student = await newstudent.save();
    const token = createToken(student._id);

    res.json({
      success: true,
      token,
      user: {
        studentid: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        semester: student.semester,
        college : student.college,
        city: student.city,
       degree_name: student.degree_name,
       type: student.type
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updatestudentInfo = async (req, res) => {
  try {
    const { _id, name, email,  phone, semester} =req.body;
    if (!_id) {
      return res.json({ success: false, message: "student ID is required" });
    }

   

    const updatedstudent = await collegeModel.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        phone,
       semester
      },
      { new: true } // Return the updated student info
    );
    if (!updatedstudent) {
      return res.json({ success: false, message: "student not found" });
    }

    res.json({
      success: true,
      message: "student Info updated successfully",
      student: updatedstudent,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const  allstudent= async (req,res) => {
    try {
      const student = await collegeModel.find({ });
        return res.json({ success: true, student });
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
}

const updateStatus = async (req, res) => {
  try {
    const { _id, newStatus } = req.body;

    const student= await collegeModel.findByIdAndUpdate(
      _id,
      { status: newStatus },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    student.status = newStatus;

  
  return res.json({ success: true, message: "Status Updated " });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removestudent= async (req, res) => {
  
    try {
        await collegeModel.findByIdAndDelete(req.body._id)
    return res.json({ success: true, message: "Student removed" });
        
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};
export { addstudent, loginstudent,  updatestudentInfo, validatestudent , allstudent, updateStatus , removestudent};
