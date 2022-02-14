import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { auth } from "../firebase"

// create the app's contect
const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

// spread context round to diffrent react children
export const AuthProvider = ({ children }) => {
    //create some states
    const [isLoading, setIsloading] = useState(true)
    const [user, setUser] = useState(null)

    // create History for redirectiing
    const history = useHistory()


    // call the useEffect
    useEffect(() => {
        // check if we are already signed in
        auth.onAuthStateChanged((user) => {
            // set user to the user we get from  here
            setUser(user)
            //set Loading to be false meaning we are no longer loading
            setIsloading(false)
            // redirect to chat page if we already have a user
            if (user) { history.push("/chats") }
        })
    }, [user, history])

    const value = { user }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
            {/* {!isLoading ? children : null} */}
        </AuthContext.Provider>
    )
}