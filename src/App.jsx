// REACT IMPORTS
import React from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'

// PAGES
import NotFound from './pages/NotFound.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

// UTILS
import ScrollToTop from './utils/ScrollToTop.jsx'
// import Layout from '@/containers/Layout/Layout'

function App() {

    return (
        <>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="*" element={<Navigate to="/notfound" replace />} />
                    <Route path="/notfound" element={<NotFound />}></Route>
                    <Route index  element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    {/* <Route path="/" element={<Layout />}>

                    </Route> */}
                </Routes>
            </HashRouter>
        </>
    )
}

export default App