import {
    Avatar,
    Box,
    Grid,
    IconButton,
    Input,
    Typography,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import CommentMenu from '../Menu/CommentMenu';

function Post({
    title,
    description,
    image,
    postId,
    avatar,
    fullName,
    accountId,
    comments,
}: {
    title: string;
    description: string;
    image: string;
    postId: number;
    avatar: string;
    fullName: string;
    accountId: number;
    comments: {
        commentId: number;
        content: string;
        memberId: number;
        memberName: string;
    }[];
}) {
    const [content, setContent] = useState('');
    const { userInfo } = useAuth();

    const handlePostComment = async () => {
        await axios.post(`${API_URL}/comment`, {
            content: content,
            postId: postId,
            memberId: userInfo.id,
        });
        // Refresh comments after posting
        window.location.reload();
    };

    return (
        <div>
            <Box sx={{ minHeight: '500px' }}>
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
                        {comments.length > 0 ? (
                            <>
                                <Typography>Comments</Typography>
                                <Box
                                    sx={{
                                        height: '120px',
                                        overflowY: 'scroll',
                                        position: 'relative',
                                        width: '100%',
                                    }}
                                >
                                    {comments.map((comment) => (
                                        <Box
                                            key={comment.commentId}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <Avatar
                                                src={avatar}
                                                sx={{
                                                    width: '30px',
                                                    height: '30px',
                                                    marginRight: '10px',
                                                }}
                                            />
                                            <Typography
                                                sx={{ marginRight: '10px' }}
                                            >
                                                {comment.memberName}:
                                            </Typography>
                                            <Typography>
                                                {comment.content}
                                            </Typography>
                                            <CommentMenu
                                                ownComment={
                                                    comment.memberId ===
                                                    accountId
                                                }
                                                commentId={comment.commentId}
                                                content={comment.content}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        ) : (
                            <Typography>No comments yet</Typography>
                        )}
                        <Box
                            sx={{
                                position: 'absolute',
                                display: 'flex',
                                bottom: 0,
                                flexDirection: 'row',
                                width: '100%',
                            }}
                        >
                            <Avatar
                                src={userInfo.imageUrl}
                                sx={{ marginRight: '10px' }}
                            />
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handlePostComment();
                                }}
                            >
                                <Input
                                    sx={{
                                        color: '#333',
                                        borderBottomLeftRadius: '20px',
                                        width: '100%',
                                    }}
                                    disableUnderline
                                    placeholder="Add comment"
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    multiline
                                />
                                {content.length > 0 && (
                                    <IconButton
                                        type="submit"
                                        sx={{ position: 'absolute', right: 0 }}
                                    >
                                        <Send />
                                    </IconButton>
                                )}
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Post;
