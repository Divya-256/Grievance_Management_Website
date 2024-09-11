import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GrievDetails.css'; 

export default function GrievDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const grievance = location.state.grievance;
  const [successMessage, setSuccessMessage] = useState(null);
  const [feedback, setFeedback] = useState(grievance.feedback || '');
  const [statusUpdate, setStatusUpdate] = useState(grievance.status);

  const handleSubmit = () => {
    const updatedGrievance = { ...grievance, status: statusUpdate, feedback };

    setSuccessMessage(`Grievance ${grievance.id} updated successfully!!`);
    setTimeout(() => {
      navigate('/assigneeDashboard', { state: { updatedGrievance } }); 
    }, 1000);
  };

  return (
    <div className="detailsContainer">
      <h1>Grievance Details</h1>
      {successMessage ? (<p className="successMessage">{successMessage}</p>) :
        (grievance && (
          <div className="outerForm">
            <p className='details'><strong>User:</strong> {grievance.user.name}</p>
            <p className='details'><strong>Email:</strong> {grievance.user.email}</p>
            <p className='details'><strong>Address:</strong> {grievance.user.address}</p>
            <p className='details'><strong>Complaint:</strong> {grievance.description}</p>
            <p className='details'><strong>Current Status:</strong> {grievance.status}</p>

            <div className="updateStatus">
              <label htmlFor={`status-${grievance.id}`}>Update Status:</label>
              <select id={`status-${grievance.id}`} value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)} className='update-select'>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
            <div className="feedbackSection">
              <label htmlFor={`feedback-${grievance.id}`}>Feedback:</label>
              <textarea
                id={`feedback-${grievance.id}`}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide feedback to the user"
              />
            </div>
            <button className="submitBtn" onClick={handleSubmit}>Submit</button>
          </div>
        ))
      }
    </div>
  );
}
