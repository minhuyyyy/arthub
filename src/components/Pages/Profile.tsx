import { Box, Button, Grid, Popover, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { MouseEvent, useState } from 'react';
import PreOrderModal from '../Modals/PreOrderModal';
import { Masonry } from '@mui/lab';

export default function ProfilePage() {
    const { userId } = useParams();
    const { isAuthenticated, userInfo } = useAuth();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
            `${import.meta.env.VITE_API_URL}/profile/${userId}`
        );
    };
    const listImage = [
        {
            id: 1,
            url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        },
        {
            id: 2,
            url: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
        },
        {
            id: 3,
            url: 'https://cc-prod.scene7.com/is/image/CCProdAuthor/adobe-firefly-marquee-text-to-image-0-desktop-1000x1000?$pjpeg$&jpegSize=300&wid=1000',
        },
        {
            id: 4,
            url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        },
    ];
    const followerCount = 100;

    return (
        <div style={{ marginTop: '20px', width: '100%' }}>
            <img
                style={{
                    borderRadius: '50%',
                }}
                alt="avatar"
                height={120}
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/90110224_2567536326818648_5739247854275264512_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7a1959&_nc_eui2=AeFQzEvlYN2ixkzLcG_IWZdvygL0wfG9NZTKAvTB8b01lE26Nt05MwEVYvip2V31i3Vdio97PFojigHUZAlG5bso&_nc_ohc=VhdAaa53bmgAX9GnKDn&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfAQni4Lemk46uHXpSCkMGZFB0x_imA7StqfJRiRQmfr7Q&oe=6607C24E"
            />
            <h2>Quyet Anh Le</h2>
            <p>{followerCount} followers</p>
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
                    <Button color="info" variant="contained">
                        Edit profile
                    </Button>
                ) : (
                    <>
                        <Button
                            onClick={openModal}
                            color="info"
                            variant="contained"
                        >
                            Pre-order from Quyet Anh Le
                        </Button>
                        <PreOrderModal open={open} isOpen={isOpen} />
                    </>
                )}
            </div>
            <Box sx={{ marginTop: '20px', width: '70vw' }}>
                <Masonry columns={{ xs: 2, md: 4 }} spacing={2}>
                    {listImage.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/card/${image.id}`)}
                        >
                            <img
                                srcSet={`${image.url}?w=162&auto=format&dpr=2 2x`}
                                src={`${image.url}?w=162&auto=format`}
                                // alt={image.title}
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
