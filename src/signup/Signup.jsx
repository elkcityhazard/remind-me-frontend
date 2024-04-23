import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail'
import equals from 'validator/lib/equals'
import isMobilePhone from 'validator/lib/isMobilePhone'
import escape from 'validator/lib/escape'

import "./default.scss";
import useAppContext from '../hooks/useAppContext';



const errMsgData = {
    email: [],
    passwordOne: [],
    passwordTwo: [],
    phoneNumber: [],
}

const minPasswordLength = 7





export const Signup = () => {
    const [email, setEmail] = useState("")
    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState(errMsgData)
    const [next, setNext] = useState(false)
    const [user, setUser] = useState({})

    const { setErrorMsg, setUserData } = useAppContext()

    const navigate = useNavigate();


    const redirectToSuccess = () => {
        navigate("/signup/success")
    }



    useEffect(() => {
        error ?
            setErrorMsg(prevMsg => prevMsg = "There is an error with your form entry.  Check your input and try again")
            : setErrorMsg(prevMsg => prevMsg = null)
    }, [error])


    useEffect(() => {

        if (!Object.keys(user).length) {
            return
        }

        setUserData(prevUser => prevUser = user)
        setNext(true)

    }, [user])


    useEffect(() => {
        if (next) redirectToSuccess()
    }, [next])




    const handleInputOnChange = (e) => {

        const { id } = e.target

        if (!id) return null

        switch (id) {
            case "email":
                setEmail(email => email = e.target.value)
                break
            case "passwordOne":
                setPasswordOne(passwordOne => passwordOne = e.target.value)
                break
            case "passwordTwo":
                setPasswordTwo(passwordTwo => passwordTwo = e.target.value)
                break
            case "phoneNumber":
                setPhoneNumber(phoneNumber => phoneNumber = e.target.value)
            default:
            // nothing to do
        }



    }


    const handleOnSubmit = async (e) => {

        try {

            e.preventDefault()
            setError(false)
            setErrorMessages(errMsgData)

            if (!email.length) {

                setErrorMessages((prevState) => ({
                    ...prevState,
                    email: [...prevState.email, "email cannot be empty"]
                }))
                setError(true)

            }

            if (!isEmail(email)) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    email: [...prevState.email, "invalid email address format"]
                }))
                setError(true)
            }


            if (!equals(passwordOne, passwordTwo)) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    passwordOne: [...prevState.passwordOne, "passwords do not match"],
                    passwordTwo: [...prevState.passwordTwo, "passwords do not match"],
                }))
                setError(true)
            }

            if (passwordOne.length < minPasswordLength || passwordTwo.length < minPasswordLength) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    passwordOne: [...prevState.passwordOne, "password is not long enough"],
                    passwordTwo: [...prevState.passwordTwo, "password is not long enough"],
                }))
                setError(true)
            }

            if (!isMobilePhone(phoneNumber, ['en-US'])) {

                setErrorMessages(prevState => ({
                    ...prevState,
                    phoneNumber: [...prevState.phoneNumber, "invalid phone number"],
                }))
                setError(true)
            }

            setLoading(true)


            if (!error) {
                setErrorMsg(null)

                const user = {
                    email,
                    created_at: new Date(Date.now()),
                    updated_at: new Date(Date.now()),
                    password: {
                        plaintext_1: passwordOne,
                        plaintext_2: passwordTwo,
                        created_at: new Date(Date.now()),
                        updated_at: new Date(Date.now()),
                        version: 1,

                    },
                    phone_number: {
                        plaintext: phoneNumber,
                        created_at: new Date(Date.now()),
                        updated_at: new Date(Date.now()),
                        version: 1

                    },
                    scope: 3,
                    is_active: 0,
                    version: 1
                }



                const response = await fetch("/api/v1/users/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                })

                const data = await response.json()

                if (data.error) {

                    const { error } = data

                    setLoading(false)
                    setErrorMsg(error)
                    return

                }
                setLoading(false)
                setUser(data.user)
            } else {
                setErrorMsg("there has been an error")


            }
        } catch (err) {
            throw new Error(err)
        }


    }



    return (
        <>
            <form data-type="signupForm" action="/api/v1/users/add" method="POST" onSubmit={handleOnSubmit}>

                <form-control>
                    <label htmlFor="email">
                        <input
                            type="email"
                            id="email"
                            placeholder="user@example.com"
                            onChange={handleInputOnChange}
                            value={escape(email)}
                            aria-label="user email input"
                        />
                        {error &&
                            <small className="error">
                                <ul>
                                    {errorMessages["email"] && errorMessages["email"].map((error, idx) => {
                                        return (
                                            <li key={idx}>{error}</li>
                                        )
                                    }, "")}
                                </ul>
                            </small>
                        }
                    </label>
                </form-control>
                <form-control>
                    <label htmlFor="passwordOne">
                        <input
                            type="password"
                            id="passwordOne"
                            placeholder="password"
                            onChange={handleInputOnChange}
                            value={escape(passwordOne)}
                            aria-label="user password one input"
                        />

                        {error && errorMessages["passwordOne"].length > 0 &&
                            <small className="error">
                                <ul>
                                    {errorMessages["passwordOne"] && errorMessages["passwordOne"].map((error, idx) => {
                                        return (
                                            <li key={idx}>{error}</li>
                                        )
                                    }, "")}
                                </ul>
                            </small>
                        }
                    </label>
                </form-control>
                <form-control>
                    <label htmlFor="passwordTwo">
                        <input
                            type="password"
                            id="passwordTwo"
                            placeholder="password"
                            onChange={handleInputOnChange}
                            value={escape(passwordTwo)}
                            aria-label="user password two input"
                        />

                        {error && errorMessages["passwordTwo"].length > 0 &&
                            <small className="error">
                                <ul>
                                    {errorMessages["passwordTwo"] && errorMessages["passwordTwo"].map((error, idx) => {
                                        return (
                                            <li key={idx}>{error}</li>
                                        )
                                    }, "")}
                                </ul>
                            </small>
                        }
                    </label>
                </form-control>
                <form-control>
                    <label htmlFor="phoneNumber">
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="555-555-5555"
                            onChange={handleInputOnChange}
                            value={escape(phoneNumber)}
                        />
                        {error && errorMessages["phoneNumber"].length > 0 &&
                            <small className="error">
                                <ul>
                                    {errorMessages["phoneNumber"] && errorMessages["phoneNumber"].map((error, idx) => {
                                        return (
                                            <li key={idx}>{error}</li>
                                        )
                                    }, "")}
                                </ul>
                            </small>
                        }
                    </label>
                </form-control>
                <form-control>
                    <label htmlFor="submit">
                        <input
                            type="submit"
                            value="submit"
                            aria-label="user signup submit button"
                        />
                    </label>
                </form-control>
            </form>

        </>
    )
}


