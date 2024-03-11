import { Avatar, Box, Button, Grid, Popover, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { MouseEvent, useEffect, useState } from 'react';
import PreOrderModal from '../Modals/PreOrderModal';
import axios from 'axios';
import NotFound from '../../auth/NotFound';
import { toast } from 'react-toastify';
import CreatePost from './CreatePost';
import ViewArtworkModal from '../Modals/ViewArtworkModal';
import Post from '../Posts/Post';
import { PostType } from '../../types/post';
import AppSuspense from '../Suspense';
// import { MOCK_API_URL } from '../../utils/urls';

type ImageType = {
    artworkId?: number;
    image: string;
    name: string;
    description: string;
};

interface IProfilePageProps {
    accountId: number;
    avatar?: string;
    followerCount?: number;
    fullName: string;
    artworks: ImageType[];
}

export default function ProfilePage() {
    document.title = 'Profile';
    const API_URL = import.meta.env.VITE_API_URL;
    const { userId } = useParams();
    const { isAuthenticated, userInfo } = useAuth();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState<IProfilePageProps>({});
    const [imgList, setImgList] = useState<ImageType[]>([]);
    const [open, isOpen] = useState(false);
    const [openPreOrder, isOpenPreOrder] = useState(false);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [selectedArtworkId, setSelectedArtworkId] = useState(null);
    const getProfile = async () => {
        // setLoading(true);
        try {
            await axios
                .get(`${API_URL}/profile/${userId}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProfile(res.data);
                        setImgList(res.data.artworks);
                        // setLoading(false);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        return <NotFound />;
                    } else toast.error('Something went wrong');
                });
        } catch (error) {
            // setLoading(false);
        }
    };
    const getPosts = async () => {
        try {
            const postPromise = axios.get(`${API_URL}/post/user/${userId}`);
            const postResponse = await postPromise;

            if (postResponse.status === 200) {
                const postData = postResponse.data.items;
                const artworkPromises = postData.map(async (item) => {
                    // Add a 2-second delay before making the artwork API call
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    return axios.get(`${API_URL}/artwork/${item.artworkId}`);
                });
                const artworkResponses = await Promise.all(artworkPromises);
                const artworkImages = artworkResponses.map(
                    (response) => response.data.image
                );
                const postsWithImages = postData.map((item, index) => ({
                    ...item,
                    image: artworkImages[index],
                }));
                setPosts(postsWithImages);
            } else {
                throw new Error('Failed to fetch post data');
            }
        } catch (error) {
            console.error('Error fetching posts and artwork:', error);
        }
    };

    useEffect(() => {
        getProfile();
        getPosts();
    }, []);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const popoverOpen = Boolean(anchorEl);
    const id = popoverOpen ? 'simple-popover' : undefined;

    console.log(isAuthenticated);

    const openModal = () => {
        if (isAuthenticated) {
            return isOpenPreOrder(true);
        }
        return navigate('/session/signin');
    };

    const copyProfileLink = () => {
        navigator.clipboard.writeText(`${location.host}${location.pathname}`);
    };

    return (
        <AppSuspense>
            <div
                style={{
                    // marginTop: '30px',
                    position: 'relative',
                    width: '70vw',
                }}
            >
                <Box
                    borderRadius={10}
                    border={1}
                    borderColor={'white'}
                    sx={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        height: '170px',
                        marginRight: '50px',
                        marginBottom: '30px',
                    }}
                >
                    <Avatar
                        src={profile?.avatar}
                        sx={{
                            marginLeft: '5%',
                            marginTop: '2%',
                            width: '100px',
                            height: '100px',
                        }}
                    />
                    <div>
                        <h2 style={{ width: '200px', textAlign: 'left' }}>
                            {profile?.fullName}
                        </h2>
                        <p style={{ textAlign: 'left' }}>
                            {profile?.followerCount} followers
                        </p>
                        <Button
                            onClick={(e) => {
                                copyProfileLink();
                                handleClick(e);
                            }}
                            color="success"
                            variant="contained"
                        >
                            Share profile
                        </Button>
                        <Popover
                            id={id}
                            open={popoverOpen}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography
                                sx={{
                                    p: 2,
                                    backgroundColor: 'dimgray',
                                }}
                            >
                                Profile link coppied!
                            </Typography>
                        </Popover>

                        {userInfo.id === userId ? (
                            <>
                                <Button
                                    color="info"
                                    variant="contained"
                                    onClick={() =>
                                        navigate(
                                            `/profile/edit-profile/${userInfo.id}`
                                        )
                                    }
                                >
                                    Edit profile
                                </Button>
                                <Button
                                    color="info"
                                    variant="contained"
                                    onClick={() =>
                                        navigate(`/profile/pre-orders`)
                                    }
                                >
                                    Pre-orders
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={openModal}
                                    color="info"
                                    variant="contained"
                                >
                                    Pre-order from {profile?.fullName}
                                </Button>
                                <PreOrderModal
                                    open={openPreOrder}
                                    isOpen={isOpenPreOrder}
                                />
                            </>
                        )}
                    </div>
                </Box>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={6}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    width: '380px',
                                    minHeight: '200px',
                                    paddingTop: '20px',
                                    border: 1,
                                    borderRadius: '20px',
                                    borderColor: '#fff',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    position: 'relative',
                                }}
                            >
                                <Typography
                                    textAlign={'start'}
                                    marginLeft={'20px'}
                                >
                                    Artworks
                                </Typography>
                                {imgList.length > 0 ? (
                                    <>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'flex-start',
                                                marginTop: '40px',
                                                width: '100%',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            {imgList.slice(0, 8).map(
                                                (
                                                    image // Adjust mapping logic to limit to 9 images
                                                ) => (
                                                    <>
                                                        <Box
                                                            key={
                                                                image.artworkId
                                                            } // Added key prop to Box component
                                                            sx={{
                                                                cursor: 'pointer',
                                                                boxSizing:
                                                                    'border-box',
                                                                width: '80px',
                                                                height: '80px',
                                                                marginRight:
                                                                    '5px',
                                                                marginBottom:
                                                                    '20px',
                                                            }}
                                                            onClick={() => {
                                                                isOpen(true);
                                                                setSelectedArtworkId(
                                                                    image.artworkId
                                                                );
                                                            }}
                                                        >
                                                            <img
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                                src={
                                                                    image.image
                                                                }
                                                                alt={image.name}
                                                            />
                                                        </Box>
                                                        <ViewArtworkModal
                                                            open={open}
                                                            isOpen={isOpen}
                                                            artworkId={
                                                                selectedArtworkId
                                                            }
                                                        />
                                                    </>
                                                )
                                            )}
                                        </Box>
                                    </>
                                ) : (
                                    <Typography
                                        variant="body1"
                                        position={'absolute'}
                                        right={'20px'}
                                    >
                                        No artwork yet
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <Box position={'relative'}>
                                <CreatePost />
                                {posts.map((post) => (
                                    <Box
                                        key={post.postId} // Add key prop
                                        sx={{
                                            position: 'relative',
                                            width: '84%',
                                            marginTop: '30px',
                                            height: '100%',
                                            backgroundColor: '#fff',
                                            border: 1,
                                            borderColor: '#fff',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        <Post
                                            key={post.postId} // Add key prop
                                            title={post.title} // Access properties from post object
                                            description={post.description} // Access properties from post object
                                            image={post.image} // Access properties from post object
                                            postId={post.postId} // Access properties from post object
                                            accountId={profile.accountId} // Access properties from post object
                                            avatar={profile?.avatar}
                                            fullName={profile.fullName}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {/* <Box sx={{ marginTop: '20px', width: '70vw' }}>
                    {loading && (
                        <Grid item xs={12}>
                            <Typography variant="body2">Loading...</Typography>
                        </Grid>
                    )}
                </Box> */}
            </div>
        </AppSuspense>
    );
}
