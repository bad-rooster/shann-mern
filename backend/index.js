import express from 'express';
import cors from 'cors';
import {connectDB} from "./config/db.js";
import entryRouter from "./routes/llm.route.js";
import searchRouter from "./routes/search.route.js";
import Entry from "./models/entry.model.js";

const app = express();
const port = process.env.BACKEND_PORT;
const frontend_port = process.env.FRONTEND_PORT;

app.use(cors({
  origin: `*`,
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/entries', entryRouter)

app.get('/api/search', searchRouter)

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Frontend server running on port ${frontend_port}`);
      console.log(`Backend server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });