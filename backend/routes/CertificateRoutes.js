import express from "express"
import {allparticipants, addParticipant, updateStatus, remove} from "../controllers/CertificateController.js"

const certirouter = express.Router()

certirouter.post("/register", addParticipant);
certirouter.get("/allparticipants", allparticipants);
certirouter.post("/accept", updateStatus);
certirouter.post("/remove", remove);
// certirouter.post("/generate-certificate", generateCerti);

export default certirouter
