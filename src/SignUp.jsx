import React from 'react'
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;




const SignUp = ({newUser,setNewUser,newPwd,setNewPwd,newEmail,setNewEmail}) => {
    const userRef =useRef();
    const errRef =useRef();
    const inputRef = useRef();
    const navigate = useNavigate();


    const [user, setUser]=useState('');
    const [validName,setValidName]=useState(false);
    const [userFocus,setUserFocus] =useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [error , setError] = useState("")

    const [errMsg, setErrMsg] = useState('');
     const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(newUser));
    }, [newUser])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(newPwd));
        setValidMatch(newPwd === matchPwd);
    }, [newPwd, matchPwd])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(newEmail));
    }, [newEmail])

    useEffect(() => {
        setErrMsg('');
    }, [setUser, setPwd, matchPwd,setEmail])

    // const signup = async (e) => {
    //     e.preventDefault();
    //     setSuccess(true);}
    const handleSubmit = (e) => {
        e.preventDefault();
        let NUser=newUser;
        let NPwd=newPwd;
        let NEmail=newEmail;
    
        addItem(NUser,NPwd,NEmail);
        clearScreen();
      }
      const clearScreen=()=>{
        setNewUser('');
        setNewPwd('');
        setNewEmail('');
      }
      const addItem = async (username,password,email) => {
        
          const dataToSend={username,password,email};
          let response ;
          try {
              response = await fetch('http://localhost:3001/signUp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSend),
            });
            const result = await response.json();
            console.log(result.mesage);
            if(result.mesage==="success"){
                let id=result._id;
                // navigate(`/${result._id}`);
                setSuccess(true);
            }else{
                alert("user exists")
            }
            console.log('Data sent to backend:', result);
          } 
          catch (error) {
            //error set
            console.log('Error sending data to backend:');
            console.log(error)
            // setError(response)
            setSuccess(false); 
          }
        }   

  return (
    <section className='Box'>
            {success ? (
                <section className='MainBox'>
                    <h1>Success </h1>
                    <p>
                        <Link to="/Login">Login</Link>
                    </p>
                </section>
            ) : (
                <section className='MainBox'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className='SUP'>SignUp</h1>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="username" >
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            placeholder='Enter UserName'
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setNewUser(e.target.value)}
                            value={newUser}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && newUser && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password" >
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            placeholder='Enter Password'
                            type="password"
                            id="password"
                            ref={userRef}
                            onChange={(e) => setNewPwd(e.target.value)}
                            value={newPwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd" >
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            placeholder='ReEnter Password'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor="email" >
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setNewEmail(e.target.value)}
                            value={newEmail}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must include @ .<br />
                            Letters, numbers, backslash allowed.
                        </p>

                        <button type='submit' disabled={!validName || !validPwd || !validMatch ||!validEmail ? true : false} >Sign Up</button>
                    </form>
                    <div>
                        Already registered? &nbsp;&nbsp;&nbsp;
                        <span className="login">
                        <Link to="/Login" onClick={clearScreen}><h3 className='Log'>Login</h3></Link> 
                        </span>
                        
                    </div>
                </section>
            
        )}
        </section>
  )
}

export default SignUp