import {
    Avatar,
    Box,
    Button,
    Input,
    TextField,
    Typography,
} from '@mui/material';
import { Container } from '../../utils/InputComponents';

function PreOrderModal() {
    return (
        <Box>
            <Box>
                <Box>
                    <Avatar src='/assets/face-6.jpg' />
                    <Typography variant='h3'>Johnny Sins</Typography>
                </Box>
                <Box>
                    {/* <Container>
                        <Styled
                    </Container> */}
                    <TextField
                        multiline
                        placeholder='Message Johnny Sins'
                    />
                </Box>
                <Input
                    placeholder='Your budget'
                    disableUnderline
                />
            </Box>
            <Button>Send pre-order</Button>
        </Box>
    );
}

export default PreOrderModal;
