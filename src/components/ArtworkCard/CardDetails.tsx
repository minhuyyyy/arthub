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
import { CardType } from '../../types/card';
import { Favorite, FavoriteBorderOutlined, Send } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import { Container, StyledInputBase } from '../../utils/InputComponents';
import axios from 'axios';
import { MOCK_API_URL } from '../../utils/urls';

function CardDetails() {
    const navigate = useNavigate();
    const [card, setCard] = useState<CardType>({
        artworkId: 0,
        description: '',
        owner: {
            artistId: 0,
            artistName: '',
            artistAvatar: '',
        },
        name: '',
        image: '',
        price: 0,
        isBuyAvailable: false,
        savedBy: [],
        comments: [],
        likes: [],
        purchasedBy: {
            userId: 0,
        },
        artworkDate: '',
        genres: [],
    });
    const [comment, setComment] = useState('');
    const [liked, isLiked] = useState(false);
    const { id } = useParams();
    const { isAuthenticated, userInfo } = useAuth();
    useEffect(() => {
        const getCard = async () => {
            try {
                const res = await axios.get(
                    `${MOCK_API_URL}/artworks/?id=${id}`
                );
                if (res.status === 200) {
                    setCard(res.data[0]); // Assuming the response is an array of cards and you want to set the first one
                }
            } catch (error) {
                console.error('Error fetching card details:', error);
            }
        };
        getCard();
    }, [id]);

    const likeCard = async () => {
        const res = await axios.put(`${MOCK_API_URL}/artworks/${id}`, {
            likes: {
                userId: userInfo.id,
            },
        });
        if (res.status === 200) {
            isLiked(true);
        }
    };

    // const handleComment = async() => {
    //     await
    // }

    return (
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
            }}
        >
            <Grid container spacing={2}>
                <Grid item sm={12} md={4} lg={6}>
                    <Box
                        sx={{
                            minWidth: '300px',
                            maxWidth: '500px',
                            height: '100%',
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
                        <Typography variant="h4" textAlign={'left'}>
                            {card.name}
                        </Typography>
                        <Typography variant="h4" textAlign={'left'}>
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
                                navigate(`/profile/${card.owner.artistId}`)
                            }
                        >
                            <Avatar
                                // src={user.avatar}
                                alt={card.owner.artistName}
                                src={card.owner.artistAvatar}
                            />
                        </IconButton>
                        <Link to={`/profile/${card.owner.artistId}`}>
                            <Typography
                                variant="body2"
                                sx={{ color: 'black !important' }}
                                display="inline"
                            >
                                {card.owner.artistName}
                            </Typography>
                        </Link>
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
                    </Box>
                    <Box textAlign={'left'}>
                        <Typography variant="body1">
                            <strong>Comments</strong>
                        </Typography>
                        {isAuthenticated && (
                            <Box
                                textAlign={'left'}
                                sx={{ position: 'absolute', bottom: '0px' }}
                            >
                                <Typography variant="body1" display={'inline'}>
                                    {card?.comments?.length > 0 ? (
                                        <strong>
                                            {card.comments.length} comments
                                        </strong>
                                    ) : (
                                        <strong>What do you think?</strong>
                                    )}
                                </Typography>
                                {liked ? (
                                    <IconButton size="large" edge="end">
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
                                <Box
                                    position={'relative'}
                                    display={'flex'}
                                    flexDirection={'row'}
                                >
                                    <Avatar src={userInfo.imageUrl} />
                                    <Container>
                                        <StyledInputBase
                                            multiline
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                            placeholder="Add comment"
                                        ></StyledInputBase>
                                    </Container>
                                    {comment.length > 0 && (
                                        <IconButton size="small" edge="end">
                                            <Send
                                            // sx={{
                                            //     backgroundColor:
                                            //         'red !important',
                                            // }}
                                            />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CardDetails;
