import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const port = process.env.PORT || 6000; // verifica funzionamento progetto
const app = express();

mongoose.connect(process.env.MONGO_CONNECT_URL)
  .then(() => {
    console.log('Connessione al database riuscita');
    app.listen(port, () => {
      console.log(`Server in ascolto sulla porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('Errore di connessione al database:', err);
  });
