import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import "./Login.css"
import { useNavigate, useLocation } from 'react-router-dom';

import axios from '../../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <div>
            <form onSubmit={handleSubmit} className="loginForm">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h3>Login Here</h3>

                <label className="loginLabel" htmlFor="usernamelog">Username</label>
                <input 
                    name="logimmn"
                    className="loginInput"
                    type="text"
                    ref={userRef}
                    placeholder="Email"
                    id="usernamelog"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    />
                
                <label className="loginLabel" htmlFor="passwordlog">Password</label>
                <input 
                    name="password" 
                    className="loginInput" 
                    type="password" 
                    autoComplete='off' 
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    id="passwordlog"/>
                
                <button className= "LogButton">Log In</button>
        </form>
            
        </div>

    )
}

export default Login
