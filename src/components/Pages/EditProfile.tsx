import {
    Avatar,
    Box,
    Button,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppSuspense from '../Suspense';
import axios from 'axios';

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
    accountId: number;
    avatar?: string;
    followerCount?: number;
    fullName: string;
    emailAddress: string;
}
function EditProfilePage() {
    const { userId } = useParams();
    const { userInfo } = useAuth();
    const [photo, setPhoto] = useState<File | null>(null);
    const [profile, setProfile] = useState<IProfilePageProps>();
    const [photoUrl, setPhotoUrl] = useState<string>(profile?.avatar || '');
    const API_URL = import.meta.env.VITE_API_URL;
    const getProfile = async () => {
        await axios.get(`${API_URL}/profile/${userInfo.id}`).then((res) => {
            if (res.status === 200) {
                setProfile(res.data);
            }
        });
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
        getProfile();
    }, []);

    return (
        <AppSuspense>
            <div className="edit-profile-container">
                <Typography variant="h6">Chỉnh sửa hồ sơ</Typography>

                <div className="avatar-section">
                    <Avatar
                        src={profile?.avatar}
                        alt="Profile Picture"
                        sx={{ width: 100, height: 100 }}
                    />
                    <label htmlFor="avatar-upload">
                        <Button
                            variant="contained"
                            component="span"
                            sx={{ mt: 1 }}
                        >
                            Thay đổi ảnh đại diện
                        </Button>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAddPhoto}
                        />
                    </label>
                </div>

                <div className="form-section">
                    <TextField
                        placeholder="Họ và tên"
                        variant="outlined"
                        value={profile?.fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        fullWidth
                        name="fullName"
                    />
                    <TextField
                        placeholder="Email"
                        variant="outlined"
                        value={profile?.emailAddress}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        name="fullName"
                    />
                </div>

                {/* Add buttons or other actions based on your needs */}
                <Button
                    variant="contained"
                    disabled={!profile?.fullName || !profile.emailAddress}
                >
                    Cập nhật
                </Button>
            </div>
        </AppSuspense>
    );
}

export default EditProfilePage;
