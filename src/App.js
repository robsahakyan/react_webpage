import Register from './components/RegisterPart.js/Register';
import Login from './components/LoginPart/Login';
import Home from './components/Home';
import { HeaderPart } from './components/HeaderPart/HeaderPart';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import "./App.css"

const ROLES = {
  'User': 2001
}

function App() {

  return (
    <div className="rootParts">
      <div className="rootHeader">
        <HeaderPart/>         
      </div>
      <div className="rootSections">
        <Routes>
          <Route
            path="/login"  
            element = {<Login/>}
            >
          </Route>
          <Route
            path="/register"  
            element = {<Register/>}
            >
          </Route>
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<Missing />} />
        </Routes>
      </div>
    </div>
  
  );
}

export default App;