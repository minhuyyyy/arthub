import { Delete, Edit, More, Send } from '@mui/icons-material';
import { IconButton, Input, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import { toast } from 'react-toastify';

function CommentMenu({
    artistId,
    commentId,
    content,
}: {
    artistId: number;
    postId: number;
    commentId: number;
    content: string;
}) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedContent, setUpdatedContent] = useState<string>(content);
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

    const handleDeleteComment = async () => {
        try {
            await axios.delete(`${API_URL}/comment/${commentId}`);
            toast.success('Comment deleted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error('Failed to delete comment');
        }
    };

    const handleUpdateComment = async () => {
        try {
            await axios.put(`${API_URL}/comment/${commentId}`, {
                commentId: commentId,
                content: updatedContent,
            });
            toast.success('Comment updated successfully!');
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating comment:', error);
            toast.error('Failed to update comment');
        }
    };

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
                {artistId == userInfo.id && (
                    <>
                        <MenuItem
                            onClick={() => {
                                setIsEditing(true);
                                handleMobileMenuClose();
                            }}
                        >
                            <Edit />
                            <p>Update</p>
                        </MenuItem>
                        <MenuItem onClick={handleDeleteComment}>
                            <Delete />
                            <p>Delete</p>
                        </MenuItem>
                    </>
                )}
            </Menu>
            {isEditing && (
                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateComment();
                        }}
                    >
                        <Input
                            value={updatedContent}
                            onChange={(e) => {
                                setUpdatedContent(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setIsEditing(false);
                                    setUpdatedContent(content);
                                }
                            }}
                            autoFocus
                        />
                        <IconButton type="submit">
                            <Send />
                        </IconButton>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CommentMenu;
