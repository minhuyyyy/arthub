import { Box, Typography, Modal, Avatar, IconButton } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import { ArtworkType } from '../../types/artwork';
import { ArtistType } from '../../types/artist';
import { formatDateShort } from '../../utils/helper/format.helper';
import { FavoriteOutlined } from '@mui/icons-material';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'left',
    alignContent: 'flex-start',
};

export default function ViewArtworkModal({
    open,
    isOpen,
    artworkId,
}: {
    open: boolean;
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
        genre: '',
        likes: [],
    });

    const getArtwork = async () => {
        try {
            const artworkRes = await axios.get(
                `${API_URL}/artwork/${artworkId}`
            );
            if (artworkRes.status === 200) {
                setArtwork(artworkRes.data);
                const artistRes = await axios.get(
                    `${API_URL}/profile/${artworkRes.data.artistID}`
                );
                if (artistRes.status === 200) {
                    setArtist(artistRes.data);
                    isOpen(true); // Open the modal after fetching data
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (open) {
            getArtwork();
        }
    }, [open]);

    const handleClose = () => {
        isOpen(false);
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
                        <Avatar src={artist.avatar} />
                        <Box
                            sx={{ display: 'inline-block', marginLeft: '10px' }}
                        >
                            <Typography variant="body1">
                                {artist.fullName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary' }}
                            >
                                {formatDateShort(artwork.artworkDate)}
                            </Typography>
                        </Box>
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
                        <Box>
                            <IconButton>
                                <FavoriteOutlined />
                            </IconButton>
                        </Box>
                    </Box>
                </Modal>
            )}
        </div>
    );
}
