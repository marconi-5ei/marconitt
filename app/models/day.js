var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Day', new Schema({
    date: Date,
    hour_start: Number,
    hour_end: Number,
    description: String,
    who: [Schema.Types.ObjectId],
    type: Number
}));
