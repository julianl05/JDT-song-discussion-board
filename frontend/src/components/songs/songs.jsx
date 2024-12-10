import "./songs.css"
import React, { useState, useEffect } from 'react';
import cover1 from '../../assets/rynweaver.jpeg'
import cover2 from '../../assets/hippocampus.jpg'
import cover3 from '../../assets/halfalive.jpg'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { use } from "react";

function Songs( {date}) {
    const [loading, setLoading] = useState(true);
    const [songData, setSongData] = useState([]);
    // const maxSong= 2471960;
    // const minSong= 1;
    
    // function getRandomInt(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // };

    // useEffect(() => {
    //     console.log('Fetching song data...');
    //     const fetchSong = async () => {
    //         const validSongs = [];
    //         while (validSongs.length < 3) {
    //             const randSong = getRandomInt(minSong, maxSong);
    //             try {
    //                 const response = await fetch(`http://localhost:4000/songs/${randSong}`)
    //                 if (!response.ok) {
    //                     console.error('Failed to fetch song data', response);
    //                     continue;
    //                 }
    //                 if (response.status === 404) {   
    //                     console.log('Invalid song data', data);
    //                     continue;
    //                 }
    //                 console.log('Song data fetched successfully');
    //                 const data = await response.json();
                    
    //                 const song = {
    //                     title: data['title'],
    //                     artist: data['artist_names'],
    //                     cover: data['song_art_image_url']
    //                 }
                    
    //                 validSongs.push(song);
    //             } catch (error) {
    //                 console.error("error fetching song data", error);
    //             }
                
    //         }
    //         setSongData(validSongs);
    //         setLoading(false);
    //     };
    //     fetchSong();
        
    // }, []);

    useEffect(() => {
        console.log('Fetching song data...');
        const fetch3songs = async () => {
            try {
                const response = await fetch('http://localhost:4000/3songs');
                const data = await response.json();
                setSongData(data);
                console.log('Song data fetched successfully:', data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching song data:', error);
            }
        }
        fetch3songs();
    }, []);
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