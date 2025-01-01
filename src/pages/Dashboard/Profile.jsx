import React, { useEffect, useState } from 'react';
import Typography from '../../components/Typography/Typography.jsx';
import InputText from '../../components/InputText/InputText.jsx';
import Button from '../../components/Button/Button.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { Close } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../slices/authSlice'; // Importer l'action
import '../../styles/Dashboard/profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        login: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                telephone: user.telephone || '', // Assurez-vous que telephone n'est pas null
                password: '', // Réinitialiser le mot de passe
                login: user.login,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
        setIsLoading(true);
        try {
            const { id, ...updatedData } = Object.fromEntries(
                Object.entries(formData).filter(([key, value]) => value !== '')
            );

            await dispatch(updateProfile({ userId: user.id, userData: updatedData })); // Mettez à jour le profil
            setMessageError(''); // Réinitialiser les erreurs
        } catch (error) {
            setMessageError('Erreur lors de la mise à jour du profil',error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className='profile'>
            <div className="container">
                <header>
                    <div className="texts">
                        {user ? (
                            <Typography text={`Hi ${user.nom} ${user.prenom}`} className={'text-center'} />
                        ) : (
                            <Loader />
                        )}
                        <Typography text={'Profile'} className='title text-center !text-3xl' isGradient />
                    </div>
                    
                </header>

                {loading ? (
                    <Loader />
                ) : (
                    <form id='form' >
                        <div className="inputs" onSubmit={handleUpdate}>
                            <InputText defaultValue={formData.nom} label={'First name'} helper={'Your first name'} type="text" handler={handleChange} name="nom" />
                            <InputText defaultValue={formData.prenom} label={'Last name'} helper={'Your last name'} type="text" handler={handleChange} name="prenom" />
                            <InputText defaultValue={formData.email} label={'Email'} helper={'Your email address'} type="email" handler={handleChange} name="email" />
                            <InputText label={'Phone number'} helper={'Your Phone Number'} type={'tel'} name={'telephone'} handler={()=>{handleChange}} />
                        </div>
                        <div className="inputs">
                            <InputText label={'New Password'} helper={'Your new password'} type="password" handler={handleChange} name="password" />
                            <InputText defaultValue={formData.login} label={'Your login'} helper={'Your login'} type="text" handler={handleChange} name="login" />
                        </div>

                        <div className='gap-1' />
                        {messageError && (
                            <div style={{ position: 'relative', marginTop: '1rem' }}>
                                <Close onClick={() => setMessageError('')} sx={{ position: 'absolute', right: '0.25em', top: '25%', zIndex: '5', cursor: 'pointer', color: 'gray' }} />
                                <Alert severity="error">{messageError}</Alert>
                            </div>
                        )}
                        <Button handler={handleUpdate} text={'Update'} width="30%" fontWeight="bold" isLoading={isLoading} />
                    </form>
                )}
            </div>
        </main>
    );
};

export default Profile;
