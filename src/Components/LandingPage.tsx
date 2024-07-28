import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
}

const LandingPage = () => {
    const [users, setUsers] = useState<User[]>([]);

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
    
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.firstName} {user.lastName}</li>
                ))}
            </ul>
        </div>
    );
}

export default LandingPage;
