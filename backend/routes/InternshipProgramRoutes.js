import express from 'express'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/AdminAuth.js';
import { addinternship, listinternships, removeinternship, singleinternship } from "../controllers/InternshipProgramController.js"

const internshiprouter = express.Router();

internshiprouter.post('/addinternship',adminAuth,upload.single("image"),addinternship);
internshiprouter.post('/removeinternship',adminAuth,removeinternship);
internshiprouter.get('/listinternship',listinternships);
internshiprouter.post('/singleinternship',singleinternship);


export default internshiprouter
