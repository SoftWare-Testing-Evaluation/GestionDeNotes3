import React, { useState, useEffect, rUseref, useRef } from "react";
// import { useNavigate } from "react-router-dom";

import "../../styles/Dashboard/students.css";

import { useAlert } from 'react-alert-with-buttons'
import { ArrowRightAlt, DeleteOutline, Download, EditOutlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { TeacherRow } from "../../components/Utils/TableRows/TableRows";
import { classes, onPlayPress, sequences } from "../../utils/utilities.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import { students } from "../../assets/lordicons/index.js";
import SNMSelect from "../../components/SNMSelect/SNMSelect.jsx";
import { useReactToPrint } from "react-to-print";

const ReportCards = () => {
    //State for translation
    const navigate = useNavigate()
    const contentRef = useRef(null);
    const handlePrint = useReactToPrint({ contentRef });

    const [isLoading, setIsLoading] = useState(false);
    const [classe, setClasse] = useState(localStorage.getItem('class'));
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [student, setStudent] = useState('ELEVE');
    const [studentsArr, setStudentsArr] = useState([]);
    const [sequence, setSequence] = useState(sequences[0]);
    const [isLogingOut, setIsLogingOut] = useState(false);

    const admin = 'Essi Junior'
    // const navigate = useNavigate()

    const results = [
        {
            id: 1,
            literatureSubjects: [
                {
                    subject: 'Geography',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [10, 11, 12, 13, 14, 15],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
                {
                    subject: 'History',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
            ],
            scientificSubjects: [
                {
                    subject: 'Maths',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
                {
                    subject: 'Chemistry',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
            ],
            generalSubjects: [
                {
                    subject: 'Cathe',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
                {
                    subject: 'TP',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
            ],
            student: 'NDANG ESSI Pierre Junior',
            classe: classes[0],
        },
        {
            id: 2,
            literatureSubjects: [
                {
                    subject: 'Geography',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
                {
                    subject: 'History',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
            ],
            scientificSubjects: [
                {
                    subject: 'Maths',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
                {
                    subject: 'Chemistry',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
            ],
            generalSubjects: [
                {
                    subject: 'Cathe',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
                {
                    subject: 'TP',
                    coef: 0,
                    teacher: 'ESSI MVONDO ',
                    sequences: [0, 0, 0, 0, 0, 0],
                    competence: 'Avoir ...',
                    visa: ',.....'
                },
            ],
            student: 'MABOU WABO Elfied',
            classe: classes[0],
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

    useEffect(() => {
        let res = results.filter(elt => elt.classe === classe).map(elt => elt.student)
        setStudentsArr(res)

        console.log(results.filter(elt => elt.classe === classe).filter(elt => elt.student === student)[0])
    }, [classe, student])

    function TeacherRow({ id, generalSubjects, student, }) {

        return (
            <tr>
                <td>{id}</td>
                <td>{id}</td>
                <td>{id}</td>
                <td>{id}</td>
                <td>{id}</td>
                <td>{id}</td>
                <td>{id}</td>

                <td className="option-buttons option flex items-center justify-center py-2 px-4 gap-2 ">
                    <Tooltip title='Modifier' placement='top'>
                        <EditOutlined className="bg-emerald-300 text-emerald-800 rounded-full p-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" />
                    </Tooltip>
                </td>
            </tr>
        );
    }
    const handleClasse = (
        event,
        newValue,
        type
    ) => {
        console.log(newValue);
        setClasse(newValue);
    };
    const handleEleve = (
        event,
        newValue,
        type
    ) => {
        console.log(newValue);
        setStudent(newValue);
    };
    const handleSequence = (
        event,
        newValue,
        type
    ) => {
        console.log(newValue);
        setSequence(newValue);
    };

    return (
        <div className="students" >
            <div className="container">
                <DashboardHeader admin={admin} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={students} title={sequence + ' de l\'élève ' + student} count={results.length} classe={classe} />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions !w-auto">
                        <Button text={"Rafraishir"} bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={() => refresh} isLoading={isRefreshing} size={'25px'} />
                    </div>
                </div>

                <div className="flex my-5 p-3 !justify-between bg-orange-100 w-[95%]">
                    <div className="flex">
                        <SNMSelect label={'Classe'} placeholder={'Choisir la classe'} options={classes} handleChange={handleClasse} />
                        <SNMSelect label={'Elève'} placeholder={'Choisir l\'élève'} options={studentsArr} handleChange={handleEleve} className={'ml-10'} />
                        <SNMSelect label={'Séquence'} placeholder={'Choisir la séquence'} options={sequences} handleChange={handleSequence} className={'ml-10'} />
                    </div>

                    <div className="flex items-center justify-center bg-emerald-300 hover:bg-emerald-400 [&>*]:hover:text-white ease-in-out duration-300 hover:scale-110 cursor-pointer py-5 px-10" onClick={handlePrint}>
                        <Download className="text-emerald-800  !w-[35px] !h-[35px] " />
                        <span className="text-3xl font-bold">Imprimer</span>
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
                                        <tr className="[&>*]:uppercase">
                                            <th>Matière/enseignant</th>
                                            {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                <th>{sequences[sequences.indexOf(sequence) - 1]}</th>
                                            }
                                            <th>{sequence}</th>
                                            {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                <th>trim</th>
                                            }
                                            <th>cf</th>
                                            <th>total</th>
                                            <th>compétence(s) visée(s)</th>
                                            <th>App/Visa Prof</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            results.filter(elt => elt.classe === classe).filter(elt => elt.student === student)[0]?.literatureSubjects.map((result, index) => (
                                                <tr key={index}>
                                                    <td className="flex flex-col items-center">
                                                        <span className="text-2xl font-semibold">{result.subject}</span>
                                                        <span>{result.teacher}</span>
                                                    </td>
                                                    {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                        <td>{result.sequences[sequences.indexOf(sequence) - 1]}</td>
                                                    }
                                                    <td>{result.sequences[sequences.indexOf(sequence)]}</td>

                                                    {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                        <td>{(result.sequences[sequences.indexOf(sequence)] + result.sequences[sequences.indexOf(sequence) - 1]) / 2}</td>
                                                    }
                                                    <td>{result.coef}</td>
                                                    <td>{result.sequences[sequences.indexOf(sequence)] * result.coef}</td>
                                                    <td>{result.competence}</td>
                                                    <td>{result.visa}</td>
                                                    <td className="option-buttons option flex items-center justify-center py-2 px-4 gap-2 ">
                                                        <Tooltip title='Modifier' placement='top'>
                                                            <EditOutlined className="bg-emerald-300 text-emerald-800 rounded-full px-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td aria-colspan={'100%'} className="!bg-secondary text-white">
                                                Matieres literraires
                                            </td>
                                        </tr>
                                        {
                                            results.filter(elt => elt.classe === classe).filter(elt => elt.student === student)[0]?.scientificSubjects.map((result, index) => (
                                                <tr key={index}>
                                                    <td className="flex flex-col items-center">
                                                        <span className="text-2xl font-semibold">{result.subject}</span>
                                                        <span>{result.teacher}</span>
                                                    </td>
                                                    {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                        <td>{result.sequences[sequences.indexOf(sequence) - 1]}</td>
                                                    }
                                                    <td>{result.sequences[sequences.indexOf(sequence)]}</td>

                                                    {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                        <td>{(result.sequences[sequences.indexOf(sequence)] + result.sequences[sequences.indexOf(sequence) - 1]) / 2}</td>
                                                    }
                                                    <td>{result.coef}</td>
                                                    <td>{result.sequences[sequences.indexOf(sequence)] * result.coef}</td>
                                                    <td>{result.competence}</td>
                                                    <td>{result.visa}</td>
                                                    <td className="option-buttons option flex items-center justify-center py-2 px-4 gap-2 ">
                                                        <Tooltip title='Modifier' placement='top'>
                                                            <EditOutlined className="bg-emerald-300 text-emerald-800 rounded-full px-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td aria-colspan={'100%'} className="!bg-secondary text-white">
                                                Matieres scientifiques
                                            </td>
                                        </tr>
                                        {
                                            results.filter(elt => elt.classe === classe).filter(elt => elt.student === student)[0]?.generalSubjects.map((result, index) => (
                                                <tr key={index}>
                                                    <td className="flex flex-col items-center">
                                                        <span className="text-2xl font-semibold">{result.subject}</span>
                                                        <span>{result.teacher}</span>
                                                    </td>
                                                    {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                        <td>{result.sequences[sequences.indexOf(sequence) - 1]}</td>
                                                    }
                                                    <td>{result.sequences[sequences.indexOf(sequence)]}</td>

                                                    {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                        <td>{(result.sequences[sequences.indexOf(sequence)] + result.sequences[sequences.indexOf(sequence) - 1]) / 2}</td>
                                                    }
                                                    <td>{result.coef}</td>
                                                    <td>{result.sequences[sequences.indexOf(sequence)] * result.coef}</td>
                                                    <td>{result.competence}</td>
                                                    <td>{result.visa}</td>
                                                    <td className="option-buttons option flex items-center justify-center py-2 px-4 gap-2 ">
                                                        <Tooltip title='Modifier' placement='top'>
                                                            <EditOutlined className="bg-emerald-300 text-emerald-800 rounded-full px-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td aria-colspan={'100%'} className="!bg-secondary text-white">
                                                Matieres complementaires
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                    }
                </div>

            </div>

            <div style={{ display: "none" }}>
                <div className="py-5" ref={contentRef} style={{ fontSize: "1.5rem", padding: "1.5rem" }}>
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
                                                {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                    <th>{sequences[sequences.indexOf(sequence) - 1]}</th>
                                                }
                                                <th>{sequence}</th>
                                                {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                    <th>trim</th>
                                                }
                                                <th>cf</th>
                                                <th>total</th>
                                                <th>compétence(s) visée(s)</th>
                                                <th>App/Visa Prof</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                results.filter(elt => elt.classe === classe).filter(elt => elt.student === student)[0]?.literatureSubjects.map((result, index) => (
                                                    <tr key={index}>
                                                        <td className="flex flex-col items-center">
                                                            <span className="text-2xl font-semibold">{result.subject}</span>
                                                            <span>{result.teacher}</span>
                                                        </td>
                                                        {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                            <td>{result.sequences[sequences.indexOf(sequence) - 1]}</td>
                                                        }
                                                        <td>{result.sequences[sequences.indexOf(sequence)]}</td>

                                                        {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                            <td>{(result.sequences[sequences.indexOf(sequence)] + result.sequences[sequences.indexOf(sequence) - 1]) / 2}</td>
                                                        }
                                                        <td>{result.coef}</td>
                                                        <td>{result.sequences[sequences.indexOf(sequence)] * result.coef}</td>
                                                        <td>{result.competence}</td>
                                                        <td>{result.visa}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td aria-colspan={'100%'} className="!bg-secondary text-white">
                                                    Matieres literraires
                                                </td>
                                            </tr>
                                            {
                                                results.filter(elt => elt.classe === classe).filter(elt => elt.student === student)[0]?.scientificSubjects.map((result, index) => (
                                                    <tr key={index}>
                                                        <td className="flex flex-col items-center">
                                                            <span className="text-2xl font-semibold">{result.subject}</span>
                                                            <span>{result.teacher}</span>
                                                        </td>
                                                        {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                            <td>{result.sequences[sequences.indexOf(sequence) - 1]}</td>
                                                        }
                                                        <td>{result.sequences[sequences.indexOf(sequence)]}</td>

                                                        {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                            <td>{(result.sequences[sequences.indexOf(sequence)] + result.sequences[sequences.indexOf(sequence) - 1]) / 2}</td>
                                                        }
                                                        <td>{result.coef}</td>
                                                        <td>{result.sequences[sequences.indexOf(sequence)] * result.coef}</td>
                                                        <td>{result.competence}</td>
                                                        <td>{result.visa}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td aria-colspan={'100%'} className="!bg-secondary text-white">
                                                    Matieres scientifiques
                                                </td>
                                            </tr>
                                            {
                                                results.filter(elt => elt.classe === classe).filter(elt => elt.student === student)[0]?.generalSubjects.map((result, index) => (
                                                    <tr key={index}>
                                                        <td className="flex flex-col items-center">
                                                            <span className="text-2xl font-semibold">{result.subject}</span>
                                                            <span>{result.teacher}</span>
                                                        </td>
                                                        {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                            <td>{result.sequences[sequences.indexOf(sequence) - 1]}</td>
                                                        }
                                                        <td>{result.sequences[sequences.indexOf(sequence)]}</td>

                                                        {(sequence === 'ES2' || sequence === 'ES4' || sequence === 'ES6') &&
                                                            <td>{(result.sequences[sequences.indexOf(sequence)] + result.sequences[sequences.indexOf(sequence) - 1]) / 2}</td>
                                                        }
                                                        <td>{result.coef}</td>
                                                        <td>{result.sequences[sequences.indexOf(sequence)] * result.coef}</td>
                                                        <td>{result.competence}</td>
                                                        <td>{result.visa}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td aria-colspan={'100%'} className="!bg-secondary text-white">
                                                    Matieres complementaires
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportCards;
