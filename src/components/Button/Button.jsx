import React from 'react'

import './button.css'
import Loader from '../Loader/Loader.jsx'

const Button = ({text = null, width, icon, bg, fontWeight=600,height,margin,handler,isLoading, color, borderWidth, borderColor,lowercase,fontSize='14px',radius, size}) => {
    return (
        <button onClick={handler} style={{background:bg, width:width,height:height,border: `${borderWidth}px solid ${borderColor}`,borderRadius:radius, margin:margin}} className='button'>
            {
                isLoading ?
                <Loader size={size}/> :
                <>
                    {icon}
                    
                    {text !== null && <span style={{fontWeight: fontWeight,color:color,textTransform:lowercase,fontSize:fontSize}}>{text}</span>}          
                </>
                
            }
        </button>
    )
}

export default Button