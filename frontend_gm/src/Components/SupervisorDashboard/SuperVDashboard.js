import './SuperVDashboard.css';
import { useEffect, useState ,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Config/config';
import { UserContext } from '../UserContext/userContext';

function SuperVDashboard() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [grievances, setGrievances] = useState([]);
  const [assigneeUpdate, setAssigneeUpdate] = useState({});

  useEffect(() => {
    if(!(user.user==='SUPERVISOR')) navigate('/login');
  
    const fetchGrievances = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/grievances`, { withCredentials: true });
            console.log(res.data);

            const sortedGrievances = res.data.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
            setGrievances(sortedGrievances);
        } catch (error) {
            alert('Failed to fetch grievances!');
        }
    };

    fetchGrievances();
}, []);

  // const handleAssigneeChange = (grievanceId, newAssignee) => {
  //   setAssigneeUpdate({ assignee: newAssignee });
  //   console.log(assigneeUpdate);
  // };

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
                            <div className="row-superv">{grievance.name}</div>
                            <div className="row-superv">{grievance.category}</div>
                            <div className='row-superv'>
                                {/* <select
                                  className='assignee-select'
                                  onChange={(e) => handleAssigneeChange(grievance.id, e.target.value)}>
                                    <option value="assignee1">Assignee 1</option>
                                    <option value="assignee2">Assignee 2</option>
                                    <option value="assignee3">Assignee 3</option>
                                </select> */}
                                {grievance.assignee?grievance.assignee:'Not Assigned'}
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