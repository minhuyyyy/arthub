import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import AppSuspense from '../Suspense';
import { ArtworkType } from '../../types/artwork';

function CardDetails() {
    document.title = 'Details';
    const navigate = useNavigate();
    const [owner, setOwner] = useState({
        accountId: 0,
        avatar: '',
        fullName: '',
    });
    const [card, setCard] = useState<ArtworkType>({
        artworkId: 0,
        name: '',
        description: '',
        image: '',
        artistID: 0,
        price: 0,
        isBuyAvailable: false,
        likes: [],
        artworkDate: new Date(),
        genreId: 0,
        membersRated: [],
        artworkRating: 0,
    });
    const [liked, isLiked] = useState(false);
    const { id } = useParams();
    const { isAuthenticated, userInfo } = useAuth();

    // const getProfile = async () => {
    //     const res = await axios.get(`${API_URL}/profile/${card.artistID}`);
    //     if (res.status === 200) {
    //         setOwner(res.data);
    //     }
    // };

    const getCard = () => {
        axios
            .get(`${API_URL}/artwork/${id}`)
            .then((cardRes) => {
                if (cardRes.status === 200) {
                    setCard(cardRes.data);
                }
                return axios.get(`${API_URL}/profile/${cardRes.data.artistID}`);
            })
            .then((profileRes) => {
                if (profileRes.status === 200) {
                    setOwner(profileRes.data);
                }
            });
    };

    const setLikedCard = () => {
        const rated = card.membersRated.find((member) => member == userInfo.id);
        console.log(rated);

        if (rated) isLiked(true);
    };

    useEffect(() => {
        getCard();
        setLikedCard();
    }, []);

    const likeCard = async () => {
        const res = await axios.post(`${API_URL}/rating`, {
            userId: userInfo.id,
            rating: 1,
            artworkId: card.artworkId,
        });
        if (res.status === 200) {
            isLiked(true);
        }
    };

    const unlikeCard = async () => {
        const res = await axios.delete(`${API_URL}/rating`, {
            data: {
                userId: userInfo.id,
                rating: 0,
                artworkId: card.artworkId,
            },
        });
        if (res.status === 200) {
            isLiked(false);
        }
    };

    return (
        <AppSuspense>
            <Box
                sx={{
                    height: '60vh',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 20px 0px',
                    borderRadius: '32px',
                    border: '1px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                    backgroundColor: 'white',
                    top: '80px',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item sm={12} md={4} lg={6}>
                        <Box
                            sx={{
                                minWidth: '300px',
                                maxWidth: '500px',
                                height: '358px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                maskImage:
                                    '-webkit-radial-gradient(center, white, black)',
                                borderRadius: '32px 0px 0px 32px',
                            }}
                        >
                            <img
                                style={{ width: '100%', height: '100%' }}
                                src={card?.image}
                                alt={card?.description}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <Box marginTop="20px" width={400}>
                            {userInfo && userInfo.id != card.artistID && (
                                <Button
                                    sx={{
                                        position: 'absolute',
                                        right: '30px',
                                        borderRadius: '20px',
                                        backgroundColor: 'red !important',
                                        color: 'white',
                                    }}
                                >
                                    Share to profile
                                </Button>
                            )}
                            <Typography variant="h4" textAlign={'left'}>
                                {card.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                component={'article'}
                                textAlign={'left'}
                            >
                                {card.description}
                            </Typography>
                        </Box>
                        <Box
                            sx={{ position: 'relative' }}
                            textAlign={'left'}
                            alignContent={'flex-end'}
                        >
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() =>
                                    navigate(`/profile/${card.artistID}`)
                                }
                            >
                                <Avatar
                                    // src={user.avatar}
                                    alt={owner.fullName}
                                    src={owner.avatar}
                                />
                            </IconButton>
                            <Link to={`/profile/${owner.accountId}`}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'black !important' }}
                                    display="inline"
                                >
                                    {owner.fullName}
                                </Typography>
                            </Link>
                            {userInfo.id != card.artistID && (
                                <Button
                                    sx={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '30px',
                                        borderRadius: '20px',
                                        backgroundColor: '#e1e1e1 !important',
                                        color: 'black',
                                    }}
                                >
                                    Follow
                                </Button>
                            )}
                        </Box>
                        <Box textAlign={'left'}>
                            {isAuthenticated && (
                                <Box
                                    textAlign={'left'}
                                    sx={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography component={'p'} variant="body2">
                                        {card.artworkRating}
                                    </Typography>
                                    {liked ? (
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            onClick={() => unlikeCard()}
                                        >
                                            <Favorite />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            onClick={() => likeCard()}
                                        >
                                            <FavoriteBorderOutlined />
                                        </IconButton>
                                    )}
                                </Box>
                            )}
                        </Box>
                        {card.isBuyAvailable && (
                            <>
                                <Typography
                                    textAlign={'left'}
                                    top={160}
                                    position={'absolute'}
                                >
                                    {`For sale - `}
                                    {card.price.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </Typography>
                                {userInfo.id != card.artistID && (
                                    <Button
                                        onClick={() =>
                                            navigate(`/buy/${card.artworkId}`)
                                        }
                                        sx={{
                                            position: 'absolute',
                                            right: '30px',
                                            borderRadius: '20px',
                                            backgroundColor: 'red !important',
                                            // top: '0',
                                            color: 'white',
                                        }}
                                    >
                                        Buy
                                    </Button>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </AppSuspense>
    );
}

export default CardDetails;
