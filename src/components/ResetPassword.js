import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from '@firebase/auth'
import './style.css'


const ConfirmPassword = () => {
    const [email, setEmail] = useState('')
    const history = useHistory()
    const [loader, setLoader] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)

        if (!email || email.length < 7) {
            alert("please enter correct email")
        } else {
            const auth = getAuth()
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setLoader(false)
                    alert(`Email sent successfully on ${email}`)
                    history.push('/')
                })
                .catch((err) => {
                    setLoader(false)
                    console.log(err)
                    alert("Something went wrong")
                })
        }
    }

    if (loader) return <div className="loader"></div>
    return (
        <>
            <div className="container">
                <div className="subContainer">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <fieldset>
                            <legend><h1>Reset Password</h1></legend>
                            <input
                                type="email"
                                maxLength="32"
                                name="email"
                                className="inp"
                                value={email}
                                placeholder="Enter Your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="off"
                                autoFocus
                            />
                            <br />
                            <input
                                className="btn btn-submit"
                                type="submit"
                                value="CONFIRM EMAIL"
                                onSubmit={(e) => handleSubmit(e)}
                            />
                            <br />
                            <br />
                            <span>Back to Login</span><span onClick={() => history.push('/')} className="link">Login</span>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ConfirmPassword;
