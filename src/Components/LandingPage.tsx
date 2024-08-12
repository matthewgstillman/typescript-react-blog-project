import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../Styles/App.scss';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

const LandingPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerErrors, setRegisterErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateRegister = () => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!registerData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    if (!registerData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(registerData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }
    if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setRegisterErrors(errors);
    return isValid;
  };

  const validateLogin = () => {
    const errors = {
      email: '',
      password: ''
    };
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(loginData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;

    try {
      const response = await axios.post('http://localhost:3001/api/users/register', registerData);
      setUsers([...users, response.data]);
      setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error registering user: ', error);
    }
};

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const response = await axios.post('http://localhost:3001/api/login', loginData);
      console.log('Login successful:', response.data);
      setLoginData({ email: '', password: '' });
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  return (
    <div className="mainContainer">
      <h1 className='mainHeader'>TypeScript Blog Project</h1>

      <h2 className="registrationHeader">Register</h2>
      <Form className="formRegistration" onSubmit={handleRegisterSubmit}>
        <Form.Group className="formFirstName" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={registerData.firstName}
            onChange={handleRegisterChange}
            required
          />
          {registerErrors.firstName && <div className="errorMessage">{registerErrors.firstName}</div>}
        </Form.Group>
        <Form.Group className="formLastName" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={registerData.lastName}
            onChange={handleRegisterChange}
            required
          />
          {registerErrors.lastName && <div className="errorMessage">{registerErrors.lastName}</div>}
        </Form.Group>
        <Form.Group className="formEmail" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleRegisterChange}
            required
          />
          {registerErrors.email && <div className="errorMessage">{registerErrors.email}</div>}
        </Form.Group>
        <Form.Group className="formPassword" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
            autoComplete="current-password"
          />
          {registerErrors.password && <div className="errorMessage">{registerErrors.password}</div>}
        </Form.Group>
        <Form.Group className="formConfirmPassword" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            required
          />
          {registerErrors.confirmPassword && <div className="errorMessage">{registerErrors.confirmPassword}</div>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

      <h2 className="loginHeader">Login</h2>
      <Form className="formLogin" onSubmit={handleLoginSubmit}>
        <Form.Group className="formLoginEmail" controlId="formLoginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          {loginErrors.email && <div className="errorMessage">{loginErrors.email}</div>}
        </Form.Group>
        <Form.Group className="formLoginPassword" controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          {loginErrors.password && <div className="errorMessage">{loginErrors.password}</div>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LandingPage;
