import {
    Avatar,
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router';
import { API_URL, MOCK_API_URL } from '../../utils/urls';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

function PreOrderModal({
    open,
    isOpen,
}: {
    open: boolean;
    isOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const { userId } = useParams();
    const [msg, setMsg] = useState<string>('');
    const [budget, setBudget] = useState<number>(0);
    const [profile, setProfile] = useState([]);
    const { userInfo } = useAuth();
    const getProfile = async () => {
        await axios
            .get(`${API_URL}/profile/${userId}`)
            .then((res) => {
                if (res.status === 200) setProfile(res.data);
            })
            .catch((err) => toast.error(err.response.data));
    };
    const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Remove non-numeric characters from the value
        const numericValue = parseFloat(value.replace(/\D/g, ''));
        // Update the budget state
        // console.log(value, numericValue);

        if (isNaN(numericValue)) {
            setBudget(0);
        } else setBudget(numericValue);
    };
    useEffect(() => {
        getProfile();
    }, []);
    useEffect(() => {
        if (open) {
            handleOpen();
        } else handleClose();
    }, [open]);
    const handleOpen = () => isOpen(true);
    const handleClose = () => isOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleSubmitOrder = async () => {
        await axios
            .post(`${MOCK_API_URL}/pre-orders`, {
                id: 1,
                from: userInfo.id,
                to: userId,
                budget: budget,
                message: msg,
            })
            .then((res) => {
                if (res.status === 201) {
                    isOpen(false);
                    toast.success('Pre order has been sent!');
                }
            })
            .catch((error) => toast.error(error.response.data));
    };
    return (
        <Modal open={open} onClose={handleClose}>
            {profile && (
                <>
                    <Box textAlign={'center'} sx={style}>
                        <Box>
                            <Box>
                                <Avatar
                                    sx={{ margin: '0 auto' }}
                                    src={profile.avatar}
                                />
                                <Typography variant="h5">
                                    <strong>{profile.fullName}</strong>
                                </Typography>
                            </Box>
                            <Box>
                                <TextField
                                    multiline
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    placeholder={`Message ${profile.fullName}`}
                                />
                            </Box>

                            <TextField
                                sx={{ marginTop: '20px ' }}
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                label="Your budget"
                                value={budget}
                                onChange={handleBudgetChange}
                            />
                            <Typography>
                                {budget.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </Typography>
                        </Box>

                        <Button onClick={handleSubmitOrder}>
                            Send pre-order
                        </Button>
                    </Box>
                </>
            )}
        </Modal>
    );
}

export default PreOrderModal;
