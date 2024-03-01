import { InputBase, styled } from '@mui/material';

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    marginLeft:'10px',
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
export const Container = styled('div')(({ theme }) => ({
    position: 'relative',
    height: 'fit-content',
    borderRadius: '20px',
    backgroundColor: '#e1e1e1',
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '65%',
    [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(3),
        width: '65%',
    },
}));
