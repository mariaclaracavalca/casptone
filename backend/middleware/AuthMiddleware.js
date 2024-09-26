import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token mancante, autorizzazione negata' });
  }

  try {
    // Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Token non valido' });
  }
};

export default authMiddleware;
