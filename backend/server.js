import dotenv from 'dotenv';
dotenv.config(); // Deve essere chiamato prima di accedere a `process.env`

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 6000;

app.use(cors());
app.use(express.json()); 

// Connetti a MongoDB
mongoose.connect(process.env.MONGO_CONNECT_URL).then(() => {
  console.log("Connesso a MongoDB");
}).catch(err => {
  console.error("Errore di connessione a MongoDB:", err);
});


// Usa le rotte degli utenti
app.use(userRoutes);

// Inizializza il server
app.listen(port, () => {
    console.log(`Server backend in esecuzione su http://localhost:${port}`);
});
