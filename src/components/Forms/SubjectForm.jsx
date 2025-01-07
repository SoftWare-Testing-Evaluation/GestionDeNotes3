import React, { useState } from 'react'
import InputText from '../InputText/InputText.jsx'
import Button from '../Button/Button.jsx'
import { useDispatch, useSelector } from 'react-redux'; // Importer useSelector
import { addMatiere} from '../../slices/matiereSlice.js'; // Importer le thunk
import './forms.css'
const SubjectForm = ({onClose}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        designation: '',
        groupe: '',
    });

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        try {
                    await dispatch(addMatiere(formData)); // Appeler le thunk pour ajouter l'élève
                    onClose();
                } catch (error) {
                    console.error("Erreur lors de l'ajout de la matiere:", error);
                }

       
    };

    return (
        <div className='form'>
            <form>

                <InputText label={'Nom'} helper={'Entrer le nom de la matiere'} type="text" handler={(e) => handleChange(e, 'designation')} name="designation" />
                <div className='gap-1' />
                <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
                <label htmlFor="groupe" className="text-secondary font-bold" >Groupe</label>
<select

    defaultValue={1}
    name="groupe"
    onChange={(e) => handleChange(e, 'groupe')}
    style={{width:'100%',borderRadius:'10px'}}
>
    <option value={1}>Groupe 1</option>
    <option value={2}>Groupe 2</option>
    <option value={3}>Groupe 3</option>
    <option value={4}>Groupe 4</option>
</select>
                </div>



                <div className='gap-1' />

                <Button text={'Créer'} width="100%" handler={(e) => handleSubmit(e)} fontWeight="bold" isLoading={null} />
            </form>
        </div>
    )
}
export default SubjectForm