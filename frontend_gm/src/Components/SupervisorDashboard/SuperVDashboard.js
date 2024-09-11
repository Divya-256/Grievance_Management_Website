import './SuperVDashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SuperVDashboard() {

  const navigate = useNavigate();

  const [grievances, setGrievances] = useState([]);
  const [assigneeUpdate, setAssigneeUpdate] = useState({});

  useEffect(() => {
    const grievances = [
      {
        id: 1,
        user: { name: 'John Doe', email: 'john@example.com', address: '123 Main St' },
        description: 'Issue with the billing process',
        status: 'PENDING',
        category: 'repair',
        assignee: 'md',
      },
      {
        id: 2,
        user: { name: 'Jane Smith', email: 'jane@example.com', address: '456 Oak St' },
        description: 'Technical issue with the login system',
        status: 'IN_PROGRESS',
        category: 'replacement',
        assignee: 'worker',
      },
      {
        id: 3,
        user: { name: 'Bob Johnson', email: 'bob@example.com', address: '789 Pine St' },
        description: 'Unable to update profile information',
        status: 'PENDING',
        category: 'not arrived',
        assignee: 'manager',
      }
    ];

    const sortedGrievances = grievances.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
    setGrievances(sortedGrievances);
  }, []);

  const handleAssigneeChange = (grievanceId, newAssignee) => {
    setAssigneeUpdate({ assignee: newAssignee });
    console.log(assigneeUpdate);
  };

  const handleRowSelect = (grievance) => {
    navigate(`/grievances/${grievance.id}`, { state: { grievance } });
  };

  return (
    <div className='griev'>
        <div>
            <h1>Grievance Management Website</h1>
            <h2>SuperVisor Dashboard</h2>
            <h2>Grievances</h2>
        </div>
        
        <div className="table-bg">
            <div className="table-heads">
                <div>Grievance id</div>
                <div>Name</div>
                <div>Category</div>
                <div>Assignee</div>
                <div>Status</div>
            </div>
        </div>

        {grievances.length === 0 ? (
            <tr>
              <td colSpan="6">No grievances yet.</td>
            </tr>
          ) : ( grievances.map((grievance) => (

                    <div className='rows' onClick={() => handleRowSelect(grievance)}>
                        <div className="table-row">
                            <div className="row-superv">{grievance.id}</div>
                            <div className="row-superv">{grievance.user.name}</div>
                            <div className="row-superv">{grievance.category}</div>
                            <div className='row-superv'>
                                {/* <select
                                  className='assignee-select'
                                  onChange={(e) => handleAssigneeChange(grievance.id, e.target.value)}>
                                    <option value="assignee1">Assignee 1</option>
                                    <option value="assignee2">Assignee 2</option>
                                    <option value="assignee3">Assignee 3</option>
                                </select> */}
                                {grievance.assignee}
                            </div>
                            <div className='row-superv'>{grievance.status}</div>
                        </div>

                    </div>)
                )
              )
        }
    </div>
  )
}

export default SuperVDashboard