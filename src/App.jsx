import React from 'react'
import Loader from './components/Loader/Loader.jsx'
import Button from './components/Button/Button.jsx'
import InputText from './components/InputText/InputText.jsx'
import Checkbox from './components/Checkbox/Checkbox.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import { Typography } from '@mui/joy'

export default function App() {
    return (
        <div className='bg-red-400'>
            Hello world here
            <Button text={'Submit'} isLoading={false}/>
            <InputText />
            <Checkbox />
            <SearchBar text={'Search'} withFilter={true} />
            <Typography text={'Hello World'} isGradient={true}/>
            {/* <Loader bg='red'/> */}
        </div>
    )
}
