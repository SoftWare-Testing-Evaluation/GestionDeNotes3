import React from 'react';
import Typography from '../Typography/Typography.jsx';
import dayjs from 'dayjs';

const StudentInfo = ({ student, selectedClass, totalStudents }) => {
     // Fonction pour formater la date
     const formatDate = (date) => {
        return dayjs(date).format('DD/MM/YYYY');
    };
    // Fonction pour obtenir le sexe sous forme lisible
    const formatSexe = (sexe) => {
        return sexe === 'F' ? 'Féminin' : sexe === 'M' ? 'Masculin' : 'Inconnu';
    };
    return (
         <div className="flex  p-2 !justify-between bg-[#fdba74] w-[100%]">
            <div style={{ display: 'flex', flexDirection: 'column' }} className="w-[40%] ">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: '15px' }} text={"Nom et Prénom:"} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={`${student ? student.nom : ''} ${student ? student.prenom : ''}`} isGradient={false} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: '15px' }} text={"Né(e) le:"} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={student ? formatDate(student.dateNaissance) : ''} isGradient={false} />
                    <Typography style={{ fontSize: '15px' }} text={"à:"} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={student ? student.lieuNaissance : ''} isGradient={false} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column',marginRight:'2px' }} className="w-[20%] ">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: '15px' }} text={"Matricule:"} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={student ? student.matricule : ''} isGradient={false} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: '15px' }} text={"Genre: "} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={student ? formatSexe(student.sexe) : ''} isGradient={false} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginRight:'2px'}} className="w-[28%] ">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: '15px' }} text={"Classe:"} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={selectedClass ? selectedClass.nom : 'Classe inconnue'} isGradient={false} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: '15px' }} text={"Statut: "} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={student ? student.statut || '' : ''} isGradient={false} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column',marginRight:'2px' }} className="w-[10%] ">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: '15px' }} text={"Effectif:"} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={totalStudents} isGradient={false} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: '15px' }} text={"Redt: "} isGradient={false} />
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }} text={student ? student.Inscriptions[0]?.redoublant : ''} isGradient={false} />
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;
