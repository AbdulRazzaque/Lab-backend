const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    reppassword: { type: String}
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema, 'Items');
