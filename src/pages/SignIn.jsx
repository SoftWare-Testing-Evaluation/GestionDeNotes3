// src/pages/SignIn.jsx
import React, { useState } from 'react';
import image from '../assets/form.png';
import InputText from '../components/InputText/InputText.jsx';
import Button from '../components/Button/Button.jsx';
import Checkbox from '../components/Checkbox/Checkbox.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '../components/Typography/Typography.jsx';
import { useDispatch } from 'react-redux';
import { authenticatePrefet } from '../slices/authSlice'; // Importez votre action
import { Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';



const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Utilisez dispatch pour appeler l'action
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState('');

    const handleEmailChange = (e) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(e.target.value)) {
            setMessageError('Format d\'email invalide');
        } else {
            setMessageError('');
        }
        setFormData({
            ...formData,
            email: e.target.value,
        });
    };

    const handleLoginChange = (e) => {
        setFormData({
            ...formData,
            login: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setFormData({
            ...formData,
            password: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessageError('');
    
        try {
            const resultAction = await dispatch(authenticatePrefet(formData));
            if (authenticatePrefet.fulfilled.match(resultAction)) {
                localStorage.setItem('token', resultAction.payload.token); // Assurez-vous que le payload contient le token
                navigate('/dashboard');
            } else {
                setMessageError(resultAction.payload.message || 'Erreur de connexion');
            }
        } catch (error) {
            console.error(error);
            setMessageError('Une erreur est survenue lors de la connexion : ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <main className='flex h-[100vh]'>
            <form className='flex flex-col justify-center items-center h-full w-1/2 py-3 px-6 xl:px-12' onSubmit={handleSubmit}>
                <Typography text={'Sign in'} className='text-start w-full mb-5 font-bold text-6xl' isGradient />
                <InputText label={'Login'} helper={'Enter your login'} type={'text'} name={'login'} handler={handleLoginChange} />
                <InputText label={'Email'} helper={'Enter your email address'} type={'email'} name={'email'} handler={handleEmailChange} isTextArea={false} icon={<MailIcon />}/>
                <InputText label={'Password'} helper={'Enter your password'} type={'password'} name={'password'} handler={handlePasswordChange} />
                {messageError && (
                    <div style={{ position: 'relative', marginTop: '1rem' }}>
                        <Close onClick={() => setMessageError('')} sx={{ position: 'absolute', right: '0.25em', top: '25%', zIndex: '5', cursor: 'pointer', color: 'gray' }} />
                        <Alert severity="error">{messageError}</Alert>
                    </div>
                )}
                <Button text={'Sign in'} width={'100%'} margin={'25px 0 10px 0'} handler={handleSubmit} isLoading={isLoading} />
                <p className="text-sm text-gray-500 text-end w-full">
                    Not yet have an account? <Link to={'/signup'} className='text-[#F26100] text-[20px]'>Sign up</Link>
                </p>
                <Checkbox label='By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy.' />
            </form>
            <div className="h-full w-1/2">
                <img src={image} alt="image" className='w-full h-full object-cover object-center' />
            </div>
        </main>
    );
};

export default SignIn;
