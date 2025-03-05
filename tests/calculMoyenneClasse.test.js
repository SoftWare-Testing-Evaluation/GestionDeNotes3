import { describe, it, expect } from 'vitest';
import { calculMoyenneClasse } from '../src/utils/calculMoyenneClasse';

describe('calculMoyenneClasse', () => {
    it('should calculate class statistics correctly', () => {
        const studentsData = [
            { id: 1, nom: 'Dupont', prenom: 'Jean' },
            { id: 2, nom: 'Martin', prenom: 'Claire' },
            { id: 3, nom: 'Durand', prenom: 'Paul' },
        ];

        const allNotes = [
            { idEleve: 1, idMatiere: 1, seq1: 15, seq2: 10, seq3: 12 },
            { idEleve: 2, idMatiere: 1, seq1: 8, seq2: 9, seq3: 7 },
            { idEleve: 3, idMatiere: 1, seq1: 10, seq2: 10, seq3: 10 },
            { idEleve: 1, idMatiere: 2, seq1: 14, seq2: 16, seq3: 15 },
            { idEleve: 2, idMatiere: 2, seq1: 6, seq2: 5, seq3: 7 },
        ];

        const dispensations = [
            { idMatiere: 1, coefficient: 2 },
            { idMatiere: 2, coefficient: 1 },
        ];

        const selectedSequence = 'seq1';

        const result = calculMoyenneClasse(studentsData, allNotes, dispensations, selectedSequence);

        expect(result.classAverage).toBeCloseTo(10.67, 2); // Ajustez selon votre logique de calcul
        expect(result.classMin).toBeCloseTo(7.33, 2); // Note minimale arrondie
        expect(result.classMax).toBeCloseTo(14.67, 2); // Note maximale arrondie
        expect(result.successRate).toBeCloseTo(66.67, 2); // Taux de réussite arrondi

        // Arrondir les moyennes des étudiants à deux décimales pour la comparaison
        const roundedStudents = result.sortedStudents.map(student => ({
            id: student.id,
            average: parseFloat(student.average.toFixed(2)), // Arrondir à deux décimales
            name: student.name,
            firstName: student.firstName,
        }));

        expect(roundedStudents).toEqual([
            { id: 1, average: 14.67, name: 'Dupont', firstName: 'Jean' },
            { id: 3, average: 10.00, name: 'Durand', firstName: 'Paul' },
            { id: 2, average: 7.33, name: 'Martin', firstName: 'Claire' },
        ]);
    });

    it('should return default values when studentsData is not an array', () => {
        const result = calculMoyenneClasse(null, [], [], 'seq1');

        expect(result.classAverage).toBe(0);
        expect(result.classMin).toBeNull();
        expect(result.classMax).toBeNull();
        expect(result.successRate).toBe(0);
        expect(result.sortedStudents).toEqual([]);
    });
});
