import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.Jwt_secret);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (!exists)
      return res.json({ success: false, message: "User Does not  Exists!" });
    
   
    const user = await userModel
      .findOne({ email: req.body.email })
      .select("+password"); //ensures password lega hi

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      if(user.status==="accepted")
      {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
        user: {
          userid: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          age:user.age,
          city :user.city,
          phone :user.phone,
          course:user.course
        },
      });
    }
    else{
      res.json({success:false, message:"Request Has Not Been Accepted. Contact Admin."})
    }
    } else
     return res.json({ success: false, message: "Invalid Credentials!"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const validateUser = async (req, res) => {
  try {
    const { email, password, phone, confpassword } = req.body;

    //checking for user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists!" });
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
const addUser = async (req, res) => {
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
      role, age, city, course,type
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
};

const adminLogin = async (req, res) => {
 try {
    const { email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (!exists)
      return res.json({ success: false, message: "User Does not  Exists!" });
    
   
    const user = await userModel
      .findOne({ email: req.body.email })
      .select("+password"); //ensures password lega hi

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
        user: {
          userid: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else
     return res.json({ success: false, message: "Invalid Credentials!"});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const  allStudents= async (req,res) => {
    try {
      const stud = await userModel.find({ role:0});
        return res.json({ success: true, stud });
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
}

const updateStatus = async (req, res) => {
  try {
    const { _id, newStatus } = req.body;

    const stud= await userModel.findByIdAndUpdate(
      _id,
      { status: newStatus },
      { new: true }
    );

    if (!stud) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    stud.status = newStatus;

  
  return res.json({ success: true, message: "Status Updated " });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
const removeuser= async (req, res) => {
  
    try {
        await userModel.findByIdAndDelete(req.body._id)
    return res.json({ success: true, message: "Student removed" });
        
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

const addNewCourse =async (req, res) => {
    try {
       console.log("req.body:", req.body); 
       console.log("req.headers:", req.headers); 

      const { id, enroll_course} = req.body;
      // res.json(id, enroll_course) 
    const stud= await userModel.findById(id );

    if (!stud) {
      return res.json({ success: false, message: "Student not found" });
    }
  const alreadyExists =
      stud.course.includes(enroll_course) || stud.enrolled_course.includes(enroll_course);

    if (alreadyExists) {
      return res.json({ success: false, message: "Course already exists" });
    }


    stud.enrolled_course.push(enroll_course);
    await stud.save();

    
  return res.json({ success: true, message: "New Course Added" });
    } catch (error) {
       console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
    }
}
export { addUser, loginUser, adminLogin,  validateUser , allStudents, updateStatus ,removeuser, addNewCourse};
