import {query, mutation} from "./_generated/server";
import {Id} from "./_generated/dataModel";
import {v, ConvexError} from "convex/values";

export const getChatsInGroup = query({
  args: {groupId: v.id("groups")},
  async handler(ctx, args_0) {
    return await ctx.db.query("chats").filter((chat) => chat.eq(chat.field("groupId"), args_0.groupId)).order("asc").collect();
  },
})

export const createChat = mutation({
  args: {
    groupId: v.id("groups"),
    message: v.string(),
    userId: v.id("users"),
    imageId: v.optional(v.id("_storage"))
  },
  async handler(ctx, args_0) {
    const {groupId, message, userId, imageId} = args_0;
    const image = await ctx.storage.getUrl(imageId as Id<"_storage">);
    if (!image) throw new ConvexError("Could not get image from storage")
    return await ctx.db.insert("chats", {groupId ,message, image, userId, imageId })
  },
})

export const deleteChat = mutation({
  args: {
    chatId: v.id("chats"),
  },
  async handler(ctx, args_0) {
    const {chatId} = args_0;
    return await ctx.db.delete(chatId);
  },
})

export const generateChatUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
