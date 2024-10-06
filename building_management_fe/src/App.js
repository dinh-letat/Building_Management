import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './pages/admin/Admin.jsx';
import Signin from './pages/Form/Signin.jsx';
import Signup from './pages/Form/Signup.jsx';

function App() {
  return (
    <div className="App" >
      <Admin/>
      {/* <Signin/> */}
    </div>
  );
}

export default App;
