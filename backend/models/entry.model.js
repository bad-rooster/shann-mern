import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
    line_number: { type: Number, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
    verification:{
        is_ocr_verified: { type: Boolean, required: true, default: false },
        ocr_reviewer: { type: String, required: false, default: null },
        is_dosage_verified: { type: Boolean, required: true, default: false },
        dosage_reviewer: { type: String, required: false, default: null }
    }
}, { timestamps: true });

const Entry = mongoose.model('dosage-formula', entrySchema);

export default Entry;