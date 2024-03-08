import { Box, Button, Input } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { handleBudgetChange } from '../../utils/utils';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils/urls';
import AddArtworkModal from '../Modals/AddArtworkModal';
import { ArtworkType } from '../../types/artwork';

function CreatePost() {
    const { userInfo } = useAuth();
    const [openSelectArtwork, isOpenSelectArtwork] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState<ArtworkType>({
        artworkId: 0,
        name: '',
        description: '',
        image: '',
        price: 0,
        artistID: 0,
        isBuyAvailable: true,
        artworkRating: 0,
        artworkDate: new Date(),
        genre: '',
    });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'price') {
            const price = handleBudgetChange(e);
            setFormData((prev) => ({
                ...prev,
                [name]: price,
            }));
        } else setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        await axios
            .post(`${API_URL}/post/post`, {
                title: formData.title,
                description: formData.description,
                memberId: userInfo.id,
                image: selectedArtwork.image,
                artworkId: selectedArtwork.artworkId,
            })
            .then((res) => {
                if (res.status === 201) {
                    toast.success('Artwork posted successfully!');
                    setFormData({
                        title: '',
                        description: '',
                    });
                    setSelectedArtwork(null);
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error(err.response.data.errors.Name[0]);
                } else toast.error('Something went wrong @@');
            });
    };

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    width: '350px',
                    height: '100%',
                    paddingTop: '20px',
                    border: 1,
                    borderRadius: '20px',
                    borderColor: '#fff',
                }}
            >
                {selectedArtwork.image && (
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            // objectFit: 'cover',
                        }}
                        src={selectedArtwork.image}
                    />
                )}
                <Box
                    sx={{
                        borderRadius: '20px',
                        width: '300px',
                        border: 1,
                        marginLeft: '20px',
                        borderColor: '#a5a5a5',
                    }}
                >
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleChange(e)}
                        placeholder="Add title"
                        sx={{ marginLeft: '10px' }}
                        disableUnderline
                        fullWidth
                    />
                </Box>

                <Box
                    sx={{
                        borderRadius: '20px',
                        width: '300px',
                        marginLeft: '20px',
                        border: 1,
                        borderColor: '#a5a5a5',
                        marginTop: '10px',
                    }}
                >
                    <Input
                        id="description"
                        name="description"
                        onChange={(e) => handleChange(e)}
                        value={formData.description}
                        placeholder="Add description"
                        disableUnderline
                        multiline
                        sx={{ marginLeft: '10px' }}
                        fullWidth
                    />
                </Box>
                <Button
                    onClick={() => isOpenSelectArtwork(true)}
                    sx={{
                        borderRadius: '20px',
                        backgroundColor: '#e1e1e1 !important',
                        color: 'black',
                        marginTop: '10px',
                        marginRight: '20px',
                    }}
                >
                    Add artwork
                </Button>
                <Button
                    onClick={() => handleSubmit()}
                    sx={{
                        borderRadius: '20px',
                        backgroundColor: 'red !important',
                        color: 'white',
                        marginTop: '10px',
                    }}
                >
                    Post
                </Button>
                <AddArtworkModal
                    open={openSelectArtwork}
                    isOpen={isOpenSelectArtwork}
                    selectedArtwork={selectedArtwork}
                    setSelectedArtwork={setSelectedArtwork}
                />
            </Box>
        </Box>
    );
}

export default CreatePost;
