import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "../css/Profile.css"
import sir from "../../assets/projects/sir.jpg"
import vani from "../../assets/projects/v2.jpg"

const profiles = [
  {
    name: "Abhishek Soni",
    designation: "CEO",
    image: sir,
  },
  {
    name: "Vanshika Wadhwani",
    designation: "Developer",
    image: vani,
  },
];

const Profile = () => {
  return (
    <div className="profile-section py-5">
          
      <Container>

        <Row className="justify-content-center">
          {profiles.map((profile, index) => (
            <Col
              md={6}
              lg={4}
              className="d-flex justify-content-center mb-4"
              key={index}
            >
              <motion.div
              className="profile-card"
                           initial={{ opacity: 0, x: 50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           transition={{ duration: 1, ease: "easeOut" }}
                           viewport={{ once: false, amount: 0.3 }}
                         >
            
                <div className="profile-img-wrapper">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="profile-img"
                  />
                  <div className="img-border"></div>
                </div>
                <div className="profile-info mt-4 text-center">
                  <h5 className="profile-name">{profile.name}</h5>
                  <p className="profile-role">{profile.designation}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
