import React from 'react'
import { Option, Select, selectClasses } from '@mui/joy';
import { KeyboardArrowDown } from '@mui/icons-material';

const SNMSelect = ({label, placeholder,  options, handleChange, className}) => {
    return (

        <div className={className}>
            <p className="text-secondary font-bold">{label}</p>
            <Select
                placeholder={placeholder}
                indicator={<KeyboardArrowDown />}
                sx={{
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                    height: '100%',
                    width: 'auto',
                    padding: '10px 20px',
                    border: '2px solid var(--secondary)',
                    color: 'var(--secondary)',
                    fontWeight: 700
                }}
                onChange={handleChange}
            >

                {
                    options.map((elt, i) => {
                        return (
                            <Option value={elt} key={i} >{elt}</Option>
                        )
                    })
                }
            </Select>
        </div>
    )
}

export default SNMSelect