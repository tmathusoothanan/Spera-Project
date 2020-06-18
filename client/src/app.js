import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/Layout/Header';
import UserContext from './components/Context/userContext';

import './style.css';

export default function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect (() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');

            if(token === null){
                localStorage.setItem('auth-token', '');
                token = '';
            }

            const tokenRes = await Axios.post('http://localhost:5000/users/tokenIsValied', null, {headers: {'x-auth-token': token}});
            
            if(tokenRes.data){
                const userRes = await Axios.get('http://localhost:5000/users/', {headers: {'x-auth-token': token}});
            console.log(userRes.data);
                setUserData({
                    token,
                    user: userRes.data
                });
            }
            
        }

        checkLoggedIn();
    },[]);

    return <>
        <BrowserRouter>
        <UserContext.Provider value={{userData,setUserData}}>
            <Header />
            <switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </switch>
        </UserContext.Provider>
        </BrowserRouter>
    
    </>
}