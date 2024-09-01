import { nanoid } from "nanoid";

export const currencies = ["NGN", "GHS"]

export const generateReference = (length: number = 18) => {
    return nanoid(length);
}

export const generateAndShuffleNumbers = (n: number) => {
    const numbers = Array.from({length: n}, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers
}