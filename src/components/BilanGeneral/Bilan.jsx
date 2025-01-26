import React from 'react';
import dayjs from 'dayjs';
import Typography from '../Typography/Typography.jsx';

const Bilan = ({
    selectedSequence,
    totalPoints,
    totalCoef,
    studentRank,
    classAverage,
    classMin,
    classMax,
    getMention
}) => {
    const formattedDate = dayjs().format('DD/MM/YY'); // Format de la date

    return (
        <>
            <div className=" flex !justify-between items-center w-full">
  <div className="w-[30%]">
    <table className="w-full h-full">
      
        <tr>
          <th colSpan={3} className="!bg-secondary text-white uppercase font-bold py-3">
            BILAN DISCIPLINAIRE
          </th>
        </tr>
      
      <tbody>
        <tr>
          <td className="py-16"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="w-[68%]">
    <table className="w-full h-full">
      
        <tr>
            {(selectedSequence === 'seq2'||selectedSequence === 'seq4'||selectedSequence === 'seq6') && <th colSpan={4} className="!bg-secondary text-white uppercase font-bold py-2">Résultats trimestriels </th> }
            {(selectedSequence === 'seq1'||selectedSequence === 'seq3'||selectedSequence === 'seq5') && <th colSpan={4} className="!bg-secondary text-white uppercase font-bold py-2">Résultats séquentiels</th> }
          
        </tr>
      <tbody>
      
        <tr>
          <td className="py-2">
            <table className="w-full">
            <tr >
                <th colSpan={4} className="!bg-black text-white uppercase font-bold ">élève</th>
            </tr>
            <tbody>
              <tr>
                <td >T.Points</td>
                <td >T.coef</td>
                <td >Moy</td>
                <td>Rg</td>
              </tr>
              <tr>
                <td >{totalPoints.toFixed(2)}</td>
                <td >{totalCoef.toFixed(2)}</td>
                <td >{totalCoef ? (totalPoints / totalCoef).toFixed(2) : '-'}</td>
                <td>{studentRank}</td>
              </tr>
              
              </tbody>
            </table>

          </td>
          <td className="py-2">
            <table className="w-full">
                <tr >
                    <th colSpan={3} className="!bg-black text-white uppercase font-bold ">classe</th>
                </tr>
            <tbody>
              <tr>
                <td >Moy</td>
                <td  >Min</td>
                <td >Max</td>
              </tr>
              <tr>
                <td >{classAverage.toFixed(2)}</td>
                <td >{classMin.toFixed(2)}</td>
                <td >{classMax.toFixed(2)}</td>
              </tr>
              </tbody>
            </table>
          </td>
          <td className="py-2">
          <table className="w-full">
            <tr >
                <th colSpan={2} className="!bg-black text-white uppercase font-bold ">mention</th>
            </tr>
            <tbody>
            <tr>
                <td className="py-4  uppercase">{getMention(totalCoef ? (totalPoints / totalCoef).toFixed(2) : '-')}</td>
                
            </tr>
          </tbody>
          </table> 
          </td>

        </tr>
        <tr className="pd-2">  
                <td colSpan={1} className="uppercase font-bold py-2">
                    APPRECIATION GENERALE
                </td>
                <td colSpan={2} className="!bg-secondary  font-bold py-2">
                {getMention(totalCoef ? (totalPoints / totalCoef).toFixed(2) : '-')}
                </td>
        </tr>
      </tbody>
    </table>
  </div>
 
</div>
<div className="w-[100%] mt-2">
            <Typography style={{fontSise:'12px'}} text={"NA => {Compétence(s) Non Acquis(es)}; ECA => {Compétence(s) en cours d'acquisition}"} isGradient={false}/> 
            <Typography style={{fontSise:'12px'}} text={"AC => {Compétence(s) Acquis(es)}; EX => {Expert}"} isGradient={false}/>     
            <hr style={{ 
        width: '100%',        // S'adapte à la largeur du conteneur
        border: 'none',      // Supprime le style par défaut
        height: '3px',       // Épaisseur de la ligne
        backgroundColor: 'black' // Couleur de la ligne
    }} />
</div>
<div className="flex w-[100%] !justify-between font-bold mt-4">
    <div>
    <Typography style={{fontSize:'16px'}} text={"Le parent"} isGradient={false}/> 
    </div>
    <div className="flex flex-col">
    <Typography style={{fontSize:'16px'}} text={`Fait à KYE-OSSI, le ${formattedDate}`} isGradient={false}/> 
    <Typography style={{fontSize:'16px'}} text={"le Principal"} isGradient={false}/> 
    </div>

</div>
        </>
    );
};

export default Bilan;
