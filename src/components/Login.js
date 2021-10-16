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
        console.log("login")
        let { email, password } = loginData
        if (!email ) {
            alert("Please Enter The Correct Email!")
        }
        else if (!password || password.length < 8) {
            alert("Password! contains at least 8 characters !")
        } else {
            setLoader(true)
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // const user = userCredential.user;
                    setLoader(false)
                    history.push('/todo')

                })
                .catch((error) => {
                    setLoader(false)
                    console.log(error)
                    alert(error.message)
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
