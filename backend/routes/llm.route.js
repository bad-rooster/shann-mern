import express from 'express';
import {invokeLLM} from "../controllers/llm.controller.js";

const router = express.Router();

router.get('/llm/:id/:detail', invokeLLM);

export default router;