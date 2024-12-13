//src/App.jsx.jsx
// REACT IMPORTS
import React from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'

// PAGES
import NotFound from './pages/NotFound.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Teachers from './pages/Dashboard/Teachers.jsx'
import Profile from './pages/Dashboard/Profile.jsx'
import Subjects from './pages/Dashboard/Subjects.jsx'
import Students from './pages/Dashboard/Students.jsx'
import Hours from './pages/Dashboard/Hours.jsx'
import Classes from './pages/Dashboard/Classes.jsx'
import Notes from './pages/Dashboard/Notes.jsx'
import ReportCards from './pages/Dashboard/ReportCards.jsx'

// UTILS
import ScrollToTop from './utils/ScrollToTop.jsx'
import Layout from './containers/Layout.jsx'

function App() {

    return (
        <>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="*" element={<Navigate to="/notfound" replace />} />
                    <Route path="/notfound" element={<NotFound />}></Route>

                    <Route index element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    <Route path="/" element={<Layout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="teachers" element={<Teachers />} />
                        <Route path="classes" element={<Classes />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="subjects" element={<Subjects />} />
                        <Route path="students" element={<Students />} />
                        <Route path="hours" element={<Hours />} />
                        <Route path="notes" element={<Notes />} />
                        <Route path="report-cards" element={<ReportCards />} />
                        
                    </Route>
                </Routes>
            </HashRouter>
        </>
    )
}

export default App