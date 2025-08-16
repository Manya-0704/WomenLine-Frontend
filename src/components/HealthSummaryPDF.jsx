import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const HealthSummaryPDF = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    date: '',
    symptoms: '',
    menstrualHistory: '',
    medications: '',
    doctorNotes: '',
  });

  const summaryRef = useRef();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDownloadPDF = async () => {
    try {
      const element = summaryRef.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('health-summary.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="health-summary-container">
      <div className="health-summary-header">
        <h2>Gynecologist Visit - Health Summary Generator</h2>
        <p>Create a comprehensive health summary for your gynecologist visit</p>
      </div>

      <div className="health-summary-form">
        <div className="form-group">
          <label htmlFor="name">Patient Name:</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            placeholder="Enter patient name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input 
            type="number" 
            id="age"
            name="age" 
            value={formData.age} 
            onChange={handleChange}
            placeholder="Enter age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Visit Date:</label>
          <input 
            type="date" 
            id="date"
            name="date" 
            value={formData.date} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea 
            id="symptoms"
            name="symptoms" 
            value={formData.symptoms} 
            onChange={handleChange}
            placeholder="Describe your symptoms..."
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="menstrualHistory">Menstrual History:</label>
          <textarea 
            id="menstrualHistory"
            name="menstrualHistory" 
            value={formData.menstrualHistory} 
            onChange={handleChange}
            placeholder="Describe your menstrual history..."
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="medications">Medications Prescribed:</label>
          <textarea 
            id="medications"
            name="medications" 
            value={formData.medications} 
            onChange={handleChange}
            placeholder="List medications prescribed..."
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="doctorNotes">Doctor's Notes:</label>
          <textarea 
            id="doctorNotes"
            name="doctorNotes" 
            value={formData.doctorNotes} 
            onChange={handleChange}
            placeholder="Enter doctor's notes..."
            rows="4"
          ></textarea>
        </div>
      </div>

      {/* Preview Section */}
      <div className="health-summary-preview">
        <h3>Health Summary Report</h3>
        <div ref={summaryRef} className="preview-content">
          <div className="preview-header">
            <h4>Womenline Health Summary</h4>
            <p><strong>Generated on:</strong> {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="preview-section">
            <p><strong>Patient Name:</strong> {formData.name || 'Not specified'}</p>
            <p><strong>Age:</strong> {formData.age || 'Not specified'}</p>
            <p><strong>Visit Date:</strong> {formData.date || 'Not specified'}</p>
          </div>

          <div className="preview-section">
            <h5>Symptoms</h5>
            <p>{formData.symptoms || 'No symptoms recorded'}</p>
          </div>

          <div className="preview-section">
            <h5>Menstrual History</h5>
            <p>{formData.menstrualHistory || 'No menstrual history recorded'}</p>
          </div>

          <div className="preview-section">
            <h5>Medications</h5>
            <p>{formData.medications || 'No medications recorded'}</p>
          </div>

          <div className="preview-section">
            <h5>Doctor's Notes</h5>
            <p>{formData.doctorNotes || 'No doctor notes recorded'}</p>
          </div>
        </div>
      </div>

      <div className="health-summary-actions">
        <button 
          onClick={handleDownloadPDF} 
          className="download-pdf-btn"
          disabled={!formData.name || !formData.date}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default HealthSummaryPDF; 