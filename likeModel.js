// likeModel.js
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    likes: { type: Number, default: 0 }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
