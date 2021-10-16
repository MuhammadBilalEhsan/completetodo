// ZARURI === project > authentication > templates >edit icon > Cutomize action URL 
// or is url me hum apna localhost ka url den gy

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { confirmPasswordReset, getAuth, } from '@firebase/auth'
import './style.css'


const ConfirmPassword = () => {
    const [cpassword, setCpassword] = useState('')
    const history = useHistory()
    const [loader, setLoader] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        if (!cpassword || cpassword.length < 8) {
            alert("Password contain at least 8 characters")
        } else {
            const queryParams = new URLSearchParams(window.location.search)
            const oobCode = queryParams.get("oobCode")
            const auth = getAuth()
            confirmPasswordReset(auth, oobCode, cpassword)
                .then(() => {
                    setLoader(false)
                    alert(`Password Successfully Changed`)
                    history.push('/todo')
                })
                .catch((err) => {
                    setLoader(false)
                    console.log(err)
                    alert(err.message)
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
                            <legend><h1>Confirm Password</h1></legend>
                            <input
                                type="password"
                                maxLength="32"
                                name="password"
                                className="inp"
                                value={cpassword}
                                placeholder="Enter New Password"
                                onChange={(e) => setCpassword(e.target.value)}
                                required
                                autoComplete="off"
                            />
                            <br />
                            <input
                                className="btn btn-submit"
                                type="submit"
                                value="CONFIRM PASSWORD"
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
