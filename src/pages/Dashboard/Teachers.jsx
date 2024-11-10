import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/teachers.css";

import { useAlert } from 'react-alert-with-buttons'
import { DeleteOutline, Logout, Person2Outlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { AdminRow } from "../../components/Utils/TableRows/TableRows";
import Loader from "../../components/Loader/Loader.jsx";
import { Player } from "@lordicon/react";
import { folderOrange } from "../../assets/lordicons/index.js";

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
        },
        {
            id: 2,
            firstName: 'Essi',
            lastName: 'Junior',
            email: 'essi@gmail.com',
            phone_number: '0612345678',
        },
        {
            id: 3,
            firstName: 'Essi',
            lastName: 'Junior',
            email: 'essi@gmail.com',
            phone_number: '0612345678',
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

    function AdminRow({ id, firstName, lastName, email, phone_number }) {
        return (
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone_number}</td>
                <td className="option-buttons option">
                    <div className="delete-admin" onClick={() =>
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
                        })}>
                        <DeleteOutline />Delete
                    </div>

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
                <header>
                    <div className="texts">
                        {
                            admin === null ?
                                <Skeleton variant="rectangular" width='100%' height={25} /> :
                                <Typography text={`Hi ${admin}`} />
                        }
                        <Typography text={'Enseignants'} className='title' />
                    </div>

                    <Tooltip title='Logout' placement='bottom'>
                        <div className='logout' onClick={(e) => handleLogout(e)}>
                            {
                                isLogingOut ?
                                    <Loader size='25px' /> :
                                    <Logout />
                            }
                        </div>
                    </Tooltip>
                </header>
                <section className="stats">
                    <section className="numbers">
                        {

                            isRefreshing ?
                                <Skeleton variant="rectangular" width='100%' height={100} /> :
                                <aside className="products">
                                    <div className="icon">
                                        <Player
                                            ref={null}
                                            icon={folderOrange}
                                            size={40}
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography text={'Enseignants'} className='title' />
                                        <Typography text={`100+`} />
                                    </div>
                                </aside>
                        }
                    </section>
                </section>

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
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Pagination data={teachers} RenderComponent={AdminRow} pageLimit={1} dataLimit={5} tablePagination={true} />
                                </tbody>
                            </table>
                    }
                </div>

            </div>
        </div>
    );
};

export default Teachers;
