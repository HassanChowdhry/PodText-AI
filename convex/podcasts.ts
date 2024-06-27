import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getUrl = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async(ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  }
})

export const createPodcast = mutation({
  args: {
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.string(),
    audioStorageId: v.id('_storage'),
    imageUrl: v.string(),
    imageStorageId: v.id('_storage'),
    voiceType: v.string(),
    audioDuration: v.number(),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    views: v.number(),
  },
  handler: async(ctx, args) => {
    const id = await ctx.auth.getUserIdentity();
    if (!id) {
      throw new ConvexError("User not found");
    }

    const user = await ctx.db.query("users").filter(q => q.eq(q.field("email"), id.email)).collect();
    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const podcast = await ctx.db.insert("podcasts", {
      ...args,
      user: user[0]._id,
      author: user[0].name,
      authorId: user[0].clerkId,
      authorImageUrl: user[0].imageUrl,
    });

    return podcast
  },
})