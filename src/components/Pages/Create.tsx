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
    SelectChangeEvent,
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
import { MOCK_API_URL } from '../../utils/urls';

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

function Create() {
    // const API_URL = import.meta.env.VITE_API_URL;
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>('');
    // const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const handleGenreChange = (e: SelectChangeEvent) => {
        setSelectedGenre(e.target.value as string);
    };
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
        console.log(userInfo);
    }, []);
    const handleSubmit = async () => {
        await axios
            .post(`${MOCK_API_URL}/artworks`, {
                id: 3,
                artworkId: 3,
                name: formData.title,
                description: formData.description,
                image: photoUrl,
                owner: {
                    artistId: userInfo.id,
                    artistName: userInfo.username,
                    artistAvatar: userInfo.imageUrl,
                },
                price: formData.price,
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
        <Box position={'relative'}>
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={6}>
                    <Box>
                        {/* <input
                            type='file'
                            name=''
                            id=''
                        /> */}

                        {photoUrl && (
                            <img width="200px" height="300px" src={photoUrl} />
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
                                width: '550px',
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
                                width: '550px',
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
                                width: '550px',
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
                                    label="Age"
                                    sx={{ borderRadius: '20px' }}
                                    onChange={handleGenreChange}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
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
                                            width: '550px',
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
                        </Box>
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
                </Grid>
            </Grid>
        </Box>
    );
}

export default Create;
