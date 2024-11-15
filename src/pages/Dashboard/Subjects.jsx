import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/subjects.css";

import { useAlert } from 'react-alert-with-buttons'
import { DeleteOutline, EditOutlined, Logout, Person2Outlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { TeacherRow } from "../../components/Utils/TableRows/TableRows";
import Loader from "../../components/Loader/Loader.jsx";
import { Player } from "@lordicon/react";
import { folderOrange, reportCard, teacher } from "../../assets/lordicons/index.js";
import { onPlayPress } from "../../utils/utilities.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";

const Subjects = () => {
    //State for translation
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);

    const admin = 'Essi Junior'
    // const navigate = useNavigate()

    const subjects = [
        {
            id: 1,
            coef: 6,
            name: 'Maths',
            teachers: ['Essi Junior', 'EKO Samuela'],
        },
        {
            id: 2,
            coef: 2,
            name: 'Maths',
            teachers: ['Essi Junior'],
        },
        {
            id: 3,
            coef: 6,
            name: 'French',
            teachers: ['Kobe', 'Essi Junior'],
        },
        {
            id: 4,
            coef: 6,
            name: 'English',
            teachers: ['Kouabitchou Raphael', 'EKO Samuela'],
        },
        {
            id: 5,
            coef: 6,
            name: 'Maths',
            teachers: ['Essi Junior', 'EKO Samuela'],
        },
        {
            id: 6,
            coef: 6,
            name: 'Maths',
            teachers: ['Essi Junior', 'EKO Samuela'],
        },
        {
            id: 7,
            coef: 6,
            name: 'Maths',
            teachers: ['Essi Junior', 'EKO Samuela'],
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

    function TeacherRow({ id, coef, name, teachers }) {
        return (
            <tr>
                <td>{id}</td>
                <td>{coef}</td>
                <td>{name}</td>
                <td>
                    {
                        teachers.map((subject, index) => (
                            <p key={index}>{subject}</p>
                        ))
                    }
                </td>
                <td className="option-buttons option flex items-center justify-center py-2 gap-2 ">
                    <EditOutlined className="bg-emerald-300 text-emerald-800 rounded-full p-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" />

                    <DeleteOutline className="bg-red-300 text-red-800 rounded-full p-2 hover:bg-red-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" onClick={() =>
                        alert.open({
                            message: `Really delete, ${name} ?`,
                            buttons: [
                                {
                                    label: "Yes",
                                    onClick: () => {
                                        deleteAdmin(id)
                                        alert.close()
                                    },
                                    style: {
                                        backgroundColor: "#990000",
                                        marginRight: "1rem",
                                        color: "white",
                                    },
                                },
                                {
                                    label: "No",
                                    onClick: () => {
                                        alert.close()
                                    },
                                },
                            ],
                        })}/>
                </td>
            </tr>
        );
    }

    // useEffect(() => {
    //   if (admin === null || admin.role !== 'ADMIN')
    //     navigate('/signin')
    //   else {
    //     refresh(dispatch)
    //   }
    // }, [admin])

    return (
        <div className="subjects" >
            <div className="container">
                <DashboardHeader admin={admin} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={reportCard} title={'Matières'} count={subjects.length} />

                <div className="actions">
                    <Button text={'New'} />
                    <Button text={"Refresh"} margin='0 1rem' bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={() => refresh} isLoading={isRefreshing} size={'25px'} />
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
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Coefficient</th>
                                        <th>Nom de la matière</th>
                                        <th>Enseignants</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Pagination data={subjects} RenderComponent={TeacherRow} pageLimit={1} dataLimit={5} tablePagination={true} />
                                </tbody>
                            </table>
                    }
                </div>

            </div>
        </div>
    );
};

export default Subjects;
