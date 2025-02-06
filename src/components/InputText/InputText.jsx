import React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import './input_text.css';

const InputText = ({label, helper, icon, type, handler, name, isTextArea, isCategory=false,defaultValue, className,value}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl className='input' style={{width:'100%'}}>
      <FormLabel>{label}</FormLabel>
      <div className="input-container">
        {isTextArea ? (
          <textarea name={name} onChange={handler} className="input-field text-area" placeholder={helper} />
        ) : (
          <>
            {type === 'tel' ? (
              <PhoneInput
              defaultValue={defaultValue}
              placeholder={helper}
              value={defaultValue} // Assurez-vous de passer la valeur correcte pour le numéro de téléphone
              defaultCountry="CM"
              country="CM"
              onChange={handler} // Gérer le changement du numéro de téléphone
              className="input-field"
              autoComplete={name}
              />
              
            ) : (
              isCategory ?
                <select name="cathegorie" className="select-field" id="" onChange={handler}>
                    <option value={1} > exterior </option>
                    <option value={2} > Ev Accesories </option>
                    <option value={3} > overland </option>
                    <option value={4} > Interior </option>
                </select>
                :
              <input
              defaultValue={defaultValue}
                placeholder={helper}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                onChange={handler}
                value={value}
                name={name}
                className="input-field"
                autoComplete={name}
                style={{ paddingRight: '30px' }} // Ajoutez du padding pour l'icône
              />
            )}
            {icon && ( // Vérifiez si l'icône est fournie avant de l'afficher
              <div className="icon-suffix">{icon}</div>
            )}
            {type === 'password' && !isTextArea && (
              <div className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> }
              </div>
            )}
          </>
        )}
      </div>
    </FormControl>
  );
};

export default InputText;
