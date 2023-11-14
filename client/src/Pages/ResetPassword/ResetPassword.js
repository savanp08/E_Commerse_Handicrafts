import { TextField } from '@mui/material';
import axios from 'axios';
import react, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    async function handleResetPassword(){
        await axios.post('/Auth/ResetPassword',{
            newPassword : newPassword,
            email : email
        }).then(async (res)=>{
            if(res.status===200){
                alert("Password Reset Successfully");
                await new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve();
                    },2000);
                })
                navigate('/Login');
            }
        }).catch(err=>{
            alert("Error while resetting password");
        })
    }

    return (
        <div className='parp45-main-wrap'>
            <span className='parp45-title-text'>
                Reset Password
            </span>
            <div className="parp45-input-wrap">
                <TextField
                id="parp45-newPassword"
                label="New Password"
                variant="outlined"
                value={newPassword}
                onChange={(e)=>{
                    setNewPassword(e.target.value);
                }}
                error={newPassword.length < 6}
                helperText={newPassword.length < 6 ? "Password must be atleast 6 characters long" : ""}
                />
                <TextField
                id="parp45-newPassword"
                label="New Password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e)=>{
                    setConfirmPassword(e.target.value);
                }}
                error={confirmPassword.length < 6 || confirmPassword !== newPassword}
                helperText={confirmPassword.length < 6 || confirmPassword !== newPassword ? "Password must match" : ""}
                />
                 


            </div>
            <div className='parp45-button-wrap'>
                <button className='parp45-button'
                onClick={(e)=>{
                    e.preventDefault();
                    handleResetPassword();
                }}
                disabled={newPassword.length < 6 || confirmPassword.length < 6 || confirmPassword !== newPassword}
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;
