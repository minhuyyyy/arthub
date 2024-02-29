import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    InputBase,
    Typography,
    styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FakeCard } from '../../card';
import { CardType } from '../../types/card';
import { FavoriteBorderOutlined, Send } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const Comment = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: '#e1e1e1',
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '65%',
    [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(3),
        width: '65%',
    },
}));
function CardDetails() {
    const navigate = useNavigate();
    const [card, setCard] = useState<CardType>({
        _id: '',
        imgDescription: '',
        imgLink: '',
        owner: {
            name: '',
            userId: '',
        },
        savedBy: [],
        owns: false,
        hasSaved: false,
        comments: [],
        createdAt: '',
        tags: [],
        AIgenerated: false,
    });
    const [comment, setComment] = useState('');
    const { _id } = useParams();
    const { isAuthenticated, userInfo } = useAuth();
    useEffect(() => {
        const foundCard = FakeCard.find((card) => card._id === _id);
        if (foundCard) {
            console.log(foundCard);

            setCard(foundCard);
        }
    }, [_id]);

    return (
        <Box
            sx={{
                height: '70vh',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 20px 0px',
                borderRadius: '32px',
                border: '1px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
            }}>
            <Grid
                container
                spacing={2}>
                <Grid
                    item
                    sm={12}
                    md={4}
                    lg={6}>
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
                        }}>
                        <img
                            style={{ width: '100%', height: '100%' }}
                            src={card?.imgLink}
                            alt={card?.imgDescription}
                        />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    lg={6}>
                    <Box marginTop='30px'>
                        <Button
                            sx={{
                                borderRadius: '20px',
                                backgroundColor: 'red !important',
                                color: 'white',
                            }}>
                            Share to profile
                        </Button>
                        <Typography
                            variant='h4'
                            textAlign={'left'}>
                            {card.imgDescription}
                        </Typography>
                    </Box>
                    <Box
                        textAlign={'left'}
                        alignContent={'flex-end'}>
                        <IconButton
                            size='large'
                            edge='end'
                            aria-label='account of current user'
                            aria-haspopup='true'
                            color='inherit'
                            onClick={() =>
                                navigate(`/profile/${card.owner.userId}`)
                            }>
                            <Avatar
                                // src={user.avatar}
                                alt={card.owner.name}
                                src={card.imgLink}
                            />
                        </IconButton>
                        <Link to={`/profile/${card.owner.userId}`}>
                            <Typography
                                variant='body2'
                                sx={{ color: 'black !important' }}
                                display='inline'>
                                {card.owner.name}
                            </Typography>
                        </Link>
                        <Button
                            sx={{
                                marginLeft: '20px',
                                borderRadius: '20px',
                                backgroundColor: '#e1e1e1 !important',
                                color: 'black',
                            }}>
                            Follow
                        </Button>
                    </Box>
                    <Box textAlign={'left'}>
                        <Typography variant='body1'>
                            <strong>Comments</strong>
                        </Typography>
                    </Box>
                    {isAuthenticated && (
                        <Box textAlign={'left'}>
                            <Typography
                                variant='body1'
                                display={'inline'}>
                                {card.comments.length > 0 ? (
                                    <strong>
                                        {card.comments.length} comments
                                    </strong>
                                ) : (
                                    <strong>What do you think?</strong>
                                )}
                            </Typography>
                            <IconButton
                                size='large'
                                edge='end'>
                                <FavoriteBorderOutlined />
                            </IconButton>
                            <Box
                                display={'flex'}
                                flexDirection={'row'}>
                                <Avatar src={userInfo.imageUrl} />
                                <Comment>
                                    <StyledInputBase
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        placeholder='Add comment'></StyledInputBase>
                                </Comment>
                                {comment.length > 0 && (
                                    <IconButton
                                        size='small'
                                        edge='end'>
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
                </Grid>
            </Grid>
        </Box>
    );
}

export default CardDetails;
