import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/classes.css";

import { useAlert } from 'react-alert-with-buttons'
import { ArrowRightAlt, DeleteOutline, EditOutlined, Logout, Person2Outlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { TeacherRow } from "../../components/Utils/TableRows/TableRows";
import Loader from "../../components/Loader/Loader.jsx";
import { Player } from "@lordicon/react";
import { folderOrange, teacher } from "../../assets/lordicons/index.js";
import { classes, onPlayPress } from "../../utils/utilities.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";

const Classes = () => {
    //State for translation
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);

    const admin = 'Essi Junior'
    // const navigate = useNavigate()

    const classesList = [
        {
            id: 1,
            name: classes[0],
            students: 50,
            bill: 90000,
        },
        {
            id: 2,
            name: classes[1],
            students: 50,
            bill: 100000,
        },
        {
            id: 3,
            name: classes[2],
            students: 50,
            bill: 110000,
        },
        {
            id: 4,
            name: classes[3],
            students: 50,
            bill: 120000,
        },
        {
            id: 5,
            name: classes[4],
            students: 50,
            bill: 130000,
        },
        {
            id: 6,
            name: classes[5],
            students: 50,
            bill: 140000,
        },
        {
            id: 7,
            name: classes[6],
            students: 50,
            bill: 150000,
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

    function TeacherRow({ id, name, students, bill }) {
        return (
            <tr>
                <td>
                    <Link to={'/students'} className="flex items-center justify-center bg-emerald-300 hover:bg-emerald-400 [&>*]:hover:text-white ease-in-out duration-300 hover:scale-110 cursor-pointer">
                        <ArrowRightAlt className="text-emerald-800  !w-[35px] !h-[35px] " />
                        <span className="text-2xl">Acceder</span>
                    </Link>
                </td>
                <td>{id}</td>
                <td className="text-xl">{name}</td>
                <td>{students}</td>
                <td>{bill}</td>
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

    // useEffect(() => {
    //   if (admin === null || admin.role !== 'ADMIN')
    //     navigate('/signin')
    //   else {
    //     refresh(dispatch)
    //   }
    // }, [admin])

    return (
        <div className="classes" >
            <div className="container">
                <DashboardHeader admin={admin} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={teacher} title={'Classes'} count={classes.length} />


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
                                        <th></th>
                                        <th>ID</th>
                                        <th>Nom</th>
                                        <th>Effectif</th>
                                        <th>Scolarité(XAF)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Pagination data={classesList} RenderComponent={TeacherRow} pageLimit={1} dataLimit={10} tablePagination={true} />
                                </tbody>
                            </table>
                    }
                </div>

            </div>
        </div>
    );
};

export default Classes;
