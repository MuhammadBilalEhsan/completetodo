import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import './style.css'



const SignUp = () => {
    const [loginData, setLoginData] = useState({
        email: '', password: ''
    })
    const [loader, setLoader] = useState(false)

    const history = useHistory()
    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let { email, password } = loginData
        if (!email ) {
            alert("Please Enter The Correct Email!")
        }
        else if (!password || password.length < 8) {
            alert("Password! contains at least 8 characters !")
        } else {
            setLoader(true)
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setLoader(false)
                    alert("User Sign Up successfully")
                    history.push('/todo')
                })
                .catch((error) => {
                    console.log(error)
                    alert("Invalid Credentials")
                    setLoader(false)
                });
        }
    }

    if (loader) return <div className="loader"></div>
    return (
        <>
            <div className="container">
                <div className="subContainer">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <fieldset>
                            <legend><h1>Sign Up</h1></legend>

                            <input
                                type="email"
                                maxLength="32"
                                name="email"
                                className="inp"
                                value={loginData.email}
                                placeholder="Enter Your Email"
                                onChange={(e) => handleChange(e)}
                                required
                                autoComplete="false"
                                autoFocus
                            />
                            <input
                                type="password"
                                maxLength="32"
                                name="password"
                                className="inp"
                                value={loginData.password}
                                placeholder="Enter Your Password"
                                onChange={(e) => handleChange(e)}
                                required
                                autoComplete="false"
                            />
                            <br />
                            <input
                                className="btn btn-submit"
                                type="submit"
                                value="SIGN UP"
                                onSubmit={(e) => handleSubmit(e)}
                            />

                            <br />
                            <br />
                            <span>Already have an Account?</span><span onClick={() => history.push('/')} className="link">Login</span>
                            <br />
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp
