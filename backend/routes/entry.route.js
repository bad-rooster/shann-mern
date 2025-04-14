import express from 'express';
import {getEntries, invokeLLM, searchEntry} from "../controllers/entry.controller.js";

const router = express.Router();

router.get('/:key', getEntries);

router.get('/llm/:id', invokeLLM);

router.get('/search/:key', searchEntry)

export default router;