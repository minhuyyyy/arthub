import {
    Avatar,
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppSuspense from '../Suspense';
import { CloudUpload } from '@mui/icons-material';
import NotFound from '../../auth/NotFound';
import {
    getUserProfile,
    updateProfile,
} from '../../services/userServices/userServices';

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

interface IProfilePageProps {
    accountId?: number;
    avatar?: string;
    followerCount?: number;
    fullName: string;
    emailAddress: string;
}
function EditProfilePage() {
    // const [photo, setPhoto] = useState<File | null>(null);
    const [profile, setProfile] = useState<IProfilePageProps>({
        avatar: '',
        fullName: '',
        emailAddress: '',
    });
    const { userId } = useParams();
    const [photoUrl, setPhotoUrl] = useState<string>('');
    const getProfile = async () => {
        const res = await getUserProfile(userId!);
        if (res.status === 200) {
            setProfile(res.data);
            setPhotoUrl(res.data.avatar);
        } else if (res.status === 404) {
            toast.error('Profile not found');
        }
    };
    const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            // setPhoto(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            // setPhoto(null);
            setPhotoUrl('');
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        await updateProfile(
            userId!,
            profile.fullName,
            profile.emailAddress,
            profile.avatar!
        );
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <AppSuspense>
            {profile ? (
                <Box
                    className="edit-profile-container"
                    position={'relative'}
                    sx={{
                        border: 1,
                        borderRadius: '20px',
                        backgroundColor: '#fff',
                        borderColor: '#fff',
                        paddingBottom: '10px',
                        paddingRight: '20px',
                        paddingLeft: '20px',
                    }}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Box className="avatar-section">
                                <Typography variant="h3">
                                    Edit profile
                                </Typography>
                                <Avatar
                                    src={photoUrl}
                                    alt="Profile Picture"
                                    sx={{ width: 100, height: 100 }}
                                />
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    sx={{
                                        position: 'absolute',
                                        top: '90px',
                                        left: '150px',
                                    }}
                                    startIcon={<CloudUpload />}
                                >
                                    Change photo
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept=".png, .jpg"
                                        onChange={(e) => handleAddPhoto(e)}
                                    />
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className="form-section" position={'relative'}>
                                <Box textAlign={'left'}>
                                    <TextField
                                        placeholder="Họ và tên"
                                        variant="outlined"
                                        sx={{
                                            marginTop: '20px',
                                            marginBottom: '20px',
                                        }}
                                        value={profile?.fullName}
                                        onChange={(e) => handleInputChange(e)}
                                        fullWidth
                                        name="fullName"
                                    />
                                </Box>
                                <Box textAlign={'left'}>
                                    <TextField
                                        placeholder="Email"
                                        sx={{ marginBottom: '20px' }}
                                        variant="outlined"
                                        value={profile?.emailAddress}
                                        onChange={(e) => handleInputChange(e)}
                                        fullWidth
                                        name="emailAddress"
                                        type="email"
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={handleUpdateProfile}
                                    // disabled={!profile?.fullNa   me || !profile.emailAddress}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <NotFound />
            )}
        </AppSuspense>
    );
}

export default EditProfilePage;
