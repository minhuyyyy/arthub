import { Avatar, Box, Button, Grid, Popover, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { MouseEvent, useEffect, useState } from 'react';
import PreOrderModal from '../Modals/PreOrderModal';
import { Masonry } from '@mui/lab';
import axios from 'axios';
import NotFound from '../../auth/NotFound';
import { toast } from 'react-toastify';

type ImageType = {
    artworkId: number;
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
    const API_URL = import.meta.env.VITE_API_URL;
    const { userId } = useParams();
    const { isAuthenticated, userInfo } = useAuth();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState<IProfilePageProps>();
    const [imgList, setImgList] = useState<ImageType[]>([]);
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

    const [open, isOpen] = useState(false);
    console.log(isAuthenticated);

    const openModal = () => {
        if (isAuthenticated) {
            return isOpen(true);
        }
        return navigate('/session/signin');
    };

    const copyProfileLink = () => {
        navigator.clipboard.writeText(
            `${import.meta.env.VITE_API_URL}/profile/${profile?.accountId}`
        );
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
            <Box position={'relative'} alignItems={'center'}>
                <Avatar src={profile?.avatar} sx={{ left: '50%' }} />
                <h2>{profile?.fullName}</h2>
                <p>ID:{profile?.accountId}</p>
                <p>{profile?.followerCount} followers</p>
            </Box>
            <div
                style={{
                    gap: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
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
                                navigate(`/profile/edit-profile/${userInfo.id}`)
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
                        <PreOrderModal open={open} isOpen={isOpen} />
                    </>
                )}
            </div>
            <Box sx={{ marginTop: '20px', width: '70vw' }}>
                <Masonry columns={{ xs: 2, md: 4 }} spacing={2}>
                    {imgList.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/card/${image.artworkId}`)}
                        >
                            <img
                                key={index}
                                srcSet={`${image.image}`}
                                src={`${image.image}`}
                                alt={image.description}
                                loading="lazy"
                                style={{
                                    borderRadius: '20px',
                                    display: 'block',
                                    width: '100%',
                                }}
                            />
                        </div>
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
