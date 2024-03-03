import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import './Artwork.scss';
import { Link, useNavigate } from 'react-router-dom';
import { CardType } from '../../types/card';
import { Masonry } from '@mui/lab';

function ArtworkCard() {
    const [cards, setCards] = useState<CardType[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const pageSize = 10; // Number of items to load per page
    const navigate = useNavigate();
    useEffect(() => {
        loadMoreCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    const loadMoreCards = async () => {
        setLoading(true);
        try {
            const newCardsResponse = await axios.get(
                `http://localhost:5000/cards?_page=${page}&_per_page=${pageSize}`
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
        <div style={{ marginTop: '20px', width: '100%' }}>
            <Box sx={{ marginTop: '20px', width: '70vw' }}>
                <Masonry columns={{ xs: 2, md: 3, lg: 4 }} spacing={2}>
                    {cards.map((card, index) => (
                        <Link to={`/card/${card.id}`} key={index}>
                            <img
                                src={`${card.imgLink}?w=162&auto=format`}
                                srcSet={`${card.imgLink}?w=162&auto=format`}
                                loading="lazy"
                                style={{
                                    borderRadius: '20px',
                                    display: 'block',
                                    width: '100%',
                                }}
                            />
                        </Link>
                    ))}
                </Masonry>
                {loading && (
                    <Grid item xs={12}>
                        <Typography variant="body2">Loading...</Typography>
                    </Grid>
                )}
            </Box>
        </div>
    );
}

export default ArtworkCard;
