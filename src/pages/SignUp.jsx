import React from 'react'


import image from '../assets/form.png'
import InputText from '../components/InputText/InputText.jsx'
import Button from '../components/Button/Button.jsx'
import Checkbox from '../components/Checkbox/Checkbox.jsx'
import { Link } from 'react-router-dom'
import Typography from '../components/Typography/Typography.jsx'

const SignUp = () => {
    return (
        <main className='flex h-[100vh] '>
            <form className='flex flex-col justify-center items-center h-full w-1/2 py-3 px-6 xl:px-12'>

                <Typography text={'Sign up'} className='text-start w-full mb-5 font-bold text-6xl' isGradient />
                <InputText label={'Email'} helper={'Enter your email address'} type={'email'} name={'email'} />
                <div className="flex max-lg:flex-col w-full">
                    <InputText label={'First name'} helper={'Enter your first name'} type={'text'} name={'name'} />
                    <InputText label={'Last name'} helper={'Enter your last name'} type={'text'} name={'name'} />
                </div>
                <InputText label={'Password'} helper={'Enter your password'} type={'password'} name={'password'} />
                <InputText label={'Phone number'} helper={'Enter your phone number'} type={'number'} name={'number'} handler={() => { }} />
                <Button text={'Sign up'} width={'100%'} margin={'25px 0 10px 0'} />

                <p className="text-sm text-gray-500 text-end w-full">Already have an account? <Link to={'/'} className='text-[#F26100] text-[20px]'>Sign in</Link></p>

                <Checkbox label='By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy.' />
            </form>
            <div className="h-full w-1/2">
                <img src={image} alt="image" className='w-full h-full object-cover object-center' />
            </div>
        </main>
    )
}

export default SignUp