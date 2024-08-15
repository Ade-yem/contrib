import { query } from "./_generated/server";
import { auth } from "./auth";

export const getUser = query({
    args: {},
    handler: async (ctx, args_0) => {
        const userId = await auth.getUserId(ctx);
        return userId !== null ? ctx.db.get(userId) : null;
    },
});
