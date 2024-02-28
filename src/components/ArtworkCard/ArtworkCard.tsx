import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { shuffleImages } from '../../utils/utils';
import { FakeCard } from '../../card';
import { CardType } from '../../types/card';
function ArtworkCard() {
    // const shuffledCard: CardType[] = shuffleImages(FakeCard);
    // const [card, setCard] = useState(Card)
    // console.log(shuffledCard);

    return (
        <Box>
            <>
                {FakeCard.map((card: CardType) => (
                    <Card
                        sx={{ minWidth: 345 }}
                        key={card._id}>
                        <CardActionArea>
                            <CardMedia
                                component='img'
                                height='140px'
                                image={card.imgLink}
                                alt={card.imgDescription}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='div'>
                                    {card.owner.name}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'>
                                    {card.imgDescription}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </>
        </Box>
    );
}

export default ArtworkCard;
