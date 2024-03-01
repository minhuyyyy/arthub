import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import { FakeCard } from '../../card';
import { CardType } from '../../types/card';
import { useNavigate } from 'react-router-dom';

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

    const loadMoreCards = () => {
        setLoading(true);
        // Simulate loading data from an API, you can replace this with your actual data fetching logic
        setTimeout(() => {
            const startIndex = (page - 1) * pageSize;
            const newCards = FakeCard.slice(startIndex, startIndex + pageSize);
            setCards((prevCards) => [...prevCards, ...newCards]);
            setPage((prevPage) => prevPage + 1);
            setLoading(false);
        }, 1000);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.offsetHeight
        ) {
            loadMoreCards();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box sx={{ marginTop: '20px' }}>
            <Grid
                container
                spacing={1}>
                {cards.map((card) => (
                    <Grid
                        item
                        sm={4}
                        md={3}
                        lg={3}
                        key={card._id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea
                                onClick={() => navigate(`/card/${card._id}`)}>
                                <CardMedia
                                    component='img'
                                    height='140px'
                                    image={card.imgLink}
                                    alt={card.imgDescription}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'>
                                        {card.owner.name}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'>
                                        {card.imgDescription}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                {loading && (
                    <Grid
                        item
                        xs={12}>
                        <Typography variant='body2'>Loading...</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default ArtworkCard;
