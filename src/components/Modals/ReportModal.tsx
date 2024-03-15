import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
    Button,
    Modal,
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const ReportArtworkModal = ({
    postId,
    userId,
    openModal,
    isModalOpen,
}: {
    postId: number;
    userId: number;
    openModal: boolean;
    isModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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
        height: '500px',
    };
    const [selectedReason, setSelectedReason] = useState('');
    const { userInfo } = useAuth();
    const handleOpen = () => isModalOpen(true);
    const handleClose = () => isModalOpen(false);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        setSelectedReason(event.target.value);

    const handleSubmit = async () => {
        await axios
            .post(`${API_URL}/report`, {
                reportReason: selectedReason,
                artworkId: postId,
                reporterId: userInfo.id,
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Artwork reported!');
                }
            })
            .catch((err) => {
                toast.error(err.response.data.title);
            });
        handleClose();
    };

    return (
        <Box>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Report Artwork
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Select a reason for reporting this artwork:
                    </Typography>
                    <Box sx={{ overflowY: 'scroll', height: '300px' }}>
                        <RadioGroup
                            aria-labelledby="demo-radio-group-label"
                            name="radio-buttons-group"
                            value={selectedReason}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Spam"
                                control={<Radio />}
                                label="Spam"
                            />
                            <FormControlLabel
                                value="Misleading or repetitive content"
                                control={<Radio />}
                                label="Misleading or repetitive content"
                            />
                            <FormControlLabel
                                value="Nudity, pornography, or sexual content"
                                control={<Radio />}
                                label="Nudity, pornography, or sexual content"
                            />
                            <FormControlLabel
                                value="Adult or child sexual exploitation content"
                                control={<Radio />}
                                label="Adult or child sexual exploitation content"
                            />
                            <FormControlLabel
                                value="Self-harm"
                                control={<Radio />}
                                label="Self-harm"
                            />
                            <FormControlLabel
                                value="Eating disorders, self-harm, suicide"
                                control={<Radio />}
                                label="Eating disorders, self-harm, suicide"
                            />
                            <FormControlLabel
                                value="Misinformation"
                                control={<Radio />}
                                label="Misinformation"
                            />
                            <FormControlLabel
                                value="Hostile Activity"
                                control={<Radio />}
                                label="Hostile activity"
                            />
                            <FormControlLabel
                                value="Dangerous Goods"
                                control={<Radio />}
                                label="Dangerous goods"
                            />
                            <FormControlLabel
                                value="Harassment or bullying"
                                control={<Radio />}
                                label="Harassment or bullying"
                            />
                            <FormControlLabel
                                value="Violent imagery or incitement of violence"
                                control={<Radio />}
                                label="Violent imagery or incitement of violence"
                            />
                            <FormControlLabel
                                value="Privacy violation"
                                control={<Radio />}
                                label="Privacy violation"
                            />
                        </RadioGroup>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={selectedReason === ''}
                    >
                        Submit Report
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default ReportArtworkModal;
