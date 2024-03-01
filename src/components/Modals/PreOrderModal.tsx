import { Avatar, Box, Input, TextField, Typography } from '@mui/material';

function PreOrderModal() {
    return (
        <Box >
            <Box>
                <Avatar src='/assets/face-6.jpg' />
                <Typography variant='h3'>Johnny Sins</Typography>
            </Box>
            <Box>
                <TextField
                    multiline
                    placeholder='Message Johnny Sins'
                />
                {/* <Typography >VND</Typography> */}
            </Box>
            <Input
                placeholder='Your budget'
                disableUnderline
            />
        </Box>
    );
}

export default PreOrderModal;
