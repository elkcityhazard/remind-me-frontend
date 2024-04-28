import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';






export function Activation({ children }) {
    let [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const [hasToken, setHasToken] = useState(false)
    const [userData, setUserData] = useState(null)
    const activationToken = searchParams.get("token") || null


    const redirectToSignup = () => {
        navigate("/signup")
    }

    useEffect(() => {

        activationToken ? setHasToken(true) : setHasToken(false)

    }, [activationToken])

    useEffect(() => {

        async function fetchUserData() {
            try {

                const response = await fetch("/api/v1/users/token/" + encodeURIComponent(activationToken))

                const userData = await response.json()

                const { data } = userData

                if (!data?.email) {
                    setUserData(null)
                    // redirectToSignup()
                    return
                }

                setUserData(data)


            } catch (err) {
                console.error(err.message)
                throw new Error(err)
            }

        }
        fetchUserData()

    }, [])

    useEffect(() => {
        console.log(userData)
    }, [userData])

    const handleActivationAjax = async () => {

        try {

            const response = await fetch(`/api/v1/users/activation?token=${activationToken}&id=${userData?.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(userData)
            })

            const activationData = await response.json()

            if (activationData?.user?.email) {
                return {
                    status: "ok",
                    ...activationData
                }

            } else {
                return {
                    status: "error",
                    ...activationData
                }
            }



        } catch (err) {
            console.error(err.message)
            throw new Error(err)
        }

    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const submitResponse = await handleActivationAjax()


        } catch (err) {
            console.error(err.message)
            throw new Error(err)
        }





    }


    return (
        <form method="#" action="#" onSubmit={handleSubmit}>
            <form-control>
                <p>Hello, {userData?.email}!</p>
                <p>You need to click the button below to activate your account.</p>
            </form-control>
            <form-control>
                <input type="submit" value="Activate Account" />
            </form-control>
        </form>
    )

}
