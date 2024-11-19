import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/teachers.css";

import { useAlert } from 'react-alert-with-buttons'
import { DeleteOutline, EditOutlined, Logout, Person2Outlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
import TeacherForm from '../../components/Forms/TeacherForm.jsx'
import  ModalContainer from "../../components/ModalContainer.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import {  teacher } from "../../assets/lordicons/index.js";

const Teachers = () => {
    //State for translation
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);

    const admin = 'Essi Junior'
    // const navigate = useNavigate()

    const teachers = [
        {
            id: 1,
            firstName: 'Essi',
            lastName: 'Junior',
            email: 'essi@gmail.com',
            phone_number: '0612345678',
            sex: 'M',
            age: '30',
            subjects: ['Maths', 'Physics', 'Chemistry', 'French'],
        },
        {
            id: 2,
            firstName: 'Essi',
            lastName: 'Junior',
            email: 'essi@gmail.com',
            phone_number: '0612345678',
            sex: 'M',
            age: '30',
            subjects: ['Maths', 'Physics', 'Chemistry', 'French'],
        },
        {
            id: 3,
            firstName: 'Essi',
            lastName: 'Junior',
            email: 'essi@gmail.com',
            phone_number: '0612345678',
            sex: 'M',
            age: '30',
            subjects: ['Maths', 'Physics', 'Chemistry', 'French'],
        },
        {
            id: 4,
            firstName: 'Essi',
            lastName: 'Junior',
            email: 'essi@gmail.com',
            phone_number: '0612345678',
            sex: 'M',
            age: '30',
            subjects: ['Maths', 'Physics', 'Chemistry', 'French'],
        },
        {
            id: 5,
            firstName: 'EKO',
            lastName: 'Samuela',
            email: 'eko@gmail.com',
            phone_number: '0612345678',
            sex: 'F',
            age: '30',
            subjects: ['French'],
        },
        {
            id: 6,
            firstName: 'Essi',
            lastName: 'Junior',
            email: 'essi@gmail.com',
            phone_number: '0612345678',
            sex: 'M',
            age: '30',
            subjects: ['Maths', 'Physics', 'French'],
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

    function TeacherRow({ id, firstName, lastName, email, phone_number, sex, age, subjects }) {
        return (
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone_number}</td>
                <td>{sex}</td>
                <td>{age}</td>
                <td>
                    {
                        subjects.map((subject, index) => (
                            <p key={index}>{subject}</p>
                        ))
                    }
                </td>
                <td className="option-buttons option  py-2 ">
                    <EditOutlined className="bg-emerald-300 text-emerald-800 rounded-full p-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" />

                    <DeleteOutline className="bg-red-300 text-red-800 rounded-full p-2 hover:bg-red-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer ml-2" onClick={() =>
                        alert.open({
                            message: `Really delete, ${firstName} ${lastName} ?`,
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

    // useEffect(() => {
    //   if (admin === null || admin.role !== 'ADMIN')
    //     navigate('/signin')
    //   else {
    //     refresh(dispatch)
    //   }
    // }, [admin])

    return (
        <div className="teachers" >
            <div className="container">
                <DashboardHeader admin={admin} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={teacher} title={'Enseignants'} count={teachers.length} />

                <div className="actions">
                    <ModalContainer triggerText={'Nouveau'} formToDisplay={<TeacherForm />} />
                    <Button text={"Rafraishir"} margin='0 1rem' bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={() => refresh} isLoading={isRefreshing} size={'25px'} />
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
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Sexe</th>
                                        <th>Age</th>
                                        <th>Matieres</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Pagination data={teachers} RenderComponent={TeacherRow} pageLimit={1} dataLimit={5} tablePagination={true} />
                                </tbody>
                            </table>
                    }
                </div>

            </div>
        </div>
    );
};

export default Teachers;
