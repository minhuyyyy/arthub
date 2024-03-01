import {
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';

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
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>('');
    // const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const handleGenreChange = (e: SelectChangeEvent) => {
        setSelectedGenre(e.target.value as string);
    };
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
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
    return (
        <Box>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={6}>
                    <Box>
                        {/* <input
                            type='file'
                            name=''
                            id=''
                        /> */}

                        {photoUrl && (
                            <img
                                width='200px'
                                height='300px'
                                src={photoUrl}
                            />
                        )}
                    </Box>
                    <Button
                        component='label'
                        role={undefined}
                        variant='contained'
                        tabIndex={-1}
                        startIcon={<CloudUpload />}>
                        Upload file
                        <VisuallyHiddenInput
                            type='file'
                            accept='.png, .jpg'
                            onChange={(e) => handleAddPhoto(e)}
                        />
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    lg={6}>
                    <Box>
                        <Box
                            sx={{
                                borderRadius: '20px',
                                width: '550px',
                                border: 1,
                                borderColor: '#a5a5a5',
                                // marginTop: '20px',
                            }}>
                            <Input
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={(e) => handleChange(e)}
                                placeholder='Add title'
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
                            }}>
                            <Input
                                id='description'
                                name='description'
                                onChange={(e) => handleChange(e)}
                                value={formData.description}
                                placeholder='Add description'
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
                            }}>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>
                                    Genre
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={selectedGenre}
                                    label='Age'
                                    sx={{ borderRadius: '20px' }}
                                    onChange={handleGenreChange}>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {photoUrl && (
                            <Button
                                sx={{
                                    borderRadius: '20px',
                                    backgroundColor: 'red !important',
                                    color: 'white',
                                    marginTop: '20px',
                                }}>
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
