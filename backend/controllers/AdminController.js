import collegeModel from "../models/CollegeModel.js";
import userModel from "../models/UserModel.js";
import internModel from "../models/internModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.Jwt_secret);
};
const addstudent =async (req,res) => {
     const { email, password, phone, name ,role, age, city,course,type} = req.body;

  try {

    // hashing password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role, age, city, course,type,
      status:"accepted"
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        userid: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
       age: user.age,
       course:user.course,
      type: user.type
      
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const addintern =async (req,res) => {
     const { email, password, phone, name,semester, college, city ,internship_name, type} = req.body;

  try {

    // hashing password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newintern = new internModel({
      name,
      email,
      password: hashedPassword,
      phone,
      semester,
      college, city, internship_name, type,
      status:"accepted"

    });

    const intern = await newintern.save();
    const token = createToken(intern._id);

    res.json({
      success: true,
      token,
      user: {
        internid: intern._id,
        name: intern.name,
        email: intern.email,
        phone: intern.phone,
        semester: intern.semester,
        college : intern.college,
        city: intern.city,
        role:"intern",
        internship_name: intern.internship_name,
        type: intern.type
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const collegestud = async (req,res) => {
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
      college, city, degree_name, type,
      status:"accepted"
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
}



export {addintern, addstudent, collegestud }