import express from "express"
import adminAuth from '../middleware/AdminAuth.js';
import { addApplicant, addCourse, addnewBatch, viewBatch, removeBatch, allBatches} from "../controllers/BatchController.js"

const batchrouter = express.Router()

//API

batchrouter.post("/addapplicant",adminAuth, addApplicant)
batchrouter.post("/addcourse",adminAuth,addCourse)
batchrouter.post("/addnewbatch",adminAuth,addnewBatch)
batchrouter.post ("/viewbatch",adminAuth,viewBatch)
batchrouter.post ("/removebatch",adminAuth,removeBatch)
batchrouter.get("/allbatches",adminAuth, allBatches)


export default batchrouter