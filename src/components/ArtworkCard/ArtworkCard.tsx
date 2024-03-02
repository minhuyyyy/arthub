import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import axios from 'axios';
import './Artwork.scss';
import { useNavigate } from 'react-router-dom';
import { CardType } from '../../types/card';

function ArtworkCard() {
    const [cards, setCards] = useState<CardType[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const pageSize = 10; // Number of items to load per page
    const navigate = useNavigate();
    useEffect(() => {
        loadMoreCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const loadMoreCards = async () => {
        setLoading(true);
        try {
            const newCardsResponse = await axios.get(
                `http://localhost:5000/cards?_page=${page}&_per_page=${pageSize}`,
            );
            const newCards = newCardsResponse.data;
            setCards((prevCards) => [...prevCards, ...newCards]);
            setPage(page + 1);
        } catch (error) {
            console.error('Error loading more cards:', error);
        } finally {
            setLoading(false); // Set loading to false after cards are loaded or if there's an error
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.offsetHeight
        ) {
            loadMoreCards();
        }
    };

    return (
        <Box sx={{ marginTop: '20px' }}>
            <Grid container spacing={1}>
                {cards.map((card) => (
                    <Grid
                        item
                        sm={4}
                        md={3}
                        lg={3}
                        key={card.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea
                                onClick={() => navigate(`/card/${card.id}`)}>
                                <CardMedia
                                    component="img"
                                    height="140px"
                                    image={card.imgLink}
                                    alt={card.imgDescription}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'>
                                        {card?.owner?.name}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'>
                                        {card?.imgDescription}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                {loading && (
                    <Grid item xs={12}>
                        <Typography variant="body2">Loading...</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default ArtworkCard;
