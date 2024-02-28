import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { FakeCard } from '../../card';
import { CardType } from '../../types/card';
import './Artwork.scss';

function ArtworkCard() {
    // const shuffledCard: CardType[] = shuffleImages(FakeCard);
    // const [card, setCard] = useState(Card)
    // console.log(shuffledCard);

    const handleDoubleClick = (id: string) => {
        console.log('Tym to:', id);
    };

    return (
        <Box>
            <div>
                {FakeCard.map((card: CardType) => (
                    <Card
                        sx={{ minWidth: 345 }}
                        key={card._id}
                        onDoubleClick={() => handleDoubleClick(card._id)}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140px"
                                image={card.imgLink}
                                alt={card.imgDescription}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {card.owner.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {card.imgDescription}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </Box>
    );
}

export default ArtworkCard;
