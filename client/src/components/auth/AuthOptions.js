import React from 'react';
import {useHistory} from 'react-router-dom';

export default function AuthOptions() {
    const history = useHistory();

    const register = () => { history.push('/register'); }
    const login = () => { history.push('/login'); }

    return (
    <div>
        <button className='lrbutton' onClick = {register}>Register</button>
        <button className='lrbutton' onClick = {login}>Log in</button>
    </div>
    );
}