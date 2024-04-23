import { useContext } from 'react'
import { AppCtx } from "../context/AppContext"




const useAppContext = () => {
    const appContext = useContext(AppCtx)

    if (!appContext) throw new Error("useAppContext must be used with a <Parent />")

    return appContext
}

export default useAppContext
