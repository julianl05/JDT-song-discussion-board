import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const API_KEY = process.env.API_KEY
const PORT = process.env.PORT || 4000

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
        res.json(response.data.response.song); 
    } 
    catch (error) {
        console.error('Error fetching song data:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})