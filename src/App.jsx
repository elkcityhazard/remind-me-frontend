import React from 'react'
import './App.css'
import { AppContextProvider } from "./context/AppContext"



function App({ children }) {

    return (
        <>
            <AppContextProvider>
                {children}
            </AppContextProvider>
        </>
    )
}

export default App
