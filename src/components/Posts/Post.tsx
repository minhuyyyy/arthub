// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { API_URL } from '../../utils/urls';
// import { ArtistType } from '../../types/artist';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import MenuButton from '../Menu/Menu';
import AppSuspense from '../Suspense';

function Post({
    title,
    description,
    image,
    postId,
    avatar,
    fullName,
    accountId,
}: {
    title: string;
    description: string;
    image: string;
    postId: number;
    avatar: string;
    fullName: string;
    accountId: number;
}) {
    // const [showComments, isShownComments] = useState(false);

    return (
        <AppSuspense>
            <Box>
                <Grid container>
                    <Grid item lg={12}>
                        <Box
                            position={'relative'}
                            display={'flex'}
                            flexDirection={'row'}
                        >
                            <Avatar src={avatar} />
                            <Typography
                                variant={'h5'}
                                component={'h3'}
                                position={'absolute'}
                                top={0}
                                left={50}
                            >
                                {fullName}
                            </Typography>
                            <Box position={'absolute'} right={50}>
                                <MenuButton
                                    postId={postId}
                                    artistId={accountId}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={12} textAlign={'left'}>
                        <Typography variant="body1" component={'header'}>
                            {title}
                        </Typography>
                        <Typography variant="body1" component={'article'}>
                            {description}
                        </Typography>
                        <img
                            src={image}
                            alt={title}
                            style={{ width: '100%', alignSelf: 'center' }}
                        />
                        <Button
                            sx={{
                                color: '#333',
                                borderBottomLeftRadius: '20px',
                            }}
                        >
                            Like
                        </Button>
                        <Button sx={{ color: '#333' }}>Comment</Button>
                    </Grid>
                </Grid>
            </Box>
        </AppSuspense>
    );
}

export default Post;
