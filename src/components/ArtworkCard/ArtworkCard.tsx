import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import './Artwork.scss';
import { Link } from 'react-router-dom';
import { formatDateShort } from '../../utils/helper/format.helper';
import { ArtworkType } from '../../types/artwork';
import { getArtworks } from '../../services/artworkServices/artworkServices';

function ArtworkCard() {
    const [cards, setCards] = useState<ArtworkType[]>([]);
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
            const newCardsResponse = await getArtworks(page, pageSize);
            const newCards = newCardsResponse.data.items;

            setCards((prevCards) => [...prevCards, ...newCards]);
            setPage(page + 1);
        } catch (error) {
            // console.error('Error loading more cards:', error);
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
                <Grid container spacing={2}>
                    {cards.map((card, index) => (
                        <Grid item sm={2} md={3} lg={4}>
                            <Link to={`/card/${card.artworkId}`} key={index}>
                                <Card
                                    sx={{
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={card.image}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography
                                            textAlign={'left'}
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {card.name}
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {formatDateShort(
                                                card.artworkDate as Date
                                            )}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
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
