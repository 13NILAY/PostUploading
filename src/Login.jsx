import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import SignUp from './SignUp.jsx';
import { useNavigate } from 'react-router-dom';

const Login = ({newUser,setNewUser,newPwd,setNewPwd}) => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [_id, setId] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    // const handleSubmit = async (e) => {
    //     e.preventDefault();}
    const handleSubmit1 = (e) => {
        e.preventDefault();
        let NUser=newUser;
        let NPwd=newPwd;
        addItem1(NUser,NPwd);
        clearScreen();
        ///navigate()
      }
      const clearScreen=()=>{
        setNewUser('');
        setNewPwd('');
      }
      const Profile=()=>{
        navigate(`/${_id}`);
      }
      const addItem1 = async (username,password) => {
    
          const dataToSend1={username,password};
          
          try {
            const response = await fetch('http://localhost:3001/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSend1),
            }
           );
           console.log(response);
           if(response.status===200){
               const result = await response.json();
               console.log(result);
               console.log(result._id);
               setSuccess(true);
               setId(result._id);
           }else{
            alert("Wrong Credentials");
           }
           
          } 
          catch (error) {
            // console.log('Error sending data to backend:')
            console.log(error);
            console.log()
            setSuccess(false);
          }
          
          //<Link to="http://localhost:3000/"></Link> 
        }

    return (
        <section className='Box'>
           {success ? (
                <section className='MainBox'>
                    <h1>You are succesfully logged in!</h1>
                    <br />
                    <button onClick={Profile} className='Profile'>Click To View Your profile</button>
                </section>
            ) : (
                <section className='MainBox'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <b><h1 className='Login123'>Login</h1></b>
                    <form onSubmit={handleSubmit1}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setNewUser(e.target.value)}
                            value={newUser}
                            placeholder='Enter Username'
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setNewPwd(e.target.value)}
                            value={newPwd}
                            placeholder='Enter Password'
                            required
                        />
                        <button type='submit' className='SignIn'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line" onClick={clearScreen}>
                        <Link to="/signUp" ><h3 className='sup' >SignUp</h3></Link>       
                        </span>
                    </p>
                </section>
            )}
        </section>
    )
}

export default Login
  