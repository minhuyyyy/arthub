import { Box, Button, Input } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { handleBudgetChange } from '../../utils/utils';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils/urls';

function CreatePost() {
    // const API_URL = import.meta.env.VITE_API_URL;
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>('');
    // const [genres, setGenres] = useState(null);
    const { userInfo } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
    });
    const [buyStatus, canBuy] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'price') {
            const price = handleBudgetChange(e);
            setFormData((prev) => ({
                ...prev,
                [name]: price, // Convert to number before setting state
            }));
        } else setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        await axios
            .post(`${API_URL}/artwork`, {
                name: formData.title,
                description: formData.description,
                image: photoUrl,
                price: formData.price,
                artistId: userInfo.id,
                // owner: {
                //     artistName: userInfo.username,
                //     artistAvatar: userInfo.imageUrl,
                // },
                isPublic: true,
                isBuyAvailable: buyStatus,
                genre: selectedGenre,
                // isPublic: true,
            })
            .then((res) => {
                if (res.status === 201) {
                    toast.success('Artwork posted successfully!');
                    setFormData({
                        title: '',
                        description: '',
                        price: 0,
                    });
                    setSelectedGenre('');
                    canBuy(false);
                    setPhoto(null), setPhotoUrl('');
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error(err.response.data.errors.Name[0]);
                } else toast.error('Something went wrong @@');
            });
    };
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        canBuy(e.target.checked);
    };

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    width: '350px',
                    height: '150px',
                    paddingTop: '20px',
                    border: 1,
                    borderRadius: '20px',
                    borderColor: '#fff',
                }}
            >
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
                    onClick={() => handleSubmit()}
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
            </Box>
        </Box>
    );
}

export default CreatePost;
