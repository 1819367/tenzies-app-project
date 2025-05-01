import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());  // Parse JSON bodies 

// Basic route to verify server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start server on PORT from .env or default to 3001

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));