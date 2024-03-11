import { Box, Button, Input, Modal } from '@mui/material';
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils/urls';
import AddArtworkModal from './AddArtworkModal';
import { ArtworkType } from '../../types/artwork';
import { PostType } from '../../types/post';

function UpdatePostModal({
    open,
    isOpen,
    postId,
}: {
    open: boolean;
    isOpen: Dispatch<SetStateAction<boolean>>;
    postId: number;
}) {
    const { userInfo } = useAuth();
    const [post, setPost] = useState<PostType>();
    const [openSelectArtwork, isOpenSelectArtwork] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState<ArtworkType>({
        artworkId: 0,
        name: '',
        description: '',
        image: '',
        price: 0,
        artistID: 0,
        isBuyAvailable: true,
        artworkRating: 0,
        artworkDate: new Date(),
        genre: '',
    });

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
        const postRes = await axios.get(`${API_URL}/post/${postId}`);
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
        await axios
            .put(`${API_URL}/post/${post?.postId}`, {
                title: post?.title,
                description: post?.description,
                postId: post?.postId,
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Artwork posted successfully!');
                    isOpen(false);
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error(err.response.data.errors.Name[0]);
                } else toast.error('Something went wrong @@');
            });
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
                    <AddArtworkModal
                        open={openSelectArtwork}
                        isOpen={isOpenSelectArtwork}
                        selectedArtwork={selectedArtwork}
                        setSelectedArtwork={setSelectedArtwork}
                    />
                </Box>
            </Modal>
        </Box>
    );
}

export default UpdatePostModal;
