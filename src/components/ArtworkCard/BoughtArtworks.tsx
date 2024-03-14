import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { ArtworkType } from '../../types/artwork';
import { API_URL } from '../../utils/urls';
import ViewArtworkModal from '../Modals/ViewArtworkModal';

function BoughtArtworks({ profileId }: { profileId: string }) {
    const [open, isOpen] = useState<boolean>(false);
    const [selectedArtworkId, setSelectedArtworkId] = useState<number>(0);
    const [imgList, setImgList] = useState<ArtworkType[]>([]);

    const getBoughtArtworks = async () => {
        try {
            const res = await axios.get(`${API_URL}/order/buyer/${profileId}`);
            if (res.status === 200) {
                const artworks: ArtworkType[] = [];
                for (const order of res.data) {
                    for (const artwork of order.orderDetails) {
                        const resArtwork = await axios.get(
                            `${API_URL}/artwork/${artwork.artworkId}`
                        );
                        if (resArtwork.status === 200) {
                            artworks.push(resArtwork.data);
                        }
                    }
                }
                setImgList(artworks);
            }
        } catch (error) {
            console.error('Error fetching bought artworks:', error);
        }
    };

    useEffect(() => {
        getBoughtArtworks();
    }, []);

    return (
        <Grid container>
            <Box>
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
                            marginTop: '20px',
                        }}
                    >
                        <Typography textAlign={'start'} marginLeft={'20px'}>
                            Bought Artworks
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
                                    {imgList.map((image) => (
                                        <Box
                                            key={image.artworkId}
                                            sx={{
                                                cursor: 'pointer',
                                                boxSizing: 'border-box',
                                                width: '80px',
                                                height: '80px',
                                                marginRight: '5px',
                                                marginBottom: '20px',
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
                                                    objectFit: 'cover',
                                                }}
                                                src={image.image}
                                                alt={image.name}
                                            />
                                        </Box>
                                    ))}
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
            </Box>
            <ViewArtworkModal
                bought
                open={open}
                isOpen={isOpen}
                artworkId={selectedArtworkId}
            />
        </Grid>
    );
}

export default BoughtArtworks;