import { nanoid } from "nanoid";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const currencies = ["NGN", "GHS"]

export const generateReference = (length: number = 18) => {
    return nanoid(length);
}