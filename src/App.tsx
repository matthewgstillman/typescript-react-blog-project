import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Blogs from './Components/Blogs';
import CreateABlog from './Components/CreateABlog';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Blogs />} />
          {/* <Route path="/createablog" element={<CreateABlog />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
