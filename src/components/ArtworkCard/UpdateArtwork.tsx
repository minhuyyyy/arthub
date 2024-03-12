import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { handleBudgetChange } from '../../utils/utils';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils/urls';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function UpdateArtwork() {
    // const API_URL = import.meta.env.VITE_API_URL;
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>('');
    const [genre, setGenre] = useState('');
    const [showNewGenreInput, setShowNewGenreInput] = useState(false);
    const [newGenre, setNewGenre] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const { userInfo } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
    });
    const [buyStatus, canBuy] = useState(false);

    const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value === 'add-new-genre') {
            setGenre('');
            setShowNewGenreInput(true);
        } else {
            setGenre(value);
            setShowNewGenreInput(false);
        }
    };
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

    const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPhoto(null);
            setPhotoUrl('');
        }
    };
    useEffect(() => {
        userInfo;
    }, []);
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
                genreName: selectedGenre.toString() || newGenre.toString(),
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
        <Box
            position={'relative'}
            marginTop={10}
            sx={{
                backgroundColor: 'white',
                border: 1,
                borderRadius: 15,
                borderColor: 'white',
                paddingTop: '10px',
                maxHeight: '600px',
                minHeight: '500px',
                width: '900px',
            }}
        >
            <Typography variant="h4">
                <strong>Upload artwork </strong>
            </Typography>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={4} lg={6}>
                    <Box>
                        {/* <input
                            type='file'
                            name=''
                            id=''
                        /> */}

                        {photoUrl && (
                            <img width="300px" height="300px" src={photoUrl} />
                        )}
                    </Box>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                    >
                        Upload file
                        <VisuallyHiddenInput
                            type="file"
                            accept=".png, .jpg"
                            onChange={(e) => handleAddPhoto(e)}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={6}>
                    <Box>
                        <Box
                            sx={{
                                borderRadius: '20px',
                                width: '400px',
                                border: 1,
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
                                width: '400px',
                                border: 1,
                                borderColor: '#a5a5a5',
                                marginTop: '20px',
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
                        <Box
                            sx={{
                                borderRadius: '20px',
                                width: '400px',
                                border: 1,
                                borderColor: '#a5a5a5',
                                marginTop: '20px',
                            }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Genre
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedGenre}
                                    label="Genre"
                                    sx={{ borderRadius: '20px' }}
                                    onChange={(e) => handleGenreChange(e)}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value="add-new-genre">
                                        Add another genre
                                    </MenuItem>
                                </Select>
                                {showNewGenreInput && (
                                    <div>
                                        <FormControl sx={{ width: '80%' }}>
                                            <label>Artwork Genre:</label>
                                            <Input
                                                id="genre"
                                                name="category"
                                                variant="standard"
                                                value={newGenre}
                                                onChange={(e) => {
                                                    setNewGenre(e.target.value);
                                                }}
                                            />
                                            <br />
                                        </FormControl>
                                    </div>
                                )}
                                {genre && <p>You selected {genre}</p>}
                                <br />
                            </FormControl>
                        </Box>
                        <Box position={'relative'}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={buyStatus}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Available to buy"
                                />
                                {buyStatus === true && (
                                    <Box
                                        sx={{
                                            // borderRadius: '20px',
                                            width: '400px',
                                            // border: 1,
                                            // borderColor: '#a5a5a5',
                                            marginTop: '20px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <TextField
                                            sx={{
                                                marginLeft: '10px',
                                            }}
                                            label="Enter price"
                                            // fullWidth
                                            id="price"
                                            name="price"
                                            inputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                            }}
                                            value={formData.price}
                                            onChange={(e) => handleChange(e)}
                                            placeholder="Enter price"
                                        />

                                        <Typography
                                            sx={{
                                                marginLeft: '20px',
                                                display: 'inline',
                                            }}
                                        >
                                            {`Price: ${formData.price.toLocaleString(
                                                'vi-VN',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}`}
                                        </Typography>
                                        {/* {buyStatus == true && } */}
                                    </Box>
                                )}
                            </FormGroup>
                            {photoUrl && (
                                <Button
                                    onClick={() => handleSubmit()}
                                    sx={{
                                        position: 'absolute',
                                        borderRadius: '20px',
                                        backgroundColor: 'red !important',
                                        color: 'white',
                                        marginTop: '20px',
                                    }}
                                >
                                    Post
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UpdateArtwork;
