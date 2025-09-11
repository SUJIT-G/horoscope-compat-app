
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const HOROSCOPE = JSON.parse(fs.readFileSync(path.join(__dirname, 'horoscope.json')));

// helper: zodiac from YYYY-MM-DD (or Date string)
function zodiacFromDOB(dobStr) {
  const d = new Date(dobStr);
  if (isNaN(d)) return null;
  const day = d.getUTCDate();
  const month = d.getUTCMonth() + 1; // 1-12
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'aries';
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'taurus';
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'gemini';
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'cancer';
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'leo';
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'virgo';
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'libra';
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'scorpio';
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'sagittarius';
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return 'capricorn';
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'aquarius';
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'pisces';
  return null;
}

// GET /api/horoscope/:zodiac
app.get('/api/horoscope/:zodiac', (req, res) => {
  const z = req.params.zodiac.toLowerCase();
  const list = HOROSCOPE[z];
  if (!list) return res.status(404).json({ error: 'Unknown zodiac' });
  const today = new Date();
  const idx = Math.floor((today.getFullYear() * 10000 + (today.getMonth()+1)*100 + today.getDate()) % list.length);
  res.json({ zodiac: z, horoscope: list[idx], date: today.toISOString().slice(0,10) });
});

// POST /api/compatibility
app.post('/api/compatibility', (req, res) => {
  const { name1, dob1, name2, dob2 } = req.body || {};
  if (!name1 || !dob1 || !name2 || !dob2) {
    return res.status(400).json({ error: 'Provide name1,dob1,name2,dob2 (dob in YYYY-MM-DD)' });
  }
  const z1 = zodiacFromDOB(dob1);
  const z2 = zodiacFromDOB(dob2);
  function scoreSeed(a, b) {
    let s = 0;
    (a + '|' + b).split('').forEach(c => s += c.charCodeAt(0));
    return s % 101; // 0..100
  }
  const score = scoreSeed(name1 + z1 + dob1, name2 + z2 + dob2);
  let message = '';
  if (score >= 80) message = 'Excellent match — strong chemistry and understanding.';
  else if (score >= 60) message = 'Good match — with small efforts, relationship can flourish.';
  else if (score >= 40) message = 'Mixed match — some differences, work on communication.';
  else message = 'Challenging match — requires patience and compromise.';

  res.json({
    name1, dob1, zodiac1: z1 || 'unknown',
    name2, dob2, zodiac2: z2 || 'unknown',
    score, message
  });
});

// serve frontend
app.use('/webapp', express.static(path.join(__dirname, 'webapp')));

app.get('/', (req, res) => {
  res.send('Horoscope + Compatibility Mini App API is running. Open /webapp for the frontend.');
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
app.listen(process.env.PORT || 3000, () => console.log("Server running"));
