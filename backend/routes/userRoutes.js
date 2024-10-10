import express from 'express';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js'; 
import QuizResult from '../models/QuizResult.js'; // Importa il modello dei risultati del quiz
import AuthMiddleware from '../middleware/AuthMiddleware.js';
import { body, validationResult } from 'express-validator'; 

const router = express.Router();

// Aggiungi questa nuova rotta per recuperare i risultati del quiz per l'utente loggato
router.get('/api/quiz/results', AuthMiddleware, async (req, res) => {
  try {
    const quizResults = await QuizResult.find({ userId: req.user.userId }).sort({ date: -1 }); // Ordina per data
    if (!quizResults) {
      return res.status(404).json({ message: 'Nessun risultato trovato.' });
    }

    res.status(200).json(quizResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore nel recupero dei risultati del quiz.' });
  }
});


// Endpoint per inviare i risultati del quiz
router.post('/api/quiz/results', AuthMiddleware, async (req, res) => {
  const { score, totalQuestions, responses } = req.body;
  
  try {
    // Crea un nuovo risultato del quiz
    const quizResult = new QuizResult({
      userId: req.user.userId, // ID utente preso dal token JWT
      score,
      totalQuestions,
      responses
    });

    // Salva il risultato del quiz nel database
    await quizResult.save();

    res.status(201).json({ message: 'Risultato del quiz salvato con successo.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server durante il salvataggio dei risultati del quiz.' });
  }
});

router.post('/api/users', [
  body('name').notEmpty().withMessage('Il nome è richiesto'),
  body('email').isEmail().withMessage('Email non valida'),
  body('password').isLength({ min: 6 }).withMessage('La password deve contenere almeno 6 caratteri'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg }); 
  }

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email già in uso. Prova con un’altra email.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ userId: newUser._id, name: newUser.name, email: newUser.email });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server. Riprova più tardi.' });
  }
});

router.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato. Controlla le credenziali.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password errata.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server. Riprova più tardi.' });
  }
});

router.put('/api/users/:id', AuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato.' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ message: 'Profilo aggiornato con successo.', user });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'aggiornamento del profilo.' });
  }
});

export default router;
