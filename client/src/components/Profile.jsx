import { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import axios from 'axios';
import './Profile.css'; 

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [userId , setUserId] = useState(localStorage.getItem('user.id'));

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/profile/${userId}`); 
            const data = response.data;
            setUserData(data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <h1>Profile</h1>
           
        </div>
    );
}
