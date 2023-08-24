import MyContext from "../types/my-context";

export default async (ctx: MyContext) => {
  await ctx.deleteMessage();
  await ctx.conversation.enter("updatePassword");
};
