import jwt from 'jsonwebtoken';

const AuthMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Prende il token dall'header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Accesso negato. Token mancante.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica il token
    req.user = decoded; // Salva le informazioni dell'utente nel request object
    next(); // Passa al prossimo middleware
  } catch (error) {
    res.status(400).json({ message: 'Token non valido.' });
  }
};

export default AuthMiddleware;
