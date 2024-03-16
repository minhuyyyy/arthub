import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import useAuth from '../../hooks/useAuth';
import { Avatar, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
    display: 'flex',
};

interface Follower {
    accountId: number;
    fullName: string;
    avatar: string;
}

export default function AddArtworkModal({
    open,
    isOpen,
    userId,
}: {
    open: boolean;
    isOpen: Dispatch<SetStateAction<boolean>>;
    userId: number;
}) {
    const { userInfo } = useAuth();
    const handleClose = () => isOpen(false);
    const [followers, setFollowers] = useState<Follower[]>([]);

    const getFollowers = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/follow/list-follower-id/${userId}`
            );
            if (res.status === 200) {
                const followerIds = res.data.listFollowerId;
                const followersData = await Promise.all(
                    followerIds.map(async (id) => {
                        const profileRes = await axios.get(
                            `${API_URL}/profile/${id}`
                        );
                        return profileRes.data;
                    })
                );
                setFollowers(followersData);
            }
        } catch (error) {
            console.error('Error fetching followers:', error);
        }
    };

    useEffect(() => {
        if (open) {
            getFollowers();
        }
    }, [open, userId]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container>
                        {followers.map((follower) => (
                            <Grid item xs={12} key={follower.accountId}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Grid item xs={4}>
                                        <Link
                                            to={`/profile/${follower.accountId}`}
                                            onClick={() => isOpen(false)}
                                        >
                                            <Avatar
                                                src={follower.avatar}
                                                alt={follower.fullName}
                                                style={{
                                                    // width: '100%',
                                                    // height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h5" gutterBottom>
                                            {follower.fullName}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
