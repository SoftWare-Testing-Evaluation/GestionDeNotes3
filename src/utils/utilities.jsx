// import React from "react"

import { dashboard, home, hours, reportCard, students, teacher, user } from "../assets/lordicons";

export function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


export const onPlayPress = (ref) => {
    ref?.current?.playFromBeginning();
}

export const generateRef = (refID, useRef) => {
    const ref = useRef(refID)
    return ref
}

export const classes = ['Sixième (6e)','Cinquième (5e)','Quatrième (4e)','Troisième (3e)','Seconde (2nde)','Première (1ere)', 'Terminale (Tle)']
export const sequences = ['ES1','ES2','ES3','ES4','ES5','ES6']
export const sidebarCriteria = (pathname) => pathname === '/subjects' || pathname === '/students' || pathname === '/hours' || pathname === '/notes' || pathname === '/report-cards'
export const classLinks = (refs) => [
    {
        name: 'Matières',
        link: '/subjects',
        icon: reportCard,
        ref: refs[0]
    },
    {
        name: 'élèves',
        link: '/students',
        icon: students,
        ref: refs[1]
    },
    {
        name: 'Absences',
        link: '/hours',
        icon: hours,
        ref: refs[2]
    },
    {
        name: 'Notes',
        link: '/notes',
        icon: reportCard,
        ref: refs[3]
    },
    {
        name: 'Bulletins',
        link: '/report-cards',
        icon: reportCard,
        ref: refs[4]
    },
    
]
export const mainLinks = (refs) => [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: dashboard,
        ref: refs[0]
    },
    {
        name: 'Classes',
        link: '/classes',
        icon: home,
        ref: refs[1]
    },
    {
        name: 'Enseignants',
        link: '/teachers',
        icon: teacher,
        ref: refs[2]
    },
    {
        name: 'dispensations',
        link: '/dispensations', 
        icon: reportCard,
        ref: refs[3]
    },
    {
        name: 'Profile',
        link: '/profile',
        icon: user,
        ref: refs[4]
    },
]

