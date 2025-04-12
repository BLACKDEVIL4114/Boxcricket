// In their API service file
const API_URL = 'https://your-localtunnel-url.loca.lt/api';
app.use(cors({
    origin: ['https://playoff-gbc7.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));