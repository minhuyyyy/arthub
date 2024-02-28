import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import { shuffleImages } from '../../utils/utils';
import { FakeCard } from '../../card';
import { CardType } from '../../types/card';
function ArtworkCard() {
    // const shuffledCard: CardType[] = shuffleImages(FakeCard);
    // const [card, setCard] = useState(Card)
    // console.log(shuffledCard);
    // const onScroll = () => {
    //   const isEndPage =
    // }
    return (
        <Box sx={{marginTop:'20px'}}>
            <Grid
                container
                spacing={1}>
                <>
                    {FakeCard.map((card: CardType) => (
                        <Grid
                            item
                            sm={4}
                            md={3}
                            lg={3}>
                            <Card
                                sx={{ maxWidth: 345 }}
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
                        </Grid>
                    ))}
                </>
            </Grid>
        </Box>
    );
}

export default ArtworkCard;
