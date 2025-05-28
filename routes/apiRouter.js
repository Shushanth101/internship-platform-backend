import express from 'express';
const router = express.Router();
import authenticateHeader from '../middlewares/authenticate.js';
import { handleInternshipApplicationSubmit } from '../controllers/index.js';


router.use(authenticateHeader);


router.post("/submit-internship-application", handleInternshipApplicationSubmit);

export default router;


