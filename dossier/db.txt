// tests/db.test.js
import { describe, it, expect } from 'vitest';
import sequelize from '../src/server/db'; // Chemin vers votre fichier db.js

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    try {
      await sequelize.authenticate();
      expect(true).toBe(true); // Si la connexion réussit, le test passe
    } catch (error) {
      expect(error).toBeNull(); // Si une erreur se produit, le test échoue
    }
  });

  it('should synchronize the models without errors', async () => {
    try {
      await sequelize.sync({ alter: true });
      expect(true).toBe(true); // Si la synchronisation réussit, le test passe
    } catch (error) {
      expect(error).toBeNull(); // Si une erreur se produit, le test échoue
    }
  });
});
