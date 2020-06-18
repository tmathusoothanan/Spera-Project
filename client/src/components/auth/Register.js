import React, {useState, useContext} from 'react';
import Axios from 'axios';
import UserContext from '../Context/userContext';
import { useHistory } from 'react-router-dom';

export default function Register() {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {firstName,lastName,email,phone,address,password,passwordCheck};
        await Axios.post('http://localhost:5000/users/register', newUser);
        const loginRes = await Axios.post('http://localhost:5000/users/login', {email,password});

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });

        localStorage.setItem('auth-token', loginRes.data.token);
        history.push('/');
    }

    return (
    <div className='post-card '>
        <h1 className='LRLabel'>Register</h1>
        <form onSubmit={submit}>
            <label>First Name</label>
            <input type='text' onChange={(e) => setFirstName(e.target.value)}/><br />

            <label>Last Name</label>
            <input type='text' onChange={(e) => setLastName(e.target.value)}/><br />

            <label>Email</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)}/><br />

            <label>Phone</label>
            <input type='text' onChange={(e) => setPhone(e.target.value)}/><br />

            <label>Address</label>
            <input type='text-area' onChange={(e) => setAddress(e.target.value)}/><br />

            <label>Password</label>
            <input type='password' placeholder='Should be at least 8 characters' onChange={(e) => setPassword(e.target.value)}/>
            <input type='password' placeholder='Verify password' onChange={(e) => setPasswordCheck(e.target.value)}/><br />

            <input type='submit' />
        </form>
    </div>
    );
}