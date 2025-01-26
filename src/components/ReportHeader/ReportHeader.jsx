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
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="Ministère des Enseignements Secondaires" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="Délégation Régionale du Sud" isGradient={false} />
                </div>
            </div>
            <div style={{ width: '20%',height:'100%'}} >
                <img src={logo} alt="Logo" style={{ width: '100%', height: '100%'}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column',width: '35%',alignItems:'center' ,padding:'5px',height:'100%' }}>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="DIOCESE D'EBOLOWA" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="COLLEGE MGR NKOU" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="Ora et Labora" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text={`Téléphone: ${telephone}`} isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text="------------------" isGradient={false} />
                </div>
                <div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '14px' }} text={`Année Scolaire: ${anneeprecedent}/${annee}`} isGradient={false} />
                </div>
            </div>
        </div>
    );
}

export default ReportHeader;
