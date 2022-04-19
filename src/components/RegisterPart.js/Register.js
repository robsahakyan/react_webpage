import { useRef, useState, useEffect } from "react";
import axios from '../../api/axios';
import "./Register.css"

const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');

    const [pwd, setPwd] = useState('');

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                        <div>
                            <form  onSubmit={handleSubmit} className='registerForm'>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                                <h3>Sign Up</h3>
                                
                                <label className="loginLabel" htmlFor="username">Username</label>
                                <input 
                                    className="loginInput" 
                                    type="text" 
                                    placeholder="Email" 
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    id="username"/>
                                
                                <label className="loginLabel" htmlFor="password">Password</label>
                                <input 
                                    className="loginInput" 
                                    type="password" 
                                    placeholder="Password" 
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    id="password"/>

                                <label className="loginLabel" htmlFor="retpassword">Retype password</label>
                                <input 
                                    className="loginInput" 
                                    type="password" 
                                    placeholder="Password" 
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    id="retpassword"/>
                                
                                <button className="LogButton">Sign me up</button>
                            </form>
                        </div>
            )}
        </>
    )
}

export default Register
