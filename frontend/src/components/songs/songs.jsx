import "./songs.css"
import React, { useState, useEffect } from 'react';
import cover1 from '../../assets/rynweaver.jpeg'
import cover2 from '../../assets/hippocampus.jpg'
import cover3 from '../../assets/halfalive.jpg'
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
function Songs() {
    const songs = [
        { title: "Song 1", artist: "Artist 1", cover: cover1 },
        { title: "Song 2", artist: "Artist 2", cover: cover2 },
        { title: "Song 3", artist: "Artist 3", cover: cover3 }
    ];

    useEffect(() => {
        console.log('Fetching song data...');
        fetch('http://localhost:4000/songs/378195') 
            .then(response => response.json())
            .then(data => {
                console.log('Song data:', data);
            })
            .catch(error => {
                console.error('Error fetching song data:', error);
            });
    }, []);

    return (
        <div id="songs">
            {songs.map((song, index) => (
                <Card key={index} class="card">
                    <CardMedia
                        sx={{ height: 200 }}
                        image={song.cover}
                        title={`Cover for ${song.title}`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {song.title}
                        </Typography>
                        <Typography color="lightgray">
                            {song.artist}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {/* <p>{songResponse}</p> */}
        </div>
    );
}

export default Songs