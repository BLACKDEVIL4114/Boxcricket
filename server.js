const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['https://playoff-gbc7.vercel.app', 'http://localhost:3000', 'https://d12d-2405-201-2005-a10a-c4f1-2b01-ada2-6f86.ngrok-free.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept']
}));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Routes
try {
  const authRoutes = require('./routes/authroutes');
  const teamRoutes = require('./routes/teamroutes');
  const matchRoutes = require('./routes/matchroutes');
  const tournamentRoutes = require('./routes/tournamentroutes');
  const paymentRoutes = require('./routes/paymentroutes');

  app.use('/api/auth', authRoutes);
  app.use('/api/teams', teamRoutes);
  app.use('/api/matches', matchRoutes);
  app.use('/api/tournaments', tournamentRoutes);
  app.use('/api/payments', paymentRoutes);
} catch (error) {
  console.error('Error loading routes:', error);
}

// Use environment port or fallback to a different port (8082 instead of 8081)
// Use environment port or fallback to a different port (8083 instead of 8082)
// Change the port to avoid the EADDRINUSE error
// Change the port to 8085 since 8084 is already in use
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access your API at http://localhost:${PORT}`);
});