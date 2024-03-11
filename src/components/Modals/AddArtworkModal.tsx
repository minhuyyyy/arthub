import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import useAuth from '../../hooks/useAuth';
import { ArtworkType } from '../../types/artwork';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
    display: 'flex',
};

export default function AddArtworkModal({
    open,
    isOpen,
    setSelectedArtwork,
}: {
    open: boolean;
    isOpen: Dispatch<SetStateAction<boolean>>;
    selectedArtwork: ArtworkType;
    setSelectedArtwork: Dispatch<SetStateAction<ArtworkType>>;
}) {
    const { userInfo } = useAuth();
    const handleClose = () => isOpen(false);
    const [artworks, setArtworks] = useState<ArtworkType[]>([]);
    const getArtwork = async () => {
        const res = await axios.get(`${API_URL}/artwork/artist/${userInfo.id}`);
        if (res.status === 200) {
            setArtworks(res.data);
        }
    };

    useEffect(() => {
        if (open) {
            getArtwork();
        }
    }, [open]);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {artworks.map((artwork) => (
                        <Box
                            onClick={() => {
                                setSelectedArtwork(artwork);
                                isOpen(false);
                            }}
                            sx={{
                                width: '200px',
                                height: '200px',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                key={artwork.artworkId}
                                src={artwork.image}
                                alt={artwork.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    marginTop: '10px',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Modal>
        </div>
    );
}
