import { useContext } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'animate.css';
import Home from "./User/Home";
import Navtab from "./components/Navtab";
import Footer from "./components/Footer";
import Projects from "./User/Projects";
import Quiz from "./User/Quiz";
import Contact from "./User/Contact";
import Programs from "./User/Programs";
import Events from "./User/Events";
import Login from "./User/Login";
import Signup from "./User/Signup";
import { ToastContainer } from "react-toastify";
import { MainContext } from "./context/MainContext";
import AdminDash from "./Admin/AdminDash";
import AllStudents from "./Admin/AllStudents";
import AllInterns from "./Admin/AllInterns";
import AllBatches from "./Admin/AllBatches";
import Requests from "./Admin/Requests";
import Courses from "./Admin/Courses";
import Internships from "./Admin/Internships";
import AddStudent from "./Admin/AddStudent";
import AddIntern from "./Admin/AddIntern";
import StudDash from "./Student/StudDash";
import Layout from "./User/Layout";
import QuizPage from "./Student/QuizPage";
import CoursesPage from "./User/CoursesPage";
import Degrees from "./Admin/Degrees";
import CollegeStudents from './Admin/CollegeStudents';
import CourseDetails from "./User/CourseDetails";
import ScrollToTop from "./context/ScrollToTop";
import CollegePage from "./User/CollegePage";
import CompanyPage from "./User/CompanyPage";
import AddCollegeStudent from "./Admin/AddCollegeStudent";
import BlogPage from "./User/BlogPage";

const AppContent = () => {
  const { setToken, token, setUser, user } = useContext(MainContext);
  const location = useLocation();

  const hideNavAndFooter = ["/admin", "/intern", "/student"].some((prefix) =>
    location.pathname.startsWith(prefix)
  );

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        theme="light"
      />
    <ScrollToTop/>
      {!hideNavAndFooter && <Navtab />}

      <Routes>
          <Route path="/" element={<Home />} />

        <Route element={<Layout/>}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/allcourses" element={<CoursesPage/>}/>
          <Route path="/college" element={<CollegePage/>}/>
          <Route path="/blog" element={<BlogPage/>}/>
        
          <Route path="/company" element={<CompanyPage/>}/>
          <Route path='/course/:courseid' element={<CourseDetails/> }/>

            
        </Route>


        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminDash token={token} setToken={setToken} setUser={setUser} />
          }
        >
          <Route path="allstudents" element={<AllStudents token={token} />} />
          <Route path="allinterns" element={<AllInterns token={token} />} />
          <Route path="collegeStudents" element={<CollegeStudents token={token} />} />
          <Route path="pendingreq" element={<Requests token={token} />} />
          <Route path="batches" element={<AllBatches token={token} />} />
          <Route path="courses" element={<Courses token={token} />} />
          <Route path="internships" element={<Internships token={token} />} />
          <Route path="degrees" element={<Degrees token={token} />} />

          <Route path="addstudent" element={<AddStudent />} />
          <Route path="addintern" element={<AddIntern />} />
          <Route path="addcollegestudent" element={<AddCollegeStudent />} />

        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <StudDash
              token={token}
              setToken={setToken}
              setUser={setUser}
              user={user}
            />
      
          }
        >
          <Route path="test" element={<QuizPage/>}/>
        </Route>
      
      </Routes>

      {!hideNavAndFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
