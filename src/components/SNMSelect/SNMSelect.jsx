import React from 'react';
import { Option, Select, selectClasses } from '@mui/joy';
import { KeyboardArrowDown } from '@mui/icons-material';

const SNMSelect = ({ label, placeholder, options, handleChange, className, isStudentSelect }) => {
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
                onChange={(event, newValue) => handleChange(newValue)}
            >
                {options.map((elt, i) => (
                    <Option value={isStudentSelect ? elt : elt.id} key={i}>
                        {elt.nom || elt}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default SNMSelect;
