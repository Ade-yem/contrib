import { ConvexError } from "convex/values";

export const toUpperLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const parseError = (error: any) => {
  const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Unexpected error occurred";
  return errorMessage;
}