import React, { useState } from 'react'

import './search_bar.css'
import InputText from '../InputText/InputText.jsx'
import Button from '../Button/Button.jsx'
import { Option, Select, selectClasses }from '@mui/joy';
import { KeyboardArrowDown, Search } from '@mui/icons-material';

const SearchBar = ({withFilter, width, text=null, icon=null, handleChange, handleSearch, isLoading}) => {

    const filters = ['town','brand','carType'];

    // const filter= {
    //     name: '',
    //     modele: '',
    //     description: '',
    //     id_cathegorie__name: '',
    //     id_marque__name: '',
    //   };

    return (
        <div className='search-bar' style={{width:width}}>
            <InputText helper={'Enter some text...'} type="text" handler={(e) => handleChange(e)} name="keyOfSearch" />

            <div className="options">
                {
                    withFilter && 
                    <Select
                        placeholder={'Search by'}
                        indicator={<KeyboardArrowDown />}
                        sx={{
                            [`& .${selectClasses.indicator}`]: {
                            transition: '0.2s',
                            [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                            },
                            },
                            height: '100%',
                        }}
                        >

                        {
                            filters.map((elt, i) => {
                                return (
                                    <Option value={elt} key={i} >{elt}</Option>
                                )
                            })
                        }
                    </Select>
                }

                <Button handler={handleSearch} text={text} icon={icon} isLoading={isLoading} size={'25px'}/>
            </div>
        </div>
    )
}

export default SearchBar