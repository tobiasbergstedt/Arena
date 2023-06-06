import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import players from './routes/players.js';
import transferList from './routes/transferList.js';
import chatMessages from './routes/chatMessages.js';
import news from './routes/news.js';
import teams from './routes/teams.js';
import divisions from './routes/divisions.js';
import matches from './routes/matches.js';
import matchWinners from './routes/matchWinners.js';
import winners from './routes/winners.js';
import losers from './routes/losers.js';

// Konfiguration
const PORT = process.env.PORT || 1337;
const distPath = path.join(__dirname, '/../dist/');
console.log('distpath: ', distPath);

// Middleware
// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
app.use('/img/', express.static(path.join(__dirname, '/hamsterimages/')));
app.use('/assets/', express.static(path.join(__dirname, '/assets/')));
//End MiddleWare

// Endpoints
app.use('/players', players);
app.use('/transferList', transferList);
app.use('/chat', chatMessages);
app.use('/news', news);
app.use('/teams', teams);
app.use('/divisions', divisions);
app.use('/matches', matches);
app.use('/matchWinners', matchWinners);
app.use('/winners', winners);
app.use('/losers', losers);

// Övriga endpoints, för att fungera med React Router i frontend
app.all('*', (req, res) => {
  res.sendFile(`${distPath}index.html`);
});

app.listen(PORT, () => {
  console.log('Server is listening on port: ', PORT);
});
