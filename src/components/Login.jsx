import React from "react"
import { GoogleOutlined, FacebookOutlined, AliwangwangOutlined } from "@ant-design/icons"
// firebase utilsl
import firebase from "firebase/app"
import { auth } from '../firebase'


const Login = () => {
    // sign In With Google
    function signInWithGoogle() {
        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider)
    }
    // sign In With Facebook
    function signInWithFacebook() {
        auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider)
    }
    return (
        <div id="login-page">  {/*make the login page glassmorphic*/}
            <div id="login-card">
                <h2>Welcome to <AliwangwangOutlined />TalkActive</h2>

                {/* sign-in buttons */}
                <div className="login-button google" onClick={signInWithGoogle}><GoogleOutlined /> Sign in with Google</div>
                <br />
                <br />
                <div className="login-button facebook" onClick={signInWithFacebook}><FacebookOutlined /> Sign in with Facebook</div>
            </div>
        </div>
    )
}


export default Login