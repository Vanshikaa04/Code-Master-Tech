import React, { useRef } from "react";
import certi from "../assets/images/CMT Certificate .png"; // your updated certificate image
import "./css/Certif.css";
import { Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const Certificate = () => {
    const { state } = useLocation();
  const { name, seminar } = state || {};

  const certRef = useRef(null);

  // Download certificate as PDF
  const downloadCertificate = () => {
    const input = certRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
     // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // Open in new tab instead of forcing download
      window.open(pdf.output("bloburl"));
    } else {
      pdf.save("E-Certificate.pdf");
    }
    });
  };

  return (
    <div className="container text-center my-4">
      {/* Certificate Preview */}
      <div className="certificate-wrapper mx-auto" ref={certRef}>
        <img src={certi} alt="Certificate" className="certificate-bg" />

        {/* Overlay Content */}
        <div className="certificate-content">
          <h2 className="participant-name underline">{name}</h2>
          <p className="seminar-name">{seminar}</p>
        </div>
      </div>

      {/* Download Button */}
      <Button  className="mt-4 text-white" onClick={downloadCertificate}  style={{backgroundColor:"var(--bgcolor)"}}>
        Download E-Certificate
      </Button>
    </div>
  );
};

export default Certificate;
