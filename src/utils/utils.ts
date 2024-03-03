import { ChangeEvent } from 'react';
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

export const handleBudgetChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
    const value = e.target.value;
    const numericValue = parseFloat(value.replace(/\D/g, ''));

    if (isNaN(numericValue)) {
        return 0;
    } else return numericValue;
};
