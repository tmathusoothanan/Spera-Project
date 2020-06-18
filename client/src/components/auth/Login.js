import React, {useState, useContext} from 'react';
import Axios from 'axios';
import UserContext from '../Context/userContext';
import { useHistory } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const loginUser = {email,password};
        const loginRes = await Axios.post('http://localhost:5000/users/login', loginUser);

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });

        localStorage.setItem('auth-token', loginRes.data.token);
        history.push('/');
    }

    return (
        <div className='post-card'>
            <h1 className='LRLabel'>Log In</h1>
            <form onSubmit={submit}>
                
                <label>Email</label>
                <input type='email' onChange={(e) => setEmail(e.target.value)}/><br /><br />
    
                <label>Password</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)}/><br /><br />
                
                <input type='submit' />
            </form>
        </div>
        );
    }