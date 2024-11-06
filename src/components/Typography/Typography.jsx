import React from 'react'

import './typography.css'

const Typography = ({text, style, className, isGradient=false}) => {
    return (
        <p className={isGradient ? `${className} typography gradient__text`:`${className} typography`} style={style} >{text}</p>
    )
}

export default Typography
