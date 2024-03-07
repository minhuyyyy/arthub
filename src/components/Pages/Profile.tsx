import {
    Avatar,
    Box,
    Button,
    Grid,
    Link,
    Popover,
    Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { MouseEvent, useEffect, useState } from 'react';
import PreOrderModal from '../Modals/PreOrderModal';
import { Masonry } from '@mui/lab';
import axios from 'axios';
import NotFound from '../../auth/NotFound';
import { toast } from 'react-toastify';
import CreatePost from './CreatePost';
import ViewArtworkModal from '../Modals/ViewArtworkModal';

type ImageType = {
    artworkId: number | null;
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
    // const path = useLocation();
    const API_URL = import.meta.env.VITE_API_URL;
    const { userId } = useParams();
    const { isAuthenticated, userInfo } = useAuth();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState<IProfilePageProps>();
    const [imgList, setImgList] = useState<ImageType[]>([]);
    const [open, isOpen] = useState(false);
    const [openPreOrder, isOpenPreOrder] = useState(false);
    const [selectedArtworkId, setSelectedArtworkId] = useState(null);
    const getProfile = async () => {
        setLoading(true);
        try {
            await axios
                .get(`${API_URL}/profile/${userId}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProfile(res.data);
                        setImgList(res.data.artworks);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        return <NotFound />;
                    } else toast.error('Something went wrong');
                });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProfile();
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
    // const listImage: ImageType[] = [
    //     {
    //         artworkId: 1,
    //         image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    //         name: 'Ảnh 1',
    //         description: 'Ảnh này được chụp bằng điện thoại di động',
    //     },
    //     {
    //         artworkId: 2,
    //         image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
    //         name: 'Ảnh 2',
    //         description: 'Ảnh này được chụp bằng điện thoại di động',
    //     },
    //     {
    //         artworkId: 3,
    //         image: 'https://cc-prod.scene7.com/is/image/CCProdAuthor/adobe-firefly-marquee-text-to-image-0-desktop-1000x1000?$pjpeg$&jpegSize=300&wid=1000',
    //         name: 'Ảnh 3',
    //         description: 'Ảnh này được chụp bằng điện thoại di động',
    //     },
    //     {
    //         artworkId: 4,
    //         image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    //         name: 'Ảnh 4',
    //         description: 'Ảnh này được chụp bằng điện thoại di động',
    //     },
    // ];
    // const followerCount = 100;

    // const handleDoubleClick = (imageId: number) => {
    //     console.log('Tym to:', imageId);
    // };

    return (
        <div
            style={{
                // marginTop: '30px',
                position: 'relative',
                width: '100%',
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
                                onClick={() => navigate(`/profile/pre-orders`)}
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
                            <Typography textAlign={'start'} marginLeft={'20px'}>
                                Artworks
                            </Typography>
                            {imgList.length > 0 ? (
                                <>
                                    <Link
                                        href="/"
                                        underline="none"
                                        color="#6095d2"
                                        position={'absolute'}
                                        right={'20px'}
                                    >
                                        View all artworks
                                    </Link>
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
                                                        key={image.artworkId} // Added key prop to Box component
                                                        sx={{
                                                            cursor: 'pointer',
                                                            boxSizing:
                                                                'border-box',
                                                            width: '80px',
                                                            height: '80px',
                                                            marginRight: '5px',
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
                                                            src={image.image}
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
                        <CreatePost />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '20px', width: '70vw' }}>
                {loading && (
                    <Grid item xs={12}>
                        <Typography variant="body2">Loading...</Typography>
                    </Grid>
                )}
            </Box>
        </div>
    );
}
