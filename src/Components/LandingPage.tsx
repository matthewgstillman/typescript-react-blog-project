import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/App.css';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
}

const LandingPage = () => {
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
        try {
            const response = await axios.post('http://localhost:3001/register', registerData);
            setUsers([...users, response.data]);
            setRegisterData({ firstName: '', lastName: '', email: '', password: '' });
        } catch (error) {
            console.error('Error registering user: ', error);
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
        <div className="usersMainContainer">
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.firstName} {user.lastName}</li>
                ))}
            </ul>

            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="loginEmail">Email:</label>
                    <input
                        type="email"
                        id="loginEmail"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="loginPassword">Password:</label>
                    <input
                        type="password"
                        id="loginPassword"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LandingPage;
