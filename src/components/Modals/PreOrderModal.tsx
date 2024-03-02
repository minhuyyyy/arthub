import {
    Avatar,
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

function PreOrderModal({
    open,
    isOpen,
}: {
    open: boolean;
    isOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const [msg, setMsg] = useState<string>('');
    const [budget, setBudget] = useState<number>(0);
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
    return (
        <Modal open={open} onClose={handleClose}>
            <Box textAlign={'center'} sx={style}>
                <Box>
                    <Box>
                        <Avatar
                            sx={{ margin: '0 auto' }}
                            src="/assets/hehe.png"
                        />
                        <Typography variant="h5">
                            <strong>Quyet Anh Le</strong>
                        </Typography>
                    </Box>
                    <Box>
                        <TextField
                            multiline
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder="Message Johnny Sins"
                        />
                    </Box>

                    <TextField
                        sx={{ marginTop: '20px ' }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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

                <Button>Send pre-order</Button>
            </Box>
        </Modal>
    );
}

export default PreOrderModal;
