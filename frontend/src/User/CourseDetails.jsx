import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { MainContext } from '../context/MainContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Card, Row, Col } from 'react-bootstrap';
import Featured from '../components/CourseComp/FeaturedCourses'; 

const CourseDetails = () => {
  const { courseid } = useParams();
  const navigate = useNavigate();
  const { backendurl, token } = useContext(MainContext);
  const [course, setCourse] = useState({});

  const handleEnroll = () => {
    if (!token) {
      navigate("/signup");
      toast.error("Signup to Enroll Course")
    }
  }

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await axios.post(backendurl + "/api/course/singlecourse", { courseid });
        if (res.data.success) {
          setCourse(res.data.course);
        } else {
          toast.error("Unable to fetch the Course")
        }
      } catch (error) {
        toast.error("Server Error")
        console.log(error)
      }
    }

    

    getCourse();
  }, [courseid]);


  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* Course Detail Section */}
        <div className="col-md-7">
          <h2 className="fw-bold mb-3 text-danger">{course.course_name}</h2>
          <p className="text-muted mb-3">{course.description}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Fees:</strong> ₹{course.fees}</p>
          {course.prerequisites?(
          <p><strong>Prerequisites:</strong> {course.prerequisites}</p>
          ):null
          }
          <p><strong>What you will learn: </strong>
            {(() => {
                               try {
                                 const langs = JSON.parse(course.languages);
                                 return Array.isArray(langs)
                                   ? langs.map((lang, idx) => (
                                       <span key={idx} className="me-1">
                                         {lang}
                                         {idx !== langs.length - 1 && ","}
                                       </span>
                                     ))
                                   : null;
                               } catch (err) {
                                 toast.error(err);
                                 return (
                                   <span className="text-danger">Invalid languages</span>
                                 );
                               }
                             })()}</p>

          <Button variant="danger" className="text-white mt-3" onClick={handleEnroll}>
            Enroll Now
          </Button>
        </div>

        <div className="col-md-5 text-center">
          <img
            src={course.image}
            alt={course.course_name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        </div>
      </div>

    
      {/* Featured Courses Section */}
      <div className="mt-5">
        <h4 className="mb-3">Specialized Course</h4>
        <Featured />
      </div>
    </div>
  );
};

export default CourseDetails;
