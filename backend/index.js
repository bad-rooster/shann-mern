import express from 'express';
import cors from 'cors';
import {connectDB} from "./config/db.js";
import entryRouter from "./routes/entry.route.js";
import Entry from "./models/entry.model.js";

const app = express();
const port = process.env.BACKEND_PORT;
const frontend_port = process.env.FRONTEND_PORT;

app.use(cors({
  origin: `http://localhost:${frontend_port}`,
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/entries', entryRouter)

app.get('/api/search', async (req, res) => {
  try {
    const {key} = req.query;

    const agg = [{
      $search: {
        index: "medicine-title",
        autocomplete: {
          query: key,
          path: "key",
          tokenOrder: "sequential"
        }
      }
    }, {
      $limit: 5
    }, {
      $project: {
        _id: 1,
        key: 1,
        value: 1
      }
    }];

    const response = await Entry.aggregate(agg);

    res.status(200).json({success: true, data: response});

  } catch (e) {
    res.status(500).json({success: false, error: e});
  }
})

app.listen(port, () => {
  connectDB();
})