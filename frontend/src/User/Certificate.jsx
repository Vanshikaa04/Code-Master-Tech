import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import certi from "../assets/images/CMT Certificate .png";

const Certificate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Redirect if no state found
  useEffect(() => {
    if (!state) {
      navigate("/"); // redirect to homepage
    }
  }, [state, navigate]);

  // destructure with fallback values
  const { name = "Participant", seminar = "Seminar" } = state || {};

  const downloadCertificate = () => {
    const pdf = new jsPDF("l", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Add certificate background
    pdf.addImage(certi, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Add participant name
    pdf.setFont("Times", "bold");
    pdf.setFontSize(28);
    pdf.setTextColor(169, 0, 0); // dark red
    pdf.text(name.toUpperCase(), pdfWidth / 2, pdfHeight / 2, {
      align: "center",
    });

    // Add seminar name
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text(seminar, pdfWidth / 2, pdfHeight / 2 + 30, { align: "center" });

    // Save certificate
    pdf.save("certificate.pdf");
  };

  return (
    <div className="container text-center my-4">
      <h3 className="mb-3">Download Your Certificate</h3>
      <Button
        className="mt-4 text-white"
        onClick={downloadCertificate}
        style={{ backgroundColor: "var(--bgcolor)" }}
      >
        Download E-Certificate
      </Button>
    </div>
  );
};

export default Certificate;
