import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import internModel from "../models/internModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.Jwt_secret);
};

const loginintern = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await internModel.findOne({ email });
    if (!exists)
      return res.json({ success: false, message: "Intern Does not  Exists!" });
    
   
    const intern = await internModel
      .findOne({ email: req.body.email })
      .select("+password"); //ensures password lega hi

    const isMatch = await bcrypt.compare(password, intern.password);

    if (isMatch) {
      const token = createToken(intern._id);
      res.json({
        success: true,
        token,
        user: {
          internid: intern._id,
          name: intern.name,
          email: intern.email,
          semester:intern.semester,
          college: intern.college,
          city :intern.city,
          phone :intern.phone,
          type:intern.type
        },
      });
    } else
     return res.json({ success: false, message: "Invalid Credentials!"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const validateintern = async (req, res) => {
  try {
    const { email, password, phone, confpassword } = req.body;

    //checking for intern already exists
    const exists = await internModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Intern Already Exists!" });
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
const addintern = async (req, res) => {
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
      college, city, internship_name, type
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
};

const updateinternInfo = async (req, res) => {
  try {
    const { _id, name, email,  phone, semester} =req.body;
    if (!_id) {
      return res.json({ success: false, message: "Intern ID is required" });
    }

   

    const updatedintern = await internModel.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        phone,
       semester
      },
      { new: true } // Return the updated intern info
    );
    if (!updatedintern) {
      return res.json({ success: false, message: "Intern not found" });
    }

    res.json({
      success: true,
      message: "Intern Info updated successfully",
      intern: updatedintern,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const  allintern= async (req,res) => {
    try {
      const intern = await internModel.find({ });
        return res.json({ success: true, intern });
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
}

const updateStatus = async (req, res) => {
  try {
    const { _id, newStatus } = req.body;

    const intern= await internModel.findByIdAndUpdate(
      _id,
      { status: newStatus },
      { new: true }
    );

    if (!intern) {
      return res.status(404).json({ success: false, message: "Intern not found" });
    }
    intern.status = newStatus;

  
  return res.json({ success: true, message: "Status Updated " });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeintern= async (req, res) => {
  
    try {
        await internModel.findByIdAndDelete(req.body._id)
    return res.json({ success: true, message: "Intern removed" });
        
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};
export { addintern, loginintern,  updateinternInfo, validateintern , allintern, updateStatus , removeintern};
