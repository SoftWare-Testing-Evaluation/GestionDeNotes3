//calculerStatistiquesClasses.js

import { fetchElevesParClasse } from "../slices/eleveSlice";
import { loadMatieresByClasse } from '../slices/matiereSlice';
import { loadNotesByMatiereAndClasse } from '../slices/noteSlice';
import {loadDispensations}from '../slices/dispenserSlice'
import { calculMoyenneClasse } from '../utils/calculMoyenneClasse';

export const calculerStatistiquesClasses = async (dispatch, classes, selectedYear, selectedSequence) => {
    const classStatistics = [];
    
console.log(classes)
    for (const classe of classes) {
        // Récupérer les élèves de la classe
        const students = await dispatch(fetchElevesParClasse({ idClasseEtude: classe.id, annee: selectedYear }));
        console.log(students.payload)
        // Récupérer les matières de la classe
        const matieres = await dispatch(loadMatieresByClasse({ idClasseEtude: classe.id, annee: selectedYear }));

        // Récupérer les dispensations (ajoutez cette partie si nécessaire)
        const dispensations = await dispatch(loadDispensations()) ; // Remplacez par votre logique pour récupérer les dispensations
console.log(dispensations.payload);
        // Récupérer les notes pour chaque élève et chaque matière
        const allNotesPromises = matieres.payload.map(matiere =>
            dispatch(loadNotesByMatiereAndClasse({ idMatiere: matiere.id, idClasseEtude: classe.id, annee: selectedYear }))
        );

        const allNotesResults = await Promise.all(allNotesPromises);
        const allNotes = allNotesResults.flatMap(result => result.payload); // Aplatir les résultats des notes

        // Calculer les moyennes et le taux de réussite
        const { successRate, sortedStudents } = calculMoyenneClasse(students.payload, allNotes, dispensations.payload, selectedSequence);

        console.log(successRate,sortedStudents)
        // Ajouter les statistiques de la classe au tableau
        classStatistics.push({
            classId: classe.id,
            successRate,
            sortedStudents
        });
    }

    return classStatistics;
};
