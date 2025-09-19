import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MainContext } from "../context/MainContext";

const CertificateRegister = () => {
  const {backendurl} = useContext(MainContext)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    seminar: "",
  });
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(backendurl +"/api/certificate/register", formData);
      const { success, message, participant } = res.data;

      if (success) {
        toast.info(message);

        if (participant.status === "accepted") {
          navigate("/certificate", {
            state: {
              name: participant.name,
              seminar: participant.seminar,
            },
          });
        }
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4 fw-bold">
              Register for Certificate
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* City */}
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Seminar */}
              <div className="mb-3">
                <label className="form-label">Select Seminar</label>
                <select
                  className="form-select"
                  name="seminar"
                  value={formData.seminar}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choose Seminar --</option>
                  <option value="C Fundamentals">C Fundamentals</option>
                  <option value="Web Development Bootcamp">
                    Web Development Bootcamp
                  </option>
                </select>
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button type="submit" className="btn  btn-lg text-white" style={{backgroundColor:"var(--bgcolor)"}}>
                  Generate E-Certificate 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateRegister;
