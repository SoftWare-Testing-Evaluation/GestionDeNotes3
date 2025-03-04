import React from 'react';
import Typography from '../Typography/Typography.jsx';

const ReportHeader = ({ telephone, anneeprecedent, annee, logo }) => {
    return (
        
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' ,padding:'12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '35%',alignItems:'center' ,padding:'5px',height:'100%' }}>
               <div> 
                <Typography style={{ fontWeight: 'bold', fontSize: '14px', textTransform:'uppercase' }} text="République du Cameroun" isGradient={false} />
               </div>
               <div>
                <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="Paix-Travail-Patrie" isGradient={false} />
               </div>
               <div>
                <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="*****" isGradient={false} />
               </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="Ministère de l'enseignement supérieur" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="université de yaoundé 1" isGradient={false} />
                </div>
            </div>
            <div style={{ width: '20%',align:'center'

            }} >
                <img src={logo} alt="Logo" style={{ width: '100%', height: '70%'}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column',width: '35%',alignItems:'center' ,padding:'5px',height:'100%' }}>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="REPUBLIC OF CAMEROON" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="Peace-Work-Fatherland" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text={"*****"} isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="MINISTRY OF HIGHER EDUCATION" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="UNIVERSITY OF YAOUNDE 1" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text={"FACULTY OF SCIENCE"} isGradient={false} />
                </div>
            </div>
        </div>
    );
}

export default ReportHeader;
