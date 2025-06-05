import express from 'express';
import {searchEntry} from "../controllers/search.controller.js";

const router = express.Router();

router.get('/api/search', searchEntry);

export default router;