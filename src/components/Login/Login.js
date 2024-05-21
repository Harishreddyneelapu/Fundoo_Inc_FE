import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Login.css';
import { useState } from 'react';
import { loginApiCall } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const navigate = useNavigate()

    const handleLogin = async () => {
        let isValid = true;

        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            setEmailErr(true);
            isValid = false;
        } else {
            setEmailErr(false);
        }

        if (password.length < 8) {
            setPasswordErr(true);
            isValid = false;
        } else {
            setPasswordErr(false);
        }

        if (isValid) {
            console.log("Email:", email);
            console.log("Password:", password);
            const res = await loginApiCall({
                "Email": email,
                "Password": password
            });
            console.log(res.data.data.token);
            localStorage.setItem("AuthToken", res.data.data.token)
            navigate("/dashboard/notes")
        }
    }

    return (
        <div className="login-outer-cnt">
            <div>
                <div className='texts-login'>
                    <h2 className='fundo'>Fundo</h2>
                    <p className='signin-text'>Sign in</p>
                    <p className='use-your-fundo'>Use your Fundo Account</p>
                </div>
                <form action="#" method="post">
                    <div className="fields">
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            label="Email or phone*"
                            variant="outlined"
                            error={emailErr}
                            helperText={emailErr ? "Incorrect email format" : ""}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            label="Password*"
                            variant="outlined"
                            type="password"
                            error={passwordErr}
                            helperText={passwordErr ? "Password must be at least 8 characters long" : ""}
                        />
                        <Button className='forgotPassword' size="small" variant="text">Forgot password</Button>
                    </div>
                    <div className="buttons">
                        <Button size="small" variant="text" className="createAcc" onClick={()=> navigate("/signUp")}>Create account</Button>
                        <Button variant="contained" className="login" onClick={handleLogin}>Login</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
