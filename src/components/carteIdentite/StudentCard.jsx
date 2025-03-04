import React from "react";
import dayjs from "dayjs";

const StudentCard = ({ students, logo,selectedClasse,anneeprecedent,annee,user }) => {
    return (
        <div className="">
        {students.map((student, index) => (
            <div key={student.id} className="student-card w-[100%] h-[20%] m-[5px] p-[5px] " >
                 
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-[50%]">
                        <div className="w-[100%]">
                            <p style={{fontSize:"7px",width:'100%',textTransform:'uppercase',fontWeight:'bold'}}>republique du cameroun</p>
                            <p style={{fontSize:"7px",width:'100%'}}>Paix-Travail-Patrie</p>
                            <p style={{fontSize:"7px",width:'100%',textTransform:'uppercase'}}>ministere de l'enseignement superieur</p>
                            <p style={{fontSize:"7px",width:'100%',textTransform:'uppercase'}}>université de yaoundé 1</p>
                            <p style={{fontSize:"7px",width:'100%',textTransform:'uppercase'}}>faculté des sciences</p>
                        </div>
                        <div className="flag" style={{ display: "flex",height: "8px",width: "100%" ,marginRight:'5px'}}>
                        <div style={{backgroundColor: "#4CAF50",flex: 1}}></div>
                        <div style={{backgroundColor: "#F44336",flex: 1,position: "relative"}}>
                            <div style={{color: "#FFC107",position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)" }}>&#9733;</div>
                        </div>
                        <div style={{backgroundColor: "#FFC107",flex: 1}}></div>
                        </div>
                    </div>
                    <div style={{marginRight:'5px'}} >
                    <img src={logo} alt="Logo" className="logo" />
                    </div>
                    <div className="flex flex-col w-[50%]">
                        <div className="w-[100%]">
                            <p style={{fontSize:"7px",width:'100%',textTransform:'uppercase',fontWeight:'bold'}}>republic of cameroon</p>
                            <p style={{fontSize:"7px",width:'100%'}}>Peace-Work-Fatherland</p>
                            <p style={{fontSize:"7px",width:'100%',textTransform:'uppercase'}}>ministry of heiger education</p>
                            <p style={{fontSize:"7px",width:'100%',textTransform:'uppercase'}}>university of yaounde 1</p>
                            <p style={{fontSize:"7px",width:'100%',textTransform:'uppercase'}}>faculty of science</p>
                        </div>
                        <div className="flag" style={{ display: "flex",height: "8px",width: "100%"}}>
                        <div style={{backgroundColor: "#4CAF50",flex: 1}}></div>
                        <div style={{backgroundColor: "#F44336",flex: 1,position: "relative"}}>
                            <div style={{color: "#FFC107",position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)" }}>&#9733;</div>
                        </div>
                        <div style={{backgroundColor: "#FFC107",flex: 1}}></div>
                        </div>
                    </div>
                    
                </div>
                <div className="w-[100%] mt-[5px]"> <h1 style={{fontWeight: 'bold',fontSize:'15px', width:"100%",color:'#093c69'}}>UNIVERSITE DE YAOUNDE 1</h1></div>
                    
                <div className="flex flex-row justify-between mb-[8px] ">
                
    <div className="w-[4%] h-[168px] mr-[2px] p-[2px] rounded-[4px] bg-red-500 flex items-center justify-center">
        <p className="font-bold text-[6px] uppercase text-white transform rotate-90 whitespace-nowrap">
            carte d'identite scolaire/school identity card
        </p>
    </div>

                    <div className="w-[30%] m-[0%] p-[0%] mb-[1px]">
                    <div style={{ width: '100px', height: '95px',align:'center'}} >
                     <img src={student.urlPhoto} alt={`${student.nom} ${student.prenom}`} style={{ width: '100%', height: '100%'}} />
                   
                    </div>
                    <div className="relative w-[100%] mt-[5px] p-[5px] flex flex-row">
{/* Signature */}
<div className="w-[50%] absolute inset-0">
  <img 
    src={user?.urlSignature||logo} 
    alt="signature" 
    className="logo" 
    style={{ width: '100%', height: '100%', opacity: 2 }} // Ajustez la valeur d'opacité ici
  />
</div>
{/* Conteneur de texte */}
<div className="w-[100%] h-[25px]  z-20"> {/* Assurez-vous que le texte soit au-dessus */}
  <div className="w-[100%]  p-[0px]">
    <h1 className="font-bold text-[6px] text-black w-full">Le Doyen/The Dean</h1>
  </div>
</div>
{/* Cachet */}
<div className="w-[50%] absolute inset-0 ml-[50%]">
    
  <img 
    src={user?.urlCachet||logo} 
    alt="cachet" 
    className="logo" 
    style={{ width: '100%', height: '100%', opacity: 2 }} // Ajustez la valeur d'opacité ici
  />
</div>
</div>
<p className="font-bold text-[8px] text-[#093c69] w-full">{user?.nom || 'Inconnue'} {user?.prenom || ''}</p>

                    </div>
                   
                    <div  className="w-[66%] flex flex-col">
                    
                    
                    <div className="w-[100%] items-start" >
    <div className="w-[100%] items-start p-[0%] m-[0%]  " >
    <img 
                        src={logo} 
                        alt="cachet" 
                        className="logo absolute" 
                        style={{ 
                            opacity: 0.3, // Rendre le cachet transparent
                            top: '60%', // Positionner à partir du milieu
                            left: '60%', // Centrer horizontalement
                            transform: 'translate(-50%, -50%)', // Ajuster pour centrer
                            pointerEvents: 'none' // Ignorer les événements de souris
                        }} 
                    />
         <div className="flex flex-row w-[100%] items-start p-[0%] m-[0%]  justify-between">
            <div className="text-left ml-2 w-[30%]"><p className="text-[10px]" >Matricule/matriculation:</p></div>
            <div className="text-rigth  w-[70%]"><h2 className="font-bold text-[10px] uppercase text-[#093c69] text-rigth ml-2">{student.matricule}</h2></div>
        </div>
        <div className="flex flex-row w-[100%] items-start p-[0%] m-[0%]  justify-between">
            <div className="text-left ml-2 w-[30%]"><p className="text-[10px]" >Nom/Name:</p></div>
            <div className="text-rigth  w-[70%]"><h2 className="font-bold text-[10px] uppercase text-[#093c69] text-rigth ml-2">{student.nom}</h2></div>
        </div>
        <div className="flex flex-row w-[100%] items-start p-[0%] m-[0%] ">
            <div className="text-left ml-2 w-[30%]"><p className="text-[10px]">Prénom/Surname:</p></div>
            <div className="text-rigth w-[70%]"><h2 className="font-bold text-[10px] uppercase text-[#093c69] ml-2">{student.prenom}</h2></div>
        </div>
        <div className="flex flex-row w-[100%] items-start p-[0%] m-[0%] ">
            <div className="text-left ml-2 w-[30%]"><p className="text-[10px]">Né(e)le/Born on:</p></div>
            <div className="text-rigth w-[70%]"><h2 className="font-bold text-[10px] uppercase text-black ml-2">{dayjs(student.dateNaissance).format('DD/MM/YYYY')}</h2></div>
        </div>
        <div className="flex flex-row w-[100%] items-start p-[0%] m-[0%] ">
            <div className="text-left ml-2 w-[30%]"><p className="text-[10px]">à/At:</p></div>
            <div className="text-rigth w-[70%]"><h2 className="font-bold text-[10px] uppercase text-black ml-2">{student.lieuNaissance}</h2></div>
        </div>
        <div className="flex flex-row w-[100%] items-start p-[0%] m-[0%] ">
            <div className="text-left ml-2 w-[30%]"><p className="text-[10px]">Contacts/Contacts:</p></div>
            <div className="text-rigth w-[70%]"><h2 className="font-bold text-[10px]  text-black ml-2">{student.telPere||''}/{student.telMere||''}</h2></div>
        </div>
        <div className="flex flex-row w-[100%] items-start p-[0%] m-[0%] ">
            <div className="text-left ml-2 w-[30%]"><p className="text-[10px]">Classe:</p></div>
            <div className="text-rigth w-[70%]"><h2 className="font-bold text-[10px] text-black ">{selectedClasse?.nom || 'inconnue'}</h2></div>
        </div>
    </div>
</div>
                    
                    <div className="w-[100%] mt-[2px]" > 
                            <h1 className="font-bold text-[12px]  text-black w-full">Fait à YAOUNDE, le {dayjs().format('DD/MM/YYYY')}</h1>
                    </div>
                    <div className="w-[100%] mt-[3px] p-[2px] rounded-[4px]" > 
                            <h1 className="font-bold text-[10px]  text-[#093c69] w-full">Validité/Validity {anneeprecedent}-{annee}</h1>
                    </div>
                    <div className="w-[100%] mt-[2px]  text-rigth" > 
                            <p className="font-bold text-[6px]  text-black w-full">Tel:{user?.telephone} / E-mail:{user?.email}</p>
                    </div>
                    </div>
                   
                </div>
                
                </div> 
            ))}
        </div>
    );
};

export default StudentCard;
