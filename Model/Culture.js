const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const CultureSchema = new Schema({
    name: { type: String, required: true },
    workOder: { type: String, required: true },
    noofSample: { type: String, required: true },
    requiredTest: { type: String, required: true },
    sampleType: { type: String, required: true },
    date: { type: Date, required: true },
    RequiredAnalysis: { type: String, required: true },
    count: { type: String, required: true },
    // count1: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Culture', CultureSchema, 'Cultures');
