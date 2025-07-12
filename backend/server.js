import express from "express"
import cors from "cors"
import "dotenv/config"  //supports from dot env
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import router from "./routes/UserRoutes.js"
import internrouter from "./routes/InternRoutes.js"
import batchrouter from "./routes/BatchRoutes.js"
import courserouter from "./routes/CourseRoutes.js"
import internshiprouter from "./routes/InternshipProgramRoutes.js"
import degreerouter from './routes/DegreeRoutes.js';
import cstudentrouter from "./routes/CollegeRoutes.js"
import adminrouter from "./routes/AdminRoutes.js"


//App Config
const app =express()
const port = process.env.PORT || 2004
connectDB()

connectCloudinary()

//middlewares
app.use(express.json())
// app.use(cors())


const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
"http://localhost:2004",
"https://www.codemastertechnology.in/",
"https://www.codemastertechnology.in",
"https://code-master-tech-backend.vercel.app"

  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow non-browser tools like Postman
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(' CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // if using cookies or Authorization headers
  };
  
  app.use(cors(corsOptions));
  
// //api endpoints
app.use('/api/user',router)
app.use('/api/intern', internrouter)
app.use ('/api/batch', batchrouter)
app.use ('/api/course', courserouter)
app.use('/api/internship', internshiprouter)
app.use('/api/degree', degreerouter)
app.use('/api/college', cstudentrouter)
app.use("/api/admin",adminrouter)



app.get ('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port ,()=> console.log("Server Started on port :"+port ))