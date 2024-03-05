import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import './Artwork.scss';
import { Link } from 'react-router-dom';
import { CardType } from '../../types/card';
import { Masonry } from '@mui/lab';
import { MOCK_API_URL } from '../../utils/urls';

function ArtworkCard() {
    const [cards, setCards] = useState<CardType[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const pageSize = 10; // Number of items to load per page
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
            // const newCardsResponse = await axios.get(
            //     `${API_URL}/artwork?Page=${page}&PageSize=${pageSize}`
            // );
            const newCardsResponse = await axios.get(
                `${MOCK_API_URL}/artworks?_page=${page}&_pageSize=${pageSize}`
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
        <div style={{ width: '100%' }}>
            <Box sx={{ marginTop: '20px', width: '70vw' }}>
                <Masonry columns={{ xs: 2, md: 3, lg: 4 }} spacing={2}>
                    {cards.map((card, index) => (
                        <Link to={`/card/${card.artworkId}`} key={index}>
                            <img
                                src={`${card.image}`}
                                srcSet={`${card.image}`}
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
                    // <Grid item xs={12}>
                    <Typography variant="body2">Loading...</Typography>
                    // </Grid>
                )}
            </Box>
        </div>
    );
}

export default ArtworkCard;
