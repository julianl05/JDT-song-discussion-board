import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import axios from 'axios'
import { MongoClient } from 'mongodb'




dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const API_KEY = process.env.API_KEY
const PORT = process.env.PORT || 4000

const mongourl = process.env.MONGO_URL
const mongoclient = new MongoClient(mongourl, {})

mongoclient.connect().then(() => {
    console.log("Connected to MongoDB")
})

app.get('/songs/:id', async (req, res) => {
    const { id } = req.params;
    const baseUrl = 'https://api.genius.com/songs';
    
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
        console.log(error.response.status);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})