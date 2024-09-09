import React, { useState, useEffect } from 'react';
import './AssigneeDashboard.css';

export default function AssigneeDashboard() {
  const [grievances, setGrievances] = useState([]);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [statusUpdate, setStatusUpdate] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const mockGrievances = [
      {
        id: 1,
        user: { name: 'John Doe', email: 'john@example.com', address: '123 Main St' },
        description: 'Issue with the billing process',
        status: 'PENDING',
        feedback: '',
        assignedDate: '2023-09-01',
      },
      {
        id: 2,
        user: { name: 'Jane Smith', email: 'jane@example.com', address: '456 Oak St' },
        description: 'Technical issue with the login system',
        status: 'IN_PROGRESS',
        feedback: '',
        assignedDate: '2023-09-02',
      },
      {
        id: 3,
        user: { name: 'Bob Johnson', email: 'bob@example.com', address: '789 Pine St' },
        description: 'Unable to update profile information',
        status: 'PENDING',
        feedback: '',
        assignedDate: '2023-09-03',
      }
    ];

    const sortedGrievances = mockGrievances.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
    setGrievances(sortedGrievances);
  }, []);

  const handleRowSelect = (grievance) => {
    setSelectedGrievance(grievance);
    setSuccessMessage(null); 
  };

  const handleStatusChange = (grievanceId, newStatus) => {
    setStatusUpdate({ ...statusUpdate, [grievanceId]: newStatus });
  };

  const handleFeedbackChange = (grievanceId, newFeedback) => {
    setFeedback({ ...feedback, [grievanceId]: newFeedback });
  };

  const handleSubmit = (grievanceId) => {
    
    const updatedGrievances = grievances.map(g => {
      if (g.id === grievanceId) {
        return { 
          ...g, 
          status: statusUpdate[grievanceId] || g.status,
          feedback: feedback[grievanceId] || g.feedback
        };
      }
      return g;
    });

    setGrievances(updatedGrievances);
    setSuccessMessage(`Grievance ${grievanceId} updated successfully!`);
    setSelectedGrievance(null); 
  };

  return (
    <div className="assignee-dashboard">
      <h1>Assigned Grievances</h1>
      
      <table className="grievances-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Assigned Date</th>
          </tr>
        </thead>
        <tbody>
          {grievances.length === 0 ? (
            <tr>
              <td colSpan="6">No grievances assigned yet.</td>
            </tr>
          ) : (
            grievances.map((grievance) => (
              <tr key={grievance.id} onClick={() => handleRowSelect(grievance)}>
                <td>{grievance.id}</td>
                <td>{grievance.user.name}</td>
                <td>{grievance.description}</td>
                <td>{grievance.status}</td>
                <td>{grievance.feedback || 'No Feedback'}</td>
                <td>{new Date(grievance.assignedDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedGrievance && (
        <div className="grievance-details">
          <h2>Grievance Details</h2>
          <p><strong>User:</strong> {selectedGrievance.user.name}</p>
          <p><strong>Email:</strong> {selectedGrievance.user.email}</p>
          <p><strong>Address:</strong> {selectedGrievance.user.address}</p>
          <p><strong>Complaint:</strong> {selectedGrievance.description}</p>
          <p><strong>Current Status:</strong> {selectedGrievance.status}</p>

          <div className="status-update">
            <label htmlFor={`status-${selectedGrievance.id}`}>Update Status:</label>
            <select
              id={`status-${selectedGrievance.id}`}
              value={statusUpdate[selectedGrievance.id] || selectedGrievance.status}
              onChange={(e) => handleStatusChange(selectedGrievance.id, e.target.value)}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          <div className="feedback-section">
            <label htmlFor={`feedback-${selectedGrievance.id}`}>Feedback:</label>
            <textarea
              id={`feedback-${selectedGrievance.id}`}
              value={feedback[selectedGrievance.id] || ''}
              onChange={(e) => handleFeedbackChange(selectedGrievance.id, e.target.value)}
              placeholder="Provide feedback to the user"
            />
          </div>

          <button className="submit-btn" onClick={() => handleSubmit(selectedGrievance.id)}>Submit</button>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
