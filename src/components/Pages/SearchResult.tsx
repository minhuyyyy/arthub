import { ArtworkType } from '../../types/artwork';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AppSuspense from '../Suspense';
import { formatDateShort } from '../../utils/helper/format.helper';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function SearchResult() {
    const [results, setResults] = useState<ArtworkType[]>([]);
    const { searchStr } = useParams();
    const getResult = async () => {
        await axios
            .get(`${API_URL}/artwork?Query=${searchStr}`)
            .then((res) => {
                if (res.status === 200) {
                    setResults(res.data.items);
                }
            })
            .catch((err) => toast.error(err.response.data));
    };
    useEffect(() => {
        getResult();
    }, [searchStr]);
    return (
        <div style={{ width: '100%' }}>
            <AppSuspense>
                {results.length > 0 ? (
                    <Box sx={{ marginTop: '20px', width: '70vw' }}>
                        <Grid container spacing={2}>
                            {results.map((card, index) => (
                                <Grid item sm={2} md={3} lg={4}>
                                    <Link
                                        to={`/card/${card.artworkId}`}
                                        key={index}
                                    >
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
                    </Box>
                ) : (
                    <p>No results found</p>
                )}
            </AppSuspense>
        </div>
    );
}

export default SearchResult;
