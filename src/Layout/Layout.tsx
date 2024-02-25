import { Box, Grid } from '@mui/material';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <Box sx={{padding:'2rem'}}>
                <Grid container>
                    <Box>
                        <Topbar>
                            {/* <Sidebar /> */}
                            <Outlet />
                        </Topbar>
                    </Box>
                </Grid>
            </Box>
        </>
    );
}

export default Layout;
