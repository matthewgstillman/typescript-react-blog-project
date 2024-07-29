import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Blogs from './Components/Blogs';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/landing">Landing Page</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/blogs" element={<Blogs />}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return <h2>Home Page</h2>;
}

export default App;
