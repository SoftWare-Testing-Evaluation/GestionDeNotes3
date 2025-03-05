//src/utils/calculerStatistiquesClasses.js
import { fetchElevesParClasse } from "../slices/eleveSlice";
import { loadMatieresByClasse } from '../slices/matiereSlice';
import { loadNotesByMatiereAndClasse } from '../slices/noteSlice';
import { loadDispensations } from '../slices/dispenserSlice';
import { calculMoyenneClasse } from '../utils/calculMoyenneClasse';
import { home } from '../assets/lordicons/index.js';


export const calculerStatistiquesClasses = async (dispatch, classes, selectedYear, selectedSequence) => {
    const classStatistics = [];
   

    for (let i = 0; i < classes.length; i++) {
        const classe = classes[i];
        
        // Récupérer les élèves de la classe
        const students = await dispatch(fetchElevesParClasse({ idClasseEtude: classe.id, annee: selectedYear }));
        
        // Récupérer les matières de la classe
        const matieres = await dispatch(loadMatieresByClasse({ idClasseEtude: classe.id, annee: selectedYear }));

        // Récupérer les dispensations
        const dispensations = await dispatch(loadDispensations());
        
        // Récupérer les notes pour chaque élève et chaque matière
        const allNotesPromises = matieres.payload.map(matiere =>
            dispatch(loadNotesByMatiereAndClasse({ idMatiere: matiere.id, idClasseEtude: classe.id, annee: selectedYear }))
        );

        const allNotesResults = await Promise.all(allNotesPromises);
        const allNotes = allNotesResults.flatMap(result => result.payload);

        // Calculer les moyennes et le taux de réussite
        const { successRate, sortedStudents } = calculMoyenneClasse(students.payload, allNotes, dispensations.payload, selectedSequence);

        // Ajouter les statistiques de la classe au tableau
        classStatistics.push({
            Id: classe.id,
            value: successRate,
            label: classe.nom,
            icon: home,
            //ref: refs[i] // Utiliser la référence correspondante
            sortedStudents
        });
    }

    return classStatistics;
};
