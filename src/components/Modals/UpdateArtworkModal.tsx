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
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { handleBudgetChange } from '../../utils/utils';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils/urls';
import { ArtworkType } from '../../types/artwork';
import { GenreType } from '../../types/genre';

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '330px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    overflowY: 'scroll',
    boxShadow: 24,
    p: 4,
};

function UpdateArtworkModal({
    artworkId,
    open,
    isOpen,
}: {
    artworkId: number;
    open: boolean;
    isOpen: Dispatch<SetStateAction<boolean>>;
}) {
    // const API_URL = import.meta.env.VITE_API_URL;
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>('');
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [showNewGenreInput, setShowNewGenreInput] = useState(false);
    const [newGenre, setNewGenre] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const { userInfo } = useAuth();

    const [artwork, setArtwork] = useState<ArtworkType>({});
    const [buyStatus, canBuy] = useState(false);
    const getArtwork = () => {
        axios
            .get(`${API_URL}/artwork/${artworkId}`)
            .then((res) => {
                if (res.status === 200) {
                    setArtwork(res.data);
                    setPhotoUrl(res.data.image);
                    canBuy(res.data.isBuyAvailable);
                    // setSelectedGenre(res.data.genreId);
                }
            })
            .catch((err) => toast.error(err.response.data.title));
    };
    const getGenres = () => {
        axios.get(`${API_URL}/genres`).then((res) => {
            if (res.status === 200) {
                setGenres(res.data); // Update genres state
            }
        });
    };
    const setName = () => {
        const genreName = genres.find(
            (genre: GenreType) => genre.genreId === artwork.genreId
        );
        if (genreName) {
            setSelectedGenre(genreName.name);
        }
    };
    useEffect(() => {
        getGenres();
        getArtwork();
        setName();
    }, []);
    const handleGenreChange = (e: SelectChangeEvent<string>) => {
        const { value } = e.target;
        if (value === 'add-new-genre') {
            setSelectedGenre('');
            setShowNewGenreInput(true);
        } else {
            setSelectedGenre(value);
            setShowNewGenreInput(false);
        }
    };
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'price') {
            const price = handleBudgetChange(e);
            setArtwork((prev) => ({
                ...prev,
                [name]: price, // Convert to number before setting state
            }));
        } else setArtwork((prevState) => ({ ...prevState, [name]: value }));
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

    const handleSubmit = async () => {
        await axios
            .put(`${API_URL}/artwork/${artworkId}`, {
                name: artwork?.name,
                description: artwork?.description,
                image: photoUrl,
                price: artwork?.price,
                artworkId: artworkId,
                artistId: userInfo.id,
                // owner: {
                //     artistName: userInfo.username,
                //     artistAvatar: userInfo.imageUrl,
                // },
                isPublic: true,
                isBuyAvailable: buyStatus,
                // genreName: selectedGenre.toString() || newGenre.toString(),
                // isPublic: true,
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Artwork updated successfully!');
                    handleClose();
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
    const handleClose = () => {
        isOpen(false);
    };

    return (
        <Box
        // position={'relative'}
        // marginTop={10}
        // sx={{
        //     backgroundColor: 'white',
        //     border: 1,
        //     borderRadius: 15,
        //     borderColor: 'white',
        //     paddingTop: '10px',
        //     maxHeight: '600px',
        //     minHeight: '500px',
        //     width: '900px',
        // }}
        >
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h4">
                        <strong>Update artwork </strong>
                    </Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={4} lg={6}>
                            <Box>
                                {photoUrl && (
                                    <img
                                        width="50%"
                                        height="50%"
                                        src={photoUrl}
                                    />
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
                                        width: '80%',
                                        border: 1,
                                        borderColor: '#a5a5a5',
                                    }}
                                >
                                    <Input
                                        id="title"
                                        name="name"
                                        value={artwork?.name}
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
                                        width: '80%',
                                        border: 1,
                                        borderColor: '#a5a5a5',
                                        marginTop: '20px',
                                    }}
                                >
                                    <Input
                                        id="description"
                                        name="description"
                                        onChange={(e) => handleChange(e)}
                                        value={artwork?.description}
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
                                        width: '80%',
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
                                            onChange={(e) =>
                                                handleGenreChange(e)
                                            }
                                        >
                                            {genres.map((genre) => (
                                                <MenuItem
                                                    key={genre.genreId}
                                                    value={genre.name}
                                                >
                                                    {genre.name}
                                                </MenuItem>
                                            ))}
                                            <MenuItem value="add-new-genre">
                                                Add another genre
                                            </MenuItem>
                                        </Select>
                                        {showNewGenreInput && (
                                            <div>
                                                <FormControl
                                                    sx={{ width: '80%' }}
                                                >
                                                    <label>
                                                        Artwork Genre:
                                                    </label>
                                                    <Input
                                                        id="genre"
                                                        name="category"
                                                        // variant="standard"
                                                        value={newGenre}
                                                        onChange={(e) => {
                                                            setNewGenre(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                    <br />
                                                </FormControl>
                                            </div>
                                        )}
                                        {selectedGenre && (
                                            <p>You selected {selectedGenre}</p>
                                        )}
                                        <br />
                                    </FormControl>
                                </Box>
                                <Box position={'relative'}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={buyStatus}
                                                    onChange={
                                                        handleCheckboxChange
                                                    }
                                                />
                                            }
                                            label="Available to buy"
                                        />
                                        {buyStatus === true && (
                                            <Box
                                                sx={{
                                                    // borderRadius: '20px',
                                                    width: '80%',
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
                                                    value={artwork?.price}
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                    placeholder="Enter price"
                                                />

                                                <Typography
                                                    sx={{
                                                        marginLeft: '20px',
                                                        display: 'inline',
                                                    }}
                                                >
                                                    {`Price: ${artwork?.price.toLocaleString(
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
                                                backgroundColor:
                                                    'red !important',
                                                color: 'white',
                                                marginTop: '20px',
                                            }}
                                        >
                                            Update
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}

export default UpdateArtworkModal;
