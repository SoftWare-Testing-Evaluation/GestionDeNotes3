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

export const sidebarCriteria = (pathname) => pathname === '/subjects' || pathname === '/classes' || pathname === '/hours' || pathname === '/results' || pathname === '/report-cards'
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
        link: '/results',
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
        link: '/subjects',
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
        name: 'Profile',
        link: '/profile',
        icon: user,
        ref: refs[3]
    },
]