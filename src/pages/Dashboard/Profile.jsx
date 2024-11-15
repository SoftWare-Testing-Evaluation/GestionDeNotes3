import React, { useEffect, useState } from 'react'
import Typography from '../../components/Typography/Typography.jsx';
import InputText from '../../components/InputText/InputText.jsx';
import Button from '../../components/Button/Button.jsx';

import '../../styles/Dashboard/profile.css'
import { Close } from '@mui/icons-material';
import { Alert } from '@mui/material';


const Profile = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [messageError,setMessageError] = useState('')
    const admin = 'Essi Junior'

    return (
        <main className='profile'>
            <div className="container">
                <header>
                    <div className="texts">
                        <Typography text={`Hi ${admin}`} className={'text-center'}/>
                        <Typography text={'Profile'} className='title text-center !text-3xl' isGradient/>
                    </div>
                </header>

                {
                    admin === null ?
                        <Loader /> :
                        <form id='form'>
                            <div className="inputs">
                                <InputText defaultValue={null} label={'First name'} helper={'Your first name'} type="text" handler={() => {}} name="firstName" />
                                <InputText defaultValue={null} label={'lastName'} helper={'Your last name'} type="text" handler={() => {}} name="lastName" />
                                <InputText defaultValue={null} label={'tEmail'} helper={'Your email address'} type="email" handler={() => {}} name="email" />
                                {/* <InputText label={'password'} helper={'yourPassword'} type="password" handler={(e) => handleChange(e, 'password'} name="password" /> */}
                                <InputText defaultValue={null} label={'phone'} helper={'Your Phone Number'} type="number" handler={() => {}} name="phone" />
                            </div>

                            <div className='gap-1' />
                            {
                                messageError !== '' &&
                                <div style={{ position: 'relative', marginTop: '1rem' }}>
                                    <Close onClick={() => setMessageError('')} sx={{ position: 'absolute', right: '0.25em', top: '25%', zIndex: '5', cursor: 'pointer', color: 'gray' }} />
                                    <Alert severity="error" >{messageError}</Alert>
                                </div>

                            }
                            <Button handler={() => { }} text={'Update'} width="30%" fontWeight="bold" isLoading={isLoading} />
                            {/* <input type="submit" value="confirms" onClick={handleUpdate} /> */}
                        </form>
                }
            </div>
        </main>
    )
}

export default Profile