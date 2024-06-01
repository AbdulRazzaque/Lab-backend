const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectbrucellaSchema = new Schema({
    name: { type: String, require: true },
    workOder: { type: String, require: true },
    noofSample: { type: String, require: true },
    sampleType: { type: String, require: true },
    date: { type: Date, require: true },
    RequiredAnalysis: { type: String, require: true },
    count: { type: Number, require: true }
}, { timestamps: true });

module.exports = mongoose.model('Projectbrucella', ProjectbrucellaSchema, 'Projectbrucellas');
