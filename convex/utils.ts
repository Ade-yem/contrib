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

/**
 * convert number to milliseconds
 * @param length time in hours
 * @returns time in milliseconds
 */
export const convertToMilliSeconds = (length: number): number => length * 60 * 60 * 1000;

export const parseToMilliSeconds = (length: "hourly" | "daily" | "weekly" | "monthly"): number => {
    switch (length) {
        case "hourly":
            return 60 * 60 * 1000;
        case "daily":
            return 60 * 60 * 24 * 1000;
        case "weekly":
            return 60 * 60 * 24 * 7 * 1000;
        default:
            return 60 * 60 * 24 * 30 * 1000;
    }
    
}