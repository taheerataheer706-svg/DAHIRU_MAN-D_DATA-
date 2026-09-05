import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC FILES
========================= */

app.use(express.static(path.join(__dirname, 'public')));

/* =========================
   HOME
========================= */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* =========================
   ADMIN LOGIN
========================= */

app.get('/admin', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'admin-login.html')
  );
});

/* =========================
   ADMIN DASHBOARD
========================= */

app.get('/admin-dashboard', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'admin-dashboard.html')
  );
});

/* =========================
   HEALTH CHECK
========================= */

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DAHIRU MAN D DATA server is running'
  });
});

/* =========================
   404
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(
    `DAHIRU MAN D DATA running on port ${PORT}`
  );
});
