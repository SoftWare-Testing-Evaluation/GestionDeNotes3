// calculMoyenneClasse.js
export const calculMoyenneClasse = (studentsData, allNotes, dispensations, selectedSequence) => {
    const studentAverages = studentsData.map(student => {
        const studentNotes = allNotes.filter(note => note.idEleve === student.id);
        let totalPoints = 0;
        let totalCoef = 0;

        // Vérifiez si les notes de l'étudiant existent
        if (studentNotes.length === 0) {
            return { id: student.id, average: null, name: student.nom, firstName: student.prenom }; // Ajout des noms
        }

        studentNotes.forEach(note => {
            const coefficient = getCoefficient(note.idMatiere, dispensations);
            let noteValue = 0;

            // Récupérer la note selon la séquence sélectionnée
            if (selectedSequence === 'seq1') {
                noteValue = note.seq1 || 0;
            } else if (selectedSequence === 'seq2') {
                noteValue = (note.seq1 + note.seq2) / 2 || 0;
            } else if (selectedSequence === 'seq3') {
                noteValue = note.seq3 || 0;
            } else if (selectedSequence === 'seq4') {
                noteValue = (note.seq3 + note.seq4) / 2 || 0;
            } else if (selectedSequence === 'seq5') {
                noteValue = note.seq5 || 0;
            } else if (selectedSequence === 'seq6') {
                noteValue = (note.seq5 + note.seq6) / 2 || 0;
            }

            totalPoints += noteValue * coefficient;
            totalCoef += coefficient;
        });

        const average = totalCoef > 0 ? (totalPoints / totalCoef) : 0; // Éviter NaN
        return { id: student.id, average, name: student.nom, firstName: student.prenom }; // Ajout des noms
    });

    // Trier les élèves par moyenne décroissante, puis par nom et prénom
    const sortedStudents = studentAverages.sort((a, b) => {
        if (b.average !== a.average) {
            return (b.average || 0) - (a.average || 0);
        }
        // Si les moyennes sont égales, trier par nom
        if (a.name !== b.name) {
            return a.name.localeCompare(b.name);
        }
        // Si les noms sont égaux, trier par prénom
        return a.firstName.localeCompare(b.firstName);
    });

    // Calculer la moyenne générale, min et max après le tri
    const totalAverage = sortedStudents.reduce((sum, student) => sum + (student.average || 0), 0);
    const classAverage = sortedStudents.length > 0 ? totalAverage / sortedStudents.length : 0;

    // Inclure les moyennes égales à zéro dans le calcul de la moyenne minimale
    const validAverages = sortedStudents.map(s => s.average).filter(avg => avg !== null);
    const classMin = validAverages.length > 0 ? Math.min(...validAverages) : null;
    const classMax = Math.max(...validAverages);

    // Calculer le pourcentage de réussite
    const successfulStudentsCount = sortedStudents.filter(student => student.average >= 10).length;
    const successRate = sortedStudents.length > 0 ? (successfulStudentsCount / sortedStudents.length) * 100 : 0;

    return {
        classAverage,
        classMin,
        classMax,
        successRate, // Ajout du pourcentage de réussite
        sortedStudents,
    };
};

const getCoefficient = (matiereId, dispensations) => {
    const dispensation = dispensations.find(d => d.idMatiere === matiereId);
    return dispensation ? dispensation.coefficient : 0;
};

