import { useState } from "react"
import "./LoginForm.css"


const LoginForm = (props) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)

    const loginToSite = () => {
        if (login !== "" && password !== ""){
            if (!props.handleLogin(login, password)){
                setIsError(true)
            }
        }else{
            setIsError(true)
        }
    }

    return(
        <>
            <button className="mainPageBtn" onClick={()=>{props.onBack()}}>Main Page</button>
            <div className="loginForm" onChange={()=>{setIsError(false)}}>
                <h2>Login</h2>
                <input type="text" value={login} onChange={(e)=>{setLogin(e.target.value)}} placeholder="Name"/>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
                <button className="sendButton" onClick={()=>{loginToSite()}}>Send</button>
                {isError ? <p className="errorMessage">Some data is invalid</p> : ""}
            </div>
        
        </>
    )
}

export default LoginForm