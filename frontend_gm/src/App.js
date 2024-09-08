import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import Signup from './Components/SignupPage/Signup';
import LoginPage from './Components/LoginPage/LoginPage';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
           <Route path='/' element={<HomePage/>}/>
           <Route path='/login' element={<LoginPage/>}/>
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/userDashboard' element={<UserDashboard/>}/>
      </Routes>
     
    </div>
    </Router>
  );
}

export default App;
