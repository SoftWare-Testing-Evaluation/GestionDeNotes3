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

import ModalContainer from "../../components/ModalContainer.jsx";
import StudentForm from "../../components/Forms/StudentForm.jsx";
const Hours = () => {
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
            matricule: '18KHD0',
            firstName: 'NDANG ESSI',
            lastName: 'Pierre Junior',
            hours: 10,
            option: 'ESP',
            classe: 'Quatrième (4e)',
        },
        {
            id: 2,
            matricule: '18KHD0',
            firstName: 'Maths',
            lastName: 'Pierre Junior',
            hours: 10,
            option: 'ESP',
            classe: 'Quatrième (4e)',
        },
        {
            id: 3,
            matricule: '18KHD0',
            firstName: 'French',
            lastName: 'Pierre Junior',
            hours: 10,
            option: null,
            classe: 'Sixième (6e)',
        },
        {
            id: 4,
            matricule: '18KHD0',
            firstName: 'English',
            lastName: 'Pierre Junior',
            hours: 10,
            option: 'ESP',
            classe: 'Sixième (6e)',
        },
        {
            id: 5,
            matricule: '18KHD0',
            firstName: 'Maths',
            lastName: 'Pierre Junior',
            hours: 10,
            option: 'ALL',
            classe: 'Sixième (6e)',
        },
        {
            id: 6,
            matricule: '18KHD0',
            firstName: 'Maths',
            lastName: 'Pierre Junior',
            hours: 10,
            option: 'ESP',
            classe: 'Terminale (Tle)',
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

    function TeacherRow({ id, matricule, firstName, lastName, hours,  option }) {

        return (
            <tr>
                <td>{id}</td>
                <td>{matricule}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{hours}</td>
                <td>{option}</td>

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
                        })} />
                </td>
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
                <DashboardHeader admin={admin} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={reportCard} title={'Heures d\'absence elèves'} count={students.length} classe={classe} />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions h-full">
                        <Button text={"Rafraishir"} bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={() => refresh} isLoading={isRefreshing} size={'25px'} />
                    </div>
                    <div>
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
                                            <th>ID</th>
                                            <th>Matricule</th>
                                            <th>Nom(s)</th>
                                            <th>Prenom(s)</th>
                                            <th>Heures d'absence</th>
                                            <th>Specialité</th>
                                            <th></th>
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

export default Hours;
