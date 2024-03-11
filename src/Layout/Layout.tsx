import { Box, Container, Grid } from '@mui/material';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <Box sx={{padding:'2rem'}}>
                    <Box>
                        <Topbar>
                            {/* <Sidebar /> */}
                            <Container maxWidth='md'>

                            <Outlet />
                            </Container>
                        </Topbar>
                    </Box>
            </Box>
        </>
    );
}

export default Layout;
