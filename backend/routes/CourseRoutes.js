import express from 'express'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/AdminAuth.js';
import { addcourse, listcourses, removecourse, singlecourse } from "../controllers/CourseController.js"

const courserouter = express.Router();

courserouter.post('/addcourse',adminAuth,upload.single("image"),addcourse);
courserouter.post('/removecourse',adminAuth,removecourse);
courserouter.get('/listcourse',listcourses);
courserouter.post('/singlecourse',singlecourse);


export default courserouter
