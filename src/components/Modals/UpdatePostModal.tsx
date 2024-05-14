import { Box, Button, Input, Modal } from '@mui/material';
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { toast } from 'react-toastify';
import { PostType } from '../../types/post';
import {
    getPostById,
    updatePost,
} from '../../services/postServices/postServices';

function UpdatePostModal({
    open,
    isOpen,
    postId,
}: {
    open: boolean;
    isOpen: Dispatch<SetStateAction<boolean>>;
    postId: number;
}) {
    const [post, setPost] = useState<PostType>();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleClose = () => {
        isOpen(false);
    };

    const getPost = async () => {
        const postRes = await getPostById(postId);
        if (postRes.status === 200) {
            setPost(postRes.data);
        }
    };

    useEffect(() => {
        if (open) {
            getPost();
        }
    }, [open]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setPost((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        const res = await updatePost(post?.title, post?.description, postId);
        if (res.status === 200) {
            toast.success('Artwork posted successfully!');
            isOpen(false);
        } else if (res.status === 400) {
            toast.error(res.data.errors.Name[0]);
        } else toast.error('Something went wrong @@');
    };

    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            borderRadius: '20px',
                            width: '300px',
                            border: 1,
                            marginLeft: '20px',
                            borderColor: '#a5a5a5',
                        }}
                    >
                        <Input
                            id="title"
                            name="title"
                            value={post?.title}
                            onChange={(e) => handleChange(e)}
                            placeholder="Add title"
                            sx={{ marginLeft: '10px' }}
                            disableUnderline
                            fullWidth
                        />
                    </Box>

                    <Box
                        sx={{
                            borderRadius: '20px',
                            width: '300px',
                            marginLeft: '20px',
                            border: 1,
                            borderColor: '#a5a5a5',
                            marginTop: '10px',
                        }}
                    >
                        <Input
                            id="description"
                            name="description"
                            onChange={(e) => handleChange(e)}
                            value={post?.description}
                            placeholder="Add description"
                            disableUnderline
                            multiline
                            sx={{ marginLeft: '10px' }}
                            fullWidth
                        />
                    </Box>

                    <Button
                        onClick={() => handleSubmit()}
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'red !important',
                            color: 'white',
                            marginTop: '10px',
                        }}
                    >
                        Post
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default UpdatePostModal;
