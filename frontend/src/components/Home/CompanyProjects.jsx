
import { Container, Row, Col, Card, Image, Button} from "react-bootstrap";
import kanyashi from "../../assets/projects/kanyashi.png"
import vani from "../../assets/projects/S.png"
import kavya from "../../assets/projects/kavya.png"
import das from "../../assets/projects/das.png"
import dges from "../../assets/projects/dges.png"
import manav from "../../assets/projects/manav.png"

import {motion} from "framer-motion"

// Sample data
const Companys = [

  {
    name: "Kanyashi",
    projectImage: kanyashi,
    to:"https://kanyashi.com/"

  },
    {
    name: "Soulful Scribble",
    projectImage: vani,
    to:"https://www.soulfulscribble.in/"

  },
      {
    name: "Kavya Creation",
    projectImage: kavya,
    to:" https://kavya-creation.com/"

  },
        {
    name: "Das Group",
    projectImage: das,
    to:" https://dasgroup.in/"

  },
        {
    name: "DGES School",
    projectImage: dges,
    to:"https://dgesschool.com/"

  },
        {
    name: "Manav Hospital",
    projectImage: manav,
    to:"https://manavhospital.in/"

  },
 
];

const CompanyProjects = () => {
 const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.6, delay: 0.1 },
    },
  };

  return (
    <Container className="py-4">
      <Row className="g-4 justify-content-center">
        {Companys.map((company, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card
                className="border-0 text-center p-3  "
                style={{ backgroundColor: "transparent" }}
              >
                <a href={company.to} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={company.projectImage}
                    roundedCircle
                    fluid
                    alt={company.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                      marginBottom: "12px",
                    }}
                  />
                </a>
                <h5 className="text-danger">{company.name}</h5>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CompanyProjects;
  
