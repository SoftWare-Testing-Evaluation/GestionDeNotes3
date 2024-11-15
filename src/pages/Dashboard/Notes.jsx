import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/students.css";

import { useAlert } from 'react-alert-with-buttons'
import { DeleteOutline, EditOutlined, KeyboardArrowDown, Logout, Person2Outlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { TeacherRow } from "../../components/Utils/TableRows/TableRows";
import Loader from "../../components/Loader/Loader.jsx";
import { Player } from "@lordicon/react";
import { folderOrange, reportCard, teacher } from "../../assets/lordicons/index.js";
import { classes, onPlayPress } from "../../utils/utilities.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import { Option, Select, selectClasses } from '@mui/joy';

const Students = () => {
    //State for translation
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [classe, setClasse] = useState(classes[0]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);

    const admin = 'Essi Junior'
    // const navigate = useNavigate()

    const students = [
        {
            id: 1,
            firstName: 'NDANG ESSI',
            lastName: 'Pierre Junior',
            seq1: '15',
            seq2: '12,3',
            seq3: '11,98',
            seq4: '13',
            seq5: '14,23',
            seq6: '11,98',
            classe: 'Sixième (6e)',
        },
        {
            id: 2,
            firstName: 'Maths',
            lastName: 'Pierre Junior',
            seq1: '15',
            seq2: '12,3',
            seq3: '11,98',
            seq4: '13',
            seq5: '14,23',
            seq6: '11,98',
            classe: 'Sixième (6e)',
        },
        {
            id: 3,
            firstName: 'French',
            lastName: 'Pierre Junior',
            seq1: '15',
            seq2: '12,3',
            seq3: '11,98',
            seq4: '13',
            seq5: '14,23',
            seq6: '11,98',
            classe: 'Sixième (6e)',
        },
        {
            id: 4,
            firstName: 'English',
            lastName: 'Pierre Junior',
            seq1: '15',
            seq2: '12,3',
            seq3: '11,98',
            seq4: '13',
            seq5: '14,23',
            seq6: '11,98',
            classe: 'Sixième (6e)',
        },
    ]
    const alert = useAlert()

    async function deleteAdmin(id) {
        setIsRefreshing(true)
    }

    const handleLogout = (e) => {
        e.preventDefault()
        setIsLogingOut(true)

    }

    function TeacherRow({ id, firstName, lastName, seq1, seq2, seq3, seq4, seq5, seq6 }) {

        return (
            <tr>
                <td>{id}</td>
                <td>{firstName} {lastName}</td>
                <td>{seq1}</td>
                <td>{seq2}</td>
                <td>{seq3}</td>
                <td>{seq4}</td>
                <td>{seq5}</td>
                <td>{seq6}</td>
            </tr>
        );
    }
    const handleChange = (
        event,
        newValue,
    ) => {
        console.log(newValue);
        setClasse(newValue);

    };
    // useEffect(() => {
    //   if (admin === null || admin.role !== 'ADMIN')
    //     navigate('/signin')
    //   else {
    //     refresh(dispatch)
    //   }
    // }, [admin])

    return (
        <div className="students" >
            <div className="container">
                <DashboardHeader admin={admin} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={reportCard} title={'Elèves'} count={students.length} classe={classe} />

                <div className="flex !justify-between items-center w-[95%]">
                    
                    <div className="ml-auto">
                        <p className="text-secondary font-bold">Classe</p>
                        <Select
                            placeholder={'Choisir la classe'}
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
                                classes.map((elt, i) => {
                                    return (
                                        <Option value={elt} key={i} >{elt}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>

                </div>

                <div className="data">
                    {
                        isRefreshing ?
                            <div>
                                <Skeleton variant="rectangular" width='100%' height={55} />
                                <div style={{ marginTop: '0.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                                    {
                                        Array.apply(null, { length: 25 }).map((value, index) =>
                                            <Skeleton key={index} variant="rounded" width={'98%'} height={40} style={{ margin: '0.125rem auto' }} />
                                        )
                                    }
                                </div>
                            </div> :
                            <div className="overflow-x-auto">
                                <table className="">
                                    <thead>
                                        <tr>
                                            <th rowSpan={2}>ID</th>
                                            <th rowSpan={2}>Nom(s) et Prénom(s)</th>
                                            <th colSpan={2} className="border-b border-secondary">Trimestre 1</th>
                                            <th colSpan={2} className="border-b border-secondary">Trimestre 2</th>
                                            <th colSpan={2} className="border-b border-secondary">Trimestre 3</th>
                                        </tr>
                                        <tr>
                                            <th>Séquence 1</th>
                                            <th>Séquence 2</th>
                                            <th>Séquence 3</th>
                                            <th>Séquence 4</th>
                                            <th>Séquence 5</th>
                                            <th>Séquence 6</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Pagination data={students.filter(elt => elt.classe === classe)} RenderComponent={TeacherRow} pageLimit={1} dataLimit={5} tablePagination={true} />
                                    </tbody>
                                </table>

                            </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default Students;
