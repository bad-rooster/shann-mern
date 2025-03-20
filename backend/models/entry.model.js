import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
    line_number: { type: Number, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
    verification:{
        is_verified: { type: Boolean, required: true, default: false },
        reviewer: { type: String, required: false, default: null },
    }
})

const Entry = mongoose.model('dosage-formula', entrySchema);

export default Entry;