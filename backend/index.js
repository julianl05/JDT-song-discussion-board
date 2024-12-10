import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import axios from 'axios'
import { format } from 'date-fns'
import { MongoClient } from 'mongodb'




dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const API_KEY = process.env.API_KEY
const PORT = process.env.PORT || 4000
const baseUrl = 'https://api.genius.com/songs';

const mongourl = process.env.MONGO_URL
const mongoclient = new MongoClient(mongourl, {})

let songsCollection;
let commentsCollection;
mongoclient.connect().then(() => {
    console.log("Connected to MongoDB")
    songsCollection = mongoclient.db("song-discussion-board").collection("songs")
    commentsCollection = mongoclient.db("song-discussion-board").collection("comments")
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function fetch3RandomSongs() {
    const validSongs = [];
    const maxSong= 2471960;
    const minSong= 1;
    while (validSongs.length < 3) {
        const randSong = getRandomInt(minSong, maxSong);
        try {
            const response = await axios.get(`${baseUrl}/${randSong}`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            });
            if (response.status === 404) {
                console.log('Invalid song data', data);
                continue;
            }

            const data = response.data.response.song;
            const song = {
                title: data['title'],
                artist: data['artist_names'],
                cover: data['song_art_image_url']
            }
            
            validSongs.push(song);
        } catch (error) {
            console.error("error fetching song data", error);
        }
    }
    return validSongs;
}

app.get('/songs/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const response = await axios.get(`${baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        console.log(response.data); 
        // console.log(response.status);
        res.json(response.data.response.song); 
    } 
    catch (error) {
        console.error('Error fetching song data:', error);
        console.log('STATUS CODE OF ERROR: ', error.response.status);
        res.status(error.response.status).send({
            message: error.message,
            details: error.response.data
        });
    }
});

app.get('/3songs', async (req, res) => {
    const currentDate = format(new Date(), 'MM/dd/yyyy');
    const record = await songsCollection.findOne({ date: currentDate });
    if (record) {
        res.json(record.fetchedSongs);
    } else {
        const fetchedSongs = await fetch3RandomSongs();
        console.log('fetched 3 songs:', fetchedSongs);
        await songsCollection.insertOne({ date: currentDate, fetchedSongs });
        const newRecord = await songsCollection.findOne({ date: currentDate });
        res.json(newRecord.fetchedSongs);
    }
});

app.get('/comments/:date', async (req, res) => {
    const date = decodeURIComponent(req.params.date);
    const record = await commentsCollection.findOne({ date });
    if (record) {
        res.json(record.comments);
    } else {
        res.json([]);
    }
});

app.post('/comments/:date', async (req, res) => {
    const date = decodeURIComponent(req.params.date);
    const username = req.body.username;
    const text = req.body.comment;
    console.log('Adding comment:', username, text);
    const record = await commentsCollection.findOne({ date });
    if (record) {
        await commentsCollection.updateOne({ date }, { $push: { comments: { username, text } } });
    } else {
        await commentsCollection.insertOne({ date, comments: [{ username, text }] });
    }
    res.json({ status: 'success' });
});

app.get('/date', (req, res) => {
    res.json({ date: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})