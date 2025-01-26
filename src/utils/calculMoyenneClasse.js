// calculMoyenneClasse.js
export const calculMoyenneClasse = (studentsData, allNotes, dispensations, selectedSequence) => {
    const studentAverages = studentsData.map(student => {
        const studentNotes = allNotes.filter(note => note.idEleve === student.id);
        let totalPoints = 0;
        let totalCoef = 0;

        // Vérifiez si les notes de l'étudiant existent
        if (studentNotes.length === 0) {
            return { id: student.id, average: null }; // Aucun point, moyenne null
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
        return { id: student.id, average };
    });

    // Calculer la moyenne générale, min et max
    const totalAverage = studentAverages.reduce((sum, student) => sum + (student.average || 0), 0);
    const classAverage = studentAverages.length > 0 ? totalAverage / studentAverages.length : 0;
    const classMin = Math.min(...studentAverages.map(s => s.average || Infinity));
    const classMax = Math.max(...studentAverages.map(s => s.average || -Infinity));

    // Trier les élèves par moyenne décroissante
    const sortedStudents = studentAverages.sort((a, b) => (b.average || 0) - (a.average || 0));

    return {
        classAverage,
        classMin: classMin === Infinity ? null : classMin,
        classMax: classMax === -Infinity ? null : classMax,
        sortedStudents,
    };
};

const getCoefficient = (matiereId, dispensations) => {
    const dispensation = dispensations.find(d => d.idMatiere === matiereId);
    return dispensation ? dispensation.coefficient : 0;
};


