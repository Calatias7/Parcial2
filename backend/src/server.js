import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { initDb } from './db.js';

const PORT = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));
  })
  .catch((e) => {
    console.error('Error inicializando DB', e);
    process.exit(1);
  });
