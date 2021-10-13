import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './style.css'



const Login = () => {
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
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // const user = userCredential.user;
                    // alert("User login Successfully")
                    setLoader(false)
                    history.push('/todo')
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
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
                            <legend><h1>Login</h1></legend>

                            <input
                                type="email"
                                maxLength="32"
                                name="email"
                                className="inp"
                                value={loginData.email}
                                placeholder="Enter Your Email"
                                onChange={(e) => handleChange(e)}
                                required
                                autoComplete="off"
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
                                autoComplete="off"
                            />
                            <br />
                            <input
                                className="btn btn-submit"
                                type="submit"
                                value="LOGIN"
                                onSubmit={(e) => handleSubmit(e)}
                            />
                            <br />
                            <br />
                            <span>New to Computing Yard?</span><span onClick={() => history.push('/signup')} className="link">Register</span>
                            <br />
                            <br />
                            <span onClick={() => history.push('/rpassword')} className="link forgot">Forgot Password ?</span>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
