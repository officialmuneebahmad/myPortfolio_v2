// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Like = require('./likeModel');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your MongoDB Atlas URI
const mongoURI = 'mongodb://icsf23m:muneeb123@cluster0-shard-00-00.b9iny.mongodb.net:27017,cluster0-shard-00-01.b9iny.mongodb.net:27017,cluster0-shard-00-02.b9iny.mongodb.net:27017/?ssl=true&replicaSet=atlas-azv28i-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0s';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(express.json());

// Serve the HTML file from "other-folder/views" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to increment like count
app.post('/like', async (req, res) => {
    try {
        let like = await Like.findOne();
        if (!like) {
            like = new Like({ likes: 1 });
        } else {
            like.likes += 1;
        }

        await like.save();
        res.status(200).json({ message: 'Like added!', likes: like.likes });
    } catch (error) {
        res.status(500).json({ message: 'Error liking the item', error });
    }
});

// Route to get the like count
app.get('/like', async (req, res) => {
    try {
        const like = await Like.findOne();

        if (!like) {
            return res.status(200).json({ likes: 0 });
        }

        res.status(200).json({ likes: like.likes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching like count', error });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});





// mongodb://icsf23m:muneeb123@cluster0-shard-00-00.b9iny.mongodb.net:27017,cluster0-shard-00-01.b9iny.mongodb.net:27017,cluster0-shard-00-02.b9iny.mongodb.net:27017/?ssl=true&replicaSet=atlas-azv28i-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0s
