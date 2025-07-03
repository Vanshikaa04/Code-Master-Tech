import express from "express"
import adminAuth from '../middleware/AdminAuth.js';
import  {addintern, loginintern,updateinternInfo, validateintern, updateStatus, allintern, removeintern} from "../controllers/InternController.js"

const internrouter = express.Router()


//API

internrouter.post("/register", addintern)
internrouter.post("/login",loginintern)
internrouter.post("/updateintern",updateinternInfo)
internrouter.post ("/validateintern",validateintern)
internrouter.post("/updatestatus", adminAuth, updateStatus)
internrouter.get("/allinterns", adminAuth, allintern)
internrouter.post("/removeintern",adminAuth, removeintern)

export default internrouter