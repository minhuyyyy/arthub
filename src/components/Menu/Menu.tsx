import { Delete, Edit, Flag, More } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import UpdatePostModal from '../Modals/UpdatePostModal';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import { toast } from 'react-toastify';
import ReportArtworkModal from '../Modals/ReportModal';
import UpdateArtworkModal from '../Modals/UpdateArtworkModal';

function MenuButton({
    artistId,
    postId,
    type,
}: {
    artistId: number;
    postId: number;
    type: string;
}) {
    const [open, isOpen] = useState<boolean>(false);
    const [openModal, isModalOpen] = useState<boolean>(false);
    const { userInfo } = useAuth();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleDeletePost = async () => {
        await axios
            .delete(`${API_URL}/posts/${postId}`)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Post deleted successfully!');
                    isOpen(false);
                }
            })
            .catch((err) => toast.error('Failed to delete'));
    };

    const handleDeleteArtwork = async () => {
        await axios
            .delete(`${API_URL}/artwork/${postId}`)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Post deleted successfully!');
                    isOpen(false);
                }
            })
            .catch((err) => toast.error('Failed to delete'));
    };

    // Create an array of JSX elements for menu items
    const menuItems = [
        <MenuItem
            key="update"
            onClick={() => {
                isOpen(true);
                handleMobileMenuClose();
            }}
        >
            <IconButton
                size="small"
                aria-label="show 4 new mails"
                color="inherit"
            >
                <Edit />
            </IconButton>
            <p>Update </p>
        </MenuItem>,
        <>
            {type === 'post' ? (
                <>
                    <UpdatePostModal
                        postId={postId}
                        open={open}
                        isOpen={isOpen}
                    />
                    <MenuItem key="delete" onClick={() => handleDeletePost()}>
                        <IconButton size="small" color="inherit">
                            <Delete />
                        </IconButton>
                        <p>Delete </p>
                    </MenuItem>
                </>
            ) : (
                <>
                    <UpdateArtworkModal
                        artworkId={postId}
                        open={open}
                        isOpen={isOpen}
                    />
                    <MenuItem
                        key="delete"
                        onClick={() => handleDeleteArtwork()}
                    >
                        <IconButton size="small" color="inherit">
                            <Delete />
                        </IconButton>
                        <p>Delete </p>
                    </MenuItem>
                </>
            )}
        </>,
    ];

    return (
        <div>
            <IconButton
                size="small"
                aria-label="show more"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <More />
            </IconButton>
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: 'white', // Set background color of the menu
                        color: 'black', // Set text color of the menu
                    },
                }}
            >
                {/* Render menu items from the array */}
                {artistId == userInfo.id &&
                    menuItems &&
                    menuItems.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                {artistId != userInfo.id && (
                    <MenuItem
                        onClick={() => {
                            isModalOpen(true);
                            handleMobileMenuClose();
                        }}
                    >
                        <IconButton size="large" color="inherit">
                            <Flag />
                        </IconButton>
                        <p>Report </p>
                        <ReportArtworkModal
                            isModalOpen={isModalOpen}
                            openModal={openModal}
                            postId={postId}
                            userId={userInfo.id}
                        />
                    </MenuItem>
                )}
                ,
            </Menu>
        </div>
    );
}

export default MenuButton;
