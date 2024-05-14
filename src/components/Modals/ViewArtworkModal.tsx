import {
    Box,
    Typography,
    Modal,
    Avatar,
    IconButton,
    Button,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ArtworkType } from '../../types/artwork';
import { ArtistType } from '../../types/artist';
import { formatDateShort } from '../../utils/helper/format.helper';
import { Favorite, FavoriteOutlined } from '@mui/icons-material';
import MenuButton from '../Menu/Menu';
import useAuth from '../../hooks/useAuth';
import {
    getArtworkById,
    likeCard,
    unlikeCard,
} from '../../services/artworkServices/artworkServices';
import { getUserProfile } from '../../services/userServices/userServices';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderColor: '#fff',
    boxShadow: 24,
    p: 4,
    textAlign: 'left',
    alignContent: 'flex-start',
};

export default function ViewArtworkModal({
    open,
    isOpen,
    artworkId,
    bought,
}: {
    open: boolean;
    bought: boolean;
    isOpen: Dispatch<SetStateAction<boolean>>;
    artworkId: number | null;
}) {
    const [artist, setArtist] = useState<ArtistType>({
        accountId: 0,
        fullName: '',
        avatar: '',
    });
    const [artwork, setArtwork] = useState<ArtworkType>({
        artworkId: 0,
        name: '',
        description: '',
        image: '',
        price: 0,
        artistID: 0,
        isBuyAvailable: false,
        artworkRating: 0,
        genreId: 0,
        membersRated: [],
    });
    const [liked, isLiked] = useState<boolean>(false);
    const { userInfo } = useAuth();
    const getArtwork = async () => {
        try {
            const artworkRes = await getArtworkById(artworkId!);
            if (artworkRes.status === 200) {
                setArtwork(artworkRes.data);
                const artistRes = await getUserProfile(
                    artworkRes.data.artistID
                );
                if (artistRes.status === 200) {
                    setArtist(artistRes.data);
                    isOpen(true);
                }
            }
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const liked = artwork.membersRated.find(
            (member) => member === userInfo.id
        );
        if (liked) {
            isLiked(true);
        }
    }, [artwork, userInfo.id, isLiked]);

    useEffect(() => {
        if (open) {
            getArtwork();
        }
    }, [open]);

    const handleClose = () => {
        isOpen(false);
    };

    const rateCard = async () => {
        const res = await likeCard(userInfo.id, 1, artworkId!);
        if (res.status === 200) {
            isLiked(true);
        }
    };

    const unrateCard = async () => {
        try {
            const res = await unlikeCard(userInfo.id, 0, artworkId!);
            if (res.status === 200) {
                isLiked(false);
            }
        } catch (error) {
            // console.error('Error unliking card:', error);
        }
    };

    return (
        <div>
            {artwork && artist && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box sx={{ display: 'flex' }}>
                            <Avatar src={artist.avatar} />
                            <Box sx={{ position: 'absolute', right: '50px' }}>
                                <MenuButton
                                    type="artwork"
                                    artistId={artist.accountId}
                                    postId={artwork.artworkId}
                                />
                            </Box>
                            <Typography
                                variant="body1"
                                component={'h2'}
                                sx={{ marginLeft: '10px' }}
                            >
                                {artist.fullName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    position: 'absolute',
                                    top: '50px',
                                    left: '80px',
                                }}
                            >
                                {formatDateShort(artwork.artworkDate as Date)}
                            </Typography>
                        </Box>
                        {bought != true && artwork.isBuyAvailable && (
                            <>
                                <Typography
                                    variant="body2"
                                    component="strong"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {`For sale - `}
                                    {artwork.price.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </Typography>
                                <Button
                                    sx={{
                                        backgroundColor: 'red !important',
                                        borderRadius: '20px',
                                        color: 'white',
                                        position: 'absolute',
                                        right: '30px',
                                        top: '65px',
                                    }}
                                >
                                    Buy
                                </Button>
                            </>
                        )}
                        <Typography variant="body1" component="p">
                            {artwork.name}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {artwork.description}
                        </Typography>
                        <img
                            src={artwork.image}
                            alt={artwork.name}
                            style={{
                                maxWidth: '100%',
                                height: '200px',
                                marginTop: '10px',
                            }}
                        />
                        <Box sx={{ display: 'flex' }}>
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    bottom: '42px',
                                }}
                            >
                                {artwork.membersRated.length}
                            </Typography>
                            {liked ? (
                                <IconButton onClick={() => unrateCard()}>
                                    <FavoriteOutlined />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => rateCard()}>
                                    <Favorite />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Modal>
            )}
        </div>
    );
}
