import { Avatar, Box, Button, Typography, styled } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
function EditProfilePage() {
    const { userId } = useParams();
    const { userInfo } = useAuth();
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>('');
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
        toast.error('test');
    }, []);

    return (
        <Box>
            <Typography variant="h3">Edit Profile</Typography>
            <Box>
                <Typography variant="body2">Photo</Typography>
                <Avatar src={userInfo.imageUrl} />
                <Button>
                    <VisuallyHiddenInput
                        type="file"
                        accept=".jpg, .png"
                        onChange={(e) => handleAddPhoto(e)}
                    />
                </Button>
            </Box>
        </Box>
    );
}

export default EditProfilePage;
