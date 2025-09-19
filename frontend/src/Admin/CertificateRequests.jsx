import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Button,
  Card,
  Form,
  Modal
} from "react-bootstrap";
import { Check, Trash } from "lucide-react";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";

const CertificateRequests = ({token}) => {
  const { backendurl } = useContext(MainContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingParticipant , setpendingParticipant] = useState([])
    const [requestToDelete, setRequestToDelete] = useState({
      id: null,
      name: "",
      type: "",
    });

    const getparticipants = async () => {
    try {
      const res = await axios.get(backendurl + "/api/certificate/allparticipants", {
        headers: { token },
      });
      if (res.data.success) {
        const participants = res.data.participants || [];
        const filtered =participants.filter((s) => s.status === "pending");
        setpendingParticipant(filtered);
      }
    } catch (e) {
      console.error("Error fetching participants:", e);
    }
  };

    const approveRequest = async (id) => {
  try {
    const res= await axios.post(backendurl + "/api/certificate/accept" ,{_id: id})
    
    if(res.data.success)
    {
        toast.success("Request Accepted");
        getparticipants();
    }

  } catch (error) {
    toast.error(error)
  }
  };

  const removeRequest = async (id) => {
    try {
    const res= await axios.post(backendurl + "/api/certificate/remove" ,{_id: id})
    
    if(res.data.success)
    {
        toast.success("Request Removed");
        getparticipants();
    }

  } catch (error) {
    toast.error(error)
  }
  };

  useEffect(()=>{
    getparticipants();
  })
  return (
      <>
         <Container fluid className="text-start mt-5 w-75">
           <h3 className="mb-5 text-center">Requests for Certificate</h3>
           
   
               {pendingParticipant && pendingParticipant.length > 0 ? (
                 pendingParticipant.map((participant, index) => (
                   <Row key={index} className="justify-content-center mb-3">
                     <Card
                       className="shadow-sm w-100"
                       style={{ maxWidth: "100%" }}
                     >
                       <Card.Body>
                         <Row className="align-items-center">
                           <Col xs={12} md={4 }>
                             <h5 className="text-danger">
                               {index + 1}. {participant.name}
                             </h5>
                             
                             <div>
                               <strong>Phone:</strong> {participant.phone}
                             </div>
                           </Col>
                           <Col xs={12} md={4}>
                             
                             <div>
                               <strong>City:</strong> {participant.city}
                             </div>
                           
                             <div>
                               <strong>Seminar:</strong> {participant.seminar}
                             </div>
                           </Col>
                      
                           <Col xs={6} md={1} className="text-start">
                             <Button
                               variant="success"
                               className="me-2"
                               onClick={() => approveRequest(participant._id)}
                             >
                               <Check size={18} />
                             </Button>
                           </Col>
                           <Col xs={6} md={1} className="text-start">
                             <Button
                               variant="danger"
                               onClick={() =>
                                 setRequestToDelete({
                                   id: participant._id,
                                   name: participant.name,
                             
                                 }) || setShowDeleteModal(true)
                               }
                             >
                               <Trash size={18} />
                             </Button>
                           </Col>
                         </Row>
                       </Card.Body>
                     </Card>
                   </Row>
                 ))
               ) : (
                 <h5 className="text-muted mt-5 text-center">
                   No Requests yet.
                 </h5>
               )}
      
     
         </Container>
   
        <Modal
     show={showDeleteModal}
     onHide={() => setShowDeleteModal(false)}
     centered
   >
     <Modal.Header closeButton>
       <Modal.Title>Confirm Deletion</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       Are you sure you want to delete{" "}
       <strong>{requestToDelete?.name}</strong>?
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
         Cancel
       </Button>
       <Button
         variant="danger"
         onClick={() => {
           removeRequest(requestToDelete.id);
           setShowDeleteModal(false);
           setRequestToDelete({ id: null, name: "" });
         }}
       >
         Delete
       </Button>
     </Modal.Footer>
   </Modal>
   
       </>
  )
}

export default CertificateRequests
