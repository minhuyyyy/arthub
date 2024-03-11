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
        height:'500px'
    };
    const [selectedReason, setSelectedReason] = useState('');

    const handleOpen = () => isModalOpen(true);
    const handleClose = () => isModalOpen(false);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        setSelectedReason(event.target.value);

    const handleSubmit = () => {
        // Submit report to your backend here
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
                    <Box sx={{overflowY:'scroll', height:'300px'}}>
                        <RadioGroup
                            aria-labelledby="demo-radio-group-label"
                            name="radio-buttons-group"
                            value={selectedReason}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="spam"
                                control={<Radio />}
                                label="Spam"
                            />
                            <FormControlLabel
                                value="misleadingContent"
                                control={<Radio />}
                                label="Misleading or repetitive content"
                            />
                            <FormControlLabel
                                value="nudity"
                                control={<Radio />}
                                label="Nudity, pornography, or sexual content"
                            />
                            <FormControlLabel
                                value="adultExploitation"
                                control={<Radio />}
                                label="Adult or child sexual exploitation content"
                            />
                            <FormControlLabel
                                value="selfHarm"
                                control={<Radio />}
                                label="Self-harm"
                            />
                            <FormControlLabel
                                value="eatingDisorder"
                                control={<Radio />}
                                label="Eating disorders, self-harm, suicide"
                            />
                            <FormControlLabel
                                value="misinformation"
                                control={<Radio />}
                                label="Misinformation"
                            />
                            <FormControlLabel
                                value="hostileActivity"
                                control={<Radio />}
                                label="Hostile activity"
                            />
                            <FormControlLabel
                                value="dangerousGoods"
                                control={<Radio />}
                                label="Dangerous goods"
                            />
                            <FormControlLabel
                                value="harassment"
                                control={<Radio />}
                                label="Harassment or bullying"
                            />
                            <FormControlLabel
                                value="violentImagery"
                                control={<Radio />}
                                label="Violent imagery or incitement of violence"
                            />
                            <FormControlLabel
                                value="privacyViolation"
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
