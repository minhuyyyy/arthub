import { Box, Button, Typography } from '@mui/material';
import { Container, StyledInputBase } from '../../utils/InputComponents';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState<string>('');
    const navigate = useNavigate();
    const verifyPassword = async () => {
        await axios.post(`${API_URL}/change-password`, {
            oldPassword: oldPassword,
            jwt: localStorage.getItem('accessToken'),
        });
    };
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
            }}
        >
            <Box sx={{ margin: '0 auto', width: '80%' }}>
                <Typography variant="h4" component="header">
                    Change Password
                </Typography>
                <Box sx={{ marginLeft: '20%' }}>
                    <Container>
                        <StyledInputBase
                            fullWidth
                            placeholder="Enter old password"
                            onChange={(e) => setOldPassword(e.target.value)}
                        ></StyledInputBase>
                    </Container>
                </Box>
                <Button
                    variant="contained"
                    onClick={() => navigate('/profile/new-password')}
                >
                    Check
                </Button>
            </Box>
        </Box>
    );
}

export default ChangePassword;
