import { Button } from '@mui/material';

function CustomButton({ main, children }: { main: boolean; children: string }) {
    if (main)
        return (
            <Button
                variant='contained'
                sx={{ borderRadius: '20px', backgroundColor: 'red' }}>
                {children}
            </Button>
        );
    return <Button>{children}</Button>;
}

export default CustomButton;
