import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SignUp.css';
import { useState } from 'react';
import logo from './img.png';
import { signUpApiCall } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';



function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
    const navigate = useNavigate()
    const handleSignUp = () => {
        let isValid = true;

        if (firstName.trim() === "") {
            setFirstNameErr(true);
            isValid = false;
        } else {
            setFirstNameErr(false);
        }

        if (lastName.trim() === "") {
            setLastNameErr(true);
            isValid = false;
        } else {
            setLastNameErr(false);
        }

        if (!username.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            setUsernameErr(true);
            isValid = false;
        } else {
            setUsernameErr(false);
        }

        if (password.length < 8) {
            setPasswordErr(true);
            isValid = false;
        } else {
            setPasswordErr(false);
        }

        if (password !== confirmPassword) {
            setConfirmPasswordErr(true);
            isValid = false;
        } else {
            setConfirmPasswordErr(false);
        }

        if (isValid) {
            console.log("First Name:", firstName);
            console.log("Last Name:", lastName);
            console.log("Username:", username);
            console.log("Password:", password);
            signUpApiCall({
                "FirstName": firstName,
                "LastName": lastName,
                "Email": username,
                "Password": password,
                "ConfirmPassword": confirmPassword
              });
        }
    }

    return (
        <>
            <div className="signUp-main-cnt">
                <div>
                    <h2 className='line-1'>Fundo</h2>
                    <p className='line-2'>Create your Fundo Account</p>
                    <form action="#" method="post">
                        <div className="row">
                            <TextField
                                label="First Name*"
                                variant="outlined"
                                className='input'
                                onChange={(e) => setFirstName(e.target.value)}
                                error={firstNameErr}
                                helperText={firstNameErr ? "First name is required" : ""}
                            />
                            <TextField
                                label="Last Name*"
                                variant="outlined"
                                className='input'
                                onChange={(e) => setLastName(e.target.value)}
                                error={lastNameErr}
                                helperText={lastNameErr ? "Last name is required" : ""}
                            />
                        </div><br />
                        <TextField
                            fullWidth
                            label="Username*"
                            variant="outlined"
                            onChange={(e) => setUsername(e.target.value)}
                            error={usernameErr}
                            helperText={usernameErr ? "Incorrect email format" : ""}
                        />
                        <p className='username-sugg'>You can use letters, numbers & periods</p><br />
                        <div className='passwords'>
                            <TextField
                                label="Password*"
                                variant="outlined"
                                className='input'
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                error={passwordErr}
                                helperText={passwordErr ? "Password must be at least 8 characters long" : ""}
                            />
                            <TextField
                                label="Confirm*"
                                variant="outlined"
                                className='input'
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={confirmPasswordErr}
                                helperText={confirmPasswordErr ? "Passwords do not match" : ""}
                            />
                        </div>
                        <p className='mess-1'>Use 8 or more characters with a mix of letters, numbers & symbols</p><br />
                        <div className='buttons-login'>
                            <Button variant="text" onClick={()=>navigate("/login")}>Sign in instead</Button>
                            <Button variant="contained" onClick={handleSignUp}>Register</Button>
                        </div>
                    </form>
                </div>
                <div>
                    <img src={logo} alt="Fundo Logo" />
                    <div className="image-text">
                        <p style={{ marginTop: "0px", marginBottom: "0px" }}>One Account. All of Fundo</p>
                        <p style={{ marginTop: "0px" }}>working for you</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
