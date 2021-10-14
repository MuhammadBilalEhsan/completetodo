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
        setLoader(true)
        let { email, password } = loginData
        if (!email || email.length < 7) {
            alert("Please Enter The Correct Email!")
        }
        else if (!password || password.length < 8) {
            alert("Password! contains at least 8 characters !")
        } else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const user = userCredential.user;
                    let { uid } = user
                    setLoader(false)
                    alert("User Sign Up successfully")
                    history.push('/todo')
                    localStorage.setItem('login', `${uid}`)
                })
                .catch((error) => {
                    console.log(error)
                    setLoader(false)
                    alert("Invalid Credentials")
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
