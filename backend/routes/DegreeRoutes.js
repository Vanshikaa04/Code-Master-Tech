import express from 'express'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/AdminAuth.js';
import { adddegree, listdegrees, removedegree, singledegree } from "../controllers/DegreeController.js"

const degreerouter = express.Router();

degreerouter.post('/adddegree',adminAuth,adddegree);
degreerouter.post('/removedegree',adminAuth,removedegree);
degreerouter.get('/listdegree',listdegrees);
degreerouter.post('/singledegree',singledegree);


export default degreerouter
