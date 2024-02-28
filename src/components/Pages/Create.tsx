import { Box, Button, Grid, styled } from '@mui/material';
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
    const [photo, setPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoUrl(reader.result);
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
                <Grid item>
                    <Button
                        component='label'
                        role={undefined}
                        variant='contained'
                        tabIndex={-1}
                        startIcon={<CloudUpload />}>
                        Upload file
                        <VisuallyHiddenInput
                            type='file'
                            accept='.jpg, .png'
                            onChange={(e) => handleAddPhoto(e)}
                        />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Create;
