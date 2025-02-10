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
        cachet: null, // Pour le fichier cachet
        signature: null, // Pour le fichier signature
    });

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                telephone: user.telephone || '',
                password: '',
                login: user.login,
                cachet: null,
                signature: null,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({ ...formData, [name]: e.target.files[0] }); // Mettre à jour le fichier sélectionné
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessageError(''); // Réinitialiser les erreurs

        const { id, cachet, signature, ...updatedData } = formData;
        const formDataToSend = new FormData();

        // Ajouter les données mises à jour
        Object.keys(updatedData).forEach(key => {
            formDataToSend.append(key, updatedData[key]);
        });

        // Ajouter les fichiers si disponibles
        if (cachet) formDataToSend.append('cachet', cachet);
        if (signature) formDataToSend.append('signature', signature);

        try {
            console.log(formDataToSend)
            await dispatch(updateProfile({ userId: id, userData: formDataToSend }));
            // Optionnel : Afficher un message de succès ici
        } catch (error) {
            setMessageError('Erreur lors de la mise à jour du profil');
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
                    <form id='form' onSubmit={handleUpdate}>
                        <div className="inputs">
                            <InputText defaultValue={formData.nom} label={'First name'} handler={handleChange} name="nom" />
                            <InputText defaultValue={formData.prenom} label={'Last name'} handler={handleChange} name="prenom" />
                            <InputText defaultValue={formData.email} label={'Email'} handler={handleChange} name="email" />
                            <InputText defaultValue={formData.telephone} type={'tel'} label={'Phone number'} handler={()=>{handleChange}} name="telephone" />
                        </div>
                        <div className="inputs">
                            <InputText label={'New Password'} type="password" handler={handleChange} name="password" />
                            <InputText defaultValue={formData.login} label={'Your login'} handler={handleChange} name="login" />
                        </div>

                        {/* Champs pour le cachet et la signature */}
                        <div className="inputs">
                            <label htmlFor="cachet">Upload Cachet:</label>
                            <input type="file" id="cachet" name="cachet" accept="image/*" onChange={handleFileChange} />
                            <label htmlFor="signature">Upload Signature:</label>
                            <input type="file" id="signature" name="signature" accept="image/*" onChange={handleFileChange} />
                        </div>

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
