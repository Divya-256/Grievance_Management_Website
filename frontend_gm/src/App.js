import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import Signup from './Components/SignupPage/Signup';
import LoginPage from './Components/LoginPage/LoginPage';
import HomePage from './Components/HomePage/HomePage';
import AssigneeDashboard from './Components/AssigneeDashboard/AssigneeDashboard'
import SuperVDashboard from './Components/SupervisorDashboard/SuperVDashboard';
// import TempAssignee from './Components/Temp/TempAssignee';
import GrievDetails from './Components/GrievDetails/GrievDetails';
import DetailsSuperVisor from './Components/GrievDetails/DetailsSuperVisor';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
           <Route path='/' element={<HomePage/>}/>
           <Route path='/login' element={<LoginPage/>}/>
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/userDashboard' element={<UserDashboard/>}/>
           <Route path='/assigneeDashboard' element={<AssigneeDashboard/>}/>
           <Route path='/supervDashboard' element={<SuperVDashboard/>}/>
            {/* <Route path='/temp' element={<TempAssignee/>}/> */}
            <Route path='/grievance-list/:id' element={<GrievDetails />} />
            <Route path='/grievances/:id' element={<DetailsSuperVisor />} />
      </Routes>
     
    </div>
    </Router>
  );
}

export default App;
