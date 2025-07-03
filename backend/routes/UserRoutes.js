import express from "express"
import adminAuth from '../middleware/AdminAuth.js';
import  {addUser, loginUser, adminLogin, validateUser, allStudents, updateStatus, removeuser, addNewCourse} from "../controllers/UserController.js"
import userAuth from '../middleware/UserAuth.js';

const router = express.Router()

//API

router.post("/register", addUser)
router.post("/login",loginUser)
router.post("/adminlogin",adminLogin)
router.post ("/validateuser",validateUser)
router.post ("/updatestatus",adminAuth,updateStatus)
router.post("/removeuser",adminAuth, removeuser)
router.post("/addnewcourse",addNewCourse)
router.get("/allstudents",adminAuth, allStudents)



export default router