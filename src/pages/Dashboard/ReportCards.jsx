import React, { useState, useEffect, rUseref } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/students.css";

import { useAlert } from 'react-alert-with-buttons'
import { DeleteOutline, Download, EditOutlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { TeacherRow } from "../../components/Utils/TableRows/TableRows";
import { classes, onPlayPress } from "../../utils/utilities.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import { students } from "../../assets/lordicons/index.js";
import SNMSelect from "../../components/SNMSelect/SNMSelect.jsx";
import  ModalContainer from "../../components/ModalContainer.jsx";
import User from "../../components/Forms/User.jsx";

const ReportCards = () => {
    //State for translation
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [classe, setClasse] = useState(localStorage.getItem('class'));
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);

    const admin = 'Essi Junior'
    // const navigate = useNavigate()

    const reportCards = [
        {
            id: 1,
            matricule: '18KHD0',
            firstName: 'NDANG ESSI',
            lastName: 'Pierre Junior',
            birthDate: '15-01-1997',
            birthPlace: 'Ngaoundere',
            sex: 'M',
            option: 'ESP',
            classe: 'Quatrième (4e)',
            nationality: 'ESP',
            emergencyContacts: '697-938-349',
        },
        {
            id: 2,
            matricule: '18KHD0',
            firstName: 'Maths',
            lastName: 'Pierre Junior',
            birthDate: '15-01-1997',
            birthPlace: 'Ngaoundere',
            sex: 'M',
            option: 'ESP',
            classe: 'Quatrième (4e)',
            nationality: 'ESP',
            emergencyContacts: '697-938-349',
        },
        {
            id: 3,
            matricule: '18KHD0',
            firstName: 'French',
            lastName: 'Pierre Junior',
            birthDate: '15-01-1997',
            birthPlace: 'Ngaoundere',
            sex: 'M',
            option: 'ESP',
            classe: 'Sixième (6e)',
            nationality: 'ESP',
            emergencyContacts: '697-938-349',
        },
        {
            id: 4,
            matricule: '18KHD0',
            firstName: 'English',
            lastName: 'Pierre Junior',
            birthDate: '15-01-1997',
            birthPlace: 'Ngaoundere',
            sex: 'M',
            option: 'ESP',
            classe: 'Sixième (6e)',
            nationality: 'ESP',
            emergencyContacts: '697-938-349',
        },
        {
            id: 5,
            matricule: '18KHD0',
            firstName: 'Maths',
            lastName: 'Pierre Junior',
            birthDate: '15-01-1997',
            birthPlace: 'Ngaoundere',
            sex: 'M',
            option: 'ESP',
            classe: 'Sixième (6e)',
            nationality: 'ESP',
            emergencyContacts: '697-938-349',
        },
        {
            id: 6,
            matricule: '18KHD0',
            firstName: 'Maths',
            lastName: 'Pierre Junior',
            birthDate: '15-01-1997',
            birthPlace: 'Ngaoundere',
            sex: 'M',
            option: 'ESP',
            classe: 'Terminale (Tle)',
            nationality: 'ESP',
            emergencyContacts: '697-938-349',
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

    function TeacherRow({ id, matricule, firstName, lastName, birthDate, birthPlace, sex, option, nationality, emergencyContacts }) {

        return (
            <tr>
                <td>{matricule}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{birthDate} à {birthPlace}</td>
                <td>{sex}</td>
                <td>{option}</td>
                <td>{nationality}</td>
                <td>{emergencyContacts}</td>

                <td className="option-buttons option flex items-center justify-center py-2 gap-2 ">

                    <Tooltip title='Afficher' placement='top'>
                        <Download className="bg-emerald-300 text-emerald-800 rounded-full p-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" />
                    </Tooltip>

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
                <DashboardHeader admin={admin} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={students} title={'Elèves'} count={reportCards.length} classe={classe} />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions !w-auto">
                        <ModalContainer triggerText={'Nouveau'} formToDisplay={<User role='MARCHAND' />}/>

                        <Button text={"Rafraishir"} margin='0 1rem' bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={() => refresh} isLoading={isRefreshing} size={'25px'} />
                    </div>
                </div>

                <div className="flex my-5 p-3 !justify-start bg-orange-100 w-[95%]">
                    <SNMSelect label={'Classe'} placeholder={'choisir la classe'} options={classes} handleChange={handleChange} className={'mr-5'} />
                    <SNMSelect label={'Elève'} placeholder={'choisir l\'élève'} options={classes} handleChange={handleChange} className={'ml-5'} />
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
                                        <tr className="[&>*]:uppercase">
                                            <th>Matière/enseignant</th>
                                            <th>es1</th>
                                            <th>trim</th>
                                            <th>cf</th>
                                            <th>total</th>
                                            <th>compétence(s) visée(s)</th>
                                            <th>App/Visa Prof</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Pagination data={reportCards.filter(elt => elt.classe === classe)} RenderComponent={TeacherRow} pageLimit={1} dataLimit={5} tablePagination={true} />
                                    </tbody>
                                </table>

                            </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default ReportCards;
