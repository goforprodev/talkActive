import React, { useRef, useState, useEffect } from "react"
import { AliwangwangOutlined } from "@ant-design/icons"
import { ChatEngine } from "react-chat-engine"
import { useHistory } from "react-router-dom"
import { auth } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"

const Chats = () => {
    const history = useHistory()
    const { user } = useAuth()
    const [loading, setIsloading] = useState(true)

    // function that handles logout
    const handleLogout = async () => {
        await auth.signOut();
        history.push("/")
    }
    // function to get foto file
    const getFile = async(url) =>  {
        let response = await fetch(url);
        let data = await response.blob();
        console.log(data)
        return new File([data], "test.jpg", { type: 'image/jpeg' });
    }

    // useEffect
useEffect(() => {
        // handleLogout();
        if (!user || user == null){ 
            history.push("/")
            return
        }

        const url = "https://api.chatengine.io/users/"
        // get or create users 
        axios.get(`${url}me/`, {
            headers: {
                "project-id": "33e2b1f6-b4cb-4076-8d61-6eddf61aed52",
                "user-name": user.email,
                "user-secret": user.uid
            }
        }).then(() => setIsloading(false))
        .catch((e) => {
            let formdata = new FormData()

            let data = {
                'email':user.email,
                'username':user.email,
                'secret':user.uid,
                'avatar':formdata.avatar
            }

                getFile( user.photoURL).then((avatar) => formdata.append('avatar',avatar,avatar.name))
                axios.post(`${url}`, data, {
                    headers: {
                        'private-key': "4a075cda-195d-4fbb-a4be-93347f138d6e"
                    }
                }
                ).then(() => setIsloading(false))
                    .catch(e => console.log(e.response))
    })
        // handleLogout()
}, [user, history])


        if (!user || loading) return "Loading ..."

        return (
            <div className='chats-page'>
                <div className='nav-bar'>
                    <div className='logo-tab'>
                            <AliwangwangOutlined /> TalkActive
                    </div>

                    <div onClick={handleLogout} className='logout-tab'>
                        Logout
                    </div>
                </div>

                <ChatEngine
                    height='calc(100vh - 66px)'
                    projectID='33e2b1f6-b4cb-4076-8d61-6eddf61aed52'
                    userName={user.email}
                    userSecret={user.uid}
                />

            </div>
        )
    }
    export default Chats