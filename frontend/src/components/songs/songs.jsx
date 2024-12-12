import "./songs.css"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import {format, set} from 'date-fns';

function Songs( {date}) {
    const [loading, setLoading] = useState(true);
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        console.log('Fetching song data...');
        const dailyUpdate = async () => {
            try {
                const response = await fetch('https://lit-temple-38398-8cae6dc3273e.herokuapp.com/3songs');
                const data = await response.json();
                setSongData(data);
                console.log('Song data fetched successfully:', data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching song data:', error);
            }
        }
        const updateSongs = async () => {
            const formattedDate = encodeURIComponent(format(date, 'MM/dd/yyyy'));
            try {
                const response = await fetch(`https://lit-temple-38398-8cae6dc3273e.herokuapp.com/getSongs/${formattedDate}`);
                const data = await response.json();
                setSongData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        }
        dailyUpdate();
        updateSongs();
    }, [date]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div id="songs">
            {songData.map((songData, index) => (
                <Card key={index} class="card">
                    <CardMedia
                        sx={{ height: 300 }}
                        image={songData.cover}
                        title={`Cover for ${songData.title}`}
                    />
                    <CardContent class="CardContent">
                        <Typography variant="h6" component="h2">
                            {songData.title}
                        </Typography>
                        <Typography color="lightgray">
                            {songData.artist}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {/* <p>{songResponse}</p> */}
        </div>
    );
}

export default Songs