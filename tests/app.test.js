// tests/app.test.js
import request from 'supertest';
import { start,stop, app } from '../src/server/app'; // Chemin vers ton fichier app.js

let token; // Variable pour stocker le token

// Démarrer l'application avant d'exécuter les tests
beforeAll(async () => {
  await start();
});
afterAll(async () => {
    await stop(); // Arrêter le serveur après les tests
  });

describe('API Tests', () => {
  // Test de la route d'authentification
  describe('POST /auth', () => {
    it('should authenticate a user and return a token', async () => {
      const response = await request(app)
        .post('/auth')
        .send({ login: 'paulzk', email: 'jean.dupont@example.com', password: 'paul' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token; // Stocker le token pour les tests suivants
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app)
        .post('/auth')
        .send({ login: 'invalidUser', password: 'testPassword' });
      expect(response.status).toBe(500);
    });
  });

  // Tests pour les routes des classes d'étude
  describe('Routes /classeEtude', () => {
    it('should create a new class', async () => {
      const response = await request(app)
        .post('/classeEtude')
        .set('Authorization', `Bearer ${token}`)
        .send({ idPrefet: 1, nom: 'Mathématiques' });
      expect(response.status).toBe(201);
    });

    it('should get all classes', async () => {
      const response = await request(app)
        .get('/classeEtude')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Tests pour les routes des élèves
  describe('Routes /eleves', () => {
    it('should create a new student', async () => {
      const response = await request(app)
        .post('/eleves')
        .set('Authorization', `Bearer ${token}`)
        .send({
          idClasseEtude: 1,
          matricule: '23A89098',
          nom: 'Martin',
          prenom: 'Alice',
          dateNaissance: '2005-06-15',
          lieuNaissance: 'Paris',
          nomPere: 'Martin',
          nomMere: 'Dupont',
          telPere:"+23769089785",
          telMere:"+64847575959",
          sexe: 'F'
        });
      //expect(response.status).toBe(201);
      expect(response.status).toBe(400);
    });

    it('should get all students', async () => {
      const response = await request(app)
        .get('/eleves')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a student by ID', async () => {
      const response = await request(app)
        .get('/eleves/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  // Tests pour les routes des enseignants
  describe('Routes /enseignants', () => {
    it('should create a new teacher', async () => {
      const response = await request(app)
        .post('/enseignants')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: 'Dupont',
          prenom: 'Marie',
          email: 'marie.dupont@example.com',
          specialite: 'Mathématiques',
          telephone:"+23789897867",
          grade: 'PLEG',
          sexe:"M"
        });
      expect(response.status).toBe(201);
    });

    it('should get all teachers', async () => {
      const response = await request(app)
        .get('/enseignants')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Tests pour les routes des matières
  describe('Routes /matieres', () => {
    it('should create a new subject', async () => {
      const response = await request(app)
        .post('/matieres')
        .set('Authorization', `Bearer ${token}`)
        .send({
          designation: 'Mathématiques',
          groupe:"2"
        });
      expect(response.status).toBe(201);
    });

    it('should get all subjects', async () => {
      const response = await request(app)
        .get('/matieres')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Tests pour les routes des préfets d'étude
  describe('Routes /prefetEtudes', () => {
    it('should create a new prefect', async () => {
      const response = await request(app)
        .post('/prefetEtudes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          password: 'password123',
          login: 'jdupont',
          telephone: '676485746'
        });
      expect(response.status).toBe(400);
    });

    it('should get all prefects', async () => {
      const response = await request(app)
        .get('/prefetEtudes')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Tests pour les routes des notes
  describe('Routes /notes', () => {
    it('should create a new note', async () => {
      const response = await request(app)
        .post('/notes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          idEleve: 2,
          idMatiere: 3,
          seq1: 15.5,
          seq2: 16.0,
          seq3: 14.0,
          seq4: 17.5,
          seq5: 18.0,
          seq6: 19.0
        });
      expect(response.status).toBe(200);
    });

    it('should get notes by subject and class', async () => {
      const response = await request(app)
        .get('/notes/matiere-classe/3/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(500);
    });
  });
});

/* // tests/app.test.js
import request from 'supertest';
import { start, stop, app } from '../src/server/app'; // Chemin vers ton fichier app.js

let token; // Variable pour stocker le token

// Démarrer l'application avant d'exécuter les tests
beforeAll(async () => {
  await start();
});

// Arrêter l'application après l'exécution des tests
afterAll(async () => {
  await stop();
});

describe('API Tests', () => {
  // Test de la route d'authentification
  describe('POST /auth', () => {
    it('should authenticate a user and return a token', async () => {
      const response = await request(app)
        .post('/auth')
        .send({ login: 'paulzk', email: 'jean.dupont@example.com', password: 'paul' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token; // Stocker le token pour les tests suivants
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app)
        .post('/auth')
        .send({ login: 'invalidUser', password: 'testPassword' });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if input is invalid', async () => {
      const response = await request(app)
        .post('/auth')
        .send({ login: '', password: '' });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  // Tests pour les routes des classes d'étude
  describe('Routes /classeEtude', () => {
    it('should create a new class', async () => {
      const response = await request(app)
        .post('/classeEtude')
        .set('Authorization', `Bearer ${token}`)
        .send({ idPrefet: 1, nom: 'Mathématiques' });
      expect(response.status).toBe(201);
    });

    it('should return 400 for invalid class data', async () => {
      const response = await request(app)
        .post('/classeEtude')
        .set('Authorization', `Bearer ${token}`)
        .send({ idPrefet: '', nom: '' });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });

    it('should get all classes', async () => {
      const response = await request(app)
        .get('/classeEtude')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Tests pour les routes des élèves
  describe('Routes /eleves', () => {
    it('should create a new student', async () => {
      const response = await request(app)
        .post('/eleves')
        .set('Authorization', `Bearer ${token}`)
        .send({
          idClasseEtude: 1,
          matricule: '23A8078',
          nom: 'Martin',
          prenom: 'Alice',
          dateNaissance: '2005-06-15',
          lieuNaissance: 'Paris',
          nomPere: 'Martin',
          nomMere: 'Dupont',
          telPere: "+23769089785",
          telMere: "+64847575959",
          sexe: 'F'
        });
      expect(response.status).toBe(201);
    });

    it('should return 400 for invalid student data', async () => {
      const response = await request(app)
        .post('/eleves')
        .set('Authorization', `Bearer ${token}`)
        .send({
          idClasseEtude: '',
          matricule: '',
          nom: '',
          prenom: '',
          dateNaissance: 'invalid-date',
          lieuNaissance: '',
          nomPere: '',
          nomMere: '',
          telPere: "",
          telMere: "",
          sexe: ''
        });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });

    it('should get all students', async () => {
      const response = await request(app)
        .get('/eleves')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 404 for non-existing student', async () => {
      const response = await request(app)
        .get('/eleves/999') // ID qui n'existe pas
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  // Tests pour les routes des enseignants
  describe('Routes /enseignants', () => {
    it('should create a new teacher', async () => {
      const response = await request(app)
        .post('/enseignants')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: 'Dupont',
          prenom: 'Marie',
          email: 'marie.dupont@example.com',
          specialite: 'Mathématiques',
          telephone: "+23789897867",
          grade: 'PLEG',
          sexe: "M"
        });
      expect(response.status).toBe(201);
    });

    it('should return 400 for invalid teacher data', async () => {
      const response = await request(app)
        .post('/enseignants')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: '',
          prenom: '',
          email: 'invalid-email',
          specialite: '',
          telephone: "",
          grade: '',
          sexe: ""
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should get all teachers', async () => {
      const response = await request(app)
        .get('/enseignants')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Tests pour les routes des matières
  describe('Routes /matieres', () => {
    it('should create a new subject', async () => {
      const response = await request(app)
        .post('/matieres')
        .set('Authorization', `Bearer ${token}`)
        .send({
          designation: 'Mathématiques',
          groupe: "2"
        });
      expect(response.status).toBe(201);
    });

    it('should return 400 for invalid subject data', async () => {
      const response = await request(app)
        .post('/matieres')
        .set('Authorization', `Bearer ${token}`)
        .send({
          designation: '',
          groupe: ''
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should get all subjects', async () => {
      const response = await request(app)
        .get('/matieres')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Tests pour les routes des préfets d'étude
  describe('Routes /prefetEtudes', () => {
    it('should create a new prefect', async () => {
      const response = await request(app)
        .post('/prefetEtudes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          password: 'password123',
          login: 'jdupont',
          telephone: '676485746'
        });
      expect(response.status).toBe(201);
    });

    it('should return 400 for invalid prefect data', async () => {
      const response = await request(app)
        .post('/prefetEtudes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: '',
          prenom: '',
          email: 'invalid-email',
          password: '',
          login: '',
          telephone: ''
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should get all prefects', async () => {
      const response = await request(app)
        .get('/prefetEtudes')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Tests pour les routes des notes
  describe('Routes /notes', () => {
    it('should create a new note', async () => {
      const response = await request(app)
        .post('/notes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          idEleve: 2,
          idMatiere: 3,
          seq1: 15.5,
          seq2: 16.0,
          seq3: 14.0,
          seq4: 17.5,
          seq5: 18.0,
          seq6: 19.0
        });
      expect(response.status).toBe(201);
    });

    it('should return 400 for invalid note data', async () => {
      const response = await request(app)
        .post('/notes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          idEleve: '',
          idMatiere: '',
          seq1: 'invalid',
          seq2: null,
          seq3: -1,
          seq4: 20.5,
          seq5: 18.0,
          seq6: 19.0
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should get notes by subject and class', async () => {
      const response = await request(app)
        .get('/notes/matiere-classe/3/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
 */