import express from 'express'; // Use import instead of require
import cors from 'cors';
import bodyParser from 'body-parser';
import bfhlRoutes from './routes/bfhlRoutes.js'; // Include .js extension for ES module imports

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/bfhl', bfhlRoutes); // All routes under /bfhl will be handled here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
