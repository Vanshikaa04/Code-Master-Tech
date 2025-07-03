import express from 'express'
import adminAuth from '../middleware/AdminAuth.js';
import {addintern, addstudent, collegestud } from "../controllers/AdminController.js"
const adminrouter = express.Router();

adminrouter.post('/addintern',adminAuth,addintern);
adminrouter.post('/addcollegestudent',adminAuth,collegestud);
adminrouter.post('/addstudent',adminAuth,addstudent);




export default adminrouter
