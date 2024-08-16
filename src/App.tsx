import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Blogs from './Components/Blogs';
import CreateBlogPost from './Components/CreateABlog';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [userId, setUserId] = useState('exampleUserId');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route 
            path="/createablog" 
            element={<CreateBlogPost userId={userId} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
