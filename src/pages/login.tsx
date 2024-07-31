import {auth, provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () =>{

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth,provider)
        console.log(result)
        navigate('/')
    }



    return <div>
        <h1><p>Sign in with Google to continue</p></h1>
        <button onClick={signInWithGoogle}>Sign in</button>
        </div>
}