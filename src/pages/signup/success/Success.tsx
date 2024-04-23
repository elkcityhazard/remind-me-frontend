import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppContext from '../../../hooks/useAppContext'



export const SignupSuccess = ({ children }) => {

    const ctx = useAppContext()
    const navigate = useNavigate()

    const returnToSignupPage = () => {
        if (!ctx.userData?.email) {
            navigate("/signup")
            return
        }
    }

    // this page is semi private in the sense that a user only needs to see it
    // if they signup

    useEffect(() => {
        returnToSignupPage()
    }, [])






    if (!ctx.userData?.email) {
        navigate("/signup")
    }

    return (
        <section>
            <h1>Success</h1>
            <p>Hi, {ctx.userData.email}! You need to check your email before your account becomes active.</p>
        </section>


    )
}
