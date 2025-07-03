import express from "express"
import adminAuth from '../middleware/AdminAuth.js';
import  {addstudent, loginstudent,updatestudentInfo, validatestudent, updateStatus, allstudent, removestudent} from "../controllers/CollegeController.js"

const cstudentrouter = express.Router()


//API

cstudentrouter.post("/register", addstudent)
cstudentrouter.post("/login",loginstudent)
cstudentrouter.post("/updatestudent",updatestudentInfo)
cstudentrouter.post ("/validatestudent",validatestudent)
cstudentrouter.post("/updatestatus", adminAuth, updateStatus)
cstudentrouter.get("/allstudents", adminAuth, allstudent)
cstudentrouter.post("/removestudent",adminAuth, removestudent)

export default cstudentrouter