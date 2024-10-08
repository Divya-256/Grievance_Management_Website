import React, { useState, useEffect, useContext } from 'react';
import './AssigneeDashboard.css';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Config/config';
import { UserContext } from '../UserContext/userContext';

export default function AssigneeDashboard() {

  const [grievances, setGrievances] = useState([]);
  const navigate = useNavigate();
  const location=useLocation();
  const {user} = useContext(UserContext);

   useEffect(() => {

    if(!user) navigate('/login');
  
    const fetchGrievances = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/grievances/assignee/md`, { withCredentials: true });
            console.log(res.data);

            const sortedGrievances = res.data.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
            setGrievances(sortedGrievances);
        } catch (error) {
            alert('Failed to fetch grievances!');
        }
    };

    // Call the async function
    fetchGrievances();
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
    <div className="griev">
      <h1>Grievance Management Website</h1>
      <h2>Assignee Dashboard</h2>
      <h2>Assignments</h2>
      
      {/* <table className="grievances-table">
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
      </table> */}
      <div className="table-bg">
            <div className="table-heads">
                <div>Grievance id</div>
                <div>Name</div>
                <div>Category</div>
                <div>Assigned Date</div>               
                <div>Status</div>
                <div className='table-feedback'>Feedback</div>
            </div>
      </div>

      {grievances.length === 0 ? (
            <tr>
              <td colSpan="6">No grievances yet.</td>
            </tr>
          ) : ( grievances.map((grievance) => (

                    <div className='rows' onClick={() => handleRowSelect(grievance)}>
                        <div className="table-row">
                            <div className="row-assignee">{grievance.id}</div>
                            <div className="row-assignee">{grievance.name}</div>
                            <div className="row-assignee">{grievance.category}</div>
                            <div className='row-assignee'>{new Date(grievance.assignedDate).toLocaleDateString()}</div>
                            <div className='row-assignee'>{grievance.status}</div>
                            <div className='row-feedback'>{grievance.feedback || 'No Feedback'}</div>
                        </div>

                    </div>)
                )
              )
        }

      {/* {selectedGrievance && (
        <div className="outerForm">
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
      {errorMessage && <p className="error-message">{errorMessage}</p>} */}
    </div>
  );
}
