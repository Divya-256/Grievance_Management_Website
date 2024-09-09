import './SuperVDashboard.css';
import { useEffect, useState } from 'react';

function SuperVDashboard() {

  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    const grievances = [
      {
        id: 1,
        user: { name: 'John Doe', email: 'john@example.com', address: '123 Main St' },
        description: 'Issue with the billing process',
        status: 'PENDING',
        category: 'repair',
        assignedDate: '2023-09-01',
      },
      {
        id: 2,
        user: { name: 'Jane Smith', email: 'jane@example.com', address: '456 Oak St' },
        description: 'Technical issue with the login system',
        status: 'IN_PROGRESS',
        category: 'replacement',
        assignedDate: '2023-09-02',
      },
      {
        id: 3,
        user: { name: 'Bob Johnson', email: 'bob@example.com', address: '789 Pine St' },
        description: 'Unable to update profile information',
        status: 'PENDING',
        category: 'not arrived',
        assignedDate: '2023-09-03',
      }
    ];

    const sortedGrievances = grievances.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
    setGrievances(sortedGrievances);
  }, []);

  return (
    <div className='grievForm'>
        <div>
            <h1>Grievance Management Website</h1>
            <h2>SuperVisor Dashboard</h2>
            <h2>Grievances</h2>
        </div>
        <div className="table-bg">
            <div className="table-heads">
                <div>Grievance id</div>
                <div className="">Name</div>
                <div>Category</div>
                <div>Assignee</div>
                <div>Status</div>
            </div>
        </div>

        {grievances.length === 0 ? (
            <tr>
              <td colSpan="6">No grievances assigned yet.</td>
            </tr>
          ) : ( grievances.map((grievance) => (

                    <div className='rows'>
                        <div className="table-row">
                            <div>{grievance.id}</div>
                            <div className="name">{grievance.user.name}</div>
                            <div>{grievance.category}</div>
                            <div>Assignee</div>
                            <div>{grievance.status}</div>
                        </div>

                    </div>)
                )
              )
        }
    </div>
  )
}

export default SuperVDashboard