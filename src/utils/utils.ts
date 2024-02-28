import { CardType } from '../types/card';

export const shuffleImages = (arr: CardType[]) => {
    const shuffled: CardType[] = [];
    while (arr.length) {
        const randIndex = Math.floor(Math.random() * arr.length);
        const [removed] = arr.splice(randIndex, 1);
        shuffled.push(removed);
    }
    return shuffled;
};
