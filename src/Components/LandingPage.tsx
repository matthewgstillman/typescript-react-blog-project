import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
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
        password: ''
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
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

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("In the register submit mode");
        try {
            alert("Looking good so far");
            const response = await axios.post('http://localhost:3001/register', registerData);
            setUsers([...users, response.data]);
            setRegisterData({ firstName: '', lastName: '', email: '', password: '' });
        } catch (error) {
            alert("Error registering user");
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Error registering user: ', error);
            }
        }
    };    

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', loginData);
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
                </Form.Group>
                <Form.Group className="formLastName"  controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        required
                    />
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
                </Form.Group>
                <Form.Group className="formPassword" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                    />
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
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default LandingPage;
