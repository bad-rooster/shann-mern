import express from 'express';
import {connectDB} from "./config/db.js";
import Entry from "./models/entry.model.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    connectDB();
    console.log(`Listening on port ${port}`);
})

app.get('/api/entries/:key', async (req, res) => {
    const key = req.params.key;
    try {
        const entries = await Entry.find({ key: { "$regex": `^${key}`, "$options": "i" } });
        res.status(200).json({success: true, data: entries});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
    }
})