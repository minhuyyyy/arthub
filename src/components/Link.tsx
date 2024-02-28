import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CustomButton({
    main,
    destination,
    children,
}: {
    main: boolean;
    destination: string;
    children: string;
}) {
    const navigate = useNavigate();
    if (main)
        return (
            <Button
                variant='contained'
                sx={{
                    display: 'inline',
                    marginRight: '10px',
                    borderRadius: '20px',
                    backgroundColor: 'red  !important',
                }}
                onClick={() => navigate(destination)}>
                {children}
            </Button>
        );
    return (
        <Button
            sx={{
                display: 'inline',
                color: 'black',
                marginRight: '10px',
                backgroundColor: '#e1e1e1 !important',
                borderRadius: '20px',
            }}
            onClick={() => navigate(destination)}>
            {children}
        </Button>
    );
}

export default CustomButton;
