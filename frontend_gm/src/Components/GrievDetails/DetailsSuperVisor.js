import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GrievDetails.css';
import axios from 'axios';
import { BASE_URL } from '../../Config/config'; 

export default function DetailsSuperVisor() {
  const location = useLocation();
  const navigate = useNavigate();
  const grievance = location.state.grievance;
  const [successMessage, setSuccessMessage] = useState(null);
  const [assigneeUpdate, setAssigneeUpdate] = useState(null);

  const handleSubmit = async() => {
    try {
      const res = await axios.put(`${BASE_URL}/grievances/${grievance.id}`,{assignee:assigneeUpdate},{withCredentials:true});
      console.log(res.data);
      if (res.status === 200) {
        const updatedGrievance = { ...grievance, assignee: assigneeUpdate };
        setSuccessMessage(`Assignee assigned for Grievance ${grievance.id}!!`);
        setTimeout(() => {
          navigate('/supervDashboard', { state: { updatedGrievance } }); 
        }, 1000);
      }

    } catch (error) {
      console.log(error);
      alert('Failed to update assignee!');
    }
  };

  return (
    <div className="detailsContainer">
      <h1>Grievance Details</h1>
      {successMessage ? (<p className="successMessage">{successMessage}</p>) :
        (grievance && (
          <div className="outerForm">
            <p className='details'><strong>User:</strong> {grievance.name}</p>
            <p className='details'><strong>Email:</strong> {grievance.email}</p>
            <p className='details'><strong>Address:</strong> {grievance.address}</p>
            <p className='details'><strong>Complaint:</strong> {grievance.complaint}</p>
            <p className='details'><strong>Current Status:</strong> {grievance.status}</p>

            <div className="updateStatus">
              <label htmlFor={`status-${grievance.id}`}>Assignee:</label>
              <select id={`status-${grievance.id}`} value={assigneeUpdate} onChange={(e) => setAssigneeUpdate(e.target.value)} className='update-select'>
                <option value="">Select</option>
                <option value="Technicians">Technicians</option>
                <option value="Software_Engineers">Software Engineers</option>
                <option value="Performance_Analysts">Performance Analysts</option>
                <option value="Network_Administrators">Network Administrators</option>
              </select>
            </div>
            <button className="submitBtn" onClick={handleSubmit}>Submit</button>
          </div>
        ))
      }
    </div>
  );
}
