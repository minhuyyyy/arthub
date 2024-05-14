import {
    Avatar,
    Box,
    Grid,
    IconButton,
    Input,
    Typography,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import CommentMenu from '../Menu/CommentMenu';
import { Comment } from '../../types/comment';

function Post({
    title,
    description,
    image,
    postId,
    avatar,
    accountId,
    comments,
}: {
    title: string;
    description: string;
    image: string;
    postId: number;
    avatar: string;
    accountId: number;
    comments: Comment[];
}) {
    const [content, setContent] = useState('');
    const { userInfo } = useAuth();
    const [postComments, setComments] = useState<Array<Comment>>(comments); // Initialize comments state with the initial comments
    const [profile, setProfile] = useState({});

    const getProfile = async () => {
        await axios.get(`${API_URL}/profile/${accountId}`).then((res) => {
            if (res.status === 200) {
                setProfile(res.data);
            }
        });
    };
    useEffect(() => {
        getProfile();
    }, [accountId]);
    const handlePostComment = async () => {
        try {
            const response = await axios.post(`${API_URL}/comment`, {
                content: content,
                postId: postId,
                memberId: userInfo.id,
            });
            if (response.status === 201) {
                const newComment: Comment = {
                    commentId: response.data.commentId,
                    content: content,
                    memberId: userInfo.id,
                    memberName: userInfo.fullName!,
                };
                setComments([...postComments, newComment]);
                setContent(''); // Clear the input field after adding the comment
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            // Handle error
        }
    };

    return (
        <div>
            <Box sx={{ minHeight: '500px', padding: '10px' }}>
                <Grid container>
                    <Grid item lg={12}>
                        <Box
                            // position={'relative'}
                            display={'flex'}
                            flexDirection={'row'}
                        >
                            <Avatar src={profile.avatar} />
                            <Typography
                                variant={'h5'}
                                component={'h3'}
                                position={'absolute'}
                                top={10}
                                left={50}
                            >
                                {profile.fullName}
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
                            style={{ width: '70%', margin: '0 auto' }}
                        />
                        {postComments.length > 0 && (
                            <>
                                <Typography>Comments</Typography>
                                <Box
                                    sx={{
                                        height: '120px',
                                        overflowY: 'scroll',
                                        position: 'relative',
                                        width: '100%',
                                        marginBottom: '30px',
                                    }}
                                >
                                    {postComments.map((comment) => (
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
                                                comments={postComments}
                                                setComments={setComments}
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
                            // ) : (
                            //     <Typography>No comments yet</Typography>
                        )}
                        <Box
                            sx={{
                                position: 'absolute',
                                display: 'flex',
                                bottom: 5,
                                flexDirection: 'row',
                                width: '90%',
                                backgroundColor: '#ece8e8',
                                borderRadius: '20px',
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
                                        // height: '100px',
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
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                        }}
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
