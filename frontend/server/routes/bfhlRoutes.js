import express from 'express';
import bfhlController from '../controllers/bfhlController.js'; // Ensure this matches your file structure

const router = express.Router();

// POST request to /bfhl
router.post('/', bfhlController.postData);

// GET request to /bfhl
router.get('/', bfhlController.getOperationCode);

export default router; // Make sure to export the router
