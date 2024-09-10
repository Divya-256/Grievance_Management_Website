import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TempAssignee.css'; 
import { useLocation } from 'react-router-dom';
export default function TempAssignee() {
  const [grievances, setGrievances] = useState([]);
  const navigate = useNavigate();
   const location=useLocation();
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
      },
    ];

    const sortedGrievances = mockGrievances.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
    setGrievances(sortedGrievances);
  }, []);

  const handleRowSelect = (grievance) => {
    navigate(`/grievance-list/${grievance.id}`, { state: { grievance } });
  };
  useEffect(() => {
    if (location.state && location.state.updatedGrievance) {
        const updatedGrievance = location.state.updatedGrievance;
        setGrievances((prevGrievances) =>
            prevGrievances.map((g) => (g.id === updatedGrievance.id ? updatedGrievance : g))
        );
    }
}, [location.state]);

  return (
    <div className="mainBody">
      <h1>Assignee List Dashboard</h1>
      <table className="grievTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>User Name</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Assigned Date</th>
          </tr>
        </thead>
        <tbody>
          {grievances.length === 0 ? (
            <tr>
              <td colSpan="6">No grievances</td>
            </tr>
          ) : (
            grievances.map((grievance) => (
              <tr key={grievance.id} onClick={() => handleRowSelect(grievance)}>
                <td>{grievance.id}</td>
                <td>{grievance.user.name}</td>
                <td>{grievance.description}</td>
                <td>{grievance.status}</td>
                <td>{grievance.feedback || 'No feedback'}</td>
                <td>{new Date(grievance.assignedDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
