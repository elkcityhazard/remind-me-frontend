import React, { createContext, useState } from 'react'






export const AppCtx = createContext({})


export function AppContextProvider({ children }) {

    const [errorMsgData, setErrorMsg] = useState(null)
    const [userData, setUserData] = useState({})



    const ctxValue = { errorMsgData, setErrorMsg, userData, setUserData }

    return (
        <AppCtx.Provider value={{ ...ctxValue }}>
            {errorMsgData && errorMsgData}
            {children}
        </AppCtx.Provider>

    )



}



